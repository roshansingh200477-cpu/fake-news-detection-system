import os
import joblib
from typing import Optional
from app.utils.text_preprocessing import clean_text

MODEL_PATH = os.path.join("app", "models", "fake_news_model.pkl")
VECTORIZER_PATH = os.path.join("app", "models", "vectorizer.pkl")

model: Optional[object] = None
vectorizer: Optional[object] = None

def load_model():
    global model, vectorizer
    try:
        model = joblib.load(MODEL_PATH)
        vectorizer = joblib.load(VECTORIZER_PATH)
        print("ML model loaded successfully")
    except Exception:
        print("Model files not found. using the fallback prediction")

def predict_news(text: str) -> dict:
    if not text or len(text.strip()) == 0:
        raise ValueError("Input text cannot be empty")

    if model is None or vectorizer is None:
        return fallback_prediction(text)

    try:
        cleaned = clean_text(text)
        transformed_text = vectorizer.transform([cleaned])

        prediction = model.predict(transformed_text)[0]
        probability = model.predict_proba(transformed_text)[0]

        label = "Fake" if prediction == 1 else "Real"
        confidence = float(max(probability))

        return {"prediction": label, "confidence": confidence}

    except Exception as e:
        raise RuntimeError(f"Prediction error: {str(e)}")

def fallback_prediction(text: str) -> dict:
    text = text.lower()
    suspicious_words = [
        "shocking", "breaking", "viral",
        "unbelievable", "you won't believe"
    ]
    for word in suspicious_words:
        if word in text:
            return {"prediction": "Fake", "confidence": None}
    return {"prediction": "Real", "confidence": None}