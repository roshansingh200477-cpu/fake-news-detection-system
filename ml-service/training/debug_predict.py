# save as training/debug_predict.py
import joblib
from app.utils.text_preprocessing import clean_text

model = joblib.load("app/models/fake_news_model.pkl")
vectorizer = joblib.load("app/models/vectorizer.pkl")

articles = [
    ("NASA FAKE", "Scientists at NASA have confirmed that the moon will appear 10 times larger than normal next Friday due to a rare gravitational event that occurs only once every 500 years. Experts recommend staying indoors as the increased gravitational pull could cause dizziness. Share this with your family immediately."),
    ("BANK FAKE", "The government has quietly passed a new law allowing banks to freeze personal accounts without notice or court approval. The bill was signed late at night with no media coverage. Several senators who opposed the bill have since gone silent. Citizens are urged to withdraw their savings immediately."),
    ("FED REAL", "The Federal Reserve raised interest rates by 25 basis points on Wednesday, marking the tenth increase since March 2022. Federal Reserve Chair Jerome Powell stated that inflation remains above the target and that the committee will continue monitoring economic data before making further decisions."),
]

for label, text in articles:
    cleaned = clean_text(text)
    print(f"\n--- {label} ---")
    print(f"Cleaned text: {cleaned[:200]}")
    vec = vectorizer.transform([cleaned])
    proba = model.predict_proba(vec)[0]
    prediction = model.predict(vec)[0]
    print(f"REAL probability: {proba[0]:.3f}")
    print(f"FAKE probability: {proba[1]:.3f}")
    print(f"Prediction: {'FAKE' if prediction == 1 else 'REAL'}")