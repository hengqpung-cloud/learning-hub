# 📖 Panduan & Manual Penggunaan Aplikasi
## INFORMA Retail Excellence Learning Hub

Dokumen ini berisi panduan operasional lengkap tata cara penggunaan aplikasi **INFORMA Retail Excellence Learning Hub**, yang dirancang khusus untuk **Staf Toko Informa** dan **HRD Officer / Evaluator**.

---

## 📌 Daftar Isi

1. [Gambaran Umum Aplikasi](#1-gambaran-umum-aplikasi)
2. [Panduan Pengguna: Staf Toko (Pengguna Harian)](#2-panduan-pengguna-staf-toko-pengguna-harian)
   - [2.1 Pengisian Identitas & Login Pertama Kali](#21-pengisian-identitas--login-pertama-kali)
   - [2.2 Navigasi Beranda & Dual Progress Tracking](#22-navigasi-beranda--dual-progress-tracking)
   - [2.3 Membaca Modul Pembelajaran & Aksesibilitas](#23-membaca-modul-pembelajaran--aksesibilitas)
   - [2.4 Mengerjakan Evaluasi Kategori (Quiz Interaktif)](#24-mengerjakan-evaluasi-kategori-quiz-interaktif)
   - [2.5 Meninjau Jawaban & Pembahasan Educational Feedback](#25-meninjau-jawaban--pembahasan-educational-feedback)
   - [2.6 Menggunakan Kamus Glosarium Retail](#26-menggunakan-kamus-glosarium-retail)
   - [2.7 Menonton Galeri Video Pembelajaran](#27-menonton-galeri-video-pembelajaran)
   - [2.8 Mengakses Halaman Profil Staf](#28-mengakses-halaman-profil-staf)
   - [2.9 Menggunakan Hamburger Menu di Handphone (Mobile)](#29-menggunakan-hamburger-menu-di-handphone-mobile)
3. [Panduan Pengguna: HRD Officer / Evaluator](#3-panduan-pengguna-hrd-officer--evaluator)
   - [3.1 Login Akses HRD & Kode PIN](#31-login-akses-hrd--kode-pin)
   - [3.2 Dashboard Monitoring & Real-Time KPI](#32-dashboard-monitoring--real-time-kpi)
   - [3.3 Memantau & Menyaring (Filter) Data Staf Toko](#33-memantau--menyaring-filter-data-staf-toko)
   - [3.4 Mengunduh Laporan ke Excel / CSV](#34-mengunduh-laporan-ke-excel--csv)
   - [3.5 Fitur Manajemen & Hapus Data Staf Non-Aktif](#35-fitur-manajemen--hapus-data-staf-non-aktif)
   - [3.6 Mengubah PIN Akses HRD secara Mandiri](#36-mengubah-pin-akses-hrd-secara-mandiri)
4. [Tanya Jawab & Penanganan Kendala (FAQ)](#4-tanya-jawab--penanganan-kendala-faq)

---

## 1. Gambaran Umum Aplikasi

**INFORMA Retail Excellence Learning Hub** adalah platform pembelajaran digital interaktif berbasis web (*web app*) yang dirancang untuk mendukung peningkatan kompetensi operasional, pengetahuan produk, standar layanan pelanggan (*service excellence*), dan keterampilan menjual (*selling skills*) seluruh staf ritel Informa.

> [!NOTE]
> Aplikasi ini dapat diakses melalui berbagai perangkat: Laptop, Tablet, maupun Smartphone (iOS/Android) tanpa perlu mengunduh aplikasi di App Store/Play Store.

---

## 2. Panduan Pengguna: Staf Toko (Pengguna Harian)

### 2.1 Pengisian Identitas & Login Pertama Kali

Saat pertama kali membuka aplikasi web:
1. Klik tombol **`🔑 Masuk`** di pojok kanan atas topbar (atau melalui menu Hamburger pada HP).
2. Isi formulir identitas staf:
   - **NIK / Kode Karyawan**: Contoh: `INF10023`
   - **Nama Lengkap**: Contoh: `Wahyudi Pratama`
   - **Toko / Cabang**: Pilih cabang toko tempat Anda bertugas (misal: *Informa Kupang*, *Informa Kota Wisata*, dsb).
   - **Peran (Role)**: Pilih **Staf Toko**.
3. Klik **`Simpan Identitas & Mulai`**.
4. Identitas Anda akan aktif secara otomatis. Nama panggilan & inisial avatar Anda akan muncul di bagian atas layar.

> [!IMPORTANT]
> Pastikan mengisi NIK dan Nama Lengkap dengan benar agar progres pembelajaran dan hasil evaluasi Anda terekam secara valid di database HRD.

---

### 2.2 Navigasi Beranda & Dual Progress Tracking

Halaman Beranda (`index.html`) dilengkapi dengan **Dual Progress Bar**:

1. **📚 Progress Membaca Materi (%)**:
   - Menghitung persentase dari total seluruh bab/topik modul yang telah selesai Anda baca.
2. **🏆 Progress Kelulusan Evaluasi (%)**:
   - Menghitung persentase kategori yang telah Anda ikuti evaluasinya dan **lulus dengan nilai minimum 70**.

#### 💡 Smart Notification Banner
Di atas area progress bar terdapat **Smart Banner** dinamis yang memberikan petunjuk otomatis:
- **State A (Siap Evaluasi)**: Muncul jika Anda telah selesai membaca 100% materi di suatu kategori. Klik tombol untuk langsung memulai Quiz.
- **State B (Ulangi Quiz)**: Muncul jika skor evaluasi terakhir Anda < 70.
- **State C (Lanjut Belajar)**: Muncul jika masih ada materi yang belum selesai dibaca.
- **State D (100% Lulus)**: Muncul ucapan selamat jika seluruh 6 kategori telah lulus evaluasi.

---

### 2.3 Membaca Modul Pembelajaran & Aksesibilitas

Untuk membaca modul kurikulum:
1. Di halaman Beranda, klik pada salah satu **Kartu Kategori** (contoh: *Basic Service*, *Selling Skills*, *Product Knowledge*).
2. Kartu akan terbuka (*expand*) menampilkan daftar bab/topik. Klik judul topik yang ingin dibaca.
3. Anda akan diarahkan ke halaman baca materi (`topic.html`).

#### Fitur Tambahan di Halaman Topik:
- 🗺️ **Breadcrumb Navigasi**: Terdapat di bagian atas materi (`Beranda > Kategori > Topik`). Klik pada nama kategori untuk kembali.
- 🔤 **Pengatur Ukuran Teks (Font Adjuster)**:
  - Klik **`A-`** untuk memperkecil ukuran teks (`14px`).
  - Klik **`A`** untuk ukuran teks standar (`16px`).
  - Klik **`A+`** untuk memperbesar ukuran teks (`18px`). Pilihan Anda tersimpan otomatis.
- 🎬 **Video Pelatihan Terkait**: Di bagian bawah materi bacaan, terdapat rekomendasi video pembelajaran YouTube yang sesuai dengan topik.
- 📖 **Daftar Materi (Sidebar)**: Di HP, klik ikon **`📖`** di topbar untuk membuka daftar modul tanpa harus kembali ke beranda.
- **Tandai Selesai**: Setelah selesai membaca hingga akhir halaman, klik tombol merah **`Tandai Selesai & Lanjutkan ➔`**.

---

### 2.4 Mengerjakan Evaluasi Kategori (Quiz Interaktif)

Evaluasi terdiri dari **10 soal pilihan ganda** per kategori dengan syarat lulus nilai minimum **70**.

#### Fitur Utama Quiz:
1. 🔀 **Pengacakan Soal & Pilihan (Shuffle Algorithm)**: Soal dan urutan opsi A/B/C/D diacak otomatis menggunakan algoritma *Fisher-Yates*, sehingga setiap sesi pengerjaan bersifat unik.
2. 💊 **Question Navigator Pills (Nomor Soal 1-10)**:
   - Tombol bulat 1-10 di bagian atas menunjukkan status pengerjaan:
     - **Abu-abu**: Soal belum dibuka.
     - **Merah Berwarna**: Soal yang sedang aktif dikerjakan.
   - Anda dapat mengklik angka 1-10 untuk melompati atau memeriksa kembali jawaban sebelum dikirim.
3. ⌛ **Live Timer Counter**: Menampilkan durasi waktu pengerjaan real-time di header quiz.
4. **Navigasi Soal**: Klik tombol **`Selanjutnya ➔`** atau **`⬅ Sebelumnya`** untuk berpindah soal. Pada soal ke-10, tombol berubah menjadi **`Kirim Jawaban Evaluasi`**.

---

### 2.5 Meninjau Jawaban & Pembahasan Educational Feedback

Setelah menyelesaikan evaluasi:
1. Skor Anda akan langsung dihitung.
2. Jika nilai **≥ 70**, status Anda dinyatakan **LULUS ✅**.
3. Jika nilai **< 70**, Anda disarankan menekan tombol **`🔄 Ulangi Quiz`**.
4. **Fitur Tinjau Jawaban (Review Mode)**:
   - Klik tombol **`🔍 Tinjau Jawaban`**.
   - Anda dapat melihat kembali seluruh 10 soal:
     - Jawaban Anda ditandai centang **`✅`** jika benar, atau silang **`❌`** jika salah.
     - Opsi yang benar akan disorot warna hijau.
   - 💡 **Kotak Penjelasan & Pembahasan**: Di bawah setiap soal review, terdapat kotak pembahasan edukatif yang menjelaskan alasan ilmiah/SOP mengapa jawaban tersebut benar.

---

### 2.6 Menggunakan Kamus Glosarium Retail

Halaman Glosarium (`glossary.html`) berisi kamus istilah operasional toko, SOP, tipe karakter DISC, dan jargon ritel Informa:
1. **Fitur Pencarian Instan (Search Bar)**: Ketik istilah yang dicari (contoh: *5A*, *DISC*, *Adjacency*, *Deadstock*). Hasil pencarian akan muncul secara real-time.
2. **Paginasi "Muat Lebih Banyak" (Load More)**:
   - Secara default, sistem menampilkan **8 kartu istilah pertama** agar halaman terasa ringan.
   - Klik tombol **`👇 Muat Lebih Banyak`** di bawah grid untuk menampilkan 8 istilah berikutnya.

---

### 2.7 Menonton Galeri Video Pembelajaran

Halaman Galeri Video (`videos.html`) menyediakan koleksi video simulasi ritel:
1. Pilih video yang ingin ditonton berdasarkan kategori (misal: *Selling Skill*, *Handling Complaint*).
2. Klik tombol **`▶ Tonton Video`** atau pada gambar thumbnail.
3. Modal pemutar video YouTube interaktif akan terbuka di tengah layar. Klik tombol silang **`✕`** atau area gelap di luar layar untuk menutup.

---

### 2.8 Mengakses Halaman Profil Staf

Klik ikon Avatar inisial Anda `(W)` di topbar atau pilih **`Profil & Pencapaian Saya`** pada Hamburger Menu untuk membuka `profile.html`:
- **Kartu Identitas**: Menampilkan Nama, NIK, Toko Cabang, dan Tanggal Terakhir Aktif.
- **KPI Personal**: Ringkasan total materi dibaca & kategori yang telah lulus evaluasi.
- **Rincian Status 6 Kategori**: Menampilkan skor kuis terakhir & status kelulusan di setiap kategori.

---

### 2.9 Menggunakan Hamburger Menu di Handphone (Mobile)

Saat membuka aplikasi melalui HP (layar ≤ 768px):
- Topbar dirancang ringkas menampilkan Logo **`INFORMA Hub`**, Avatar Profil `(W)`, dan Tombol **`☰`**.
- Klik tombol **`☰`** untuk membuka menu *slide-down* dinamis berisi:
  - 🏠 **Beranda Utama**
  - 📖 **Glosarium Istilah Retail**
  - 🎥 **Galeri Video Pembelajaran**
  - 👤 **Profil & Pencapaian Saya**
  - ☀️ / 🌙 **Ganti Mode Terang / Gelap**
  - 🚪 **Keluar / Logout**

---

## 3. Panduan Pengguna: HRD Officer / Evaluator

### 3.1 Login Akses HRD & Kode PIN

Untuk mengakses fitur pemantauan HRD:
1. Klik tombol **`🔑 Masuk`** di topbar.
2. Pada pilihan **Peran (Role)**, pilih **HRD Officer / Evaluator**.
3. Input **PIN Akses HRD** (Default bawaan awal: `1980`).
4. Klik **`Simpan Identitas & Mulai`**. Anda akan langsung diarahkan ke **Dashboard Monitoring HRD** (`dashboard.html`).

---

### 3.2 Dashboard Monitoring & Real-Time KPI

Halaman Dashboard HRD menyediakan ringkasan performa pelatihan seluruh staf toko secara terpusat:
- **Total Staf Terdaftar**: Jumlah staf aktif yang mengikuti pelatihan.
- **Tingkat Kelulusan Evaluasi (%)**: Persentase staf yang telah lulus seluruh 6 kategori evaluasi.
- **Rata-Rata Skor Quiz**: Nilai rata-rata akumulasi seluruh staf.
- **Total Topik Terbaca**: Jumlah akumulasi topik yang telah dipelajari.

---

### 3.3 Memantau & Menyaring (Filter) Data Staf Toko

Pada Tabel Rekapitulasi Staf:
1. **Search Bar**: Ketik Nama atau NIK staf untuk mencari data individu secara cepat.
2. **Filter Cabang Toko**: Filter data berdasarkan lokasi toko (misal: *Informa Kupang*, *Informa Kota Wisata*).
3. **Filter Status Kelulusan**:
   - *Selesai / Lulus Semua*: Memfilter staf yang sudah 100% lulus 6 kategori.
   - *Dalam Proses*: Staf yang sedang membaca/mengerjakan.
   - *Belum Mulai*: Staf yang belum membuka materi.

---

### 3.4 Mengunduh Laporan ke Excel / CSV

HRD dapat mengeksport seluruh data laporan staf untuk kebutuhan audit atau laporan manajemen:
1. Klik tombol hijau **`📥 Export CSV`** di atas tabel data.
2. File berformat `.csv` (yang dapat dibuka langsung di Microsoft Excel) akan terunduh secara otomatis dengan nama file `Laporan_Monitoring_HRD_Informa_[Tanggal].csv`.
3. Laporan mencakup: NIK, Nama Staf, Toko, % Progress Baca, Skor per Kategori, Status Kelulusan, dan Waktu Terakhir Aktif.

---

### 3.5 Fitur Manajemen & Hapus Data Staf Non-Aktif

Jika ada staf yang resign atau salah memasukkan identitas:
1. Cari nama staf pada tabel rekapitulasi HRD.
2. Di kolom kanan **Aksi**, klik tombol **`🗑️ Hapus`**.
3. Konfirmasikan penghapusan. Data staf tersebut akan terhapus bersih dari database.

> [!CAUTION]
> Tindakan menghapus staf bersifat permanen dan akan membersihkan seluruh rekam jejak nilai staf tersebut.

---

### 3.6 Mengubah PIN Akses HRD secara Mandiri

HRD dapat memperbarui PIN akses masuk kapan saja secara mandiri:
1. Di halaman **Portal Monitoring HRD (`dashboard.html`)**, klik tombol **`🔑 Ubah PIN HRD`** pada bagian header atas.
2. Masukkan **PIN Lama** saat ini.
3. Masukkan **PIN Baru** (minimal 4 digit/karakter) dan ketik ulang di kolom konfirmasi.
4. Klik **`Simpan PIN Baru`**.
5. Gunakan PIN baru tersebut untuk login HRD berikutnya.

---

### 3.7 Panduan Pengelolaan Konten Mandiri HRD (CMS HRD)

Halaman Dashboard HRD dilengkapi dengan panel **CMS (Content Management System)** penuh yang memungkinkan tim HRD menambah, mengubah, dan menghapus seluruh isi materi, bank soal, cabang toko, glosarium, dan video tanpa bantuan teknisi/programmer.

#### 🗂️ Navigasi Tab Utama & Memori Otomatis
- Di bagian atas dashboard terdapat 2 Tab Utama:
  - **`📊 Rekap Monitoring Staf`**: Untuk memantau nilai & progres staf.
  - **`⚙️ Kelola Konten & Kurikulum (CMS HRD)`**: Untuk mengolah isi kurikulum.
- **State Memory**: Apabila Anda menekan F5 / Refresh browser, halaman akan **otomatis tetap berada pada Tab & Sub-Tab terakhir** yang sedang Anda buka.

#### 🏬 1. Kelola Cabang Toko Informa (Siap Handover)
- **Fungsi**: Menambah atau menghapus daftar nama cabang toko Informa.
- **Cara Tambah**: Klik sub-tab **Cabang Toko** $\rightarrow$ klik **`+ Tambah Cabang Toko`** $\rightarrow$ Ketik nama toko (misal: *Informa Bali Sunset Road*) $\rightarrow$ Klik **Simpan**.
- **Hasil**: Nama cabang toko baru akan **langsung otomatis muncul di pilihan dropdown Modal Login (`index.html`)** di seluruh HP staf toko.

#### 📁 2. Kelola Kategori Kurikulum
- **Fungsi**: Menambah kelompok kurikulum baru.
- **Cara Tambah**: Klik sub-tab **Kategori** $\rightarrow$ klik **`+ Tambah Kategori`** $\rightarrow$ Isi ID Kategori (misal: `selling-skills`), Nama Kategori, dan Deskripsi.

#### 📄 3. Kelola Topik & Materi Pembelajaran (Pengisian Teks Biasa)
- **Fungsi**: Menambah bab atau artikel modul pembelajaran baru.
- **Kemudahan**: HRD **TIDAK PERLU** menguasai format Markdown. Cukup ketikkan materi dalam **kalimat atau paragraf biasa** seperti di Microsoft Word/WhatsApp, dan sistem akan mengonversi format tampilannya secara otomatis di layar staf!
- **Cara Tambah**: Klik sub-tab **Topik Materi** $\rightarrow$ klik **`+ Tambah Topik Materi`** $\rightarrow$ Pilih Kategori, isi ID Topik & Judul Topik, lalu ketikkan penjelasan artikel pada kotak teks $\rightarrow$ Klik **Simpan**.

#### 📝 4. Kelola Bank Soal Evaluasi (Quiz)
- **Fungsi**: Menambah atau menghapus soal kuis evaluasi 10 pilihan ganda per kategori.
- **Cara Tambah**:
  1. Klik sub-tab **Bank Soal Quiz**.
  2. Pilih tombol nama Kategori yang ingin ditambah soalnya (misal: *Basic Service*).
  3. Klik **`+ Tambah Soal Quiz`**.
  4. Masukkan **Teks Pertanyaan**, **Pilihan A, B, C, D**, pilih **Kunci Jawaban Benar (A/B/C/D)**, dan isi **Kotak Pembahasan (Feedback Edukatif)**.
  5. Klik **Simpan Soal Quiz**.

#### 📖 5. Kelola Kamus Glosarium Retail
- **Fungsi**: Menambah istilah ritel baru dan definisinya.
- **Cara Tambah**: Klik sub-tab **Glosarium** $\rightarrow$ klik **`+ Tambah Istilah`** $\rightarrow$ Isi Istilah, Kategori (misal: *Sales/SOP*), dan Definisi Lengkap.

#### 🎥 6. Kelola Galeri Video Pelatihan
- **Fungsi**: Menambah link video YouTube simulasi baru ke galeri.
- **Cara Tambah**: Klik sub-tab **Galeri Video** $\rightarrow$ klik **`+ Tambah Video`** $\rightarrow$ Isi Judul Video, Kategori, Tempelkan URL Link YouTube, Durasi (misal: `05:30`), dan Deskripsi Singkat.

---

## 4. Tanya Jawab & Penanganan Kendala (FAQ)

### Q1: Apakah nilai kuis saya hilang jika saya menutup browser HP?
**J:** Tidak. Seluruh progres materi yang dibaca dan skor kuis tersimpan secara aman di browser Anda dan tersinkronisasi ke server cloud saat perangkat terhubung ke internet.

### Q2: Berapa nilai minimum untuk dinyatakan lulus evaluasi?
**J:** Nilai minimum kelulusan adalah **70**. Jika nilai Anda di bawah 70, Anda dapat mempelajari kembali materi dan menekan tombol **Ulangi Quiz** tanpa batasan jumlah percobaan.

### Q3: Bagaimana jika saya lupa PIN Akses HRD yang baru diubah?
**J:** Apabila PIN HRD terlupa, Anda dapat mereset PIN melalui console browser atau menghubungi administrator sistem untuk mengembalikan PIN ke default `1980`.

### Q4: Apakah tampilan web ini mendukung mode gelap (Dark Mode)?
**J:** Ya. Klik ikon matahari/bulan `☀️/🌙` di topbar atau menu hamburger untuk berganti antara Mode Gelap (Dark Mode) dan Mode Terang (Light Mode) sesuai kenyamanan mata Anda.

---
*Dokumen Manual Penggunaan resmi INFORMA Retail Excellence Learning Hub &copy; 2026.*
