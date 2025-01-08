document.addEventListener("DOMContentLoaded", () => {
  const cartItemsTable = document.getElementById("cartItemsTable");
  const subtotalElem = document.getElementById("subtotal");
  const checkoutButton = document.getElementById("checkoutButton");

  function renderCart() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let subtotal = 0;
    cartItemsTable.innerHTML = ""; // Clear existing rows

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
        </td>
        <td>RM${(item.price * item.quantity).toFixed(2)}</td>
      `;
      cartItemsTable.appendChild(row);
      subtotal += item.price * item.quantity;
    });

    subtotalElem.textContent = `Subtotal: RM${subtotal.toFixed(2)}`;
  }

  function updateQuantity(name, delta) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const itemIndex = cartItems.findIndex((item) => item.name === name);

    if (itemIndex > -1) {
      cartItems[itemIndex].quantity += delta;
      if (cartItems[itemIndex].quantity <= 0) cartItems.splice(itemIndex, 1);

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      renderCart(); // Refresh cart display
    }
  }

  cartItemsTable.addEventListener("click", (event) => {
    const button = event.target;
    if (button.classList.contains("quantity-button")) {
      const name = button.getAttribute("data-name");
      const change = parseInt(button.getAttribute("data-change"), 10);
      updateQuantity(name, change);
    }
  });

  checkoutButton?.addEventListener("click", () => {
    if (confirm("Proceed to checkout?")) {
      localStorage.clear(); // Clear the cart
      window.location.href = "purchasepay.html";
    }
  });

  renderCart(); // Initial render
});
