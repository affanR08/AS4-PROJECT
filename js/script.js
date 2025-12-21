import { product } from "./product.js";

// Check if products are already in localStorage
const storedProducts = localStorage.getItem("products");
let storedData = [];

if (storedProducts) {
  try {
    storedData = JSON.parse(storedProducts);
  } catch (e) {
    console.error("Error parsing stored products", e);
  }
}

// Sync imported product data with stored favorites
// We use the imported 'product' as the source of truth for details (image, price, etc)
// and only restore the 'favorite' status from localStorage.
product.forEach((p) => {
  const storedItem = storedData.find((s) => s.id === p.id);
  if (storedItem) {
    p.favorite = storedItem.favorite;
  }
});

// Immediately save the synced data back to localStorage so it's fresh
saveProductsToLocalStorage();

// Ensure products are saved to localStorage after any modifications
function saveProductsToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(product));
}

// DOM elements
const searchInput = document.getElementById("searchInput");
const filterLocation = document.getElementById("filterLocation");
const filterPrice = document.getElementById("filterPrice");
const filterCategory = document.getElementById("filterCategory");
const sortFilter = document.getElementById("sort-filter");
const productContainer = document.getElementById("product-container");
const filterButton = document.getElementById("filter-button");

if (filterButton) {
  filterButton.addEventListener("click", () => {
    // New logic for mobile filter toggle
    const mobileWrapper = document.getElementById("mobileFilter");
    if (mobileWrapper) {
      mobileWrapper.classList.toggle("show");
    }
  });
}
// Pagination state
let currentPage = 1;
const itemsPerPage = 15;
// keep last filtered products so pagination works on current view
let lastFilteredProducts = [];

// Function to render products
function renderProducts(productsToRender) {
  if (!productContainer) return;

  productContainer.innerHTML = "";

  productsToRender.forEach((item) => {
    const productCard = `
            <div class="col">
                <div class="card h-100">
                    <img src="img/${item.gambar}" class="card-img-top" alt="${
      item.nama
    }" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between mb-2">
                        <h5 class="card-title">${item.nama}</h5>
                        <button class="btn btn-light btn-sm favorite-btn ${
                          item.favorite ? "clicked" : ""
                        }" data-id="${
      item.id
    }" title="Add to Favorites" type="button">
                        </button>
                        </div>
                        <p class="card-text">${item.deskripsi}</p>
                        <p class="card-text text-muted">Lokasi: ${
                          item.lokasi || "—"
                        }</p>
                        <div class="mt-auto">
                            <p class="card-text"><strong>Rp ${item.harga.toLocaleString(
                              "id-ID"
                            )}</strong></p>
                            <span class="badge bg-primary footer mb-3">${
                              item.kategori
                            }</span>
                            <button class="btn btn-primary w-100 mb-2" onclick="window.openInquiryModal('${
                              item.id
                            }')">Pesan Sekarang</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    productContainer.innerHTML += productCard;
  });

  // Attach favorite button handlers (toggle class) after rendering
  const favButtons = productContainer.querySelectorAll(".favorite-btn");
  favButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.id;
      const productToUpdate = product.find((p) => p.id === productId);

      if (productToUpdate) {
        btn.classList.toggle("clicked");

        // Update the favorite property of the corresponding product
        productToUpdate.favorite = !productToUpdate.favorite;

        // Save updated products to local storage
        saveProductsToLocalStorage();
        updateFavoriteBadge(); // Update badge on change

        // Show toast with dynamic message
        const toastLiveExample = document.getElementById("liveToast");
        const toastBody = toastLiveExample.querySelector(".toast-body");
        if (productToUpdate.favorite) {
          toastBody.textContent = "Produk Telah Masuk Favorite";
        } else {
          toastBody.textContent = "Produk Telah Dihapus dari Favorite";
        }
        const toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
      }
    });
  });
}

// Render products for Home Page (index.html)
function renderHomeProducts() {
  const homeContainer = document.getElementById("homei");
  if (!homeContainer) return;

  // Display only first 8 products
  const homeProducts = product.slice(0, 8);

  homeContainer.innerHTML = "";

  homeProducts.forEach((item) => {
    const productCard = `
            <div class="col">
                <div class="card h-100">
                    <img src="img/${item.gambar}" class="card-img-top" alt="${
      item.nama
    }" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${item.nama}</h5>
                        <p class="card-text text-truncate">${item.deskripsi}</p>
                        <div class="mt-auto">
                            <p class="card-text"><strong>Rp ${item.harga.toLocaleString(
                              "id-ID"
                            )}</strong></p>
                            <div class="mb-2">
                                <span class="badge bg-primary footer">${
                                  item.kategori
                                }</span>
                            </div>
                            <button class="btn btn-primary w-100 mb-2" onclick="window.openInquiryModal('${
                              item.id
                            }')">Pesan Sekarang</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    homeContainer.innerHTML += productCard;
  });
}

// Render favorite products on fav.html
function renderFavoriteProducts() {
  const favcardContainer = document.querySelector(".fav-container");
  if (!favcardContainer) return;

  const favoriteProducts = product.filter((item) => item.favorite);

  favcardContainer.innerHTML = "";

  favoriteProducts.forEach((item, index) => {
    const productCard = `
            <div class="col mb-3">
                <div class="card h-100">
                    <img src="img/${item.gambar}" class="card-img-top" alt="${
      item.nama
    }" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between mb-2">
                        <h5 class="card-title">${item.nama}</h5>
                        <button class="btn btn-light btn-sm favorite-btn clicked" data-id="${
                          item.id
                        }" title="Remove from Favorites">
                        </button>
                        </div>
                        <p class="card-text">${item.deskripsi}</p>
                        <p class="card-text text-muted">Lokasi: ${
                          item.lokasi || "—"
                        }</p>
                        <div class="mt-auto">
                            <p class="card-text"><strong>Rp ${item.harga.toLocaleString(
                              "id-ID"
                            )}</strong></p>
                            <div class="mb-2">
                                <span class="badge bg-primary footer">${
                                  item.kategori
                                }</span>
                            </div>
                             <button class="btn btn-primary w-100" onclick="window.location.href='main.html?open_inquiry=${
                               item.id
                             }'">Pesan Sekarang</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    favcardContainer.innerHTML += productCard;
  });

  // Attach favorite button handlers for removal
  const favButtons = favcardContainer.querySelectorAll(".favorite-btn");
  favButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.id;
      const productIndex = product.findIndex((item) => item.id === productId);
      if (productIndex !== -1) {
        product[productIndex].favorite = false;
        saveProductsToLocalStorage();
        renderFavoriteProducts();

        // Show toast for removal
        const toastLiveExample = document.getElementById("liveToast");
        if (toastLiveExample) {
          const toastBody = toastLiveExample.querySelector(".toast-body");
          toastBody.textContent = "Produk Telah Dihapus dari Favorite";
          const toast = new bootstrap.Toast(toastLiveExample);
          toast.show();
        }
      }
    });
  });

  if (favoriteProducts.length === 0) {
    favcardContainer.innerHTML =
      '<h4 class="text-center">No favorite items found...</h4>';
  }
}

// Render a specific page of a given products array
function renderPage(productsArray) {
  if (!Array.isArray(productsArray)) productsArray = [];
  lastFilteredProducts = productsArray;

  const totalItems = productsArray.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = productsArray.slice(start, end);

  renderProducts(pageItems);
  updatePaginationControls(totalItems, totalPages);
}

function updatePaginationControls(totalItems, totalPages) {
  // create or get pagination container
  let pager = document.getElementById("paginationControls");
  if (!pager) {
    pager = document.createElement("div");
    pager.id = "paginationControls";
    pager.className = "d-flex justify-content-center my-3 gap-2";
    if (productContainer && productContainer.parentElement) {
      // allow the flex parent to wrap so pager can drop below the cards
      productContainer.parentElement.style.flexWrap = "wrap";
      productContainer.parentElement.appendChild(pager);
    } else {
      document.body.appendChild(pager);
    }

    // Force pager to occupy full row below the cards when parent uses flex-row
    // This makes the pager appear under the item cards instead of alongside them.
    pager.style.flexBasis = "100%";
    pager.style.order = "9999";
    pager.style.width = "100%";
    pager.style.marginTop = "1rem";
  }

  // if there are no items, hide pager
  if (totalItems === 0) {
    pager.innerHTML = '<h4 class="text-center">No items found...</h4>';
    return;
  }

  const prevDisabled = currentPage <= 1 ? "disabled" : "";
  const nextDisabled = currentPage >= totalPages ? "disabled" : "";

  pager.innerHTML = `
        <div class="d-flex flex-column align-items-center w-100">
            <div class="mb-2">Halaman ${currentPage} / ${totalPages}</div>
            <div>
                <button id="prevPage" class="btn btn-outline-primary me-2" ${prevDisabled}>Prev</button>
                <button id="nextPage" class="btn btn-outline-primary" ${nextDisabled}>Next</button>
            </div>
        </div>
    `;

  const prevBtn = document.getElementById("prevPage");
  const nextBtn = document.getElementById("nextPage");

  prevBtn?.removeEventListener("click", onPrev);
  nextBtn?.removeEventListener("click", onNext);

  if (prevBtn) prevBtn.addEventListener("click", onPrev);
  if (nextBtn) nextBtn.addEventListener("click", onNext);
}

function onPrev() {
  if (currentPage > 1) {
    currentPage--;
    renderPage(lastFilteredProducts.length ? lastFilteredProducts : product);
  }
}

function onNext() {
  const totalPages = Math.max(
    1,
    Math.ceil(
      (lastFilteredProducts.length
        ? lastFilteredProducts.length
        : product.length) / itemsPerPage
    )
  );
  if (currentPage < totalPages) {
    currentPage++;
    renderPage(lastFilteredProducts.length ? lastFilteredProducts : product);
  }
}

// Function to filter products
function filterProducts() {
  const searchTerm = searchInput?.value.toLowerCase() || "";
  const selectedCategory = filterCategory?.value || "";
  const selectedLocation = filterLocation?.value || "";
  const salaryText = filterPrice?.value || "";
  const sortBy = sortFilter?.value || "";
  const salaryFilter = filterPrice?.value || "";

  console.log(`Filtering by location: ${selectedLocation}`);

  let filteredProducts = product.filter((item) => {
    console.log(`Product location: ${item.lokasi}`);
    const matchesSearch =
      item.nama.toLowerCase().includes(searchTerm) ||
      item.deskripsi.toLowerCase().includes(searchTerm) ||
      item.lokasi.toLowerCase().includes(searchTerm) ||
      item.kategori.toLowerCase().includes(searchTerm) ||
      item.harga.toString().toLowerCase().includes(searchTerm);
    const matchesCategory =
      !selectedCategory ||
      item.kategori.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesLocation =
      !selectedLocation ||
      item.lokasi.toLowerCase().includes(selectedLocation.toLowerCase());

    let salaryMatch = true;
    const price = Number(item.harga) || 0;
    if (salaryFilter === "<10000") {
      salaryMatch = price < 10000;
    } else if (salaryFilter === "10000-50000") {
      salaryMatch = price >= 10000 && price <= 50000;
    } else if (salaryFilter === ">50000") {
      salaryMatch = price > 50000;
    }

    return matchesSearch && matchesCategory && matchesLocation && salaryMatch;
  });

  // Lakukan sorting setelah filtering
  if (sortBy === "price-asc") {
    // Urutkan dari termurah ke termahal
    filteredProducts.sort((a, b) => a.harga - b.harga);
  } else if (sortBy === "price-desc") {
    // Urutkan dari termahal ke termurah
    filteredProducts.sort((a, b) => b.harga - a.harga);
  }

  lastFilteredProducts = filteredProducts;
  currentPage = 1;
  renderPage(filteredProducts);
}

// Ambil semua lokasi dari array product
const allLocations = product.map((item) => item.lokasi);

// Hapus duplikasi menggunakan Set
const uniqueLocations = [...new Set(allLocations)];

// Cetak hasil
console.log(uniqueLocations);

// Wrap the product array with a Proxy to automatically save changes to localStorage
const productHandler = {
  set(target, property, value) {
    target[property] = value;
    localStorage.setItem("products", JSON.stringify(target)); // Automatically save to localStorage
    return true;
  },
};

// Replace the product array with a Proxy
const productProxy = new Proxy(product, productHandler);

// Update all references to use productProxy instead of product
// Example: Use productProxy.push() instead of product.push()
// Ensure all operations on the product array go through the proxy

// Function to load products from local storage - DEPRECATED/REMOVED
// logic handled at init
// function loadProductsFromLocalStorage() { ... }

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  // Initial render

  // Check if we are on the favorites page
  if (document.querySelector(".fav-container")) {
    renderFavoriteProducts();
  }

  // Check if we are on the home page
  if (document.getElementById("homei")) {
    renderHomeProducts();
  }

  // set lastFilteredProducts and render first page
  // set lastFilteredProducts and render first page
  if (productContainer) {
    lastFilteredProducts = product.slice();
    renderPage(product);
  }

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
  }

  // Filter functionality
  if (filterCategory) {
    filterCategory.addEventListener("change", filterProducts);
  }
  // Price filter
  if (filterPrice) {
    filterPrice.addEventListener("change", filterProducts);
  }
  if (filterLocation) {
    filterLocation.addEventListener("change", filterProducts);
  }
  if (sortFilter) {
    sortFilter.addEventListener("change", filterProducts);
  }
  // Update filter options to match product categories
  if (filterCategory) {
    filterCategory.innerHTML = `
            <option value="">Category (none)</option>
            <option value="makanan">Makanan</option>
            <option value="minuman">Minuman</option>
            <option value="jasa">Jasa</option>
            <option value="lain-lain">Lain-lain</option>
        `;
  }
  const uniqueLocationsa = uniqueLocations.sort();
  if (filterLocation) {
    // Populate location filter options
    filterLocation.innerHTML = `<option value="">Location (all)</option>`;
    uniqueLocationsa.forEach((loc) => {
      filterLocation.innerHTML += `<option value="${loc}">${loc}</option>`;
    });
  }

  // Debugging: Log products loaded from localStorage
  console.log("Loaded products:", product);

  // Debugging: Log favorite products
  function debugFavoriteProducts() {
    const favoriteProducts = product.filter((item) => item.favorite);
    console.log("Favorite products:", favoriteProducts);
  }

  debugFavoriteProducts(); // Log favorite products on page load

  // Check for auto-open inquiry modal from URL
  const urlParams = new URLSearchParams(window.location.search);
  const openInquiryId = urlParams.get("open_inquiry");
  if (openInquiryId) {
    // Small delay to ensure modal logic is ready
    setTimeout(() => {
      if (typeof window.openInquiryModal === "function") {
        window.openInquiryModal(openInquiryId);
        // Clean URL
        const newUrl =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname;
        window.history.replaceState({ path: newUrl }, "", newUrl);
      }
    }, 500);
  }

  // Setup Inquiry Form
  const inquiryForm = document.getElementById("inquiryForm");
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const btn = inquiryForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = "Mengirim...";
      btn.disabled = true;

      const formData = new FormData(inquiryForm);
      // NOTE: Replace with your actual email endpoint, or use formsubmit's ajax
      fetch("https://formsubmit.co/ajax/471a8be2a19c741293a87753e748ba68", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Close modal
          const modalEl = document.getElementById("inquiryModal");
          const modal = bootstrap.Modal.getInstance(modalEl);
          modal.hide();

          // Reset form
          inquiryForm.reset();

          // Show Toast
          const toastEl = document.getElementById("statusToast");
          if (toastEl) {
            const toast = new bootstrap.Toast(toastEl);
            toast.show();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Terjadi kesalahan saat mengirim pesanan. Silakan coba lagi.");
        })
        .finally(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
        });
    });
  }
});

// Window function to open modal
window.openInquiryModal = function (productId) {
  const p = product.find((item) => item.id === productId);
  if (!p) return;

  const imgEl = document.getElementById("modalProductImage");
  const nameEl = document.getElementById("modalProductNameDisplay");
  const priceEl = document.getElementById("modalProductPriceDisplay");
  const inputEl = document.getElementById("inputProduct");

  if (imgEl) imgEl.src = `img/${p.gambar}`;
  if (nameEl) nameEl.textContent = p.nama;
  if (priceEl) priceEl.textContent = `Rp ${p.harga.toLocaleString("id-ID")}`;
  if (inputEl) inputEl.value = p.nama;

  const modalEl = document.getElementById("inquiryModal");
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
};

// Function to update favorite badge count
function updateFavoriteBadge() {
  const badge = document.getElementById("fav-badge");
  if (badge) {
    const count = product.filter((p) => p.favorite).length;
    badge.textContent = count;
  }
}

// Initial save to localStorage
saveProductsToLocalStorage();
updateFavoriteBadge();
