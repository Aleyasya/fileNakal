document.addEventListener("DOMContentLoaded", () => {
  let currentImageIndex = 0;
  const images = document.querySelectorAll(".productimgs");
  const totalImages = images.length;

  function showImage(index) {
    images.forEach((img, i) => {
      img.classList.toggle("active", i === index);
    });
  }

  document.getElementById("nextButton").addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % totalImages;
    showImage(currentImageIndex);
  });

  document.getElementById("prevButton").addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
    showImage(currentImageIndex);
  });

  showImage(currentImageIndex);
});

const quantityInput = document.querySelector(".quantity input");
const addToCartButton = document.querySelector(".actions .addtocart");
const buyNowButton = document.querySelector(".actions .buynow");

function updateQuantity(newValue) {
  newValue = Math.max(0, parseInt(newValue) || 0);
  quantityInput.value = newValue;
  const buttonsDisabled = newValue === 0;
  addToCartButton.disabled = buttonsDisabled;
  buyNowButton.disabled = buttonsDisabled;
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("quantity-plus")) {
    const currentValue = parseInt(quantityInput.value) || 0;
    updateQuantity(currentValue + 1);
  } else if (target.classList.contains("quantity-minus")) {
    const currentValue = parseInt(quantityInput.value) || 0;
    updateQuantity(currentValue - 1);
  }
});

updateQuantity(quantityInput.value);

function changeButtonHoverStyle(buttonElement) {
  if (buttonElement) {
    buttonElement.addEventListener("mouseover", () => {
      buttonElement.style.backgroundColor = "black";
      buttonElement.style.color = "white";
    });

    buttonElement.addEventListener("mouseout", () => {
      buttonElement.style.backgroundColor = "";
      buttonElement.style.color = "";
    });
  }
}

changeButtonHoverStyle(addToCartButton);
changeButtonHoverStyle(buyNowButton);
