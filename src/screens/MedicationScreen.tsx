import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, Pill, Check, Clock, Calendar, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DEMO_MEDICATIONS } from "@/data/demo"
import { cn } from "@/lib/utils"

export function MedicationScreen() {
  const navigate = useNavigate()
  const [meds, setMeds] = useState(DEMO_MEDICATIONS)

  const toggleTaken = (id: string) => {
    setMeds(prev => prev.map(m =>
      m.id === id ? { ...m, takenToday: !m.takenToday } : m
    ))
  }

  const takenCount = meds.filter(m => m.takenToday).length
  const overallAdherence = Math.round(meds.reduce((a, m) => a + m.adherence, 0) / meds.length)

  return (
    <div className="px-4 pt-12 pb-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/home")} className="p-2 -ml-2 rounded-lg hover:bg-accent">
          <ChevronLeft className="size-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Medications</h1>
          <p className="text-sm text-muted-foreground">Adherence & reminders</p>
        </div>
      </div>

      {/* Adherence summary */}
      <div className="rounded-2xl p-4 gradient-wellness border border-emerald-200 dark:border-emerald-800">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">Today's Adherence</p>
            <p className="text-3xl font-extrabold text-foreground mt-1">{takenCount}/{meds.length}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">30-day average</p>
            <p className="text-2xl font-bold text-emerald-600">{overallAdherence}%</p>
          </div>
        </div>
        <Progress value={(takenCount / meds.length) * 100} className="h-2" />
      </div>

      {/* Medication list */}
      <div>
        <p className="font-semibold text-sm mb-3">Your Medications & Supplements</p>
        <div className="space-y-2">
          {meds.map(med => (
            <div key={med.id} className={cn(
              "bg-card border rounded-2xl p-4 shadow-sm transition-all",
              med.takenToday ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/10" : "border-border/50"
            )}>
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
                  med.takenToday
                    ? "bg-emerald-100 dark:bg-emerald-950/30"
                    : "bg-amber-100 dark:bg-amber-950/30"
                )}>
                  {med.takenToday ? (
                    <Check className="size-5 text-emerald-600" />
                  ) : (
                    <Pill className="size-5 text-amber-600" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{med.name}</p>
                    <Badge variant="outline" className="text-[10px]">{med.category}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{med.dose} • {med.frequency}</p>

                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {med.timing}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="size-3" />
                      {med.prescribedBy}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      Refill: {med.refillDue}
                    </span>
                  </div>

                  {/* Adherence bar */}
                  <div className="mt-2.5">
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className="text-muted-foreground">30-day adherence</span>
                      <span className={cn(
                        "font-semibold",
                        med.adherence >= 80 ? "text-emerald-600" : "text-amber-600"
                      )}>
                        {med.adherence}%
                      </span>
                    </div>
                    <Progress value={med.adherence} className="h-1" />
                  </div>
                </div>
              </div>

              {/* Action button */}
              <Button
                variant={med.takenToday ? "outline" : "default"}
                className="w-full mt-3 h-9 rounded-xl text-sm"
                onClick={() => toggleTaken(med.id)}>
                {med.takenToday ? (
                  <><Check className="size-4" /> Taken Today</>
                ) : (
                  <>Mark as Taken</>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Add medication */}
      <button className="w-full bg-card border border-dashed border-border rounded-2xl p-4 text-center hover:bg-accent/50 transition-colors">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Plus className="size-4" />
          <span className="text-sm font-medium">Add Medication or Supplement</span>
        </div>
      </button>

      {/* Capabilities */}
      <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
        <p className="font-semibold text-sm mb-3">Medication Support Features</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            "Reminders & alerts",
            "Adherence tracking",
            "Refill reminders",
            "Side-effect logging",
            "Doctor treatment plans",
            "Interaction checks*",
          ].map(feat => (
            <div key={feat} className="flex items-center gap-1.5">
              <Check className="size-3 text-emerald-500 shrink-0" />
              <span className="text-muted-foreground">{feat}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-3 italic">
          * Interaction checks require validated clinical databases — future feature.
        </p>
      </div>

      <p className="text-[11px] text-muted-foreground text-center">
        Demo mode — We help you follow your existing treatment plan. We do not prescribe medications.
      </p>
    </div>
  )
}
