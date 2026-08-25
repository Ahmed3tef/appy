import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Check, AlertTriangle, Shield, ArrowRight, Clock, Activity, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { DEMO_SYMPTOMS } from "@/data/demo"
import { assessSafety } from "@/domain/safety-engine"
import { createHealthEvent } from "@/domain/health-events"
import { analytics } from "@/services/analytics"
import { t } from "@/i18n"
import { cn } from "@/lib/utils"

type Phase = "select" | "details" | "summary" | "freetext"

const CONTEXT_QUESTIONS = [
  { id: "duration", label: "How long have you had this?", options: ["Today", "1-3 days", "Under a week", "1-2 weeks", "Over 2 weeks"] },
  { id: "severity", label: "How severe is it?", options: ["Mild", "Moderate", "Significant", "Severe"] },
  { id: "frequency", label: "How often does it occur?", options: ["Constant", "Several times a day", "Once a day", "Occasionally", "Rarely"] },
  { id: "triggers", label: "Any known triggers?", options: ["After meals", "With movement", "When stressed", "No clear trigger", "Other"] },
]

export function SymptomCheckScreen() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>("select")
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [freeText, setFreeText] = useState("")

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const selectedLabels = selectedSymptoms
    .map(id => DEMO_SYMPTOMS.find(s => s.id === id)?.label)
    .filter(Boolean) as string[]

  // Safety Engine — domain layer assessment (demo rules)
  const safetyResult = assessSafety({ symptoms: selectedSymptoms })
  const demoSafety = safetyResult.level
  const safetyInfo = safetyResult.info

  const handleGetSummary = () => {
    // Create a Health Event for this symptom report
    const event = createHealthEvent({
      type: "symptom_reported",
      date: new Date().toISOString().split("T")[0],
      label: `Symptoms: ${selectedLabels.join(", ") || freeText || "Unknown"}`,
      description: freeText || undefined,
      source: "USER_REPORTED",
      tags: ["symptom"],
      metadata: { selectedSymptoms, answers, originalUserStatement: freeText || undefined },
    })
    analytics.track("symptom_completed", { eventCount: 1 })
    console.debug("[health-event] Symptom reported:", event)
    setPhase("summary")
  }

  return (
    <div className="px-4 pt-12 pb-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => phase === "select" ? navigate("/home") : setPhase("select")}
          className="p-2 -ml-2 rounded-lg hover:bg-accent">
          <ChevronLeft className="size-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Symptom Check</h1>
          <p className="text-sm text-muted-foreground">
            {phase === "select" && "Select what you're experiencing"}
            {phase === "details" && "A few questions to understand better"}
            {phase === "summary" && "Your symptom summary"}
          </p>
        </div>
      </div>

      {/* Phase: Select Symptoms */}
      {phase === "select" && (
        <>
          <div className="grid grid-cols-3 gap-2">
            {DEMO_SYMPTOMS.map(symptom => (
              <button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                className={cn(
                  "flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all",
                  selectedSymptoms.includes(symptom.id)
                    ? "bg-primary/10 border-primary"
                    : "border-border hover:bg-accent"
                )}>
                <span className="text-2xl">{symptom.icon}</span>
                <span className={cn(
                  "text-[11px] font-medium text-center leading-tight",
                  selectedSymptoms.includes(symptom.id) && "text-primary"
                )}>
                  {symptom.label}
                </span>
                {selectedSymptoms.includes(symptom.id) && (
                  <div className="absolute -mt-1 -mr-1">
                    <Check className="size-3.5 text-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Free-text symptom option */}
          <button
            onClick={() => setPhase("freetext")}
            className="w-full flex items-center gap-3 p-4 rounded-2xl border border-dashed border-border hover:bg-accent/50 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Type className="size-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm">{t("symptom.cantFind")}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Describe it in your own words</p>
            </div>
            <ChevronRight className="size-4 text-muted-foreground ml-auto" />
          </button>

          <Button
            className="w-full h-12 rounded-xl font-semibold"
            disabled={selectedSymptoms.length === 0}
            onClick={() => setPhase("details")}>
            Continue
            <ChevronRight className="size-4" />
          </Button>
        </>
      )}

      {/* Phase: Details */}
      {phase === "details" && (
        <>
          <div className="flex flex-wrap gap-2">
            {selectedLabels.map(label => (
              <Badge key={label} variant="default" className="text-sm py-1.5 px-3 rounded-xl">
                {label}
              </Badge>
            ))}
          </div>

          <div className="space-y-4">
            {CONTEXT_QUESTIONS.map(q => (
              <div key={q.id}>
                <p className="text-sm font-semibold mb-2">{q.label}</p>
                <div className="flex flex-wrap gap-2">
                  {q.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))}
                      className={cn(
                        "px-3 py-2 rounded-xl border text-sm font-medium transition-all",
                        answers[q.id] === opt
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:bg-accent"
                      )}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Button
            className="w-full h-12 rounded-xl font-semibold"
            disabled={Object.keys(answers).length < CONTEXT_QUESTIONS.length}
            onClick={handleGetSummary}>
            {t("symptom.getSummary")}
            <ChevronRight className="size-4" />
          </Button>
        </>
      )}

      {/* Phase: Free-text symptom */}
      {phase === "freetext" && (
        <>
          <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
            <p className="text-sm font-semibold mb-2">Describe what you're experiencing</p>
            <p className="text-xs text-muted-foreground mb-3">Use your own words. We'll preserve your original description and structure it for the summary.</p>
            <Textarea
              value={freeText}
              onChange={e => setFreeText(e.target.value)}
              placeholder="e.g. I've been getting a sharp pain behind my left eye every evening for the past three days..."
              className="min-h-[120px] rounded-xl"
              autoFocus
            />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-11 rounded-xl" onClick={() => setPhase("select")}>
              {t("common.back")}
            </Button>
            <Button
              className="flex-1 h-11 rounded-xl"
              disabled={!freeText.trim()}
              onClick={handleGetSummary}>
              {t("symptom.getSummary")}
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </>
      )}

      {/* Phase: Summary */}
      {phase === "summary" && (
        <>
          {/* Safety Engine banner */}
          <div className={cn(
            "rounded-2xl p-4 border",
            demoSafety <= 1 ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800" :
            demoSafety <= 2 ? "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800" :
            "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800"
          )}>
            <div className="flex items-start gap-3">
              <div className={cn(
                "p-2 rounded-xl shrink-0",
                demoSafety <= 1 ? "bg-amber-100 dark:bg-amber-900/40" :
                demoSafety <= 2 ? "bg-orange-100 dark:bg-orange-900/40" :
                "bg-rose-100 dark:bg-rose-900/40"
              )}>
                <Shield className={cn(
                  "size-5",
                  demoSafety <= 1 ? "text-amber-600" :
                  demoSafety <= 2 ? "text-orange-600" :
                  "text-rose-600"
                )} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-sm">
                    Safety Level {demoSafety}: {safetyInfo.label}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{safetyInfo.description}</p>
                <div className="mt-2 pt-2 border-t border-current/10">
                  <p className="text-xs font-semibold">
                    Recommended action: <span className="font-normal">{safetyInfo.action}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Symptom Summary Card */}
          <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm space-y-3">
            <p className="font-semibold text-sm">Symptom Summary</p>

            <div>
              <p className="text-xs text-muted-foreground mb-1.5">Symptoms reported</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedLabels.length > 0 ? (
                  selectedLabels.map(label => (
                    <Badge key={label} variant="outline" className="text-xs">{label}</Badge>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground italic">Described in own words (see below)</span>
                )}
              </div>
            </div>

            {freeText.trim() && (
              <div className="bg-muted/40 rounded-lg p-3">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">Your Original Description</p>
                <p className="text-xs italic text-foreground leading-relaxed">"{freeText.trim()}"</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <SummaryItem icon={Clock} label="Duration" value={answers.duration || "Not specified"} />
              <SummaryItem icon={Activity} label="Severity" value={answers.severity || "Not specified"} />
              <SummaryItem icon={AlertTriangle} label="Frequency" value={answers.frequency || "Not specified"} />
              <SummaryItem icon={Activity} label="Trigger" value={answers.triggers || "Not specified"} />
            </div>
          </div>

          {/* Demo response */}
          <div className="bg-muted/50 rounded-2xl p-4 border border-border/30">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Prototype Analysis (Demo)
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              Based on your reported symptoms ({selectedLabels.join(", ")}), the Safety Engine has assessed this as{" "}
              <strong>Level {demoSafety}</strong>. This is a demo assessment using prototype logic — not a medical diagnosis.
              {demoSafety >= 2 && " We recommend discussing these symptoms with a healthcare professional."}
            </p>
          </div>

          {/* Health Navigator suggestion */}
          <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <ArrowRight className="size-4 text-primary" />
              </div>
              <p className="font-semibold text-sm">Suggested Next Step</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {safetyResult.recommendedNextStep}
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-11 rounded-xl" onClick={() => setPhase("select")}>
              Start Over
            </Button>
            <Button className="flex-1 h-11 rounded-xl" onClick={() => navigate("/companion")}>
              Talk to Companion
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <p className="text-[11px] text-muted-foreground text-center">
            Demo mode — Not a medical diagnosis. Always consult a qualified healthcare professional.
          </p>
        </>
      )}
    </div>
  )
}

function SummaryItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="bg-muted/40 rounded-lg p-2.5">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="size-3 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-xs font-semibold">{value}</p>
    </div>
  )
}
