import { Trophy } from "lucide-react";

export function RankingHeader() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 relative z-10">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/20">
          <Trophy className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Ranking Global</h1>
          <p className="text-sm md:text-base text-zinc-400 mt-1 max-w-lg">
            Os desenvolvedores mais consistentes da plataforma. Resolva desafios, mantenha sua ofensiva (streak) e suba no placar.
          </p>
        </div>
      </div>
      
      <div className="flex shrink-0">
        <button className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-colors shadow-lg shadow-purple-600/20">
          Como funciona a pontuação?
        </button>
      </div>
    </div>
  );
}
