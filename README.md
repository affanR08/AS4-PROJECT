# Newstep - Platform UMKM Lokal

# Dokumentasi Proyek

- [Panduan Pengembang](DEVELOPER_GUIDE.md)
- [Panduan Pengguna](USER_GUIDE.md)

Newstep adalah sebuah platform web modern yang didedikasikan untuk memberdayakan usaha mikro, kecil, dan menengah (UMKM) lokal. Website ini memudahkan pelanggan untuk menemukan dan menjelajahi produk-produk lokal berkualitas dengan antarmuka yang menarik dan responsif.

## 🚀 Fitur Utama

- **Desain Modern (Glassmorphism):** Tampilan antarmuka yang estetis dan transparan memberikan kesan premium dan bersih.
- **Katalog Produk Dinamis:**
  - Halaman Beranda (`index.html`) menampilkan produk unggulan secara otomatis.
  - Halaman Produk (`main.html`) dengan fitur pencarian dan filter kategori yang responsif.
- **Sistem Pemesanan (Inquiry):** Tombol "Pesan Sekarang" membuka modal formulir pemesanan otomatis untuk setiap produk.
- **Sistem Favorit & Badge:**
  - Simpan produk ke favorit dengan tombol hati.
  - Badge notifikasi real-time di navbar menampilkan jumlah item favorit.
- **Halaman Tentang Kami & Kontak:**
  - Informasi visi dan misi organisasi.
  - Tombol melayang (Floating Button) untuk akses cepat ke halaman About.
  - Formulir kontak fungsional yang terintegrasi dengan layanan pengiriman email (FormSubmit).
  - Notifikasi Toast saat pesan berhasil terkirim.
- **Responsif Penuh:** Navbar satu baris yang optimal di mobile, serta layout grid yang fleksibel.

## 🛠️ Teknologi yang Digunakan

- **HTML5:** Struktur semantik halaman web.
- **CSS3:** Styling custom dengan variabel CSS, Flexbox, Grid, dan efek Glassmorphism.
- **Bootstrap 5:** Framework CSS untuk layout grid yang responsif dan komponen UI (Modal, Toast, Navbar).
- **JavaScript (ES6+):** Logika interaktif untuk rendering produk, filtering, dan manajemen state.
- **Boxicons:** Ikon vektor untuk mempercantik antarmuka.
- **Google Fonts:** Tipografi menggunakan font 'Poppins' untuk keterbacaan yang baik.

## 📂 Struktur Proyek

- `index.html`: Halaman utama / Landing page.
- `main.html`: Halaman katalog produk lengkap.
- `fav.html`: Halaman daftar produk favorit pengguna.
- `about.html`: Halaman informasi tentang UMKM dan kontak.
- `css/style.css`: File styling utama.
- `js/script.js`: Logika utama aplikasi (rendering, event listener).
- `js/product.js`: Database produk sederhana (array of objects).
- `img/`: Direktori penyimpanan aset gambar.

## 📦 Cara Menjalankan

1.  Clone atau unduh repository ini.
2.  Buka folder proyek di teks editor (VS Code disarankan).
3.  Buka file `index.html` menggunakan Live Server atau browser web modern (Chrome, Edge, Firefox).
4.  Jelajahi fitur-fitur website!

## 👥 Tim Pengembang

**Kelompok 4**

- Affan Rabbani (Director, Developer)
- Uwais Abdullah (Developer, Designer)
- Muhammad Aidan Lutfan (Documenter)

---

© 2025 Newstep Studio. All Rights Reserved.
