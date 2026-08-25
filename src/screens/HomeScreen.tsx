import { useNavigate } from "react-router-dom"
import { Bell, ChevronRight, Flame, Droplets, Heart, Moon, Activity, Zap, TrendingUp, MessageCircle, Pill, FlaskConical, AlertTriangle, Target, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { DEMO_USER, DEMO_VITALS_TODAY, DEMO_MEDICATIONS } from "@/data/demo"
import { getHealthState, getNextBestAction } from "@/domain/health-state"
import { t } from "@/i18n"

function RingProgress({ value, size = 52, stroke = 5, color = "var(--color-primary)" }: {
  value: number; size?: number; stroke?: number; color?: string
}) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const dash = (value / 100) * circ
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="currentColor" strokeWidth={stroke} className="text-muted/40" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        className="progress-ring-circle" />
    </svg>
  )
}

function StatCard({ label, value, unit, icon: Icon, color, bgColor, progress }: {
  label: string; value: string | number; unit?: string;
  icon: React.ElementType; color: string; bgColor: string; progress?: number
}) {
  return (
    <div className="bg-card border border-border/50 rounded-2xl p-3.5 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <div className={cn("p-2 rounded-xl", bgColor)}>
          <Icon className={cn("size-4", color)} />
        </div>
        {progress !== undefined && (
          <span className="text-xs text-muted-foreground font-medium">{progress}%</span>
        )}
      </div>
      <p className="text-xl font-bold leading-none">
        {value}<span className="text-xs font-medium text-muted-foreground ml-0.5">{unit}</span>
      </p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      {progress !== undefined && (
        <Progress value={progress} className="h-1 mt-2" />
      )}
    </div>
  )
}

function VitalCard({ label, value, icon: Icon, color }: {
  label: string; value: number; icon: React.ElementType; color: string
}) {
  const getStatus = (v: number) => {
    if (v >= 80) return { label: "Great", col: "text-emerald-600" }
    if (v >= 60) return { label: "Good", col: "text-blue-600" }
    if (v >= 40) return { label: "Fair", col: "text-amber-600" }
    return { label: "Low", col: "text-rose-600" }
  }
  const status = getStatus(value)

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative">
        <RingProgress value={value} size={56} stroke={5}
          color={value >= 80 ? "oklch(0.65 0.15 150)" : value >= 60 ? "oklch(0.52 0.18 245)" : value >= 40 ? "oklch(0.72 0.16 70)" : "oklch(0.62 0.22 25)"} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className={cn("size-4", color)} />
        </div>
      </div>
      <div className="text-center">
        <p className={cn("text-xs font-semibold", status.col)}>{status.label}</p>
        <p className="text-[10px] text-muted-foreground">{label}</p>
      </div>
    </div>
  )
}

export function HomeScreen() {
  const navigate = useNavigate()
  const user = DEMO_USER
  const vitals = DEMO_VITALS_TODAY
  const meds = DEMO_MEDICATIONS
  const medicationDue = meds.filter(m => !m.takenToday)

  const healthState = getHealthState()
  const nextAction = getNextBestAction(healthState, vitals, medicationDue.length)

  const hour = new Date().getHours()
  const greeting = hour < 12 ? t("greeting.morning") : hour < 17 ? t("greeting.afternoon") : t("greeting.evening")

  return (
    <div className="px-4 pt-12 pb-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">{greeting}</p>
          <h1 className="text-2xl font-bold tracking-tight">{user.name.split(" ")[0]} 👋</h1>
        </div>
        <div className="flex items-center gap-2">
          {medicationDue.length > 0 && (
            <button onClick={() => navigate("/medication")}
              className="relative p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
              <Pill className="size-5 text-amber-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                {medicationDue.length}
              </span>
            </button>
          )}
          <button className="p-2 rounded-xl border border-border">
            <Bell className="size-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Today's Next Best Action */}
      <div className="rounded-2xl p-4 bg-card border border-primary/30 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Target className="size-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-0.5">Next Best Action</p>
            <h2 className="text-base font-bold text-foreground mb-1">{nextAction.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{nextAction.reason}</p>
            {nextAction.route && (
              <button onClick={() => navigate(nextAction.route!)}
                className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary">
                Go to {nextAction.category.replace(/_/g, " ")} <ArrowRight className="size-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Today's Focus Banner */}
      <div className="rounded-2xl p-4 gradient-health border border-primary/20">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <Zap className="size-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">Today's Focus</span>
            </div>
            <h2 className="text-lg font-bold text-foreground mb-1">{vitals.focusArea}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed text-balance">{vitals.focusReason}</p>
          </div>
          <div className="ml-3 shrink-0">
            <RingProgress value={vitals.activity} size={60} stroke={6} />
            <p className="text-xs text-center text-muted-foreground mt-1">{vitals.activity}%</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-primary/15 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Flame className="size-4 text-orange-500" />
            <span className="text-sm font-bold text-foreground">{user.streak}</span>
            <span className="text-xs text-muted-foreground">day streak</span>
          </div>
          <button onClick={() => navigate("/workout/today")}
            className="flex items-center gap-1 text-xs font-semibold text-primary">
            View Workout <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Today's Stats */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-base">Today's Stats</h2>
          <button onClick={() => navigate("/progress")}
            className="text-xs text-primary font-medium flex items-center gap-0.5">
            View All <ChevronRight className="size-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            label="Steps"
            value={vitals.stepsToday.toLocaleString()}
            icon={Activity}
            color="text-blue-500"
            bgColor="bg-blue-50 dark:bg-blue-950/30"
            progress={Math.round((vitals.stepsToday / vitals.stepsGoal) * 100)}
          />
          <StatCard
            label="Water"
            value={vitals.waterMl}
            unit="ml"
            icon={Droplets}
            color="text-cyan-500"
            bgColor="bg-cyan-50 dark:bg-cyan-950/30"
            progress={Math.round((vitals.waterMl / vitals.waterGoal) * 100)}
          />
          <StatCard
            label="Cal Burned"
            value={vitals.caloriesBurned}
            unit="kcal"
            icon={Flame}
            color="text-orange-500"
            bgColor="bg-orange-50 dark:bg-orange-950/30"
          />
          <StatCard
            label="Heart Rate"
            value={vitals.heartRate}
            unit="bpm"
            icon={Heart}
            color="text-rose-500"
            bgColor="bg-rose-50 dark:bg-rose-950/30"
          />
        </div>
      </div>

      {/* Wellness Vitals Ring */}
      <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-base">How You're Doing</h2>
          <button onClick={() => navigate("/wellness")}
            className="text-xs text-primary font-medium flex items-center gap-0.5">
            Check in <ChevronRight className="size-3.5" />
          </button>
        </div>
        <div className="flex justify-around">
          <VitalCard label="Energy" value={vitals.energy} icon={Zap} color="text-yellow-500" />
          <VitalCard label="Sleep" value={vitals.sleep} icon={Moon} color="text-indigo-500" />
          <VitalCard label="Activity" value={vitals.activity} icon={Activity} color="text-blue-500" />
          <VitalCard label="Mood" value={vitals.mood} icon={Heart} color="text-rose-500" />
          <VitalCard label="Recovery" value={vitals.recovery} icon={TrendingUp} color="text-emerald-500" />
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-semibold text-base mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <QuickAction
            icon={MessageCircle}
            iconColor="text-violet-500"
            iconBg="bg-violet-50 dark:bg-violet-950/30"
            label="Health Companion"
            desc="Chat with your AI companion"
            onClick={() => navigate("/companion")}
          />
          <QuickAction
            icon={AlertTriangle}
            iconColor="text-amber-500"
            iconBg="bg-amber-50 dark:bg-amber-950/30"
            label="Symptom Check"
            desc="Log how you're feeling"
            onClick={() => navigate("/symptoms")}
          />
          <QuickAction
            icon={FlaskConical}
            iconColor="text-emerald-500"
            iconBg="bg-emerald-50 dark:bg-emerald-950/30"
            label="Lab Results"
            desc="View & upload results"
            onClick={() => navigate("/labs")}
          />
          <QuickAction
            icon={TrendingUp}
            iconColor="text-blue-500"
            iconBg="bg-blue-50 dark:bg-blue-950/30"
            label="My Timeline"
            desc="View health journey"
            onClick={() => navigate("/timeline")}
          />
        </div>
      </div>

      {/* Medication reminder */}
      {medicationDue.length > 0 && (
        <div className="rounded-2xl p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-3 mb-2">
            <Pill className="size-5 text-amber-600" />
            <div>
              <p className="font-semibold text-sm text-amber-900 dark:text-amber-100">Medication Reminder</p>
              <p className="text-xs text-amber-700 dark:text-amber-300">
                {medicationDue.length} item{medicationDue.length > 1 ? "s" : ""} pending today
              </p>
            </div>
            <button onClick={() => navigate("/medication")}
              className="ml-auto text-xs font-semibold text-amber-700 dark:text-amber-300 flex items-center gap-0.5">
              View <ChevronRight className="size-3.5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {medicationDue.map(m => (
              <Badge key={m.id} variant="outline" className="text-xs bg-white/60 dark:bg-amber-900/30 border-amber-300">
                {m.name}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Demo disclaimer */}
      <div className="rounded-xl p-3 bg-muted/50 border border-border/30">
        <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
          🔬 <strong>Demo Mode</strong> — All health data shown is fictional and for prototype purposes only. Not medical advice.
        </p>
      </div>
    </div>
  )
}

function QuickAction({ icon: Icon, iconColor, iconBg, label, desc, onClick }: {
  icon: React.ElementType; iconColor: string; iconBg: string;
  label: string; desc: string; onClick: () => void
}) {
  return (
    <button onClick={onClick}
      className="bg-card border border-border/50 rounded-2xl p-3.5 shadow-sm text-left hover:bg-accent/50 transition-colors active:scale-[0.98]">
      <div className={cn("p-2 rounded-xl w-fit mb-2", iconBg)}>
        <Icon className={cn("size-4", iconColor)} />
      </div>
      <p className="font-semibold text-sm text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
    </button>
  )
}
