import { TrendingUp, TrendingDown, Search, Filter } from "lucide-react";

export function RankingTable({ ranking }) {
  // Pass over Top 3
  const tableData = ranking.slice(3);

  return (
    <section className="glass-panel rounded-2xl p-6 mt-8 overflow-hidden flex flex-col">
      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar desenvolvedor..."
            className="w-full h-10 pl-10 pr-4 rounded-xl text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition-all"
            style={{
              background: "rgba(139, 92, 246, 0.05)",
              border: "1px solid rgba(139, 92, 246, 0.1)",
            }}
            onFocus={(e) => { e.target.style.borderColor = "rgba(139, 92, 246, 0.3)"; }}
            onBlur={(e) => { e.target.style.borderColor = "rgba(139, 92, 246, 0.1)"; }}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 py-2 rounded-xl text-sm font-semibold bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white flex items-center justify-center gap-2">
             Global
          </button>
          <button className="flex-1 md:flex-none px-4 py-2 rounded-xl text-sm font-semibold text-zinc-400 hover:bg-white/5 transition-colors">
            Amigos
          </button>
        </div>
      </div>

      {/* Table setup using divs for responsiveness */}
      <div className="flex-1 overflow-auto custom-scrollbar pr-2">
        <div className="min-w-[600px] flex flex-col gap-1.5">
          {/* Header Row */}
          <div className="flex items-center px-4 py-2 text-xs font-bold text-zinc-500 uppercase tracking-widest sticky top-0 bg-[#0a0a0c]/80 backdrop-blur-md z-10 border-b border-white/5 mb-2">
            <div className="w-16 text-center">Rank</div>
            <div className="flex-1 px-4">Desenvolvedor</div>
            <div className="w-32 text-right">Linguagem</div>
            <div className="w-32 text-right">Pontuação</div>
            <div className="w-12 text-center"></div>
          </div>
          
          {/* List Rows */}
          {tableData.map((user) => (
             <div key={user.id} className="flex items-center px-4 py-3 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/[0.03] transition-colors group">
               <div className="w-16 text-center text-sm font-bold text-zinc-500 group-hover:text-zinc-300">
                 #{user.position}
               </div>
               <div className="flex-1 px-4 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-inner" style={{ background: "linear-gradient(135deg, #1e1e24, #27272a)" }}>
                   {user.initials}
                 </div>
                 <span className="font-semibold text-zinc-300 group-hover:text-white transition-colors">{user.name}</span>
               </div>
               <div className="w-32 text-right text-xs text-zinc-500 font-mono">
                 {user.id % 3 === 0 ? 'Python' : user.id % 2 === 0 ? 'TypeScript' : 'JavaScript'}
               </div>
               <div className="w-32 text-right font-mono font-bold text-purple-400">
                 {user.points} <span className="text-[10px] text-zinc-600 font-sans">pts</span>
               </div>
               <div className="w-12 flex justify-center">
                 {user.trend === "up" ? (
                   <div className="w-6 h-6 rounded-md bg-emerald-500/10 flex items-center justify-center">
                     <TrendingUp className="h-3 w-3 text-emerald-500" />
                   </div>
                 ) : (
                   <div className="w-6 h-6 rounded-md bg-rose-500/10 flex items-center justify-center">
                     <TrendingDown className="h-3 w-3 text-rose-500" />
                   </div>
                 )}
               </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
