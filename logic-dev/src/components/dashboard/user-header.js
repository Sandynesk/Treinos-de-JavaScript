import { Flame, Trophy, Zap, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function UserHeader({ user }) {
  const { name, level, xp, xpToNext, streak, totalSolved } = user;
  const xpPercent = Math.round((xp / xpToNext) * 100);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-6">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl -translate-y-32 translate-x-32" />

      <div className="relative grid grid-cols-1 md:grid-cols-3 items-center gap-6">
        {/* Avatar + Greeting */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-lg shadow-purple-600/30">
            {name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-[var(--font-syne)]">
              Olá, {name}
            </h1>
            <p className="text-zinc-400 text-sm mt-0.5">
              Nível {level} · {xp.toLocaleString()} XP
            </p>
          </div>
        </div>

        {/* XP Progress */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-zinc-400 font-medium">Progresso para Nível {level + 1}</span>
            <span className="text-purple-400 font-semibold">{xpPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-500 transition-all duration-700"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-orange-400">
            <Flame className="h-5 w-5" />
            <span className="text-lg font-bold">{streak}</span>
            <span className="text-xs text-zinc-500 font-medium">dias seguidos</span>
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <Trophy className="h-5 w-5" />
            <span className="text-lg font-bold">{totalSolved}</span>
            <span className="text-xs text-zinc-500 font-medium">resolvidos</span>
          </div>
        </div>
      </div>
    </section>
  );
}
