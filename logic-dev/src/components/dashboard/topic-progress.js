"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Target } from "lucide-react";

const COLORS = ["#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd"];

export function TopicProgress({ data }) {
  const totalPercent = data.reduce((a, b) => a + b.value, 0);

  return (
    <section className="rounded-2xl p-6"
      style={{ background: "rgba(139, 92, 246, 0.02)", border: "1px solid rgba(139, 92, 246, 0.05)" }}
    >
      <div className="flex items-baseline gap-2 mb-5">
        <Target className="h-4 w-4 shrink-0" style={{ color: "#8b5cf6" }} />
        <div>
          <h3 className="text-sm font-semibold text-zinc-200">Proficiência por Tópico</h3>
          <p className="text-[10px] text-zinc-600 mt-0.5">Distribuição dos problemas resolvidos</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        {/* Donut */}
        <div className="w-36 h-36 relative shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={60}
                paddingAngle={6}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-white">{totalPercent}%</span>
            <span className="text-[9px] text-zinc-600 font-medium">Completo</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2.5 min-w-0 flex-1">
          {data.map((item, i) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <div className="min-w-0">
                <p className="text-xs text-zinc-300 font-medium truncate">{item.name}</p>
                <p className="text-[10px] text-zinc-600">{item.value}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
