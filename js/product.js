localStorage.removeItem('products');
const product = [
  { id: "p001", nama: "Nasi Goreng Spesial", harga: 25000, deskripsi: "Nasi goreng dengan telur, ayam, dan kerupuk.", kategori: "makanan", gambar: "placeholder.jpg", fav:false, lokasi: "Jakarta" },
  { id: "p002", nama: "Es Teh Manis", harga: 5000, deskripsi: "Minuman segar teh manis dingin.", kategori: "minuman", gambar: "placeholder.jpg", fav:false, lokasi: "Bandung" },
  { id: "p003", nama: "Jasa Cuci Motor", harga: 15000, deskripsi: "Layanan pencucian motor cepat dan bersih.", kategori: "jasa", gambar: "placeholder.jpg", fav:false, lokasi: "Surabaya" },
  { id: "p004", nama: "Paket Internet 10GB", harga: 50000, deskripsi: "Kuota internet 10GB berlaku 30 hari.", kategori: "lain-lain", gambar: "placeholder.jpg", fav:false, lokasi: "Medan" },
  { id: "p005", nama: "Sate Ayam Madura", harga: 20000, deskripsi: "Sate ayam dengan bumbu kacang khas Madura.", kategori: "makanan", gambar: "placeholder.jpg", fav:false, lokasi: "Madura" },
  { id: "p006", nama: "Jus Alpukat", harga: 12000, deskripsi: "Jus alpukat segar dengan susu coklat.", kategori: "minuman", gambar: "placeholder.jpg", fav:false, lokasi: "Yogyakarta" },
  { id: "p007", nama: "Jasa Service Laptop", harga: 150000, deskripsi: "Perbaikan laptop untuk masalah software dan hardware.", kategori: "jasa", gambar: "placeholder.jpg", fav:false, lokasi: "Tangerang" },
  { id: "p008", nama: "Pulsa 50K", harga: 50000, deskripsi: "Isi ulang pulsa senilai Rp50.000.", kategori: "lain-lain", gambar: "placeholder.jpg", fav:false, lokasi: "Bekasi" },
  {id: "p009", nama: "Mie Ayam Bakso", harga: 18000, deskripsi: "Mie ayam dengan bakso sapi segar.", kategori: "makanan", gambar: "placeholder.jpg", fav:false, lokasi: "Semarang" },
  {id: "p010", nama: "Kopi Tubruk", harga: 8000, deskripsi: "Kopi hitam tradisional Indonesia.", kategori: "minuman", gambar: "placeholder.jpg", fav:false, lokasi: "Malang" },
  {id: "p011", nama: "Jasa Fotografi", harga: 300000, deskripsi: "Layanan fotografi untuk acara pernikahan dan event lainnya.", kategori: "jasa", gambar: "placeholder.jpg", fav:false, lokasi: "Denpasar" },
  {id: "p012", nama: "Voucher Game 100K", harga: 100000, deskripsi: "Voucher game online senilai Rp100.000.", kategori: "lain-lain", gambar: "placeholder.jpg", fav:false, lokasi: "Bogor" },
  {id: "p013", nama: "Rendang Daging Sapi", harga: 30000, deskripsi: "Rendang daging sapi empuk dengan bumbu khas Minang.", kategori: "makanan", gambar: "placeholder.jpg", fav:false, lokasi: "Padang" },
  {id: "p014", nama: "Teh Tarik", harga: 7000, deskripsi: "Minuman teh tarik ala Malaysia.", kategori: "minuman", gambar: "placeholder.jpg", fav:false, lokasi: "Pontianak" },
  {id: "p015", nama: "Jasa Desain Grafis", harga: 250000, deskripsi: "Layanan desain grafis untuk logo, poster, dan materi promosi.", kategori: "jasa", gambar: "placeholder.jpg", fav:false, lokasi: "Pekanbaru" },
  {id: "p016", nama: "Paket Data 5GB", harga: 30000, deskripsi: "Kuota internet 5GB berlaku 30 hari.", kategori: "lain-lain", gambar: "placeholder.jpg", fav:false, lokasi: "Balikpapan" }
];


// daftar kota Indonesia untuk generate lokasi otomatis
const kotaList = [
  "Jakarta","Bandung","Surabaya","Medan","Semarang","Yogyakarta","Makassar","Denpasar","Bekasi","Tangerang","Depok","Bogor","Palembang","Balikpapan","Samarinda","Malang","Banjarmasin","Manado","Pontianak","Pekanbaru"
];

// Generate otomatis hingga 150 objek
for (let i = product.length + 1; product.length < 150; i++) {
  product.push({
    id: "p" + String(i).padStart(3, "0"),
    nama: "Produk " + i,
    harga: 10000 + i * 100,
    deskripsi: "Deskripsi produk ke-" + i,
    kategori: i % 4 === 0 ? "makanan" : i % 4 === 1 ? "minuman" : i % 4 === 2 ? "jasa" : "lain-lain",
    gambar: "placeholder.jpg",
    fav:false,
     lokasi: kotaList[i % kotaList.length]
  });
}



export { product };
