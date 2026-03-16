import { useContext } from "react";
import { PredictionContext } from "../context/PredictionContext";

const PredictionResult = () => {

    const { result, loading } = useContext(PredictionContext);

    if (loading) {
        return (
            <div className="mt-6 text-center text-gray-400">
                Analazing News...
            </div>
        );
    }

    if (!result) {
        return null;
    }

    const prediction = result.prediction;
    const isFake = prediction === "Fake";

    return (
        <div className="mt-8 max-w-3xl mx-auto p-6 bg-gray-900 rounded-xl shadow-lg">

            <h2 className="text-xl font-bold text-white mb-4">
                Prediction Result
            </h2>

            <div className="flex items-center justify-between">
                <p className="text-lg text-gray-300">
                    This News appears to be:
                </p>

                <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    isFake
                        ? "bg-red-500/20 text-red-400"
                        : "bg-green-500/20 text-green-400"
                }`}>
                    {prediction}
                </span>
            </div>

            {result.confidence && (
                <p className="mt-3 text-white-800">
                    Confidence: {(result.confidence * 100).toFixed(2)}%
                </p>
            )}

        </div>
    );
};

export default PredictionResult;