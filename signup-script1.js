document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !email || !password) {
      alert("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      alert(
        "Password must be at least 8 characters long and contain letters and numbers."
      );
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email]) {
      alert("User already registered. Please log in.");
      window.location.href = "login.html";
    } else {
      users[email] = { username, password: hashPassword(password) };
      localStorage.setItem("users", JSON.stringify(users));

      alert("Sign up successful! Redirecting to login page.");
      window.location.href = "login.html";
    }
  });

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  function hashPassword(password) {
    return btoa(password); // Simple Base64 encoding for demo. Use a proper hashing library for production.
  }
});
