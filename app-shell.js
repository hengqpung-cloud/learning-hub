// =========================================================================
// RETAIL EXCELLENCE LEARNING HUB - APP SHELL & UI COMMON MODULE
// =========================================================================

/**
 * Inisialisasi dan sinkronisasi tema (Dark/Light mode)
 */
function initTheme() {
    const savedTheme = localStorage.getItem('informa_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeButtonText(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('informa_theme', newTheme);
    updateThemeButtonText(newTheme);
}

function updateThemeButtonText(theme) {
    const btns = document.querySelectorAll('#theme-btn, .theme-toggle-btn');
    btns.forEach(btn => {
        if (theme === 'light') {
            btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            btn.setAttribute('title', 'Mode Terang (Klik untuk Mode Gelap)');
            btn.setAttribute('aria-label', 'Mode Terang, klik untuk ganti ke Mode Gelap');
        } else {
            btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            btn.setAttribute('title', 'Mode Gelap (Klik untuk Mode Terang)');
            btn.setAttribute('aria-label', 'Mode Gelap, klik untuk ganti ke Mode Terang');
        }
    });
}

/**
 * Toggle Hamburger Menu Mobile Drawer
 */
function toggleMobileMenu() {
    const dropdown = document.getElementById('mobile-nav-dropdown');
    const icon = document.getElementById('mobile-menu-icon');
    if (!dropdown) return;
    const isHidden = getComputedStyle(dropdown).display === 'none';
    if (isHidden) {
        dropdown.style.display = 'block';
        if (icon) icon.className = 'fa-solid fa-xmark';
    } else {
        dropdown.style.display = 'none';
        if (icon) icon.className = 'fa-solid fa-bars';
    }
}

// =========================================================================
// UNIFIED TOAST & CONFIRMATION MODAL SYSTEM (UI-UX-PRO-MAX)
// =========================================================================
const LHE = {
    toast(message, type = 'info', duration = 3800, title = '') {
        let container = document.getElementById('lhe-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'lhe-toast-container';
            container.className = 'lhe-toast-container';
            container.setAttribute('aria-live', 'polite');
            container.setAttribute('aria-atomic', 'true');
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `lhe-toast lhe-toast-${type}`;
        toast.setAttribute('role', 'status');

        let iconClass = 'fa-circle-info';
        let defaultTitle = 'Informasi';
        if (type === 'success') {
            iconClass = 'fa-circle-check';
            defaultTitle = 'Berhasil';
        } else if (type === 'error') {
            iconClass = 'fa-circle-exclamation';
            defaultTitle = 'Peringatan / Gagal';
        } else if (type === 'warning') {
            iconClass = 'fa-triangle-exclamation';
            defaultTitle = 'Perhatian';
        }

        const displayTitle = title || defaultTitle;

        toast.innerHTML = `
            <div class="lhe-toast-icon"><i class="fa-solid ${iconClass}"></i></div>
            <div class="lhe-toast-body">
                <div class="lhe-toast-title">${displayTitle}</div>
                <div class="lhe-toast-msg">${message}</div>
            </div>
            <button class="lhe-toast-close" title="Tutup" aria-label="Tutup notifikasi"><i class="fa-solid fa-xmark"></i></button>
            <div class="lhe-toast-progress"><div class="lhe-toast-progress-bar"></div></div>
        `;

        container.appendChild(toast);

        // Entrance animation
        requestAnimationFrame(() => {
            toast.classList.add('lhe-toast-visible');
        });

        const progressBar = toast.querySelector('.lhe-toast-progress-bar');
        if (progressBar) {
            progressBar.style.transition = `width ${duration}ms linear`;
            requestAnimationFrame(() => {
                progressBar.style.width = '0%';
            });
        }

        let dismissTimeout = setTimeout(dismiss, duration);

        function dismiss() {
            clearTimeout(dismissTimeout);
            toast.classList.remove('lhe-toast-visible');
            toast.classList.add('lhe-toast-hiding');
            setTimeout(() => {
                if (toast.parentElement) toast.parentElement.removeChild(toast);
            }, 250);
        }

        const closeBtn = toast.querySelector('.lhe-toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dismiss();
            });
        }

        // Pause on hover
        toast.addEventListener('mouseenter', () => {
            clearTimeout(dismissTimeout);
            if (progressBar) progressBar.style.transition = 'none';
        });

        toast.addEventListener('mouseleave', () => {
            dismissTimeout = setTimeout(dismiss, 1500);
        });

        return toast;
    },

    confirm(options = {}) {
        return new Promise((resolve) => {
            const {
                title = 'Konfirmasi Tindakan',
                message = 'Apakah Anda yakin ingin melanjutkan?',
                icon = 'fa-triangle-exclamation',
                confirmText = 'Ya, Lanjutkan',
                cancelText = 'Batal',
                type = 'danger' // 'danger' | 'primary' | 'warning'
            } = options;

            const existing = document.getElementById('lhe-confirm-overlay');
            if (existing) existing.remove();

            const overlay = document.createElement('div');
            overlay.id = 'lhe-confirm-overlay';
            overlay.className = 'lhe-confirm-overlay';
            overlay.setAttribute('role', 'dialog');
            overlay.setAttribute('aria-modal', 'true');
            overlay.setAttribute('aria-labelledby', 'lhe-confirm-title');

            const isDanger = type === 'danger';
            const iconBadgeClass = isDanger ? 'lhe-badge-danger' : (type === 'warning' ? 'lhe-badge-warning' : 'lhe-badge-primary');
            const btnConfirmClass = isDanger ? 'lhe-btn-danger' : 'lhe-btn-primary';

            overlay.innerHTML = `
                <div class="lhe-confirm-modal">
                    <div class="lhe-confirm-badge ${iconBadgeClass}">
                        <i class="fa-solid ${icon}"></i>
                    </div>
                    <h3 class="lhe-confirm-title" id="lhe-confirm-title">${title}</h3>
                    <p class="lhe-confirm-msg">${message}</p>
                    <div class="lhe-confirm-actions">
                        <button class="lhe-btn-cancel" id="lhe-confirm-cancel">${cancelText}</button>
                        <button class="${btnConfirmClass}" id="lhe-confirm-ok">${confirmText}</button>
                    </div>
                </div>
            `;

            document.body.appendChild(overlay);
            document.body.classList.add('lhe-modal-open');

            requestAnimationFrame(() => {
                overlay.classList.add('lhe-confirm-show');
                const okBtn = document.getElementById('lhe-confirm-ok');
                if (okBtn) okBtn.focus();
            });

            function cleanup(result) {
                overlay.classList.remove('lhe-confirm-show');
                document.body.classList.remove('lhe-modal-open');
                window.removeEventListener('keydown', handleKey);
                setTimeout(() => {
                    if (overlay.parentElement) overlay.parentElement.removeChild(overlay);
                    resolve(result);
                }, 220);
            }

            function handleKey(e) {
                if (e.key === 'Escape') {
                    e.preventDefault();
                    cleanup(false);
                } else if (e.key === 'Enter' && document.activeElement && document.activeElement.id === 'lhe-confirm-ok') {
                    e.preventDefault();
                    cleanup(true);
                }
            }

            window.addEventListener('keydown', handleKey);

            document.getElementById('lhe-confirm-cancel').addEventListener('click', () => cleanup(false));
            document.getElementById('lhe-confirm-ok').addEventListener('click', () => cleanup(true));

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) cleanup(false);
            });
        });
    }
};

// Global Aliases & Safe Polyfill
window.LHE = LHE;
window.showToast = LHE.toast;
window.showConfirm = LHE.confirm;

// Polyfill window.alert agar seluruh alert lama otomatis dialihkan ke Toast
window.alert = function(msg) {
    let type = 'info';
    const text = String(msg || '');
    if (text.toLowerCase().includes('gagal') || text.toLowerCase().includes('salah') || text.toLowerCase().includes('ditolak') || text.toLowerCase().includes('error')) {
        type = 'error';
    } else if (text.toLowerCase().includes('berhasil') || text.toLowerCase().includes('sukses')) {
        type = 'success';
    } else if (text.toLowerCase().includes('perhatian') || text.toLowerCase().includes('peringatan') || text.toLowerCase().includes('kosong')) {
        type = 'warning';
    }
    LHE.toast(text, type);
};

/**
 * Helper Logout Pengguna dengan Custom Confirmation Modal
 */
async function handleLogout() {
    const confirmed = await LHE.confirm({
        title: "Konfirmasi Keluar Akun",
        message: "Apakah Anda yakin ingin keluar dari akun ini? Progres belajar Anda yang selesai tetap tersimpan dengan aman.",
        icon: "fa-arrow-right-from-bracket",
        confirmText: "Ya, Keluar Akun",
        cancelText: "Batal",
        type: "danger"
    });

    if (confirmed) {
        if (typeof logoutUser === 'function') {
            logoutUser();
        } else {
            localStorage.removeItem('informa_user_profile');
        }
        LHE.toast("Anda telah berhasil keluar dari akun.", "info");
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    }
}

/**
 * Global Route Guard untuk proteksi halaman privat
 * @param {string|null} requiredRole - 'hrd' atau null (semua user terautentikasi)
 */
function authGuard(requiredRole = null) {
    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : (function() {
        try {
            const u = localStorage.getItem('informa_user_profile');
            return u ? JSON.parse(u) : null;
        } catch(e) { return null; }
    })();

    if (!user || !user.nik) {
        try {
            sessionStorage.setItem('lhe_redirect_url', window.location.href);
        } catch (e) {}
        window.location.replace('index.html?auth=required');
        return false;
    }

    if (requiredRole && user.role !== requiredRole) {
        LHE.toast("Akses Ditolak: Halaman ini hanya dapat diakses oleh peran " + (requiredRole.toUpperCase()) + ".", "error");
        setTimeout(() => {
            window.location.replace('learning.html');
        }, 1200);
        return false;
    }

    if (document.body) {
        document.body.classList.add('auth-verified');
    }
    return true;
}

/**
 * Buka modal login jika tersedia di halaman, atau redirect ke index.html?auth=required
 */
function openLoginModalOrRedirect() {
    if (typeof openLoginModal === 'function') {
        openLoginModal();
    } else if (typeof openEditUserModal === 'function') {
        openEditUserModal();
    } else {
        window.location.href = 'index.html?auth=required';
    }
}

/**
 * Render Header User Badge & Mobile Menu Drawer berdasarkan sesi aktif
 */
function checkUserSession() {
    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : (function() {
        try {
            const u = localStorage.getItem('informa_user_profile');
            return u ? JSON.parse(u) : null;
        } catch(e) { return null; }
    })();

    renderUserBadge(user);
}

function renderUserBadge(user) {
    const container = document.getElementById('user-badge-container') ||
                      document.getElementById('topic-user-container') ||
                      document.getElementById('quiz-user-container') ||
                      document.getElementById('glossary-user-container') ||
                      document.getElementById('video-user-container') ||
                      document.getElementById('profile-user-container') ||
                      document.getElementById('hrd-user-container') ||
                      document.querySelector('.user-nav-container');

    if (container) {
        const isLandingPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');

        if (!user) {
            container.innerHTML = `
                <button class="btn-primary btn-login-pill" onclick="openLoginModalOrRedirect()" style="cursor:pointer; display:inline-flex; align-items:center; gap:0.4rem; padding:0.5rem 1.4rem; font-size:0.95rem; border-radius:50px;">
                    <i class="fa-solid fa-arrow-right-to-bracket"></i> <span>Login</span>
                </button>
            `;
        } else {
            const firstName = user.name ? user.name.split(' ')[0] : 'User';
            const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

            let hrdLinkHTML = '';
            if (user.role === 'hrd') {
                hrdLinkHTML = `<a href="dashboard.html" class="btn-hrd-portal" title="Portal HRD"><i class="fa-solid fa-chart-line"></i> <span>Portal HRD</span></a>`;
            }

            let learnShortcutHTML = '';
            if (isLandingPage) {
                learnShortcutHTML = `
                    <a href="learning.html" class="btn-primary btn-learn-pill" style="text-decoration:none; display:inline-flex; align-items:center; gap:0.4rem; padding:0.45rem 1.2rem; font-size:0.9rem; border-radius:50px;" title="Buka Dashboard Pembelajaran">
                        <i class="fa-solid fa-graduation-cap"></i> <span>Mulai Belajar</span>
                    </a>
                `;
            }

            container.innerHTML = `
                ${hrdLinkHTML}
                ${learnShortcutHTML}
                <a href="profile.html" class="user-badge-btn" title="Lihat Profil &amp; Pencapaian (${user.name || ''})" style="text-decoration: none;">
                    <span class="user-avatar-circle">${initial}</span>
                    <span>${firstName}</span>
                </a>
                <button class="btn-logout" onclick="handleLogout()" title="Keluar / Logout Akun">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
            `;
        }
    }

    // Avatar mobile
    const mobileAvatar = document.getElementById('mobile-user-avatar');
    if (mobileAvatar) {
        if (user && user.name) {
            const initial = user.name.charAt(0).toUpperCase();
            mobileAvatar.innerHTML = `<a href="profile.html" class="user-avatar-circle" style="text-decoration:none; display:flex; align-items:center; justify-content:center; width:34px; height:34px; font-size:0.85rem;" title="${user.name}">${initial}</a>`;
            mobileAvatar.style.display = 'block';
        } else {
            mobileAvatar.innerHTML = '';
            mobileAvatar.style.display = 'none';
        }
    }

    // Mobile Dropdown Drawer Links
    renderMobileDropdown(user);
}

function renderMobileDropdown(user) {
    const dropdown = document.getElementById('mobile-nav-dropdown');
    if (!dropdown) return;

    const isLandingPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');

    let itemsHTML = '';

    if (isLandingPage) {
        itemsHTML += `
            <a href="#hero" class="mobile-nav-item" onclick="toggleMobileMenu()"><i class="fa-solid fa-house"></i> Beranda</a>
            <a href="#tentang" class="mobile-nav-item" onclick="toggleMobileMenu()"><i class="fa-solid fa-circle-info"></i> Tentang LHE</a>
            <a href="#keunggulan" class="mobile-nav-item" onclick="toggleMobileMenu()"><i class="fa-solid fa-star"></i> Keunggulan</a>
            <a href="#kontak" class="mobile-nav-item" onclick="toggleMobileMenu()"><i class="fa-solid fa-envelope"></i> Kontak</a>
        `;
    } else {
        itemsHTML += `
            <a href="index.html" class="mobile-nav-item"><i class="fa-solid fa-house"></i> Halaman Publik LHE</a>
            <a href="learning.html" class="mobile-nav-item"><i class="fa-solid fa-graduation-cap"></i> Dashboard Belajar</a>
            <a href="glossary.html" class="mobile-nav-item"><i class="fa-solid fa-book-bookmark"></i> Glosarium Istilah Retail</a>
            <a href="videos.html" class="mobile-nav-item"><i class="fa-solid fa-video"></i> Galeri Video Pembelajaran</a>
        `;
    }

    if (user) {
        if (isLandingPage) {
            itemsHTML += `<a href="learning.html" class="mobile-nav-item" style="color:var(--informa-red); font-weight:700;"><i class="fa-solid fa-graduation-cap"></i> Buka Dashboard Belajar</a>`;
        }
        if (user.role === 'hrd') {
            itemsHTML += `<a href="dashboard.html" class="mobile-nav-item"><i class="fa-solid fa-chart-line"></i> Portal Monitoring HRD</a>`;
        } else {
            itemsHTML += `<a href="profile.html" class="mobile-nav-item"><i class="fa-solid fa-user-gear"></i> Profil &amp; Pencapaian Saya</a>`;
        }
        itemsHTML += `
            <div class="mobile-nav-divider"></div>
            <button class="mobile-nav-item" onclick="toggleTheme()"><i class="fa-solid fa-sun"></i> Ganti Mode Terang / Gelap</button>
            <div class="mobile-nav-divider"></div>
            <button class="mobile-nav-item" onclick="handleLogout()" style="color: #dc3545;"><i class="fa-solid fa-arrow-right-from-bracket" style="color: #dc3545;"></i> Keluar / Logout</button>
        `;
    } else {
        itemsHTML += `
            <div class="mobile-nav-divider"></div>
            <button class="mobile-nav-item" onclick="toggleTheme()"><i class="fa-solid fa-sun"></i> Ganti Mode Terang / Gelap</button>
            <div class="mobile-nav-divider"></div>
            <button class="mobile-nav-item" onclick="openLoginModalOrRedirect()" style="color: var(--informa-red); font-weight:700;"><i class="fa-solid fa-arrow-right-to-bracket" style="color: var(--informa-red);"></i> Masuk / Login</button>
        `;
    }

    dropdown.innerHTML = itemsHTML;
}

// Backwards compatibility aliases for page-specific badge callers
function renderTopicUserBadge(user) { renderUserBadge(user); }
function renderQuizUserBadge(user) { renderUserBadge(user); }
function renderVideoUserBadge(user) { renderUserBadge(user); }
function renderHRDUserBadge(user) { renderUserBadge(user); }
function renderNavbarUser(user) { renderUserBadge(user); }

// Global Event Listeners
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('mobile-nav-dropdown');
    const btn = document.getElementById('mobile-menu-btn');
    if (dropdown && btn && !dropdown.contains(e.target) && !btn.contains(e.target)) {
        dropdown.style.display = 'none';
        const icon = document.getElementById('mobile-menu-icon');
        if (icon) icon.className = 'fa-solid fa-bars';
    }
});

// Auto-run saat DOM siap
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        checkUserSession();
    });
} else {
    initTheme();
    checkUserSession();
}
