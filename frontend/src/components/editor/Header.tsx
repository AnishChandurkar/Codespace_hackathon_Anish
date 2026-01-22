import { Users, Wifi } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Logo } from "@/components/Logo";
import { Link } from "react-router-dom";


interface Collaborator {
  id: string;
  name: string;
  initials: string;
  color: "collab-1" | "collab-2" | "collab-3" | "collab-4";
  isActive: boolean;
}

interface HeaderProps {
  roomId?: string;
  collaborators?: Collaborator[];
}

const defaultCollaborators: Collaborator[] = [
  { id: "1", name: "You", initials: "ME", color: "collab-1", isActive: true },
  { id: "2", name: "Alex Chen", initials: "AC", color: "collab-2", isActive: true },
  { id: "3", name: "Sarah Kim", initials: "SK", color: "collab-3", isActive: false },
];

const colorClasses = {
  "collab-1": "bg-collab-1",
  "collab-2": "bg-collab-2",
  "collab-3": "bg-collab-3",
  "collab-4": "bg-collab-4",
};

export function Header({
  roomId = "room-abc123",
  collaborators = defaultCollaborators,
}: HeaderProps) {
  const activeCount = collaborators.filter((c) => c.isActive).length;

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <Link to="/" className="hover:opacity-90 transition-opacity">
          <Logo size={22} />
        </Link>
      </div>


      {/* Center: Room indicator */}
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border">
        <Wifi className="w-3.5 h-3.5 text-success" />
        <span className="text-sm text-muted-foreground">
          Session:{" "}
          <span className="text-foreground font-medium">{roomId}</span>
        </span>
      </div>

      {/* Right: Collaborators */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{activeCount} online</span>
        </div>

        <div className="flex -space-x-2">
          {collaborators.map((collaborator) => (
            <Tooltip key={collaborator.id}>
              <TooltipTrigger asChild>
                <div className="relative">
                  <Avatar
                    className={`w-8 h-8 border-2 border-card ring-2 ${collaborator.isActive
                        ? "ring-success/30"
                        : "ring-transparent"
                      }`}
                  >
                    <AvatarFallback
                      className={`${colorClasses[collaborator.color]} text-xs font-medium text-white`}
                    >
                      {collaborator.initials}
                    </AvatarFallback>
                  </Avatar>

                  {collaborator.isActive && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-card" />
                  )}
                </div>
              </TooltipTrigger>

              <TooltipContent>
                <p>
                  {collaborator.name}{" "}
                  {collaborator.isActive ? "(online)" : "(away)"}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </header>
  );
}
