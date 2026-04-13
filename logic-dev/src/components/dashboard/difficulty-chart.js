"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { BarChart3 } from "lucide-react";

const BAR_COLORS = {
  Fácil: "#16a34a",
  Médio: "#4ade80",
  Difícil: "#71717a",
  Hard: "#15803d",
  Expert: "#166534",
  Bonus: "#86efac",
};

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.[0]) return null;
  const d = payload[0].payload;
  return (
    <div
      className="px-3 py-2 text-xs rounded-lg bg-[#111114] border border-white/5 shadow-2xl"
    >
      <p className="font-semibold text-zinc-200 mb-1">{d.name}</p>
      <p className="text-zinc-400">Resolvidos: <span className="text-zinc-100 font-semibold">{d.resolvidos}</span></p>
      <p className="text-zinc-500">Total: {d.total}</p>
    </div>
  );
}

export function DifficultyChartChart({ data }) {
  return (
    <section className="rounded-2xl p-6 relative bg-[#0a0a0c] border border-white/5 shadow-lg">
      <div className="flex items-baseline gap-2 mb-6">
        <BarChart3 className="h-4 w-4 shrink-0 text-purple-400" />
        <div>
          <h3 className="text-sm font-semibold text-zinc-200">Análise de Soluções</h3>
          <p className="text-[11px] text-zinc-600">por dificuldade</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.02)" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "#52525b", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              dy={8}
            />
            <YAxis
              tick={{ fill: "#52525b", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(139, 92, 246, 0.04)" }} />
            <Bar dataKey="resolvidos" radius={[4, 4, 0, 0]}>
              {data.map((entry, i) => (
                <Bar key={i} fill={BAR_COLORS[entry.name] || "#16a34a"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
