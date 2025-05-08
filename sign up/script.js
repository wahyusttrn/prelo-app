function signUp(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const fullName = document.getElementById('namaLengkap').value;
}

function goBack() {
    location.href = '../login';
  }

window.signUp  = signUp;
window.goBack  = goBack;