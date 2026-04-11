import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const floatingIcons = [
  { icon: "🔍", size: "text-5xl", x: 8,  y: 15, duration: 7,  delay: 0 },
  { icon: "📰", size: "text-6xl", x: 88, y: 10, duration: 9,  delay: 1 },
  { icon: "🧠", size: "text-4xl", x: 75, y: 70, duration: 8,  delay: 2 },
  { icon: "⚡", size: "text-3xl", x: 15, y: 75, duration: 6,  delay: 0.5 },
  { icon: "🔎", size: "text-7xl", x: 50, y: 5,  duration: 10, delay: 3 },
  { icon: "📡", size: "text-4xl", x: 92, y: 45, duration: 7,  delay: 1.5 },
  { icon: "🤖", size: "text-5xl", x: 5,  y: 45, duration: 9,  delay: 2.5 },
  { icon: "📊", size: "text-3xl", x: 60, y: 85, duration: 8,  delay: 0.8 },
  { icon: "🛡️", size: "text-4xl", x: 30, y: 88, duration: 7,  delay: 3.5 },
  { icon: "💡", size: "text-3xl", x: 82, y: 82, duration: 6,  delay: 1.2 },
  { icon: "🔬", size: "text-5xl", x: 22, y: 25, duration: 11, delay: 4 },
  { icon: "📌", size: "text-3xl", x: 68, y: 30, duration: 8,  delay: 2 },
];

const stats = [
  { label: "Articles Analyzed", value: "50K+" },
  { label: "Model Accuracy", value: "97%" },
  { label: "Avg Response", value: "<1s" },
];

const steps = [
  { number: "01", title: "Paste Article",  desc: "Drop any news article, headline, or text snippet into the detector.", icon: "📋" },
  { number: "02", title: "AI Analysis",    desc: "Our NLP pipeline cleans, vectorizes, and runs the text through the ML model.", icon: "🧠" },
  { number: "03", title: "Get Verdict",    desc: "Receive an instant Real or Fake prediction with a confidence score.", icon: "✅" },
  { number: "04", title: "Track History",  desc: "Every prediction is saved to your account for future reference.", icon: "📊" },
];

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const cardRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-hidden">

      <style>{`
        @keyframes float {
          from { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          to   { transform: translateY(-30px) translateX(10px); opacity: 1; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideRight {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .card-3d { transition: transform 0.15s ease; }
        .animate-fade-up    { animation: fadeSlideUp 0.7s ease forwards; }
        .animate-fade-right { animation: fadeSlideRight 0.7s ease forwards; }
      `}</style>

      {/* floating emoji background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {floatingIcons.map((item, i) => (
          <div
            key={i}
            className={`absolute ${item.size} select-none`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              opacity: 0.07,
              animation: `float ${item.duration}s ${item.delay}s ease-in-out infinite alternate`,
              filter: "blur(0.5px)",
            }}
          >
            {item.icon}
          </div>
        ))}
      </div>

      {/* background orbs */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "2s" }} />

      {/* HERO */}
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 grid md:grid-cols-2 gap-16 items-center">

        {/* left */}
        <div style={{ opacity: 0 }} className={visible ? "animate-fade-right" : ""}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            AI Powered · Live
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Fake News
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Detection System
            </span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            Our AI-powered system analyzes news articles using machine learning
            to determine whether information is reliable or potentially misleading.
            Paste any news content and instantly receive an intelligent prediction.
          </p>

          <p className="mt-4 text-gray-500 text-sm">
            Built using{" "}
            {["React", "Node.js", "FastAPI", "Machine Learning"].map((t, i) => (
              <span key={i} className="text-emerald-400">{t}{i < 3 ? ", " : "."}</span>
            ))}
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/DetectNews"
              className="relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-semibold text-lg hover:from-emerald-400 hover:to-cyan-400 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Detect News</span>
              <svg className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <Link
              to="/About"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 rounded-xl font-semibold text-lg text-gray-300 hover:border-emerald-500/40 hover:text-emerald-400 hover:-translate-y-1 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>

          {/* stats */}
          <div className="flex gap-8 mt-10">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* right — 3D tilt card */}
        <div
          ref={cardRef}
          className="card-3d"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ opacity: 0, animation: visible ? "fadeSlideUp 0.7s 0.2s ease forwards" : "none" }}
        >
          <div className="relative bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 pointer-events-none" />

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-200">How it works</h3>
              <div className="flex gap-1">
                {steps.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === activeStep ? "w-6 bg-emerald-400" : "w-1.5 bg-white/20"}`} />
                ))}
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 p-3 rounded-xl transition-all duration-500 ${
                    i === activeStep
                      ? "bg-emerald-500/10 border border-emerald-500/20"
                      : "border border-transparent"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-all duration-300 ${
                    i === activeStep ? "bg-emerald-500/20 scale-110" : "bg-white/5"
                  }`}>
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-500/60">{step.number}</span>
                      <p className={`font-semibold text-sm transition-colors duration-300 ${i === activeStep ? "text-white" : "text-gray-400"}`}>
                        {step.title}
                      </p>
                    </div>
                    <p className={`text-xs mt-0.5 transition-colors duration-300 ${i === activeStep ? "text-gray-300" : "text-gray-600"}`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TECH STACK STRIP */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="border border-white/10 rounded-2xl p-6 bg-white/3 backdrop-blur">
          <p className="text-xs text-gray-500 uppercase tracking-widest text-center mb-5 font-semibold">Powered By</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "FastAPI", "scikit-learn", "TF-IDF", "Python"].map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-gray-400 text-sm hover:border-emerald-500/40 hover:text-emerald-400 hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;