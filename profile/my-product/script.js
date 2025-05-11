import PRODUCTS from "../../db/PRODUCTS.js";
const productList = document.getElementById("my-product-list");
const allMyProducts = JSON.parse(localStorage.getItem("myProducts")) || [];

function loadMyProducts() {
  if (allMyProducts.length < 1) {
    document.getElementById("my-product-text").innerText = 'Kamu belum memiliki produk!';
    return;
  }

  let result = '';
  for (let i = 0; i < allMyProducts.length; i++) {
    const product = allMyProducts[i];
    result += `
      <div class="col">
        <div class="card h-100 shadow-sm">
          <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 200px; object-fit: cover;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text text-muted">Stok: ${product.stock} • Harga: Rp ${product.price}</p>
            <p class="card-text"><small class="text-muted">Kategori: ${product.category}</small></p>
            <div class="mt-auto d-flex gap-2">
              <button class="btn btn-sm btn-outline-secondary w-50" onclick="editProduct(${i})">Edit</button>
              <button class="btn btn-sm btn-outline-danger w-50" onclick="deleteProduct(${i})">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  productList.innerHTML = result;
}
loadMyProducts();

const user = JSON.parse(localStorage.getItem("currentUser"));
document.getElementById("uploadProductForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;
  const productImage = document.getElementById("productImage").value;
  const productStock = document.getElementById("productStock").value;
  const productCategory = document.getElementById("productCategory").value;

  const product = {
    id: PRODUCTS.length+1,
    name: productName,
    price: productPrice,
    imgURL: productImage,
    publisher: user.namaLengkap,
    stock: productStock,
    sellings: 0,
    category: productCategory,
    reviews: []
  };

  PRODUCTS.push(product);
  localStorage.setItem("ALLPRODUCTS", JSON.stringify(PRODUCTS));
  allMyProducts.push(product);
  localStorage.setItem("myProducts", JSON.stringify(allMyProducts));

  document.getElementById("productName").value = '';
  document.getElementById("productPrice").value  = '';
  document.getElementById("productImage").value  = '';
  document.getElementById("productStock").value  = '';
  document.getElementById("productCategory").value = '';
  alert("Produk berhasil disimpan!");
  loadMyProducts();
});

//Edit produk
function editProduct(id) {
  const product = allMyProducts[id];
  document.getElementById("productName").value = product.name;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productImage").value = product.image;
  document.getElementById("productStock").value = product.stock;
  document.getElementById("productCategory").value = product.category;
}
window.editProduct = editProduct;

// menghapus produk
function deleteProduct(id) {
  allMyProducts.splice(id, 1);
  localStorage.setItem("myProducts", JSON.stringify(allMyProducts));
  alert("Produk berhasil dihapus!");
  loadMyProducts(); 
}
window.deleteProduct = deleteProduct;