import { getCurrentUser } from "../script.js";

export function loadMyProducts() {
  const user = getCurrentUser();
  if (!user) {
    alert("Silahkan login terlebih dahulu");
    window.location.href = '../login/index.html'; 
    return;
  }

  const allProducts = JSON.parse(localStorage.getItem('products')) || [];
  const userProducts = allProducts.filter(p => p.owner === user.email);

  let html = `
    <h2>My Products</h2>
    <form id="productForm">
      <input type="hidden" id="productIndex" />
      <label>Nama Produk</label>
      <input type="text" id="productName" required />
      <label>Harga</label>
      <input type="number" id="productPrice" required />
      <label>Gambar URL</label>
      <input type="text" id="productImage" required />
      <label>Stok</label>
      <input type="number" id="productStock" required />
      <label>Kategori</label>
      <input type="text" id="productCategory" required />
      <button type="submit">Simpan</button>
    </form>
    <div class="product-list">`;

  userProducts.forEach((p, i) => {
    html += `
      <div class="product-card">
        <img src="${p.image}" />
        <h4>${p.name}</h4>
        <p>Rp${p.price}</p>
        <p>Stok: ${p.stock}</p>
        <p>Kategori: ${p.category}</p>
        <button class="edit-btn" data-index="${i}">Edit</button>
      </div>`;
  });

  html += `</div>`;
  document.getElementById('content').innerHTML = html;

  document.getElementById('productForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const index = document.getElementById('productIndex').value;
    const product = {
      name: document.getElementById('productName').value,
      price: +document.getElementById('productPrice').value,
      image: document.getElementById('productImage').value,
      stock: +document.getElementById('productStock').value,
      category: document.getElementById('productCategory').value,
      owner: user.email,
    };

    const allProducts = JSON.parse(localStorage.getItem('products')) || [];
    if (index) {
      allProducts[index] = product;
    } else {
      allProducts.push(product);
    }

    localStorage.setItem('products', JSON.stringify(allProducts));
    loadMyProducts();
  });

  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function() {
      const index = button.getAttribute('data-index');
      editProduct(index); 
    });
  });
}
