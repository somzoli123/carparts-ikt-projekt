let cart = JSON.parse(localStorage.getItem("cart")) || [];


function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


function addToCart(id, name, price) {

    let product = cart.find(item => item.id === id);

    if (product) {

        product.quantity++;

    } else {

        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });

    }

    saveCart();

    updateCartCount();

    alert(name + " hozzáadva a kosárhoz!");
}


function updateCartCount() {

    let count = 0;

    cart.forEach(item => {
        count += item.quantity;
    });

    let cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = count;
    }
}


function displayCart() {

    let cartItems = document.getElementById("cart-items");

    if (!cartItems) {
        return;
    }

    cartItems.innerHTML = "";

    let total = 0;


    if (cart.length === 0) {

        cartItems.innerHTML = "<p>A kosár üres.</p>";

    }


    cart.forEach(item => {

        let itemTotal = item.price * item.quantity;

        total += itemTotal;


        let product = document.createElement("div");

        product.classList.add("cart-product");

        product.innerHTML = `
            <h2>${item.name}</h2>

            <p>${item.price.toLocaleString("hu-HU")} Ft / db</p>

            <button onclick="changeQuantity(${item.id}, -1)">
                −
            </button>

            <span>
                ${item.quantity}
            </span>

            <button onclick="changeQuantity(${item.id}, 1)">
                +
            </button>

            <p>
                Termék összesen:
                ${itemTotal.toLocaleString("hu-HU")} Ft
            </p>

            <button onclick="removeFromCart(${item.id})">
                🗑️ Törlés
            </button>
        `;

        cartItems.appendChild(product);

    });


    document.getElementById("total").textContent =
        total.toLocaleString("hu-HU") + " Ft";
}


function changeQuantity(id, amount) {

    let product = cart.find(item => item.id === id);

    if (!product) {
        return;
    }

    product.quantity += amount;


    if (product.quantity <= 0) {

        cart = cart.filter(item => item.id !== id);

    }


    saveCart();

    updateCartCount();

    displayCart();
}


function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();

    updateCartCount();

    displayCart();
}


updateCartCount();

displayCart();
