import { createContext, useState } from "react";
import { predictNews } from "../services/Api.js";

export const PredictionContext = createContext();
export const PredictionProvider = ({ children }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const detectNews = async (text) => {
  try {

    setLoading(true);

    const res = await predictNews({
      type: "text",
      content: text
    });

    // Normalize the response here
    setResult({
      prediction: res.data?.data?.result || "Unknown",
      confidence: res.data?.data?.confidence || null
    });

  } catch (error) {

    console.error("Prediction failed", error);

  } finally {

    setLoading(false);

  }
};
  return (
    <PredictionContext.Provider value={{result, loading, detectNews}}>
      {children}
    </PredictionContext.Provider>
  );
};