"use client";

import { useCallback, useEffect, useRef, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { EXERCISES } from "@/data/exercises";
import { executeWorker } from "@/lib/worker";

const MonacoEditor = dynamic(() => import("@/components/MonacoEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 min-h-0 flex items-center justify-center text-zinc-600 text-sm">
      Carregando editor...
    </div>
  ),
});

const DIFFICULTY_STYLES = {
  easy: { badge: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20", label: "Fácil" },
  medium: { badge: "bg-purple-500/10 text-purple-400 border border-purple-500/20", label: "Médio" },
  hard: { badge: "bg-rose-500/10 text-rose-400 border border-rose-500/20", label: "Difícil" },
};

export default function ExerciseDetailPage({ params }) {
  const { id } = use(params);
  const exId = parseInt(id, 10);
  const exercise = EXERCISES.find((e) => e.id === exId);
  const router = useRouter();

  const [code, setCode] = useState("");
  const [messages, setMessages] = useState([]);
  const [running, setRunning] = useState(false);
  const [modal, setModal] = useState(null); // "confirm" | "solution" | null
  const [solutionCode, setSolutionCode] = useState("");
  const editorRef = useRef(null);

  if (!exercise) {
    return (
      <main className="flex-grow relative z-10 flex items-center justify-center py-24">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Exerc\u00edcio n\u00e3o encontrado</h1>
          <Link href="/exercises" className="text-purple-400 hover:text-purple-300 text-sm">
            Voltar aos exerc\u00edcios
          </Link>
        </div>
      </main>
    );
  }

  const style = DIFFICULTY_STYLES[exercise.difficultyKey];

  useEffect(() => {
    setCode(exercise.starter);
    setMessages([]);
  }, [exercise]);

  const appendMessage = useCallback((type, text) => {
    setMessages((prev) => [...prev, { type, text }]);
  }, []);

  const handleRun = useCallback(async () => {
    if (running || !editorRef.current) return;

    const currentCode = editorRef.current.getValue().trim();
    if (!currentCode) {
      appendMessage("runtimeError", "\u26a0 Editor vazio. Escreva sua solu\u00e7\u00e3o antes de executar.");
      return;
    }

    setRunning(true);
    setMessages([]);
    appendMessage(
      "system",
      `\u25ba Executando "${exercise.title}" \u2014 ${exercise.testCases?.length ?? 0} teste(s) agendado(s)`
    );

    try {
      const results = await executeWorker({
        code: currentCode,
        fnName: exercise.fnName,
        testCases: exercise.testCases ?? [],
      });

      for (const msg of results) {
        if (msg.type === "console") {
          appendMessage(msg.method, msg.text);
        } else if (msg.type === "testResult") {
          if (msg.passed) {
            appendMessage("testPass", `\u2705 ${msg.label}`);
          } else if (msg.error) {
            appendMessage("testFail", `\u274c ${msg.label} \u2014 Erro: ${msg.error}`);
          } else {
            appendMessage(
              "testFail",
              `\u274c ${msg.label}\n   Esperado:  ${msg.expected}\n   Recebido:  ${msg.received}`
            );
          }
        } else if (msg.type === "error") {
          appendMessage("runtimeError", `\u2716 ${msg.errorType ?? "Error"}: ${msg.message}`);
        }
      }
    } catch {
      appendMessage("runtimeError", "Erro inesperado na execu\u00e7\u00e3o.");
    }

    setRunning(false);
  }, [running, exercise, appendMessage]);

  const handleShowSolution = useCallback(() => {
    setModal("confirm");
  }, []);

  const handleConfirmSolution = useCallback(() => {
    setModal(null);
    setSolutionCode(exercise.solution);
    setTimeout(() => setModal("solution"), 150);
  }, [exercise.solution]);

  const handleHideModal = useCallback(() => {
    setModal(null);
  }, []);

  // onMount callback — store editor reference for run access
  const onEditorMount = useCallback((editor) => {
    editorRef.current = editor;
  }, []);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        handleHideModal();
      }
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        handleRun();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleRun, handleHideModal]);

  const copySolution = useCallback(() => {
    navigator.clipboard?.writeText(solutionCode);
  }, [solutionCode]);

  return (
    <main className="flex-grow relative z-10">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/exercises"
              className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium"
            >
              <i className="fa-solid fa-arrow-left transition-transform group-hover:-translate-x-1" /> Exercícios
            </Link>
            <div className="h-4 w-px bg-zinc-800" />
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight font-[var(--font-syne)]">
              {exercise.title}
            </h2>
            <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${style.badge}`}>
              {style.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => appendMessage("system", `\u{1F4A1} Dica: ${exercise.hint}`)}
              className="px-4 py-2 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold tracking-wide transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-lightbulb text-[10px] text-yellow-500/80" /> Dica
            </button>
            <button
              onClick={handleShowSolution}
              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-bold tracking-wide transition-all flex items-center gap-2 border border-zinc-700/50"
            >
              <i className="fa-solid fa-code text-[10px] text-purple-400" /> Solução
            </button>
          </div>
        </div>

        {/* Split panel */}
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-220px)] min-h-[520px]">
          {/* LEFT: Instructions */}
          <div className="flex flex-col gap-5 overflow-y-auto pr-1 scrollbar-none">
            <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/60 rounded-2xl p-6">
              <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Descrição</p>
              <p className="text-zinc-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: exercise.description }} />
            </div>

            <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/60 rounded-2xl p-6">
              <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-4">Restrições</p>
              <ul className="flex flex-col gap-3">
                {exercise.constraints.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-zinc-400 text-sm">
                    <i className="fa-solid fa-circle-dot text-purple-500 text-[8px] mt-1.5 flex-shrink-0" />
                    <span dangerouslySetInnerHTML={{ __html: c }} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/60 rounded-2xl p-6">
              <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-4">Exemplos</p>
              <div className="flex flex-col gap-3">
                {exercise.examples.map((ex, i) => (
                  <div key={i} className="rounded-lg bg-zinc-900 border border-zinc-800 p-3 font-mono text-xs">
                    <div className="flex gap-3 mb-1">
                      <span className="text-zinc-500 select-none w-12 flex-shrink-0">input</span>
                      <span className="text-purple-300">{ex.input}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-zinc-500 select-none w-12 flex-shrink-0">output</span>
                      <span className="text-green-300">{ex.output}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Monaco Editor + Console */}
          <div className="flex flex-col rounded-2xl overflow-hidden border border-zinc-800/60 bg-zinc-950 shadow-2xl shadow-black/40">
            {/* Editor chrome bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/80 flex-shrink-0">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs text-zinc-500 ml-3 font-mono">solution.js</span>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[10px] text-zinc-600 font-mono">JavaScript</span>
              </div>
            </div>

            <div className="flex-1 min-h-0">
              <MonacoEditor
                value={code}
                onChange={setCode}
                onMount={onEditorMount}
              />
            </div>

            {/* Virtual Console */}
            <div className="flex-shrink-0 border-t border-zinc-800">
              <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/80">
                <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <i className="fa-solid fa-terminal text-purple-500/70" /> Saída
                </span>
                <button
                  onClick={() => setMessages([])}
                  className="text-[10px] text-zinc-600 hover:text-zinc-400 transition-colors font-mono tracking-wide"
                >
                  limpar
                </button>
              </div>
              <div id="console-output" className="h-36 overflow-y-auto bg-[#0a0a0d] px-4 py-3 font-mono text-xs leading-relaxed">
                {messages.map((msg, i) => (
                  <div key={i} className={`${STYLES[msg.type] ?? "text-zinc-300"} leading-relaxed whitespace-pre-wrap break-all`}>
                    {msg.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with Run button */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-800 bg-zinc-900/80 flex-shrink-0">
              <span className="text-[10px] text-zinc-600 font-mono">Ctrl + Enter para executar</span>
              <button
                onClick={handleRun}
                disabled={running}
                className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-bold tracking-wide transition-all flex items-center gap-2 shadow-lg shadow-purple-900/30"
              >
                {running ? <i className="fa-solid fa-spinner fa-spin text-[10px]" /> : <i className="fa-solid fa-play text-[10px]" />}{" "}
                {running ? "Executando\u2026" : "Executar"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {modal === "confirm" && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-500"
          onClick={handleHideModal}
        >
          <div
            className="modal-card w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl transform scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20">
                <i className="fa-solid fa-triangle-exclamation text-2xl text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Ver solução?</h3>
              <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
                O aprendizado acontece quando você tenta resolver sozinho. Deseja ver a solução agora?
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={handleHideModal}
                  className="flex-1 py-3 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white font-bold text-sm transition-all"
                >
                  Ainda não
                </button>
                <button
                  onClick={handleConfirmSolution}
                  className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm transition-all shadow-lg shadow-purple-900/30"
                >
                  Sim, mostrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Solution Modal */}
      {modal === "solution" && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-500"
          onClick={handleHideModal}
        >
          <div
            className="modal-card w-full max-w-2xl bg-zinc-900/90 backdrop-blur-2xl border border-zinc-800/50 rounded-3xl overflow-hidden shadow-2xl transform scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/50 bg-zinc-900/30">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-code text-purple-500" />
                <span className="text-sm font-bold text-white uppercase tracking-widest">Solução de Referência</span>
              </div>
              <button
                onClick={handleHideModal}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all"
              >
                <i className="fa-solid fa-xmark text-lg" />
              </button>
            </div>
            <div className="p-6">
              <div className="rounded-2xl overflow-hidden border border-zinc-800/50" style={{ height: 350 }}>
                <MonacoEditor value={solutionCode} readOnly />
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-xs text-zinc-500 font-medium">Use esta solução como referência para seus estudos.</p>
                <button
                  onClick={copySolution}
                  className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-bold transition-all flex items-center gap-2"
                >
                  <i className="fa-solid fa-copy text-[10px]" /> Copiar Código
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

const STYLES = {
  log: "text-zinc-200",
  warn: "text-yellow-300",
  error: "text-red-400",
  info: "text-blue-300",
  debug: "text-zinc-500",
  system: "text-purple-300",
  testPass: "text-green-400",
  testFail: "text-red-400",
  runtimeError: "text-red-500",
};
