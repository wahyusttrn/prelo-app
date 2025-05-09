import PRODUCTS from "../db/PRODUCTS.js";

const URL = window.location.href;
const URL_id = URL.split("#")[1];
const product = PRODUCTS[URL_id-1];
const formattedAmount = (product.price).toLocaleString('id-ID', { 
  style: 'currency', 
  currency: 'IDR' 
});

function addToCart() {
  if (!localStorage.getItem('username')) {
    alert('Anda belum login!');
    location.href = '/login';
    return;
  }
  alert(`Selamat! ${product.name} sudah masuk ke keranjang kamu!`);
}
window.addToCart = addToCart;

document.getElementById('product-title').innerText = `Detail - ${product.name}`;

document.getElementById('breadcrumb-title').innerText = product.name;

document.getElementById('product-img').innerHTML = `
  <img src="${product.imgURL}" alt="${product.name}" class="img-fluid rounded shadow-sm" />
`;

document.getElementById('product-info').innerHTML = `
  <h2 class="fw-bold">${product.name}</h2>
  <p class="text-muted mb-1">Kategori: <span class="badge bg-secondary">${product.category}</span></p>
  <p class="text-muted mb-3">Diterbitkan oleh: <strong>${product.publisher}</strong></p>

  <h4 class="text-primary mb-3">${formattedAmount}</h4>
  <p class="mb-2">Stok tersedia: <strong>${product.stock}</strong></p>
  <p class="mb-4">Total terjual: <strong>${product.sellings}</strong></p>

  <button class="btn btn-primary btn-lg" onclick="addToCart()">Add to Cart</button>
`;

let review = '';
for (let i = 0; i < product.reviews.length; i++) {
  const reviewer = product.reviews[i];
  review += `
    <div class="mb-4">
      <div class="d-flex justify-content-between">
        <div>
          <h6 class="mb-0">${reviewer.namaLengkap} <small class="text-muted">• ${reviewer.role}</small></h6>
        </div>
        <small class="text-muted">${reviewer.date}</small>
      </div>
      <p class="mt-2">${reviewer.message}</p>
      <hr />
    </div>
  `
}
document.getElementById('product-review').innerHTML = review;

document.addEventListener("DOMContentLoaded", () => {
  const fullName = localStorage.getItem("namaLengkap");
  const productReviewsKey = `reviews_${product.id}`;
  const savedReviews = JSON.parse(localStorage.getItem(productReviewsKey)) || product.reviews;

  const reviewContainer = document.getElementById('product-review');
  reviewContainer.innerHTML = "";

  savedReviews.forEach(r => {
    reviewContainer.innerHTML += generateReviewHTML(r);
  });

  document.getElementById("reviewForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!localStorage.getItem('username')) {
      alert('Anda belum login!');
      location.href = '/login';
      return;
    }
    const role = document.getElementById("role").value;
    const message = document.getElementById("message").value;
    const today = new Date().toLocaleDateString("id-ID");

    const newReview = {
      id: Date.now(),
      namaLengkap: fullName,
      role: role,
      date: today,
      message: message
    };

    savedReviews.push(newReview);
    localStorage.setItem(productReviewsKey, savedReviews);

    reviewContainer.innerHTML += generateReviewHTML(newReview);
    this.reset();
  });

  function generateReviewHTML(r) {
    const isMyReview = r.namaLengkap === fullName;
    return `
      <div class="mb-4" id="review-${r.id}">
        <div class="d-flex justify-content-between">
          <div>
            <h6 class="mb-0">${r.namaLengkap} <small class="text-muted">• ${r.role}</small></h6>
          </div>
          <div class="d-flex gap-2">
            <small class="text-muted">${r.date}</small>
            ${isMyReview ? `<button class="btn btn-sm btn-danger" onclick="deleteReview(${r.id})">Hapus</button>` : ''}
          </div>
        </div>
        <p class="mt-2">${r.message}</p>
        <hr />
      </div>
    `;
  }

  window.deleteReview = function(id) {
    const index = savedReviews.findIndex(r => r.id === id);
    if (index !== -1) {
      savedReviews.splice(index, 1);
      localStorage.setItem(productReviewsKey, JSON.stringify(savedReviews));
      const element = document.getElementById(`review-${id}`);
      if (element) element.remove();
    }
  };
});