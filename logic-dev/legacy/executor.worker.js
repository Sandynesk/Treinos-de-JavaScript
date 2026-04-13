/* ==========================================================================
   executor.worker.js — Sandboxed Code Execution Environment
   ─────────────────────────────────────────────────────────────────────────
   Security model:
   ① Dangerous browser APIs are nullified via Object.defineProperty so any
     access immediately throws a TypeError (read-only getter that throws).
   ② All console.* methods are intercepted and forwarded to the main thread
     via postMessage so they appear in the UI console, not the devtools.
   ③ Student code runs inside new Function() wrapped in try/catch — syntax
     errors and runtime errors are caught and reported, never crashing the
     worker or the main page.
   ④ The main thread owns a 2-second timeout. If this worker stalls (e.g.
     an infinite loop), the main thread calls worker.terminate() itself.
   ========================================================================== */

'use strict';

// ─────────────────────────────────────────────────────────────────────────────
// 1. BLOCK DANGEROUS APIs
//    Network, storage, and external-communication APIs are locked out.
//    Students should focus on pure algorithmic logic — no side effects.
// ─────────────────────────────────────────────────────────────────────────────

const BLOCKED = [
    'fetch', 'XMLHttpRequest', 'WebSocket', 'EventSource',
    'indexedDB', 'localStorage', 'sessionStorage', 'openDatabase',
    'caches', 'Notification', 'navigator', 'location', 'crypto',
];

BLOCKED.forEach((api) => {
    // Only block APIs that exist in the Worker global scope
    if (!(api in globalThis)) return;
    try {
        Object.defineProperty(globalThis, api, {
            get() {
                throw new TypeError(
                    `🔒 API bloqueada: '${api}' não está disponível neste ambiente seguro.`
                );
            },
            configurable: false,
        });
    } catch (_) {
        // Some environments don't allow redefining — silently skip
        globalThis[api] = null;
    }
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. INTERCEPT CONSOLE METHODS
//    Replaces native console.* with postMessage-based forwarding.
//    The main thread renders these in the virtual #console-output panel.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Serializes any JS value into a human-readable string for the console.
 * Handles circular references, functions, undefined, etc.
 */
function formatArg(value) {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'function') return value.toString();
    if (typeof value === 'object') {
        try { return JSON.stringify(value, null, 2); }
        catch { return Object.prototype.toString.call(value); }
    }
    return String(value);
}

['log', 'warn', 'error', 'info', 'debug'].forEach((method) => {
    globalThis.console[method] = (...args) => {
        globalThis.postMessage({
            type: 'console',
            method,                        // used by main thread to colour-code output
            text: args.map(formatArg).join(' '),
        });
    };
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. DEEP EQUALITY (for test case comparison)
//    Handles primitives, arrays, objects, null/undefined.
//    Does NOT handle special cases like Map, Set, Date — keep it simple.
// ─────────────────────────────────────────────────────────────────────────────

function deepEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return a === b;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object') return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((k) => deepEqual(a[k], b[k]));
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. MESSAGE HANDLER
//    Receives: { code: string, fnName: string, testCases: Array }
//    Sends back: console | testResult | error | done messages
// ─────────────────────────────────────────────────────────────────────────────

globalThis.onmessage = function ({ data }) {
    const { code, fnName, testCases = [] } = data;

    // ── Step A: Compile + execute student code ────────────────────────────────
    // new Function() creates an isolated function scope (not the worker global).
    // "use strict" inside prevents access to arguments.caller, eval tricks, etc.
    // We return the named function so we can call it for each test case.
    let userFn;
    try {
        const wrapper = new Function(`
      "use strict";
      ${code}
      return (typeof ${fnName} === 'function') ? ${fnName} : undefined;
    `);
        userFn = wrapper();
    } catch (err) {
        // SyntaxError / ReferenceError at definition time
        globalThis.postMessage({
            type: 'error',
            errorType: err.constructor.name,
            message: err.message,
        });
        globalThis.postMessage({ type: 'done' });
        return;
    }

    // Guard: did the student actually define the expected function?
    if (typeof userFn !== 'function') {
        globalThis.postMessage({
            type: 'error',
            errorType: 'ReferenceError',
            message: `Função '${fnName}' não encontrada. Verifique se você declarou a função com esse nome exato.`,
        });
        globalThis.postMessage({ type: 'done' });
        return;
    }

    // ── Step B: Run each test case ────────────────────────────────────────────
    testCases.forEach((tc, index) => {
        try {
            const received = userFn(...tc.args);
            const passed = deepEqual(received, tc.expected);

            globalThis.postMessage({
                type: 'testResult',
                index,
                passed,
                label: tc.label || `Teste ${index + 1}`,
                received: formatArg(received),
                expected: formatArg(tc.expected),
            });
        } catch (err) {
            globalThis.postMessage({
                type: 'testResult',
                index,
                passed: false,
                label: tc.label || `Teste ${index + 1}`,
                error: err.message,
            });
        }
    });

    // Signal to the main thread that execution is complete
    globalThis.postMessage({ type: 'done' });
};
