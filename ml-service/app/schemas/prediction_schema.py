from pydantic import BaseModel, Field

class PredictionRequest(BaseModel):
    # Schema for incoming prediction request

    text:str = Field(
        ...,
        min_length=10,
        example="Breaking shocking news about something unbelievalbe happening"
    )

class PredictionResponse(BaseModel):
    #Schema for prediction response

    success: bool
    prediction: str