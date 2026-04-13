"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, Menu, ArrowRight, 
  Infinity, Repeat, Zap, Search, ArrowDownUp, RotateCw, X,
  Terminal, Sparkles, Heart, BarChart3
} from "lucide-react";
import CursorGlow from "@/components/CursorGlow";

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animações
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const codeLines = [
    { text: "// Não seja aquele dev que fica parado", color: "text-purple-400/70 italic" },
    { text: "const dev = {", color: "text-purple-300" },
    { text: "  usaLogicDev: false,", color: "text-purple-200 ml-4" },
    { text: "  querCrescer: true,", color: "text-purple-200 ml-4" },
    { text: "  nivel: 0", color: "text-fuchsia-300 ml-4" },
    { text: "};", color: "text-purple-300" },
    { text: "", color: "" },
    { text: "if (!dev.usaLogicDev) {", color: "text-fuchsia-400" },
    { text: '  console.log("Ficando para trás...");', color: "text-indigo-300 ml-4" },
    { text: "}", color: "text-fuchsia-400" },
    { text: "", color: "" },
    { text: "dev.usaLogicDev = true;", color: "text-purple-200" },
    { text: "dev.nivel = 99; // 🚀", color: "text-fuchsia-300" },
  ];

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen text-zinc-300 overflow-x-hidden font-[var(--font-body)] selection:bg-purple-900 selection:text-white">
      <CursorGlow />
      <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none z-50"></div>
        
        {/* Background Lights */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/30 blur-[120px]" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[40%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-indigo-900/20 blur-[130px]" 
          />
          <div className="absolute -bottom-[10%] left-[10%] w-[60vw] h-[40vw] rounded-full bg-zinc-900/50 blur-[100px] opacity-60" />
        </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-4 h-[94px] flex items-center justify-between">
          <a href="#home" className="font-[var(--font-title)] font-bold text-xl flex items-center gap-2 text-white hover:text-white">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600">
              <i className="fa-solid fa-code text-sm" />
            </span>
            <span>Logic<span className="text-purple-400">.dev</span></span>
          </a>

          <ul className="hidden md:flex gap-8 text-sm">
            <li>
              <Link href="/exercises" className="text-white hover:text-purple-400 transition">
                Exercícios
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="text-white hover:text-purple-400 transition">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/Auth/Login" className="text-white hover:text-purple-400 transition">
                Login
              </Link>
            </li>
          </ul>

          <div className="flex gap-3 items-center">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-sm font-semibold transition text-white"
            >
              <i className="fa-brands fa-github" /> GitHub
            </a>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 hover:bg-zinc-800 rounded-lg transition text-white">
              <i className="fa-solid fa-bars" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-zinc-800 bg-zinc-950 flex flex-col gap-2 p-4">
            <Link href="/exercises" onClick={() => setMobileOpen(false)} className="py-2 hover:text-purple-400 text-white">
              Exercícios
            </Link>
            <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="py-2 hover:text-purple-400 text-white">
              Dashboard
            </Link>
            <Link href="/Auth/Login" onClick={() => setMobileOpen(false)} className="py-2 hover:text-purple-400 text-white">
              Login
            </Link>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="py-2 px-4 rounded-lg bg-purple-600 text-center font-semibold text-white"
            >
              <i className="fa-brands fa-github" /> GitHub
            </a>
          </div>
        )}
      </header>

      <main className="relative z-10 pt-[104px]">
        {/* Hero Section */}
        <section id="home" className="min-h-[80vh] flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-8 lg:py-16">
            
            <motion.div 
              variants={staggerContainer} initial="hidden" animate="show"
              className="space-y-8"
            >


              <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-[900] leading-[1.1] font-[var(--font-title)] tracking-tighter">
                Domine a lógica de <br className="hidden md:block" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400">
                  programação
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-zinc-400 text-lg md:text-xl max-w-lg leading-relaxed">
                A plataforma de lógica feita para desenvolvedores e iniciantes. Resolva desafios do mundo real em JavaScript, analise a complexidade e prepare-se para o mercado.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
                <Link href="/exercises"
                  className="group relative px-6 py-3 rounded-xl bg-white text-zinc-950 font-bold overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                  <span className="relative flex items-center gap-2">
                    Começar a Praticar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link href="#exercises"
                  className="px-6 py-3 rounded-xl glass-panel text-white font-semibold hover:bg-white/5 transition-colors flex items-center gap-2"
                >
                  Ver Catálogo
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-6 md:gap-8 pt-8 border-t border-white/5">
                <div>
                  <p className="text-3xl font-[700] text-white">12<span className="text-purple-400">+</span></p>
                  <p className="text-zinc-500 text-sm font-medium">Exercícios</p>
                </div>
                <div>
                  <p className="text-3xl font-[700] text-white flex items-center gap-2">
                    3 <BarChart3 className="text-purple-400" size={24} />
                  </p>
                  <p className="text-zinc-500 text-sm font-medium">Níveis de Dificuldade</p>
                </div>
                <div>
                  <p className="text-3xl font-[700] text-white">100<span className="text-purple-400">%</span></p>
                  <p className="text-zinc-500 text-sm font-medium">100% Prático</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Code Block Visualizer */}
            <motion.div 
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="float relative">
                {/* Blur backdrop behind code */}
                <div className="absolute -inset-1 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-2xl blur-2xl opacity-20" />
                
                <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl relative">
                  {/* Editor Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5 backdrop-blur-xl">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                      <Terminal size={12} /> logic.js
                    </div>
                  </div>
                  
                  {/* Editor Body */}
                  <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
                    <AnimatePresence>
                      {codeLines.map((line, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          className="flex group"
                        >
                          <span className="w-6 text-zinc-700 select-none">{idx + 1}</span>
                          <span className={line.color}>{line.text || " "}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  {/* Hover overlay glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>
              

            </motion.div>
          </div>
        </section>

        {/* Seção de Chamada com Ilustração */}
        <section className="relative z-10 py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Ilustração SVG */}
              <div className="flex justify-center">
                <svg viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md">
                  <defs>
                    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <ellipse cx="210" cy="180" rx="190" ry="160" fill="url(#bgGlow)" />
                  <line x1="210" y1="90" x2="100" y2="170" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.5" />
                  <line x1="210" y1="90" x2="320" y2="170" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.5" />
                  <line x1="100" y1="170" x2="150" y2="270" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.5" />
                  <line x1="320" y1="170" x2="270" y2="270" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.5" />
                  <line x1="100" y1="170" x2="210" y2="220" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.35" />
                  <line x1="320" y1="170" x2="210" y2="220" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.35" />
                  <line x1="150" y1="270" x2="270" y2="270" stroke="#7c3aed" strokeWidth="1.5" strokeOpacity="0.5" />
                  <line x1="60" y1="100" x2="100" y2="170" stroke="#6d28d9" strokeWidth="1" strokeOpacity="0.4" />
                  <line x1="360" y1="100" x2="320" y2="170" stroke="#6d28d9" strokeWidth="1" strokeOpacity="0.4" />
                  <line x1="60" y1="260" x2="100" y2="170" stroke="#6d28d9" strokeWidth="1" strokeOpacity="0.4" />
                  <line x1="360" y1="260" x2="320" y2="170" stroke="#6d28d9" strokeWidth="1" strokeOpacity="0.4" />
                  <circle cx="60" cy="100" r="8" fill="#3f3f46" stroke="#7c3aed" strokeWidth="1.5" />
                  <circle cx="360" cy="100" r="8" fill="#3f3f46" stroke="#7c3aed" strokeWidth="1.5" />
                  <circle cx="60" cy="260" r="8" fill="#3f3f46" stroke="#7c3aed" strokeWidth="1.5" />
                  <circle cx="360" cy="260" r="8" fill="#3f3f46" stroke="#7c3aed" strokeWidth="1.5" />
                  <circle cx="150" cy="270" r="14" fill="#27272a" stroke="#a855f7" strokeWidth="2" filter="url(#glow)" />
                  <circle cx="270" cy="270" r="14" fill="#27272a" stroke="#a855f7" strokeWidth="2" filter="url(#glow)" />
                  <circle cx="100" cy="170" r="18" fill="#1c1c1e" stroke="#7c3aed" strokeWidth="2" filter="url(#glow)" />
                  <circle cx="320" cy="170" r="18" fill="#1c1c1e" stroke="#7c3aed" strokeWidth="2" filter="url(#glow)" />
                  <circle cx="210" cy="220" r="14" fill="#27272a" stroke="#a855f7" strokeWidth="1.5" />
                  <g className="float">
                    <circle cx="210" cy="90" r="32" fill="#18181b" stroke="url(#nodeGrad)" strokeWidth="2.5" filter="url(#glow)" />
                    <path d="M 200 80 L 188 90 L 200 100" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="214" y1="78" x2="206" y2="102" stroke="url(#nodeGrad)" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 220 80 L 232 90 L 220 100" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <text x="100" y="175" textAnchor="middle" fill="#a855f7" fontSize="10" fontFamily="monospace">fn()</text>
                  <text x="320" y="175" textAnchor="middle" fill="#a855f7" fontSize="10" fontFamily="monospace">O(n)</text>
                  <text x="150" y="275" textAnchor="middle" fill="#a855f7" fontSize="10" fontFamily="monospace">{"{ }"}</text>
                  <text x="270" y="275" textAnchor="middle" fill="#a855f7" fontSize="10" fontFamily="monospace">{"[]"}</text>
                  <rect x="20" y="155" width="52" height="20" rx="4" fill="#27272a" stroke="#3f3f46" strokeWidth="1" />
                  <text x="46" y="169" textAnchor="middle" fill="#52525b" fontSize="9" fontFamily="monospace">while()</text>
                  <rect x="350" y="155" width="52" height="20" rx="4" fill="#27272a" stroke="#3f3f46" strokeWidth="1" />
                  <text x="376" y="169" textAnchor="middle" fill="#52525b" fontSize="9" fontFamily="monospace">return</text>
                  <rect x="168" y="290" width="84" height="20" rx="4" fill="#27272a" stroke="#3f3f46" strokeWidth="1" />
                  <text x="210" y="304" textAnchor="middle" fill="#52525b" fontSize="9" fontFamily="monospace">array.map()</text>
                  <circle cx="210" cy="90" r="44" fill="none" stroke="#a855f7" strokeWidth="1" strokeOpacity="0.3" className="float" />
                </svg>
              </div>

              {/* Texto */}
              <div className="text-left md:text-right">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-600/30 bg-purple-600/10 text-purple-300 text-xs font-semibold mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  Acelere a sua carreira
                </span>
                <h2 className="text-5xl lg:text-7xl font-[900] leading-[1.1] font-[var(--font-title)] tracking-tighter mb-4">
                  Pare de travar na sua <br className="hidden md:block" />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400">
                    lógica de programação
                  </span>
                </h2>
                <p className="text-zinc-400 max-w-lg md:ml-auto text-lg">
                  Assistir a vídeos ou copiar tutoriais na internet não te faz um programador. A fluência de verdade nasce da prática ativa. Na Logic.dev, você destrava o seu raciocínio e resolve desafios reais cobrados por recrutadores, deixando você e seu portfólio 100% preparados para as vagas mais competitivas do mercado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Exercises Section */}
        <section id="exercises" className="relative z-10 py-32">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20 space-y-4"
            >
              <h2 className="text-4xl md:text-5xl font-[800] text-white font-[var(--font-title)]">Desafios em Destaque</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                Selecione um problema tecnológico clássico e coloque a mão na massa.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Infinity, title: "Sequência de Fibonacci", desc: "Gere a sequência mítica até n termos iterativamente ou recursivamente.", diff: "Fácil", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
                { icon: Repeat, title: "Verificador Palíndromo", desc: "Analise strings para verificar se são lidas de forma idêntica de trás para frente.", diff: "Fácil", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
                { icon: Zap, title: "FizzBuzz Dinâmico", desc: "O clássico teste de entrevistas. Múltiplos e substituição de strings.", diff: "Fácil", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
                { icon: Search, title: "Busca Binária", desc: "Encontre elementos em um array ordenado com complexidade O(log n).", diff: "Médio", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
                { icon: ArrowDownUp, title: "Bubble Sort", desc: "Implemente um dos mais conhecidos algoritmos de ordenação passo a passo.", diff: "Médio", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
                { icon: RotateCw, title: "Memoização", desc: "Calcule faturiais enormes guardando o estado do resultado de forma eficiente.", diff: "Difícil", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative glass-panel rounded-2xl p-6 flex flex-col h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                  
                  <div className="flex justify-between items-start mb-6 relative">
                    <div className={`w-12 h-12 rounded-xl glass flex items-center justify-center ${card.color}`}>
                      <card.icon size={24} />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${card.bg} ${card.border} ${card.color}`}>
                      {card.diff}
                    </span>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-3 text-white font-[var(--font-title)] group-hover:text-purple-400 transition-colors relative">
                    {card.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow relative">
                    {card.desc}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-white/5 relative">
                    <Link href="/exercises" className="inline-flex items-center justify-between w-full text-zinc-300 hover:text-white font-medium group/link">
                      Resolver Desafio
                      <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-purple-500 group-hover/link:text-white transition-all">
                        <ArrowRight size={16} className="group-hover/link:-rotate-45 transition-transform" />
                      </span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <Link href="/exercises" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-white font-semibold hover:bg-white/10 transition-colors">
                Ver todos os desafios <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Cta Section */}
        <section className="relative z-10 py-24 mb-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="glass-panel rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-purple-900/40 mix-blend-overlay" />
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500 rounded-full blur-[100px] opacity-50" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500 rounded-full blur-[100px] opacity-50" />
              
              <div className="relative z-10 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white font-[var(--font-title)]">Pronto para dar o próximo passo?</h2>
                <p className="text-zinc-300 text-lg max-w-2xl mx-auto">Junte-se à plataforma e comece a treinar suas habilidades hoje mesmo. O mercado procura por desenvolvedores que resolvem problemas.</p>
                <div className="pt-4">
                  <Link href="/Auth/Login" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-zinc-950 font-bold hover:bg-zinc-200 transition-colors text-lg">
                    Criar conta gratuita
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Minimalista & Premium */}
        <footer className="border-t border-white/5 bg-zinc-950/50 backdrop-blur-lg relative z-10 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <Code2 size={20} className="text-purple-400" />
                <span className="font-[var(--font-title)] font-bold text-lg text-white">Logic<span className="text-purple-400">.dev</span></span>
              </div>
              <div className="text-zinc-500 text-sm flex items-center gap-2">
                &copy; {new Date().getFullYear()} Logic.dev. Feito com <Heart size={14} className="text-rose-500 fill-rose-500" /> para aprender.
              </div>
              <div className="flex gap-4">
                <a href="#" className="text-zinc-500 hover:text-white transition-colors"><i className="fa-brands fa-github text-xl" /></a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
