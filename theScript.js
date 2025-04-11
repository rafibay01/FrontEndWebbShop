fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.container');
    if (!container) {
      console.error('Container-elementet hittades inte!');
      return;
    }
    container.innerHTML = '';

    let row;
    data.forEach((product, index) => {
      if (index % 5 === 0) {
        row = document.createElement('div');
        row.className = 'row justify-content-center';
        container.appendChild(row);
      }

      const col = document.createElement('div');
      col.className = 'col-6 col-sm-4 col-md-3 col-lg-2 g-5';

      col.innerHTML = `
        <div class="card h-100 p-2">
          <h4 class="product-title text-center fs-6">${product.title}</h4>
          <img src="${product.image}" alt="${product.title}" class="img-fluid">
          <p class="text-center product-price">$${product.price}</p>
          <button class="btn btn-success purchase-btn"
            data-id="${product.id}"
            data-title="${product.title}"
            data-price="${product.price}"
            data-image="${product.image}">
            Beställ
          </button>
        </div>
      `;

      row.appendChild(col);
    });

    // Lägg till event listeners på alla "Beställ"-knappar
    document.querySelectorAll('.purchase-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const product = {
          id: btn.dataset.id,
          title: btn.dataset.title,
          price: parseFloat(btn.dataset.price),
          image: btn.dataset.image
        };
        addToCart(product);
        toggleCart();
      });
    });
  })
  .catch(error => console.error('Fel vid hämtning av produkter:', error));
