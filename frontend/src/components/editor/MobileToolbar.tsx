import { Play, Terminal, MessageSquare, PanelRight, PanelRightClose } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileToolbarProps {
  isPanelOpen: boolean;
  onTogglePanel: () => void;
}

export function MobileToolbar({ isPanelOpen, onTogglePanel }: MobileToolbarProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3 flex items-center justify-between z-50">
      <div className="flex items-center gap-2">
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <Play className="w-4 h-4 mr-1" />
          Run
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={onTogglePanel}
          className="text-muted-foreground"
        >
          {isPanelOpen ? (
            <>
              <PanelRightClose className="w-4 h-4 mr-1" />
              Hide
            </>
          ) : (
            <>
              <PanelRight className="w-4 h-4 mr-1" />
              Panel
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
