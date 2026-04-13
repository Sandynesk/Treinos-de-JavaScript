"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  MapPin, Link as LinkIcon, Mail, Building2, Users, Star, 
  GitCommit, Activity, BookOpen, Trophy, ArrowLeft
} from "lucide-react";
import CursorGlow from "@/components/CursorGlow";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Overview");

  // Mock data for contribution graph
  const generateContributionData = () => {
    const data = [];
    for (let i = 0; i < 365; i++) {
        // Deterministic pseudo-random gererator to prevent Next.js Hydration Mismatch
        const pseudoRand = Math.abs((Math.sin(i * 12.9898) * 43758.5453) % 1);
        let level = 0;
        if (pseudoRand > 0.95) level = 4;
        else if (pseudoRand > 0.85) level = 3;
        else if (pseudoRand > 0.70) level = 2;
        else if (pseudoRand > 0.50) level = 1;
        data.push(level);
    }
    return data;
  };

  const contributionData = generateContributionData();

  const getContributionColor = (level) => {
    switch(level) {
      case 0: return "bg-zinc-900/50 border border-zinc-800/50";
      case 1: return "bg-purple-900/40 border border-purple-800/50";
      case 2: return "bg-purple-700/60 border border-purple-600/50";
      case 3: return "bg-purple-500/80 border border-purple-400/50";
      case 4: return "bg-purple-400 border border-purple-300/50";
      default: return "bg-zinc-900/50 border border-zinc-800/50";
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-zinc-300 font-[var(--font-body)] selection:bg-purple-900 selection:text-white">
      <CursorGlow />
      <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none z-0"></div>
      
      {/* Header Minimalista Especial do Perfil */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-[var(--font-title)] font-bold text-xl flex items-center gap-2 text-white hover:text-white transition-opacity hover:opacity-80">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600">
              <i className="fa-solid fa-code text-sm" />
            </span>
            <span>Logic<span className="text-purple-400">.dev</span></span>
          </Link>
          <Link href="/" className="text-zinc-400 hover:text-white text-sm font-medium transition flex items-center gap-2">
            <ArrowLeft size={16} /> Voltar
          </Link>
        </nav>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 pt-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* Sidebar - Perfil Pessoal */}
          <div className="lg:col-span-1 space-y-6">
            <div className="relative w-48 h-48 lg:w-full lg:h-auto lg:aspect-square rounded-full overflow-hidden border-2 border-zinc-800/80 mx-auto lg:mx-0 shadow-2xl shadow-purple-900/20">
               {/* Imagem Placeholder de perfil (inspirada no GitHub de desenvolvedores) */}
               <img src="https://avatars.githubusercontent.com/u/9919?v=4" alt="Avatar" className="w-full h-full object-cover" />
            </div>

            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-[900] text-white leading-tight font-[var(--font-title)] tracking-tight">John Doe</h1>
              <p className="text-xl text-zinc-500 font-medium">@ghostfocuser</p>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed text-center lg:text-left">
              Desenvolvedor Backend fascinado por performance e arquiteturas escaláveis. Acreditando na força do código limpo.
            </p>

            <button className="w-full py-2.5 rounded-xl glass-panel hover:bg-zinc-800/80 border border-zinc-700/50 text-zinc-300 hover:text-purple-300 font-semibold text-sm transition-all focus:ring-2 focus:ring-purple-500/30">
              Editar Perfil
            </button>

            <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-zinc-400">
              <div className="flex items-center gap-1.5 hover:text-purple-400 cursor-pointer transition-colors group">
                <Users size={16} className="text-zinc-500 group-hover:text-purple-400 transition-colors" />
                <span className="text-white font-semibold group-hover:text-purple-300">341</span> seguidores
              </div>
              <div className="flex items-center gap-1.5 hover:text-purple-400 cursor-pointer transition-colors group">
                <span className="text-white font-semibold group-hover:text-purple-300">12</span> seguindo
              </div>
            </div>

            <div className="space-y-3.5 pt-6 border-t border-zinc-800/50 text-sm text-zinc-400 font-medium">
              <div className="flex items-center gap-3">
                <Building2 size={16} className="text-zinc-500" />
                <span>Logic.dev Open Source</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-zinc-500" />
                <span>São Paulo, SP - Brasil</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-zinc-500" />
                <a href="mailto:hello@logic.dev" className="hover:text-purple-400 hover:underline transition-all">hello@logic.dev</a>
              </div>
              <div className="flex items-center gap-3">
                <LinkIcon size={16} className="text-zinc-500" />
                <a href="https://logic.dev" target="_blank" className="hover:text-purple-400 hover:underline transition-all">logic.dev</a>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800/50">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Highlights & Conquistas</h3>
              <div className="flex flex-wrap gap-2.5">
                <div className="w-9 h-9 rounded-full bg-purple-900/30 border border-purple-500/30 flex items-center justify-center text-purple-400 hover:bg-purple-900/50 transition-colors cursor-help" title="12 Algoritmos Completos">
                  <Trophy size={16} />
                </div>
                <div className="w-9 h-9 rounded-full bg-emerald-900/30 border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-900/50 transition-colors cursor-help" title="Streak Perfeita de 30 Dias">
                  <Activity size={16} />
                </div>
                <div className="w-9 h-9 rounded-full bg-amber-900/30 border border-amber-500/30 flex items-center justify-center text-amber-400 hover:bg-amber-900/50 transition-colors cursor-help" title="Code Reviewer Level 1">
                  <Star size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Body Principal - Visão de Produção e Código */}
          <div className="lg:col-span-3">
            
            {/* Tabs Interativas */}
            <div className="flex overflow-x-auto border-b border-zinc-800/80 mb-8 pb-[1px] no-scrollbar">
              {[
                { id: "Overview", icon: BookOpen, count: null },
                { id: "Desafios Resolvidos", icon: GitCommit, count: 42 },
                { id: "Conquistas", icon: Trophy, count: 8 },
                { id: "Estrelas", icon: Star, count: 12 }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold border-b-2 transition-all whitespace-nowrap
                    ${activeTab === tab.id 
                      ? "border-purple-500 text-white" 
                      : "border-transparent text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                    }`}
                >
                  <tab.icon size={16} className={activeTab === tab.id ? "text-purple-400" : "text-zinc-500"} />
                  {tab.id}
                  {tab.count !== null && (
                    <span className="ml-1.5 inline-flex items-center justify-center bg-zinc-800/80 text-zinc-300 text-xs rounded-full px-2 py-0.5 min-w-[20px] font-mono">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Renderização condicional das Abas */}
            {activeTab === "Overview" && (
              <div className="space-y-10 animate-fade-in">
                
                {/* Desafios Fixados (Pinned Challenges) */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-zinc-100 font-bold text-lg flex items-center gap-2 font-[var(--font-title)] tracking-tight">
                      Desafios Fixados
                    </h2>
                    <button className="text-xs font-semibold text-zinc-500 hover:text-purple-400 transition-colors">Ver todos</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "Busca Binária (O(log n))", desc: "Aplicação avançada de busca dividindo a matriz pela metade para ganhos brutais de performance.", lang: "JavaScript", langColor: "bg-yellow-400", level: "Médio", levelColor: "border-amber-500/20 text-amber-400" },
                      { title: "Calculadora Dijkstra", desc: "Implementação matemática do Grafo para achar as as rotas com menor peso na varredura.", lang: "Rust", langColor: "bg-orange-500", level: "Difícil", levelColor: "border-rose-500/20 text-rose-400" },
                      { title: "Design de Sistema - Rate Limiter", desc: "Criando um middleware para limitar chamadas a API sem travar requisições correntes.", lang: "TypeScript", langColor: "bg-blue-400", level: "Médio", levelColor: "border-amber-500/20 text-amber-400" },
                      { title: "Validador de Palíndromes", desc: "Reversão algorítmica e análise de memória para uma comparação de strings limpa.", lang: "Python", langColor: "bg-sky-400", level: "Fácil", levelColor: "border-emerald-500/20 text-emerald-400" },
                    ].map((pin, i) => (
                      <div key={i} className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-5 hover:border-zinc-700 transition flex flex-col justify-between group">
                        <div>
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-bold text-purple-400 group-hover:text-purple-300 transition-colors cursor-pointer">{pin.title}</h3>
                          </div>
                          <p className="text-zinc-400/90 text-sm mb-5 leading-relaxed">{pin.desc}</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-semibold">
                          <div className="flex items-center gap-2 text-zinc-300">
                            <span className={`w-3 h-3 rounded-full ${pin.langColor} shadow-sm shadow-${pin.langColor}/20`} />
                            {pin.lang}
                          </div>
                          <div className={`px-2 py-0.5 rounded-md border bg-zinc-950/50 ${pin.levelColor}`}>
                            {pin.level}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contribution Graph (Tribute ao GitHub) */}
                <div>
                  <h2 className="text-zinc-100 font-bold text-lg mb-5 font-[var(--font-title)] tracking-tight">
                    125 resoluções no último ano
                  </h2>
                  <div className="border border-zinc-800/80 bg-zinc-900/20 backdrop-blur-xl rounded-2xl p-6 lg:p-8 overflow-x-auto">
                    {/* Painel do Gráfico simulando malha (matrix) */}
                    <div className="w-[850px] flex gap-[3px] mb-6">
                       {Array.from({length: 52}).map((_, weekIdx) => (
                          <div key={weekIdx} className="flex flex-col gap-[3px]">
                            {Array.from({length: 7}).map((_, dayIdx) => {
                              const i = weekIdx * 7 + dayIdx;
                              if (i >= 365) return null;
                              return (
                                <div 
                                  key={dayIdx} 
                                  className={`w-[13px] h-[13px] rounded-[3px] transition-colors duration-300 hover:border-white/50 ${getContributionColor(contributionData[i])}`} 
                                  title={`Resolvidos nesse dia (Level ${contributionData[i]})`}
                                />
                              )
                            })}
                          </div>
                       ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-zinc-500 font-medium">
                      <Link href="#" className="hover:text-purple-400 hover:underline transition-colors flex items-center gap-1.5">
                        <Activity size={14} /> Como aumentar sua produtividade local?
                      </Link>
                      <div className="flex items-center gap-2">
                        <span>Menos Produtivo</span>
                        <div className="flex gap-[3px]">
                          {[0, 1, 2, 3, 4].map(level => (
                            <div key={level} className={`w-[13px] h-[13px] rounded-[3px] ${getContributionColor(level)}`} />
                          ))}
                        </div>
                        <span>Mais Produtivo</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Timeline */}
                <div>
                  <h2 className="text-zinc-100 font-bold text-lg mb-6 font-[var(--font-title)] tracking-tight">Atividade Recente</h2>
                  
                  <div className="relative border-l border-zinc-800/80 ml-4 space-y-10 pb-4">
                    
                    {/* Item de atividade 1 */}
                    <div className="relative group">
                      <div className="absolute -left-[20px] top-1 w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-purple-400 group-hover:bg-purple-900/20 group-hover:border-purple-500/50 transition-all">
                        <GitCommit size={16} />
                      </div>
                      <div className="pl-8">
                        <p className="text-zinc-300">
                          Finalizou <span className="font-bold text-white">3 exercícios</span> na categoria Lógica Avançada
                        </p>
                        <p className="text-xs font-medium text-zinc-500 mt-1.5">Há 2 dias</p>
                        <div className="mt-4 flex flex-wrap gap-2.5">
                           <span className="text-xs font-medium text-zinc-300 bg-zinc-900/50 border border-zinc-800/80 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-zinc-800 transition-colors cursor-pointer">
                             <span className="w-2 h-2 rounded-full bg-orange-500"></span> Dijkstra Avançado
                           </span>
                           <span className="text-xs font-medium text-zinc-300 bg-zinc-900/50 border border-zinc-800/80 px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-zinc-800 transition-colors cursor-pointer">
                             <span className="w-2 h-2 rounded-full bg-yellow-400"></span> Flat Array Map
                           </span>
                        </div>
                      </div>
                    </div>

                    {/* Item de atividade 2 */}
                    <div className="relative group">
                      <div className="absolute -left-[20px] top-1 w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-900/20 group-hover:border-emerald-500/50 transition-all">
                        <Trophy size={16} />
                      </div>
                      <div className="pl-8">
                        <p className="text-zinc-300">
                          Desbloqueou a conquista especial <span className="font-bold text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded inline-block mt-1 sm:mt-0 lg:inline border border-emerald-500/20">🔥 30 Dias Ininterruptos</span>
                        </p>
                        <p className="text-xs font-medium text-zinc-500 mt-1.5">Semana passada</p>
                      </div>
                    </div>

                    {/* Item de atividade 3 */}
                    <div className="relative group">
                      <div className="absolute -left-[20px] top-1 w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-fuchsia-400 group-hover:bg-fuchsia-900/20 group-hover:border-fuchsia-500/50 transition-all">
                        <Activity size={16} />
                      </div>
                      <div className="pl-8">
                        <p className="text-zinc-300">
                          Iniciou a nova Trilha de Competição <span className="font-bold text-white">"Algoritmos de Big Techs"</span>
                        </p>
                        <p className="text-xs font-medium text-zinc-500 mt-1.5">10 de Março</p>
                      </div>
                    </div>

                  </div>
                  
                  <button className="w-full mt-6 py-3.5 rounded-xl border border-zinc-800/80 hover:bg-zinc-800/50 text-purple-400 text-sm font-bold transition-colors">
                    Mostrar o histórico completo
                  </button>
                </div>

              </div>
            )}
            
            {/* Fallback de conteúdo vazio para as outras Abas */}
            {activeTab !== "Overview" && (
              <div className="h-72 mt-8 flex flex-col items-center justify-center text-center border-2 border-dashed border-zinc-800/50 rounded-2xl bg-zinc-900/10 animate-fade-in">
                 <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mb-5">
                   <GitCommit size={28} className="text-zinc-600" />
                 </div>
                 <h3 className="text-zinc-200 font-bold text-lg mb-2">Ainda não há conteúdo para exibir</h3>
                 <p className="text-zinc-500 text-sm max-w-sm">Esta aba (<span className="text-purple-400">{activeTab}</span>) será populada assim que o perfil se envolver em mais atividades.</p>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
