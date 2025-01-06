document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Both fields are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (!users[email]) {
      alert("No user found with this email. Please sign up.");
      window.location.href = "signup.html";
      return;
    }

    if (users[email].password === hashPassword(password)) {
      alert("Login successful! Redirecting to home page.");
      window.location.href = "home.html";
    } else {
      alert("Invalid email or password.");
    }
  });

  function hashPassword(password) {
    return btoa(password); // Match the hash method used in sign-up.
  }
});
