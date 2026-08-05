document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".hero button");
  if (button) {
    button.addEventListener("click", function () {
      alert("Welcome to TrendNova!");
    });
  }
});

let cart = [];

function addToCart(productName) {
  cart.push(productName);
  document.getElementById("cart-count").innerText = cart.length;
  alert(productName + " added to cart!");
}

function showCart() {
  const cartBox = document.getElementById("cart-items");

  if (cart.length === 0) {
    cartBox.innerHTML = "<h3>🛒 Your Cart is Empty!</h3>";
    return;
  }

  let html = "<h3>🛒 Your Cart</h3><ul>";
let total = 0;

  cart.forEach(function(item, index) {
    html += "<li>" + item +
      " <button onclick='removeFromCart(" + index + ")'>❌ Remove</button></li>";
  });

  total = cart.length * 19.99;

html += "</ul>";
html += "<h3>Total: $" + total.toFixed(2) + "</h3>";
html += "<button onclick='checkout()'>💳 Checkout</button>";

  cartBox.innerHTML = html;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  document.getElementById("cart-count").innerText = cart.length;
  showCart();
}

function checkout() {
  document.getElementById("order").scrollIntoView({
    behavior: "smooth"
  });
}

function setProduct(productName, price) {
    document.getElementById("product").value = productName;
    document.getElementById("price").value = price;
    document.getElementById("order").scrollIntoView({
        behavior: "smooth"
    });
}
