let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
  const greeting = document.getElementById("welcome");
  greeting.innerText = `Mau belanja apa hari ini, ${currentUser.namaLengkap}?`;
  document.getElementById('login-btn').style.display = 'none';
} else {
  document.getElementById('profile').style.display = 'none';
  document.getElementById('cart').style.display = 'none';
}