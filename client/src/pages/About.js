import React, { useEffect, useState, useRef } from "react";

const techStack = [
  { icon: "⚛️", name: "React", role: "Frontend" },
  { icon: "🎨", name: "Tailwind", role: "Styling" },
  { icon: "🟢", name: "Node.js", role: "Runtime" },
  { icon: "🚂", name: "Express", role: "API Server" },
  { icon: "🍃", name: "MongoDB", role: "Database" },
  { icon: "🐍", name: "FastAPI", role: "ML Service" },
];

const steps = [
  {
    num: "01",
    title: "Submit Article or Text",
    desc: "Paste any news article, headline, or text snippet into the Verifeye detection interface.",
  },
  {
    num: "02",
    title: "ML Analysis via FastAPI",
    desc: "The text is processed through our NLP pipeline — tokenized, cleaned, and passed through a trained machine learning model for classification.",
  },
  {
    num: "03",
    title: "Instant Verdict",
    desc: "Receive a clear Real or Fake classification with confidence indicators, stored securely in your prediction history.",
  },
];

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

const About = () => {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -6;
    const rotateY = ((x - rect.width / 2) / rect.width) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01,1.01,1.01)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-[#e8eaf0] font-sans overflow-x-hidden">

      <style>{`
        @keyframes float {
          from { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          to   { transform: translateY(-28px) translateX(8px); opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .card-3d { transition: transform 0.15s ease; }
        .fade-up    { animation: fadeUp    0.7s ease forwards; }
        .fade-right { animation: fadeRight 0.7s ease forwards; }
        .fade-left  { animation: fadeLeft  0.7s ease forwards; }
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
      <div className="fixed top-20 left-10 w-72 h-72 bg-blue-500/8 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-green-500/6 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">

        {/* HERO */}
        <div
          className="text-center py-16"
          style={{ opacity: 0, animation: visible ? "fadeUp 0.7s ease forwards" : "none" }}
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-blue-400 text-xs tracking-widest uppercase font-medium">Final Year Project</span>
          </div>
          <p className="text-[#4a5568] text-sm tracking-[4px] uppercase font-semibold mb-2">
            Fake News Detection System
          </p>
          <h1 className="text-7xl md:text-8xl font-extrabold tracking-tighter leading-none mb-6">
            Veri<span className="bg-gradient-to-br from-blue-400 to-green-300 bg-clip-text text-transparent">feye</span>
          </h1>
          <p className="max-w-xl mx-auto text-[#a0aec0] text-lg leading-relaxed font-light">
            An intelligent platform that leverages machine learning to detect and classify
            misinformation in real-time — helping users make informed decisions about the
            content they consume.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent my-12" />

        {/* MISSION */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div style={{ opacity: 0, animation: visible ? "fadeRight 0.7s 0.2s ease forwards" : "none" }}>
            <p className="text-blue-400 text-xs tracking-[3px] uppercase font-semibold mb-4">Our Mission</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-5">
              Fighting Misinformation with Intelligence
            </h2>
            <p className="text-[#a0aec0] leading-relaxed font-light mb-4">
              In a world flooded with information, distinguishing fact from fiction has never
              been harder. Verifeye was built to address this growing challenge using the
              power of Natural Language Processing and Machine Learning.
            </p>
            <p className="text-[#a0aec0] leading-relaxed font-light">
              By analyzing linguistic patterns and contextual cues, Verifeye delivers
              instant, reliable verdicts on any news article or text snippet.
            </p>
          </div>

          <div
            className="grid grid-cols-2 gap-4"
            style={{ opacity: 0, animation: visible ? "fadeLeft 0.7s 0.3s ease forwards" : "none" }}
          >
            {[
              { num: "ML",  label: "Powered" },
              { num: "NLP", label: "Based" },
              { num: "3",   label: "Services" },
              { num: "RT",  label: "Real-Time" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center hover:bg-blue-500/10 hover:border-blue-500/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl font-extrabold bg-gradient-to-br from-blue-400 to-green-300 bg-clip-text text-transparent leading-none mb-2">
                  {s.num}
                </div>
                <div className="text-xs text-[#4a5568] tracking-widest uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TECH STACK */}
        <div
          className="mb-20"
          style={{ opacity: 0, animation: visible ? "fadeUp 0.7s 0.4s ease forwards" : "none" }}
        >
          <p className="text-blue-400 text-xs tracking-[3px] uppercase font-semibold mb-3">Technology</p>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Built with Modern Stack</h2>
          <p className="text-[#a0aec0] font-light mb-8">
            A full-stack microservices architecture combining the best of web and AI technologies.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {techStack.map((t) => (
              <div
                key={t.name}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 text-center hover:bg-blue-500/[0.08] hover:border-blue-500/20 hover:-translate-y-1 transition-all duration-300 cursor-default group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{t.icon}</div>
                <div className="text-sm font-bold mb-1">{t.name}</div>
                <div className="text-[10px] text-[#4a5568] tracking-widest uppercase">{t.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div
          className="mb-20"
          style={{ opacity: 0, animation: visible ? "fadeUp 0.7s 0.5s ease forwards" : "none" }}
        >
          <p className="text-blue-400 text-xs tracking-[3px] uppercase font-semibold mb-3">Process</p>
          <h2 className="text-3xl font-bold tracking-tight mb-2">How Verifeye Works</h2>
          <p className="text-[#a0aec0] font-light mb-8">
            A seamless three-step pipeline from input to intelligent verdict.
          </p>
          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <div key={step.num} className="flex gap-6 items-start relative group">
                {i < steps.length - 1 && (
                  <div className="absolute left-5 top-12 w-0.5 h-full bg-gradient-to-b from-blue-500/30 to-transparent" />
                )}
                <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-sm font-bold flex-shrink-0 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                  {step.num}
                </div>
                <div className="pb-8">
                  <h3 className="font-bold text-base mb-1 group-hover:text-blue-300 transition-colors duration-300">{step.title}</h3>
                  <p className="text-sm text-[#718096] leading-relaxed font-light">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DEVELOPER */}
        <div
          ref={cardRef}
          className="card-3d mb-12"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ opacity: 0, animation: visible ? "fadeUp 0.7s 0.6s ease forwards" : "none" }}
        >
          <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-3xl p-10 flex flex-col sm:flex-row gap-8 items-center overflow-hidden">
            {/* card glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-green-500/5 pointer-events-none rounded-3xl" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-green-300 flex items-center justify-center text-[#0a0e17] text-3xl font-extrabold flex-shrink-0 shadow-lg shadow-blue-500/20">
              R
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-1">Roshan Singh</h3>
              <p className="text-blue-400 text-xs tracking-widest uppercase font-medium mb-3">
                Full Stack Developer
              </p>
              <p className="text-sm text-[#a0aec0] leading-relaxed font-light">
                Designed and developed Verifeye as a final year project, integrating a React
                frontend, Node.js/Express backend, FastAPI ML microservice, and MongoDB database
                into a cohesive full-stack application focused on combating misinformation.
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER NOTE */}
        <div
          className="text-center py-4"
          style={{ opacity: 0, animation: visible ? "fadeUp 0.7s 0.7s ease forwards" : "none" }}
        >
          <p className="text-sm text-[#2d3748]">
            Built with ❤️ by <span className="text-blue-400">Roshan Singh</span> · Fake News Detection System · 2026
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;