import { Users, Flame, Zap } from "lucide-react";

export function RankingStats() {
  const stats = [
    { label: "Usuários Ativos", value: "8,439", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Maior Streak", value: "142 dias", icon: Flame, color: "text-orange-400", bg: "bg-orange-500/10" },
    { label: "Média de XP", value: "2,150", icon: Zap, color: "text-fuchsia-400", bg: "bg-fuchsia-500/10" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="glass-panel p-5 rounded-2xl flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg}`}>
              <Icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-zinc-400 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-0.5">{stat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
