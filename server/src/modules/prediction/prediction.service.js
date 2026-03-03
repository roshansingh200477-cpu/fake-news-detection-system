import Prediction from "./prediction.model.js";

// Create Prediction 
export const createPrediction = async (type, content, userId) =>{

    // convert everything into text 
    let processedText = content;

    if(type === "url"){
        // just saving the url as content right now
        processedText = content;
    }

    if(type === "text"){
        processedText = content;
    }

    // fake ML logic now temprory we will change later
    const lowerText = processedText.toLowerCase();

    const isFake = lowerText.includes("shocking") || lowerText.includes("breaking") || lowerText.includes("viral");
    const result = isFake ? "Fake" : "Real";

    // now we will save to the database
    const prediction = await Prediction.create({
        user : userId,
        type,
        content: processedText,
        result,
    });
    return prediction;
}

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
