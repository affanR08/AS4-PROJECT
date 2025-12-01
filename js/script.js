import{product}from"./product.js";

// DOM elements
const searchInput = document.getElementById('searchInput');
const filterLocation = document.getElementById('filterLocation');
const filterSalary = document.getElementById('filterSalary');
const filterJobs = document.getElementById('filterJobs');
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
                        <h5 class="card-title">${item.nama}</h5>
                        <p class="card-text">${item.deskripsi}</p>
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
            productContainer.parentElement.appendChild(pager);
        } else {
            document.body.appendChild(pager);
        }
    }

    // if there are no items, hide pager
    if (totalItems === 0) {
        pager.innerHTML = '';
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
    const selectedCategory = filterJobs?.value || '';
    
    let filteredProducts = product.filter(item => {
        const matchesSearch = item.nama.toLowerCase().includes(searchTerm) || 
                            item.deskripsi.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || item.kategori === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    // reset to first page when filtering
    currentPage = 1;
    renderPage(filteredProducts);
}

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
    if (filterJobs) {
        filterJobs.addEventListener('change', filterProducts);
    }
    
    // Update filter options to match product categories
    if (filterJobs) {
        filterJobs.innerHTML = `
            <option value="">Category (none)</option>
            <option value="makanan">Makanan</option>
            <option value="minuman">Minuman</option>
            <option value="jasa">Jasa</option>
            <option value="lain-lain">Lain-lain</option>
        `;
    }
});