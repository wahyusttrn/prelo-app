function login() {
  const username = document.getElementById('username');
  if (username.value === 'budi') {
    alert('kamu berhasil login!');
    location.href = '../'; //this is how we get to parent directory
  } else {
    alert('maaf, kamu bukan budi');
  }
}