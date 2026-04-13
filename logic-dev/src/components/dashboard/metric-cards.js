"use client";

import { ArrowUpRight, CheckCircle2, Zap, Flame } from "lucide-react";

const ICONS = {
  solved: ArrowUpRight,
  accepted: CheckCircle2,
  contests: Zap,
  streak: Flame,
};

export function MetricCards({ metrics }) {
  const entries = [
    { key: "solved", data: metrics.solved },
    { key: "accepted", data: metrics.accepted },
    { key: "contests", data: metrics.contests },
    { key: "streak", data: metrics.streak },
  ];

  return (
    <section
      className="rounded-2xl p-6 bg-[#0a0a0c] border border-white/5 shadow-lg"
    >
      <div className="flex items-baseline gap-8 lg:gap-12">
        {entries.map(({ key, data }) => {
          const Icon = ICONS[key];
          const iconColor = key === "solved"
            ? "#a78bfa"
            : key === "streak"
              ? "#8b5cf6"
              : "#7c3aed";

          return (
            <div key={key} className="flex items-start gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: `${iconColor}12` }}
              >
                <Icon className="h-4 w-4" style={{ color: iconColor }} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{data.value}</span>
                  {key === "solved" && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                      style={{ background: "rgba(139, 92, 246, 0.08)", color: "#a78bfa" }}
                    >
                      {data.change}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-500 mt-0.5 font-medium">{data.label}</p>
                {data.sub && <p className="text-[10px] text-zinc-600 mt-0.5">{data.sub}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
