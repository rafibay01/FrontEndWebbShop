fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        const titleElements = document.querySelectorAll('.product-title');
        titleElements.forEach((titleElement, index) => {
            if (data[index]) {
                titleElement.textContent = data[index].title;
            }
        });

        const priceElements = document.querySelectorAll('.product-price');
        priceElements.forEach((priceElement, index) => {
            if (data[index]) {
                priceElement.textContent = `${data[index].price}KR`;
            }
        });

        data.forEach((product, index) => {
            const imgElement = document.getElementById(`product${index + 1}`);
            if (imgElement) {
                imgElement.src = product.image;
            }
        });

        
        document.querySelectorAll('.purchase-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const productName = data[index]?.title || 'Okänd produkt';
                const urlEncodedProduct = encodeURIComponent(productName);
                window.location.href = `formular.html?product=${urlEncodedProduct}`;
            });
        });
    })
    .catch(error => console.error('Fel vid hämtning av produkter:', error));
