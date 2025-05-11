const cart = JSON.parse(localStorage.getItem("cart")) || [];
const items = document.getElementById('items');
const totalAndCheckout = document.getElementById('total-and-checkout');
const totalView = document.getElementById('totalCount');
let result = '';
let total = 0;

/*
-------------------soon update
<div class="d-flex align-items-center gap-2">
  <button class="btn btn-sm btn-outline-secondary">-</button>
  <span>1</span>
  <button class="btn btn-sm btn-outline-secondary">+</button>
</div>
*/
function loadCart() {
  if (cart.length < 1) {
    items.innerHTML = '<h1>Keranjang masih kosong! ayo belanja!</h1>';
    totalAndCheckout.style.display = 'none';
    return;
  }
  
  result = '';
  for (let i = 0; i < cart.length; i++) {
    const item = cart[i];
    result += `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h6 class="mb-1">${item.name}</h6>
        </div>
        <div class="text-end">
          <div class="text-primary fw-bold">Rp ${item.price}</div>
          <button class="btn btn-sm btn-outline-danger mt-2" onclick="removeFromCart(${i})">Hapus</button>
        </div>
      </div>
    `;
    total += item.price;
  }
  items.innerHTML = result;
  totalView.innerText = `Rp ${total}`;
}
loadCart();

function removeFromCart(id) {
  cart.splice(id, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  totalView.innerText = `Rp ${total}`;
}
window.removeFromCart = removeFromCart;