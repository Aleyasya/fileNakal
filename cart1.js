document.addEventListener("DOMContentLoaded", () => {
  const cartItemsTable = document.getElementById("cartItemsTable");
  const subtotalElem = document.getElementById("subtotal");
  const checkoutButton = document.getElementById("checkoutButton");

  function renderCart() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let subtotal = 0;
    cartItemsTable.innerHTML = "";

    cartItems.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>RM${item.price.toFixed(2)}</td>
        <td>
          <button class="quantity-button" data-name="${
            item.name
          }" data-change="-1">-</button>
          ${item.quantity}
          <button class="quantity-button" data-name="${
            item.name
          }" data-change="1">+</button>
          <button class="remove-button" data-name="${item.name}">Remove</button>
        </td>
        <td>RM${(item.price * item.quantity).toFixed(2)}</td>
      `;
      cartItemsTable.appendChild(row);
      subtotal += item.price * item.quantity;
    });

    subtotalElem.textContent = `Subtotal: RM${subtotal.toFixed(2)}`;

    // Show/hide checkout button based on cart contents
    if (checkoutButton) {
      checkoutButton.style.display = cartItems.length > 0 ? "block" : "none";
    }
  }

  function updateQuantity(name, delta) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemIndex = cartItems.findIndex((item) => item.name === name);

    if (itemIndex > -1) {
      cartItems[itemIndex].quantity += delta;
      if (cartItems[itemIndex].quantity <= 0) {
        cartItems.splice(itemIndex, 1);
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      renderCart();
    }
  }

  function removeItem(name) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemIndex = cartItems.findIndex((item) => item.name === name);

    if (itemIndex > -1) {
      cartItems.splice(itemIndex, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      renderCart();
    }
  }

  if (cartItemsTable) {
    cartItemsTable.addEventListener("click", (event) => {
      const button = event.target;
      if (button.classList.contains("quantity-button")) {
        const name = button.getAttribute("data-name");
        const change = parseInt(button.getAttribute("data-change"), 10);
        updateQuantity(name, change);
      } else if (button.classList.contains("remove-button")) {
        const name = button.getAttribute("data-name");
        removeItem(name);
      }
    });

    // Parse URL parameters for Buy Now functionality
    const urlParams = new URLSearchParams(window.location.search);
    const queryProduct = urlParams.get("product");
    const queryPrice = urlParams.get("price");
    const queryQuantity = urlParams.get("quantity");

    if (queryProduct && queryPrice && queryQuantity) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      cartItems.push({
        name: queryProduct,
        price: parseFloat(queryPrice),
        quantity: parseInt(queryQuantity),
      });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      window.history.replaceState({}, document.title, "cart1.html");
    }

    if (checkoutButton) {
      checkoutButton.addEventListener("click", () => {
        if (confirm("Proceed to checkout?")) {
          localStorage.clear();
          window.location.href = "money.html";
        }
      });
    }

    renderCart();
  }
});
