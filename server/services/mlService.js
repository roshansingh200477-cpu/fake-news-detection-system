import  axios from "axios";

const ML_API_URL = process.env.ML_API_URL;

export const predictFakeNews = async (text)=>{
    try {
        const response = await axios.post(process.env.ML_API_URL, {
            text: text
        });

        return response.data
    } catch (error) {
        console.error("ML service Error : ", error.message);
        throw new Error("Prediction service failed");        
    }
};