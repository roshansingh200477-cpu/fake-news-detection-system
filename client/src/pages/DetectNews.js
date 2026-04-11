import React, { useContext, useEffect, useState } from 'react'
import NewsForm from '../components/NewsForm'
import PredictionResult from '../components/PredictionResult'
import { AuthContext } from '../context/AuthContext'

const floatingIcons = [
  { icon: "🔍", size: "text-5xl", x: 5,  y: 10, duration: 7,  delay: 0 },
  { icon: "📰", size: "text-6xl", x: 90, y: 8,  duration: 9,  delay: 1 },
  { icon: "🧠", size: "text-4xl", x: 78, y: 65, duration: 8,  delay: 2 },
  { icon: "⚡", size: "text-3xl", x: 12, y: 70, duration: 6,  delay: 0.5 },
  { icon: "🔎", size: "text-7xl", x: 48, y: 3,  duration: 10, delay: 3 },
  { icon: "📡", size: "text-4xl", x: 93, y: 40, duration: 7,  delay: 1.5 },
  { icon: "🤖", size: "text-5xl", x: 3,  y: 42, duration: 9,  delay: 2.5 },
  { icon: "📊", size: "text-3xl", x: 62, y: 88, duration: 8,  delay: 0.8 },
  { icon: "🛡️", size: "text-4xl", x: 28, y: 85, duration: 7,  delay: 3.5 },
  { icon: "💡", size: "text-3xl", x: 83, y: 80, duration: 6,  delay: 1.2 },
  { icon: "🔬", size: "text-5xl", x: 20, y: 22, duration: 11, delay: 4 },
  { icon: "📌", size: "text-3xl", x: 70, y: 28, duration: 8,  delay: 2 },
];

const DetectNews = () => {
  const { loading } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-hidden">

      <style>{`
        @keyframes float {
          from { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          to   { transform: translateY(-28px) translateX(8px); opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
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

      {/* page content */}
      <div
        className="relative z-10"
        style={{ opacity: 0, animation: visible ? "fadeUp 0.7s ease forwards" : "none" }}
      >
        {/* form + result — NewsForm has its own header so no duplicate here */}
        <NewsForm />
        <PredictionResult />
      </div>

    </div>
  );
}

export default DetectNews