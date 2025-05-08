import { getCurrentUser, saveCurrentUser } from "../script.js";

export function loadEditProfile() {
  const user = getCurrentUser();
  if (!user) {
    alert("Silahkan login terlebih dahulu");
    window.location.href = '../login/index.html'; 
    return;
  }

  document.getElementById('content').innerHTML = `
    <h2>Edit Profile</h2>
    <form id="editProfileForm">
      <label>Username</label>
      <input type="text" id="username" value="${user.username}" required />
      
      <label>Email</label>
      <input type="email" id="email" value="${user.email}" required />
      
      <label>Password Lama</label>
      <input type="password" id="oldPassword" required />
      
      <label>Password Baru</label>
      <input type="password" id="newPassword" required />
      
      <button type="submit">Update</button>
    </form>`;

  document.getElementById('editProfileForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const oldPass = document.getElementById('oldPassword').value;
    const newPass = document.getElementById('newPassword').value;

    if (oldPass !== user.password) {
      alert('Password lama salah!');
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPass)) {
      alert('Password baru tidak valid');
      return;
    }

    const updatedUser = {
      username: document.getElementById('username').value,
      email: document.getElementById('email').value,
      password: newPass,
    };

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
      saveCurrentUser(updatedUser);
      alert('Profil berhasil diperbarui!');
      window.location.href = 'profile.html'; 
    } else {
      alert('Pengguna tidak ditemukan.');
    }
  });
}
