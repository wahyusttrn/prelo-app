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

  let nameUser = "";

  for (let i = 0; i < databases.length; i++) {
    const { username, password, fullName } = databases[i];
    if (usernameInput === username && passwordInput === password) {
      localStorage.setItem("loginStatus", true);
      localStorage.setItem("username", username);
      localStorage.setItem("fullName", fullName);
      nameUser = fullName;
      break;
    }
  }

  if (nameUser) {
    alert('Kamu berhasil login!');
    greeting(nameUser);
    location.href = '../home'; // Redirect ke halaman utama setelah login
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
    greeting.textContent = `Selamat datang, ${nameUser}!`;
  }
}

function goBack() {
  location.href = '../';      //this is how we get to parent directory
}