
// Sidebar Section Toggle Content functionality

document.querySelectorAll(".sidebar-section").forEach(section => {
    const header = section.querySelector(".sidebar-header");
    const content = section.querySelector(".sidebar-content");

    header.addEventListener("click", () => {
      section.classList.toggle("active");
      content.style.display = content.style.display === "none" ? "block" : "none";
    });

    // Initially hide content
    content.style.display = "none";
  });

// <-----------------------xxx------------------------>


// ================== GLOBAL VARIABLES ==================

// All products
const products = document.querySelectorAll(".productCard");

// Text placeholders for UI updates (Page Title Section)
const productsCountText = document.getElementById("productsCountText");
const productCategoryText = document.getElementById("productCategoryText");

// Category links
const filterLinks = document.querySelectorAll(".filter-link");

// Price range elements
const applyBtn = document.querySelector(".apply-btn");
const minInput = document.querySelector(".price-inputs input[placeholder='Min']");
const maxInput = document.querySelector(".price-inputs input[placeholder='Max']");
const rangeSlider = document.querySelector(".price-slider");

// Rating checkboxes
const ratingCheckboxes = document.querySelectorAll("#ratingCheckbox");

// Pagination elements
const paginationSection = document.getElementById("pagination");
const pageButtons = paginationSection.querySelectorAll(".pageBtn");
const prevBtn = pageButtons[0]; // first = prev
const nextBtn = pageButtons[pageButtons.length - 1]; // last = next

// Items per page
const itemsPerPage = 5;

// State variables
let currentPage = 1;
// this will always hold "currently filtered" products
let filteredProducts = Array.from(products); 


// ================== MAIN FILTER FUNCTION ==================
function applyAllFilters(selectedCategory) {
  // Step 1: Get filters
  const category = selectedCategory || "all";  //Category Filters
  // Range Filters
  const min = parseFloat(minInput.value) || 0;
  const max = parseFloat(maxInput.value) || 1000;
  // Rating Filters
  const selectedRatings = Array.from(ratingCheckboxes)
    .filter(cb => cb.checked)
    .map(cb => parseInt(cb.dataset.rating));

  // Step 2: Filter products
  filteredProducts = Array.from(products).filter(product => {
    // Category check
    const productCategory = product.getAttribute("data-category");
    const categoryMatch = category === "all" || productCategory === category;

    // Price check
    const priceText = product.querySelector(".price").innerText;
    const price = parseFloat(priceText.replace("$", "").replace(",", ""));
    const priceMatch = price >= min && price <= max;

    // Rating check
    const productRating = parseInt(product.dataset.rating);
    const ratingMatch = selectedRatings.length === 0 || selectedRatings.includes(productRating);

    // Final condition: must match all 3
    return categoryMatch && priceMatch && ratingMatch;
  });

  // Step 3: Update UI texts
  productsCountText.innerText = filteredProducts.length;
  productCategoryText.textContent =
    category === "all"
      ? "All Products"
      : category.charAt(0).toUpperCase() + category.slice(1);

  // Step 4: Reset pagination
  currentPage = 1;
  showPage(currentPage);
}


// ================== PAGINATION FUNCTION ==================
function showPage(page) {
  // Hide all products first
  products.forEach(p => (p.style.display = "none"));

  // Recalculate total pages from current filtered set
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Calculate slice range
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  // Show only products in current page range
  filteredProducts.forEach((product, index) => {
    if (index >= start && index < end) {
      product.style.display = "flex"; // your layout type
    }
  });

  // Update button states
  prevBtn.disabled = page === 1;
  nextBtn.disabled = page === totalPages;

  // Update active button class
  pageButtons.forEach(btn => btn.classList.remove("active"));
  if (page <= totalPages) {
    pageButtons[page].classList.add("active");
  }
}


// ================== EVENT HANDLERS ==================

// Category links click
filterLinks.forEach(link => {
  const url = new URL(link.href);
  const linkCategory = url.searchParams.get("category") || "all";

  link.addEventListener("click", e => {
    e.preventDefault();
    // Reset active classes
    filterLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    // Apply filters with new category
    applyAllFilters(linkCategory);
  });
});

// Price filter
applyBtn.addEventListener("click", () => {
  rangeSlider.min = parseFloat(minInput.value) || 0;
  rangeSlider.max = parseFloat(maxInput.value) || 1000;
  rangeSlider.value = rangeSlider.max;
  applyAllFilters(getActiveCategory());
});

rangeSlider.addEventListener("input", () => {
  const min = parseFloat(rangeSlider.min) || 0;
  const max = parseFloat(rangeSlider.value);
  minInput.value = min;
  maxInput.value = max;
  applyAllFilters(getActiveCategory());
});

// Rating checkboxes
ratingCheckboxes.forEach(checkbox => {
  checkbox.addEventListener("change", () => {
    applyAllFilters(getActiveCategory()); 
  });
});

// Pagination buttons
pageButtons.forEach((btn, index) => {
  if (index === 0) {
    btn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
      }
    });
  } else if (index === pageButtons.length - 1) {
    btn.addEventListener("click", () => {
      const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
      if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
      }
    });
  } else {
    btn.addEventListener("click", () => {
      currentPage = index;
      showPage(currentPage);
    });
  }
});


// ================== HELPER FUNCTION ==================
// Get currently active category (from active link)
function getActiveCategory() {
  const activeLink = document.querySelector(".filter-link.active");
  if (!activeLink) return "all";
  const url = new URL(activeLink.href);
  return url.searchParams.get("category") || "all";
}


// ================== INITIAL LOAD ==================
const params = new URLSearchParams(window.location.search);
const initialCategory = params.get("category") || "all";

// ✅ Highlight correct active link on page load
filterLinks.forEach(link => {
  const url = new URL(link.href);
  const linkCategory = url.searchParams.get("category") || "all";
  if (linkCategory === initialCategory) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

// Apply filters on load
applyAllFilters(initialCategory);

