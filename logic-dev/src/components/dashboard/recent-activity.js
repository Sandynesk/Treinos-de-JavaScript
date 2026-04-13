import { CheckCircle2, XCircle, Timer, Clock, Code2 } from "lucide-react";

const STATUS_STYLE = {
  "Accepted": { color: "text-green-400", icon: CheckCircle2, label: "Aceito" },
  "Wrong Answer": { color: "text-red-400", icon: XCircle, label: "Errado" },
  "Time Limit Exceeded": { color: "text-yellow-400", icon: Timer, label: "Tempo esgotado" },
};

function formatDate(raw) {
  const d = new Date(raw + "Z");
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }) +
    " " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

export function RecentActivity({ submissions }) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-white font-[var(--font-syne)]">
            Atividade Recente
          </h2>
          <p className="text-zinc-500 text-sm">Últimas submissões</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {submissions.map((sub) => {
          const status = STATUS_STYLE[sub.status] ?? STATUS_STYLE["Wrong Answer"];
          const Icon = status.icon;

          return (
            <div
              key={sub.id}
              className="flex items-center justify-between gap-3 p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50 hover:border-zinc-700/80 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon className={`h-5 w-5 shrink-0 ${status.color}`} />
                <div className="min-w-0">
                  <p className="text-sm text-white truncate font-medium">{sub.problem}</p>
                  <p className="text-xs text-zinc-500">{formatDate(sub.date)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs shrink-0">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Code2 className="h-3.5 w-3.5" /> {sub.language}
                </span>
                <span className="text-zinc-400 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {sub.time}
                </span>
                <span className={`font-semibold ${status.color}`}>{status.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {submissions.length === 0 && (
        <div className="text-center py-8 text-zinc-600 text-sm">
          Nenhuma submissão recente
        </div>
      )}
    </section>
  );
}
