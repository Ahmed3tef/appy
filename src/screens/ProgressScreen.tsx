import { useNavigate } from "react-router-dom"
import { ChevronLeft, TrendingDown, TrendingUp, Activity, Moon, Flame, Award, Target } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  DEMO_WEIGHT_HISTORY, DEMO_ACTIVITY_HISTORY, DEMO_SLEEP_HISTORY,
  DEMO_VITALS_TODAY
} from "@/data/demo"

export function ProgressScreen() {
  const navigate = useNavigate()
  const weightData = DEMO_WEIGHT_HISTORY
  const activityData = DEMO_ACTIVITY_HISTORY
  const sleepData = DEMO_SLEEP_HISTORY

  const startWeight = weightData[0].weight
  const currentWeight = weightData[weightData.length - 1].weight
  const weightLost = (startWeight - currentWeight).toFixed(1)
  const maxWeight = Math.max(...weightData.map(d => d.weight))
  const minWeight = Math.min(...weightData.map(d => d.weight))

  // Chart dimensions
  const chartWidth = 280
  const chartHeight = 120
  const padding = 20

  const weightPoints = weightData.map((d, i) => {
    const x = padding + (i / (weightData.length - 1)) * (chartWidth - padding * 2)
    const y = padding + ((maxWeight - d.weight) / (maxWeight - minWeight)) * (chartHeight - padding * 2)
    return { x, y, ...d }
  })

  const maxSessions = Math.max(...activityData.map(d => d.sessions))
  const barWidth = (chartWidth - padding * 2) / activityData.length

  const maxSleep = Math.max(...sleepData.map(d => d.hours))
  const minSleep = Math.min(...sleepData.map(d => d.hours))

  return (
    <div className="px-4 pt-12 pb-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/home")} className="p-2 -ml-2 rounded-lg hover:bg-accent">
          <ChevronLeft className="size-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Progress</h1>
          <p className="text-sm text-muted-foreground">Your health journey at a glance</p>
        </div>
      </div>

      {/* Hero stat */}
      <div className="rounded-2xl p-5 gradient-health border border-primary/20">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wide">Total Progress</p>
            <div className="flex items-end gap-1 mt-1">
              <span className="text-4xl font-extrabold text-foreground">{weightLost}</span>
              <span className="text-sm font-medium text-muted-foreground mb-1.5">kg lost</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center">
            <TrendingDown className="size-7 text-emerald-600" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          From {startWeight} kg to {currentWeight} kg — 7 months of consistent effort
        </p>
        <div className="flex gap-2 mt-3">
          <Badge variant="secondary" className="text-xs">
            <Activity className="size-3 mr-1" />
            4× more workouts
          </Badge>
          <Badge variant="secondary" className="text-xs">
            <Moon className="size-3 mr-1" />
            Better sleep
          </Badge>
        </div>
      </div>

      {/* Weight trend chart */}
      <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-sm">Weight Trend</p>
          <span className="text-xs text-emerald-600 font-medium flex items-center gap-0.5">
            <TrendingDown className="size-3" />
            {weightLost} kg
          </span>
        </div>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full" preserveAspectRatio="xMidYMid meet">
          {/* Grid lines */}
          <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="currentColor" className="text-border" strokeWidth="0.5" />
          <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="currentColor" className="text-border" strokeWidth="0.5" />

          {/* Area fill */}
          <path
            d={`M ${weightPoints.map(p => `${p.x} ${p.y}`).join(" L ")} L ${weightPoints[weightPoints.length - 1].x} ${chartHeight - padding} L ${weightPoints[0].x} ${chartHeight - padding} Z`}
            fill="var(--color-primary)"
            opacity="0.1"
          />

          {/* Line */}
          <path
            d={`M ${weightPoints.map(p => `${p.x} ${p.y}`).join(" L ")}`}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {weightPoints.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="3" fill="var(--color-primary)" />
              {i === 0 && <text x={p.x} y={chartHeight - 4} textAnchor="middle" fontSize="8" fill="currentColor" className="text-muted-foreground">{p.month}</text>}
              {i === weightPoints.length - 1 && <text x={p.x} y={chartHeight - 4} textAnchor="middle" fontSize="8" fill="currentColor" className="text-muted-foreground">{p.month}</text>}
            </g>
          ))}
        </svg>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{startWeight} kg</span>
          <span className="font-semibold text-foreground">{currentWeight} kg</span>
        </div>
      </div>

      {/* Activity chart */}
      <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-sm">Weekly Workouts</p>
          <span className="text-xs text-blue-600 font-medium flex items-center gap-0.5">
            <TrendingUp className="size-3" />
            1→4/week
          </span>
        </div>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full" preserveAspectRatio="xMidYMid meet">
          {activityData.map((d, i) => {
            const barH = (d.sessions / maxSessions) * (chartHeight - padding * 2)
            const x = padding + i * barWidth + 2
            const y = chartHeight - padding - barH
            return (
              <g key={i}>
                <rect x={x} y={y} width={barWidth - 4} height={barH}
                  rx="3" fill="var(--color-chart-2)" opacity={d.sessions === maxSessions ? 1 : 0.7} />
                <text x={x + (barWidth - 4) / 2} y={chartHeight - 4} textAnchor="middle" fontSize="8" fill="currentColor" className="text-muted-foreground">{d.month}</text>
                <text x={x + (barWidth - 4) / 2} y={y - 4} textAnchor="middle" fontSize="8" fill="currentColor" className="text-foreground font-semibold">{d.sessions}</text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Sleep chart */}
      <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-sm">This Week's Sleep</p>
          <span className="text-xs text-indigo-600 font-medium">
            Avg {(sleepData.reduce((a, b) => a + b.hours, 0) / sleepData.length).toFixed(1)}h
          </span>
        </div>
        <div className="flex items-end justify-between gap-2 h-24">
          {sleepData.map((d, i) => {
            const h = ((d.hours - minSleep) / (maxSleep - minSleep)) * 100
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col justify-end" style={{ height: "70px" }}>
                  <div className="w-full rounded-t-md bg-indigo-400/70 dark:bg-indigo-500/50"
                    style={{ height: `${Math.max(h, 20)}%` }} />
                </div>
                <span className="text-[10px] text-muted-foreground">{d.day}</span>
                <span className="text-[10px] font-semibold">{d.hours}h</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <p className="font-semibold text-sm mb-3">Achievements</p>
        <div className="grid grid-cols-2 gap-2">
          <Achievement icon={Flame} title="14 Day Streak" desc="Two weeks of consistency" color="text-orange-500" bg="bg-orange-50 dark:bg-orange-950/30" />
          <Achievement icon={TrendingDown} title="7 kg Lost" desc="From 94 to 87.2 kg" color="text-emerald-500" bg="bg-emerald-50 dark:bg-emerald-950/30" />
          <Achievement icon={Award} title="5K Personal Best" desc="New record in July" color="text-blue-500" bg="bg-blue-50 dark:bg-blue-950/30" />
          <Achievement icon={Target} title="Goal Progress" desc="68% to target weight" color="text-violet-500" bg="bg-violet-50 dark:bg-violet-950/30" />
        </div>
      </div>

      {/* Today's vitals summary */}
      <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-sm">Today's Vitals</p>
          <button onClick={() => navigate("/wellness")} className="text-xs text-primary font-medium">
            Check in →
          </button>
        </div>
        <div className="space-y-3">
          <VitalRow label="Energy" value={DEMO_VITALS_TODAY.energy} color="bg-yellow-400" />
          <VitalRow label="Sleep Quality" value={DEMO_VITALS_TODAY.sleep} color="bg-indigo-400" />
          <VitalRow label="Activity" value={DEMO_VITALS_TODAY.activity} color="bg-blue-400" />
          <VitalRow label="Mood" value={DEMO_VITALS_TODAY.mood} color="bg-rose-400" />
          <VitalRow label="Recovery" value={DEMO_VITALS_TODAY.recovery} color="bg-emerald-400" />
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground text-center">
        Demo mode — All charts show fictional sample data for prototype purposes.
      </p>
    </div>
  )
}

function Achievement({ icon: Icon, title, desc, color, bg }: {
  icon: React.ElementType; title: string; desc: string; color: string; bg: string
}) {
  return (
    <div className="bg-card border border-border/50 rounded-2xl p-3 shadow-sm">
      <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-2`}>
        <Icon className={`size-4.5 ${color}`} />
      </div>
      <p className="text-sm font-semibold leading-tight">{title}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
    </div>
  )
}

function VitalRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
