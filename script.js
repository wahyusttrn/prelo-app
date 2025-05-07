import PRODUCTS from "./db/PRODUCTS.js";

//add to cart function
function addToCart(id) {
  alert(`Selamat! ${PRODUCTS[id-1].name} sudah masuk ke keranjang kamu!`);
}
window.addToCart = addToCart;

//render best selling
function renderBestSellings() { //NEED TO REMOVE PRODUCT AFTER ADDED TO ARRAY
  let result = '';
  const bestArr = [];

  //set default obj inside array
  for (let i = 0; i < 4; i++) {
    bestArr.push({
      id: 0,
      sellings: -Infinity,
    })
  }

  for (let i = 0; i < PRODUCTS.length; i++) {
    const product = PRODUCTS[i];
    for (let j = 0; j < bestArr.length; j++) {
      const best = bestArr[j];
      if (best.sellings < product.sellings) {
        bestArr[j] = { id: product.id, sellings: product.sellings }
      }
    }
  }

  for (let i = 0; i < bestArr.length; i++) {
    const product = PRODUCTS[bestArr[i].id-1];
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

function categoryRender(category) {
  alert(`category: ${category}`);
}
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