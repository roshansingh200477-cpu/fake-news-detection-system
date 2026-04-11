import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [copied, setCopied] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const copyEmail = () => {
    navigator.clipboard.writeText("roshansingh200477@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const techStack = [
    { name: "React", url: "https://react.dev" },
    { name: "Tailwind CSS", url: "https://tailwindcss.com" },
    { name: "Node.js", url: "https://nodejs.org" },
    { name: "Express", url: "https://expressjs.com" },
    { name: "MongoDB", url: "https://mongodb.com" },
    { name: "FastAPI", url: "https://fastapi.tiangolo.com" },
    { name: "scikit-learn", url: "https://scikit-learn.org" },
    { name: "Python", url: "https://python.org" },
  ];

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "Detect News", to: "/DetectNews" },
    { name: "About", to: "/About" },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-gray-950 text-gray-400 mt-20">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* col 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-white font-black text-lg tracking-tight">Verifeye</span>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              AI-powered fake news detection using NLP and machine learning. Built as a full-stack microservices project.
            </p>

            <div className="flex items-center gap-3">

              {/* GitHub */}
              <a
                href="https://github.com/roshansingh200477-cpu"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all duration-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 0C5.37 0 0 5.37 0 12c0 5.303 3.438 9.8 8.205 
      11.385.6.113.82-.258.82-.577 
      0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61
      -.546-1.387-1.333-1.756-1.333-1.756
      -1.089-.745.084-.729.084-.729
      1.205.084 1.84 1.236 1.84 1.236
      1.07 1.835 2.807 1.305 3.492.998
      .108-.776.418-1.305.762-1.605
      -2.665-.3-5.467-1.332-5.467-5.93
      0-1.31.468-2.38 1.235-3.22
      -.135-.303-.54-1.523.105-3.176
      0 0 1.005-.322 3.3 1.23
      .96-.267 1.98-.399 3-.405
      1.02.006 2.04.138 3 .405
      2.28-1.552 3.285-1.23 3.285-1.23
      .645 1.653.24 2.873.12 3.176
      .765.84 1.23 1.91 1.23 3.22
      0 4.61-2.805 5.625-5.475 5.92
      .435.375.81 1.102.81 2.222
      0 1.606-.015 2.896-.015 3.286
      0 .315.21.69.825.57C20.565 21.795 
      24 17.298 24 12c0-6.63-5.37-12-12-12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              {/* FIXED LinkedIn */}
              <a
                href="https://www.linkedin.com/in/roshan-singh-80850b364/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" clipRule="evenodd" />
                </svg>
              </a>

              <button
                onClick={copyEmail}
                className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all duration-300 relative group"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26..." />
                </svg>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {copied ? "Copied!" : "Copy email"}
                </span>
              </button>
            </div>
          </div>

          {/* col 2 */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">Navigation</p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* col 3 */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-5">Built With</p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <a
                  key={tech.name}
                  href={tech.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 text-xs rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all duration-200"
                >
                  {tech.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Verifeye — Built by{" "}
            <span className="text-gray-400 font-medium">Roshan Singh</span>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-400 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-400 hover:-translate-y-0.5 transition-all duration-300 group"
          >
            Back to top
            <svg className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;