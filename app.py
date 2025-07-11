import streamlit as st
import joblib
import numpy as np
import pandas as pd

# Load your trained model and encoders
model = joblib.load('admission_model.pkl')
label_encoders = joblib.load('label_encoders.pkl')
df = pd.read_csv("college_admission_data.csv", encoding='ISO-8859-1')

def get_college_details(branch_preference, category, gender, rank_or_percentile):
    college_details = df[
        (df['Branch'] == branch_preference) &
        (df['Category'] == category) &
        (df['Gender'] == gender) &
        (df['Cutoff'] >= rank_or_percentile)
    ]
    college_details = college_details.drop(columns=['Unnamed: 6', 'Unnamed: 7'], errors='ignore')
    return college_details if not college_details.empty else None

st.title("AI-Driven Student Profile Analyzer")

exam_options = [""] + list(label_encoders['Exam'].classes_)
category_options = [""] + list(label_encoders['Category'].classes_)
gender_options = [""] + list(label_encoders['Gender'].classes_)
course_options = [""] + list(df['Branch'].unique())

exam_type = st.selectbox("Exam Type", exam_options, index=0, format_func=lambda x: "Select Exam Type" if x == "" else x)
rank_or_percentile = st.number_input("Rank/Percentile", min_value=0, format="%d", step=1)
category = st.selectbox("Category", category_options, index=0, format_func=lambda x: "Select Category" if x == "" else x)
gender = st.selectbox("Gender", gender_options, index=0, format_func=lambda x: "Select Gender" if x == "" else x)
preferred_course = st.selectbox("Preferred Course", course_options, index=0, format_func=lambda x: "Select Course" if x == "" else x)

if st.button("Analyze Profile"):
    if "" in [exam_type, category, gender, preferred_course] or rank_or_percentile == 0:
        st.warning("Please fill in all fields before analyzing.")
    else:
        # Encode categorical variables
        category_encoded = label_encoders['Category'].transform([category])[0]
        gender_encoded = label_encoders['Gender'].transform([gender])[0]
        exam_encoded = label_encoders['Exam'].transform([exam_type])[0]

        features = np.array([[rank_or_percentile, category_encoded, gender_encoded, exam_encoded]])
        prediction = model.predict(features)

        if prediction[0] == 1:
            college_info = get_college_details(preferred_course, category, gender, rank_or_percentile)
            if college_info is not None:
                st.success("Admission Status: Accepted! Here are the possible colleges for your chosen branch:")
                for _, college in college_info.iterrows():
                    st.markdown(
                        f"""
                        <div style=\"border:2px solid #4CAF50; border-radius:8px; padding:16px; margin-bottom:16px; background:#f9fff9;\">
                            <strong>College:</strong> {college['Institute']}<br>
                            <strong>Branch:</strong> {college['Branch']}<br>
                            <strong>Cutoff:</strong> {college['Cutoff']}<br>
                        </div>
                        """, unsafe_allow_html=True
                    )
            else:
                st.info("Admission Status: Accepted, but no colleges found for the preferred branch, category, gender, and within the cutoff range.")
        else:
            st.error("Admission Status: Rejected. Unfortunately, you didn't qualify for admission.")