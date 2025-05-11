import PRODUCTS from "./db/PRODUCTS.js";
const allProducts = JSON.parse(localStorage.getItem("ALLPRODUCTS")) || PRODUCTS;

//add to cart
function addToCart(id) {
  if (!localStorage.getItem("currentUser")) {
    alert('Kamu harus login terlebih dahulu!');
    location.href = './login';
    return;
  }

  allProducts[id-1].stock -= 1;
  localStorage.setItem('ALLPRODUCTS', JSON.stringify(allProducts));
  renderBestSellings();
  categoryRender('All');

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(allProducts[id-1]);
  localStorage.setItem('cart', JSON.stringify(cart));

  const cartCount = JSON.parse(localStorage.getItem("cart")).length || '';
  document.getElementById('cart-count').innerText = cartCount;
}


const sortedProduct = allProducts.slice().sort((a, b) => b.sellings - a.sellings);
function renderBestSellings() {
  let result = '';
  for (let i = 0; i < 4; i++) {
    const formattedAmount = (Number(sortedProduct[i].price)).toLocaleString('id-ID', { 
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
              <p class="card-text text-muted">Sold: ${sortedProduct[i].sellings} • Stock: ${sortedProduct[i].stock}</p>
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
  for (let i = 0; i < allProducts.length; i++) {
    const product = allProducts[i];
    const formattedAmount = (Number(product.price)).toLocaleString('id-ID', { 
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
                <p class="card-text text-muted">Sold: ${product.sellings} • Stock: ${product.stock}</p>
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
                <p class="card-text text-muted">Sold: ${product.sellings} • Stock: ${product.stock}</p>
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