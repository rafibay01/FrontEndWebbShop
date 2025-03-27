fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    // Iterera över produkterna och uppdatera bilderna
    data.forEach((product, index) => {
      const imgElement = document.getElementById(`product${index + 1}`);
      if (imgElement) {
        imgElement.src = product.image; // Uppdatera bildens src-attribut
      }
    });
  });




  function render(imageSrc){
const img = `
<img src"${imageSrc}" alt="image class img-fluid">
`;

document.getElementById('firstProduct').innerHTML = img;
  }