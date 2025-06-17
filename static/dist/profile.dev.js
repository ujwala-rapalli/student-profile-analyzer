"use strict";

// Function to analyze student profile
function analyzeProfile() {
  var exam_type, rank_or_percentile, category, gender, preferred_course, response, result, collegesInfo;
  return regeneratorRuntime.async(function analyzeProfile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Get input values
          exam_type = document.getElementById('exam_type').value;
          rank_or_percentile = document.getElementById('rank_or_percentile').value;
          category = document.getElementById('category').value;
          gender = document.getElementById('gender').value;
          preferred_course = document.getElementById('preferred_course').value; // Log input values for debugging

          console.log({
            exam_type: exam_type,
            rank_or_percentile: parseInt(rank_or_percentile, 10),
            category: category,
            gender: gender,
            preferred_course: preferred_course
          });
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              exam_type: exam_type,
              rank_or_percentile: parseInt(rank_or_percentile, 10),
              category: category,
              gender: gender,
              preferred_course: preferred_course
            })
          }));

        case 9:
          response = _context.sent;

          if (response.ok) {
            _context.next = 12;
            break;
          }

          throw new Error("Network response was not ok");

        case 12:
          _context.next = 14;
          return regeneratorRuntime.awrap(response.json());

        case 14:
          result = _context.sent;

          // Check the admission status and prepare the output
          if (result.admission === "Accepted") {
            collegesInfo = ""; // Assuming the result contains college details

            result.colleges.forEach(function (college) {
              collegesInfo += "\n                    <strong>College:</strong> ".concat(college['Institute'], "<br>\n                    <strong>Branch:</strong> ").concat(college['Branch'], "<br>\n                    <strong>Cutoff:</strong> ").concat(college['Cutoff'], "<br>\n                ");
            });
            document.getElementById('result').innerHTML = "\n                <strong>Admission Status:</strong> Accepted!<br>\n                Here are the possible colleges for your chosen branch:<br><br>\n                ".concat(collegesInfo, "\n            ");
          } else {
            document.getElementById('result').innerText = "Admission Status: Rejected. Unfortunately, you didn't qualify for admission.";
          }

          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](6);
          console.error('Error:', _context.t0);
          document.getElementById('result').innerText = 'Error: Unable to analyze profile.';

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 18]]);
} // Wait for the DOM to load before adding event listeners


document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.btn').addEventListener('click', analyzeProfile);
});
//# sourceMappingURL=profile.dev.js.map
