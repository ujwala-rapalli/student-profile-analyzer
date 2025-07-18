# AI-Driven Student Profile Analyzer

This project is a Streamlit web application that helps students analyze their admission chances for various engineering colleges based on their entrance exam results, category, gender, and course preferences. Powered by a machine learning model trained on real admission data, the system predicts admission status and suggests possible colleges and branches.

## Features
- Predicts admission chances using AI/ML.
- Suggests possible colleges and branches based on user profile.
- Clean, modern UI with visually appealing results.
- Built with Streamlit, scikit-learn, pandas, numpy, and joblib.
- Live demo: [student-profile-analyzer Streamlit App](https://student-profile-analyzer-6ql3omcevncnroypii2japp.streamlit.app/)

## How It Works
1. The user enters their exam type, rank/percentile, category, gender, and preferred course.
2. The system uses a trained machine learning model to predict admission chances.
3. If accepted, the system displays a list of possible colleges and branches in a visually appealing format.

## Getting Started

### Prerequisites
- Python 3.x
- streamlit
- scikit-learn
- joblib
- pandas
- numpy

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Train the model (if needed):
   ```bash
   python train_model.py
   ```
4. Run the Streamlit app:
   ```bash
   streamlit run app.py
   ```
5. Open your browser and go to the local Streamlit URL provided in the terminal.

## Project Structure
- `app.py` - Streamlit app
- `train_model.py` - Model training script
- `college_admission_data.csv` - Dataset
- `admission_model.pkl` - Trained model
- `label_encoders.pkl` - Encoders for categorical variables
- `requirements.txt` - Python dependencies

## License
This project is for educational purposes.
