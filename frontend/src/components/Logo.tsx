import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoProps = {
  size?: number;        // px size
  withText?: boolean;  // show CodeSpace text or not
  className?: string;
};

export const Logo = ({
  size = 32,
  withText = true,
  className,
}: LogoProps) => {
  return (
    <div className={cn("flex items-center gap-2 group", className)}>
      <div className="relative">
        <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full group-hover:bg-primary/50 transition-all duration-300" />
        <Code2
          style={{ width: size, height: size }}
          className="text-primary relative z-10 group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {withText && (
        <span className="text-xl font-bold tracking-tight">
          <span className="gradient-text">Code</span>
          <span className="text-foreground">Space</span>
        </span>
      )}
    </div>
  );
};
