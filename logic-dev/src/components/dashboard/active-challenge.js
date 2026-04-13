"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, SkipForward, Code2 } from "lucide-react";

function parseTime(raw) {
  const parts = raw.split(":").map(Number);
  return parts[0] * 3600 + parts[1] * 60 + parts[2];
}

export function ActiveChallenge({ challenge }) {
  const [seconds, setSeconds] = useState(() => parseTime(challenge.time));
  const [running, setRunning] = useState(true);
  const intervalRef = useRef(null);

  const stop = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
      return () => stop();
    } else { stop(); }
  }, [running, stop]);

  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");

  return (
    <section className="rounded-2xl p-6 relative overflow-hidden"
      style={{ background: "rgba(139, 92, 246, 0.02)", border: "1px solid rgba(139, 92, 246, 0.05)" }}
    >
      <h3 className="text-sm font-semibold text-zinc-200 flex items-center gap-2 mb-1">
        <Code2 className="h-4 w-4" style={{ color: "#8b5cf6" }} />
        Desafio Atual
      </h3>
      <p className="text-[10px] text-zinc-600 mb-4">
        Atualmente resolvendo
      </p>

      {/* Problem name */}
      <div className="mb-4">
        <h4 className="text-base font-bold text-zinc-100">{challenge.title}</h4>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded"
            style={{ background: "rgba(168, 85, 247, 0.1)", color: "#b48bef" }}
          >
            {challenge.difficulty}
          </span>
          <span className="text-[10px] text-zinc-600 px-1.5 py-0.5 rounded"
            style={{ background: "rgba(139, 92, 246, 0.04)" }}
          >
            {challenge.language}
          </span>
        </div>
      </div>

      {/* Timer */}
      <div className="flex items-center gap-2 mb-4 font-[var(--font-mono-custom)]">
        <div className="flex items-center gap-2">
          {[
            { val: h, label: "hrs" },
            { val: m, label: "min" },
            { val: s, label: "seg" },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-lg font-bold text-zinc-700">:</span>}
              <div
                className="text-center px-2.5 py-1.5 rounded-md"
                style={{ background: "rgba(139, 92, 246, 0.06)" }}
              >
                <span className="text-xl font-bold" style={{ color: "#c4b5fd" }}>{t.val}</span>
                <span className="block text-[8px] tracking-wide mt-0.5" style={{ color: "#52525b" }}>{t.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setRunning(!running)}
          className="p-1.5 rounded-md text-white transition-all duration-200"
          style={{ background: "rgba(124, 58, 237, 0.6)" }}
        >
          {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </button>
        <button
          onClick={() => { stop(); setRunning(false); setSeconds(0); }}
          className="p-1.5 rounded-md text-zinc-600 hover:text-zinc-300 transition-colors"
          style={{ background: "rgba(139, 92, 246, 0.05)" }}
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
        <button
          className="p-1.5 rounded-md text-zinc-600 hover:text-zinc-300 transition-colors"
          style={{ background: "rgba(139, 92, 246, 0.05)" }}
        >
          <SkipForward className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  );
}
