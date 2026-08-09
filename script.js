document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".hero button");

  if (button) {
    button.addEventListener("click", function () {
      alert("Welcome to TrendNova!");
    });
  }
});

let cart = [];

let productStock = {
  "Pet Hair Remover Roller": 25,
  "Wireless Earbuds": 20,
  "Smart Watch": 15,
  "Gaming Mouse": 30
};

// ===============================
// UPDATE STOCK DISPLAY
// ===============================
function updateStockDisplay() {
  const stockElements = {
    "Pet Hair Remover Roller": "stock-pet",
    "Wireless Earbuds": "stock-earbuds",
    "Smart Watch": "stock-watch",
    "Gaming Mouse": "stock-mouse"
  };

  Object.keys(productStock).forEach(function (productName) {
    const elementId = stockElements[productName];
    const element = document.getElementById(elementId);

    if (!element) return;

    const cartItem = cart.find(function (item) {
      return item.name === productName;
    });

    const quantityInCart = cartItem
      ? cartItem.quantity
      : 0;

    const remainingStock =
      productStock[productName] - quantityInCart;

    if (remainingStock <= 0) {
      element.innerText = "🔴 Out of Stock";
      element.style.color = "red";
    } else {
      element.innerText =
        "🟢 In Stock — " +
        remainingStock +
        " available";

      element.style.color = "#168a3a";
    }
  });
      }
// ===============================
// UPDATE CART COUNT
// ===============================
function updateCartCount() {
  let totalQuantity = cart.reduce(function (total, item) {
    return total + item.quantity;
  }, 0);

  document.getElementById("cart-count").innerText = totalQuantity;
}


// ===============================
// ADD TO CART
// ===============================
function addToCart(productName, price) {
  const existingItem = cart.find(function (item) {
    return item.name === productName;
  });

  const currentQuantity = existingItem
    ? existingItem.quantity
    : 0;

  const availableStock = productStock[productName] || 0;

  if (currentQuantity >= availableStock) {
    alert("❌ Sorry! " + productName + " is out of stock.");
    return;
  }

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: productName,
      price: parseFloat(price.replace("$", "")),
      quantity: 1
    });
  }

  updateCartCount();

  alert(productName + " added to cart!");
  showCart();
  updateStockDisplay();
}


// ===============================
// SHOW CART
// ===============================
function showCart() {
  const cartBox = document.getElementById("cart-items");

  if (cart.length === 0) {
    cartBox.innerHTML = "<h3>🛒 Your Cart is Empty!</h3>";
    return;
  }

  let html = "<h3>🛒 Your Cart</h3><ul>";
  let total = 0;

  cart.forEach(function (item, index) {
    total += item.price * item.quantity;

    html +=
      "<li>" +
      item.name +
      " - $" +
      item.price.toFixed(2) +
      " × " +
      item.quantity +
      " " +
      "<button onclick='decreaseQuantity(" +
      index +
      ")'>➖</button>" +
      " " +
      "<button onclick='increaseQuantity(" +
      index +
      ")'>➕</button>" +
      " " +
      "<button onclick='removeFromCart(" +
      index +
      ")'>❌ Remove</button>" +
      "</li>";
  });

  html += "</ul>";

  html += "<h3>Total: $" + total.toFixed(2) + "</h3>";

  html +=
    "<button onclick='checkout()'>💳 Checkout</button>";

  cartBox.innerHTML = html;
}


// ===============================
// REMOVE FROM CART
// ===============================
function removeFromCart(index) {
  cart.splice(index, 1);

  updateCartCount();
  showCart();
  updateStockDisplay();
}


// ===============================
// INCREASE QUANTITY WITH STOCK CHECK
// ===============================
function increaseQuantity(index) {
  const item = cart[index];

  const availableStock = productStock[item.name] || 0;

  if (item.quantity >= availableStock) {
    alert(
      "❌ Stock limit reached!\n\n" +
      item.name +
      "\nOnly " +
      availableStock +
      " available."
    );
    return;
  }

  item.quantity += 1;

  updateCartCount();
  showCart();
  updateStockDisplay();
}


// ===============================
// DECREASE QUANTITY
// ===============================
function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  updateCartCount();

  showCart();
  updateStockDisplay();
}


// ===============================
// CART CHECKOUT
// ===============================
function checkout() {
  if (cart.length === 0) {
    alert("🛒 Your Cart is Empty!");
    return;
  }

  let productNames = [];
  let total = 0;

  cart.forEach(function (item) {
    productNames.push(
      item.name + " × " + item.quantity
    );

    total += item.price * item.quantity;
  });

  let products = productNames.join(", ");
  let totalPrice = "$" + total.toFixed(2);

  // Form
  document.getElementById("product").value = products;
  document.getElementById("price").value = totalPrice;

  // Order Summary
  document.getElementById("summaryProduct").innerText = products;
  document.getElementById("summaryPrice").innerText = totalPrice;
  document.getElementById("summaryTotal").innerText = totalPrice;

  // Go to checkout section
  document.getElementById("order").scrollIntoView({
    behavior: "smooth"
  });
}


// ===============================
// DIRECT PRODUCT CHECKOUT
// ===============================
function setProduct(productName, price) {
  let cleanPrice = parseFloat(
    price.replace("$", "")
  );

  let formattedPrice = "$" + cleanPrice.toFixed(2);

  // Form
  document.getElementById("product").value =
    productName;

  document.getElementById("price").value =
    formattedPrice;

  // Order Summary
  document.getElementById("summaryProduct").innerText =
    productName;

  document.getElementById("summaryPrice").innerText =
    formattedPrice;

  document.getElementById("summaryTotal").innerText =
    formattedPrice;

  // Go to checkout section
  document.getElementById("order").scrollIntoView({
    behavior: "smooth"
  });
}


// ===============================
// SEARCH PRODUCTS
// ===============================
function searchProducts() {
  let input =
    document.getElementById("searchInput").value.toLowerCase();

  let cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {
    let name =
      card.querySelector("h3").textContent.toLowerCase();

    if (name.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}


// ===============================
// FILTER PRODUCTS
// ===============================
function filterProducts() {
  let category =
    document.getElementById("categoryFilter").value;

  let cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {
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


// ===============================
// PRODUCT MODAL
// ===============================
function openModal(title, price, description, image) {
  document.getElementById("modalTitle").innerText = title;

  document.getElementById("modalPrice").innerText = price;

  document.getElementById("modalDescription").innerText =
    description;

  document.getElementById("modalImage").src = image;

  document.getElementById("productModal").style.display =
    "block";
}


// ===============================
// CLOSE MODAL
// ===============================
function closeModal() {
  document.getElementById("productModal").style.display =
    "none";
  }
