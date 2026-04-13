"use client";

import { useState } from "react";
import Link from "next/link";

export default function CadastroPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }
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
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
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
              Crie sua <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">conta</span>
            </h1>
            <p className="text-zinc-400 text-sm">Comece sua jornada de programação</p>
          </div>

          <form onSubmit={handleSubmit} className="relative">
            {/* Glass card */}
            <div className="relative bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-8 backdrop-blur-xl overflow-hidden">
              {/* Shine effect */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

              {/* Glow behind */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

              {/* Name */}
              <div className="mb-5 group">
                <label htmlFor="name" className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <i className="fa-regular fa-user text-purple-400/70" />
                  Nome completo
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3.5 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 group-hover:border-zinc-700 pr-12"
                    placeholder="Seu nome"
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600">
                    <i className="fa-regular fa-user" />
                  </div>
                </div>
              </div>

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
              <div className="mb-5 group">
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
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-purple-400 transition-colors duration-200"
                  >
                    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
                  </button>
                </div>
                <p className="text-xs text-zinc-500 mt-1">Mínimo de 6 caracteres</p>
              </div>

              {/* Confirm Password */}
              <div className="mb-6 group">
                <label htmlFor="confirmPassword" className="block text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-lock text-purple-400/70" />
                  Confirmar senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3.5 bg-zinc-950/80 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all duration-300 group-hover:border-zinc-700 pr-12"
                    placeholder="••••••••"
                    required
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600">
                    <i className="fa-solid fa-lock" />
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="sr-only peer"
                      required
                    />
                    <div className="w-5 h-5 rounded border border-zinc-700 bg-zinc-950 peer-checked:bg-purple-600 peer-checked:border-purple-600 transition-all duration-200 flex items-center justify-center">
                      <i className="fa-solid fa-circle-check text-white text-xs opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    Eu aceito os{" "}
                    <Link href="/Auth/Termos" className="text-purple-400 hover:text-purple-300">
                      Termos de Uso
                    </Link>{" "}
                    e a{" "}
                    <Link href="/Auth/Privacidade" className="text-purple-400 hover:text-purple-300">
                      Política de Privacidade
                    </Link>
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!acceptTerms || isLoading}
                className="relative w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold transition-all duration-300 shadow-lg shadow-purple-900/30 hover:shadow-purple-600/40 overflow-hidden group/btn disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className={`flex items-center justify-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                  <i className="fa-solid fa-user-plus" />
                  Criar conta
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

              {/* Social signup */}
              <button
                type="button"
                className="w-full py-3.5 rounded-xl border border-zinc-700/80 hover:border-zinc-600 bg-zinc-950/50 hover:bg-zinc-900 text-white font-medium transition-all duration-300 flex items-center justify-center gap-3 group/social"
              >
                <i className="fa-brands fa-github text-xl group-hover/social:scale-110 transition-transform" />
                <span>GitHub</span>
              </button>
            </div>
          </form>

          {/* Login link */}
          <p className="text-center mt-8 text-zinc-400 text-sm flex items-center justify-center gap-2">
            Já tem uma conta?
            <Link href="/Auth/Login" className="text-purple-400 hover:text-purple-300 font-semibold transition-all hover:underline decoration-purple-400 underline-offset-4">
              Entrar
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