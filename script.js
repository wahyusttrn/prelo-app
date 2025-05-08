import PRODUCTS from "./db/PRODUCTS.js";

//add to cart function
function addToCart(id) {
  alert(`Selamat! ${PRODUCTS[id-1].name} sudah masuk ke keranjang kamu!`);
  PRODUCTS[id-1].stock -= 1;
}

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
      <div class="col">
        <a href="#" class="text-decoration-none text-dark">
          <div class="card h-100 shadow-sm">
            <div style="width: 100%; height: 12rem"><img src="${product.imgURL}" class="card-img-top" alt="${product.name}" style="object-fit: cover; width: 100%; height: 100%;"></div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text text-muted">Sold: ${product.sellings} Stock: ${product.stock}</p>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="fw-bold text-primary">${formattedAmount}</span>
                <button class="btn btn-sm btn-outline-primary" onclick="addToCart(${product.id})">Add to Cart</button>
              </div>
            </div>
          </div>
        </a>
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
        <div class="col">
          <a href="#" class="text-decoration-none text-dark">
            <div class="card h-100 shadow-sm">
              <div style="width: 100%; height: 12rem"><img src="${product.imgURL}" class="card-img-top" alt="${product.name}" style="object-fit: cover; width: 100%; height: 100%;"></div>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text text-muted">Sold: ${product.sellings} Stock: ${product.stock}</p>
                <div class="mt-auto d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-primary">${formattedAmount}</span>
                  <button class="btn btn-sm btn-outline-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
              </div>
            </div>
          </a>
        </div>
      ` 
    } else if (category === 'All') {
      result += `
        <div class="col">
          <a href="#" class="text-decoration-none text-dark">
            <div class="card h-100 shadow-sm">
              <div style="width: 100%; height: 12rem"><img src="${product.imgURL}" class="card-img-top" alt="${product.name}" style="object-fit: cover; width: 100%; height: 100%;"></div>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text text-muted">Sold: ${product.sellings} Stock: ${product.stock}</p>
                <div class="mt-auto d-flex justify-content-between align-items-center">
                  <span class="fw-bold text-primary">${formattedAmount}</span>
                  <button class="btn btn-sm btn-outline-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
              </div>
            </div>
          </a>
        </div>
      ` 
    }
  }
  document.getElementById('category').innerHTML = result;
}
categoryRender('All');


window.addToCart = addToCart;
window.categoryRender = categoryRender;