import { Trophy, TrendingUp, TrendingDown } from "lucide-react";

export function Leaderboard({ ranking }) {
  return (
    <section className="bg-zinc-950/80 border border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden group hover:border-purple-500/20 transition-all duration-300">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/20">
          <Trophy className="h-4 w-4 text-fuchsia-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight">Ranking Global</h3>
          <p className="text-[10px] text-zinc-500 font-medium tracking-wide">Top devs em pontuação</p>
        </div>
      </div>

      <div className="space-y-1">
        {ranking.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-2.5 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-all duration-300 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className={`w-5 text-center text-xs font-bold ${
                user.position === 1 ? "text-fuchsia-400" :
                user.position === 2 ? "text-purple-400" :
                user.position === 3 ? "text-indigo-400" : "text-zinc-600"
              }`}>
                #{user.position}
              </span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/20">
                {user.initials}
              </div>
              <span className="text-[13px] font-semibold text-zinc-300 group-hover:text-white transition-colors truncate">{user.name}</span>
            </div>

            <div className="flex items-center gap-4 shrink-0 pl-3">
              <span className="text-xs font-bold text-purple-400">{user.points} <span className="text-[10px] text-zinc-500 font-normal">pts</span></span>
              {user.trend === "up" ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-rose-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
