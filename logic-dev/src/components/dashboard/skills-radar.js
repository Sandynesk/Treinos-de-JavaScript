"use client";

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

export function SkillsRadar({ skills }) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-6">
      <h2 className="text-lg font-bold text-white mb-2 font-[var(--font-syne)]">
        Mapa de Habilidades
      </h2>
      <p className="text-zinc-500 text-sm mb-4">
        Sua proficiência por tópico de algoritmos
      </p>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={skills}>
            <PolarGrid stroke="#3f3f46" />
            <PolarAngleAxis
              dataKey="topic"
              tick={{ fill: "#a1a1aa", fontSize: 11, fontWeight: 500 }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: "#52525b", fontSize: 10 }}
              axisLine={false}
            />
            <Radar
              name="Proficiência"
              dataKey="value"
              stroke="#8b5cf6"
              strokeWidth={2}
              fill="#8b5cf6"
              fillOpacity={0.2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
