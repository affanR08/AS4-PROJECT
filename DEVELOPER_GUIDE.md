# Panduan Pengembang (Developer Guide) - Newstep

Dokumen ini ditujukan untuk pengembang yang ingin memahami struktur kode, melakukan pemeliharaan, atau mengembangkan fitur baru pada proyek **Newstep**.

## 1. Struktur Proyek

Proyek ini menggunakan struktur web statis standar (HTML/CSS/JS).

- `root/`
  - `index.html`: Landing page. Titik masuk utama.
  - `main.html`: Halaman katalog produk utama. Memuat logika filtering dan product rendering lengkap.
  - `fav.html`: Halaman favorit. Membaca data dari localStorage.
  - `about.html`: Halaman informasi dan kontak.
  - `css/`
    - `style.css`: Stylesheet utama. Menggunakan CSS Variables untuk konsistensi.
    - `bootstrap.min.css`: Framework CSS eksternal.
  - `js/`
    - `product.js`: Berisi database produk dalam bentuk array optjek JSON.
    - `script.js`: Logika utama aplikasi (DOM manipulation, Event Listeners).
    - `bootstrap.bundle.min.js`: Script Bootstrap.
  - `img/`: Aset gambar produk dan logo.

## 2. Manajemen Data Produk (`js/product.js`)

Data produk tidak menggunakan database backend, melainkan disimpan dalam variabel global `product` di `js/product.js`.

### Format Data

Setiap produk adalah objek dengan properti berikut:

```javascript
{
  id: "p001",           // ID Unik (String)
  nama: "Nama Produk",  // Nama tampilan (String)
  harga: 25000,         // Harga dalam Rupiah (Number)
  deskripsi: "...",     // Deskripsi singkat (String)
  kategori: "makanan",  // Kategori: "makanan" | "minuman" | "jasa" | "lain-lain"
  gambar: "file.jpg",   // Nama file di folder img/ (String)
  favorite: false,      // Status awal favorit (Boolean)
  lokasi: "Jakarta"     // Lokasi penjual (String)
}
```

### Menambah Produk Baru

1.  Siapkan gambar produk dan simpan di folder `img/`.
2.  Buka `js/product.js`.
3.  Tambahkan objek baru ke dalam array `product`.
4.  Pastikan `id` unik (misal: p017, p018).

## 3. Styling dan Desain (`css/style.css`)

Website menggunakan desain **Glassmorphism**.

- **Variabel Global:** Warna dan font diatur di `:root` (baris 1-15).
  - `--primary-color`: Biru (#0d6efd)
  - `--glass-bg`: Transparansi putih untuk efek kaca.
- **Utility Classes:**
  - `.glass`: Menambahkan background blur dan border transparan ke elemen apapun.
  - `.separator`: Garis pemisah visual antar bagian.

## 4. Logika JavaScript (`js/script.js`)

Script utama menangani interaktivitas.

- `renderPage(data)`: Merender kartu produk dengan tombol aksi yang responsif.
- `filterProduct()`: Logika pencarian dan filter kategori.
- `renderHomeProducts()`: Merender produk di Home dengan redirect logic ke `main.html?open_inquiry=ID`.
- `updateFavoriteBadge()`: Menghitung dan menampilkan jumlah favorit di navbar secara real-time.
- `openInquiryModal(id)`: Membuka modal pemesanan dan mengisi data produk secara otomatis.
- **Proxy Pattern:** Menggunakan `Proxy` pada array `product` untuk otomatis menyimpan ke localStorage setiap kali ada perubahan data.
- **Auto-Open Logic:** Pada `DOMContentLoaded`, script mengecek URL parameter `open_inquiry` untuk membuka modal secara otomatis (cross-page interaction).
- **Event Listeners:** Menangani filter, search, submit form modal, dan inisialisasi toast.

## 5. Deployment

Karena ini adalah situs statis, Anda dapat mendeploynya dengan mudah di:

- GitHub Pages
- Vercel
- Netlify

Cukup upload seluruh folder proyek dan arahkan root directory.

---

**Catatan Penting:**

- Pastikan untuk selalu melakukan hard refresh (Ctrl+F5) setelah mengubah `js/javascript` atau `css` karena browser sering melakukan caching.
- Gambar produk disarankan memiliki rasio aspek yang seragam (misal 1:1 atau 4:3) untuk tampilan terbaik.
