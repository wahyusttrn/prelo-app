function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser")) || null;
}

function saveCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function loadContent(page) {
  if (page === "profile") loadEditProfile();
  if (page === "products") loadMyProducts();
  if (page === "cart") loadCart();
}


function checkLoginStatus() {
  const user = localStorage.getItem('username'); 

  if (!user) {
    alert('Silakan login terlebih dahulu.');
    window.location.href = '/login';
  } else {
    
    document.getElementById('profileInfo').innerHTML = `
      <h2>Welcome, ${user.username}</h2>
      <p>Email: ${user.email}</p>
      <button onclick="logout()">Logout</button>
    `;
  }
}

// Fungsi untuk logout
function logout() {
  localStorage.removeItem('currentUser'); 
  window.location.href = 'login/login.html'; 
}

// ---------------- EDIT PROFILE ----------------
function loadEditProfile() {
  const user = getCurrentUser();
  if (!user) {
    alert("Silahkan login terlebih dahulu");
    window.location.href = "login/login.html"; 
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

  document.getElementById("editProfileForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const oldPass = document.getElementById("oldPassword").value;
    const newPass = document.getElementById("newPassword").value;

    if (oldPass !== user.password) {
      alert("Password lama salah!");
      return;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPass)
    ) {
      alert("Password baru tidak valid");
      return;
    }

    const updatedUser = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: newPass,
    };

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex((u) => u.email === user.email);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
      saveCurrentUser(updatedUser);
      alert("Profil berhasil diperbarui!");
      window.location.href = "profile.html"; 
    } else {
      alert("Pengguna tidak ditemukan.");
    }
  });
}

// ---------------- MY PRODUCTS ----------------
function loadMyProducts() {
  const user = getCurrentUser();
  if (!user) {
    alert("Silakan login terlebih dahulu");
    window.location.href = "login/login.html";
    return;
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

  document
    .getElementById("productForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const productName = document.getElementById("productName").value.trim();
      const productPrice = document.getElementById("productPrice").value.trim();
      const productImage = document.getElementById("productImage").value.trim();
      const productStock = document.getElementById("productStock").value.trim();
      const productCategory = document.getElementById("productCategory").value.trim();

      if (!productName || !productPrice || !productImage || !productStock || !productCategory) {
        alert("Semua kolom harus diisi!");
        return;
      }

      const index = document.getElementById("productIndex").value;

      // Cek duplikasi produk
      const existingProduct = allProducts.find((p) => p.name === productName && p.owner === user.email);
      if (existingProduct && index === "") {
        alert("Produk dengan nama ini sudah ada.");
        return;
      }

      const product = {
        name: productName,
        price: +productPrice,
        image: productImage,
        stock: +productStock,
        category: productCategory,
        owner: user.email,
      };

      if (index) {
        allProducts[index] = product; 
      } else {
        allProducts.push(product); 
      }

      localStorage.setItem("products", JSON.stringify(allProducts));
      loadMyProducts(); 
    });

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

function deleteProduct(index) {
  const allProducts = JSON.parse(localStorage.getItem("products")) || [];
  allProducts.splice(index, 1); // Hapus produk
  localStorage.setItem("products", JSON.stringify(allProducts));
  loadMyProducts(); 
}

// ---------------- CART ----------------
function loadCart() {
  const user = getCurrentUser();
  if (!user) {
    alert("Silakan login terlebih dahulu");
    window.location.href = "login/login.html"; 
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const productList = JSON.parse(localStorage.getItem("products")) || [];
  const userCart = cart[user.email] || [];

  let total = 0;
  let html = `<h2>Cart</h2>`;

  if (userCart.length === 0) {
    html += `<p>Cart kosong</p>`;
  } else {
    html += `<ul>`;
    for (let i in userCart) {
      const item = userCart[i];
      const product = productList.find((p) => p.name === item.name);
      if (product) {
        total += product.price * item.qty;
        html += `
          <li>
            ${product.name} - ${item.qty} x Rp${product.price}
            <button class="remove-btn" data-index="${i}">Hapus</button>
          </li>
        `;
      }
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

function removeFromCart(index) {
  const user = getCurrentUser();
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const userCart = cart[user.email] || [];

  userCart.splice(index, 1);
  cart[user.email] = userCart;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// ---------------- LOGOUT ----------------
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login/login.html"; 
}