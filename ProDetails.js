document.addEventListener("DOMContentLoaded", () => {
  // Define price variations for different sizes
  const priceVariations = {
    "Lab Coat": {
      S: 70.0,
      M: 70.0,
      L: 75.0,
      XL: 75.0,
      "2XL": 80.0,
      "3XL": 80.0,
    },
    Boots: {
      34: 36.0,
      36: 36.0,
      37: 36.0,
      40: 40.0,
      42: 40.0,
      48: 45.0,
    },
  };

  const addToCartButton = document.querySelector(".addtocart");
  const quantityInput = document.getElementById("quantity");
  const sizeSelect = document.getElementById("Size");

  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      const productName = addToCartButton.getAttribute("data-name");
      const quantity = parseInt(quantityInput.value) || 0;
      const selectedSize = sizeSelect ? sizeSelect.value : null;

      if (!selectedSize) {
        alert("Please select a size before adding to cart.");
        return;
      }

      // Get price based on size
      const productPrice = priceVariations[productName][selectedSize];

      if (quantity > 0) {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const displayName = `${productName} (Size: ${selectedSize})`;

        const existingItem = cartItems.find(
          (item) => item.name === displayName
        );

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cartItems.push({
            name: displayName,
            originalName: productName,
            price: productPrice,
            quantity: quantity,
            size: selectedSize,
          });
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        alert(`${quantity} x ${displayName} added to cart!`);

        // Reset form
        quantityInput.value = 0;
        sizeSelect.selectedIndex = 0;
      } else {
        alert("Please select a quantity greater than 0.");
      }
    });
  }

  const quantityMinusButton = document.querySelector(".quantity-minus");
  const quantityPlusButton = document.querySelector(".quantity-plus");

  if (quantityMinusButton) {
    quantityMinusButton.addEventListener("click", () => {
      let quantity = parseInt(quantityInput.value);
      if (quantity > 0) {
        quantityInput.value = quantity - 1;
      }
    });
  }

  // Handle "Buy Now" functionality
  const buyNowButton = document.querySelector(".buynow");
  if (buyNowButton) {
    buyNowButton.addEventListener("click", () => {
      const productName = addToCartButton.getAttribute("data-name");
      const selectedSize = sizeSelect ? sizeSelect.value : null;
      const quantity = parseInt(quantityInput.value);

      if (!selectedSize) {
        alert("Please select a size before proceeding.");
        return;
      }

      const productPrice = priceVariations[productName][selectedSize];

      if (quantity > 0) {
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        const displayName = `${productName} (Size: ${selectedSize})`;

        window.location.href = `cart1.html?product=${encodeURIComponent(
          displayName
        )}&price=${productPrice}&quantity=${quantity}&cartItems=${encodeURIComponent(
          JSON.stringify(cartItems)
        )}`;
      } else {
        alert("Please select a quantity greater than 0.");
      }
    });
  }

  // Update price when size is changed
  if (sizeSelect) {
    sizeSelect.addEventListener("change", () => {
      const productName = addToCartButton.getAttribute("data-name");
      const selectedSize = sizeSelect.value;
      if (selectedSize && priceVariations[productName]) {
        const newPrice = priceVariations[productName][selectedSize];
        const priceDisplay = document.querySelector(".col-4 p");
        if (priceDisplay) {
          priceDisplay.textContent = `RM ${newPrice.toFixed(2)}`;
        }
        addToCartButton.setAttribute("data-price", newPrice);
      }
    });
  }
});
