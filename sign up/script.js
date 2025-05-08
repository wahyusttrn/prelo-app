const signUpForm = document.getElementById('signUpForm');
signUpForm.addEventListener('submit', signUp)

function signUp(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const namaLengkap = document.getElementById('namaLengkap').value;

  const newUser = {
    email,
    username,
    password,
    namaLengkap,
  }
  console.log("User berhasil dibuat:", newUser);
}

function goBack() {
    location.href = '../login';
}

window.signUp = signUp;
window.signUp  = signUp;
window.goBack  = goBack;