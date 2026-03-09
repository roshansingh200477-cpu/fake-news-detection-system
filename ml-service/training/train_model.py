import os
import sys

# add project root to python path
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

from app.utils.text_preprocessing import clean_text


FAKE_DATA = "training/dataSet/Fake.csv"
REAL_DATA = "training/dataSet/True.csv"

MODEL_FOLDER = "app/models"


def load_dataset():

    print("Loading datasets...")

    fake_df = pd.read_csv(FAKE_DATA)
    real_df = pd.read_csv(REAL_DATA)

    fake_df["label"] = 1
    real_df["label"] = 0

    df = pd.concat([fake_df, real_df])

    df = df[["text", "label"]]

    df = df.dropna()

    return df


def main():

    df = load_dataset()

    print("Cleaning text...")

    df["clean_text"] = df["text"].apply(clean_text)

    X = df["clean_text"]
    y = df["label"]

    print("Vectorizing text...")

    vectorizer = TfidfVectorizer(max_features=5000)

    X_vectors = vectorizer.fit_transform(X)

    print("Splitting dataset...")

    X_train, X_test, y_train, y_test = train_test_split(
        X_vectors, y, test_size=0.2, random_state=42
    )

    print("Training model...")

    model = LogisticRegression()

    model.fit(X_train, y_train)

    accuracy = model.score(X_test, y_test)

    print(f"Model Accuracy: {accuracy:.2f}")

    print("Saving model...")

    os.makedirs(MODEL_FOLDER, exist_ok=True)

    joblib.dump(model, os.path.join(MODEL_FOLDER, "fake_news_model.pkl"))
    joblib.dump(vectorizer, os.path.join(MODEL_FOLDER, "vectorizer.pkl"))

    print("Training completed!")
    print("Model saved to app/models/")


if __name__ == "__main__":
    main()