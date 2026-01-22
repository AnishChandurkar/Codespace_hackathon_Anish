import { useState, useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";

interface CodeEditorProps {
  code?: string;
  onChange?: (code: string) => void;
  language?: string;
}

const defaultCode = `# Collaborative coding session
def main():
    print("Hello, World!")
    
    a = 5
    b = 10
    total = a + b
    
    print(f"Sum: {total}")

if __name__ == "__main__":
    main()
`;

// Language mapping for Monaco
const languageMap: Record<string, string> = {
  c: "c",
  cpp: "cpp",
  python: "python",
  javascript: "javascript",
  java: "java",
};

export function CodeEditor({ 
  code = defaultCode, 
  onChange, 
  language = "python",
}: CodeEditorProps) {
  const [editorValue, setEditorValue] = useState(code);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Define custom dark theme matching our design system
    monaco.editor.defineTheme("codesync-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "6b7280", fontStyle: "italic" },
        { token: "keyword", foreground: "60a5fa" },
        { token: "string", foreground: "4ade80" },
        { token: "number", foreground: "c084fc" },
        { token: "type", foreground: "22d3d3" },
        { token: "function", foreground: "fbbf24" },
        { token: "variable", foreground: "e2e8f0" },
        { token: "constant", foreground: "c084fc" },
        { token: "operator", foreground: "e2e8f0" },
        { token: "delimiter", foreground: "94a3b8" },
        { token: "preprocessor", foreground: "a78bfa" },
      ],
      colors: {
        "editor.background": "#0a0f1a",
        "editor.foreground": "#e2e8f0",
        "editor.lineHighlightBackground": "#1e293b40",
        "editor.selectionBackground": "#3b82f650",
        "editorLineNumber.foreground": "#4b5563",
        "editorLineNumber.activeForeground": "#9ca3af",
        "editorCursor.foreground": "#3b82f6",
        "editor.inactiveSelectionBackground": "#3b82f630",
        "editorIndentGuide.background": "#1e293b",
        "editorIndentGuide.activeBackground": "#334155",
        "editorWidget.background": "#0f172a",
        "editorWidget.border": "#1e293b",
        "editorSuggestWidget.background": "#0f172a",
        "editorSuggestWidget.border": "#1e293b",
        "editorSuggestWidget.selectedBackground": "#1e293b",
        "editorHoverWidget.background": "#0f172a",
        "editorHoverWidget.border": "#1e293b",
        "scrollbarSlider.background": "#1e293b80",
        "scrollbarSlider.hoverBackground": "#334155",
        "scrollbarSlider.activeBackground": "#475569",
      },
    });

    monaco.editor.setTheme("codesync-dark");
    editor.focus();
  };

  const handleEditorChange = (value: string | undefined) => {
    const newValue = value || "";
    setEditorValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex-1 flex flex-col bg-editor rounded-lg overflow-hidden border border-border">
      {/* Editor header */}
      <div className="flex items-center gap-2 px-4 py-2 bg-card border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/80" />
          <div className="w-3 h-3 rounded-full bg-warning/80" />
          <div className="w-3 h-3 rounded-full bg-success/80" />
        </div>
        <span className="text-sm text-muted-foreground ml-2 font-mono">
          main.{language === "cpp" ? "cpp" : language === "python" ? "py" : language === "java" ? "java" : language === "javascript" ? "js" : "c"}
        </span>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language={languageMap[language] || "python"}
          value={editorValue}
          onChange={handleEditorChange}
          onMount={handleEditorMount}
          loading={
            <div className="flex items-center justify-center h-full bg-editor">
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span>Loading editor...</span>
              </div>
            </div>
          }
          options={{
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
            fontLigatures: true,
            lineHeight: 24,
            padding: { top: 16, bottom: 16 },
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            renderLineHighlight: "line",
            renderWhitespace: "selection",
            bracketPairColorization: { enabled: true },
            autoClosingBrackets: "languageDefined",
            autoClosingQuotes: "languageDefined",
            autoIndent: "advanced",
            formatOnPaste: true,
            formatOnType: true,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnEnter: "on",
            tabCompletion: "on",
            wordBasedSuggestions: "currentDocument",
            quickSuggestions: {
              other: true,
              comments: false,
              strings: false,
            },
            scrollbar: {
              verticalScrollbarSize: 10,
              horizontalScrollbarSize: 10,
              useShadows: false,
            },
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            overviewRulerBorder: false,
            contextmenu: true,
            mouseWheelZoom: true,
          }}
        />
      </div>
    </div>
  );
}
