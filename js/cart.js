// Elements
const cartContainer = document.querySelector(".cart-items-container");
const cartCount = document.getElementById("cartCount");
const cartTitle = document.querySelector(".title-h4");

// Load cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count in navbar
function updateCartCount() {
  cartCount.textContent = cart.length;
}

// Render cart items
function renderCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    cartTitle.textContent = "My Cart (0)";
    updateCartCount();
    return;
  }

  cartTitle.textContent = `My Cart (${cart.length})`;
  updateCartCount();

  cartContainer.innerHTML = cart.map((product, index) => 
    `<div class="cart-item flex">
      <div class="cart-item-image">
          <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="cart-item-details flex">
          <p class="text-title">${product.title}</p>
          <p class="text-info">Seller: Default Store</p>
          <div class="item-actions flex">
              <button class="btn-text btn-basic btn-remove" data-index="${index}">Remove</button>
              <button class="btn-text btn-basic btn-save">Save for later</button>
          </div>
      </div>
      <div class="cart-item-qty flex">
          <p class="text-title">${product.price}</p>
          <input type="number" min="1" value="1" name="item-qty" id="item-qty" class="input-basic" placeholder="Qty">
      </div>
    </div>
  `).join("");

  // Attach remove events
  document.querySelectorAll(".btn-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });
}

// Remove all
document.querySelector(".btn-removeAll").addEventListener("click", () => {
  localStorage.removeItem("cart");
  cart = [];
  renderCart();
});

// Initial load
renderCart();
