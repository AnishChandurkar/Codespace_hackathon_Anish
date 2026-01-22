import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Code2, Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff, Github, Chrome } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [mode, setMode] = useState<"login" | "signup">(
    searchParams.get("mode") === "signup" ? "signup" : "login"
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate("/editor");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate("/editor");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/editor`,
            data: {
              name: formData.name,
            },
          },
        });

        if (error) throw error;

        toast({
          title: "Account created!",
          description: "Welcome to CodeSpace. Redirecting to the editor...",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "Successfully signed in.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: "github" | "google") => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/editor`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "OAuth sign in failed.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      {/* Left side - Animated background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg" />
        <div className="absolute inset-0 grid-pattern opacity-10" />
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/30 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-glow-cyan/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center p-12">
          <Link to="/" className="flex items-center gap-3 mb-8 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full" />
              <Code2 className="h-10 w-10 text-primary relative z-10" />
            </div>
            <span className="text-2xl font-bold">
              <span className="gradient-text">Code</span>
              <span className="text-foreground">space</span>
            </span>
          </Link>

          <h2 className="text-4xl font-bold mb-4">
            {mode === "login" 
              ? "Welcome back, developer" 
              : "Start building today"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-md">
            {mode === "login"
              ? "Sign in to access your projects, collaborate with your team, and continue building amazing things."
              : "Create your free account and join thousands of developers using CodeSpace to code faster."}
          </p>

          {/* Animated code snippet */}
          <div className="mt-12 glass rounded-xl p-6 max-w-md animate-fade-in-up">
            <div className="font-mono text-sm space-y-2">
              <div className="text-syntax-comment">// Your next project starts here</div>
              <div>
                <span className="text-syntax-keyword">const</span>{" "}
                <span className="text-foreground">developer</span>{" "}
                <span className="text-syntax-keyword">=</span>{" "}
                <span className="text-syntax-function">await</span>{" "}
                <span className="text-syntax-function">codespace</span>
                <span className="text-foreground">.</span>
                <span className="text-syntax-function">{mode === "login" ? "signIn" : "signUp"}</span>
                <span className="text-foreground">();</span>
              </div>
              <div className="flex items-center">
                <span className="text-syntax-function">console</span>
                <span className="text-foreground">.log(</span>
                <span className="text-syntax-string">"Ready to code! 🚀"</span>
                <span className="text-foreground">);</span>
                <span className="inline-block w-0.5 h-5 bg-primary animate-cursor-blink ml-1" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Mobile logo */}
        <Link to="/" className="absolute top-6 left-6 lg:hidden flex items-center gap-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="font-bold">
            <span className="gradient-text">Code</span>space
          </span>
        </Link>

        <div className="w-full max-w-md">
          {/* Form container */}
          <div className="glass-strong rounded-2xl p-8 animate-fade-in-scale">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">
                {mode === "login" ? "Sign in to your account" : "Create your account"}
              </h1>
              <p className="text-muted-foreground text-sm">
                {mode === "login" 
                  ? "Enter your credentials to continue" 
                  : "Fill in your details to get started"}
              </p>
            </div>

            {/* OAuth buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Button 
                variant="outline" 
                className="h-11 border-border/50 hover:bg-secondary/50 hover:border-primary/30"
                onClick={() => handleOAuthSignIn("github")}
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button 
                variant="outline" 
                className="h-11 border-border/50 hover:bg-secondary/50 hover:border-primary/30"
                onClick={() => handleOAuthSignIn("google")}
              >
                <Chrome className="h-4 w-4 mr-2" />
                Google
              </Button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">or continue with email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full name
                  </Label>
                  <div className="relative">
                    <User className={cn(
                      "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors",
                      focusedField === "name" ? "text-primary" : "text-muted-foreground"
                    )} />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className={cn(
                        "pl-10 h-11 bg-secondary/30 border-border/50 transition-all duration-300",
                        focusedField === "name" && "border-primary/50 ring-2 ring-primary/20"
                      )}
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors",
                    focusedField === "email" ? "text-primary" : "text-muted-foreground"
                  )} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      "pl-10 h-11 bg-secondary/30 border-border/50 transition-all duration-300",
                      focusedField === "email" && "border-primary/50 ring-2 ring-primary/20"
                    )}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors",
                    focusedField === "password" ? "text-primary" : "text-muted-foreground"
                  )} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className={cn(
                      "pl-10 pr-10 h-11 bg-secondary/30 border-border/50 transition-all duration-300",
                      focusedField === "password" && "border-primary/50 ring-2 ring-primary/20"
                    )}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {mode === "login" && (
                <div className="flex justify-end">
                  <Link 
                    to="#" 
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 glow-button bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {mode === "login" ? "Sign in" : "Create account"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Toggle mode */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Terms */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            By continuing, you agree to our{" "}
            <Link to="#" className="text-primary hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
