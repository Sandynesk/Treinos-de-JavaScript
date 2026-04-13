'use strict';

const BLOCKED = [
    'fetch', 'XMLHttpRequest', 'WebSocket', 'EventSource',
    'indexedDB', 'localStorage', 'sessionStorage', 'openDatabase',
    'caches', 'Notification', 'navigator', 'location', 'crypto',
];

BLOCKED.forEach((api) => {
    if (!(api in globalThis)) return;
    try {
        Object.defineProperty(globalThis, api, {
            get() {
                throw new TypeError(
                    `\u{1F512} API bloqueada: '${api}' não está disponível neste ambiente seguro.`
                );
            },
            configurable: false,
        });
    } catch (_) {
        globalThis[api] = null;
    }
});

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
            method,
            text: args.map(formatArg).join(' '),
        });
    };
});

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

globalThis.onmessage = function ({ data }) {
    const { code, fnName, testCases = [] } = data;

    let userFn;
    try {
        const wrapper = new Function(`
      "use strict";
      ${code}
      return (typeof ${fnName} === 'function') ? ${fnName} : undefined;
    `);
        userFn = wrapper();
    } catch (err) {
        globalThis.postMessage({
            type: 'error',
            errorType: err.constructor.name,
            message: err.message,
        });
        globalThis.postMessage({ type: 'done' });
        return;
    }

    if (typeof userFn !== 'function') {
        globalThis.postMessage({
            type: 'error',
            errorType: 'ReferenceError',
            message: `Função '${fnName}' não encontrada. Verifique se você declarou a função com esse nome exato.`,
        });
        globalThis.postMessage({ type: 'done' });
        return;
    }

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

    globalThis.postMessage({ type: 'done' });
};
