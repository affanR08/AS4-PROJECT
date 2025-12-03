import{product}from"./product.js";

// Check if products are already in localStorage
const storedProducts = localStorage.getItem('products');
if (storedProducts) {
    // Parse and use stored products
    product.length = 0; // Clear the current product array
    product.push(...JSON.parse(storedProducts));
} else {
    // Save the initial product data to localStorage
    localStorage.setItem('products', JSON.stringify(product));
}

// Ensure products are saved to localStorage after any modifications
function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(product));
}

// DOM elements
const searchInput = document.getElementById('searchInput');
const filterLocation = document.getElementById('filterLocation');
const filterPrice = document.getElementById('filterPrice');
const filterCategory = document.getElementById('filterCategory');
const productContainer = document.querySelector('.row.row-cols-1.container.row-cols-md-3.g-4');

// Pagination state
let currentPage = 1;
const itemsPerPage = 15;
// keep last filtered products so pagination works on current view
let lastFilteredProducts = [];

// Function to render products
function renderProducts(productsToRender) {
    if (!productContainer) return;
    
    productContainer.innerHTML = '';
    
    productsToRender.forEach(item => {
        const productCard = `
            <div class="col">
                <div class="card h-100">
                    <img src="img/${item.gambar}" class="card-img-top" alt="${item.nama}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                    <div class="d-flex justify-content-between mb-2">
                        <h5 class="card-title">${item.nama}</h5>
                        <button class="btn btn-light btn-sm favorite-btn" title="Add to Favorites">
                        </button>
                        </div>
                        <p class="card-text">${item.deskripsi}</p>
                        <p class="card-text text-muted">Lokasi: ${item.lokasi || '—'}</p>
                        <p class="card-text"><strong>Rp ${item.harga.toLocaleString('id-ID')}</strong></p>
                        <span class="badge bg-primary footer">${item.kategori}</span>
                    </div>
                </div>
            </div>
        `;
        productContainer.innerHTML += productCard;
    });
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
    let pager = document.getElementById('paginationControls');
    if (!pager) {
        pager = document.createElement('div');
        pager.id = 'paginationControls';
        pager.className = 'd-flex justify-content-center my-3 gap-2';
        if (productContainer && productContainer.parentElement) {
            // allow the flex parent to wrap so pager can drop below the cards
            productContainer.parentElement.style.flexWrap = 'wrap';
            productContainer.parentElement.appendChild(pager);
        } else {
            document.body.appendChild(pager);
        }

        // Force pager to occupy full row below the cards when parent uses flex-row
        // This makes the pager appear under the item cards instead of alongside them.
        pager.style.flexBasis = '100%';
        pager.style.order = '9999';
        pager.style.width = '100%';
        pager.style.marginTop = '1rem';
    }

    // if there are no items, hide pager
    if (totalItems === 0) {
        pager.innerHTML = '<h4 class="text-center">No items found...</h4>';
        return;
    }

    const prevDisabled = currentPage <= 1 ? 'disabled' : '';
    const nextDisabled = currentPage >= totalPages ? 'disabled' : '';

    pager.innerHTML = `
        <div class="d-flex flex-column align-items-center w-100">
            <div class="mb-2">Halaman ${currentPage} / ${totalPages}</div>
            <div>
                <button id="prevPage" class="btn btn-outline-primary me-2" ${prevDisabled}>Prev</button>
                <button id="nextPage" class="btn btn-outline-primary" ${nextDisabled}>Next</button>
            </div>
        </div>
    `;

    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    prevBtn?.removeEventListener('click', onPrev);
    nextBtn?.removeEventListener('click', onNext);

    if (prevBtn) prevBtn.addEventListener('click', onPrev);
    if (nextBtn) nextBtn.addEventListener('click', onNext);
}

function onPrev() {
    if (currentPage > 1) {
        currentPage--;
        renderPage(lastFilteredProducts.length ? lastFilteredProducts : product);
    }
}

function onNext() {
    const totalPages = Math.max(1, Math.ceil((lastFilteredProducts.length ? lastFilteredProducts.length : product.length) / itemsPerPage));
    if (currentPage < totalPages) {
        currentPage++;
        renderPage(lastFilteredProducts.length ? lastFilteredProducts : product);
    }
}

// Function to filter products
function filterProducts() {
    const searchTerm = searchInput?.value.toLowerCase() || '';
    const selectedCategory = filterCategory?.value || '';
    const selectedLocation = filterLocation?.value || '';
    const salaryText = filterPrice?.value || '';
    const salaryFilter = filterPrice?.value || '';

    console.log(`Filtering by location: ${selectedLocation}`);

    let filteredProducts = product.filter(item => {
        console.log(`Product location: ${item.lokasi}`);
        const matchesSearch = item.nama.toLowerCase().includes(searchTerm) || 
                              item.deskripsi.toLowerCase().includes(searchTerm) ||
                              item.lokasi.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || item.kategori.toLowerCase().includes(selectedCategory.toLowerCase());
        const matchesLocation = !selectedLocation || item.lokasi.toLowerCase().includes(selectedLocation.toLowerCase());

        let salaryMatch = true;
        const price = Number(item.harga) || 0;
        if (salaryFilter === '<10000') {
            salaryMatch = price < 10000;
        } else if (salaryFilter === '10000-50000') {
            salaryMatch = price >= 10000 && price <= 50000;
        } else if (salaryFilter === '>50000') {
            salaryMatch = price > 50000;
        }

        return matchesSearch && matchesCategory && matchesLocation && salaryMatch;
    });

    lastFilteredProducts = filteredProducts;
    currentPage = 1;
    renderPage(filteredProducts);
}

// Ambil semua lokasi dari array product
const allLocations = product.map(item => item.lokasi);

// Hapus duplikasi menggunakan Set
const uniqueLocations = [...new Set(allLocations)];

// Cetak hasil
console.log(uniqueLocations);

// Wrap the product array with a Proxy to automatically save changes to localStorage
const productHandler = {
    set(target, property, value) {
        target[property] = value;
        localStorage.setItem('products', JSON.stringify(target)); // Automatically save to localStorage
        return true;
    }
};

// Replace the product array with a Proxy
const productProxy = new Proxy(product, productHandler);

// Update all references to use productProxy instead of product
// Example: Use productProxy.push() instead of product.push()
// Ensure all operations on the product array go through the proxy

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initial render
    // set lastFilteredProducts and render first page
    lastFilteredProducts = product.slice();
    renderPage(product);
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', filterProducts);
    }
    
    // Filter functionality
    if (filterCategory) {
        filterCategory.addEventListener('change', filterProducts);
    }
    // Price filter
    if (filterPrice) {
        filterPrice.addEventListener('change', filterProducts);
    }
    if (filterLocation) {
        filterLocation.addEventListener('change', filterProducts);
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

    if (filterLocation) {
        // Populate location filter options
        filterLocation.innerHTML = `<option value="">Location (all)</option>`;
        uniqueLocations.forEach(loc => {
            filterLocation.innerHTML += `<option value="${loc}">${loc}</option>`;
        });
    }
});
    const favoriteIcons = document.querySelectorAll('box-icon[name="heart"]');
    const favoriteButtons = document.querySelectorAll('.favorite-btn');

    favoriteButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const icon = favoriteIcons[index];
            icon
        });
    });

// Initial save to localStorage
saveProductsToLocalStorage();