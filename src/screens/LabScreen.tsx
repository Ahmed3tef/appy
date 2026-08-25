import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, FileText, Upload, TrendingUp, TrendingDown, Minus, FlaskConical, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { DEMO_LAB_RESULTS } from "@/data/demo"
import { cn } from "@/lib/utils"

type Phase = "list" | "upload" | "result"

export function LabScreen() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<Phase>("list")
  const [selectedResult, setSelectedResult] = useState<number | null>(null)

  const lab = DEMO_LAB_RESULTS[0]

  return (
    <div className="px-4 pt-12 pb-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => {
          if (phase === "list") navigate("/home")
          else setPhase("list")
        }} className="p-2 -ml-2 rounded-lg hover:bg-accent">
          <ChevronLeft className="size-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {phase === "upload" ? "Upload Lab Result" : "Lab Intelligence"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {phase === "list" && "Your lab results & analysis"}
            {phase === "upload" && "Upload a PDF or image of your results"}
            {phase === "result" && "AI-explained results"}
          </p>
        </div>
      </div>

      {/* Phase: List */}
      {phase === "list" && (
        <>
          <div className="rounded-2xl p-4 gradient-health border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <FlaskConical className="size-4 text-primary" />
              <p className="text-sm font-semibold text-primary">Lab Intelligence</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Upload your lab results and get clear, personalized explanations. We compare with previous results and track trends over time.
            </p>
            <Button className="w-full mt-3 h-11 rounded-xl" onClick={() => setPhase("upload")}>
              <Upload className="size-4" />
              Upload New Result
            </Button>
          </div>

          <div>
            <p className="font-semibold text-sm mb-3">Previous Results</p>
            <div className="space-y-2">
              {DEMO_LAB_RESULTS.map((result, idx) => (
                <Card key={result.id} className="p-4 shadow-sm border-border/50"
                  onClick={() => { setSelectedResult(idx); setPhase("result") }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <FileText className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{result.label}</p>
                        <p className="text-xs text-muted-foreground">{result.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle2 className="size-3 mr-1 text-emerald-500" />
                        {result.results.length} markers
                      </Badge>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Phase: Upload */}
      {phase === "upload" && (
        <>
          <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Upload className="size-8 text-primary" />
            </div>
            <p className="font-semibold text-sm mb-1">Upload your lab result</p>
            <p className="text-xs text-muted-foreground mb-4">PDF, JPG, or PNG — up to 10MB</p>
            <Button className="h-11 rounded-xl">
              <FileText className="size-4" />
              Choose File
            </Button>
          </div>

          {/* Processing demo */}
          <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              How It Works
            </p>
            <div className="space-y-3">
              <ProcessStep num={1} label="Upload document" desc="PDF, photo, or structured file" />
              <ProcessStep num={2} label="Extract & normalize" desc="OCR reads biomarker values and units" />
              <ProcessStep num={3} label="Compare with history" desc="Match against previous results" />
              <ProcessStep num={4} label="Generate explanation" desc="Plain-language summary with trends" />
              <ProcessStep num={5} label="Add to timeline" desc="Results become part of your health journey" />
            </div>
          </div>

          {/* Demo button to view sample result */}
          <div className="rounded-xl p-3 bg-muted/50 border border-border/30">
            <p className="text-xs text-muted-foreground mb-2">Want to see how it looks?</p>
            <Button variant="outline" className="w-full h-10 rounded-xl"
              onClick={() => { setSelectedResult(0); setPhase("result") }}>
              View Sample Analyzed Result
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <p className="text-[11px] text-muted-foreground text-center">
            Demo mode — No actual file processing. Sample data shown for prototype.
          </p>
        </>
      )}

      {/* Phase: Result Detail */}
      {phase === "result" && selectedResult !== null && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">{lab.label}</p>
              <p className="text-xs text-muted-foreground">{lab.date}</p>
            </div>
            <Badge variant="secondary" className="text-xs">
              <CheckCircle2 className="size-3 mr-1" />
              {lab.status}
            </Badge>
          </div>

          {/* Summary banner */}
          <div className="rounded-2xl p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="size-4 text-emerald-600" />
              <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">Overall: Improving</p>
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
              4 of 6 markers improved since your last panel. No critical values detected. One marker (Ferritin) is borderline — discuss with your doctor.
            </p>
          </div>

          {/* Results list */}
          <div className="space-y-2">
            {lab.results.map((result, idx) => (
              <LabResultCard key={idx} result={result} />
            ))}
          </div>

          {/* Add to timeline */}
          <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="size-4 text-primary" />
              <p className="text-sm font-semibold">Added to Your Timeline</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              These results are now part of your health timeline. Future results will be compared automatically.
            </p>
            <Button variant="outline" className="w-full mt-3 h-10 rounded-xl"
              onClick={() => navigate("/timeline")}>
              View in Timeline
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <p className="text-[11px] text-muted-foreground text-center">
            Demo mode — Explanations are sample text, not AI-generated medical advice. Always consult your doctor.
          </p>
        </>
      )}
    </div>
  )
}

function ProcessStep({ num, label, desc }: { num: number; label: string; desc: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-primary">{num}</span>
      </div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}

function LabResultCard({ result }: { result: typeof DEMO_LAB_RESULTS[0]["results"][0] }) {
  const TrendIcon = result.trend === "improved" ? TrendingUp : result.trend === "stable" ? Minus : TrendingDown
  const trendColor = result.trend === "improved" ? "text-emerald-600" : result.trend === "stable" ? "text-blue-600" : "text-rose-600"
  const statusColor = result.status === "normal" ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" : "text-amber-600 bg-amber-50 dark:bg-amber-950/30"
  const statusIcon = result.status === "normal" ? CheckCircle2 : AlertCircle

  return (
    <Card className="p-4 shadow-sm border-border/50">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-sm">{result.name}</p>
          <p className="text-xs text-muted-foreground">Ref: {result.referenceMin}–{result.referenceMax} {result.unit}</p>
        </div>
        <div className={cn("flex items-center gap-1 px-2 py-1 rounded-lg", statusColor)}>
          {(() => { const Icon = statusIcon; return <Icon className="size-3.5" /> })()}
          <span className="text-xs font-semibold capitalize">{result.status}</span>
        </div>
      </div>

      <div className="flex items-end gap-4 mb-3">
        <div>
          <p className="text-xs text-muted-foreground">Current</p>
          <p className="text-lg font-bold">{result.value}<span className="text-xs font-normal text-muted-foreground ml-1">{result.unit}</span></p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Previous</p>
          <p className="text-sm font-medium text-muted-foreground">{result.previousValue}<span className="text-xs ml-1">{result.unit}</span></p>
        </div>
        <div className={cn("flex items-center gap-0.5 ml-auto", trendColor)}>
          <TrendIcon className="size-4" />
          <span className="text-xs font-semibold capitalize">{result.trend}</span>
        </div>
      </div>

      {/* Reference range bar */}
      <div className="relative h-2 rounded-full bg-muted overflow-hidden mb-3">
        <div className="absolute inset-0 bg-emerald-200 dark:bg-emerald-900/40" />
        <div
          className="absolute h-full w-1.5 bg-foreground rounded-full"
          style={{
            left: `${Math.min(100, Math.max(0, ((result.value - result.referenceMin) / (result.referenceMax - result.referenceMin)) * 100))}%`
          }}
        />
      </div>

      {/* AI Explanation */}
      <div className="bg-muted/40 rounded-lg p-3">
        <p className="text-xs leading-relaxed text-foreground">
          <span className="font-semibold text-primary">Lab Intelligence: </span>
          {result.explanation}
        </p>
      </div>
    </Card>
  )
}
