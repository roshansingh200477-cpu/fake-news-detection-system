import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

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

const InputField = ({ label, type, placeholder, value, onChange, show, onToggle }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{label}</label>
    <div className="relative group">
      <input
        type={show !== undefined ? (show ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-600 text-sm outline-none transition-all duration-300 focus:border-emerald-500/60 focus:bg-white/8 focus:shadow-lg focus:shadow-emerald-500/10 hover:border-white/20"
      />
      {onToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors text-xs"
        >
          {show ? "HIDE" : "SHOW"}
        </button>
      )}
    </div>
  </div>
);

const SignUp = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [show, setShow] = useState({ password: false, confirm: false });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const toggle = (key) => () => setShow({ ...show, [key]: !show[key] });

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  // 🔹 Handle Signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SIGNUP SUBMITTED", form);

    if (form.password !== form.confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      await signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      navigate("/");
    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4 overflow-hidden">

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

      {/* card */}
      <div
        className="relative z-10 w-full max-w-md my-10"
        style={{ opacity: 0, animation: visible ? "fadeUp 0.7s ease forwards" : "none" }}
      >
        <div className="relative bg-gray-900/80 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/60">

          {/* top glow line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent rounded-full" />

          {/* Header */}
          <div className="mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 mb-5 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Create account</h1>
            <p className="text-sm text-gray-500 mt-1">Start your journey today.</p>
          </div>

          {/* 🔹 Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <InputField label="Full Name"        type="text"  placeholder="John Doe"        value={form.name}    onChange={set("name")} />
            <InputField label="Email"            type="email" placeholder="you@example.com" value={form.email}   onChange={set("email")} />
            <InputField label="Password"         placeholder="••••••••"                     value={form.password} onChange={set("password")} show={show.password} onToggle={toggle("password")} />
            <InputField label="Confirm Password" placeholder="••••••••"                     value={form.confirm}  onChange={set("confirm")}  show={show.confirm}  onToggle={toggle("confirm")} />

            <button
              type="submit"
              className="mt-2 w-full relative overflow-hidden rounded-xl py-3.5 font-bold text-sm tracking-wide text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/25 active:translate-y-0 transition-all duration-300 group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Create Account</span>
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/Login" className="text-emerald-400 hover:text-emerald-300 cursor-pointer transition-colors font-medium">
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignUp;