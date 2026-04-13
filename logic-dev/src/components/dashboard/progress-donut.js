"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = { easy: "#22c55e", medium: "#eab308", hard: "#ef4444" };
const LABELS = { easy: "Fácil", medium: "Médio", hard: "Difícil" };

function sum(obj) {
  return Object.values(obj).reduce((a, b) => a + b.solved, 0);
}

export function ProgressDonut({ progress }) {
  const total = sum(progress);
  const data = Object.entries(progress).map(([key, val]) => ({
    name: LABELS[key],
    value: val.solved,
    fill: COLORS[key],
    diff: `${val.solved}/${val.total}`,
  }));

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-6">
      <h2 className="text-lg font-bold text-white mb-2 font-[var(--font-syne)]">
        Progresso por Dificuldade
      </h2>
      <p className="text-zinc-500 text-sm mb-4">
        {total} problema{total !== 1 ? "s" : ""} resolvido{total !== 1 ? "s" : ""} no total
      </p>

      <div className="flex items-center gap-4">
        <div className="w-40 h-40 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                content={({ payload }) => {
                  if (!payload?.length) return null;
                  const item = payload[0].payload;
                  return (
                    <div className="rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-xs shadow-xl">
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-zinc-400">{item.diff}</p>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.fill }} />
              <div>
                <p className="text-zinc-300 text-sm font-medium">{item.name}</p>
                <p className="text-zinc-500 text-xs">{item.diff}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
