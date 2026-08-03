// =========================================================================
// RETAIL EXCELLENCE LEARNING HUB - SUPABASE CLOUD DATABASE CONFIG & HELPERS
// =========================================================================

const SUPABASE_URL = "https://ptoehxghynpzggsqpory.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_c5v7jKZetIFMOyhiN7hX6A_jf4MnD81";

let supabaseClient = null;

/** Inisialisasi Supabase Client */
function initSupabase() {
    if (typeof supabase !== 'undefined' && !supabaseClient) {
        try {
            supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log("⚡ Supabase Cloud Database Client berhasil terhubung!");
        } catch (e) {
            console.warn("⚠️ Gagal inisialisasi Supabase Client:", e);
        }
    }
    return supabaseClient;
}

// -------------------------------------------------------------------------
// MANAJEMEN SESI & AKUN USER (SUPABASE + LOCALSTORAGE CACHE)
// -------------------------------------------------------------------------

/** Mengambil profil user aktif dari LocalStorage cache */
function getCurrentUser() {
    try {
        const userStr = localStorage.getItem('informa_user_profile');
        return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
        return null;
    }
}

/** Menyimpan / memperbarui profil user ke Supabase Cloud & LocalStorage */
async function setCurrentUser(profile) {
    if (!profile || !profile.nik) return;
    
    // 1. Simpan ke LocalStorage untuk akses instan
    localStorage.setItem('informa_user_profile', JSON.stringify(profile));

    // 2. Sync ke Supabase Cloud PostgreSQL
    const client = initSupabase();
    if (client) {
        try {
            const { error } = await client.from('users').upsert({
                nik: profile.nik,
                name: profile.name,
                store: profile.store,
                role: profile.role,
                last_active: new Date().toISOString()
            }, { onConflict: 'nik' });

            if (error) console.error("Gagal upsert user ke Supabase:", error);
            else console.log("✅ Profil user tersinkronisasi ke Supabase:", profile.nik);
        } catch (e) {
            console.error("Kesalahan koneksi Supabase saat simpan user:", e);
        }
    }
}

/** Logout user dari aplikasi */
function logoutUser() {
    localStorage.removeItem('informa_user_profile');
}

// -------------------------------------------------------------------------
// MANAJEMEN PROGRESS MEMBACA TOPIK (READ TOPICS)
// -------------------------------------------------------------------------

/** Menandai topik telah dibaca ke Supabase & LocalStorage */
async function markAsRead(topicId) {
    let readTopics = JSON.parse(localStorage.getItem('informa_read_topics')) || [];
    if (!readTopics.includes(topicId)) {
        readTopics.push(topicId);
        localStorage.setItem('informa_read_topics', JSON.stringify(readTopics));
    }

    const currentUser = getCurrentUser();
    if (currentUser && currentUser.nik) {
        const client = initSupabase();
        if (client) {
            try {
                const { error } = await client.from('read_topics').upsert({
                    user_nik: currentUser.nik,
                    topic_id: topicId,
                    read_at: new Date().toISOString()
                }, { onConflict: 'user_nik,topic_id' });

                if (error) console.error("Gagal simpan read_topic ke Supabase:", error);
            } catch (e) {
                console.error("Kesalahan Supabase read_topics:", e);
            }
        }
    }
}

/** Memuat daftar topik yang dibaca staf dari Supabase */
async function fetchUserReadTopics(nik) {
    const client = initSupabase();
    if (client) {
        try {
            const { data, error } = await client
                .from('read_topics')
                .select('topic_id')
                .eq('user_nik', nik);
            if (!error && data) {
                return data.map(item => item.topic_id);
            }
        } catch (e) {
            console.error("Gagal fetch read_topics dari Supabase:", e);
        }
    }
    return JSON.parse(localStorage.getItem('informa_read_topics')) || [];
}

// -------------------------------------------------------------------------
// MANAJEMEN HASIL EVALUASI QUIZ (QUIZ RESULTS)
// -------------------------------------------------------------------------

/** Menyimpan hasil evaluasi quiz ke Supabase & LocalStorage */
async function saveQuizResult(category, score, passed) {
    localStorage.setItem(`informa_quiz_${category}`, score);
    localStorage.setItem(`informa_quiz_passed_${category}`, passed ? 'true' : 'false');

    const currentUser = getCurrentUser();
    if (currentUser && currentUser.nik) {
        const client = initSupabase();
        if (client) {
            try {
                const { error } = await client.from('quiz_results').upsert({
                    user_nik: currentUser.nik,
                    category: category,
                    score: parseInt(score, 10),
                    passed: Boolean(passed),
                    completed_at: new Date().toISOString()
                }, { onConflict: 'user_nik,category' });

                if (error) console.error("Gagal simpan quiz_result ke Supabase:", error);
                else console.log(`✅ Skor kuis ${category} (${score}) tersimpan di Supabase.`);
            } catch (e) {
                console.error("Kesalahan Supabase quiz_results:", e);
            }
        }
    }
}

// -------------------------------------------------------------------------
// DASHBOARD MONITORING HRD (FETCH ALL STAFF & PROGRESS FROM SUPABASE)
// -------------------------------------------------------------------------

/** Mengambil data seluruh staf beserta progresnya dari Supabase untuk HRD */
async function fetchAllStaffForHRD() {
    const client = initSupabase();
    if (!client) {
        console.warn("Supabase belum aktif. Mengembalikan data user lokal.");
        const localUser = getCurrentUser();
        if (localUser) {
            const readTopics = JSON.parse(localStorage.getItem('informa_read_topics')) || [];
            const categories = ['basic-service', 'dining-department', 'glossary', 'product-knowledge', 'selling-skills', 'service-excellence'];
            const quizScores = {};
            const quizPassed = {};
            categories.forEach(cat => {
                const s = localStorage.getItem(`informa_quiz_${cat}`);
                const p = localStorage.getItem(`informa_quiz_passed_${cat}`) === 'true';
                if (s !== null) quizScores[cat] = parseInt(s, 10);
                if (p) quizPassed[cat] = true;
            });
            return [{
                ...localUser,
                readTopics,
                quizScores,
                quizPassed,
                lastActive: new Date()
            }];
        }
        return [];
    }

    try {
        // 1. Ambil seluruh data user dari Supabase
        const { data: usersData, error: usersErr } = await client
            .from('users')
            .select('*');
            
        if (usersErr) throw usersErr;

        // 2. Ambil seluruh read_topics & quiz_results
        const { data: readData } = await client.from('read_topics').select('*');
        const { data: quizData } = await client.from('quiz_results').select('*');

        const staffList = (usersData || []).map(u => {
            // Filter readTopics per user
            const uRead = (readData || [])
                .filter(r => r.user_nik === u.nik)
                .map(r => r.topic_id);

            // Filter quizScores & quizPassed per user
            const quizScores = {};
            const quizPassed = {};
            (quizData || []).filter(q => q.user_nik === u.nik).forEach(q => {
                quizScores[q.category] = q.score;
                if (q.passed) quizPassed[q.category] = true;
            });

            return {
                nik: u.nik,
                name: u.name,
                store: u.store,
                role: u.role,
                readTopics: uRead,
                quizScores: quizScores,
                quizPassed: quizPassed,
                lastActive: u.last_active ? new Date(u.last_active) : new Date()
            };
        });

        return staffList;
    } catch (e) {
        console.error("Gagal memuat rekap data staf dari Supabase:", e);
        return [];
    }
}

/** Menghapus data staf dari Supabase & LocalStorage */
async function deleteStaffUser(nik) {
    if (!nik) return false;
    
    const client = initSupabase();
    if (client) {
        try {
            const { error } = await client.from('users').delete().eq('nik', nik);
            if (error) throw error;
            console.log("🔥 Staf berhasil dihapus dari Supabase Cloud:", nik);
        } catch (e) {
            console.error("Gagal menghapus user dari Supabase:", e);
            return false;
        }
    }

    const currentUser = getCurrentUser();
    if (currentUser && currentUser.nik === nik) {
        localStorage.removeItem('informa_user_profile');
    }
    return true;
}

// -------------------------------------------------------------------------
// MANAJEMEN PIN AKSES HRD
// -------------------------------------------------------------------------

/** Mengambil PIN Akses HRD (default: 1980) */
function getHrdPin() {
    return localStorage.getItem('informa_hrd_pin') || '1980';
}

/** Memperbarui PIN Akses HRD */
function setHrdPin(newPin) {
    localStorage.setItem('informa_hrd_pin', newPin);
}

// Daftar Cabang Toko Informa (Dapat ditambah / dikurangi secara terpusat)
const INFORMA_STORES = [
    "Informa Kupang",
    "Informa Living World",
    "Informa Mall Artha Gading",
    "Informa Central Park",
    "Informa Kota Kasablanka",
    "Informa Tunjungan Plaza",
    "Informa Head Office",
    "Lainnya"
];

function populateStoreSelects() {
    const selects = document.querySelectorAll('select#input-toko');
    selects.forEach(select => {
        const selectedVal = select.value;
        select.innerHTML = INFORMA_STORES.map(store => 
            `<option value="${store}">${store === 'Lainnya' ? 'Lainnya / Cabang Lain' : store}</option>`
        ).join('');
        if (selectedVal && INFORMA_STORES.includes(selectedVal)) {
            select.value = selectedVal;
        }
    });
}

// Inisialisasi otomatis saat script dimuat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSupabase);
} else {
    initSupabase();
}
