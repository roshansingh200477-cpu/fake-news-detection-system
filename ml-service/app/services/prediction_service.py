import os
import joblib
from typing import Optional
from app.utils.text_preprocessing import clean_text

# Paths to model files
MODEL_PATH = os.path.join("app", "models", "fake_news_model.pkl")
VECTORIZER_PATH = os.path.join("app", "models", "vectorizer.pkl")

# Global variables to store to loaded model 

model: Optional[object] = None
vectorizer: Optional[object] = None

def load_model():
    # Load the trained ml laod model and vectorizer from dis and This should run once when the service start
    global model, vectorizer

    try:
        model = joblib.load(MODEL_PATH)
        vectorizer = joblib.load(VECTORIZER_PATH)
        print("ML model loaded successfully")
    
    except Exception:
        print("Model files not found. using the fallback prediction")

def predict_news(text: str)-> str:
    # Predicting the News
    if not text or len(text.strip()) == 0:
        raise ValueError("Input text cannot be empty")
    #if model is not loaded yet
    if model is None or vectorizer is None:
        return fallback_prediction(text)
    
    try:
        transformed_text = vectorizer.transform([text])
        prediction = model.predict(transformed_text)[0]
        return "Fake" if prediction == 1 else "Real"
    
    except Exception as e:
        raise RuntimeError(f"Prediction error: {str(e)}")
    
def fallback_prediction(text: str)-> str:
    # fake logic will be replaced later
    text = text.lower()

    suspicious_words = [
        "shocking",
        "breaking",
        "viral",
        "unbelievable",
        "you won't believe"
    ]

    for word in suspicious_words:
        if word in text:
            return "Fake"
    return "Real"