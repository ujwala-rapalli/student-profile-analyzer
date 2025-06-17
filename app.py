from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from sklearn.linear_model import LogisticRegression
import numpy as np
import pandas as pd
import joblib  # For loading the model and encoders

app = Flask(__name__)
CORS(app)

# Load your trained model and encoders
model = joblib.load('admission_model.pkl')
label_encoders = joblib.load('label_encoders.pkl')

# Load your dataset once when the app starts
df = pd.read_csv("college_admission_data.csv", encoding='ISO-8859-1')

# Define a function to determine college based on preferences and rank within the cutoff range
def get_college_details(branch_preference, category, gender, rank_or_percentile):
    college_details = df[(df['Branch'] == branch_preference) &
                         (df['Category'] == category) &
                         (df['Gender'] == gender) &
                         (df['Cutoff'] >= rank_or_percentile)]
    
    college_details = college_details.drop(columns=['Unnamed: 6', 'Unnamed: 7'], errors='ignore')
    
    return college_details if not college_details.empty else None

@app.route('/')
def home():
    return render_template('main.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print(f"Received data: {data}")

        exam_type = data.get('exam_type')
        rank_or_percentile = data.get('rank_or_percentile')
        category = data.get('category')
        gender = data.get('gender')
        branch_preference = data.get('preferred_course')

        if category not in label_encoders['Category'].classes_:
            return jsonify({"error": f"Unknown category: {category}"}), 400
        if gender not in label_encoders['Gender'].classes_:
            return jsonify({"error": f"Unknown gender: {gender}"}), 400
        if exam_type not in label_encoders['Exam'].classes_:
            return jsonify({"error": f"Unknown exam type: {exam_type}"}), 400

        category_encoded = label_encoders['Category'].transform([category])[0]
        gender_encoded = label_encoders['Gender'].transform([gender])[0]
        exam_encoded = label_encoders['Exam'].transform([exam_type])[0]

        features = np.array([[rank_or_percentile, category_encoded, gender_encoded, exam_encoded]])
        prediction = model.predict(features)

        if prediction[0] == 1:
            college_info = get_college_details(branch_preference, category, gender, rank_or_percentile)
            
            if college_info is not None:
                college_details = college_info.to_dict(orient='records')
                return jsonify({"admission": "Accepted", "colleges": college_details})
            else:
                return jsonify({"admission": "Accepted", "message": "No colleges found for the preferred branch, category, gender, and within the cutoff range."})
        else:
            return jsonify({"admission": "Rejected", "message": "Unfortunately, admission is not possible."})

    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({'error': str(e)}), 400

import os

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)