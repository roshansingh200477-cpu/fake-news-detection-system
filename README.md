# Verifeye — Fake News Detection System

<div align="center">

![Verifeye](https://img.shields.io/badge/Verifeye-Fake%20News%20Detection-1a56db?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live-22c55e?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-f59e0b?style=for-the-badge)

**An AI-powered full-stack web application that detects fake news in real time using Machine Learning and Natural Language Processing.**

[🌐 Live Demo](https://verifeye-lac.vercel.app) • [📁 Frontend](./client) • [⚙️ Backend](./server) • [🤖 ML Service](./ml-service)

</div>

---

## 📌 Overview

Verifeye is a production-deployed, microservices-based fake news detection system. Users can submit any news article or text snippet and receive an instant **Real** or **Fake** verdict powered by a trained ML model.

Built as a final year undergraduate project, Verifeye demonstrates a complete software development lifecycle — from system design and development to cloud deployment and DevOps — using modern industry-standard technologies.

> ⚠️ **Note:** This project is actively being improved. The current version is a working MVP. Several features and enhancements are planned for future releases — see the [Future Scope](#-future-scope) section below.

---

## 🏗️ Architecture

Verifeye follows a **Microservices Architecture** with 3 independently deployed services:

```
┌─────────────────────────────────────────────────────────┐
│                     USER (Browser)                       │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTPS
┌─────────────────────▼───────────────────────────────────┐
│           REACT FRONTEND (Vercel)                        │
│           verifeye-lac.vercel.app                        │
│           React + Tailwind CSS                           │
└─────────────────────┬───────────────────────────────────┘
                      │ REST API + JWT
┌─────────────────────▼───────────────────────────────────┐
│           EXPRESS BACKEND (Render)                       │
│           Node.js + Express.js                           │
│           Auth • Predictions • Business Logic            │
└──────────┬──────────────────────────┬───────────────────┘
           │ Mongoose ODM             │ HTTP POST /predict
┌──────────▼──────────┐   ┌──────────▼───────────────────┐
│   MONGODB ATLAS     │   │   FASTAPI ML SERVICE (Render) │
│   Cloud Database    │   │   Python + scikit-learn       │
│   Users•Predictions │   │   TF-IDF + Classification     │
└─────────────────────┘   └──────────────────────────────┘
```

---

## ✨ Features

- 🔐 **Secure Authentication** — JWT-based login and registration with bcrypt password hashing
- 🤖 **AI-Powered Detection** — NLP pipeline using TF-IDF vectorization and a trained ML classifier
- ⚡ **Real-Time Results** — Instant fake/real verdict with confidence score
- 📊 **Prediction History** — Every analysis is saved and accessible per user
- 📱 **Responsive UI** — Works seamlessly on desktop, tablet, and mobile
- 🛡️ **Production Security** — Rate limiting, CORS, input validation, environment-based config

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI components and SPA |
| Tailwind CSS | Utility-first styling |
| React Router DOM | Client-side navigation |
| Axios | HTTP requests with interceptors |
| React Context API | Global auth state management |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Server runtime |
| Express.js | REST API framework |
| MongoDB + Mongoose | Database and ODM |
| JSON Web Tokens (JWT) | Authentication |
| bcryptjs | Password hashing |
| express-validator | Input validation |
| express-rate-limit | Brute force protection |

### ML Service
| Technology | Purpose |
|---|---|
| Python 3 | ML service language |
| FastAPI | ML API framework |
| scikit-learn | Model training and inference |
| TF-IDF Vectorizer | Text feature extraction |
| NLTK | Stopword removal |
| Uvicorn | ASGI server |

### DevOps & Deployment
| Tool | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend + ML service hosting |
| MongoDB Atlas | Cloud database |
| UptimeRobot | Service uptime monitoring |
| GitHub | Version control + CI/CD |

---

## 📁 Project Structure

```
fake-news-detection-system/
│
├── client/                     # React + Tailwind Frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── NavBar.jsx
│   │   │   ├── NewsForm.jsx
│   │   │   └── PredictionResult.jsx
│   │   ├── pages/              # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── DetectNews.jsx
│   │   │   ├── Login.jsx
│   │   │   └── SignUp.jsx
│   │   ├── context/
│   │   │   └── AuthContext.js  # Global auth state
│   │   └── services/
│   │       └── Api.js          # Axios instance + API calls
│   └── package.json
│
├── server/                     # Node.js + Express Backend
│   ├── middleware/
│   │   ├── auth.middleware.js  # JWT verification
│   │   └── error.middleware.js # Validation error handler
│   ├── modules/
│   │   └── auth/
│   │       ├── auth.model.js
│   │       ├── auth.controller.js
│   │       ├── auth.service.js
│   │       └── auth.routes.js
│   └── package.json
│
└── ml-service/                 # Python FastAPI ML Service
    ├── app/
    │   ├── main.py             # FastAPI entry point
    │   ├── api/                # Route definitions
    │   ├── models/             # ML model loading
    │   ├── services/           # Prediction pipeline
    │   ├── schemas/            # Pydantic models
    │   └── utils/              # Helper functions
    ├── training/               # Model training scripts
    └── requirements.txt
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Python 3.9+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the Repository
```bash
git clone https://github.com/roshansingh200477-cpu/fake-news-detection-system.git
cd fake-news-detection-system
```

### 2. Setup ML Service
```bash
cd ml-service
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 3. Setup Backend
```bash
cd server
npm install
```
Create a `.env` file in the `server/` directory:
```env
MONGO_URL=your_mongodb_connection_string
ML_API_URL=http://localhost:8000/predict
JWT_SECRET=your_jwt_secret_key
PORT=5000
```
```bash
npm run dev
```

### 4. Setup Frontend
```bash
cd client
npm install
```
Create a `.env` file in the `client/` directory:
```env
REACT_APP_HOST=http://localhost:5000
```
```bash
npm start
```

The app will be running at `http://localhost:3000` ✅

---

## 🌐 Live Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | [verifeye-lac.vercel.app](https://verifeye-lac.vercel.app) |
| Backend API | Render | verifeye-server-98jg.onrender.com |
| ML Service | Render | verifeye-zur5.onrender.com |
| Database | MongoDB Atlas | Cloud hosted |

---

## 🔌 API Endpoints

### Auth Routes
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/createUser` | Register new user | No |
| POST | `/api/auth/loginUser` | Login and get JWT token | No |
| GET | `/api/auth/getUser` | Get current user profile | Yes |

### Prediction Routes
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/predictions` | Submit text for analysis | Yes |

---

## 🤖 How the ML Pipeline Works

```
Raw News Text
      ↓
Text Preprocessing
(lowercase → remove punctuation → remove stopwords)
      ↓
TF-IDF Vectorization
(converts text to numerical feature vector)
      ↓
ML Classifier
(trained on labeled real/fake news dataset)
      ↓
Prediction: REAL ✅ or FAKE ❌ + Confidence Score
```

---

## 🔮 Future Scope

> This project is a working MVP and is far from its final form. The goal is to keep improving Verifeye into a truly robust, production-grade misinformation detection platform. Here's what's planned:

### 🌍 Multilingual Support
Retrain the model on Hindi, Urdu, Tamil, Bengali, and other Indian languages — because most misinformation in India spreads in regional languages, not English.

### 🔗 URL-Based Detection
Allow users to paste a news article URL instead of copying text. The system will automatically scrape and analyze the article using libraries like BeautifulSoup or Newspaper3k.

### 🧠 Deep Learning Models
Replace or supplement the current classical ML model with transformer-based models like **BERT** or **RoBERTa** — which understand context, semantics, and sentence structure far better than TF-IDF.

### 🔍 Explainability (XAI)
Show users *why* the model made its decision — highlighting which specific words or phrases contributed most to the verdict using techniques like **LIME** or **SHAP values**.

### 🌐 Browser Extension
Build a Chrome/Firefox extension so users can fact-check any article they are reading with one click — without leaving the page.

### 📱 Mobile Application
A React Native app sharing the same backend, bringing Verifeye to Android and iOS with features like OCR-based article scanning using the phone camera.

### 🛠️ Admin Dashboard
An internal admin panel for monitoring users, reviewing predictions, managing the database, viewing analytics, and triggering model retraining.

### 🤝 Ensemble Models
Combine multiple ML models (Naive Bayes, Random Forest, Logistic Regression, BERT) and use weighted voting for more reliable, accurate predictions.

### 📡 Social Media Integration
Extend detection to analyze tweets, Facebook posts, and WhatsApp-forwarded messages — the primary vectors of misinformation today.

### ✅ Source Credibility Check
Integrate external APIs to verify the credibility of the news source — checking domain reputation, publication history, and known bias ratings.

---

## ⚠️ Known Limitations

- ML model accuracy is not 100% — may produce false positives/negatives on satire or opinion pieces
- Currently supports English language only
- Hosted on free tiers — may have occasional cold start delays on Render
- No URL-based fetching — users must manually paste text
- No explainability — verdict is given without showing reasoning

---

## 👨‍💻 Developer

**Roshan Singh**
Final Year BCA Student — IGNOU

> Built Verifeye from scratch — system design, frontend, backend, ML pipeline, and full cloud deployment across 4 platforms.

---

## 📄 License

This project is licensed under the MIT License.

---

<div align="center">

**⭐ If you found this project useful, please consider giving it a star!**

Made with ❤️ by Roshan Singh

</div>
