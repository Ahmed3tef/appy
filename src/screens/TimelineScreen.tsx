import { useNavigate } from "react-router-dom"
import { ChevronLeft, TrendingDown, TrendingUp, Activity, Moon, Zap, Award, AlertCircle, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { DEMO_TIMELINE } from "@/data/demo"
import { cn } from "@/lib/utils"

export function TimelineScreen() {
  const navigate = useNavigate()

  const first = DEMO_TIMELINE[0]
  const current = DEMO_TIMELINE[DEMO_TIMELINE.length - 1]
  const weightLost = (first.weight - current.weight).toFixed(1)

  return (
    <div className="px-4 pt-12 pb-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/home")} className="p-2 -ml-2 rounded-lg hover:bg-accent">
          <ChevronLeft className="size-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Health Timeline</h1>
          <p className="text-sm text-muted-foreground">Your journey since Jan 2024</p>
        </div>
      </div>

      {/* Journey Summary Banner */}
      <div className="rounded-2xl p-4 gradient-health border border-primary/20">
        <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Since You Started</p>
        <div className="flex items-end gap-1">
          <span className="text-3xl font-extrabold text-foreground">{weightLost}</span>
          <span className="text-sm font-medium text-muted-foreground mb-1">kg lost</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          From {first.weight} kg to {current.weight} kg over 7 months
        </p>
        <div className="flex gap-2 mt-3">
          <Badge variant="secondary" className="text-xs">
            <TrendingUp className="size-3 mr-1" />
            Workouts 1→4/week
          </Badge>
          <Badge variant="secondary" className="text-xs">
            <Zap className="size-3 mr-1" />
            Energy 4→7/10
          </Badge>
        </div>
      </div>

      {/* Timeline events */}
      <div>
        <h2 className="font-semibold text-base mb-3 flex items-center gap-2">
          <Calendar className="size-4 text-muted-foreground" />
          Milestones & Events
        </h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-4">
            {DEMO_TIMELINE.slice().reverse().map((event) => (
              <TimelineCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>

      {/* Demo notice */}
      <div className="rounded-xl p-3 bg-muted/50 border border-border/30">
        <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
          Demo data — fictional timeline for prototype demonstration.
        </p>
      </div>
    </div>
  )
}

function TimelineCard({ event }: { event: typeof DEMO_TIMELINE[0] }) {
  const dotColor = event.highlight
    ? "bg-primary"
    : event.tags.includes("setback")
      ? "bg-amber-500"
      : event.tags.includes("current")
        ? "bg-emerald-500"
        : "bg-muted-foreground"

  return (
    <div className="relative pl-12">
      {/* Dot */}
      <div className={cn("absolute left-2.5 top-2 w-4 h-4 rounded-full border-2 border-background z-10", dotColor)} />

      <Card className={cn(
        "p-4 shadow-sm border-border/50",
        event.highlight && "border-primary/30 bg-primary/5"
      )}>
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="font-bold text-sm text-foreground">{event.label}</p>
            <p className="text-xs text-muted-foreground">{event.date}</p>
          </div>
          {event.highlight && (
            <Badge variant="default" className="text-xs">
              <Award className="size-3 mr-1" />
              Milestone
            </Badge>
          )}
          {event.tags.includes("setback") && (
            <Badge variant="outline" className="text-xs text-amber-600 border-amber-300">
              <AlertCircle className="size-3 mr-1" />
              Setback
            </Badge>
          )}
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{event.notes}</p>

        {/* Metrics grid */}
        <div className="grid grid-cols-3 gap-2">
          <Metric label="Weight" value={`${event.weight} kg`} icon={TrendingDown} />
          <Metric label="Workouts" value={`${event.weeklyWorkouts}/wk`} icon={Activity} />
          <Metric label="Sleep" value={event.sleepQuality} icon={Moon} />
        </div>

        {/* Energy bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Energy Level</span>
            <span className="font-semibold">{event.energyLevel}/10</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                event.energyLevel >= 7 ? "bg-emerald-500" :
                event.energyLevel >= 5 ? "bg-amber-500" : "bg-rose-500"
              )}
              style={{ width: `${event.energyLevel * 10}%` }}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

function Metric({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) {
  return (
    <div className="bg-muted/40 rounded-lg p-2 text-center">
      <Icon className="size-3.5 text-muted-foreground mx-auto mb-1" />
      <p className="text-xs font-semibold text-foreground leading-tight">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  )
}
