import { createContext, useState } from "react";
import { predictNews } from "../services/Api.js";

export const PredictionContext = createContext();
export const PredictionProvider = ({ children }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const detectNews = async (text) => {
    setLoading(true);
    try {
      const res = await predictNews(text);
      setResult(res.data);
    } catch (error) {
      console.error("Prediction failed");
    }
    setLoading(false);
  };
  return (
    <PredictionContext.Provider value={{result, loading, detectNews}}>
      {children}
    </PredictionContext.Provider>
  );
};