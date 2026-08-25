import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronLeft, Heart, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const GOALS = [
  { id: "weight-loss", label: "Weight Loss", icon: "🏃" },
  { id: "muscle-gain", label: "Muscle Gain", icon: "💪" },
  { id: "better-energy", label: "Better Energy", icon: "⚡" },
  { id: "better-sleep", label: "Better Sleep", icon: "😴" },
  { id: "cardiovascular", label: "Cardiovascular Fitness", icon: "❤️" },
  { id: "stress-management", label: "Stress Management", icon: "🧘" },
  { id: "mobility", label: "Improved Mobility", icon: "🦵" },
  { id: "consistency", label: "Build Consistency", icon: "📅" },
  { id: "healthy-aging", label: "Healthy Aging", icon: "🌱" },
]

const ACTIVITY_LEVELS = [
  { id: "sedentary", label: "Mostly Sedentary", desc: "Little or no exercise" },
  { id: "light", label: "Lightly Active", desc: "Light exercise 1–2 days/week" },
  { id: "moderate", label: "Moderately Active", desc: "Exercise 3–4 days/week" },
  { id: "active", label: "Very Active", desc: "Hard exercise 5–6 days/week" },
  { id: "athlete", label: "Athlete", desc: "Daily intense training" },
]

const CONDITIONS = [
  "Diabetes", "Hypertension", "High Cholesterol", "Thyroid", "Asthma",
  "Heart Disease", "Arthritis", "Anxiety", "Depression", "GERD",
]

const STEPS = [
  { id: "name", title: "What should we call you?", subtitle: "Let's make this personal." },
  { id: "basics", title: "A few basics", subtitle: "This helps us personalize your plan." },
  { id: "goals", title: "What are your goals?", subtitle: "Choose everything that matters to you." },
  { id: "activity", title: "Current activity level", subtitle: "Be honest — no judgment here." },
  { id: "conditions", title: "Any known health conditions?", subtitle: "Optional. Helps us keep you safe." },
  { id: "done", title: "You're all set!", subtitle: "Your journey begins now." },
]

export function OnboardingScreen() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [data, setData] = useState({
    name: "",
    age: "",
    sex: "",
    height: "",
    weight: "",
    goals: [] as string[],
    activityLevel: "",
    conditions: [] as string[],
  })

  const progress = ((step + 1) / STEPS.length) * 100
  const currentStep = STEPS[step]

  const toggleGoal = (id: string) => {
    setData(d => ({
      ...d,
      goals: d.goals.includes(id) ? d.goals.filter(g => g !== id) : [...d.goals, id],
    }))
  }

  const toggleCondition = (c: string) => {
    setData(d => ({
      ...d,
      conditions: d.conditions.includes(c) ? d.conditions.filter(x => x !== c) : [...d.conditions, c],
    }))
  }

  const canProceed = () => {
    if (step === 0) return data.name.trim().length > 0
    if (step === 1) return data.age && data.sex && data.height && data.weight
    if (step === 2) return data.goals.length > 0
    if (step === 3) return data.activityLevel !== ""
    return true
  }

  return (
    <div className="app-shell min-h-svh flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <Heart className="size-4 text-primary-foreground fill-primary-foreground" />
          </div>
          <span className="font-bold text-base">Vitara</span>
          <span className="ml-auto text-sm text-muted-foreground">{step + 1} / {STEPS.length}</span>
        </div>
        <Progress value={progress} className="h-1.5 mb-6" />
        <h2 className="text-2xl font-bold tracking-tight">{currentStep.title}</h2>
        <p className="text-muted-foreground mt-1">{currentStep.subtitle}</p>
      </div>

      {/* Step content */}
      <div className="flex-1 px-6 pb-6">
        {step === 0 && (
          <div className="space-y-4 mt-4">
            <Input
              placeholder="Your first name"
              value={data.name}
              onChange={e => setData(d => ({ ...d, name: e.target.value }))}
              className="h-12 text-base rounded-xl"
              autoFocus
            />
            <p className="text-sm text-muted-foreground">
              We'll use this to personalize your experience.
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Age</label>
                <Input placeholder="Years" type="number" value={data.age}
                  onChange={e => setData(d => ({ ...d, age: e.target.value }))}
                  className="h-11 rounded-xl" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Sex</label>
                <div className="flex gap-2">
                  {["Male", "Female"].map(s => (
                    <button key={s}
                      onClick={() => setData(d => ({ ...d, sex: s }))}
                      className={cn(
                        "flex-1 h-11 rounded-xl border text-sm font-medium transition-all",
                        data.sex === s
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border text-foreground hover:bg-accent"
                      )}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Height (cm)</label>
                <Input placeholder="e.g. 175" type="number" value={data.height}
                  onChange={e => setData(d => ({ ...d, height: e.target.value }))}
                  className="h-11 rounded-xl" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Weight (kg)</label>
                <Input placeholder="e.g. 80" type="number" value={data.weight}
                  onChange={e => setData(d => ({ ...d, weight: e.target.value }))}
                  className="h-11 rounded-xl" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {GOALS.map(goal => (
              <button key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={cn(
                  "flex items-center gap-2 p-3 rounded-xl border text-left transition-all",
                  data.goals.includes(goal.id)
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-border hover:bg-accent"
                )}>
                <span className="text-lg">{goal.icon}</span>
                <span className="text-xs font-medium leading-tight">{goal.label}</span>
                {data.goals.includes(goal.id) && (
                  <Check className="size-3.5 ml-auto shrink-0" />
                )}
              </button>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2 mt-4">
            {ACTIVITY_LEVELS.map(level => (
              <button key={level.id}
                onClick={() => setData(d => ({ ...d, activityLevel: level.id }))}
                className={cn(
                  "w-full flex items-center p-4 rounded-xl border text-left transition-all",
                  data.activityLevel === level.id
                    ? "bg-primary/10 border-primary"
                    : "border-border hover:bg-accent"
                )}>
                <div className="flex-1">
                  <p className={cn("font-medium text-sm", data.activityLevel === level.id && "text-primary")}>
                    {level.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{level.desc}</p>
                </div>
                {data.activityLevel === level.id && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Check className="size-3 text-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {step === 4 && (
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {CONDITIONS.map(c => (
                <Badge key={c}
                  onClick={() => toggleCondition(c)}
                  variant={data.conditions.includes(c) ? "default" : "outline"}
                  className="cursor-pointer text-sm py-1.5 px-3 rounded-xl">
                  {c}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              You can skip this. You can always update your health profile later.
            </p>
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col items-center text-center mt-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="size-10 text-primary fill-primary/20" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Welcome, {data.name || "Friend"}! 🎉</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                Your personalized health companion is ready. Let's begin your journey together.
              </p>
            </div>
            <div className="w-full space-y-2 text-left bg-accent/50 rounded-2xl p-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Your Profile Summary</p>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Goals:</span> {data.goals.length > 0 ? data.goals.map(g => GOALS.find(x => x.id === g)?.label).join(", ") : "Not set"}</p>
                <p><span className="font-medium">Activity:</span> {ACTIVITY_LEVELS.find(a => a.id === data.activityLevel)?.label || "Not set"}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="px-6 pb-10 flex gap-3">
        {step > 0 && step < 5 && (
          <Button variant="outline" className="h-12 rounded-xl px-4"
            onClick={() => setStep(s => s - 1)}>
            <ChevronLeft className="size-5" />
          </Button>
        )}
        {step < 5 ? (
          <Button
            className="flex-1 h-12 rounded-xl font-semibold"
            onClick={() => setStep(s => s + 1)}
            disabled={!canProceed()}>
            {step === 4 ? "Finish Setup" : "Continue"}
            <ChevronRight className="size-4" />
          </Button>
        ) : (
          <Button
            className="flex-1 h-12 rounded-xl font-semibold shadow-lg shadow-primary/25"
            onClick={() => navigate("/home")}>
            Start My Journey
            <ChevronRight className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
