// auth.js

document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
document.getElementById('signupForm')?.addEventListener('submit', handleSignup);

// Login function
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'admin' && password === 'admin') {
        window.location.href = '/main';  // Redirect to main.html after login
    } else {
        alert('Invalid credentials');
    }
}

// Signup function
function handleSignup(event) {
    event.preventDefault();
    // Perform signup logic and save user to localStorage
    window.location.href = '/';
}
