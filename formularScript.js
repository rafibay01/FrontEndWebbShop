document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');
  
    if (!cart.length || !checkoutItems) {
      alert("Din varukorg är tom. Vänligen välj produkter först.");
      window.location.href = "index.html";
      return;
    }
  
    let total = 0;
    cart.forEach(p => {
      const subtotal = p.price * p.quantity;
      total += subtotal;
  
      const item = document.createElement('p');
      item.textContent = `${p.title} – ${p.quantity} st – ${subtotal.toFixed(2)} kr`;
      checkoutItems.appendChild(item);
    });
  
    checkoutTotal.textContent = `Totalt att betala: ${total.toFixed(2)} kr`;
  

    const form = document.getElementById('checkoutForm');
    if (!form) return;
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const address = document.getElementById('address').value.trim();
      const postal = document.getElementById('postal').value.trim();
      const city = document.getElementById('city').value.trim();
  
      const errors = [];
      if (name.length < 2 || name.length > 50) errors.push("Namn måste vara 2–50 tecken.");
      if (!email.includes('@') || email.length > 50) errors.push("Ogiltig e-post.");
      if (!/^[0-9\-\(\) ]+$/.test(phone) || phone.length > 50) errors.push("Ogiltigt telefonnummer.");
      if (address.length < 2 || address.length > 50) errors.push("Ogiltig adress.");
      if (!/^\d{5}$/.test(postal)) errors.push("Postnummer måste vara 5 siffror.");
      if (city.length < 2 || city.length > 50) errors.push("Ogiltig postort.");
  
      if (errors.length > 0) {
        alert("Formulärfel:\n" + errors.join("\n"));
        return;
      }
  
      const orderData = {
        orderNumber: Math.floor(Math.random() * 1000000),
        orderDate: new Date().toISOString(),
        customer: {
          name,
          email,
          phone,
          address: {
            street: address,
            zip: postal,
            city
          }
        },
        cart: cart
      };
  
      localStorage.setItem('currentOrder', JSON.stringify(orderData));
      localStorage.removeItem('cart');
      window.location.href = "kvitto.html";
    });
  });
  