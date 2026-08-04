# Rule: Arsitektur Clean URLs & Preservasi Parameter URL

## Konteks & Masalah
Web server statis modern (seperti `npx serve`, Vercel, Netlify, dan Cloudflare Pages) secara default mengaktifkan fitur **Clean URLs** yang mengubah URL `/halaman.html` menjadi `/halaman`.
Jika tautan internal atau JavaScript mengarahkan pengguna ke URL yang masih menggunakan ekstensi `.html` disertai parameter query string (misalnya `window.location.href = 'quiz.html?category=foo'`), server akan mengeksekusi **301 Redirect** ke versi bersihnya (`/quiz`).
**Bahaya Kritis:** Proses 301 Redirect pada spesifikasi server statis tersebut **menghapus seluruh parameter query string**, menyebabkan aplikasi kehilangan data parameter (`?category=foo` lenyap) dan berpotensi memicu error atau *infinite redirect loop*.

## Aturan Wajib (Guardrails)
1. **Gunakan Clean URLs pada Tautan Internal:** Seluruh tautan navigasi (`<a href="...">`), pengalihan JavaScript (`window.location.href`, `window.location.replace`), dan pemanggilan API lokal dalam aplikasi multi-halaman statis **wajib** menggunakan format tanpa `.html` (contoh: `quiz?category=foo`, `topic?category=foo`).
2. **Proteksi Parameter Kosong (Fallback Redirect):** Pada halaman yang bergantung pada URL Search Parameters (`URLSearchParams`), hindari menampilkan pesan error fatal jika parameter tidak ditemukan. Selalu implementasikan fallback pengalihan otomatis ke kategori/materi default untuk menjaga keandalan pengalaman pengguna.
