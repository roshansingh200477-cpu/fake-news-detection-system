import re
import string
from typing import List
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# download required nltk data
try:
    stop_words = set(stopwords.words("english"))
except LookupError:
    nltk.download("stopwords")
    stop_words = set(stopwords.words("english"))

try:
    nltk.data.find("corpora/wordnet")
except LookupError:
    nltk.download("wordnet")

# use lemmatizer instead of stemmer
lemmatizer = WordNetLemmatizer()

def clean_text(text: str) -> str:
    text = text.lower()
    text = replace_urls(text)
    text = replace_numbers(text)
    text = remove_source_bias(text)   # ← add this line
    text = remove_punctuation(text)

    tokens = tokenize(text)
    tokens = remove_stopwords(tokens)
    tokens = lemmatize_tokens(tokens)

    return " ".join(tokens)

def replace_urls(text: str) -> str:
    return re.sub(r"http\S+|www\S+", " ", text)  # remove URL token too, not useful

def replace_numbers(text: str) -> str:
    return re.sub(r"\d+", " ", text)  # remove number token, just strip them

def remove_punctuation(text: str) -> str:
    return text.translate(str.maketrans("", "", string.punctuation))

def tokenize(text: str) -> List[str]:
    return text.split()

def remove_stopwords(tokens: List[str]) -> List[str]:
    return [word for word in tokens if word not in stop_words and len(word) > 2]
    #                                                              ^^^^^^^^^^^^
    #                                   also filters out 1-2 char noise tokens

def lemmatize_tokens(tokens: List[str]) -> List[str]:
    return [lemmatizer.lemmatize(word) for word in tokens]

def remove_source_bias(text: str) -> str:
    """Remove news source names that leak into the model."""
    sources = [
        "reuters", "breitbart", "new york times", "nyt", "washington post",
        "associated press", "the guardian", "bbc", "cnn", "fox news",
        "century wire", "image via", "via", "watch", "video",
        "share", "follow", "pic twitter", "twitter"
    ]
    for source in sources:
        text = re.sub(r'\b' + source + r'\b', '', text, flags=re.IGNORECASE)
    return text