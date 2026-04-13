"use client";

import { useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";

export default function MonacoEditor({ value, onChange, onMount, readOnly = false }) {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
    if (onMount) onMount(editor);
  };

  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      language="javascript"
      theme="vs-dark"
      value={value}
      onChange={onChange}
      onMount={handleEditorDidMount}
      options={{
        fontSize: 13,
        lineHeight: 22,
        fontFamily: "'JetBrains Mono','Fira Code','Cascadia Code',monospace",
        fontLigatures: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        padding: { top: 16, bottom: 16 },
        renderLineHighlight: "gutter",
        overviewRulerBorder: false,
        hideCursorInOverviewRuler: true,
        contextmenu: false,
        tabSize: 2,
        readOnly,
      }}
    />
  );
}
