import USERS from "../../db/USERS.js";
const user = JSON.parse(localStorage.getItem("currentUser"));

document.getElementById('editProfileForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const password = user.password;
  const inputEmail = document.getElementById('email').value;
  const inputUsername = document.getElementById('username').value;
  const inputPassword = document.getElementById('password').value;

  if (inputPassword !== password) {
    alert('Password kamu salah!');
    return;
  }
  for (let i = 0; i < USERS.length; i++) {
    if (USERS[i].username === inputUsername || USERS[i].email === inputEmail) {
      alert('Username atau email sudah terpakai');
      return;
    }
  }

  user.email = inputEmail;
  user.username = inputUsername;
  localStorage.setItem('currentUser', JSON.stringify(user));
  alert('Profile berhasil diupdate!');
  location.href = '../';
});