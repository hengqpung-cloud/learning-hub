# 🏢 INFORMA Retail Excellence Learning Hub

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)

Platform pembelajaran digital interaktif (*web app*) terintegrasi yang dirancang untuk mendukung peningkatan kompetensi operasional, pengetahuan produk (*product knowledge*), standar pelayanan (*service excellence*), dan keterampilan menjual (*selling skills*) seluruh staf toko **INFORMA**.

---

## 🌟 Fitur Utama (Key Features)

### 👤 1. Pengalaman Belajar Staf Toko (Store Staff Experience)
- **Identitas & Sesi Pengguna**: Sistem login berbasis NIK, Nama, dan Cabang Toko tanpa prosedur rumit.
- **Dual Progress Tracking**: Monitoring terpisah antara **Progress Membaca Modul (%)** dan **Progress Kelulusan Evaluasi (%)**.
- **Smart Notification Banner**: Notifikasi otomatis di beranda yang memberikan petunjuk modul yang harus dilanjutkan atau evaluasi yang siap dikerjakan.
- **Pembaca Kurikulum MDX**:
  - 🗺️ **Breadcrumb Navigasi**: Jejak navigasi hirarkis `Beranda > Kategori > Topik`.
  - 🔤 **Font Size Adjuster**: Pengatur ukuran teks bacaan (`A-`, `A`, `A+`) yang tersimpan otomatis di `localStorage`.
  - 🎬 **Contextual Video Card**: Rekomendasi video pelatihan YouTube yang relevan di bagian bawah materi.
- **Mesin Evaluasi Interaktif (Quiz Engine)**:
  - 🔀 **Pengacakan Fisher-Yates**: Soal dan urutan opsi A/B/C/D diacak otomatis di setiap sesi.
  - 💊 **Question Navigator Pills (1-10)**: Panel navigator nomor soal untuk melompati / mengulang soal.
  - ⌛ **Live Timer Counter**: Penghitung durasi waktu pengerjaan kuis real-time.
  - 💡 **Educational Feedback Box**: Penjelasan & pembahasan edukatif di setiap soal saat mode tinjau jawaban (*Review Mode*).
- **Kamus Glosarium Retail**: Pencarian instan istilah ritel, SOP, dan DISC dengan paginasi client-side **"Load More" (8 item per batch)**.
- **Galeri Video Pembelajaran**: Pemutar modal YouTube interaktif untuk video simulasi pelayanan toko.

### 👔 2. Portal & Dashboard Monitoring HRD (HRD Officer Portal)
- **Akses Keamanan PIN HRD**: Login khusus evaluasi HRD dengan kode PIN yang dapat diperbarui secara mandiri.
- **Dashboard Real-Time KPI**:
  - Total Staf Terdaftar
  - Persentase Kelulusan Evaluasi (%)
  - Rata-Rata Skor Quiz Akumulasi
  - Total Topik Terbaca
- **Penyaringan & Pencarian Data**: Filter staf berdasarkan NIK, Nama, Toko Cabang, dan Status Kelulusan (*Complete / In-Progress / Not-Started*).
- **📥 Export Laporan CSV / Excel**: Sekali klik untuk mengunduh rekapitulasi data nilai seluruh staf dalam format `.csv` (Microsoft Excel).
- **Manajemen Staf**: Hapus data staf non-aktif / resign.

### 📱 3. Desain & Aksesibilitas Modern
- **100% Mobile Responsive Layout**: Tampilan presisi di Desktop, Tablet, hingga Smartphone (320px–414px).
- **Dynamic Hamburger Drawer**: Menu dropdown navigasi mobile yang menyesuaikan peran pengguna secara otomatis.
- **Dark & Light Mode Toggle**: Pengubah tema terang/gelap yang nyaman di mata.

---

## 📂 Struktur Repositori (Project Structure)

```text
retail-excellence-learning-hub/
├── content/                     # Folder modul kurikulum berbasis MDX/MD
│   ├── basic-service/           # Modul Standar Pelayanan Dasar
│   ├── dining-department/       # Modul Pengetahuan Area Dining
│   ├── glossary/                # Modul Istilah Retail
│   ├── product-knowledge/       # Modul Pengetahuan Produk Furniture
│   ├── selling-skills/          # Modul Keterampilan Menjual
│   └── service-excellence/      # Modul Pelayanan Prima
├── nav.json                     # Index struktur kurikulum hasil auto-generate
├── generate-nav.js              # Script Node.js untuk pembuat otomatis nav.json
├── firebase-config.js           # Konfigurasi & helper database Firebase Firestore
├── index.html                   # Halaman Beranda Utama & Kurikulum
├── topic.html                   # Halaman Pembaca Modul Pembelajaran
├── quiz.html                    # Halaman Mesin Evaluasi Kategori (Quiz)
├── dashboard.html               # Halaman Dashboard Monitoring HRD
├── profile.html                 # Halaman Profil & Pencapaian Staf
├── glossary.html                # Halaman Kamus Glosarium Retail
├── videos.html                  # Halaman Galeri Video Pembelajaran
├── styles.css                   # Master CSS Design System (Vanilla CSS)
├── MANUAL_PENGGUNAAN.md         # Buku Panduan & Manual Operasional Penggunaan
└── README.md                    # Dokumentasi Repositori GitHub
```

---

## 🚀 Panduan Memulai (Quick Start)

### 1. Prasyarat (Prerequisites)
Aplikasi ini berjalan penuh di browser (*client-side web application*). Anda hanya memerlukan browser modern (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge) dan local web server sederhana.

### 2. Menjalankan secara Lokal (Run Locally)

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/hengqpung-cloud/learning-hub.git
   cd learning-hub
   ```

2. **Generate Index Kurikulum (Opsional jika menambah file MDX baru)**:
   ```bash
   node generate-nav.js
   ```

3. **Jalankan Local Web Server**:
   - Menggunakan **VSCode Live Server**: Klik kanan pada `index.html` -> *Open with Live Server*.
   - Menggunakan **Node.js `serve`**:
     ```bash
     npx serve ./
     ```
   - Menggunakan **Python**:
     ```bash
     python -m http.server 8000
     ```

4. **Buka Aplikasi di Browser**:
   Buka URL `http://localhost:8000` atau URL Live Server Anda.

---

## 📄 Panduan Penggunaan Lengkap

Untuk panduan operasional detail bagi Staf Toko dan HRD Officer, silakan merujuk ke dokumen:
- 📖 **[MANUAL_PENGGUNAAN.md](MANUAL_PENGGUNAAN.md)**

---

## 🛠️ Teknologi yang Penggunaan (Tech Stack)

- **Frontend**: Vanilla HTML5, Vanilla CSS3 (Custom Design Tokens), Vanilla JavaScript (ES6+)
- **Font & Icon**: Google Fonts (Inter, Playfair Display), Font Awesome 6.4
- **Database & Sync**: Firebase Firestore (Web SDK v8) & LocalStorage Sync
- **Markdown Parser**: Marked.js
- **Hosting Compatibility**: Vercel, Netlify, GitHub Pages, Firebase Hosting

---
*INFORMA Retail Excellence Learning Hub &copy; 2026. All Rights Reserved.*
