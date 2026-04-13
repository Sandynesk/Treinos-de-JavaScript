const TIMEOUT_MS = 2000;

/**
 * Creates a sandboxed worker and runs the student code against test cases.
 * @param {{ code: string, fnName: string, testCases: Array }} payload
 * @returns {Promise<Array>} Array of messages from worker
 */
export function executeWorker({ code, fnName, testCases = [] }) {
  // Standard Web Worker URL pattern — works with both webpack and Turbopack
  const worker = new Worker(new URL('./executor.worker.js', import.meta.url));
  let killed = false;

  return new Promise((resolve) => {
    const messages = [];

    const timeoutId = setTimeout(() => {
      killed = true;
      worker.terminate();
      messages.push({
        type: 'error',
        errorType: 'TimeoutError',
        message: '\u23f1 Timeout: loop infinito ou código muito lento detectado (limite: 2s).',
      });
      resolve(messages);
    }, TIMEOUT_MS);

    worker.onmessage = ({ data }) => {
      if (killed) return;
      messages.push(data);
      if (data.type === 'done') {
        clearTimeout(timeoutId);
        worker.terminate();
        resolve(messages);
      }
    };

    worker.onerror = (ev) => {
      if (killed) return;
      clearTimeout(timeoutId);
      worker.terminate();
      messages.push({
        type: 'error',
        errorType: 'RuntimeError',
        message: ev.message ?? 'Erro desconhecido no worker.',
      });
      resolve(messages);
    };

    worker.postMessage({ code, fnName, testCases });
  });
}
