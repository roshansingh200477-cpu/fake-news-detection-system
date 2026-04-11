import { createContext, useState } from "react";
import { predictNews } from "../services/Api.js";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const PredictionContext = createContext();

const FREE_LIMIT = 3;

export const PredictionProvider = ({ children }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const detectNews = async (text) => {

    // guest free limit check
    if (!user) {
      const usedCount = parseInt(localStorage.getItem("guestDetections") || "0");

      if (usedCount >= FREE_LIMIT) {
        navigate("/SignUp");
        return;
      }

      localStorage.setItem("guestDetections", String(usedCount + 1));
    }

    try {
      setLoading(true);

      const res = await predictNews({
        type: "text",
        content: text
      });

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
    <PredictionContext.Provider value={{ result, loading, detectNews }}>
      {children}
    </PredictionContext.Provider>
  );
};