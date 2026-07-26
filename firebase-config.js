// =========================================================================
// RETAIL EXCELLENCE LEARNING HUB - FIREBASE & USER SESSIONS CONFIG
// =========================================================================

// Konfigurasi Firebase Firestore milik Proyek Informa Learning Hub
const firebaseConfig = {
    apiKey: "AIzaSyCxYwTrHqNHIVjgZBiiMrhBIbeDq9fWJ8c",
    authDomain: "informa-learning-hub.firebaseapp.com",
    projectId: "informa-learning-hub",
    storageBucket: "informa-learning-hub.firebasestorage.app",
    messagingSenderId: "144392271317",
    appId: "1:144392271317:web:204ce0291895bab073f95c",
    measurementId: "G-QTFDQEFGS6"
};

let db = null;
let isFirebaseInitialized = false;

// Inisialisasi Firebase jika config sudah diisi
function initFirebase() {
    if (typeof firebase !== 'undefined' && firebaseConfig.projectId && firebaseConfig.projectId.trim() !== '') {
        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            db = firebase.firestore();
            isFirebaseInitialized = true;
            console.log("🔥 Firebase Firestore berhasil terhubung!");
        } catch (e) {
            console.warn("⚠️ Gagal inisialisasi Firebase, menggunakan fallback LocalStorage:", e);
        }
    } else {
        console.log("ℹ️ Firebase config belum diisi. Menggunakan mode lokal (LocalStorage).");
    }
}

// -------------------------------------------------------------------------
// MANAJEMEN SESI USER (LOCALSTORAGE + FIRESTORE SYNC)
// -------------------------------------------------------------------------

/** Mengambil profil user aktif dari LocalStorage */
function getCurrentUser() {
    try {
        const userStr = localStorage.getItem('informa_user_profile');
        return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
        return null;
    }
}

/** Menyimpan/mengubah profil user aktif */
async function setCurrentUser(profile) {
    if (!profile || !profile.nik) return false;
    
    // Normalisasi data
    const userObj = {
        nik: profile.nik.trim().toUpperCase(),
        name: profile.name.trim(),
        store: profile.store ? profile.store.trim() : 'Informa General',
        role: profile.role || 'staff', // 'staff' atau 'hrd'
        updatedAt: new Date().toISOString()
    };

    localStorage.setItem('informa_user_profile', JSON.stringify(userObj));

    // Sync ke Firestore jika aktif
    if (isFirebaseInitialized && db) {
        try {
            const userRef = db.collection('users').doc(userObj.nik);
            await userRef.set({
                nik: userObj.nik,
                name: userObj.name,
                store: userObj.store,
                role: userObj.role,
                lastActive: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        } catch (err) {
            console.error("Gagal sync user ke Firestore:", err);
        }
    }
    return true;
}

/** Menghapus sesi user (Logout / Ganti Akun) */
function logoutUser() {
    localStorage.removeItem('informa_user_profile');
    window.location.reload();
}

/** Synchronize progres membaca & quiz ke Firestore */
async function syncProgressToFirestore() {
    const user = getCurrentUser();
    if (!user || !user.nik) return;

    const readTopics = JSON.parse(localStorage.getItem('informa_read_topics')) || [];
    
    // Kumpulkan semua skor & status quiz dari localStorage
    const categories = ['basic-service', 'dining-department', 'glossary', 'product-knowledge', 'selling-skills', 'service-excellence'];
    const quizScores = {};
    const quizPassed = {};

    categories.forEach(cat => {
        const score = localStorage.getItem(`informa_quiz_${cat}`);
        const passed = localStorage.getItem(`informa_quiz_passed_${cat}`) === 'true';
        if (score !== null) quizScores[cat] = parseInt(score, 10);
        if (passed) quizPassed[cat] = true;
    });

    if (isFirebaseInitialized && db) {
        try {
            await db.collection('users').doc(user.nik).set({
                nik: user.nik,
                name: user.name,
                store: user.store,
                role: user.role,
                readTopics: readTopics,
                quizScores: quizScores,
                quizPassed: quizPassed,
                lastActive: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        } catch (e) {
            console.error("Gagal sync progress ke Firestore:", e);
        }
    }
}

/** Mengambil seluruh data staff untuk Dashboard HRD */
async function fetchAllStaffForHRD() {
    if (!isFirebaseInitialized || !db) {
        console.warn("Firebase belum aktif. Mengembalikan data mock / local user tunggal.");
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
        const snapshot = await db.collection('users').get();
        const staffList = [];
        snapshot.forEach(doc => {
            staffList.push(doc.data());
        });
        return staffList;
    } catch (e) {
        console.error("Gagal memuat data staff dari Firestore:", e);
        return [];
    }
}

/** Menghapus data karyawan dari Firestore & LocalStorage */
async function deleteStaffUser(nik) {
    if (!nik) return false;
    
    if (isFirebaseInitialized && db) {
        try {
            await db.collection('users').doc(nik).delete();
            console.log("🔥 User berhasil dihapus dari Firestore:", nik);
        } catch (e) {
            console.error("Gagal menghapus user dari Firestore:", e);
            return false;
        }
    }

    // Jika user lokal yang sedang login dihapus, bersihkan local profile
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.nik === nik) {
        localStorage.removeItem('informa_user_profile');
    }
    return true;
}

/** Mengambil PIN Akses HRD saat ini (default: 1980) */
function getHrdPin() {
    return localStorage.getItem('informa_hrd_pin') || '1980';
}

/** Memperbarui PIN Akses HRD */
function setHrdPin(newPin) {
    localStorage.setItem('informa_hrd_pin', newPin);
    if (isFirebaseInitialized && db) {
        db.collection('settings').doc('hrd_pin').set({
            pin: newPin,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true }).catch(console.error);
    }
}

// Inisialisasi otomatis jika script dimuat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFirebase);
} else {
    initFirebase();
}
