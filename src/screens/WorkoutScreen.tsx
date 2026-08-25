import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Dumbbell, Heart, Activity, StretchHorizontal, Check, Flame, Clock, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { DEMO_WORKOUT_PLAN, DEMO_TODAY_WORKOUT } from "@/data/demo"
import { cn } from "@/lib/utils"

const TYPE_ICONS: Record<string, React.ElementType> = {
  Strength: Dumbbell,
  Cardio: Heart,
  Rest: Activity,
  Mobility: StretchHorizontal,
}

const INTENSITY_COLORS: Record<string, string> = {
  Low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
  Light: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
  Moderate: "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
  High: "bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400",
  None: "bg-muted text-muted-foreground",
}

export function WorkoutScreen() {
  const navigate = useNavigate()
  const plan = DEMO_WORKOUT_PLAN
  const todayWorkout = DEMO_TODAY_WORKOUT
  const completedDays = plan.days.filter(d => d.done).length

  return (
    <div className="px-4 pt-12 pb-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/home")} className="p-2 -ml-2 rounded-lg hover:bg-accent">
          <ChevronLeft className="size-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fitness Coach</h1>
          <p className="text-sm text-muted-foreground">{plan.weekLabel}</p>
        </div>
      </div>

      {/* Adaptive coaching banner */}
      <div className="rounded-2xl p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
        <div className="flex items-center gap-2 mb-1.5">
          <Zap className="size-4 text-amber-600" />
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">Coach Adaptation</p>
        </div>
        <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
          Sleep was below average last night and energy is slightly low. Today's strength workout is adjusted — reduce weights by 15-20% and focus on form. Your Safety Engine status is green.
        </p>
      </div>

      {/* Today's workout card */}
      <Card className="p-4 shadow-sm border-primary/30 bg-primary/5" onClick={() => navigate("/workout/today")}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wide">Today's Workout</p>
            <p className="font-bold text-lg">{todayWorkout.title}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
            <Dumbbell className="size-6 text-primary-foreground" />
          </div>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-muted-foreground" />
            <span className="font-medium">{todayWorkout.duration} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="size-3.5 text-orange-500" />
            <span className="font-medium">{todayWorkout.calories} kcal</span>
          </div>
          <Badge className={cn("text-xs", INTENSITY_COLORS[todayWorkout.intensity])}>
            {todayWorkout.intensity}
          </Badge>
        </div>
        <div className="mt-3 pt-3 border-t border-primary/15 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{todayWorkout.exercises.length} exercises</p>
          <span className="text-xs font-semibold text-primary flex items-center gap-0.5">
            Start Now <ChevronRight className="size-3.5" />
          </span>
        </div>
      </Card>

      {/* Weekly plan */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-sm">Weekly Plan</p>
          <span className="text-xs text-muted-foreground">{completedDays}/7 completed</span>
        </div>
        <div className="space-y-2">
          {plan.days.map((day, idx) => {
            const Icon = TYPE_ICONS[day.type] || Activity
            const isToday = idx === 3 // Thursday
            return (
              <Card key={idx} className={cn(
                "p-3.5 shadow-sm border-border/50",
                day.done && "opacity-60",
                isToday && "border-primary/40 bg-primary/5"
              )}>
                <div className="flex items-center gap-3">
                  {/* Day indicator */}
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    day.done ? "bg-emerald-100 dark:bg-emerald-950/30" : "bg-muted"
                  )}>
                    {day.done ? (
                      <Check className="size-5 text-emerald-600" />
                    ) : (
                      <Icon className="size-5 text-muted-foreground" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-bold text-muted-foreground">{day.day}</p>
                      {isToday && <Badge variant="default" className="text-[10px] py-0 px-1.5">Today</Badge>}
                    </div>
                    <p className={cn("text-sm font-semibold truncate", day.done && "line-through")}>
                      {day.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{day.type}</p>
                  </div>

                  {/* Meta */}
                  <div className="text-right shrink-0">
                    {day.duration > 0 && (
                      <p className="text-xs font-medium">{day.duration} min</p>
                    )}
                    <Badge className={cn("text-[10px] mt-0.5", INTENSITY_COLORS[day.intensity])}>
                      {day.intensity}
                    </Badge>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Coach capabilities */}
      <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
        <p className="font-semibold text-sm mb-3">Coach Capabilities</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {["Strength Training", "Cardio & HIIT", "Mobility & Yoga", "Recovery Days", "Beginner-Friendly", "Progressive Plans", "Breathing Exercises", "Low-Impact Options"].map(cap => (
            <div key={cap} className="flex items-center gap-1.5">
              <Check className="size-3 text-emerald-500 shrink-0" />
              <span className="text-muted-foreground">{cap}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground text-center">
        Demo mode — Workout plans are sample data. Not personalized medical exercise advice.
      </p>
    </div>
  )
}
