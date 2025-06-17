"use strict";

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

  document.getElementById('loginForm').addEventListener('submit', handleLogin); // Function to analyze student profile

  window.analyzeProfile = function _callee() {
    var name, school, gpa, gpa_scale, sat, major, extracurriculars, leadership, community_service, work_experience, response, result;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = document.getElementById('name').value;
            school = document.getElementById('school').value;
            gpa = document.getElementById('gpa').value;
            gpa_scale = document.getElementById('gpa_scale').value;
            sat = document.getElementById('sat').value;
            major = document.getElementById('major').value;
            extracurriculars = document.getElementById('extracurriculars').value;
            leadership = document.getElementById('leadership').value;
            community_service = document.getElementById('community_service').value;
            work_experience = document.getElementById('work_experience').value;
            _context.prev = 10;
            _context.next = 13;
            return regeneratorRuntime.awrap(fetch('http://127.0.0.1:5000/predict', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                GPA: parseFloat(gpa),
                SAT: parseInt(sat, 10),
                Extracurriculars: parseInt(extracurriculars, 10),
                Leadership: parseInt(leadership, 10),
                Community_Service: parseInt(community_service, 10),
                Work_Experience: parseInt(work_experience, 10)
              })
            }));

          case 13:
            response = _context.sent;

            if (response.ok) {
              _context.next = 16;
              break;
            }

            throw new Error('Network response was not ok');

          case 16:
            _context.next = 18;
            return regeneratorRuntime.awrap(response.json());

          case 18:
            result = _context.sent;
            document.getElementById('result').innerText = "Admission Chance: ".concat(result.admission_chance ? 'Accepted' : 'Rejected');
            _context.next = 26;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](10);
            console.error('Error:', _context.t0);
            document.getElementById('result').innerText = 'Error: Unable to analyze profile.';

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[10, 22]]);
  };
}); // Your existing functions like handleSignup(), handleLogin(), showError(), etc., would go here.
//# sourceMappingURL=script.dev.js.map
