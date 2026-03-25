import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Fake News
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Detection System
            </span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            Our AI-powered Fake News Detection System analyzes news articles
            using machine learning to determine whether the information is
            reliable or potentially misleading. Paste any news content and
            instantly receive an intelligent prediction.
          </p>
          <p className="mt-4 text-gray-500">
            Built using <span className="text-emerald-400">React</span>,
            <span className="text-emerald-400"> Node.js</span>,
            <span className="text-emerald-400"> FastAPI</span> and
            <span className="text-emerald-400"> Machine Learning</span>.
          </p>
          {/* Detect Button */}
          <Link
            to="/DetectNews"
            className="inline-block mt-8 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-lg hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30"
          >
            Detect News
          </Link>
        </div>
        {/* Right Visual */}
        <div className="relative">
          <div className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-200 mb-4">
              How it works
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold">1.</span>
                Paste any news article or headline.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold">2.</span>
                Our AI model analyzes the content.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold">3.</span>
                Get an instant prediction: Real or Fake.
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold">4.</span>
                View results and prediction confidence.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
