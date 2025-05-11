import USERS from '../db/USERS.js';

if (localStorage.getItem('currentUser')) {
  location.href = '../';
}

const signUpForm = document.getElementById('signUpForm');
signUpForm.addEventListener('submit', signUp);

function signUp(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const namaLengkap = document.getElementById('namaLengkap').value;
  
  if (password.length < 8) {
    alert('Password minimal 8 karakter!');
    return;
  }

  for (let i = 0; i < USERS.length; i++) {
    if (USERS[i].email === email) {
      alert("Email sudah digunakan");
      return;
    }
    if (USERS[i].username === username) {
      alert("Username sudah digunakan");
      return;
    }
  }

  let id = USERS.length + 1;
  const newUser = {
    id: id,
    email: email,
    username: username,
    password: password,
    namaLengkap: namaLengkap,
  }
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  alert('Selamat datang di Prelo!');
  location.href = '../';
}