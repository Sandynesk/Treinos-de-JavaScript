export function RankingFilters({ period, setPeriod, difficulty, setDifficulty }) {
  const periods = [
    { id: "weekly", label: "Semanal" },
    { id: "monthly", label: "Mensal" },
    { id: "all_time", label: "Geral" }
  ];

  const difficulties = [
    { id: "all", label: "Todas" },
    { id: "easy", label: "Fácil" },
    { id: "medium", label: "Médio" },
    { id: "hard", label: "Difícil" }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
      {/* Period Filter */}
      <div className="flex p-1 bg-zinc-900/80 rounded-xl border border-white/5 w-full sm:w-auto">
        {periods.map(p => (
          <button
            key={p.id}
            onClick={() => setPeriod(p.id)}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              period === p.id 
                ? "bg-zinc-800 text-white shadow-sm" 
                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Spacer or divider for desktop */}
      <div className="hidden sm:block w-px h-6 bg-white/10" />

      {/* Difficulty Filter */}
      <div className="flex p-1 bg-zinc-900/80 rounded-xl border border-white/5 w-full sm:w-auto overflow-x-auto custom-scrollbar">
        {difficulties.map(d => (
          <button
            key={d.id}
            onClick={() => setDifficulty(d.id)}
            className={`flex-1 sm:flex-none whitespace-nowrap px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              difficulty === d.id 
                ? "bg-purple-600/20 text-purple-300 border border-purple-500/30" 
                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
}
