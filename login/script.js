let databases = [
  {
  id: "Amar", //id seharusnya bertipe Number dimulai dari 1 dan ter-generate otomatis
  username: "Amaroar",
  password: "Kucing123",
  fullName: "Amar Khishir",
  Email: "Amar@Hacktiv8.ac",
  }
]

function login(loggedIn) {
  loggedIn.preventDefault();
  const usernameInput = document.getElementById('username').value;
  const passwordInput = document.getElementById('password').value;

  // mencocokan data apakah user meng-input data sama dengan data didalam databases
  let telahLogin  = false
  let nameUser    = ""
  for (let i = 0; i < databases.length; i++) {
    const usernameData  = databases[i].username     // Amaroar
    const passwordData  = databases[i].password     // Kucing123
    const fullNameData  = databases[i].fullName     // Amar Khishir
    if ((usernameInput === usernameData) && (passwordInput === passwordData)) {
      telahLogin  = true
      nameUser = fullNameData     // nama yang akan muncul nama panjang
      localStorage.setItem("loginStatus","Online"); // value loginStatus sebaiknya gunakan boolean saja
      localStorage.setItem("username", usernameData);
      localStorage.setItem("fullName", fullNameData)
      break;
    }
  }
  
  // alert jika berhasil login atau tidak berhasil
  if (telahLogin) { // disini validasi nya sebaiknya gunakan loginStatus di localStorage supaya lebih universal, sehingga variabel telah login tidak diperlukan. nanti set di localStorage untuk nilai default dari loginStatus assign false.
    alert('kamu berhasil login!');
    greeting(nameUser)      // jika berhasil login, maka akan merubah teks
    // location.href = '../'
  } else {
    alert('maaf, kamu salah');
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
    greeting.textContent = `Selamat datang, ${nameUser}!`;
  }
}

function goBack() {
  location.href = '../';      //this is how we get to parent directory
}