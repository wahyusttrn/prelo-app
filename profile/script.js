import { loadEditProfile } from "./edit/index.js";
import { loadMyProducts } from "./my-product/index.js";
import { loadCart } from "./cart/index.js";


window.addEventListener('DOMContentLoaded', () => {
  loadContent('profile');
});

export function loadContent(page) {
  if (page === 'profile') loadEditProfile();
  if (page === 'products') loadMyProducts();
  if (page === 'cart') loadCart();
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser')) || null;
}

export function saveCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}
