document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Validate the form
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const rating = document.getElementById("rating").value;
    const comments = document.getElementById("comments").value.trim();

    if (name && email && rating && comments) {
      // Form is valid, you can submit it
      // This is where you can send the form data to the server using AJAX, fetch, or any other method

      // Show success message
      document.getElementById("feedbackMessage").textContent =
        "Thank you for your feedback!";

      // Optionally, clear the form
      document.getElementById("feedbackForm").reset();
    } else {
      // Form is invalid, show an error message
      document.getElementById("feedbackMessage").textContent =
        "Please fill out all fields.";
      document.getElementById("feedbackMessage").style.color = "#dc3545";
    }
  });
