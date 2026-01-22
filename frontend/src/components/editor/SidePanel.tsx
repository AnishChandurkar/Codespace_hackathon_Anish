import { useState, useRef } from "react";
import { Play, Square, Terminal, Loader2, AlertCircle, CheckCircle2, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  code: string;
}

type ExecutionState = "idle" | "running" | "success" | "error";

const languages = [
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "java", label: "Java" },
];

export function SidePanel({ isOpen, onClose, language, onLanguageChange, code }: SidePanelProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [executionState, setExecutionState] = useState<ExecutionState>("idle");
  const [activeTab, setActiveTab] = useState<"run" | "chat">("run");
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleRun = async () => {
    setExecutionState("running");
    setOutput("");

    // Create abort controller for stopping execution
    abortControllerRef.current = new AbortController();

    try {
      const { data, error } = await supabase.functions.invoke("execute-code", {
        body: {
          code,
          language,
          input,
        },
      });

      if (error) {
        console.error("Execution error:", error);
        setOutput(`Error: ${error.message}`);
        setExecutionState("error");
        toast.error("Execution failed");
        return;
      }

      if (data.success) {
        setOutput(data.output || "Program completed with no output.");
        setExecutionState("success");
      } else {
        setOutput(data.output || data.error || "Unknown error occurred.");
        setExecutionState("error");
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        setOutput("Execution stopped by user.");
        setExecutionState("idle");
      } else {
        console.error("Unexpected error:", err);
        setOutput(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
        setExecutionState("error");
        toast.error("Failed to execute code");
      }
    } finally {
      abortControllerRef.current = null;
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setExecutionState("idle");
    setOutput("Execution stopped by user.");
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 lg:w-96 border-l border-border bg-card flex flex-col shrink-0 transition-panel">
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("run")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeTab === "run"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Terminal className="w-4 h-4 inline-block mr-1.5" />
            Run
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              activeTab === "chat"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageSquare className="w-4 h-4 inline-block mr-1.5" />
            Chat
          </button>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors lg:hidden"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {activeTab === "run" ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Language & Actions */}
          <div className="p-4 space-y-4 border-b border-border">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Language</label>
              <Select value={language} onValueChange={onLanguageChange}>
                <SelectTrigger className="w-full bg-secondary border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              {executionState === "running" ? (
                <Button
                  onClick={handleStop}
                  variant="destructive"
                  className="flex-1 shadow-button"
                >
                  <Square className="w-4 h-4 mr-2" />
                  Stop
                </Button>
              ) : (
                <Button
                  onClick={handleRun}
                  className="flex-1 bg-primary hover:bg-primary/90 shadow-button"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Run Code
                </Button>
              )}
            </div>
          </div>

          {/* Input section */}
          <div className="p-4 border-b border-border">
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Input (stdin)
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input here..."
              className="font-mono text-sm bg-secondary border-border resize-none h-20"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Add program input if your code reads from stdin
            </p>
          </div>

          {/* Output section */}
          <div className="flex-1 flex flex-col min-h-0 p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-muted-foreground">Output</label>
              {executionState === "running" && (
                <span className="flex items-center gap-1.5 text-xs text-primary">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Executing...
                </span>
              )}
              {executionState === "success" && (
                <span className="flex items-center gap-1.5 text-xs text-success">
                  <CheckCircle2 className="w-3 h-3" />
                  Completed
                </span>
              )}
              {executionState === "error" && (
                <span className="flex items-center gap-1.5 text-xs text-destructive">
                  <AlertCircle className="w-3 h-3" />
                  Error
                </span>
              )}
            </div>
            <ScrollArea className="flex-1 rounded-md bg-secondary/50 border border-border">
              <div className="p-3 font-mono text-sm">
                {output ? (
                  <pre className="whitespace-pre-wrap">{output}</pre>
                ) : (
                  <p className="text-muted-foreground italic">
                    Output will appear here after running your code.
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col p-4">
          <div className="flex-1 flex items-center justify-center text-center">
            <div className="space-y-2">
              <MessageSquare className="w-10 h-10 mx-auto text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                Session chat coming soon
              </p>
              <p className="text-xs text-muted-foreground/70">
                Discuss code with your collaborators in real-time
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
