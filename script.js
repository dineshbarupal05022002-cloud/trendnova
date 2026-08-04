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
