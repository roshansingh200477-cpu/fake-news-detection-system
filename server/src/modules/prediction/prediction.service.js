import axios from "axios";
import Prediction from "./prediction.model.js";

export const createPrediction = async (type, content, userId) => {

    let processedText = content;

    if (!processedText || typeof processedText !== "string") {
        throw new Error("Content must be a string");
    }

    let result = "Unknown";
    let confidence = null;

    try {
        // 🔥 CALL FASTAPI ML SERVICE
        const response = await axios.post(process.env.ML_API_URL, {
            text: processedText
        });

        console.log("ML RESPONSE:", response.data);

        result = response.data.prediction;       // "Fake" or "Real"
        confidence = response.data.confidence;   // e.g. 0.92

    } catch (error) {
        console.error("ML API ERROR:", error.message);

        // fallback (optional)
        const lowerText = processedText.toLowerCase();
        const isFake = lowerText.includes("shocking") || lowerText.includes("breaking");
        result = isFake ? "Fake" : "Real";
    }

    const prediction = await Prediction.create({
        user: userId,
        type,
        content: processedText,
        result,
        confidence
    });

    return prediction;
};

// Get User Prediction
export const getUserPredictions = async(userId)=>{
    return await Prediction.find({user: userId}).sort({createdAt: -1});
};

// Deleting the Predicton
export const deletePrediction = async (predictionId, userId) =>{
    const prediction = await Prediction.findOne({
        _id: predictionId,
        user: userId
    });

    if(!prediction){
        throw new Error("Prediction is not Found");
    }
    await prediction.deleteOne();

    return;
};
