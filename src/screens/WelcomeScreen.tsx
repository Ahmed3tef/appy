import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Heart, Shield, TrendingUp, Sparkles, ChevronRight } from "lucide-react"

const FEATURES = [
  {
    icon: Heart,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    title: "Your Health Journey",
    desc: "We remember your progress and celebrate how far you've come.",
  },
  {
    icon: Shield,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    title: "Safety First",
    desc: "Intelligent monitoring helps you know when to seek professional care.",
  },
  {
    icon: TrendingUp,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    title: "Continuous Progress",
    desc: "Track every step, setback, and milestone on your path to better health.",
  },
  {
    icon: Sparkles,
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    title: "Always With You",
    desc: "Your personal companion guides you, encourages you, and keeps you consistent.",
  },
]

export function WelcomeScreen() {
  const navigate = useNavigate()

  return (
    <div className="app-shell min-h-svh flex flex-col bg-background">
      {/* Hero section */}
      <div className="relative overflow-hidden px-6 pt-16 pb-8">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/8 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute top-20 left-0 w-48 h-48 rounded-full bg-chart-2/10 blur-3xl -translate-x-1/3 pointer-events-none" />

        {/* Logo mark */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <Heart className="size-5 text-primary-foreground fill-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight">Vitara</span>
        </div>

        {/* Headline */}
        <div className="space-y-3 mb-2">
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight text-foreground">
            Your health journey<br />
            <span className="text-primary">starts here.</span>
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-xs">
            Someone who understands your health, remembers your progress, and guides you every step of the way.
          </p>
        </div>
      </div>

      {/* Feature cards */}
      <div className="flex-1 px-6 space-y-3 pb-6">
        {FEATURES.map(({ icon: Icon, color, bg, title, desc }) => (
          <div key={title} className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border/50 shadow-sm">
            <div className={`p-2.5 rounded-xl ${bg} shrink-0`}>
              <Icon className={`size-5 ${color}`} />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground leading-snug">{title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="px-6 pb-10 space-y-3">
        <Button
          className="w-full h-13 text-base font-semibold rounded-2xl shadow-lg shadow-primary/25"
          onClick={() => navigate("/onboarding")}
        >
          Get Started
          <ChevronRight className="size-5" />
        </Button>
        <Button
          variant="ghost"
          className="w-full text-muted-foreground"
          onClick={() => navigate("/home")}
        >
          View Demo →
        </Button>
        <p className="text-center text-xs text-muted-foreground px-4">
          This is a product prototype. Demo data only. Not a substitute for medical advice.
        </p>
      </div>
    </div>
  )
}
