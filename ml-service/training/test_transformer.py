from transformers import pipeline

classifier = pipeline(
    "text-classification",
    model="GonzaloA/fake-news-detector"
)

articles = [
    ("NASA FAKE", "Scientists at NASA have confirmed that the moon will appear 10 times larger than normal next Friday due to a rare gravitational event that occurs only once every 500 years. Share this with your family immediately."),
    ("BANK FAKE", "The government has quietly passed a new law allowing banks to freeze personal accounts without notice or court approval. The bill was signed late at night with no media coverage. Citizens are urged to withdraw their savings immediately."),
    ("FED REAL", "The Federal Reserve raised interest rates by 25 basis points on Wednesday. Federal Reserve Chair Jerome Powell stated that inflation remains above the target and that the committee will continue monitoring economic data."),
]

for label, text in articles:
    result = classifier(text[:512])
    print(f"{label} → {result}")