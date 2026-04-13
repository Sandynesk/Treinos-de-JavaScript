import { ChevronRight, FolderOpen } from "lucide-react";

export function RecentProblems({ problems }) {
  return (
    <section className="bg-[#0a0a0c] border border-white/5 shadow-lg rounded-2xl p-6 transition-all duration-300 hover:border-purple-500/20">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <FolderOpen className="h-4 w-4 text-purple-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">Problemas Recentes</h3>
          <p className="text-[10px] text-zinc-500 font-medium tracking-wide">Seu histórico de desafios</p>
        </div>
      </div>

      <div className="space-y-1">
        {problems.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between p-2.5 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-zinc-900 border border-white/5 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all duration-300">
                <FolderOpen className="h-4 w-4 text-zinc-500 group-hover:text-purple-400" />
              </div>
              <span className="text-[13px] font-semibold text-zinc-400 group-hover:text-white transition-colors truncate">{p.title}</span>
            </div>

            <div className="flex items-center gap-3 shrink-0 pl-3">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 ${p.statusColor}`}>{p.status}</span>
              <ChevronRight className="h-4 w-4 text-zinc-700 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
