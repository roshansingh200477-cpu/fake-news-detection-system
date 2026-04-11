import { useContext, useState } from "react";
import { PredictionContext } from "../context/PredictionContext";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const NewsForm = () => {
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const { detectNews, result, loading } = useContext(PredictionContext);
  const { user } = useContext(AuthContext);

  const usedCount = parseInt(localStorage.getItem("guestDetections") || "0");
  const remaining = Math.max(0, 3 - usedCount);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      alert("Please enter a news article");
      return;
    }
    await detectNews(text);
  };

  const isReal = result?.prediction?.toLowerCase().includes("real");
  const isFake = result?.prediction?.toLowerCase().includes("fake");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            AI-Powered Detection
          </div>
          <h1 className="text-5xl font-black text-white tracking-tight leading-tight">
            Fake News{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Detector
            </span>
          </h1>
          <p className="mt-3 text-gray-400 text-base max-w-md mx-auto">
            Paste any news article below and let our model analyze its credibility instantly.
          </p>
        </div>

        {/* Guest free limit banner */}
        {!user && (
          <div className="mb-5 px-4 py-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 text-lg">⚡</span>
              <span className="text-yellow-300 text-xs font-semibold">
                {remaining > 0
                  ? `${remaining} free detection${remaining > 1 ? "s" : ""} remaining — sign up for unlimited access`
                  : "Free limit reached — create an account to continue"}
              </span>
            </div>
            <Link
              to="/SignUp"
              className="text-xs text-yellow-300 hover:text-white border border-yellow-500/40 hover:border-yellow-400 px-3 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              Sign up free →
            </Link>
          </div>
        )}

        {/* Card */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl shadow-black/50 p-6 transition-all duration-300">

          {/* Glow effect when focused */}
          <div
            className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
              focused ? "opacity-100" : "opacity-0"}`}
            style={{ boxShadow: "0 0 60px rgba(52, 211, 153, 0.08)" }}
          />

          <form onSubmit={handleSubmit} className="relative z-10">

            {/* Textarea label */}
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
              News Article
            </label>

            <div className={`relative rounded-xl border transition-all duration-300 ${
              focused
                ? "border-emerald-500/60 shadow-lg shadow-emerald-500/10"
                : "border-white/10 hover:border-white/20"
            }`}>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Paste a news article here..."
                rows={12}
                className="w-full bg-transparent rounded-xl px-5 py-4 text-gray-100 text-base leading-relaxed placeholder-gray-600 resize-none outline-none transition-all duration-200"
                style={{ minHeight: "280px" }}
              />

              {/* Char count */}
              <div className="absolute bottom-3 right-4 text-xs text-gray-600 select-none">
                {text.length} chars
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`mt-5 w-full relative overflow-hidden rounded-xl py-4 px-6 font-bold text-base tracking-wide transition-all duration-300 group
                ${loading
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-400 hover:to-cyan-400 hover:shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-0.5 active:translate-y-0"
                }`}
            >
              {!loading && (
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              )}

              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Analyzing article...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Detect News
                  </>
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Result Card */}
        {result && (
          <div className={`mt-5 rounded-2xl border p-6 transition-all duration-500 animate-fade-in
            ${isReal
              ? "border-emerald-500/40 bg-emerald-500/10"
              : isFake
              ? "border-red-500/40 bg-red-500/10"
              : "border-white/10 bg-white/5"
            }`}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Prediction Result
            </p>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0
                ${isReal ? "bg-emerald-500/20" : isFake ? "bg-red-500/20" : "bg-gray-700"}`}>
                {isReal ? "✅" : isFake ? "🚨" : "🔍"}
              </div>
              <div>
                <p className="text-gray-300 text-sm">This article is likely:</p>
                <p className={`text-2xl font-black tracking-tight
                  ${isReal ? "text-emerald-400" : isFake ? "text-red-400" : "text-yellow-400"}`}>
                  {result.prediction}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default NewsForm;