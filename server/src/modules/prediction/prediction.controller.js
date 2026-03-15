import * as predictionService from "./prediction.service.js";
import apiResponse from "./../../utils/apiResponse.js";

// Create a new Predcitons
export const createPrediction = async (req, res, next)=>{
    try {
        const { type, content } = req.body;

        // basic validation 
        if(!type || !content){
            return apiResponse.error(res, "Type and content are required", 400);
        }
        if (typeof content !== "string") {
            return res.status(400).json({
                success: false,
                message: "Content must be a string"
            });
            }
            console.log("REQ BODY:", req.body);
console.log("CONTENT TYPE:", typeof req.body.content);

        // user come
        const userId = req.user._id;

        const result = await predictionService.createPrediction(
            type,
            content,
            userId
        );
        
        return apiResponse.success(res, "Predction Created successfully", result);

    } catch (error) {
        next(error)
    }
};

// Get Users prediction 
export const getUserPredictions = async (req, res, next)=>{
    try {
        const userId = req.user._id;
        const predictions = await predictionService.getUserPredictions(userId);

        return apiResponse.success(
            res,
            "prediction fetched successfully",
            predictions
        );

    } catch (error) {
        next(error)
    }
};

// Delete prediction 
export const deletePrediction = async (req, res, next)=>{
    try {
        const {id} = req.params;
        const userId = req.user._id;

        await predictionService.deletePrediction(id, userId);

        return apiResponse.success(
            res,
            "prediction deleted successfully",
        );

    } catch (error) {
        next(error)
    }
};


