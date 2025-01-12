document.addEventListener("DOMContentLoaded", () => {
  const cartItemsTable = document.getElementById("cartItemsTable");
  const subtotalElem = document.getElementById("subtotal");
  const checkoutButton = document.getElementById("checkoutButton");

  // Helper function to format currency
  const formatCurrency = (amount) => `RM${amount.toFixed(2)}`;

  // Cart state management
  const CartManager = {
    getItems() {
      return JSON.parse(localStorage.getItem("cartItems")) || [];
    },

    saveItems(items) {
      localStorage.setItem("cartItems", JSON.stringify(items));
    },

    addItem(item) {
      const items = this.getItems();
      const existingItem = items.find((i) => i.name === item.name);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        items.push(item);
      }

      this.saveItems(items);
    },

    updateQuantity(name, delta) {
      const items = this.getItems();
      const item = items.find((i) => i.name === name);

      if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
          this.removeItem(name);
        } else {
          this.saveItems(items);
        }
      }
    },

    removeItem(name) {
      const items = this.getItems();
      const filteredItems = items.filter((item) => item.name !== name);
      this.saveItems(filteredItems);
    },

    clearCart() {
      localStorage.removeItem("cartItems");
    },

    calculateSubtotal() {
      return this.getItems().reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  };

  // UI Rendering
  function renderCart() {
    const cartItems = CartManager.getItems();
    const subtotal = CartManager.calculateSubtotal();

    cartItemsTable.innerHTML = cartItems
      .map(
        (item) => `
      <tr>
        <td>${item.name}</td>
        <td>
          <button class="quantity-button" data-name="${
            item.name
          }" data-change="-1">-</button>
          <span class="quantity-display">${item.quantity}</span>
          <button class="quantity-button" data-name="${
            item.name
          }" data-change="1">+</button>
          <button class="remove-button" data-name="${item.name}">Remove</button>
        </td>
        <td>${formatCurrency(item.price * item.quantity)}</td>
      </tr>
    `
      )
      .join("");

    subtotalElem.textContent = `Subtotal: ${formatCurrency(subtotal)}`;

    if (checkoutButton) {
      checkoutButton.style.display = cartItems.length > 0 ? "block" : "none";
    }
  }

  // Event Handlers
  function handleCartAction(event) {
    const button = event.target;
    const name = button.getAttribute("data-name");

    if (button.classList.contains("quantity-button")) {
      const change = parseInt(button.getAttribute("data-change"), 10);
      CartManager.updateQuantity(name, change);
    } else if (button.classList.contains("remove-button")) {
      CartManager.removeItem(name);
    }

    renderCart();
  }

  function handleCheckout() {
    if (confirm("Proceed to checkout?")) {
      CartManager.clearCart();
      window.location.href = "money.html";
    }
  }

  // Handle Buy Now functionality from URL parameters
  function handleBuyNowParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const queryProduct = urlParams.get("product");
    const queryPrice = urlParams.get("price");
    const queryQuantity = urlParams.get("quantity");

    if (queryProduct && queryPrice && queryQuantity) {
      CartManager.addItem({
        name: queryProduct,
        price: parseFloat(queryPrice),
        quantity: parseInt(queryQuantity),
      });

      // Clean up URL
      window.history.replaceState({}, document.title, "cart1.html");
    }
  }

  // Initialize cart functionality
  if (cartItemsTable) {
    cartItemsTable.addEventListener("click", handleCartAction);
    if (checkoutButton) {
      checkoutButton.addEventListener("click", handleCheckout);
    }

    handleBuyNowParams();
    renderCart();
  }
});
