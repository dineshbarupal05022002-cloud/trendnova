document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".hero button");
  if (button) {
    button.addEventListener("click", function () {
      alert("Welcome to TrendNova!");
    });
  }
});

let cart = [];

function addToCart(productName, price) {
  const existingItem = cart.find(function(item) {
    return item.name === productName;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: productName,
      price: parseFloat(price.replace("$", "")),
      quantity: 1
    });
  }

  let totalQuantity = 0;

  cart.forEach(function(item) {
    totalQuantity += item.quantity;
  });

  document.getElementById("cart-count").innerText = totalQuantity;

  alert(productName + " added to cart!");

  showCart();
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
    total += item.price;

    html += "<li>" +
      item.name +
      " - $" + item.price.toFixed(2) +
      " <button onclick='removeFromCart(" + index + ")'>❌ Remove</button>" +
      "</li>";
  });

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

function increaseQuantity(index) {
  cart[index].quantity += 1;

  document.getElementById("cart-count").innerText =
    cart.reduce(function(total, item) {
      return total + item.quantity;
    }, 0);

  showCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  document.getElementById("cart-count").innerText =
    cart.reduce(function(total, item) {
      return total + item.quantity;
    }, 0);

  showCart();
  }

function removeFromCart(index) {
  cart.splice(index, 1);
  document.getElementById("cart-count").innerText = cart.length;
  showCart();
}

function checkout() {
  alert("✅ Thank you for your order!\n\nYour order has been placed successfully.\nWe will contact you soon.");

  document.getElementById("order").scrollIntoView({
    behavior: "smooth"
  });
}

function setProduct(productName, price) {
    document.getElementById("product").value = productName;
    document.getElementById("price").value = price;

    document.getElementById("summaryProduct").innerText = productName;
    document.getElementById("summaryPrice").innerText = price;
    document.getElementById("summaryTotal").innerText = price;

    document.getElementById("order").scrollIntoView({
        behavior: "smooth"
    });
}

function searchProducts() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach(function(card) {
    let name = card.querySelector("h3").textContent.toLowerCase();

    if (name.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function filterProducts() {
  let category = document.getElementById("categoryFilter").value;
  let cards = document.querySelectorAll(".card");

  cards.forEach(function(card) {
    if (
      category === "all" ||
      card.getAttribute("data-category") === category
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

function openModal(title, price, description, image) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalPrice").innerText = price;
  document.getElementById("modalDescription").innerText = description;
  document.getElementById("modalImage").src = image;

  document.getElementById("productModal").style.display = "block";
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
    }
