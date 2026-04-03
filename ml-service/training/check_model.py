import joblib
import numpy as np

model = joblib.load("app/models/fake_news_model.pkl")
vectorizer = joblib.load("app/models/vectorizer.pkl")

feature_names = vectorizer.get_feature_names_out()

top_fake = np.argsort(model.coef_[0])[-30:]
print("Top words → FAKE:")
print([feature_names[i] for i in top_fake])

top_real = np.argsort(model.coef_[0])[:30]
print("\nTop words → REAL:")
print([feature_names[i] for i in top_real])