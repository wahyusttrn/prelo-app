import USERS from '../db/USERS.js';

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', login);

function login(loggedIn) {
  loggedIn.preventDefault();
  const usernameInput = document.getElementById('username').value;
  const passwordInput = document.getElementById('password').value;

  // validasi input, apakah data sudah ada di local storage
  let storedUsers = JSON.parse(localStorage.getItem('USERS'));
  if (!storedUsers) {
    storedUsers = USERS;
  }

  // mencari user yang sesuai dengan input
  let onlineUser = false;
  for (let i = 0; i < storedUsers.length; i++) {  // loop local storage
    const { username, password, namaLengkap } = storedUsers[i]; 
    if (usernameInput === username && passwordInput === password) {   // jika username dan password sesuai
      onlineUser = true;  // maka onlineUser menjadi true  
      localStorage.setItem("loginStatus", JSON.stringify(true));      // set login status dengan true, karena bolean maka dirubah menjadi string
      localStorage.setItem("username", username); 
      localStorage.setItem("namaLengkap", namaLengkap); 
      localStorage.setItem("currentUser", JSON.stringify(storedUsers[i]));
      break;
    }
  }

  // alert apakah login berhasil atau tidak
  if (onlineUser) {   // true
    alert('Kamu berhasil login!');
    location.href = '../'; // Redirect ke halaman utama setelah login
  } else {
    alert('Maaf, kamu salah');
  }
}

function signUp() {
  location.href = '../sign up/index.html'   // signup\index.html
}

function goBack() {
  location.href = '../';      //this is how we get to parent directory
}

window.signUp  = signUp;
window.goBack  = goBack;