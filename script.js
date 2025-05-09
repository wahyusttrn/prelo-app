import PRODUCTS from "./db/PRODUCTS.js";

//add to cart function
function addToCart(id) {
  if (!localStorage.getItem("username")) {
    location.href = '/login';
    return;
  }
  alert(`Selamat! ${PRODUCTS[id-1].name} sudah masuk ke keranjang kamu!`);
}

//render best selling
const sortedProduct = PRODUCTS.slice().sort((a, b) => b.sellings - a.sellings);
function renderBestSellings() {
  let result = '';
  for (let i = 0; i < 4; i++) {
    const formattedAmount = (sortedProduct[i].price).toLocaleString('id-ID', { 
      style: 'currency', 
      currency: 'IDR' 
    });
    result += `
      <div class="col">
        <div class="card h-100 shadow-sm">
          <a href="./product#${sortedProduct[i].id}" class="text-decoration-none text-dark">
            <div style="width: 100%; height: 12rem"><img src="${sortedProduct[i].imgURL}" class="card-img-top" alt="${sortedProduct[i].name}" style="object-fit: cover; width: 100%; height: 100%;"></div>
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${sortedProduct[i].name}</h5>
              <p class="card-text text-muted">Sold: ${sortedProduct[i].sellings} Stock: ${sortedProduct[i].stock}</p>
              <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="fw-bold text-primary">${formattedAmount}</span>
                </a>
                <button class="btn btn-sm btn-outline-primary" onclick="addToCart(${sortedProduct[i].id})">Add to Cart</button>
              </div>
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
        <div class="col">
        <div class="card h-100 shadow-sm">
        <a href="./product#${product.id}" class="text-decoration-none text-dark">
              <div style="width: 100%; height: 12rem"><img src="${product.imgURL}" class="card-img-top" alt="${product.name}" style="object-fit: cover; width: 100%; height: 100%;"></div>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text text-muted">Sold: ${product.sellings} Stock: ${product.stock}</p>
                <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="fw-bold text-primary">${formattedAmount}</span>
                </a>
                  <button class="btn btn-sm btn-outline-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
              </div>
            </div>
        </div>
      ` 
    } else if (category === 'All') {
      result += `
        <div class="col">
        <div class="card h-100 shadow-sm">
        <a href="./product#${product.id}" class="text-decoration-none text-dark">
              <div style="width: 100%; height: 12rem"><img src="${product.imgURL}" class="card-img-top" alt="${product.name}" style="object-fit: cover; width: 100%; height: 100%;"></div>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text text-muted">Sold: ${product.sellings} Stock: ${product.stock}</p>
                <div class="mt-auto d-flex justify-content-between align-items-center">
                <span class="fw-bold text-primary">${formattedAmount}</span>
                </a>
                  <button class="btn btn-sm btn-outline-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
              </div>
            </div>
        </div>
      ` 
    }
  }
  document.getElementById('category').innerHTML = result;
}
categoryRender('All');


window.addToCart = addToCart;
window.categoryRender = categoryRender;