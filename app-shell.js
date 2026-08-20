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

/**
 * Helper Logout Pengguna
 */
function handleLogout() {
    if (confirm("Apakah Anda yakin ingin keluar dari akun ini?")) {
        if (typeof logoutUser === 'function') {
            logoutUser();
        } else {
            localStorage.removeItem('informa_user_profile');
        }
        window.location.href = 'index.html';
    }
}

/**
 * Buka modal login jika tersedia di halaman, atau redirect ke index.html
 */
function openLoginModalOrRedirect() {
    if (typeof openEditUserModal === 'function') {
        openEditUserModal();
    } else {
        window.location.href = 'index.html';
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
    // Cari container desktop navbar yang cocok
    const container = document.getElementById('user-badge-container') ||
                      document.getElementById('topic-user-container') ||
                      document.getElementById('quiz-user-container') ||
                      document.getElementById('glossary-user-container') ||
                      document.getElementById('video-user-container') ||
                      document.getElementById('profile-user-container') ||
                      document.getElementById('hrd-user-container') ||
                      document.querySelector('.user-nav-container');

    if (container) {
        if (!user) {
            container.innerHTML = `
                <button class="btn-login" onclick="openLoginModalOrRedirect()" style="cursor:pointer;">
                    <i class="fa-solid fa-key"></i> <span>Masuk</span>
                </button>
            `;
        } else {
            const firstName = user.name ? user.name.split(' ')[0] : 'User';
            const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

            let hrdLinkHTML = '';
            if (user.role === 'hrd') {
                hrdLinkHTML = `<a href="dashboard.html" class="btn-hrd-portal" title="Portal HRD"><i class="fa-solid fa-chart-line"></i> <span>Portal HRD</span></a>`;
            }

            container.innerHTML = `
                ${hrdLinkHTML}
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

    let itemsHTML = `
        <a href="index.html" class="mobile-nav-item"><i class="fa-solid fa-house"></i> Beranda Utama</a>
        <a href="glossary.html" class="mobile-nav-item"><i class="fa-solid fa-book-bookmark"></i> Glosarium Istilah Retail</a>
        <a href="videos.html" class="mobile-nav-item"><i class="fa-solid fa-video"></i> Galeri Video Pembelajaran</a>
    `;

    if (user) {
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
            <button class="mobile-nav-item" onclick="openLoginModalOrRedirect()" style="color: var(--informa-red);"><i class="fa-solid fa-key" style="color: var(--informa-red);"></i> Masuk / Login Identitas</button>
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
