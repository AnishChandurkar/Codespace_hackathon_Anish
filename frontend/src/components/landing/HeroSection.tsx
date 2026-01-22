import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Code2 } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background */}
      <div className="absolute inset-0 mesh-bg opacity-60" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-glow-cyan/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: "0.1s" }}>
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium text-muted-foreground">
            Now with real-time code execution
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s" }}>
          <span className="block text-foreground">Code Together,</span>
          <span className="block gradient-text mt-2">Build Faster</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up opacity-0" style={{ animationDelay: "0.3s" }}>
          A powerful, real-time collaborative code editor with instant execution. 
          Write, run, and share code with anyone, anywhere.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: "0.4s" }}>
          <Link to="/editor">
            <Button 
              size="lg" 
              className="glow-button bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 h-auto group"
            >
              <Zap className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              Launch Editor
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/features">
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 h-auto border-border/50 hover:border-primary/50 hover:bg-primary/5"
            >
              Explore Features
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-xl mx-auto mt-16 animate-fade-in-up opacity-0" style={{ animationDelay: "0.5s" }}>
          {[
            { value: "10k+", label: "Developers" },
            { value: "1M+", label: "Lines of Code" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Floating code preview */}
        <div className="relative mt-20 max-w-4xl mx-auto animate-fade-in-up opacity-0" style={{ animationDelay: "0.6s" }}>
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-xl" />
          <div className="relative glass-strong rounded-2xl p-1 overflow-hidden">
            <div className="bg-editor rounded-xl p-6 text-left font-mono text-sm">
              {/* Editor header */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-muted-foreground text-xs">main.py</span>
                </div>
              </div>
              {/* Code content */}
              <div className="space-y-1">
                <div>
                  <span className="text-syntax-keyword">def</span>{" "}
                  <span className="text-syntax-function">hello_world</span>
                  <span className="text-foreground">():</span>
                </div>
                <div className="pl-8">
                  <span className="text-syntax-function">print</span>
                  <span className="text-foreground">(</span>
                  <span className="text-syntax-string">"Hello, Codespace! 🚀"</span>
                  <span className="text-foreground">)</span>
                </div>
                <div className="mt-4">
                  <span className="text-syntax-keyword">if</span>{" "}
                  <span className="text-foreground">__name__</span>{" "}
                  <span className="text-syntax-keyword">==</span>{" "}
                  <span className="text-syntax-string">"__main__"</span>
                  <span className="text-foreground">:</span>
                </div>
                <div className="pl-8">
                  <span className="text-syntax-function">hello_world</span>
                  <span className="text-foreground">()</span>
                </div>
              </div>
              {/* Cursor animation */}
              <div className="inline-block w-0.5 h-5 bg-primary animate-cursor-blink ml-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
