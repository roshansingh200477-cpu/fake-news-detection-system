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

    # combine title + text for original dataset
    fake_df["text"] = fake_df["title"].fillna("") + " " + fake_df["text"].fillna("")
    real_df["text"] = real_df["title"].fillna("") + " " + real_df["text"].fillna("")

    # load WELFake
    welfake_df = pd.read_csv("training/dataSet/WELFake_Dataset.csv")
    welfake_df["text"] = welfake_df["title"].fillna("") + " " + welfake_df["text"].fillna("")
    welfake_df = welfake_df[["text", "label"]]

    # combine all three
    df = pd.concat([fake_df[["text", "label"]], real_df[["text", "label"]], welfake_df])
    df = df.dropna().reset_index(drop=True)

    print(f"Total samples: {len(df)}")
    print(df["label"].value_counts())

    # strip reuters bylines
    df["text"] = df["text"].str.replace(
    r'^.*?\(Reuters\)\s*-\s*', '', regex=True
)

    return df


def main():

    df = load_dataset()
    

    print("Cleaning text...")

    df["clean_text"] = df["text"].apply(clean_text)

    X = df["clean_text"]
    y = df["label"]

    print("Vectorizing text...")

    vectorizer = TfidfVectorizer(
    max_features=10000,
    ngram_range=(1, 2),
    sublinear_tf=True,
    min_df=2
)

    X_vectors = vectorizer.fit_transform(X)

    print("Splitting dataset...")

    X_train, X_test, y_train, y_test = train_test_split(
        X_vectors, y, test_size=0.2, random_state=42
    )

    print("Training model...")

    model = LogisticRegression(max_iter=1000, class_weight="balanced")

    model.fit(X_train, y_train)

    from sklearn.metrics import classification_report

    accuracy = model.score(X_test, y_test)

    print(f"Model Accuracy: {accuracy:.2f}")
    print(classification_report(y_test, model.predict(X_test)))

    print("Saving model...")

    os.makedirs(MODEL_FOLDER, exist_ok=True)

    joblib.dump(model, os.path.join(MODEL_FOLDER, "fake_news_model.pkl"))
    joblib.dump(vectorizer, os.path.join(MODEL_FOLDER, "vectorizer.pkl"))

    print("Training completed!")
    print("Model saved to app/models/")


if __name__ == "__main__":
    main()