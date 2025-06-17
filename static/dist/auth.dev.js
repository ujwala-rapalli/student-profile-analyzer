"use strict";

// auth.js
// Wait for the DOM to load before running scripts
document.addEventListener('DOMContentLoaded', function () {
  // Toggle password visibility for signup
  var togglePasswordSignUp = document.getElementById('togglePasswordSignUp');
  var passwordInputSignUp = document.getElementById('password');

  if (togglePasswordSignUp) {
    togglePasswordSignUp.addEventListener('click', function () {
      var type = passwordInputSignUp.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInputSignUp.setAttribute('type', type);
      this.classList.toggle('fa-eye-slash');
    });
  } // Toggle password visibility for confirm password


  var toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
  var confirmPasswordInput = document.getElementById('confirmPassword');

  if (toggleConfirmPassword) {
    toggleConfirmPassword.addEventListener('click', function () {
      var type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      confirmPasswordInput.setAttribute('type', type);
      this.classList.toggle('fa-eye-slash');
    });
  } // Handle signup


  document.getElementById('signupBtn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission

    handleSignup();
  }); // Handle login

  document.getElementById('loginForm').addEventListener('submit', handleLogin);
}); // Function to handle signup

function handleSignup() {
  var firstName = document.getElementById('firstName');
  var lastName = document.getElementById('lastName');
  var password = document.getElementById('password');
  var confirmPassword = document.getElementById('confirmPassword'); // Clear previous error messages

  clearErrorMessages();
  var isValid = true; // Validate fields

  if (!firstName.value.trim()) {
    showError(firstName, 'Please fill this field');
    isValid = false;
  }

  if (!lastName.value.trim()) {
    showError(lastName, 'Please fill this field');
    isValid = false;
  }

  if (!password.value.trim()) {
    showError(password, 'Please fill this field');
    isValid = false;
  }

  if (!confirmPassword.value.trim()) {
    showError(confirmPassword, 'Please fill this field');
    isValid = false;
  } else if (password.value !== confirmPassword.value) {
    showError(confirmPassword, 'Passwords do not match');
    isValid = false;
  }

  if (isValid) {
    // Store user details in localStorage
    var user = {
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value
    };
    localStorage.setItem('user', JSON.stringify(user)); // Display signup success message

    var successMessage = document.getElementById('successMessage');
    successMessage.textContent = 'Signup successful!';
    successMessage.style.display = 'block'; // Fade out success message after a delay

    setTimeout(function () {
      successMessage.style.opacity = 0;
      setTimeout(function () {
        return successMessage.style.display = 'none';
      }, 1000);
    }, 3000);
    document.getElementById('signupForm').reset();
  }
} // Function to handle user login


function handleLogin(event) {
  event.preventDefault(); // Prevent form submission

  var username = document.getElementById('name').value.trim();
  var password = document.getElementById('password').value;
  var users = JSON.parse(localStorage.getItem('users')) || []; // Retrieve all users
  // Clear previous error messages

  document.getElementById('usernameError').textContent = '';
  document.getElementById('passwordError').textContent = '';
  var isValid = true; // Validate fields

  if (!username) {
    document.getElementById('usernameError').textContent = 'Please fill this field';
    isValid = false;
  }

  if (!password) {
    document.getElementById('passwordError').textContent = 'Please fill this field';
    isValid = false;
  } // If validation fails, return early


  if (!isValid) return; // Check if the user exists and credentials match

  var user = users.find(function (user) {
    return user.firstName === username && user.password === password;
  }); // Find user

  if (user) {
    var successMessage = document.createElement('p');
    successMessage.textContent = 'Login successful';
    successMessage.classList.add('success-message');
    document.querySelector('.container').prepend(successMessage); // Redirect to main.html after a delay

    setTimeout(function () {
      window.location.href = 'main.html';
    }, 1000); // Redirect after 1 second
  } else {
    document.getElementById('passwordError').textContent = 'Invalid credentials'; // Invalid credentials
  }
} // Utility functions for showing and clearing error messages


function showError(inputElement, message) {
  var errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  errorDiv.style.color = 'red';
  errorDiv.style.fontSize = '12px';
  errorDiv.style.marginTop = '5px';
  inputElement.style.borderColor = 'red'; // Add red border for error

  inputElement.parentElement.appendChild(errorDiv);
}

function clearErrorMessages() {
  var errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(function (msg) {
    return msg.remove();
  });
}
//# sourceMappingURL=auth.dev.js.map
