import USERS from '../db/USERS.js';

if (localStorage.getItem('currentUser')) {
  location.href = '../';
}

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', login);

function login(e) {
  e.preventDefault();
  const usernameInput = document.getElementById('username').value;
  const passwordInput = document.getElementById('password').value;
  if (!usernameInput || !passwordInput) {
    alert('Username atau password kosong!');
    return;
  }

  for (let i = 0; i < USERS.length; i++) {
    const { username, password } = USERS[i]; 
    if (usernameInput === username && passwordInput === password) {
      localStorage.setItem("currentUser", JSON.stringify(USERS[i]));
      alert('Kamu berhasil login!');
      location.href = '../';
      break;
    }
  }
  if (!localStorage.getItem('currentUser')) {
    alert('Maaf, username atau password kamu salah!');
  }
  return;
}