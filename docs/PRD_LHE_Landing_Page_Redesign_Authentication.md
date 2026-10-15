# Product Requirements Document (PRD)
# LHE — Retail Excellence Learning Hub (Informa Kupang)
## Redesign Landing Page Publik & Pengamanan Akses Berbasis Autentikasi

**Kode Dokumen:** `PRD-LHE-2026-V1.0`  
**Status:** DRAFT UNTUK REVIEW PENGGUNA (FASE 1 SELESAI — MENUNGGU PERSETUJUAN EKSPLISIT)  
**Peran Auditor & Penulis:** Senior Product Manager, UX Architect, Application Security Engineer, & Technical Architect  
**Tanggal Audit:** 15 Oktober 2026  
**Target Aplikasi:**
- Repositori Operasional Eksisting: `D:\retail-excellence-learning-hub` (`https://github.com/hengqpung-cloud/learning-hub.git`)
- Blueprint Engine Baru: `D:\learning-hub-engine` (`https://github.com/hengqpung-cloud/lhe.git`)

---

## 1. Ringkasan Eksekutif

Learning Hub Engine (LHE) Informa Kupang adalah platform pembelajaran digital internal yang dirancang untuk mendukung pelatihan operasional, pemahaman produk (*product knowledge*), keterampilan penjualan (*selling skills*), dan standar pelayanan pelanggan (*service excellence*) bagi seluruh staf ritel Informa.

Saat ini, platform operasional (`D:\retail-excellence-learning-hub`) menggabungkan halaman muka publik dan dashboard pembelajaran ke dalam satu halaman tunggal (`index.html`). Akibatnya, pengunjung anonim (guest/publik) dapat langsung melihat kurikulum internal, progres pembelajaran, data pencapaian evaluasi, dan katalog video pelatihan. Di sisi keamanan, proteksi hak akses administrator (HRD) dan pengguna hanya bergantung pada penyimpanan lokal peramban (*LocalStorage*) dan validasi PIN di sisi klien (*client-side JavaScript*), tanpa otorisasi terpusat atau proteksi rute yang kokoh.

Dokumen PRD ini menetapkan spesifikasi komprehensif untuk:
1. **Pemisahan Pengalaman Pengguna:** Memisahkan secara tegas Landing Page Publik (berorientasi pada pengenalan platform, *corporate branding*, dan ajakan masuk/login) dari Dashboard Pembelajaran Privat (yang hanya dapat diakses setelah autentikasi staf toko dan HRD).
2. **Redesign Landing Page Publik (Mockup Gambar 2):** Mengadopsi tata letak modern, profesional, dan elegan berbasis identitas korporat Informa (Dark Navy `#07172E`, Informa Blue `#103972`, Informa Red `#DC3545`), menampilkan Hero Section dengan *brand messaging* tunggal, 3 Kartu Keunggulan (*Platform Highlights*), dan Call-to-Action banner yang bersih tanpa kebocoran data materi/kurikulum privat.
3. **Pengamanan Akses & Autentikasi Multilapis:** Menetapkan kontrol akses berbasis peran (*Role-Based Access Control / RBAC*) yang mencakup proteksi rute privat (`topic.html`, `quiz.html`, `videos.html`, `glossary.html`, `profile.html`, `dashboard.html`), pencegahan bypass melalui URL langsung atau manipulasi *LocalStorage*, serta pengamanan integrasi backend/database Supabase PostgreSQL.
4. **Jaminan Integritas Data & Nol Kerusakan (Zero Data Loss):** Memastikan seluruh data pengguna, rekam jejak progres membaca, skor evaluasi, dan konten CMS yang telah berjalan di Supabase tetap utuh 100% tanpa perubahan skema database yang destruktif.

Implementasi teknis FASE 2 hanya akan dieksekusi setelah PRD ini ditinjau dan disetujui secara eksplisit oleh pemangku kepentingan.

---

## 2. Latar Belakang dan Kondisi Saat Ini (Hasil Audit Proyek Read-Only)

Pemeriksaan komprehensif secara *read-only* telah dilakukan terhadap dua repositori terkait di lingkungan lokal:

### 2.1 Hasil Audit Repositori Eksisting (`D:\retail-excellence-learning-hub`)
Repositori ini merupakan aplikasi yang saat ini berjalan dan menjadi subjek tangkapan layar **Gambar 1**.
- **Teknologi Frontend:** Vanilla HTML5, Vanilla CSS3 (Custom Design Tokens), Vanilla JavaScript (ES6+), FontAwesome 6.5.1, Google Fonts (*Inter*, *Playfair Display*).
- **Infrastruktur Data & Backend:** Supabase Cloud PostgreSQL (`https://ptoehxghynpzggsqpory.supabase.co`), Supabase JS SDK v2, dan sinkronisasi `localStorage`.
- **Komponen & Arsitektur Halaman:**
  - `index.html`: Berfungsi ganda sebagai Landing Page sekaligus Dashboard Pembelajaran. Memuat Hero Section, *Dual Progress Tracker* (`#read-progress-fill`, `#eval-progress-fill`), Smart Notification Banner, Kurikulum 6 Kategori dengan Accordion, dan Video Preview Card.
  - `topic.html`: Halaman pembaca materi MDX/MD dengan breadcrumb, font size adjuster, dan tombol penanda selesai.
  - `quiz.html`: Mesin evaluasi interaktif (10 soal pilihan ganda, pengacakan Fisher-Yates, timer, dan educational feedback).
  - `dashboard.html`: Dashboard Monitoring HRD & CMS internal (kelola cabang toko, kategori, topik, soal kuis, glosarium, dan video).
  - `videos.html`: Galeri video pembelajaran YouTube interaktif.
  - `glossary.html`: Kamus istilah ritel dengan pencarian instan dan paginasi *load more*.
  - `profile.html`: Rekapitulasi profil staf, riwayat belajar, dan status kelulusan sertifikasi.
  - `app-shell.js`: Komponen UI bersama (Theme dark/light toggle, mobile hamburger drawer, session header `renderUserBadge`).
  - `supabase-config.js`: Helper komunikasi Supabase untuk tabel `users`, `read_topics`, `quiz_results`, `stores`, `categories`, `topics`, `quiz_questions`, `glossary_terms`, dan `videos`.
  - `server.js`: Web server lokal berbasis modul `http` Node.js bawaan dengan routing bersih (*clean URLs*).

### 2.2 Hasil Audit Repositori Engine Baru (`D:\learning-hub-engine`)
Repositori ini adalah implementasi blueprint *Enterprise AI-Powered Learning Platform* berbasis Next.js sebagaimana dirujuk dalam `project_constitution.md`.
- **Teknologi:** Next.js 16.2.10 (App Router), React 19.2.4, TypeScript 5, Tailwind CSS v4, shadcn/ui, `next-mdx-remote` v6, Zod v4, Fuse.js v7, Vitest v5.
- **Rute yang Tersedia:**
  - `app/(dashboard)/page.tsx`: Dashboard modern yang membaca materi statis dari folder `content/` via `lib/content.ts`.
  - `app/lesson/[slug]/page.tsx`: Halaman render modul berbasis MDX statis.
- **Status Kepatuhan Konstitusi:** Pada Versi 1.0 `project_constitution.md` Bagian 3, fitur *Autentikasi & Keamanan (Login, SSO, Role Management)* dan *Quiz Engine* secara eksplisit dideklarasikan sebagai *Out-of-Scope*. Oleh karena itu, arsitektur operasional saat ini yang melayani staf Informa Kupang secara penuh masih berpusat pada repositori `D:\retail-excellence-learning-hub`.

### 2.3 Matriks Temuan Audit Berdasarkan Kategori Status

| Kategori Status | Fitur / Komponen | Bukti Temuan Lapangan |
|---|---|---|
| **1. Berfungsi & Terverifikasi** | Dual Progress Tracking & Smart Banner | Berfungsi membaca dan menampilkan persentase baca dan skor kuis dari `localStorage` dan Supabase. |
| | Mesin Kuis Fisher-Yates | Berfungsi mengacak soal di `quiz.html` dengan batas kelulusan skor 70. |
| | CMS Konten HRD di Supabase | Berfungsi melakukan CRUD kategori, topik, kuis, dan toko di `dashboard.html`. |
| | Dukungan Tema Gelap/Terang | Variabel CSS `:root` dan `[data-theme="dark"]` berjalan mulus melalui `app-shell.js`. |
| **2. Tersedia tapi Berpotensi Tidak Aman / Belum Lengkap** | Autentikasi Pengguna & Sesi | Hanya disimpan di `localStorage.setItem('informa_user_profile', ...)`. Tidak ada token sesi bertandatangan kriptografis (JWT/Cookie HttpOnly). Pengguna dapat memalsukan identitas dan peran di konsol peramban. |
| | Autentikasi Administrator (HRD) | Proteksi `dashboard.html` hanya memverifikasi PIN string (`informa_hrd_pin`, default: `"1980"`) di sisi klien (`localStorage`). Nilai default terekspos di kode sumber `index.html:203` dan `supabase-config.js:291`. |
| | Proteksi Rute Klien | `topic.html`, `quiz.html`, dan `profile.html` melakukan redirect klien (`window.location.replace('index.html')`), namun rute `videos.html` dan `glossary.html` sama sekali tidak memiliki proteksi (dapat dibuka bebas oleh guest). |
| | Kunci Anon Supabase | `SUPABASE_ANON_KEY` dipublikasikan secara terbuka di `supabase-config.js:6`. Tanpa RLS (*Row Level Security*) yang ketat, siapa pun dapat memanggil REST API Supabase langsung. |
| **3. Belum Tersedia** | Landing Page Publik Terisolasi | Belum ada halaman muka publik murni yang terpisah dari dashboard pembelajaran (saat ini bercampur di `index.html`). |
| | Otorisasi Server-Side / Middleware | Belum ada mekanisme proteksi rute di layer HTTP server (`server.js` hanya melayani file statis tanpa otentikasi header/kuki). |
| | Rute Dashboard Staf Khusus | Belum ada rute khusus seperti `dashboard-user.html` atau pemisahan view antara beranda promosi dan area belajar. |
| **4. Belum Terverifikasi Penuh** | Konfigurasi RLS Supabase Cloud | Akses langsung ke dasbor Supabase Cloud memerlukan kredensial pengelola (*dashboard admin*), sehingga aturan RLS tabel saat ini diasumsikan *open/permissive* mengikuti perilaku anon key. |

---

## 3. Rumusan Masalah

1. **Pencampuran Ruang Publik dan Ruang Kerja Internal:**
   Halaman pembuka (`index.html`) saat ini menyajikan seluruh katalog kurikulum, judul materi internal, indikator progres, dan video studi kasus toko kepada siapa saja yang membuka tautan, meskipun pengguna belum mengidentifikasikan dirinya. Hal ini tidak mencerminkan standar portal enterprise modern dan berisiko membocorkan materi internal perusahaan.
2. **Ketiadaan Halaman Pengenalan Korporat yang Representatif:**
   Pengunjung baru atau staf yang belum login langsung dihadapkan pada antarmuka pembelajaran teknis tanpa adanya pengantar visi, manfaat platform (*value proposition*), maupun identitas resmi *Retail Excellence Learning Hub* yang elegan sebagaimana ditunjukkan pada mockup Gambar 2.
3. **Kerapuhan Sistem Keamanan Berbasis Klien (*Client-Side Fragility*):**
   Akses administrator ke data seluruh staf dan pengelolaan CMS di `dashboard.html` hanya dipagari oleh verifikasi JavaScript lokal terhadap PIN `"1980"`. Siapa pun dengan pengetahuan teknis dasar dapat memodifikasi objek `informa_user_profile` di *Application Storage* dan memperoleh hak akses HRD penuh.
4. **Inkonsistensi Proteksi Rute Antarhalaman:**
   Halaman baca topik dan kuis memiliki pengecekan login dasar, tetapi galeri video (`videos.html`) dan kamus glosarium (`glossary.html`) sepenuhnya terbuka bagi guest tanpa proteksi apa pun.

---

## 4. Tujuan dan Batasan Pekerjaan

### 4.1 Tujuan Produk & Teknis
1. Merancang dan mengimplementasikan **Landing Page Publik** murni di rute utama (`/` atau `index.html`) yang selaras 100% dengan Mockup Desain (Gambar 2).
2. Memindahkan atau mengisolasi pengalaman belajar terautentikasi (Kurikulum, Progres Belajar, Evaluasi, Video, Glosarium) ke dalam **Area Pembelajaran Terproteksi** yang hanya dapat diakses setelah login.
3. Memperbaiki alur autentikasi dan otorisasi:
   - Guest diarahkan ke login jika mencoba mengakses rute pembelajaran.
   - Staf toko diarahkan ke Dashboard Pembelajaran setelah login.
   - HRD Officer diarahkan ke Dashboard HRD/Admin setelah memasukkan kredensial dan PIN valid.
4. Memperketat otorisasi frontend dan backend tanpa mengganggu data atau fungsi yang sudah beroperasi di Supabase.

### 4.2 Batasan Pekerjaan (Out-of-Scope)
- Tidak melakukan migrasi platform besar-besaran (misalnya memaksa pemindahan paksa seluruh database operasional ke sistem otentikasi baru di luar kesepakatan).
- Tidak merombak isi materi kurikulum Markdown/MDX yang sudah ada di folder `content/`.
- Tidak mengganti sistem penilaian kuis 70% atau algoritma pengacakan Fisher-Yates yang telah berjalan stabil.
- Tidak menghapus akun, riwayat baca, atau skor kuis staf yang tersimpan di Supabase.

---

## 5. Jenis Pengguna dan Matriks Hak Akses

### 5.1 Definisi Persona Pengguna

1. **Guest (Pengunjung Publik / Belum Login):**
   Karyawan baru yang belum login, calon pengguna, atau publik yang membuka alamat web LHE.
2. **Authenticated User (Staf Toko / Sales Executive):**
   Karyawan Informa yang telah login menggunakan NIK, Nama, dan Toko Cabang dengan peran `staff`.
3. **Authenticated Administrator (HRD Officer / Evaluator):**
   Petugas HRD/Admin yang telah login dan memasukkan PIN HRD yang valid dengan peran `hrd`.

### 5.2 Matriks Hak Akses (Access Control Matrix)

| Resource / Rute Aplikasi | Guest (Publik) | Staf Toko (User) | HRD Officer (Admin) | Kebijakan & Penanganan Akses |
|---|---|---|---|---|
| **Landing Page Publik (`index.html`)** | ✅ Akses Penuh | ✅ Akses (Tampil Link ke Dashboard) | ✅ Akses (Tampil Link ke Portal HRD) | Menampilkan profil platform, hero, highlight keunggulan, CTA login. |
| **Modal / Halaman Login** | ✅ Akses Penuh | 🔄 Dialihkan ke Dashboard | 🔄 Dialihkan ke Dashboard Admin | Formulir NIK, Nama, Cabang Toko, dan PIN (jika HRD). |
| **Dashboard Pembelajaran Staf** | ❌ Ditolak (Redirect ke Login) | ✅ Akses Penuh | ✅ Akses Penuh | Menampilkan progres belajar, modul aktif, rekomendasi materi. |
| **Modul Kurikulum & Topik (`topic.html`)**| ❌ Ditolak (Redirect ke Login) | ✅ Akses Penuh | ✅ Akses Penuh | Pembaca materi internal dan penandaan selesai. |
| **Mesin Evaluasi / Quiz (`quiz.html`)** | ❌ Ditolak (Redirect ke Login) | ✅ Akses Penuh | ✅ Akses Penuh | Pengerjaan kuis evaluasi kelulusan per kategori. |
| **Galeri Video (`videos.html`)** | ❌ Ditolak (Redirect ke Login) | ✅ Akses Penuh | ✅ Akses Penuh | Menonton video simulasi dan studi kasus pelayanan. |
| **Glosarium Retail (`glossary.html`)** | ❌ Ditolak (Redirect ke Login) | ✅ Akses Penuh | ✅ Akses Penuh | Kamus istilah toko, SOP, dan terminologi ritel. |
| **Profil & Pencapaian (`profile.html`)**| ❌ Ditolak (Redirect ke Login) | ✅ Akses Milik Sendiri | ✅ Akses Milik Sendiri | Riwayat pencapaian materi, sertifikat kelulusan. |
| **Dashboard Monitoring HRD (`dashboard.html`)**| ❌ Ditolak (Redirect ke Login) | ❌ Ditolak (Akses Dilarang 403) | ✅ Akses Penuh | Rekapitulasi nilai, monitoring staf, ekspor Excel/CSV. |
| **CMS Konten Kurikulum di Dashboard**| ❌ Ditolak | ❌ Ditolak | ✅ Akses Penuh | Tambah, ubah, dan hapus topik, soal kuis, video, toko. |
| **API / Supabase Read Topics** | ❌ Hanya via Sesi Valid | ✅ NIK Pengguna Terkait | ✅ Seluruh Staf | Cegah kebocoran aktivitas karyawan ke publik. |
| **API / Supabase Quiz Results** | ❌ Hanya via Sesi Valid | ✅ NIK Pengguna Terkait | ✅ Seluruh Staf | Data nilai dan kelulusan bersifat rahasia internal. |

---

## 6. Kebutuhan Fungsional (Functional Requirements)

### Modul A: Landing Page Publik & Branding

#### FR-001: Tampilan Landing Page Publik Eksklusif
- **Prioritas:** P0 (Kritis)
- **Deskripsi:** Halaman utama (`/` atau `index.html`) hanya menampilkan konten perkenalan platform LHE tanpa elemen kurikulum, materi, atau progres pribadi.
- **Perilaku yang Diharapkan:**
  - Pengunjung disambut oleh Navbar publik, Hero Section korporat, Bagian "Mengapa LHE?" (3 Platform Highlights), Banner Ajakan Belajar (CTA), dan Footer resmi.
  - Tidak ada komponen *Dual Progress Tracker*, *Smart Notification Banner*, daftar topik kurikulum, maupun pemutar video yang muncul pada state publik.
- **Kriteria Penerimaan (Acceptance Criteria):**
  - [ ] Halaman memuat elemen visual sesuai Mockup Gambar 2 (Kiri).
  - [ ] Inspeksi DOM membuktikan tidak ada data topik atau progres yang tersembunyi lewat `display:none` semata; konten tersebut tidak dimuat di halaman publik.

#### FR-002: Header & Navigasi Publik
- **Prioritas:** P0 (Kritis)
- **Deskripsi:** Navbar publik menyajikan identitas brand dan navigasi informatif ringkas bagi calon pengguna.
- **Perilaku yang Diharapkan:**
  - Menampilkan logo `INFORMA Hub` dan teks deskriptif `Retail Excellence Learning Hub`.
  - Tautan navigasi: `Beranda`, `Tentang`, `Keunggulan`, `Kontak`.
  - Tombol aksi utama: `Login` berwarna merah kapsul (*pill button*).
  - Untuk pengguna belum login, tidak menampilkan nama, avatar, tombol logout, maupun menu Portal HRD.
- **Kriteria Penerimaan:**
  - [ ] Klik tombol `Login` membuka formulir modal login atau mengarahkan ke halaman otentikasi.
  - [ ] Klik tautan navigasi melakukan *smooth scrolling* ke section terkait di landing page.

#### FR-003: Hero Section & Single Core Messaging
- **Prioritas:** P0 (Kritis)
- **Deskripsi:** Bagian hero menyampaikan nilai strategis LHE secara jelas dan terfokus.
- **Perilaku yang Diharapkan:**
  - Tagline pendukung: *"Learn. Practice. Deliver Excellent Service."*
  - Headline utama: *"Retail Excellence Learning Hub"*
  - Subheadline: *"Platform pembelajaran digital internal Informa untuk meningkatkan kompetensi karyawan, memperdalam pengetahuan produk, dan menghadirkan pelayanan pelanggan yang unggul."*
  - CTA Utama: Tombol merah *"Masuk untuk Mulai Belajar ➔"*.
  - Visual kanan: Menampilkan foto resmi staf toko Informa berseragam polo navy yang tersenyum sambil membawa tablet, dilengkapi aksen tulisan *"Better People Better Service"*.
- **Kriteria Penerimaan:**
  - [ ] CTA Utama membuka alur login.
  - [ ] Desain responsif: Gambar berpindah secara proporsional di bawah teks pada layar tablet dan mobile.

#### FR-004: Platform Highlights ("Mengapa LHE?")
- **Prioritas:** P1 (Tinggi)
- **Deskripsi:** Menjelaskan tiga pilar keunggulan utama platform LHE secara ringkas tanpa mengekspos materi rahasia.
- **Perilaku yang Diharapkan:**
  - Kartu 1: **Materi Pembelajaran Terstruktur** — *Pembelajaran berdasarkan kategori dan kebutuhan kompetensi retail.* (Ikon Buku).
  - Kartu 2: **Video dan Simulasi Interaktif** — *Memahami penerapan standar pelayanan melalui visual dan studi kasus.* (Ikon Video).
  - Kartu 3: **Evaluasi Kompetensi** — *Mengukur pemahaman melalui evaluasi pembelajaran.* (Ikon Perisai Centang).
- **Kriteria Penerimaan:**
  - [ ] Tiga kartu tersusun sejajar 3 kolom pada desktop dan bertumpuk 1 kolom pada mobile.
  - [ ] Kartu tidak berisi tautan langsung yang membuka materi internal bagi guest.

#### FR-005: Call-to-Action Banner & Footer Korporat
- **Prioritas:** P1 (Tinggi)
- **Deskripsi:** Banner penutup di bagian bawah landing page sebelum footer untuk menegaskan kembali ajakan bertindak.
- **Perilaku yang Diharapkan:**
  - Banner berlatar belakang biru navy dengan visual laptop: *"Siap meningkatkan kompetensi Anda? Masuk sekarang dan mulai perjalanan belajar Anda di Retail Excellence Learning Hub."* dengan tombol *"Login Sekarang ➔"*.
  - Footer memuat: Brand `INFORMA Hub`, `Retail Excellence Learning Hub`, teks *"Platform pembelajaran internal karyawan Informa"*, hak cipta *"© 2025 Informa. All rights reserved."*, dan slogan *"Better People Better Service"*.
- **Kriteria Penerimaan:**
  - [ ] Tautan hak cipta dan identitas korporat tampil konsisten.

---

### Modul B: Autentikasi, Sesi, dan Otorisasi

#### FR-006: Alur Masuk Multi-Role (Login Flow)
- **Prioritas:** P0 (Kritis)
- **Deskripsi:** Mekanisme pengisian identitas staf atau otentikasi administrator.
- **Perilaku yang Diharapkan:**
  - Formulir meminta: NIK / Kode Karyawan, Nama Lengkap, Cabang Toko, dan Peran (Staf Toko / HRD Officer).
  - Jika peran `hrd` dipilih, kolom input kata sandi/PIN akses HRD wajib muncul dan divalidasi.
  - Setelah verifikasi berhasil:
    - Data sesi disimpan secara aman.
    - Sinkronisasi data progres dan nilai dari Supabase dijalankan secara otomatis berdasarkan NIK.
    - Staf diarahkan ke Dashboard Pembelajaran.
    - HRD diarahkan ke Dashboard Monitoring HRD.
- **Kriteria Penerimaan:**
  - [ ] Login staf berhasil tanpa membutuhkan PIN.
  - [ ] Login HRD gagal jika PIN salah, dan berhasil jika PIN benar.
  - [ ] Data profil aktif tersimpan dengan struktur `{ nik, name, store, role, authenticatedAt }`.

#### FR-007: Proteksi Rute Privat & Redirect Guest
- **Prioritas:** P0 (Kritis)
- **Deskripsi:** Seluruh halaman fitur internal (`topic.html`, `quiz.html`, `videos.html`, `glossary.html`, `profile.html`, `dashboard.html`) wajib memverifikasi sesi aktif sebelum menampilkan konten.
- **Perilaku yang Diharapkan:**
  - Jika pengguna belum terautentikasi (guest) membuka rute privat secara langsung (misal: mengetikkan URL `topic.html?category=selling-skills`):
    - Sistem segera mencegat akses (sebelum konten internal sempat dirender di layar).
    - Menyimpan URL tujuan semula (`redirectUrl`).
    - Mengarahkan guest ke landing page / modal login dengan notifikasi informatif: *"Silakan login terlebih dahulu untuk mengakses materi pembelajaran."*
  - Setelah login berhasil, pengguna secara otomatis diarahkan kembali ke `redirectUrl` yang dituju semula.
- **Kriteria Penerimaan:**
  - [ ] Guest tidak dapat melihat isi file bacaan, video, kamus istilah, atau kuis melalui URL langsung.
  - [ ] Deep linking berhasil mengembalikan staf ke halaman materi yang diinginkan setelah login.

#### FR-008: Otorisasi Administrator & Pencegahan Akses Ilegal Staf
- **Prioritas:** P0 (Kritis)
- **Deskripsi:** Memastikan staf toko biasa tidak dapat membuka atau mengeksekusi fitur administratif di `dashboard.html`.
- **Perilaku yang Diharapkan:**
  - `dashboard.html` memeriksa peran pengguna. Jika pengguna login tetapi `role !== 'hrd'`, akses ditolak dengan pesan: *"Akses Ditolak: Anda tidak memiliki wewenang untuk membuka portal administrator."* dan diarahkan ke Dashboard Staf.
  - Pemanggilan fungsi penghapusan staf (`deleteStaffUser`), mutasi toko, kategori, kuis, atau video memverifikasi status HRD.
- **Kriteria Penerimaan:**
  - [ ] Staf toko biasa yang mencoba membuka `dashboard.html` segera terlempar keluar tanpa mengekspos tabel data staf.

#### FR-009: Mekanisme Logout & Pembersihan Sesi
- **Prioritas:** P1 (Tinggi)
- **Deskripsi:** Pengguna dapat keluar dari sesi secara bersih dan aman.
- **Perilaku yang Diharapkan:**
  - Mengklik tombol Logout memunculkan konfirmasi.
  - Jika dikonfirmasi: Menghapus data sesi lokal, membersihkan cache sensitif, dan mengarahkan kembali ke landing page publik.
- **Kriteria Penerimaan:**
  - [ ] Setelah logout, menekan tombol *Back* di peramban tidak boleh mengembalikan data pengguna atau mengizinkan akses ke rute privat tanpa login ulang.

---

### Modul C: Dashboard Pembelajaran Terautentikasi (Staf & Admin)

#### FR-010: Dashboard Pembelajaran Staf (Mockup Gambar 2 - Kanan Atas)
- **Prioritas:** P1 (Tinggi)
- **Deskripsi:** Menyediakan antarmuka dashboard pembelajaran yang terisolasi khusus bagi staf yang telah login.
- **Perilaku yang Diharapkan:**
  - Header: Logo Informa Hub, Search bar materi, lonceng notifikasi, identitas staf (Avatar + Nama: misal *"Andi Pratama - Staff Store"*).
  - Sidebar Navigasi: `Beranda`, `Kurikulum Materi`, `Video Pembelajaran`, `Evaluasi`, `Progres Belajar`, `Keluar / Logout`.
  - Greeting Banner: Ucapan personalisasi *"Halo, [Nama Pengguna] 👋 Terus belajar dan kembangkan kompetensimu untuk memberikan pelayanan terbaik."* dengan visual latar belakang toko.
  - Widget Progres Cepat:
    - *Progres Pembelajaran*: Indikator meteran melingkar (gauge) atau dual progress bar.
    - *Kurikulum Saat Ini*: Modul yang sedang aktif dipelajari beserta jumlah materi tersisa.
  - Bagian *Rekomendasi untuk Anda*: Kartu modul kurikulum, video simulasi, dan kuis evaluasi.
- **Kriteria Penerimaan:**
  - [ ] Staf toko yang login disajikan antarmuka pembelajaran terpadu ini, bukan kembali ke landing page promosi.

#### FR-011: Dashboard Administrator / HRD (Mockup Gambar 2 - Kanan Bawah)
- **Prioritas:** P1 (Tinggi)
- **Deskripsi:** Menyediakan antarmuka pengelolaan bagi petugas HRD untuk memantau performa dan mengelola konten.
- **Perilaku yang Diharapkan:**
  - Sidebar Navigasi Admin: `Dashboard`, `Kelola Pengguna`, `Kurikulum & Materi`, `Video Pembelajaran`, `Evaluasi`, `Laporan`, `Pengaturan`, `Keluar`.
  - KPI Stat Cards: *Total Pengguna*, *Materi Tersedia*, *Video Pembelajaran*, *Evaluasi*.
  - Visualisasi Data: Grafik *Aktivitas Pembelajaran* (User Aktif & Selesai Belajar) dan *Kategori Materi Terpopuler*.
  - Feed Aktivitas Terbaru: Log staf yang baru menyelesaikan modul atau evaluasi.
- **Kriteria Penerimaan:**
  - [ ] Dashboard HRD memuat seluruh fitur monitoring dan CMS yang sebelumnya ada di `dashboard.html` dengan tata letak modern yang selaras dengan mockup.

---

## 7. Spesifikasi UX/UI

### 7.1 Design Tokens & Palet Warna Resmi
Berdasarkan audit file `styles.css` dan visual Mockup Gambar 2:

| Token Desain | Nilai Hex / HSL | Penggunaan Utama |
|---|---|---|
| `--color-bg-navy` | `#07172E` | Latar belakang dasar Dark Mode & Navbar Landing Page Publik |
| `--color-primary-blue` | `#103972` | Latar belakang section, kartu sekunder, header teks terang |
| `--color-accent-red` | `#DC3545` | Tombol CTA Utama (*Login*, *Masuk untuk Mulai Belajar*), aksen logo |
| `--color-accent-red-hover` | `#B02A37` | Hover state tombol CTA utama |
| `--color-surface-card` | `#102E5C` (Gradasi `#0A1E3F`) | Latar belakang kartu highlight dan widget dashboard |
| `--color-card-border` | `#1B4582` | Border subtle pada kartu dan input formulir |
| `--color-text-primary` | `#F0F4F8` | Teks judul utama dan body teks dengan kontras tinggi |
| `--color-text-muted` | `#A0AEC0` | Teks sekunder, deskripsi pendukung, metadata |
| `--color-success-green` | `#28A745` | Indikator kelulusan evaluasi (skor ≥ 70) |

### 7.2 Tipografi
- **Headings & Serif Accents:** `Playfair Display`, serif (digunakan pada logo accent, headline landing page, dan kartu penegasan).
- **Body & UI Elements:** `Inter`, sans-serif (digunakan pada menu navigasi, tombol, teks deskripsi, input, dan tabel).
- **Script Slogan:** Font dekoratif bergaya *handwritten* untuk teks *"Better People Better Service"*.

### 7.3 Struktur & Hierarki Landing Page Baru
```
┌────────────────────────────────────────────────────────────────────────┐
│ HEADER: [INFORMA Hub - Retail Excellence]      [Nav Links]  [Login Button] │
├────────────────────────────────────────────────────────────────────────┤
│ HERO SECTION:                                                          │
│  "Learn. Practice. Deliver Excellent Service."                         │
│  Retail Excellence Learning Hub                                        │
│  Platform pembelajaran digital internal Informa...                     │
│  [ Masuk untuk Mulai Belajar ➔ ]             [ Foto 2 Staf Toko ]     │
├────────────────────────────────────────────────────────────────────────┤
│ VALUE PROPOSITION SECTION: "Mengapa LHE?"                              │
│  Subtitle: Karena pengembangan diri adalah kunci...                    │
│  ┌──────────────────────┐ ┌──────────────────────┐ ┌─────────────────┐ │
│  │ 📖 Materi Terstruktur │ │ 🎬 Video Interaktif  │ │ 🛡️ Evaluasi     │ │
│  └──────────────────────┘ └──────────────────────┘ └─────────────────┘ │
├────────────────────────────────────────────────────────────────────────┤
│ CTA BANNER:                                                            │
│  "Siap meningkatkan kompetensi Anda?"       [ Login Sekarang ➔ ]       │
├────────────────────────────────────────────────────────────────────────┤
│ FOOTER:                                                                │
│  INFORMA Hub | Retail Excellence Learning Hub                          │
│  Platform pembelajaran internal karyawan Informa | © 2025 Informa      │
└────────────────────────────────────────────────────────────────────────┘
```

### 7.4 Responsivitas & Aksesibilitas
- **Desktop (≥ 1024px):** Layout 2 kolom pada Hero (55% teks, 45% visual); 3 kolom pada Platform Highlights; Navbar horizontal penuh.
- **Tablet (768px - 1023px):** Hero bertumpuk dengan visual di bawah tombol CTA; Highlight 3 kolom atau 2+1; Navbar tetap memuat tombol login.
- **Mobile (≤ 767px):** Hero full-width; Highlight 1 kolom vertikal; Navigasi menggunakan Hamburger Drawer yang bersih; Tombol CTA membentang penuh (*width: 100%*).
- **Aksesibilitas (WCAG 2.1 AA):** Rasio kontras teks putih terhadap navy adalah `12.4:1` (melebihi standar minimum `4.5:1`); tombol memiliki *focus state* dengan *outline visible*; semua gambar memiliki tag `alt`.

---

## 8. Spesifikasi Rute dan Access Control

| Rute / URL | Perilaku Saat Ini | Target Perilaku Baru | Kebutuhan Autentikasi | Penanganan untuk Guest | Penanganan Pasca Login |
|---|---|---|---|---|---|
| `/` atau `index.html` | Memuat landing + kurikulum + progres pribadi sekaligus. | **Landing Page Publik Murni** (Promosi & CTA Login). | Publik (Tidak butuh auth) | Dapat melihat profil platform dan menekan tombol login. | Tetap dapat melihat landing page, atau disajikan banner shortcut menuju dashboard aktif. |
| `learn.html` / `learning.html` *(Rute Baru Diusulkan)* | Belum ada (sebelumnya di `index.html`). | **Dashboard Pembelajaran Staf** (Kurikulum, Progres, Materi). | Terautentikasi (`role: staff` atau `hrd`) | Dialihkan ke `index.html?auth=required` dengan modal login terbuka. | Membuka kurikulum lengkap, riwayat belajar, dan smart banner. |
| `topic.html` | Buka topik materi (ada proteksi JS dasar). | **Reader Materi Privat**. | Terautentikasi (`role: staff` atau `hrd`) | Dialihkan ke login dengan parameter `redirectUrl`. | Membuka materi topik yang dituju secara langsung. |
| `quiz.html` | Mesin kuis per kategori (ada proteksi JS dasar). | **Evaluasi Privat**. | Terautentikasi (`role: staff` atau `hrd`) | Dialihkan ke login dengan parameter `redirectUrl`. | Memulai pengerjaan kuis kategori terkait. |
| `videos.html` | Galeri video publik (tanpa proteksi). | **Galeri Video Terproteksi**. | Terautentikasi (`role: staff` atau `hrd`) | Dialihkan ke login (tidak boleh diputar bebas oleh guest). | Menampilkan katalog video internal toko. |
| `glossary.html`| Glosarium publik (tanpa proteksi). | **Kamus Ritel Terproteksi**. | Terautentikasi (`role: staff` atau `hrd`) | Dialihkan ke login. | Membuka kamus istilah dan SOP internal. |
| `profile.html` | Profil staf (ada redirect JS). | **Halaman Pencapaian Staf**. | Terautentikasi (`role: staff` atau `hrd`) | Dialihkan ke login. | Menampilkan rekap pencapaian staf yang bersangkutan. |
| `dashboard.html`| Dashboard HRD & CMS (hanya dicek via JS PIN). | **Portal Administrator Terproteksi**. | Terautentikasi (`role: hrd` & validasi PIN) | Dialihkan ke login. Jika staf biasa membuka, tolak dengan status 403. | Membuka rekap nilai seluruh cabang dan modul CMS. |

---

## 9. Persyaratan Keamanan (Application Security)

Sebagai Application Security Engineer, area berikut wajib diperkuat:

### SEC-001: Pencegahan Bypass Autentikasi Frontend
- **Masalah:** Pengecekan `if (!currentUser)` saat ini dilakukan setelah file HTML selesai diunduh oleh peramban. Jika pengguna mematikan eksekusi JavaScript atau mencegat rendering via debugger, konten sensitif di dalam DOM sempat terekspos.
- **Mitigasi:**
  - Pada halaman privat, body disembunyikan secara default (`body { visibility: hidden; }` atau container loading aktif) hingga otentikasi tervalidasi.
  - Untuk solusi jangka panjang di arsitektur SSR/Next.js (`D:\learning-hub-engine`), proteksi dipindahkan sepenuhnya ke **Next.js Middleware (`middleware.ts`)** sehingga server tidak merender HTML sebaris pun jika cookie sesi tidak valid.

### SEC-002: Hardening Kredensial Administrator & PIN HRD
- **Masalah:** PIN HRD `"1980"` disimpan dalam format teks biasa (*plaintext*) di `localStorage` dan di kode sumber JavaScript klien.
- **Mitigasi:**
  - PIN tidak boleh disimpan dalam plaintext di kode JavaScript publik.
  - Minimal gunakan hash satu arah (misalnya SHA-256 via Web Crypto API bawaan peramban `crypto.subtle.digest`) untuk memverifikasi kecocokan PIN.
  - Menghilangkan *hardcoded fallback* PIN di file HTML publik.

### SEC-003: Proteksi Lapisan Data Supabase & Row Level Security (RLS)
- **Masalah:** `SUPABASE_ANON_KEY` terekspos di sisi klien. Jika tabel `users`, `read_topics`, dan `quiz_results` tidak menerapkan RLS, pihak luar dapat membaca seluruh data karyawan atau memanipulasi nilai ujian via Postman/cURL.
- **Mitigasi:**
  - Pastikan setiap tabel di Supabase memiliki kebijakan RLS aktif:
    - Tabel `read_topics` & `quiz_results`: Hanya dapat di-insert/update sesuai `user_nik` pengguna aktif.
    - Tabel CMS (`stores`, `categories`, `topics`, `quiz_questions`, `videos`, `glossary_terms`): Hanya dapat diubah (insert, update, delete) oleh pengguna dengan role `hrd`.

### SEC-004: Validasi & Sanitasi Masukan Form
- **Mitigasi:** Input NIK, Nama, dan Cabang Toko disanitasi dari karakter berbahaya untuk mencegah serangan Cross-Site Scripting (XSS) dan pemalsuan identifier.

---

## 10. Arsitektur Teknis dan Strategi Implementasi

Berdasarkan hasil audit mendalam terhadap kedua repositori, direkomendasikan strategi dua tahap yang saling melengkapi:

### 10.1 Pilihan Strategi Implementasi

#### Opsi 1: Implementasi Langsung pada Repositori Operasional Eksisting (`D:\retail-excellence-learning-hub`) — **REKOMENDASI UTAMA UNTUK FASE 2**
- **Kelebihan:**
  - Langsung menyelesaikan masalah tampilan di sistem yang saat ini digunakan staf Informa Kupang (sesuai Gambar 1).
  - Risiko regresi sangat rendah terhadap database Supabase yang sedang berjalan.
  - Cepat dieksekusi tanpa memerlukan build pipeline Next.js yang rumit.
- **Pendekatan Teknis:**
  1. Mengubah `index.html` menjadi **Landing Page Publik Murni** yang menerapkan mockup Gambar 2 secara presisi.
  2. Memindahkan antarmuka Kurikulum, Progres Belajar, dan Smart Banner ke file terdedikasi: `learning.html` (atau membagi rute secara dinamis dalam `app-shell.js`).
  3. Memperbarui `app-shell.js` dengan modul *Route Guard* terpusat yang memverifikasi sesi di setiap pemuatan halaman privat (`learning.html`, `topic.html`, `quiz.html`, `videos.html`, `glossary.html`, `profile.html`, `dashboard.html`).
  4. Memperbarui `server.js` untuk mendukung routing bersih (`/` -> `index.html`, `/learn` -> `learning.html`).

#### Opsi 2: Implementasi pada Repositori Next.js Modern (`D:\learning-hub-engine`)
- **Kelebihan:**
  - Modern, menggunakan Next.js App Router, Tailwind v4, dan SSG/SSR.
  - Proteksi rute dapat menggunakan `middleware.ts` berbasis HTTP-Only Cookie.
- **Tantangan:**
  - Pada repositori ini, fitur Quiz interaktif, Supabase client, dan CMS HRD belum di-porting dari repositori lama (masih berstatus statis MDX murni sesuai `project_constitution.md`).
  - Memerlukan waktu implementasi yang jauh lebih besar dan pengujian ulang seluruh fitur evaluasi.

> **Rekomendasi Tim Arsitek:**  
> Untuk segera menyelesaikan mandat pemisahan landing page publik dan pengamanan akses fitur yang sedang aktif digunakan, **Fase 2 akan difokuskan pada Opsi 1 (`D:\retail-excellence-learning-hub`)**, sementara blueprint arsitektur Next.js (`D:\learning-hub-engine`) diperbarui agar selaras untuk pengembangan jangka panjang.

### 10.2 File dan Komponen yang Terdampak (Scope of Work Fase 2)
1. `D:\retail-excellence-learning-hub\index.html`: Di-redesign menjadi Landing Page Publik murni (Navbar baru, Hero baru, Platform Highlights, CTA Banner, Footer baru, Modal Login yang disempurnakan).
2. `D:\retail-excellence-learning-hub\learning.html` *(File Baru)*: Berisi Dashboard Pembelajaran Staf (Progres Pembelajaran, Kurikulum Materi, Rekomendasi Modul, Video).
3. `D:\retail-excellence-learning-hub\app-shell.js`: Penambahan modul `authGuard()` global, manajemen redirect pasca-login, dan penyempurnaan `renderUserBadge()`.
4. `D:\retail-excellence-learning-hub\videos.html` & `glossary.html`: Penambahan proteksi rute wajib login.
5. `D:\retail-excellence-learning-hub\dashboard.html`: Penguatan proteksi otorisasi HRD dan sinkronisasi navigasi admin.
6. `D:\retail-excellence-learning-hub\styles.css`: Penambahan style untuk komponen Landing Page baru (kartu highlight, banner CTA, tipografi hero).
7. `D:\retail-excellence-learning-hub\server.js`: Penyesuaian pemetaan clean URL `/learn`.

---

## 11. Integritas Data dan Kompatibilitas

1. **Skema Database Supabase Tidak Berubah:**
   Tidak ada penambahan kolom berbahaya atau perubahan tipe data pada tabel `users`, `read_topics`, `quiz_results`, `stores`, `categories`, `topics`, `quiz_questions`, `glossary_terms`, dan `videos`.
2. **Kesesuaian Identitas Pengguna:**
   Struktur profil `informa_user_profile` (`nik`, `name`, `store`, `role`) dipertahankan sepenuhnya agar data historis staf Informa Kupang yang sudah terekam di Supabase tidak hilang atau menjadi tidak valid.
3. **Penyimpanan Nilai & Progres Belajar:**
   Format key `localStorage` (`informa_read_topics`, `informa_quiz_[category]`, `informa_quiz_passed_[category]`) tetap dipertahankan guna menjamin kompatibilitas *offline-first* dan perangkat yang telah digunakan staf saat ini.

---

## 12. Persyaratan Nonfungsional

1. **Performa:** Waktu pemuatan awal Landing Page Publik (*First Contentful Paint*) harus di bawah 1.0 detik pada koneksi 4G standar toko ritel. Ukuran aset gambar dioptimasi.
2. **Responsivitas:** Tampilan diuji dan berfungsi presisi pada resolusi smartphone (360px–414px), tablet (768px–1024px), dan desktop (1280px–1920px).
3. **Aksesibilitas:** Seluruh elemen interaktif mendukung navigasi keyboard (`Tab`, `Enter`, `Escape`) dan memiliki atribut ARIA standar.
4. **Keandalan & Graceful Degradation:** Jika koneksi Supabase terputus, sistem memberikan notifikasi ramah tanpa menyebabkan browser *freeze* atau melempar unhandled exception.
5. **Kemudahan Pemeliharaan (*Maintainability*):** Kode CSS dan JS modular, dipisahkan berdasarkan fungsi, dan diberi komentar dokumentasi yang rapi.

---

## 13. Strategi Pengujian (QA & Test Strategy)

| ID Tes | Skenario Pengujian | Langkah Pengujian | Hasil yang Diharapkan | Level Pengujian |
|---|---|---|---|---|
| **TC-01** | Akses Landing Page oleh Guest | Buka URL utama `/` tanpa memiliki sesi login di browser. | Landing Page Publik tampil sesuai Mockup Gambar 2; tidak ada kurikulum internal atau progres belajar yang muncul di layar atau DOM. | Fungsional / UI |
| **TC-02** | Klik CTA Hero oleh Guest | Klik tombol "Masuk untuk Mulai Belajar" atau "Login" di navbar. | Modal formulir login terbuka dengan fokus pada input NIK. | Interaksi UI |
| **TC-03** | Akses Langsung ke Rute Privat oleh Guest | Buka langsung `topic.html`, `quiz.html`, `videos.html`, `glossary.html`, atau `learning.html`. | Browser segera dialihkan ke landing page; muncul notifikasi "Wajib Login"; URL asal disimpan. | Keamanan / Auth |
| **TC-04** | Login Staf Toko & Redirect | Masukkan NIK, Nama, Toko, peran `staff`, lalu submit. | Login sukses; diarahkan ke `learning.html`; nama staf muncul di navbar; progres belajar termuat dari Supabase. | Integrasi / Auth |
| **TC-05** | Login HRD & Verifikasi PIN | Masukkan identitas, peran `hrd`, dan PIN HRD yang valid. | Login sukses; diarahkan ke `dashboard.html`; seluruh KPI dan menu CMS terbuka. | Otorisasi / Auth |
| **TC-06** | Percobaan Akses HRD dengan PIN Salah | Masukkan peran `hrd` dengan PIN sembarang. | Muncul pesan error "PIN Akses HRD salah!"; akses ditolak; sesi tidak dibuat. | Keamanan / Auth |
| **TC-07** | Staf Biasa Mencoba Akses Dashboard Admin | Staf biasa login lalu mengetik URL `dashboard.html` di address bar. | Sistem menolak akses (403); memunculkan peringatan; mengembalikan pengguna ke `learning.html`. | Otorisasi / RBAC |
| **TC-08** | Deep Linking Pasca-Login | Guest membuka `quiz.html?category=selling-skills` -> dialihkan ke login -> login sebagai staf. | Setelah login, pengguna otomatis diarahkan kembali ke kuis selling skills yang dituju. | Fungsional / UX |
| **TC-09** | Logout & Pencegahan Session Hijack | Pengguna menekan Logout dan mengonfirmasi. | Sesi terhapus; diarahkan ke landing page; tombol back browser tidak dapat memunculkan data sesi. | Keamanan / Sesi |
| **TC-10** | Uji Responsivitas Perangkat | Membuka landing page dan dashboard pada viewport mobile (375px), tablet (768px), dan desktop (1440px). | Layout proporsional; drawer hamburger berfungsi; tombol CTA tidak terpotong. | UI / Responsif |
| **TC-11** | Verifikasi Integritas Data Nilai | Staf lama login dengan NIK yang sudah ada di Supabase. | Data topik yang sudah dibaca dan nilai kuis sebelumnya muncul kembali secara utuh 100%. | Integritas Data |

---

## 14. Acceptance Criteria (Kriteria Penerimaan Terukur)

- [ ] **AC-01:** Rute utama (`index.html`) menampilkan Landing Page Publik eksklusif sesuai Mockup Gambar 2 (Kiri) tanpa kebocoran informasi privat.
- [ ] **AC-02:** Seluruh fitur kurikulum, pembaca materi, video, kuis, dan glosarium terlindungi di balik autentikasi.
- [ ] **AC-03:** Guest yang membuka URL rute privat secara langsung dialihkan ke login secara instan tanpa sempat melihat isi modul.
- [ ] **AC-04:** Staf toko yang login disajikan Dashboard Pembelajaran (`learning.html`) sesuai perannya.
- [ ] **AC-05:** Portal administrator (`dashboard.html`) hanya dapat dibuka oleh pengguna terotorisasi dengan peran HRD dan PIN yang valid.
- [ ] **AC-06:** Seluruh data riwayat belajar, skor evaluasi, dan modul kurikulum staf Informa Kupang di Supabase tetap utuh dan tersinkronisasi sempurna.
- [ ] **AC-07:** Tampilan 100% responsif pada desktop, tablet, dan smartphone, dengan palet warna resmi Informa (Dark Navy & Informa Red).
- [ ] **AC-08:** Tidak ada broken link, tidak ada redirect loop, dan tidak ada error pada konsol peramban.

---

## 15. Risiko, Ketergantungan, dan Pertanyaan Terbuka

### 15.1 Risiko Teknis dan Keamanan
1. **Penyimpanan Sesi Klien (LocalStorage):** Meskipun rute telah dipagari dengan proteksi JavaScript, sistem berbasis static web app tanpa backend dinamis tetap memiliki batas perlindungan terhadap pengguna mahir yang memanipulasi DevTools. *Mitigasi:* Dokumentasikan kebutuhan autentikasi berbasis server-side session (Next.js Auth/Supabase Auth dengan RLS) untuk fase evolusi berikutnya.
2. **Ketergantungan Supabase Cloud:** Aplikasi bergantung pada ketersediaan koneksi internet ke Supabase untuk sinkronisasi nilai lintas perangkat. *Mitigasi:* Sistem fallback ke `localStorage` tetap aktif saat luring (*offline*).

### 15.2 Pertanyaan Terbuka untuk Keputusan Pengguna (Decision Points)
1. **Penamaan Rute Dashboard Belajar:**
   Apakah pengguna lebih menyukai dashboard pembelajaran staf menggunakan nama file `learning.html` (bersih: `/learning` atau `/learn`), atau tetap mempertahankan nama lain? *(Rekomendasi tim: gunakan rute `/learn` via `learning.html` agar pemisahan dari landing page `/` sangat jelas).*
2. **Aset Visual Staf Informa pada Hero Landing Page:**
   Pada Mockup Gambar 2 terdapat foto dua staf Informa memegang tablet. Apakah di lingkungan lokal sudah tersedia file foto beresolusi tinggi tersebut, atau tim implementasi perlu menggunakan aset visual placeholder beridentitas Informa yang relevan terlebih dahulu hingga foto resmi dimasukkan?
3. **Mekanisme Ubah PIN HRD:**
   Apakah PIN HRD cukup disimpan ter-hash di database Supabase atau dienkripsi lokal, agar tidak ada lagi kerentanan PIN bawaan `"1980"` yang terekspos di kode sumber?

---

## 16. Rencana Implementasi Bertahap (Fase 2 Work Breakdown Structure)

Implementasi Fase 2 akan dibagi ke dalam 6 langkah berurutan setelah persetujuan diterima:

```
[Tahap 1: Persiapan Rute & Isolasi Dashboard]
  ├── Ekstraksi modul dashboard pembelajaran dari index.html ke learning.html
  └── Pengaturan rute bersih di server.js (/learn -> learning.html)

[Tahap 2: Implementasi Redesign Landing Page Publik]
  ├── Pembangunan Header & Navigasi Publik
  ├── Pembangunan Hero Section & Integrasi Visual Staf Informa
  ├── Pembangunan 3 Kartu Platform Highlights ("Mengapa LHE?")
  ├── Pembangunan CTA Banner & Footer Korporat
  └── Pengikatan Event CTA ke Modal Login

[Tahap 3: Implementasi Route Guard & Pengamanan Akses]
  ├── Penambahan fungsi authGuard() terpusat di app-shell.js
  ├── Penambahan proteksi rute di learning.html, topic.html, quiz.html, videos.html, glossary.html
  └── Penanganan parameter redirectUrl untuk deep-linking pasca-login

[Tahap 4: Pengerasan Otorisasi Administrator (HRD)]
  ├── Penguatan proteksi dashboard.html terhadap peran non-HRD
  └── Hashing verifikasi PIN HRD dan pembersihan hardcoded PIN di file publik

[Tahap 5: Sinkronisasi Data & Kompatibilitas Supabase]
  ├── Verifikasi alur setCurrentUser dan syncUserProgressFromSupabase
  └── Pengujian integritas data akun staf yang sudah tersimpan di Supabase

[Tahap 6: Pengujian Mutu (QA) & Verifikasi Skenario]
  ├── Eksekusi seluruh skenario TC-01 s/d TC-11 (Guest, Staf, Admin, Responsivitas)
  └── Penyusunan Laporan Akhir Implementasi
```

---

## 17. Checklist Persetujuan Pengguna (Approval Gate)

Sebelum tim melangkah ke **FASE 2 (Implementasi)**, pengguna dimohon untuk memeriksa dan memberikan persetujuan eksplisit terhadap butir-butir berikut:

- [ ] **Ruang Lingkup dan Kebutuhan Fungsional:** Menyetujui pemisahan Landing Page publik murni dengan Dashboard Pembelajaran terproteksi.
- [ ] **Arah Desain UX/UI:** Menyetujui struktur section, palet warna Dark Navy / Informa Red, dan tata letak sesuai Mockup Gambar 2.
- [ ] **Struktur Halaman Publik dan Privat:** Menyetujui rute `/` atau `index.html` sebagai Landing Page publik dan rute `/learn` (`learning.html`) sebagai area pembelajaran staf.
- [ ] **Perilaku Route dan Access Control:** Menyetujui bahwa seluruh materi kurikulum, video, kuis, dan glosarium wajib login terlebih dahulu.
- [ ] **Strategi Teknis:** Menyetujui fokus implementasi pada repositori operasional `D:\retail-excellence-learning-hub` dengan zero database loss.
- [ ] **Perubahan Keamanan:** Menyetujui penerapan *Route Guard* terpusat, mitigasi PIN plaintext, dan pencegahan bypass peran.
- [ ] **Integritas Database:** Menyetujui bahwa tidak ada perubahan skema database yang destruktif di Supabase.
- [ ] **Strategi Pengujian dan Acceptance Criteria:** Menyetujui 11 skenario pengujian dan kriteria penerimaan terukur.

---
*Dokumen PRD ini disusun secara formal pada Fase 1. Tidak ada kode aplikasi yang diubah pada fase ini. Eksekusi Fase 2 baru akan dimulai setelah persetujuan eksplisit diberikan oleh pengguna.*
