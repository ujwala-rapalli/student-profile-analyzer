import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
import joblib  # For saving the model

# Load dataset
df = pd.read_csv("college_admission_data.csv", encoding='ISO-8859-1')

# Drop any unnamed or unnecessary columns
df = df.loc[:, ~df.columns.str.contains('^Unnamed')]

# Clean up leading/trailing whitespace characters in categorical variables
df['Category'] = df['Category'].str.strip()
df['Exam'] = df['Exam'].str.strip()

# Display the cleaned dataframe
print("Cleaned DataFrame:")
print(df.head())

# Example logic for creating 'Admission Status':
cutoff_threshold = 30000
df['Admission Status'] = (df['Cutoff'] < cutoff_threshold).astype(int)  # 1 for accepted, 0 for rejected

# Encode categorical variables
label_encoders = {}
for column in ['Branch', 'Category', 'Gender', 'Exam']:
    le = LabelEncoder()
    df[column] = le.fit_transform(df[column])
    label_encoders[column] = le
    print(f"Classes for {column}:", le.classes_)

# Prepare features and target variable
X = df[['Cutoff', 'Category', 'Gender', 'Exam']]  # Adjust based on your dataset
y = df['Admission Status']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = LogisticRegression(max_iter=1000)  # Increase max_iter to ensure convergence
model.fit(X_train, y_train)

# Evaluate the model
score = model.score(X_test, y_test)
print(f"Test Accuracy: {score:.4f}")

# Save the model and label encoders
joblib.dump(model, 'admission_model.pkl')
joblib.dump(label_encoders, 'label_encoders.pkl')
print("Model and label encoders saved successfully.")
