# AI-Driven Student Profile Analyzer

This project is a web-based application that helps students analyze their admission chances for various engineering colleges based on their entrance exam results, category, gender, and course preferences. Powered by a machine learning model trained on real admission data, the system predicts admission status and suggests possible colleges and branches.

## Features
- Predicts admission chances using AI/ML.
- Suggests possible colleges and branches based on user profile.
- Clean, modern UI with visually appealing results.
- Built with Flask, scikit-learn, HTML, CSS, and JavaScript.

## How It Works
1. The user enters their exam type, rank/percentile, category, gender, and preferred course.
2. The system sends this data to a Flask backend, which uses a trained machine learning model to predict admission chances.
3. If accepted, the system displays a list of possible colleges and branches in a visually appealing format.

## Getting Started

### Prerequisites
- Python 3.x
- Flask
- scikit-learn
- joblib
- pandas

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
   python venv/train_model.py
   ```
4. Run the Flask app:
   ```bash
   python venv/app.py
   ```
5. Open your browser and go to `http://127.0.0.1:5000`

## Project Structure
- `venv/app.py` - Flask backend
- `venv/train_model.py` - Model training script
- `venv/templates/main.html` - Main HTML page
- `venv/static/profile.js` - Frontend JavaScript
- `venv/static/style.css` - Stylesheet

## License
This project is for educational purposes.
