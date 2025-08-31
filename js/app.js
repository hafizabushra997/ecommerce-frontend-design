    // ✅ Generic Dropdown Setup
    function setupDropdown(dropdownSelector, buttonSelector, menuSelector, textSelector, imgSelector) {
      const dropdown = document.querySelector(dropdownSelector);
      if (!dropdown) return;

      const button = dropdown.querySelector(buttonSelector);
      const menu = dropdown.querySelector(menuSelector);
      const textEl = button.querySelector(textSelector);
      const imgEl = button.querySelector(imgSelector);

      // Toggle dropdown
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("active");
      });

      // Update selection
      menu.querySelectorAll("li").forEach(item => {
        item.addEventListener("click", () => {
          const text = item.dataset.country || item.dataset.language;
          const flag = item.dataset.flag;

          textEl.textContent = text;
          imgEl.src = flag;

          menu.classList.remove("active");
        });
      });

      // Close when clicking outside
      document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
          menu.classList.remove("active");
        }
      });
    }

    // ✅ Initialize both dropdowns
    setupDropdown(".shipToDropdown", "#ship-to-btn", "#ship-to-menu", "span", "#flag-image");
    setupDropdown(".languageDropdown", "#language-btn", "#language-menu", "span", "#language-flag");

// <-----------------------xxx------------------------>

// ================== Save selected product in local storage ==================
function addToCart(productCard) {
  const product = {
    title: productCard.querySelector(".product-title")?.textContent || "No title",
    price: productCard.querySelector(".price")?.textContent || "Rs.0",
    image: productCard.querySelector("img")?.src || ""
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // prevent duplicates
  const exists = cart.some(item => item.title === product.title);
  if (!exists) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Product added to cart!");
  } else {
    alert("Already in cart!");
  }
}

// ========== Wishlist Button Setup ==========
function setupWishlistButtons() {
  document.querySelectorAll("#cartBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const productCard = btn.closest(".product-card");
      if (productCard) {
        addToCart(productCard);
      }
    });
  });
}

// ========== Update Cart Count ==========
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// Run on every page load
document.addEventListener("DOMContentLoaded", () => {
  setupWishlistButtons();
  updateCartCount();
});

