import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Zap, 
  Users, 
  Shield, 
  Palette, 
  Terminal,
  Globe,
  Code2,
  Layers,
  GitBranch,
  Cloud,
  Lock,
  Cpu,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainFeatures = [
  {
    icon: Zap,
    title: "Instant Code Execution",
    description: "Run your code instantly in isolated containers. Support for Python, JavaScript, C++, Java, and more. No configuration needed.",
    image: "code-execution",
    gradient: "from-warning to-warning/30",
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description: "See your teammates' cursors, edits, and selections in real-time. Built-in voice chat and screen sharing coming soon.",
    image: "collaboration",
    gradient: "from-primary to-primary/30",
  },
  {
    icon: Terminal,
    title: "Full IDE in Your Browser",
    description: "Monaco editor with IntelliSense, syntax highlighting, code formatting, and all the features you expect from a professional IDE.",
    image: "ide",
    gradient: "from-success to-success/30",
  },
];

const additionalFeatures = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant with end-to-end encryption and isolated execution environments.",
  },
  {
    icon: Palette,
    title: "Custom Themes",
    description: "Beautiful dark and light modes with customizable color schemes.",
  },
  {
    icon: Globe,
    title: "Access Anywhere",
    description: "Works on any device with a modern browser. No downloads required.",
  },
  {
    icon: GitBranch,
    title: "Git Integration",
    description: "Connect to GitHub, GitLab, or Bitbucket. Push, pull, and manage branches.",
  },
  {
    icon: Cloud,
    title: "Cloud Storage",
    description: "Auto-save to the cloud. Never lose your work again.",
  },
  {
    icon: Lock,
    title: "Access Control",
    description: "Fine-grained permissions for teams and organizations.",
  },
  {
    icon: Layers,
    title: "Multi-file Support",
    description: "Work with complex projects. File tree, tabs, and split views.",
  },
  {
    icon: Cpu,
    title: "High Performance",
    description: "Optimized for speed. Handles large files without breaking a sweat.",
  },
];

const Features = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-section-id");
          if (entry.isIntersecting && id) {
            setVisibleSections((prev) => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setSectionRef = (id: string) => (el: HTMLDivElement | null) => {
    if (el) sectionRefs.current.set(id, el);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden noise-overlay">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-40" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float-slow" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: "0.1s" }}>
            Powerful features for{" "}
            <span className="gradient-text">modern developers</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up opacity-0" style={{ animationDelay: "0.2s" }}>
            Everything you need to write, run, and collaborate on code. 
            Built with performance and developer experience in mind.
          </p>
        </div>
      </section>

      {/* Main features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {mainFeatures.map((feature, index) => (
            <div
              key={feature.title}
              ref={setSectionRef(`main-${index}`)}
              data-section-id={`main-${index}`}
              className={cn(
                "grid lg:grid-cols-2 gap-12 items-center py-20",
                index % 2 === 1 && "lg:flex-row-reverse",
                "opacity-0 translate-y-12 transition-all duration-700",
                visibleSections.has(`main-${index}`) && "opacity-100 translate-y-0"
              )}
            >
              {/* Content */}
              <div className={cn(index % 2 === 1 && "lg:order-2")}>
                <div className={cn(
                  "inline-flex p-4 rounded-2xl mb-6 bg-gradient-to-br",
                  feature.gradient
                )}>
                  <feature.icon className="h-8 w-8 text-foreground" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {feature.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {feature.description}
                </p>
                <Link to="/editor">
                  <Button className="glow-button bg-primary hover:bg-primary/90 group">
                    Try it now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Visual */}
              <div className={cn(
                "relative",
                index % 2 === 1 && "lg:order-1"
              )}>
                <div className={cn(
                  "absolute -inset-4 bg-gradient-to-r rounded-3xl blur-2xl opacity-30",
                  feature.gradient
                )} />
                <div className="relative glass-strong rounded-2xl p-8 overflow-hidden">
                  <div className="bg-editor rounded-xl p-6">
                    {/* Simulated code editor */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-destructive/80" />
                        <div className="w-3 h-3 rounded-full bg-warning/80" />
                        <div className="w-3 h-3 rounded-full bg-success/80" />
                      </div>
                    </div>
                    <div className="font-mono text-sm space-y-2">
                      {index === 0 && (
                        <>
                          <div><span className="text-syntax-keyword">async</span> <span className="text-syntax-keyword">function</span> <span className="text-syntax-function">runCode</span><span className="text-foreground">()</span> <span className="text-foreground">{"{"}</span></div>
                          <div className="pl-4"><span className="text-syntax-keyword">const</span> <span className="text-foreground">result</span> <span className="text-syntax-keyword">=</span> <span className="text-syntax-keyword">await</span> <span className="text-syntax-function">execute</span><span className="text-foreground">(</span><span className="text-syntax-string">"python"</span><span className="text-foreground">, code);</span></div>
                          <div className="pl-4"><span className="text-syntax-function">console.log</span><span className="text-foreground">(result.output);</span></div>
                          <div className="text-foreground">{"}"}</div>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-collab-1" />
                            <span className="text-muted-foreground text-xs">Alice is editing...</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-collab-2" />
                            <span className="text-muted-foreground text-xs">Bob is viewing</span>
                          </div>
                          <div className="mt-4"><span className="text-syntax-comment">// Real-time collaboration</span></div>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <div className="text-syntax-comment">// Full IntelliSense support</div>
                          <div><span className="text-syntax-keyword">interface</span> <span className="text-syntax-type">User</span> <span className="text-foreground">{"{"}</span></div>
                          <div className="pl-4"><span className="text-foreground">name</span><span className="text-syntax-keyword">:</span> <span className="text-syntax-type">string</span><span className="text-foreground">;</span></div>
                          <div className="pl-4"><span className="text-foreground">email</span><span className="text-syntax-keyword">:</span> <span className="text-syntax-type">string</span><span className="text-foreground">;</span></div>
                          <div className="text-foreground">{"}"}</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional features grid */}
      <section className="py-20 relative">
        <div className="absolute inset-0 mesh-bg opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              And so much more
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every feature designed to make you more productive
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div
                key={feature.title}
                ref={setSectionRef(`add-${index}`)}
                data-section-id={`add-${index}`}
                className={cn(
                  "group p-6 rounded-xl glass hover:bg-secondary/20 transition-all duration-500",
                  "opacity-0 translate-y-8 transition-all duration-500",
                  visibleSections.has(`add-${index}`) && "opacity-100 translate-y-0"
                )}
                style={{ transitionDelay: `${(index % 4) * 100}ms` }}
              >
                <div className="p-3 rounded-lg bg-primary/10 inline-flex mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 mesh-bg opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to start building?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of developers who code with Codespace every day.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth?mode=signup">
              <Button size="lg" className="glow-button bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto">
                Get Started Free
              </Button>
            </Link>
            <Link to="/editor">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
                Try the Editor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
