// Validate email and password fields in a form
function validateForm() {
    // Get form elements
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessages = document.getElementById("errorMessages");

    // Clear any previous error messages
    errorMessages.innerHTML = "";

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valid = true; // Flag to check if form is valid

    // Validate email format
    if (!emailRegex.test(email)) {
        errorMessages.innerHTML += "<p>Invalid email format.</p>";
        valid = false;
    }

    // Validate password length (example: minimum of 8 characters)
    if (password.length < 8) {
        errorMessages.innerHTML += "<p>Password must be at least 8 characters long.</p>";
        valid = false;
    }

    return valid; // Return true if form is valid, false otherwise
}
