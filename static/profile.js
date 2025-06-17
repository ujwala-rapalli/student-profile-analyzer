// Function to analyze student profile
async function analyzeProfile() {
    // Get input values and trim whitespace
    const exam_type = document.getElementById('exam_selection').value.trim();
    const rank_or_percentile = document.getElementById('rank_input').value.trim();
    const category = document.getElementById('category_selection').value.trim();
    const gender = document.getElementById('gender_selection').value.trim();
    const preferred_course = document.getElementById('course_preference').value.trim();

    // Log input values for debugging
    console.log('Sending data:', {
        exam_type: exam_type,
        rank_or_percentile: parseInt(rank_or_percentile, 10),
        category: category,
        gender: gender,
        preferred_course: preferred_course
    });

    try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                exam_type: exam_type,
                rank_or_percentile: parseInt(rank_or_percentile, 10),
                category: category,
                gender: gender,
                preferred_course: preferred_course
            })
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const result = await response.json();

        // Check the admission status and prepare the output
        if (result.admission === "Accepted") {
            let collegesInfo = "";

            // Assuming the result contains college details
            if (result.colleges && Array.isArray(result.colleges)) {
                result.colleges.forEach(college => {
                    collegesInfo += `
                        <div class="college-box">
                            <strong>College:</strong> ${college['Institute']}<br>
                            <strong>Branch:</strong> ${college['Branch']}<br>
                            <strong>Cutoff:</strong> ${college['Cutoff']}<br>
                        </div>
                    `;
                });
            } else if (result.message) {
                collegesInfo = result.message;
            }

            document.getElementById('analysis_result').innerHTML = `
                <strong>Admission Status:</strong> Accepted!<br>
                Here are the possible colleges for your chosen branch:<br><br>
                ${collegesInfo}
            `;
        } else {
            document.getElementById('analysis_result').innerText = "Admission Status: Rejected. Unfortunately, you didn't qualify for admission.";
        }

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('analysis_result').innerText = 'Error: Unable to analyze profile.';
    }
}
