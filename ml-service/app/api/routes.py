from fastapi import APIRouter, HTTPException
from app.schemas.prediction_schema import PredictionRequest 
from app.services.prediction_service import predict_news

router = APIRouter(
    tags=["Prediction"]
)

@router.get("/health")
def health_check():
    return {"status": "ML service is running"}

@router.post("/predict")
def predict(request: PredictionRequest):
    try:
        result = predict_news(request.text)

        return {
            "success": True,
            "prediction": result["prediction"],
            "confidence": result["confidence"]
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )