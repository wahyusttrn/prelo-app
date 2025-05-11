const user = JSON.parse(localStorage.getItem("currentUser"));

document.getElementById("changePasswordForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const oldPass = document.getElementById("oldPassword").value;
  const newPass = document.getElementById("newPassword").value;

  if (oldPass !== user.password) {
    alert("Password lama salah!");
    return;
  }
  if (newPass.length < 8) {
    alert("Password harus mengandung minimal 8 karakter");
    return;
  }

  user.password = newPass;
  localStorage.setItem("currentUser", JSON.stringify(user));
  alert("Password berhasil dirubah");
  location.href = '../../';
});