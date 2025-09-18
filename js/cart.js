// ================== Local Storage Helpers ==================
// Get cart array from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart array back to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount(); // always update badge
}

// ================== Add to Cart ==================
function addToCart(productCard) {
  const product = {
    title: productCard.querySelector(".product-title")?.textContent || "No title",
    price: productCard.querySelector(".price")?.textContent || "Rs.0",
    image: productCard.querySelector("img")?.src || "",
    qty: 1 // default quantity = 1
  };

  let cart = getCart();

  // prevent duplicates by title
  const exists = cart.some(item => item.title === product.title);
  if (!exists) {
    cart.push(product);
    saveCart(cart);
    alert("Product added to cart!");
  } else {
    alert("Already in cart!");
  }
}

// ================== Setup Cart Buttons (product-list/detail pages) ==================
function setupCartButtons() {
  document.querySelectorAll("#cartBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const productCard = btn.closest(".product-card");
      if (productCard) {
        addToCart(productCard);
        renderCart(); // if user is on cart.html
      }
    });
  });
}

// ================== Update Cart Count in Navbar ==================
function updateCartCount() {
  const cart = getCart();
  const cartCount = document.getElementById("cartCount");

  if (cartCount) {
    if (cart.length > 0) {
      cartCount.textContent = cart.length > 9 ? "9+" : cart.length;
      cartCount.style.display = "flex"; // show badge
    } else {
      cartCount.style.display = "none"; // hide when empty
    }
  }
}

// ================== Render Cart Items (cart.html only) ==================
function renderCart() {
  const cartContainer = document.querySelector(".cart-items-container");
  const cartTitle = document.querySelector(".title-h4");
// Checkout section elements
  const subtotalEl = document.getElementById("item-subtotal");
  const discountEl = document.getElementById("item-discount");
  const taxEl = document.getElementById("item-tax");
  const totalEl = document.getElementById("total-amount");
  const couponInput = document.querySelector(".coupon-input");
  const couponBtn = document.querySelector(".coupon-btn");
  const couponMsg = document.getElementById("coupon-msg");

  if (!cartContainer || !cartTitle) return; // not on cart page

  let cart = getCart();

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    cartTitle.textContent = "My Cart (0)";
    updateCartCount();

    // 🟢 Reset summary section also
    if (subtotalEl) subtotalEl.textContent = "$0.00";
    if (discountEl) discountEl.textContent = "-$0.00";
    if (taxEl) taxEl.textContent = "+$0.00";
    if (totalEl) totalEl.textContent = "$0.00";
    if (couponMsg) couponMsg.textContent = "";

    return;
  }

  cartTitle.textContent = `My Cart (${cart.length})`;
  updateCartCount();

  cartContainer.innerHTML = cart
    .map(
      (product, index) => `
    <div class="cart-item flex">
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
          <input type="number" min="1" value="${product.qty}" class="input-basic qty-input" data-index="${index}">
      </div>
    </div>`
    )
    .join("");

  // ---------------- Attach remove events ----------------
  document.querySelectorAll(".btn-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      cart.splice(index, 1); // remove product
      saveCart(cart);
      renderCart(); // re-render
    });
  });

  // ---------------- Attach qty change events ----------------
  document.querySelectorAll(".qty-input").forEach(input => {
    input.addEventListener("input", () => {
      const index = input.getAttribute("data-index");
      let newQty = parseInt(input.value);
      if (isNaN(newQty) || newQty < 1) newQty = 1; // prevent invalid qty
      cart[index].qty = newQty;
      saveCart(cart);
      calculateTotals(); // update summary
    });
  });

  // ---------------- Coupon Setup ----------------
  if (couponBtn) {
    couponBtn.addEventListener("click", () => {
      const code = couponInput.value.trim().toUpperCase();
      const coupons = { SAVE10: 10, SAVE20: 20, SAVE30: 30 };
      if (coupons[code]) {
        // Save applied coupon in localStorage
        localStorage.setItem("appliedCoupon", code);
        couponMsg.textContent = `Coupon ${code} applied: ${coupons[code]}% OFF`;
        couponMsg.style.color = "green";
      } else {
        localStorage.removeItem("appliedCoupon");
        couponMsg.textContent = "Invalid coupon code";
        couponMsg.style.color = "red";
      }
      calculateTotals();
    });
  }

 
  // ---------------- Totals Calculation ----------------
  function calculateTotals() {
    let subtotal = 0;
    cart.forEach(product => {
      const price = parseFloat(product.price.replace(/[^\d.]/g, "")) || 0;
      subtotal += price * (product.qty || 1);
    });

    // Load coupon from localStorage
    const appliedCoupon = localStorage.getItem("appliedCoupon");
    const coupons = { SAVE10: 10, SAVE20: 20, SAVE30: 30 };
    const discountPercent = appliedCoupon && coupons[appliedCoupon] ? coupons[appliedCoupon] : 0;

    const discount = (subtotal * discountPercent) / 100;
    const taxRate = 0.1; // 10%
    const tax = subtotal * taxRate;
    const total = subtotal - discount + tax;

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (discountEl) discountEl.textContent = `-$${discount.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `+$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;

    // Update coupon message if persisted
    if (appliedCoupon && couponMsg) {
      couponMsg.textContent = `Coupon ${appliedCoupon} applied: ${discountPercent}% OFF`;
      couponMsg.style.color = "green";
    }
  }

  // Initial calculation (including saved coupon)
  calculateTotals();

}

// ================== Remove All ==================
const removeAllBtn = document.querySelector(".btn-removeAll");
if (removeAllBtn) {
  removeAllBtn.addEventListener("click", () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("appliedCoupon"); // clear coupon too
    renderCart();
    
  });
}

// ================== Initial Load ==================
document.addEventListener("DOMContentLoaded", () => {
  setupCartButtons();
  updateCartCount();
  renderCart();
});

// ================== CHECKOUT ==================

  const checkoutBtn = document.querySelector(".checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const totalEl = document.getElementById("total-amount");
      console.log(totalEl.textContent.slice(1));
      
      if(totalEl.textContent.slice(1)>0){
      const totalAmount = totalEl.textContent;
      alert(`Proceeding to checkout. Your total is ${totalAmount}`);
      }
      // Example: redirect
      // window.location.href = "checkout.html?total=" + encodeURIComponent(totalAmount);
    });
  }
