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
        const response = await axios.post(process.env.ML_API_URL, {
            text: processedText
        });

        console.log("ML RESPONSE:", response.data);

        result = response.data.prediction;
        confidence = response.data.confidence;

    } catch (error) {
        console.error("ML API ERROR:", error.message);

        const lowerText = processedText.toLowerCase();

        const fakeSignals = [
            "breaking", "urgent", "shocking", "bombshell", "explosive",
            "exclusive", "just in", "developing", "alert", "watch now",
            "share before deleted", "they don't want you to know",
            "mainstream media won't show", "spread the word",
            "share immediately", "before it's too late", "going viral",
            "banned", "censored", "must watch", "must read",
            "won't show you this", "before they delete",
            "what they're hiding", "cover up", "cover-up",
            "hidden truth", "they exposed", "obliterate",
            "savage", "rip apart", "slam",
            "outrage", "disgusting", "traitor", "corrupt politician",
            "rigged", "it's a hoax", "complete fraud", "criminal elite",
            "radical agenda", "deep state", "puppet government",
            "globalist", "regime", "invasion", "they are lying",
            "sources say", "insiders claim", "anonymous source confirms",
            "many people are saying", "scientists confirm",
            "according to sources close",
            "illuminati", "new world order", "microchip",
            "5g causes", "they are poisoning", "miracle cure",
            "doctors don't want you", "big pharma hiding",
            "secret society", "false flag", "crisis actor",
            "staged attack", "government is hiding",
            "you won't believe", "this will shock you",
            "share with everyone you know", "wake up people",
            "sheeple", "plandemic", "scamdemic",
        ];

        const realSignals = [
            "reuters", "associated press", "according to officials",
            "confirmed by", "said in a statement", "press conference",
            "official statement", "spokesperson said",
            "verified by", "fact checked", "peer reviewed",
        ];

        const fakeScore = fakeSignals.filter(signal => lowerText.includes(signal)).length;
        const realScore = realSignals.filter(signal => lowerText.includes(signal)).length;
        const netScore = fakeScore - realScore;
        result = netScore >= 1 ? "Fake" : "Real";
    }

    // only save to DB if user is logged in
    if (userId) {
        const prediction = await Prediction.create({
            user: userId,
            type,
            content: processedText,
            result,
            confidence
        });
        return prediction;
    }

    // guest — return result without saving
    return { result, confidence };
};

export const getUserPredictions = async(userId)=>{
    return await Prediction.find({user: userId}).sort({createdAt: -1});
};

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