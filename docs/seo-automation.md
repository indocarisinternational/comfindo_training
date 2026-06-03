# Panduan Otomatisasi Artikel SEO

Sistem ini menggunakan Google Gemini API dan GitHub Actions untuk menghasilkan artikel SEO secara otomatis setiap hari. Sistem akan membaca topik dari `data/article-topics.json` dan memasukkan artikel yang dihasilkan langsung ke tabel `blog_posts` di Supabase.

## Pengaturan Rahasia (GitHub Secrets)

Agar sistem ini berfungsi di GitHub Actions, Anda harus menambahkan _Secrets_ berikut di repositori Anda (Settings > Secrets and variables > Actions > New repository secret):

### Required Secrets
- `GEMINI_API_KEY`: Kunci API Anda dari [Google AI Studio](https://aistudio.google.com/).
- `SUPABASE_URL`: URL project Supabase Anda (misal: `https://xxxx.supabase.co`).
- `SUPABASE_SERVICE_ROLE_KEY`: Kunci rahasia Service Role Supabase. (Didapatkan dari Project Settings > API di dashboard Supabase Anda. **Jangan** gunakan anon key karena skrip ini berjalan di server yang aman).

### Optional Variables (GitHub Variables)
Bisa diatur di bagian *Variables* (bukan Secrets):
- `GEMINI_MODEL`: Model yang digunakan (Default: `gemini-3.5-flash`).
- `AUTO_PUBLISH`: `true` atau `false` (Default: `false`). Jika `false`, artikel akan disimpan sebagai `draft` di CMS.
- `ARTICLE_AUTHOR_NAME`: Nama penulis default (Default: `comfindo Management`).

## Cara Kerja Penjadwalan
Sistem berjalan secara otomatis setiap hari pada pukul **01:00 UTC** (08:00 WIB) melalui _cron job_ GitHub Actions. 
Skrip akan:
1. Membaca `data/article-topics.json`.
2. Mencari topik pertama dengan status `"pending"`.
3. Menggunakan Gemini untuk menulis artikel lengkap, judul SEO, deskripsi, FAQ, dan tautan internal.
4. Menyimpannya ke Supabase.
5. Mengubah status topik menjadi `"generated"` dan melakukan _commit_ perubahan kembali ke repositori.

## Cara Menambahkan Topik Baru
Buka file `data/article-topics.json` dan tambahkan objek baru ke dalam array dengan format berikut:
```json
{
  "title": "Judul Topik Anda di Sini",
  "focusKeyword": "keyword utama",
  "intent": "informational atau commercial",
  "targetUrl": "/training/iso-9001",
  "status": "pending"
}
```
Selama statusnya `"pending"`, skrip akan mengambilnya pada jadwal berikutnya.

## Cara Menjalankan Secara Manual
Jika Anda tidak ingin menunggu jadwal harian:
1. Pergi ke tab **Actions** di repositori GitHub Anda.
2. Pilih *workflow* **Auto Generate SEO Article** di sebelah kiri.
3. Klik tombol **Run workflow** di sebelah kanan atas daftar eksekusi.

## Fallback Mode
Jika koneksi ke Supabase gagal atau tabel `blog_posts` tidak ditemukan, skrip akan membuat file Markdown (contoh: `2024-05-10-slug-artikel.md`) di dalam folder `content/blog/` dan melakukan _commit_ file tersebut sebagai _fallback_.
