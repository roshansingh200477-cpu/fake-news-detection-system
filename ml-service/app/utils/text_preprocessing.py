import re
import string
from typing import List
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

# Ensure stopwords exist
try:
    stop_words = set(stopwords.words("english"))
except LookupError:
    nltk.download("stopwords")
    stop_words = set(stopwords.words("english"))

# Initialize stemmer once
stemmer = PorterStemmer()

def clean_text(text: str) -> str:
    """
    Main preprocessing pipeline used before prediction.
    """

    text = text.lower()
    text = replace_urls(text)
    text = replace_numbers(text)
    text = remove_punctuation(text)

    tokens = tokenize(text)
    tokens = remove_stopwords(tokens)
    tokens = stem_tokens(tokens)

    return " ".join(tokens)

def replace_urls(text: str) -> str:
    """Replace URLs with a token."""
    return re.sub(r"http\S+|www\S+", " URL ", text)

def replace_numbers(text: str) -> str:
    """Replace numbers with a token."""
    return re.sub(r"\d+", " NUMBER ", text)

def remove_punctuation(text: str) -> str:
    """Remove punctuation characters."""
    return text.translate(str.maketrans("", "", string.punctuation))

def tokenize(text: str) -> List[str]:
    """Split text into tokens."""
    return text.split()

def remove_stopwords(tokens: List[str]) -> List[str]:
    """Remove common words that add little meaning."""
    return [word for word in tokens if word not in stop_words]

def stem_tokens(tokens: List[str]) -> List[str]:
    """Convert words to root form."""
    return [stemmer.stem(word) for word in tokens]