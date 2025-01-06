document.addEventListener("DOMContentLoaded", () => {
  const addToCartButton = document.querySelector(".addtocart");

  addToCartButton.addEventListener("click", () => {
    const productName = addToCartButton.getAttribute("data-name");
    const productPrice = parseFloat(addToCartButton.getAttribute("data-price"));
    const quantityInput = document.getElementById("quantity");
    const quantity = parseInt(quantityInput.value);

    if (quantity > 0) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      const existingItem = cartItems.find((item) => item.name === productName);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cartItems.push({
          name: productName,
          price: productPrice,
          quantity: quantity,
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      alert(`${quantity} x ${productName} added to cart!`);
    } else {
      alert("Please select a quantity greater than 0.");
    }
  });

  const quantityMinusButton = document.querySelector(".quantity-minus");
  const quantityPlusButton = document.querySelector(".quantity-plus");
  const quantityInput = document.getElementById("quantity");

  quantityMinusButton.addEventListener("click", () => {
    let quantity = parseInt(quantityInput.value);
    if (quantity > 0) {
      quantityInput.value = quantity - 1;
    }
  });

  document.querySelector(".buynow").addEventListener("click", () => {
    const productName = addToCartButton.getAttribute("data-name");
    const productPrice = parseFloat(addToCartButton.getAttribute("data-price"));
    const quantity = parseInt(quantityInput.value);

    if (quantity > 0) {
      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      window.location.href = `buynow.html?product=${encodeURIComponent(
        productName
      )}&price=${productPrice}&quantity=${quantity}&cartItems=${encodeURIComponent(
        JSON.stringify(cartItems)
      )}`;
    } else {
      alert("Please select a quantity greater than 0.");
    }
  });
});
