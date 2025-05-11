if (!localStorage.getItem("currentUser")) {
  alert("Kamu harus login terlebih dahulu!");
  location.href = "../login/";
}

const user = JSON.parse(localStorage.getItem('currentUser'));
document.getElementById('full-name').innerText = user.namaLengkap;
document.getElementById('email').innerText = user.email;
document.getElementById('username').innerText = user.username;

function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("cart");
  localStorage.removeItem("products");
  alert("Kamu berhasil logout!");
  window.location.href = "../login/"; 
}