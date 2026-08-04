document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector("button");

  button.addEventListener("click", function () {
    alert("Welcome to TrendNova! Products will be added soon.");
  });
});

let cartCount = 0;

function addToCart(productName) {
  cartCount++;
  document.getElementById("cart-count").innerText = cartCount;
  alert(productName + " added to cart!");
}

let cart = [];

function addToCart(productName) {
  cart.push(productName);

  document.getElementById("cart-count").innerText = cart.length;

  alert(productName + " added to cart!");
}

function showCart() {
  let cartBox = document.getElementById("cart-items");

  if (cart.length === 0) {
    cartBox.innerHTML = "<h3>Your Cart is Empty!</h3>";
    return;
  }

  let html = "<h2>🛒 Your Cart</h2><ul>";

  cart.forEach(function(item) {
    html += "<li>" + item + "</li>";
  });

  html += "</ul>";

  cartBox.innerHTML = html;
}
