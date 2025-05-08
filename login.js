function checkLogin() {
    let loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
    let namaLengkap = localStorage.getItem("namaLengkap");
  
    if ((loginStatus) === true) {
      // berubah menjadi selamat datang nama panjang
      const greeting = document.getElementById("welcome");
        if (greeting) {
        greeting.innerText = `Selamat datang, ${namaLengkap}!`;
        }
    }
  }
checkLogin()