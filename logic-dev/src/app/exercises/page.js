"use client";

import { useState } from "react";
import Link from "next/link";
import { EXERCISES } from "@/data/exercises";

const DIFFICULTY_STYLES = {
  easy: { badge: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20", label: "Fácil" },
  medium: { badge: "bg-purple-500/10 text-purple-400 border border-purple-500/20", label: "Médio" },
  hard: { badge: "bg-rose-500/10 text-rose-400 border border-rose-500/20", label: "Difícil" },
};

export default function ExercisesPage() {
  const [search, setSearch] = useState("");

  const filtered = EXERCISES.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="flex-grow relative z-10">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium mb-8 group">
          <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1" /> Voltar ao Menu
        </Link>
        {/* Cabeçalho e Busca */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-white tracking-tight">
              Ambiente de Tarefas
            </h1>
            <p className="text-zinc-400 text-sm">
              Selecione um exercício abaixo para iniciar a resolução.
            </p>
          </div>
          <div className="relative w-full md:w-80 shadow-lg shadow-black/20 rounded-lg">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm" />
            <input
              type="text"
              placeholder="Buscar exercício..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900/60 backdrop-blur-md border border-zinc-700/50 rounded-lg py-2.5 pl-9 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all"
            />
          </div>
        </div>

        {/* Lista de Exercícios */}
        <div className="flex flex-col gap-4">
          {filtered.map((ex) => {
            const style = DIFFICULTY_STYLES[ex.difficultyKey];
            return (
              <div
                key={ex.id}
                className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-700/50 rounded-xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-zinc-500 hover:bg-zinc-900/70 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-300 group"
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className="w-10 h-10 rounded-lg bg-purple-600/20 text-purple-400 flex items-center justify-center flex-shrink-0">
                      <i className={`fa-solid ${ex.icon || "fa-code"}`} />
                    </div>
                    <h3 className="font-bold text-lg text-zinc-100 group-hover:text-white transition-colors">
                      {ex.title}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${style.badge}`}
                    >
                      {style.label}
                    </span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {ex.description.replace(/<[^>]*>/g, "")}
                  </p>
                </div>
                <Link
                  href={`/exercises/${ex.id}`}
                  className="w-full md:w-auto px-6 py-2.5 rounded-lg bg-zinc-100 text-zinc-950 hover:bg-white text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Resolver</span>{" "}
                  <i className="fa-solid fa-play text-xs" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="flex items-center justify-center flex-col py-20 px-4 text-center">
            <div className="w-16 h-16 mb-5 rounded-full bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50">
              <i className="fa-solid fa-ghost text-2xl text-zinc-500" />
            </div>
            <h3 className="text-zinc-200 font-bold text-lg mb-1">
              Nenhum exercício encontrado
            </h3>
            <p className="text-zinc-500 text-sm">
              Tente buscar por um termo diferente ou limpe o filtro.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
