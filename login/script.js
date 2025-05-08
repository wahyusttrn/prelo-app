import USER from '../db/user.js';
const form = document.getElementById('loginForm');
form.addEventListener('submit', login);

// let USER = [
//   {
//   id: 99,
//   username: "Amaroar",
//   password: "Kucing123",
//   fullName: "Amar Khishir",
//   Email: "Amar@Hacktiv8.ac",
//   }
// ]

function login(loggedIn) {
  loggedIn.preventDefault();
  const usernameInput = document.getElementById('username').value;
  const passwordInput = document.getElementById('password').value;

  let nameUser = "";

  for (let i = 0; i < USER.length; i++) {
    const { username, password, namaLengkap } = USER[i];
    if (usernameInput === username && passwordInput === password) {
      localStorage.setItem("loginStatus", JSON.stringify(true));
      localStorage.setItem("username", username);
      localStorage.setItem("fullName", namaLengkap);
      nameUser = namaLengkap;
      break;
    }
  }

  if (JSON.parse(localStorage.getItem('loginStatus')) === true) {
    alert('Kamu berhasil login!');
    greeting(nameUser);
    location.href = '../'; // Redirect ke halaman utama setelah login
  } else {
    alert('Maaf, kamu salah');
  }
}

function logout() {
  localStorage.removeItem("loginStatus");
  localStorage.removeItem("username");
  localStorage.removeItem("fullName");
  location.reload();      // refresh page
}

function greeting(nameUser) {
  const greeting = document.getElementById("welcome");
  if (greeting) {
    greeting.innerText = `Selamat datang, ${nameUser}!`;
  }
}

function goBack() {
  location.href = '../';      //this is how we get to parent directory
}

window.login   = login;
window.logout  = logout;
window.goBack  = goBack;