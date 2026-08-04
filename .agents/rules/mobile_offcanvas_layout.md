# Rule: Standar Desain Responsif Mobile untuk Layout Sidebar (Off-Canvas Drawer & Accordion)

## Konteks & Masalah
Pada aplikasi berbasis *split-screen* atau memiliki *sidebar* navigasi (seperti learning hub, dokumentasi, atau dashboard), penerapan responsif konvensional sering kali menumpuk sidebar secara vertikal di atas konten utama pada layar kecil/mobile (`max-width: 640px`).
**Bahaya Display Scaling PC/Laptop:** Hindari penggunaan breakpoint `768px` atau `992px` yang rentan salah mengenali laptop beresolusi standar (`1366x768` atau `1280x720`) dengan *Windows Display Scaling* 125%–150% sebagai perangkat mobile. Gunakan batas `max-width: 640px` untuk mobile dan `min-width: 641px` untuk desktop.
**Bahaya Kritis UI/UX:** Pengguna smartphone terpaksa harus menggulir (scroll) melewati kotak navigasi yang panjang terlebih dahulu hanya untuk bisa mulai membaca judul dan isi konten utama (*Top Screen Clutter*).
Selain itu, daftar navigasi berkategori yang membiarkan banyak folder terbuka sekaligus akan menyebabkan menu memanjang berantakan dan menyulitkan navigasi.

## Aturan Wajib (Design Invariants)
1. **Prinsip Content-First di Mobile:** Pada viewport smartphone (`max-width: 640px`), area body halaman **wajib 100% fokus menampilkan konten utama** sejak pertama kali dibuka. Jangan pernah menumpuk daftar navigasi statis di atas konten bacaan.
2. **Implementasi Pola Off-Canvas Drawer:**
   - Sembunyikan sidebar dari aliran dokumen normal di mobile menggunakan `position: fixed; left: -100%; top: 0; height: 100vh; z-index: 2000; transition: left 0.3s ease;`.
   - Sedialan tombol pemicu navigasi yang jelas di navbar atas (contoh: tombol **"📖 Daftar Materi"** atau ikon Hamburger).
   - Saat drawer terbuka (`left: 0`), aktifkan elemen *backdrop overlay* gelap semi-transparan (`rgba(0, 0, 0, 0.5)`) di belakang drawer.
   - Berikan kemudahan menutup drawer dengan menekan tombol **✕** di header drawer, mengklik area backdrop, atau saat salah satu item navigasi dipilih.
3. **Pola Exclusive Accordion (Auto-Collapse Navigation):**
   - Dalam daftar navigasi yang dikelompokkan ke dalam kategori/folder, wajib menerapkan logika *Exclusive Accordion* (baik pada Desktop Sidebar maupun Mobile Drawer).
   - Setiap kali satu header kategori diklik untuk dibuka, sistem **wajib menutup seluruh kategori lain yang sedang terbuka** terlebih dahulu.
   - **Manfaat:** Menjamin maksimal hanya ada 1 kategori yang terbuka pada satu waktu, menjaga tinggi menu tetap ringkas, tidak menumpuk, dan mudah ditelusuri.
4. **Minimalist Single-Row Navbar di Mobile:**
   - Pada resolusi mobile (`<= 640px`), hindari label teks panjang di navbar yang dapat menyebabkan teks terpecah menjadi 2 baris atau lebih (*text wrapping*).
   - Gunakan struktur adaptif (contoh: elemen span terpisah untuk desktop vs mobile) agar teks panjang di desktop (misal: `"Kembali ke Beranda"`, `"Daftar Materi"`) otomatis berubah menjadi label singkat di mobile (misal: `"← Beranda"`, `"📖 Materi"`).
   - Tombol sekunder seperti Dark/Light Mode wajib diubah menjadi tombol ikon melingkar kompak (`width: 36px; height: 36px; border-radius: 50%;`).
   - Terapkan aturan CSS `white-space: nowrap;` pada seluruh tombol navbar untuk menjamin layout tetap utuh dalam 1 baris horizontal yang bersih.
