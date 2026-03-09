from fastapi import FastAPI
from app.api.routes import router
from contextlib import asynccontextmanager
from app.services.prediction_service import load_model

app = FastAPI(
    title="Fake News Detection ML Service",
    description="API for detecting whether a news article is Fake or Real",
    version="1.0.0"
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Runs when the FastAPI application starts.
    Used to load ML models into memory.
    """
    load_model()

@app.get("/")
def root():
    # Root endpoint to verify the service is running.
    return {"message": "Fake News Detection ML Service is running"}

    # Register API routes
app.include_router(router, prefix="/api")