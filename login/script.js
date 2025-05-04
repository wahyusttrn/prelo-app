function login() {
  const username = document.getElementById('username');
  if (username.value === 'budi') {
    alert('kamu berhasil login!');
    location.href = '../index.html';
  } else {
    alert('maaf, kamu bukan budi');
  }
}