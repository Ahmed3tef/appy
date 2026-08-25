import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Smile, Frown, Meh, Heart, Zap, Moon, Activity, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DEMO_USER } from "@/data/demo"
import { cn } from "@/lib/utils"

const MOODS = [
  { id: "great", label: "Great", icon: Smile, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
  { id: "good", label: "Good", icon: Smile, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30" },
  { id: "okay", label: "Okay", icon: Meh, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/30" },
  { id: "low", label: "Low", icon: Frown, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/30" },
  { id: "struggling", label: "Struggling", icon: Heart, color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/30" },
]

const CHECKIN_ITEMS = [
  { id: "energy", label: "Energy Level", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950/30" },
  { id: "sleep", label: "Sleep Quality", icon: Moon, color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-950/30" },
  { id: "activity", label: "Activity Level", icon: Activity, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30" },
]

export function WellnessCheckScreen() {
  const navigate = useNavigate()
  const [mood, setMood] = useState<string>("")
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleRate = (id: string, value: number) => {
    setRatings(prev => ({ ...prev, [id]: value }))
  }

  const allRated = mood !== "" && CHECKIN_ITEMS.every(item => ratings[item.id] !== undefined)

  return (
    <div className="px-4 pt-12 pb-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/home")} className="p-2 -ml-2 rounded-lg hover:bg-accent">
          <ChevronLeft className="size-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Wellness Check-in</h1>
          <p className="text-sm text-muted-foreground">How are you doing today?</p>
        </div>
      </div>

      {!submitted ? (
        <>
          {/* Mood selector */}
          <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
            <p className="font-semibold text-sm mb-3">How's your mood today?</p>
            <div className="flex justify-between gap-2">
              {MOODS.map(m => {
                const Icon = m.icon
                const isSelected = mood === m.id
                return (
                  <button
                    key={m.id}
                    onClick={() => setMood(m.id)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all flex-1",
                      isSelected ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                    )}>
                    <div className={cn("p-2 rounded-xl", m.bg)}>
                      <Icon className={cn("size-5", m.color)} />
                    </div>
                    <span className={cn(
                      "text-[10px] font-medium",
                      isSelected && "text-primary"
                    )}>
                      {m.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Ratings */}
          <div className="space-y-3">
            {CHECKIN_ITEMS.map(item => {
              const Icon = item.icon
              const rating = ratings[item.id]
              return (
                <div key={item.id} className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={cn("p-2 rounded-xl", item.bg)}>
                      <Icon className={cn("size-4", item.color)} />
                    </div>
                    <p className="font-semibold text-sm">{item.label}</p>
                    {rating !== undefined && (
                      <Badge variant="secondary" className="ml-auto text-xs">
                        {rating}/10
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground">Low</span>
                    <div className="flex gap-1.5 flex-1 justify-between">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                        <button
                          key={n}
                          onClick={() => handleRate(item.id, n)}
                          className={cn(
                            "w-6 h-6 rounded-md text-[10px] font-bold transition-all",
                            rating === n
                              ? n >= 7
                                ? "bg-emerald-500 text-white"
                                : n >= 4
                                  ? "bg-amber-500 text-white"
                                  : "bg-rose-500 text-white"
                              : "bg-muted text-muted-foreground hover:bg-accent"
                          )}>
                          {n}
                        </button>
                      ))}
                    </div>
                    <span className="text-[10px] text-muted-foreground">High</span>
                  </div>
                </div>
              )
            })}
          </div>

          <Button
            className="w-full h-12 rounded-xl font-semibold"
            disabled={!allRated}
            onClick={() => setSubmitted(true)}>
            Submit Check-in
            <ChevronRight className="size-4" />
          </Button>
        </>
      ) : (
        <>
          {/* Personalized response */}
          <div className="rounded-2xl p-5 gradient-wellness border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                <Sparkles className="size-6 text-primary-foreground" />
              </div>
              <div>
                <p className="font-bold text-sm">Wellness Companion</p>
                <p className="text-xs text-muted-foreground">Personalized response</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-foreground">
              Thanks for checking in, {DEMO_USER.name.split(" ")[0]}. You rated your mood as{" "}
              <strong>{MOODS.find(m => m.id === mood)?.label.toLowerCase()}</strong>, energy at{" "}
              <strong>{ratings.energy}/10</strong>, and sleep at <strong>{ratings.sleep}/10</strong>.
            </p>
            <div className="mt-3 pt-3 border-t border-primary/15">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {ratings.energy >= 6
                  ? "Your energy is decent today — consider channeling it into your planned workout. Even a lighter version will maintain your 14-day streak."
                  : "Your energy is lower than usual today. That's okay. Let's focus on gentle movement and hydration rather than pushing hard. Your consistency over the past month matters more than any single day."}
              </p>
            </div>
          </div>

          {/* Progress context */}
          <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
            <p className="font-semibold text-sm mb-3">Your Progress Context</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Check className="size-4 text-emerald-500 shrink-0" />
                <span className="text-muted-foreground">14-day consistency streak — your longest yet</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="size-4 text-emerald-500 shrink-0" />
                <span className="text-muted-foreground">Average workouts up from 1/week to 4/week since January</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="size-4 text-emerald-500 shrink-0" />
                <span className="text-muted-foreground">Energy levels improved from 4/10 to 7/10 over 7 months</span>
              </div>
            </div>
          </div>

          {/* Updated vitals */}
          <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
            <p className="font-semibold text-sm mb-3">Updated Vitals</p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-2xl font-bold text-yellow-500">{ratings.energy}</p>
                <p className="text-xs text-muted-foreground">Energy</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-500">{ratings.sleep}</p>
                <p className="text-xs text-muted-foreground">Sleep</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-500">{ratings.activity}</p>
                <p className="text-xs text-muted-foreground">Activity</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-11 rounded-xl" onClick={() => setSubmitted(false)}>
              Edit
            </Button>
            <Button className="flex-1 h-11 rounded-xl" onClick={() => navigate("/companion")}>
              Talk to Companion
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <p className="text-[11px] text-muted-foreground text-center">
            Demo mode — Responses are scripted, not AI-generated. Not a substitute for professional mental health support.
          </p>
        </>
      )}
    </div>
  )
}
