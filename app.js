/* ==========================================================================
   app.js — Logic.dev Exercise Platform
   Author: Sandynesk
   ========================================================================== */

'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. EXERCISE DATA
// ─────────────────────────────────────────────────────────────────────────────

const EXERCISES = [
    {
        id: 1,
        title: 'Inversão de String',
        difficulty: 'Fácil',
        difficultyKey: 'easy',
        fnName: 'inverterString',          // Nome exato da função que o aluno deve definir
        description:
            'Crie uma função que recebe uma string e a retorna completamente invertida, sem usar métodos nativos como <code>.reverse()</code>.',
        constraints: [
            'Não utilize <code>.split().reverse().join()</code>.',
            'A função deve ser pura — sem efeitos colaterais.',
            'Considere strings com qualquer tipo de caractere.',
        ],
        examples: [
            { input: 'inverterString("hello")', output: '"olleh"' },
            { input: 'inverterString("JavaScript")', output: '"tpircSavaJ"' },
        ],
        testCases: [
            { args: ['hello'], expected: 'olleh', label: 'Teste 1: "hello" → "olleh"' },
            { args: ['JavaScript'], expected: 'tpircSavaJ', label: 'Teste 2: "JavaScript" → "tpircSavaJ"' },
            { args: [''], expected: '', label: 'Teste 3: string vazia' },
            { args: ['a'], expected: 'a', label: 'Teste 4: carácter único' },
        ],
        starter:
            `function inverterString(str) {
  // Seu código aqui

}

// Teste
console.log(inverterString("hello")); // "olleh"`,
    },

    {
        id: 2,
        title: 'Validador de Anagramas',
        difficulty: 'Médio',
        difficultyKey: 'medium',
        fnName: 'isAnagram',
        description:
            'Verifique se duas palavras fornecidas são anagramas exatos uma da outra. A verificação deve ser case-insensitive e ignorar espaços extras.',
        constraints: [
            'A comparação deve ignorar maiúsculas/minúsculas.',
            'Espaços em branco devem ser removidos antes da comparação.',
            'Retorne um valor booleano.',
        ],
        examples: [
            { input: 'isAnagram("listen", "silent")', output: 'true' },
            { input: 'isAnagram("hello", "world")', output: 'false' },
        ],
        testCases: [
            { args: ['listen', 'silent'], expected: true, label: 'Teste 1: "listen" / "silent"' },
            { args: ['hello', 'world'], expected: false, label: 'Teste 2: "hello" / "world"' },
            { args: ['Astronomer', 'Moon starer'], expected: true, label: 'Teste 3: ignora espaços' },
            { args: ['rat', 'car'], expected: true, label: 'Teste 4: "rat" / "car"' },
        ],
        starter:
            `function isAnagram(a, b) {
  // Seu código aqui

}

// Teste
console.log(isAnagram("listen", "silent")); // true`,
    },

    {
        id: 3,
        title: 'Caminho mais curto (Dijkstra)',
        difficulty: 'Difícil',
        difficultyKey: 'hard',
        fnName: 'dijkstra',
        description:
            'Implemente o algoritmo de Dijkstra para encontrar o caminho de menor custo entre dois nós em um grafo ponderado e não-direcionado.',
        constraints: [
            'O grafo é representado como lista de adjacência.',
            'Todos os pesos de arestas são inteiros positivos.',
            'Retorne tanto a distância mínima quanto o caminho percorrido.',
        ],
        examples: [
            {
                input: 'dijkstra(graph, "A", "C")',
                output: '{ distance: 3, path: ["A","B","C"] }',
            },
        ],
        testCases: [
            {
                args: [
                    { A: [{ node: 'B', weight: 1 }], B: [{ node: 'A', weight: 1 }, { node: 'C', weight: 2 }], C: [{ node: 'B', weight: 2 }] },
                    'A', 'C',
                ],
                expected: { distance: 3, path: ['A', 'B', 'C'] },
                label: 'Teste 1: A → C peso 3',
            },
        ],
        starter:
            `function dijkstra(graph, start, end) {
  // Seu código aqui
  // graph = { A: [{node:"B",weight:1}], B: [{node:"A",weight:1},{node:"C",weight:2}], ... }

}

// Teste
const graph = {
  A: [{ node: "B", weight: 1 }],
  B: [{ node: "A", weight: 1 }, { node: "C", weight: 2 }],
  C: [{ node: "B", weight: 2 }],
};
console.log(dijkstra(graph, "A", "C"));`,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. STATE
// ─────────────────────────────────────────────────────────────────────────────

let currentExercise = null;
let isTransitioning = false;

// ─────────────────────────────────────────────────────────────────────────────
// 3. HELPERS
// ─────────────────────────────────────────────────────────────────────────────

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const DIFFICULTY_STYLES = {
    easy: { badge: 'bg-green-500/20 text-green-300 border border-green-500/30', label: 'Fácil' },
    medium: { badge: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30', label: 'Médio' },
    hard: { badge: 'bg-red-500/20 text-red-300 border border-red-500/30', label: 'Difícil' },
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. OVERLAY — DOM REFERENCES (resolved after DOMContentLoaded)
// ─────────────────────────────────────────────────────────────────────────────

let overlay, overlayInner, overlayEyebrow, overlayTitle, overlayBadge;

function resolveOverlayRefs() {
    overlay = document.getElementById('transition-overlay');
    overlayInner = document.getElementById('overlay-inner');
    overlayEyebrow = document.getElementById('overlay-eyebrow');
    overlayTitle = document.getElementById('overlay-title');
    overlayBadge = document.getElementById('overlay-badge');
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. THE CINEMATIC TRANSITION — async choreography
//
//    Timeline (total ≈ 3.7s):
//    T+0ms    → Body locked, overlay begins fade-in (700ms)
//    T+700ms  → Overlay opaque. Title + eyebrow slide up into view (600ms)
//    T+1300ms → Title fully visible. "O Respiro" — hold for 1400ms
//    T+2700ms → DOM updated silently. Title fades out (500ms)
//    T+3200ms → Overlay begins fade-out (700ms). Detail view enters (fade)
//    T+3900ms → Body unlocked. Transition complete.
// ─────────────────────────────────────────────────────────────────────────────

async function transitionToExercise(exercise) {
    if (isTransitioning) return;
    isTransitioning = true;

    // ── Populate overlay content ───────────────────────────────────────────
    const style = DIFFICULTY_STYLES[exercise.difficultyKey];
    overlayEyebrow.textContent = 'Próximo desafio';
    overlayTitle.textContent = exercise.title;
    overlayBadge.className = `text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${style.badge}`;
    overlayBadge.textContent = style.label;

    // Reset inner position (in case of a second call)
    overlayInner.style.opacity = '0';
    overlayInner.style.transform = 'translateY(28px)';

    // ── Step 1: Lock body, fade in overlay (700ms) ─────────────────────────
    document.body.style.pointerEvents = 'none';
    overlay.style.opacity = '1';
    await sleep(750);

    // ── Step 2: Slide title into view (600ms ease-out-expo) ───────────────
    overlayInner.style.opacity = '1';
    overlayInner.style.transform = 'translateY(0)';
    await sleep(600 + 1400); // animation (600ms) + breath hold (1400ms)

    // ── Step 3: Update DOM silently behind the overlay ────────────────────
    renderDetail(exercise);
    currentExercise = exercise;

    // ── Step 4: Fade out title (500ms) ────────────────────────────────────
    overlayInner.style.opacity = '0';
    overlayInner.style.transform = 'translateY(-16px)';
    await sleep(550);

    // ── Step 5: Switch views while overlay is still opaque ────────────────
    showView('detail-view');
    await sleep(60); // one frame — let browser paint the detail view

    // ── Step 6: Fade out overlay, reveal new view (700ms) ─────────────────
    overlay.style.opacity = '0';
    await sleep(750);

    // ── Done ──────────────────────────────────────────────────────────────
    document.body.style.pointerEvents = '';
    isTransitioning = false;
}

// Back-to-list: simpler reverse overlay (no title needed)
async function transitionToList() {
    if (isTransitioning) return;
    isTransitioning = true;

    overlayInner.style.opacity = '0';
    overlayInner.style.transform = 'translateY(28px)';
    document.body.style.pointerEvents = 'none';

    overlay.style.opacity = '1';
    await sleep(600);

    showView('list-view');
    currentExercise = null;
    await sleep(60);

    overlay.style.opacity = '0';
    await sleep(700);

    document.body.style.pointerEvents = '';
    isTransitioning = false;
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. VIEW SWITCHER
// ─────────────────────────────────────────────────────────────────────────────

function showView(activeId) {
    ['list-view', 'detail-view'].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (id === activeId) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. RENDER EXERCISE DETAIL VIEW
// ─────────────────────────────────────────────────────────────────────────────

function renderDetail(exercise) {
    const style = DIFFICULTY_STYLES[exercise.difficultyKey];

    // Header
    document.getElementById('detail-title').textContent = exercise.title;
    const badge = document.getElementById('detail-badge');
    badge.className = `text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${style.badge}`;
    badge.textContent = style.label;

    // Description
    document.getElementById('detail-desc').innerHTML = exercise.description;

    // Constraints
    const ul = document.getElementById('detail-constraints');
    ul.innerHTML = exercise.constraints
        .map((c) => `<li class="flex items-start gap-2 text-zinc-400 text-sm">
      <i class="fa-solid fa-circle-dot text-purple-500 text-[8px] mt-1.5 flex-shrink-0"></i>
      <span>${c}</span>
    </li>`)
        .join('');

    // Examples
    const exDiv = document.getElementById('detail-examples');
    exDiv.innerHTML = exercise.examples
        .map((ex) => `
      <div class="rounded-lg bg-zinc-900 border border-zinc-800 p-3 font-mono text-xs">
        <div class="flex gap-3 mb-1">
          <span class="text-zinc-500 select-none w-12 flex-shrink-0">input</span>
          <span class="text-purple-300">${ex.input}</span>
        </div>
        <div class="flex gap-3">
          <span class="text-zinc-500 select-none w-12 flex-shrink-0">output</span>
          <span class="text-green-300">${ex.output}</span>
        </div>
      </div>`)
        .join('');

    // Monaco Editor — update content (replaces old textarea.value)
    MonacoManager.setContent(exercise.starter);

    // Clear previous console output for a fresh session
    ConsoleRenderer.clear();
}


// ─────────────────────────────────────────────────────────────────────────────
// 8. SEARCH FILTER (list view)
// ─────────────────────────────────────────────────────────────────────────────

function initSearch() {
    const searchInput = document.getElementById('search-input');
    const cards = document.querySelectorAll('.exercise-card');
    const emptyState = document.getElementById('empty-state');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase().trim();
        let visible = 0;

        cards.forEach((card) => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const match = title.includes(term);
            card.classList.toggle('hidden', !match);
            if (match) visible++;
        });

        emptyState.classList.toggle('hidden', visible > 0);
        emptyState.classList.toggle('flex', visible === 0);
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// 9. BIND SOLVE BUTTONS
// ─────────────────────────────────────────────────────────────────────────────

function initSolveButtons() {
    document.querySelectorAll('.btn-solve').forEach((btn) => {
        btn.addEventListener('click', function () {
            const id = parseInt(this.dataset.exerciseId, 10);
            const exercise = EXERCISES.find((e) => e.id === id);
            if (exercise) transitionToExercise(exercise);
        });
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// 10. MONACO EDITOR MANAGER
//     Lazy-loads Monaco from CDN and manages a single editor instance.
//     Uses automaticLayout: true so it fills its flex container correctly.
// ─────────────────────────────────────────────────────────────────────────────

const MonacoManager = (() => {
    let editor = null;
    let isReady = false;
    let pendingCode = null; // code set before Monaco finishes loading

    function init() {
        // AMD loader config — Monaco files come from CDN
        window.require.config({
            paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' },
        });

        window.require(['vs/editor/editor.main'], () => {
            const container = document.getElementById('monaco-editor-container');
            if (!container) return;

            editor = monaco.editor.create(container, {
                value: '',
                language: 'javascript',
                theme: 'vs-dark',
                fontSize: 13,
                lineHeight: 22,
                fontFamily: "'JetBrains Mono','Fira Code','Cascadia Code',monospace",
                fontLigatures: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,   // resizes with the flex container
                padding: { top: 16, bottom: 16 },
                renderLineHighlight: 'gutter',
                overviewRulerBorder: false,
                hideCursorInOverviewRuler: true,
                contextmenu: false,
                tabSize: 2,
            });

            // Ctrl+Enter shortcut → trigger the run button
            editor.addCommand(
                monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
                () => document.getElementById('run-btn')?.click()
            );

            isReady = true;

            // Apply any content that was set before Monaco was ready
            if (pendingCode !== null) {
                editor.setValue(pendingCode);
                pendingCode = null;
            }
        });
    }

    function setContent(code) {
        if (editor && isReady) {
            editor.setValue(code);
            editor.setScrollPosition({ scrollTop: 0 });
        } else {
            // Monaco not ready yet — queue the content
            pendingCode = code;
        }
    }

    function getContent() {
        return editor?.getValue() ?? '';
    }

    return { init, setContent, getContent };
})();

// ─────────────────────────────────────────────────────────────────────────────
// 11. WORKER MANAGER
//     Creates a fresh Web Worker for every execution run.
//     Protects against infinite loops with a 2-second hard timeout.
// ─────────────────────────────────────────────────────────────────────────────

const WorkerManager = (() => {
    const TIMEOUT_MS = 2000; // kill worker after 2s of silence

    /**
     * Executes student code in a sandboxed worker.
     * @param {{ code: string, fnName: string, testCases: Array }} payload
     * @param {{ onConsole, onTestResult, onError, onDone }}         handlers
     */
    function execute(payload, { onConsole, onTestResult, onError, onDone }) {
        // A fresh worker per run guarantees clean state — no leaked variables
        // between executions even if the previous run crashed.
        const worker = new Worker('executor.worker.js');
        let killed = false;

        // ── Timeout: protects against infinite loops ────────────────────────
        // If the worker doesn't send 'done' within 2s, we terminate it hard.
        const timeoutId = setTimeout(() => {
            killed = true;
            worker.terminate();
            onError({
                errorType: 'TimeoutError',
                message: '\u23f1 Timeout: loop infinito ou c\u00f3digo muito lento detectado (limite: 2s).',
            });
            onDone();
        }, TIMEOUT_MS);

        worker.onmessage = ({ data }) => {
            if (killed) return; // messages arriving after termination are discarded
            switch (data.type) {
                case 'console': onConsole(data); break;
                case 'testResult': onTestResult(data); break;
                case 'error': onError(data); break;
                case 'done':
                    clearTimeout(timeoutId);
                    worker.terminate(); // clean up — we never reuse workers
                    onDone();
                    break;
            }
        };

        worker.onerror = (ev) => {
            if (killed) return;
            clearTimeout(timeoutId);
            worker.terminate();
            onError({ errorType: 'RuntimeError', message: ev.message ?? 'Erro desconhecido no worker.' });
            onDone();
        };

        worker.postMessage(payload);
    }

    return { execute };
})();

// ─────────────────────────────────────────────────────────────────────────────
// 12. CONSOLE RENDERER
//     Appends styled lines to #console-output.
//     auto-scrolls to the latest message.
// ─────────────────────────────────────────────────────────────────────────────

const ConsoleRenderer = (() => {
    // Tailwind colour classes per message type
    const STYLES = {
        log: 'text-zinc-200',
        warn: 'text-yellow-300',
        error: 'text-red-400',
        info: 'text-blue-300',
        debug: 'text-zinc-500',
        system: 'text-purple-300',
        testPass: 'text-green-400',
        testFail: 'text-red-400',
        runtimeError: 'text-red-500',
    };

    function output() { return document.getElementById('console-output'); }

    function append(type, text) {
        const container = output();
        if (!container) return;

        const line = document.createElement('div');
        line.className = `${STYLES[type] ?? 'text-zinc-300'} leading-relaxed whitespace-pre-wrap break-all`;
        line.textContent = text;
        container.appendChild(line);

        // Always scroll to the newest message
        container.scrollTop = container.scrollHeight;
    }

    function clear() {
        const container = output();
        if (container) container.innerHTML = '';
    }

    return { append, clear };
})();

// ─────────────────────────────────────────────────────────────────────────────
// 13. RUN BUTTON — wires the Executar button to WorkerManager
// ─────────────────────────────────────────────────────────────────────────────

function initRunButton() {
    const runBtn = document.getElementById('run-btn');
    const clearBtn = document.getElementById('clear-console-btn');

    if (clearBtn) {
        clearBtn.addEventListener('click', () => ConsoleRenderer.clear());
    }

    if (!runBtn) return;

    runBtn.addEventListener('click', () => {
        if (!currentExercise) return;

        const code = MonacoManager.getContent().trim();
        if (!code) {
            ConsoleRenderer.append('runtimeError', '\u26a0 Editor vazio. Escreva sua solu\u00e7\u00e3o antes de executar.');
            return;
        }

        // ── UI: enter executing state ──────────────────────────────────────
        runBtn.disabled = true;
        runBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin text-[10px]"></i> Executando…`;
        ConsoleRenderer.clear();
        ConsoleRenderer.append('system',
            `\u25ba Executando "${currentExercise.title}" — ${currentExercise.testCases?.length ?? 0} teste(s) agendado(s)`);

        // ── Dispatch to Worker ─────────────────────────────────────────────
        WorkerManager.execute(
            { code, fnName: currentExercise.fnName, testCases: currentExercise.testCases ?? [] },
            {
                onConsole({ method, text }) {
                    ConsoleRenderer.append(method, text);
                },
                onTestResult({ passed, label, received, expected, error }) {
                    if (passed) {
                        ConsoleRenderer.append('testPass', `\u2705 ${label}`);
                    } else if (error) {
                        ConsoleRenderer.append('testFail', `\u274c ${label} \u2014 Erro: ${error}`);
                    } else {
                        ConsoleRenderer.append('testFail',
                            `\u274c ${label}\n   Esperado:  ${expected}\n   Recebido:  ${received}`);
                    }
                },
                onError({ errorType, message }) {
                    ConsoleRenderer.append('runtimeError', `\u2716 ${errorType ?? 'Error'}: ${message}`);
                },
                onDone() {
                    // ── UI: restore idle state ─────────────────────────────
                    runBtn.disabled = false;
                    runBtn.innerHTML = `<i class="fa-solid fa-play text-[10px]"></i> Executar`;
                },
            }
        );
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// 14. INIT
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    resolveOverlayRefs();
    initSearch();
    initSolveButtons();
    initRunButton();

    // Monaco editor — loads asynchronously from CDN
    // The AMD loader script must be present in exercicios.html
    if (window.require) {
        MonacoManager.init();
    }

    // Back-to-portfolio (cross-doc)
    document.getElementById('btn-back')?.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Back-to-list (from detail view, same-page)
    document.getElementById('btn-back-to-list')?.addEventListener('click', () => {
        transitionToList();
    });
});
