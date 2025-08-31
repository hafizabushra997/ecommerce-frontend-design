
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


//   // Filter Functionality  of Hero/ Category Section Menu links
// // Get all product cards
// const products = document.querySelectorAll(".productCard");
// const productsCountText = document.getElementById('productsCountText');
// const productCategoryText = document.getElementById('productCategoryText');

// // Get category from URL (?category=electronics)
// const params = new URLSearchParams(window.location.search);
// const category = params.get("category") || "all";
// // Variable to count visible products
// let visibleProductsCount = 0;

// // Filter products
// products.forEach(product => {
//   const productCategory = product.getAttribute("data-category");
//   if (category === "all" || productCategory === category) {
//     product.classList.remove("hidden");
//     // increase counter if product is visible
//         visibleProductsCount++; 

//   } else {
//     product.classList.add("hidden");
//   }
// });

// productsCountText.innerText=visibleProductsCount;
// // Highlight active filter link
// const filterLinks = document.querySelectorAll(".filter-link");

// filterLinks.forEach(link => {
//   const url = new URL(link.href);
  
//   const linkCategory = url.searchParams.get("category");
// if (category==='all') {
//   filterLinks[0].classList.add('active');
    
//     productCategoryText.textContent = "All Products";

// } else {
//   if (linkCategory === category) {
//     link.classList.add("active");
//     productCategoryText.textContent=category.charAt(0).toUpperCase() + category.slice(1);

//   }
  
//   else {
//     link.classList.remove("active");
//   }
// }
  
// });


// // <-----------------------xxx------------------------>

// // Price Range Elements
// const applyBtn = document.querySelector(".apply-btn");
// const minInput = document.querySelector(".price-inputs input[placeholder='Min']");
// const maxInput = document.querySelector(".price-inputs input[placeholder='Max']");
// const rangeSlider = document.querySelector(".price-slider");

// // Rating Elements
// const ratingCheckboxes = document.querySelectorAll("#ratingCheckbox");

// // ---------------- Combined Filter Function ----------------
// function filterProducts() {
//   // --- Get Price Range ---
//   const min = parseFloat(minInput.value) || 0;
//   const max = parseFloat(maxInput.value) || 1000;

//   // --- Get Selected Ratings ---
//   const selectedRatings = Array.from(ratingCheckboxes)
//     .filter(cb => cb.checked)
//     .map(cb => parseInt(cb.dataset.rating));

//   // --- Loop Through Products ---
//   products.forEach(product => {
//     // Product Price
//     const priceText = product.querySelector(".price").innerText;
//     const price = parseFloat(priceText.replace("$", "").replace(",", ""));

//     // Product Rating
//     const productRating = parseInt(product.dataset.rating);

//     // Conditions
//     const priceMatch = price >= min && price <= max;
//     const ratingMatch = selectedRatings.length === 0 || selectedRatings.includes(productRating);

//     // Show only if both match
//     product.style.display = (priceMatch && ratingMatch) ? "flex" : "none";
//   });
// }

// // ---------------- Events ----------------

// // Apply button for price range
// applyBtn.addEventListener("click", () => {
//   rangeSlider.min = parseFloat(minInput.value) || 0;
//   rangeSlider.max = parseFloat(maxInput.value) || 1000;
//   rangeSlider.value = rangeSlider.max;
//   filterProducts();
// });

// // Slider change
// rangeSlider.addEventListener("input", () => {
//   const min = parseFloat(rangeSlider.min) || 0;
//   const max = parseFloat(rangeSlider.value);
//   minInput.value = min;
//   maxInput.value = max;
//   filterProducts();
// });

// // Rating checkboxes change
// ratingCheckboxes.forEach(checkbox => {
//   checkbox.addEventListener("change", filterProducts);
// });

// // <-----------------------xxx------------------------>


// // Pagination Section Functionality 

//     // Select pagination buttons
//     const paginationSection = document.getElementById("pagination");
//     const pageButtons = paginationSection.querySelectorAll(".pageBtn");
//     const prevBtn = pageButtons[0]; // First button = Previous
//     const nextBtn = pageButtons[pageButtons.length - 1]; // Last button = Next

//     // Number of items to show on each page
//     const itemsPerPage = 5;

//     // Keep track of the current page
//     let currentPage = 1;

//     // Calculate total pages (round up)
//     const totalPages = Math.ceil(products.length / itemsPerPage);

//     // Function to show products based on current page
//     function showPage(page) {
//       // Hide all products first
//       products.forEach((product) => (product.style.display = "none"));

//       // Calculate the start and end index
//       const start = (page - 1) * itemsPerPage;
//       const end = start + itemsPerPage;

//       // Show products within the range
//       products.forEach((product, index) => {
//         if (index >= start && index < end) {
//           product.style.display = "flex"; // Use your layout display type
//         }
//       });

//       // Update button states (disable/enable)
//       prevBtn.disabled = page === 1; // Disable on first page
//       nextBtn.disabled = page === totalPages; // Disable on last page

//       // Remove 'active' class from all numbered buttons
//       pageButtons.forEach((btn) => {
//           btn.classList.remove("active");
//       });

//       // Add 'active' class to the current page button
//       if (page <= totalPages) {
//         pageButtons[page].classList.add("active"); 
//       }
//     }

//     // Attach click event to pagination buttons
//     pageButtons.forEach((btn, index) => {
//       // First button = Previous
//       if (index === 0) {
//         btn.addEventListener("click", () => {
//           if (currentPage > 1) {
//             currentPage--;
//             showPage(currentPage);
//           }
//         });
//       }
//       // Last button = Next
//       else if (index === pageButtons.length - 1) {
//         btn.addEventListener("click", () => {
//           if (currentPage < totalPages) {
//             currentPage++;
//             showPage(currentPage);
//           }
//         });
//       }
//       // Number buttons
//       else {
//         btn.addEventListener("click", () => {
//           currentPage = index; // Button 1 -> page 1, button 2 -> page 2
//           showPage(currentPage);
//         });
//       }
//     });

//     // Initial page load
//     showPage(currentPage);
 

// ================== GLOBAL VARIABLES ==================

// All products
const products = document.querySelectorAll(".productCard");

// Text placeholders for UI updates
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
let filteredProducts = Array.from(products); // this will always hold "currently filtered" products


// ================== MAIN FILTER FUNCTION ==================
function applyAllFilters(selectedCategory) {
  // Step 1: Get filters
  const category = selectedCategory || "all";
  const min = parseFloat(minInput.value) || 0;
  const max = parseFloat(maxInput.value) || 1000;
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
applyAllFilters(initialCategory);

// // Highlight active filter link
// const filterLinks = document.querySelectorAll(".filter-link");

// filterLinks.forEach(link => {
//   const url = new URL(link.href);
  
//   const linkCategory = url.searchParams.get("category");
// if (category==='all') {
//   filterLinks[0].classList.add('active');
    
//     productCategoryText.textContent = "All Products";

// } else {
//   if (linkCategory === category) {
//     link.classList.add("active");
//     productCategoryText.textContent=category.charAt(0).toUpperCase() + category.slice(1);

//   }
  
//   else {
//     link.classList.remove("active");
//   }
// }
  
// });


