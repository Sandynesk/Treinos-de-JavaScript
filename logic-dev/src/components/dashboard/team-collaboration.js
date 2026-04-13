import { Users, FolderOpen, ChevronRight } from "lucide-react";

export function TeamCollaboration({ members }) {
  return (
    <section className="bg-[#0a0a0c] border border-white/5 shadow-lg rounded-2xl p-6 transition-all duration-300 hover:border-purple-500/20">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <Users className="h-4 w-4 text-purple-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">Progresso do Time</h3>
          <p className="text-[10px] text-zinc-500 font-medium tracking-wide">Atividade recente da comunidade</p>
        </div>
      </div>

      <div className="space-y-2">
        {members.map((m, i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-all duration-300 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/20 group-hover:scale-105 transition-transform">
              {m.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-[13px] text-zinc-200 font-semibold group-hover:text-purple-300 transition-colors truncate">{m.name}</p>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              </div>
              <p className="text-[10px] text-zinc-500 truncate flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-zinc-700" /> {m.workingOn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
