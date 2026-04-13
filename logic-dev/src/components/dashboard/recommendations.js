import Link from "next/link";
import { PlayCircle } from "lucide-react";

const DIFFICULTY_STYLE = {
  easy: { badge: "bg-green-500/20 text-green-300", label: "Fácil" },
  medium: { badge: "bg-yellow-500/20 text-yellow-300", label: "Médio" },
  hard: { badge: "bg-red-500/20 text-red-300", label: "Difícil" },
};

export function Recommendations({ problems }) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-6">
      <h2 className="text-lg font-bold text-white mb-2 font-[var(--font-syne)]">
        Recomendados para Você
      </h2>
      <p className="text-zinc-500 text-sm mb-5">
        Problemas selecionados para o seu nível atual
      </p>

      <div className="flex flex-col gap-4">
        {problems.map((p) => {
          const style = DIFFICULTY_STYLE[p.difficulty];
          return (
            <div
              key={p.id}
              className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/50 hover:border-purple-600/40 transition-colors group"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h3 className="text-white font-semibold text-sm group-hover:text-purple-300 transition-colors">
                    {p.title}
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded mt-1 inline-block ${style.badge}`}>
                    {style.label}
                  </span>
                </div>
              </div>
              <p className="text-zinc-500 text-xs mb-3">{p.description}</p>
              <Link
                href={`/exercises/${p.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-lg shadow-purple-900/20"
              >
                <PlayCircle className="h-3.5 w-3.5" /> Resolver agora
              </Link>
            </div>
          );
        })}
      </div>

      {problems.length === 0 && (
        <div className="text-center py-8 text-zinc-600 text-sm">
          Nenhuma recomendação no momento
        </div>
      )}
    </section>
  );
}
