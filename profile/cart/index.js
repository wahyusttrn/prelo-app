import { getCurrentUser } from "../script.js";

export function loadCart() {
  const user = getCurrentUser();
  if (!user) {
    alert('Silakan login terlebih dahulu');
    window.location.href = '../login/index.html'; 
    return;
  }

  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  const productList = JSON.parse(localStorage.getItem('products')) || [];
  const userCart = cart[user.email] || [];

  let total = 0;
  let html = `<h2>Cart</h2>`;

  if (userCart.length === 0) {
    html += `<p>Cart kosong</p>`;
  } else {
    html += `<ul>`;
    userCart.forEach((item, index) => {
      const product = productList.find(p => p.name === item.name);
      if (product) {
        total += product.price * item.qty;
        html += `
          <li>
            ${product.name} - ${item.qty} x Rp${product.price}
            <button class="remove-btn" data-index="${index}">Hapus</button>
          </li>
        `;
      }
    });
    html += `</ul><p><strong>Total: Rp${total}</strong></p>`;
  }

  document.getElementById('content').innerHTML = html;

  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', function() {
      const index = button.getAttribute('data-index');
      removeFromCart(index); 
    });
  });
}

function removeFromCart(index) {
  const user = getCurrentUser();
  const cart = JSON.parse(localStorage.getItem('cart')) || {};
  const userCart = cart[user.email] || [];

  userCart.splice(index, 1); 
  cart[user.email] = userCart;
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart(); 
}
