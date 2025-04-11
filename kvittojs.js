document.addEventListener("DOMContentLoaded", () => {
    const order = JSON.parse(localStorage.getItem("currentOrder"));
  
    if (!order) {
      alert("Ingen order hittades.");
      window.location.href = "index.html";
      return;
    }
  
    // Sätt orderinformation
    document.getElementById("orderNumber").textContent = order.orderNumber;
    document.getElementById("orderDate").textContent = new Date(order.orderDate).toLocaleDateString();
  
    document.getElementById("customerName").textContent = order.customer.name;
    document.getElementById("customerEmail").textContent = order.customer.email;
    document.getElementById("customerPhone").textContent = order.customer.phone;
    document.getElementById("customerAddress").textContent = `${order.customer.address.street}, ${order.customer.address.zip} ${order.customer.address.city}`;
  
    // Lista produkter
    const productList = document.getElementById("productList");
    let total = 0;
    order.cart.forEach(product => {
      const subtotal = product.price * product.quantity;
      total += subtotal;
  
      const line = document.createElement("div");
      line.className = "product-line";
      line.innerHTML = `
        <span>${product.title} × ${product.quantity}</span>
        <span>${subtotal.toFixed(2)} kr</span>
      `;
      productList.appendChild(line);
    });
  
    document.getElementById("orderTotal").textContent = total.toFixed(2);
  });
  