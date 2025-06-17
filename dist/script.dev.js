"use strict";

function analyzeProfile() {
  var gpa, sat, extracurriculars, leadership, response, result;
  return regeneratorRuntime.async(function analyzeProfile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          gpa = document.getElementById('gpa').value;
          sat = document.getElementById('sat').value;
          extracurriculars = document.getElementById('extracurriculars').value;
          leadership = document.getElementById('leadership').value;
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              GPA: gpa,
              SAT: sat,
              Extracurriculars: extracurriculars,
              Leadership: leadership
            })
          }));

        case 6:
          response = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          result = _context.sent;
          document.getElementById('result').innerText = 'Admission Chance: ' + (result.admission_chance ? 'Accepted' : 'Rejected');

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
}
//# sourceMappingURL=script.dev.js.map
