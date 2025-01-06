document.addEventListener("DOMContentLoaded", () => {
  const cartItemsTable = document.getElementById("cartItemsTable");
  const subtotalElem = document.getElementById("subtotal");
  let subtotal = 0;

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  cartItems.forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.name}</td>
      <td>RM${item.price.toFixed(2)}</td>
      <td>
        <button class="quantity-button" onclick="updateQuantity('${
          item.name
        }', -1)">-</button>
        ${item.quantity}
        <button class="quantity-button" onclick="updateQuantity('${
          item.name
        }', 1)">+</button>
      </td>
      <td>RM${(item.price * item.quantity).toFixed(2)}</td>
    `;

    cartItemsTable.appendChild(row);

    subtotal += item.price * item.quantity;
  });

  subtotalElem.textContent = `Subtotal: RM${subtotal.toFixed(2)}`;

  document.getElementById("checkoutButton").addEventListener("click", () => {
    if (confirm("Proceed to checkout?")) {
      localStorage.removeItem("cartItems");
      window.location.href = "purchasepay.html";
    }
  });
});

function updateQuantity(productName, change) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const item = cartItems.find((item) => item.name === productName);

  if (item) {
    item.quantity += change;

    if (item.quantity <= 0) {
      cartItems.splice(cartItems.indexOf(item), 1);
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    location.reload();
  }
}
