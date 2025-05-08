import USERS from '../db/USERS.js';

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', login);

function login(loggedIn) {
  loggedIn.preventDefault();
  const usernameInput = document.getElementById('username').value;
  const passwordInput = document.getElementById('password').value;
  let nameUser = "";
  for (let i = 0; i < USERS.length; i++) {
    const { username, password, namaLengkap } = USERS[i];
    if (usernameInput === username && passwordInput === password) {
      localStorage.setItem("loginStatus", JSON.stringify(true));
      localStorage.setItem("username", username);
      localStorage.setItem("namaLengkap", namaLengkap);
      nameUser = namaLengkap;
      break;
    }
  }
  if (JSON.parse(localStorage.getItem('loginStatus')) === true) {
    alert('Kamu berhasil login!');
    location.href = '../'; // Redirect ke halaman utama setelah login
  } else {
    alert('Maaf, kamu salah');
  }
}

function signUp() {
  location.href = '../sign up/index.html'   // sign up\index.html
}

function goBack() {
  location.href = '../';      //this is how we get to parent directory
}
function logout() {
  localStorage.removeItem("loginStatus");
  localStorage.removeItem("username");
  localStorage.removeItem("namaLengkap");
  location.reload();      // refresh page
}

window.signUp  = signUp;
window.goBack  = goBack;
window.logout  = logout;