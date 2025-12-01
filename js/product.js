const product = [
  { id: "p001", nama: "Nasi Goreng Spesial", harga: 25000, deskripsi: "Nasi goreng dengan telur, ayam, dan kerupuk.", kategori: "makanan", gambar: "placeholder.jpg" },
  { id: "p002", nama: "Es Teh Manis", harga: 5000, deskripsi: "Minuman segar teh manis dingin.", kategori: "minuman", gambar: "placeholder.jpg" },
  { id: "p003", nama: "Jasa Cuci Motor", harga: 15000, deskripsi: "Layanan pencucian motor cepat dan bersih.", kategori: "jasa", gambar: "placeholder.jpg" },
  { id: "p004", nama: "Paket Internet 10GB", harga: 50000, deskripsi: "Kuota internet 10GB berlaku 30 hari.", kategori: "lain-lain", gambar: "placeholder.jpg" },
  { id: "p005", nama: "Sate Ayam Madura", harga: 20000, deskripsi: "Sate ayam dengan bumbu kacang khas Madura.", kategori: "makanan", gambar: "placeholder.jpg" },
  { id: "p006", nama: "Jus Alpukat", harga: 12000, deskripsi: "Jus alpukat segar dengan susu coklat.", kategori: "minuman", gambar: "placeholder.jpg" },
  { id: "p007", nama: "Jasa Service Laptop", harga: 150000, deskripsi: "Perbaikan laptop untuk masalah software dan hardware.", kategori: "jasa", gambar: "placeholder.jpg" },
  { id: "p008", nama: "Pulsa 50K", harga: 50000, deskripsi: "Isi ulang pulsa senilai Rp50.000.", kategori: "lain-lain", gambar: "placeholder.jpg" },
];

// Generate otomatis hingga 150 objek
for (let i = product.length + 1; product.length < 150; i++) {
  product.push({
    id: "p" + String(i).padStart(3, "0"),
    nama: "Produk " + i,
    harga: 10000 + i * 100,
    deskripsi: "Deskripsi produk ke-" + i,
    kategori: i % 4 === 0 ? "makanan" : i % 4 === 1 ? "minuman" : i % 4 === 2 ? "jasa" : "lain-lain",
    gambar: "placeholder.jpg"
  });
}


export { product };
