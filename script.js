import PRODUCTS from "./db/PRODUCTS.js";

//add to cart function
function addToCart(id) {
  alert(`Selamat! ${PRODUCTS[id-1].name} sudah masuk ke keranjang kamu!`);
  PRODUCTS[id-1].stock -= 1;
}
window.addToCart = addToCart;

function sellingSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j].sellings < arr[j+1].sellings) {
        let temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
  return arr;
}

//render best selling
function renderBestSellings() {
  let result = '';
  for (let i = 0; i < 4; i++) {
    const product = sellingSort(PRODUCTS)[i];
    const formattedAmount = (product.price).toLocaleString('id-ID', { 
      style: 'currency', 
      currency: 'IDR' 
    });
    result += `
      <div class="container-sm">
        <div class="card" style="width: 18rem;">
          <div style="width: 100%; height: 12rem">
            <img src="${product.imgURL}" style="object-fit: cover; width: 100%; height: 100%;" class="card-img-top" alt="${product.name}">
          </div>
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${formattedAmount}</p>
            <br>
            <p class="card-text">Sold: ${product.sellings} Stock: ${product.stock}</p>
            <button onclick="addToCart(${product.id})" class="btn btn-primary">Add to Cart</button>
            <a href="#" class="btn btn-primary">View</a>
          </div>
        </div>
      </div>
    `
  }
  document.getElementById('best-selling').innerHTML = result;
}
renderBestSellings();

let result = '';
function categoryRender(category) {
  result = '';
  for (let i = 0; i < PRODUCTS.length; i++) {
    const product = PRODUCTS[i];
    const formattedAmount = (product.price).toLocaleString('id-ID', { 
      style: 'currency', 
      currency: 'IDR' 
    });
    if (product.category === category) {
      result += `
        <div class="container-sm">
          <div class="card" style="width: 18rem;">
            <div style="width: 100%; height: 12rem">
              <img src="${product.imgURL}" style="object-fit: cover; width: 100%; height: 100%;" class="card-img-top" alt="${product.name}">
            </div>
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${formattedAmount}</p>
              <br>
              <p class="card-text">Sold: ${product.sellings} Stock: ${product.stock}</p>
              <button onclick="addToCart(${product.id})" class="btn btn-primary">Add to Cart</button>
              <a href="#" class="btn btn-primary">View</a>
            </div>
          </div>
        </div>
      ` 
    }
  }
  document.getElementById('category').innerHTML = result;
}
categoryRender('Furniture');
window.categoryRender = categoryRender;

//all catalogue render
function renderAllCatalogue() {
  let result = '';
  for (let i = 0; i < PRODUCTS.length; i++) {
    const product = PRODUCTS[i];
    const formattedAmount = (product.price).toLocaleString('id-ID', { 
      style: 'currency', 
      currency: 'IDR' 
    });
    result += `
      <div class="container-sm">
        <div class="card" style="width: 18rem;">
          <div style="width: 100%; height: 12rem">
            <img src="${product.imgURL}" style="object-fit: cover; width: 100%; height: 100%;" class="card-img-top" alt="${product.name}">
          </div>
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${formattedAmount}</p>
            <br>
            <p class="card-text">Sold: ${product.sellings} Stock: ${product.stock}</p>
            <button onclick="addToCart(${product.id})" class="btn btn-primary">Add to Cart</button>
            <a href="#" class="btn btn-primary">View</a>
          </div>
        </div>
      </div>
    `
  }
  document.getElementById('all-catalogue').innerHTML = result;
}
renderAllCatalogue();