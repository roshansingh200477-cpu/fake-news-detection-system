import { useContext } from "react";
import { PredictionContext } from "../context/PredictionContext";

const PredictionResult = () => {
  const { result, loading } = useContext(PredictionContext);

  if (loading) {
    return (
      <div className="mt-6 flex items-center justify-center gap-3 text-gray-400">
        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        Analyzing News...
      </div>
    );
  }

  if (!result) return null;

  const prediction = result.prediction;
  const isFake = prediction?.toLowerCase().includes("fake");
  const isReal = prediction?.toLowerCase().includes("real");

  // handle null, undefined, or 0 — show bar only if we have a number
  const confidence = typeof result.confidence === "number" ? result.confidence : null;
  const confidencePct = confidence !== null ? (confidence * 100).toFixed(1) : null;

  return (
    <div className="mt-8 max-w-3xl mx-auto rounded-2xl border shadow-2xl overflow-hidden"
      style={{
        borderColor: isFake ? "rgba(239,68,68,0.3)" : isReal ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.1)",
        background: isFake ? "rgba(239,68,68,0.05)" : isReal ? "rgba(52,211,153,0.05)" : "rgba(255,255,255,0.03)",
      }}
    >
      {/* top accent line */}
      <div className="h-1 w-full"
        style={{
          background: isFake
            ? "linear-gradient(to right, #ef4444, #f97316)"
            : isReal
            ? "linear-gradient(to right, #34d399, #22d3ee)"
            : "rgba(255,255,255,0.1)",
        }}
      />

      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
          Prediction Result
        </p>

        {/* verdict row */}
        <div className="flex items-center gap-4 mb-5">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
            isReal ? "bg-emerald-500/20" : isFake ? "bg-red-500/20" : "bg-gray-700"
          }`}>
            {isReal ? "✅" : isFake ? "🚨" : "🔍"}
          </div>
          <div>
            <p className="text-gray-400 text-sm">This article is likely:</p>
            <p className={`text-3xl font-black tracking-tight ${
              isReal ? "text-emerald-400" : isFake ? "text-red-400" : "text-yellow-400"
            }`}>
              {prediction}
            </p>
          </div>
        </div>

        {/* confidence bar */}
        {confidencePct !== null ? (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
                Confidence Score
              </span>
              <span className={`text-sm font-black ${
                isReal ? "text-emerald-400" : isFake ? "text-red-400" : "text-yellow-400"
              }`}>
                {confidencePct}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${confidencePct}%`,
                  background: isFake
                    ? "linear-gradient(to right, #ef4444, #f97316)"
                    : "linear-gradient(to right, #34d399, #22d3ee)",
                }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {confidence >= 0.85
                ? "High confidence — model is very sure"
                : confidence >= 0.65
                ? "Moderate confidence — treat with some caution"
                : "Low confidence — result may not be reliable"}
            </p>
          </div>
        ) : (
          <p className="text-xs text-gray-600 italic">Confidence score unavailable</p>
        )}
      </div>
    </div>
  );
};

export default PredictionResult;