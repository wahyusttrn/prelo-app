function loadContent(page) {
    let content = document.getElementById("content")
    content.innerHTML = ""

    if (page === "profile") {
        content.innerHTML = `
        <h2>Edit Profile</h2>
            <form id="editProfile">
            <label>Username</label>
            <input type="text" id="username" required>
            
            <label>Email</label>
            <input type="email" id="email" required>
            
            <label>Password Lama</label>
            <input type="text" id="OldPassword" required>
            
            <label>Password Baru</label>
            <input type="password" id="newPassword" required>
            
            <button type="submit">Simpan Perubahan</button>
            </form>`
    } else if (page === "products") {
        content.innerHTML = `
        <h2>My Products</h2>
        <p>This is the My Products page</p>`
    } else if (page === "cart") {
        content.innerHTML = `
        <h2>My Cart</h2>
        <p>This is the Cart page</p>`
    }
}