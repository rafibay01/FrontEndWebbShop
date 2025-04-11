// cart.js

// Ladda varukorgen från localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Spara till localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Lägg till produkt i varukorgen
function addToCart(product) {
  const existing = cart.find(p => p.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  updateCartDisplay();
}

// Öka antal
function increaseQuantity(id) {
  const item = cart.find(p => p.id === id);
  if (item) item.quantity++;
  saveCart();
  updateCartDisplay();
}

// Minska antal
function decreaseQuantity(id) {
  const item = cart.find(p => p.id === id);
  if (!item) return;
  item.quantity--;
  if (item.quantity <= 0) {
    removeFromCart(id);
  } else {
    saveCart();
    updateCartDisplay();
  }
}

// Ta bort produkt
function removeFromCart(id) {
  cart = cart.filter(p => p.id !== id);
  saveCart();
  updateCartDisplay();
}

// Töm hela varukorgen
function clearCart() {
  cart = [];
  saveCart();
  updateCartDisplay();
}

// Räkna totalsumma
function getCartTotal() {
  return cart.reduce((sum, p) => sum + p.price * p.quantity, 0).toFixed(2);
}

// Visa varukorgen i HTML
function updateCartDisplay() {
  const cartItemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  const countBadge = document.getElementById('cart-count');

  if (!cartItemsEl || !totalEl) return;

  cartItemsEl.innerHTML = '';

  cart.forEach(product => {
    const row = document.createElement('div');
    row.className = 'cart-row d-flex align-items-center justify-content-between mb-2';
    row.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <img src="${product.image}" alt="${product.title}" style="width:40px; height:40px; object-fit:contain;">
        <span>${product.title}</span>
      </div>
      <div>
        <button onclick="decreaseQuantity('${product.id}')" class="btn btn-sm btn-outline-secondary">–</button>
        <span class="mx-2">${product.quantity}</span>
        <button onclick="increaseQuantity('${product.id}')" class="btn btn-sm btn-outline-secondary">+</button>
      </div>
      <div>
        <strong>${(product.price * product.quantity).toFixed(2)} kr</strong>
        <button onclick="removeFromCart('${product.id}')" class="btn btn-sm btn-danger ms-2">🗑️</button>
      </div>
    `;
    cartItemsEl.appendChild(row);
  });

  totalEl.textContent = `Totalt: ${getCartTotal()} kr`;

  if (countBadge) {
    const count = cart.reduce((sum, p) => sum + p.quantity, 0);
    countBadge.textContent = count;
  }
}

function toggleCart() {
    const cart = document.getElementById("cartSection");
    cart.classList.toggle("active");
  }
  
  
