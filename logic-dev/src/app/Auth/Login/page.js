"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const languages = ["JavaScript", "C#", "C", "C++", "Rust", "Python", "TypeScript"];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Typing effect state
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const typingSpeed = 150;
  const deletingSpeed = 75;
  const delay = 1500;

  useEffect(() => {
    let timer;
    const currentLanguage = languages[loopNum % languages.length];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayedText(currentLanguage.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(currentLanguage.substring(0, displayedText.length + 1));
        if (displayedText.length === currentLanguage.length) {
          timer = setTimeout(() => setIsDeleting(true), delay);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[40vw] h-[40vw] rounded-full bg-purple-900/20 blur-[100px]" />
        <div className="absolute top-[60%] -right-[10%] w-[30vw] h-[30vw] rounded-full bg-purple-800/15 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[20vw] rounded-full bg-purple-900/10 blur-[80px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
      />

      {/* Header */}
      <header className="relative z-10 border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-[var(--font-syne)] font-bold text-xl flex items-center gap-2 text-white hover:text-white">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600">
              <i className="fa-solid fa-code text-sm" />
            </span>
            <span>Logic<span className="text-purple-400">.dev</span></span>
          </Link>
          <Link href="/" className="text-zinc-400 hover:text-white text-sm transition flex items-center gap-2">
            <i className="fa-solid fa-arrow-left text-xs" />
            Voltar ao início
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12">
        <div className="w-full max-w-lg">

          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 font-[var(--font-syne)] break-words">
              Entre na sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">conta</span>
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed flex items-center justify-center flex-wrap gap-x-1.5 gap-y-1 mt-2">
              <span>Comece sua jornada de programação com</span>
              <span className="text-purple-400 font-semibold inline-flex items-center">
                {displayedText}
                <span className="w-[2px] h-[1.2em] bg-purple-400 ml-[2px] animate-pulse" />
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative">
            {/* Glass card */}
            <div className="relative bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-8 backdrop-blur-xl overflow-hidden">
              {/* Shine effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
              
              {/* Glow behind */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

              {/* Email */}
              <div className="mb-5 group">
                <label htmlFor="email" className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <i className="fa-regular fa-envelope text-purple-400/70" />
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 group-hover:border-zinc-700 pr-12"
                    placeholder="seu@email.com"
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600">
                    <i className="fa-regular fa-envelope" />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="mb-6 group">
                <label htmlFor="password" className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-lock text-purple-400/70" />
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 group-hover:border-zinc-700 pr-14"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-purple-400 transition-colors duration-200"
                  >
                    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-5 h-5 rounded border border-zinc-700 bg-zinc-950 peer-checked:bg-purple-600 peer-checked:border-purple-600 transition-all duration-200 flex items-center justify-center">
                      <i className="fa-solid fa-check text-white text-xs opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">Lembrar-me</span>
                </label>
                <Link href="/Auth/EsqueciSenha" className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1">
                  <i className="fa-solid fa-question-circle text-xs" />
                  Esqueci a senha
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold transition-all duration-300 shadow-lg shadow-purple-900/30 hover:shadow-purple-600/40 overflow-hidden group/btn disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className={`flex items-center justify-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                  <i className="fa-solid fa-arrow-right" />
                  Entrar
                </span>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
                <span className="text-xs text-zinc-500 uppercase tracking-widest">ou continue com</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
              </div>

              {/* Social login */}
              <button
                type="button"
                className="w-full py-3.5 rounded-xl border border-zinc-700/80 hover:border-zinc-600 bg-zinc-950/50 hover:bg-zinc-900 text-white font-medium transition-all duration-300 flex items-center justify-center gap-3 group/social"
              >
                <i className="fa-brands fa-github text-xl group-hover/social:scale-110 transition-transform" />
                <span>GitHub</span>
              </button>
            </div>
          </form>

          {/* Signup link */}
          <p className="text-center mt-8 text-zinc-400 text-sm flex items-center justify-center gap-2">
            Não tem uma conta?
            <Link href="/Auth/Cadastro" className="text-purple-400 hover:text-purple-300 font-semibold transition-all hover:underline decoration-purple-400 underline-offset-4">
              Criar conta
              <i className="fa-solid fa-arrow-right ml-1 text-xs" />
            </Link>
          </p>

          {/* Decorative elements */}
          <div className="mt-8 flex justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-600/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-purple-600/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-purple-600/20" />
          </div>
        </div>
      </main>
    </div>
  );
}