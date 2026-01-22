import { useState } from "react";
import { Header } from "@/components/editor/Header";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { SidePanel } from "@/components/editor/SidePanel";
import { MobileToolbar } from "@/components/editor/MobileToolbar";

const Index = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(`# Collaborative coding session
def main():
    print("Hello, World!")
    
    a = 5
    b = 10
    total = a + b
    
    print(f"Sum: {total}")

if __name__ == "__main__":
    main()
`);

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Code Editor */}
        <main className="flex-1 flex flex-col p-4 pb-20 lg:pb-4 min-w-0">
          <CodeEditor 
            code={code} 
            onChange={setCode} 
            language={language} 
          />
        </main>

        {/* Side Panel - Hidden on mobile unless toggled */}
        <div className={`${isPanelOpen ? "flex" : "hidden"} lg:flex`}>
          <SidePanel 
            isOpen={isPanelOpen} 
            onClose={() => setIsPanelOpen(false)}
            language={language}
            onLanguageChange={setLanguage}
            code={code}
          />
        </div>
      </div>

      {/* Mobile bottom toolbar */}
      <MobileToolbar
        isPanelOpen={isPanelOpen}
        onTogglePanel={() => setIsPanelOpen(!isPanelOpen)}
      />
    </div>
  );
};

export default Index;
