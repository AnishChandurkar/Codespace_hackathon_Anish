import { useEffect, useRef, useState } from "react";
import { 
  Code2, 
  Zap, 
  Users, 
  Shield, 
  Palette, 
  Terminal,
  Globe,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Execution",
    description: "Run Python, JavaScript, C++, and more with instant results. No setup required.",
    gradient: "from-warning/20 to-warning/5",
    iconColor: "text-warning",
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description: "Code together with your team in real-time. See changes as they happen.",
    gradient: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Terminal,
    title: "Full IDE Experience",
    description: "Syntax highlighting, auto-complete, and all the tools you need in the browser.",
    gradient: "from-success/20 to-success/5",
    iconColor: "text-success",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your code runs in isolated containers. Enterprise-grade security built in.",
    gradient: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
  },
  {
    icon: Palette,
    title: "Customizable Themes",
    description: "Beautiful dark and light themes. Make it yours with custom configurations.",
    gradient: "from-glow-cyan/20 to-glow-cyan/5",
    iconColor: "text-glow-cyan",
  },
  {
    icon: Globe,
    title: "Access Anywhere",
    description: "Works on any device, any browser. Your code follows you everywhere.",
    gradient: "from-collab-2/20 to-collab-2/5",
    iconColor: "text-collab-2",
  },
];

export const FeaturesSection = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.isIntersecting && index !== -1) {
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-bg opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything you need to{" "}
            <span className="gradient-text">code brilliantly</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed for developers who demand the best.
            No compromises, no limitations.
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={cn(
                "group relative p-6 rounded-2xl glass transition-all duration-500 hover:scale-[1.02]",
                "opacity-0 translate-y-8",
                visibleCards.has(index) && "opacity-100 translate-y-0"
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Gradient background on hover */}
              <div 
                className={cn(
                  "absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  feature.gradient
                )}
              />
              
              {/* Glow effect */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className={cn(
                  "inline-flex p-3 rounded-xl bg-secondary/50 mb-4 transition-all duration-300",
                  "group-hover:scale-110 group-hover:shadow-glow"
                )}>
                  <feature.icon className={cn("h-6 w-6", feature.iconColor)} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
