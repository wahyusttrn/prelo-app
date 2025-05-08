function checkLogin() {
    let loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
    let namaLengkap = localStorage.getItem("namaLengkap");
  
    if ((loginStatus) === true) {
      // berubah menjadi selamat datang nama panjang
      const greeting = document.getElementById("welcome");
      if (greeting) {
      greeting.innerText = `Mau belanja apa hari ini, ${namaLengkap}?`;
      }
      document.getElementById('login-btn').style.display = 'none';
    } else {
      document.getElementById('profile').style.display = 'none';
      document.getElementById('cart').style.display = 'none';
    }
  }
checkLogin()

function logout() {
    localStorage.removeItem("loginStatus");
    localStorage.removeItem("username");
    localStorage.removeItem("namaLengkap");
    location.reload();      // refresh page
  }