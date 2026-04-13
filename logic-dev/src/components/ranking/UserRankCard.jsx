import { ChevronUp, Eye } from "lucide-react";
import Link from "next/link";

export function UserRankCard({ user }) {
  if (!user) return null;

  return (
    <div className="relative mb-8 rounded-2xl overflow-hidden glass-panel border border-purple-500/30 shadow-[0_0_30px_rgba(124,58,237,0.15)] group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-blue-900/20 to-purple-900/40 opacity-50" />
      
      <div className="relative p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 w-full md:w-auto">
          {/* Position Badge */}
          <div className="flex flex-col items-center justify-center min-w-[80px]">
            <span className="text-sm text-purple-300 font-semibold mb-1">VOCÊ</span>
            <span className="text-4xl font-black text-white">#{user.position}</span>
            <div className="flex items-center gap-1 text-emerald-400 mt-1">
              <ChevronUp className="h-3 w-3" />
              <span className="text-[10px] font-bold">12 posições</span>
            </div>
          </div>
          
          <div className="h-16 w-px bg-white/10 hidden md:block" />

          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-500/40 flex items-center justify-center text-2xl shadow-inner">
              {user.avatar}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user.name}</h2>
              <div className="flex items-center gap-3 mt-1 text-sm text-zinc-400">
                <span className="font-mono text-purple-300 font-medium">{user.points} XP</span>
                <span className="w-1 h-1 rounded-full bg-zinc-600" />
                <span>{user.streak}🔥 Streak</span>
                <span className="w-1 h-1 rounded-full bg-zinc-600" />
                <span>{user.solved} Resolvidos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full md:w-auto shrink-0 flex items-center">
          <Link href="/dashboard" className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition-all flex items-center justify-center gap-2 group-hover:border-purple-500/30">
            <Eye className="h-4 w-4 text-purple-400" /> Comparar Estatísticas
          </Link>
        </div>
      </div>
    </div>
  );
}
