import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const InputField = ({ label, type, placeholder, value, onChange, show, onToggle }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{label}</label>
    <div className="relative group">
      <input
        type={show !== undefined ? (show ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-600 text-sm
         outline-none transition-all duration-300 focus:border-emerald-500/60 focus:bg-white/8 focus:shadow-lg
          focus:shadow-emerald-500/10 hover:border-white/20"
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

  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [show, setShow] = useState({ password: false, confirm: false });

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });
  const toggle = (key) => () => setShow({ ...show, [key]: !show[key] });

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

      // redirect to home after signup
      navigate("/");
    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">

      <div className="absolute w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">

        <div className="bg-gray-900/80 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/60">

          <div className="mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 mb-5 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Create account</h1>
            <p className="text-sm text-gray-500 mt-1">Start your journey today.</p>
          </div>

          {/* 🔹 Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <InputField label="Full Name" type="text" placeholder="John Doe" value={form.name} onChange={set("name")} />
            <InputField label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} />
            <InputField label="Password" placeholder="••••••••" value={form.password} onChange={set("password")} show={show.password} onToggle={toggle("password")} />
            <InputField label="Confirm Password" placeholder="••••••••" value={form.confirm} onChange={set("confirm")} show={show.confirm} onToggle={toggle("confirm")} />

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