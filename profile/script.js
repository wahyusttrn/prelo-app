const URL = window.location.href;
const URL_id = URL.split("#")[1];
if (URL_id === 'cart') {
  loadCart();
}

function checkLoginStatus() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("Kamu harus login terlebih dahulu!");
    window.location.href = "../login/";
    return;
  }

  document.getElementById("mainTitle").textContent = `Welcome, ${user.namaLengkap}`;
  document.getElementById("content").innerHTML = `
    <p>Email kamu: ${user.email}</p>
    <button onclick="logout()">Logout</button>
  `;
}

function loadUserProfile() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("Silakan login terlebih dahulu.");
    location.href = "../login/";
    return;
  }

  document.getElementById("content").innerHTML = `
    <h2>Profil Pengguna</h2>
    <br>
    <p><strong>Username:</strong> ${user.username}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Nama Lengkap:</strong> ${user.namaLengkap}</p>
    <p id="edit-error" style="color:red;"></p><br>
    <button onclick="logout()">Logout</button><br>
    `;
}


window.addEventListener("DOMContentLoaded", loadUserProfile);


// menghapus data login dari localStorage
function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("loginStatus");
  localStorage.removeItem("username");
  localStorage.removeItem("namaLengkap");
  alert("Kamu berhasil logout!");
  window.location.href = "../login/"; 
}

function loadContent(page) {
  switch (page) {
    case 'profile':
      loadEditProfile();
      break;
    case 'products':
      loadMyProducts();
      break;
    case 'cart':
      loadCart();
      break;
    default:
      console.log("Halaman tidak ditemukan");
  }
}

// Edit Profile
function loadEditProfile() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("Kamu harus login terlebih dahulu!");
    window.location.href = "/login/"; 
    return;
  }

  document.getElementById("content").innerHTML = `
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
    </form>
  `;

  //form edit profile
  document.getElementById("editProfileForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const oldPass = document.getElementById("oldPassword").value;
    const newPass = document.getElementById("newPassword").value;

    if (oldPass !== user.password) {
      alert("Password lama salah!");
      return;
    }

    // validasi password baru
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPass)) {
      alert("Password harus mengandung minimal 8 karakter, huruf besar, huruf kecil, angka, dan simbol.");
      return;
    }

    user.password = newPass;
    user.username = document.getElementById("username").value;
    user.email = document.getElementById("email").value;

    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Profil berhasil diperbarui!");
    window.location.href = "/profile"; 
  });
}

// My Products
function loadMyProducts() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("Kamu harus login terlebih dahulu!");
    window.location.href = "../login/"; 
  }

  const allProducts = JSON.parse(localStorage.getItem("products")) || [];
  const userProducts = allProducts.filter((p) => p.owner === user.email);

  let html = `
    <h2>My Products</h2>
    <form id="productForm">
      <input type="hidden" id="productIndex" />
      <label>Nama Produk</label>
      <input type="text" id="productName" required />
      <label>Harga</label>
      <input type="number" id="productPrice" required />
      <label>Gambar URL</label>
      <input type="text" id="productImage" required />
      <label>Stok</label>
      <input type="number" id="productStock" required />
      <label>Kategori</label>
      <input type="text" id="productCategory" required />
      <button type="submit">Simpan</button>
    </form>
    <div class="product-list">
  `;

  userProducts.forEach((p, i) => {
    html += `
      <div class="product-card">
        <img src="${p.image}" alt="product image" />
        <h4>${p.name}</h4>
        <p>Rp${p.price}</p>
        <p>Stok: ${p.stock}</p>
        <p>Kategori: ${p.category}</p>
        <button class="edit-btn" data-index="${i}">Edit</button>
        <button class="delete-btn" data-index="${i}">Hapus</button>
      </div>
    `;
  });

  html += "</div>";
  document.getElementById("content").innerHTML = html;
  document.getElementById("productForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productImage = document.getElementById("productImage").value;
    const productStock = document.getElementById("productStock").value;
    const productCategory = document.getElementById("productCategory").value;

    const index = document.getElementById("productIndex").value;
    const product = {
      name: productName,
      price: +productPrice,
      image: productImage,
      stock: +productStock,
      category: productCategory,
      owner: user.email,
    };

    if (index !== '') {
      allProducts[parseInt(index)] = product;
    } else {
      allProducts.push(product);
    }
    localStorage.setItem("products", JSON.stringify(allProducts));
    alert("Produk berhasil disimpan!");
    loadMyProducts();
  });
  function editProduct(index) {
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const product = allProducts[index];
    const user = JSON.parse(localStorage.getItem("currentUser"));
  
    if (product.owner !== user.email) {
      alert("Kamu tidak memiliki akses untuk mengedit produk ini.");
      return;
    }
    document.getElementById("productIndex").value = index;
    document.getElementById("productName").value = product.name;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productImage").value = product.image;
    document.getElementById("productStock").value = product.stock;
    document.getElementById("productCategory").value = product.category;
  }
  
  // tombol Edit dan Hapus produk
  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const index = button.getAttribute("data-index");
      editProduct(index);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const index = button.getAttribute("data-index");
      deleteProduct(index);
    });
  });
}

// menghapus produk
function deleteProduct(index) {
  const allProducts = JSON.parse(localStorage.getItem("products")) || [];
  allProducts.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(allProducts));
  alert("Produk berhasil dihapus!");
  loadMyProducts(); 
}

// Cart
function loadCart() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    alert("Kamu harus login terlebih dahulu!");
    window.location.href = "../login/"; 
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const userCart = cart[user.email] || [];

  let total = 0;
  let html = `<h2>Cart</h2>`;

  if (userCart.length === 0) {
    html += `<p>Cart kosong</p>`;
  } else {
    html += `<ul>`;
    for (let i in userCart) {
      const item = userCart[i];
      html += `
        <li>
          ${item.name} - ${item.qty} x Rp${item.price}
          <button class="remove-btn" data-index="${i}">Hapus</button>
        </li>
      `;
      total += item.price * item.qty;
    }
    html += `</ul><p><strong>Total: Rp${total}</strong></p>`;
  }

  document.getElementById("content").innerHTML = html;

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const index = button.getAttribute("data-index");
      removeFromCart(index);
    });
  });
}

// menghapus item dari cart
function removeFromCart(index) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const userCart = cart[user.email] || [];

  userCart.splice(index, 1);
  cart[user.email] = userCart;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart(); 
}
checkLoginStatus();


checkLoginStatus();
