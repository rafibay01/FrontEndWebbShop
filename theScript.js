fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    const titleElements = document.querySelectorAll('.product-title'); // Hämta alla h4 med klassen "product-title"

    titleElements.forEach((titleElement, index) => {
      if (data[index]) {
        titleElement.textContent = data[index].title; // Uppdatera titeln med produktens titel
      }
    });

    data.forEach((product, index) => {
      const imgElement = document.getElementById(`product${index + 1}`);
      if (imgElement) {
        imgElement.src = product.image; // Uppdatera bildens src-attribut
      }
    });
  });
fetch('https://fakestoreapi.com/products')
    .then(data => console.log(data));


