from fastapi import FastAPI
from app.api.routes import router
from contextlib import asynccontextmanager
from app.services.prediction_service import load_model

@asynccontextmanager
async def lifespan(app: FastAPI):
    load_model()
    yield  # ← this was missing

app = FastAPI(
    title="Fake News Detection ML Service",
    description="API for detecting whether a news article is Fake or Real",
    version="1.0.0",
    lifespan=lifespan  # ← this was missing
)

@app.get("/")
def root():
    return {"message": "Fake News Detection ML Service is running"}

app.include_router(router, prefix="/api")