import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, Check, ChevronRight, Dumbbell, Clock, Flame, Play, Pause, SkipForward, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DEMO_TODAY_WORKOUT } from "@/data/demo"
import { cn } from "@/lib/utils"

export function TodayWorkoutScreen() {
  const navigate = useNavigate()
  const [completedExercises, setCompletedExercises] = useState<number[]>([])
  const [isStarted, setIsStarted] = useState(false)

  const workout = DEMO_TODAY_WORKOUT
  const totalExercises = workout.exercises.length
  const progress = (completedExercises.length / totalExercises) * 100
  const isComplete = completedExercises.length === totalExercises

  const toggleExercise = (idx: number) => {
    setCompletedExercises(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    )
  }

  return (
    <div className="px-4 pt-12 pb-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/workout")} className="p-2 -ml-2 rounded-lg hover:bg-accent">
          <ChevronLeft className="size-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{workout.title}</h1>
          <p className="text-sm text-muted-foreground">Today's session</p>
        </div>
      </div>

      {/* Workout stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card border border-border/50 rounded-2xl p-3 text-center shadow-sm">
          <Clock className="size-4 text-blue-500 mx-auto mb-1" />
          <p className="text-lg font-bold">{workout.duration}</p>
          <p className="text-xs text-muted-foreground">minutes</p>
        </div>
        <div className="bg-card border border-border/50 rounded-2xl p-3 text-center shadow-sm">
          <Flame className="size-4 text-orange-500 mx-auto mb-1" />
          <p className="text-lg font-bold">{workout.calories}</p>
          <p className="text-xs text-muted-foreground">kcal</p>
        </div>
        <div className="bg-card border border-border/50 rounded-2xl p-3 text-center shadow-sm">
          <Dumbbell className="size-4 text-violet-500 mx-auto mb-1" />
          <p className="text-lg font-bold">{totalExercises}</p>
          <p className="text-xs text-muted-foreground">exercises</p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold">Progress</p>
          <p className="text-sm font-bold text-primary">{completedExercises.length}/{totalExercises}</p>
        </div>
        <Progress value={progress} className="h-2" />
        {isComplete && (
          <div className="mt-3 flex items-center gap-2 text-emerald-600">
            <Trophy className="size-4" />
            <p className="text-sm font-semibold">Workout complete! Great job. 🎉</p>
          </div>
        )}
      </div>

      {/* Exercise list */}
      <div>
        <p className="font-semibold text-sm mb-3">Exercises</p>
        <div className="space-y-2">
          {workout.exercises.map((exercise, idx) => {
            const isDone = completedExercises.includes(idx)
            return (
              <div key={idx} className={cn(
                "bg-card border rounded-2xl p-4 shadow-sm transition-all",
                isDone ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/10" : "border-border/50"
              )}>
                <div className="flex items-center gap-3">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleExercise(idx)}
                    className={cn(
                      "w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                      isDone
                        ? "bg-emerald-500 border-emerald-500"
                        : "border-border hover:border-primary"
                    )}>
                    {isDone && <Check className="size-4 text-white" />}
                  </button>

                  {/* Exercise info */}
                  <div className="flex-1 min-w-0">
                    <p className={cn("font-semibold text-sm", isDone && "line-through text-muted-foreground")}>
                      {exercise.name}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-muted-foreground">{exercise.sets} sets × {exercise.reps}</span>
                      <span className="text-xs text-muted-foreground">Rest: {exercise.rest}</span>
                    </div>
                  </div>

                  {/* Set indicator */}
                  <div className="flex gap-1 shrink-0">
                    {Array.from({ length: exercise.sets }).map((_, s) => (
                      <div key={s} className={cn(
                        "w-2 h-2 rounded-full",
                        isDone ? "bg-emerald-500" : "bg-muted-foreground/30"
                      )} />
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Workout controls */}
      {!isComplete && (
        <div className="flex items-center justify-center gap-4 py-2">
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
            <SkipForward className="size-5" />
          </Button>
          <Button
            size="icon"
            className="h-16 w-16 rounded-full shadow-lg shadow-primary/30"
            onClick={() => setIsStarted(!isStarted)}>
            {isStarted ? <Pause className="size-7" /> : <Play className="size-7 ml-0.5" />}
          </Button>
          <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
            <ChevronRight className="size-5" />
          </Button>
        </div>
      )}

      {isComplete && (
        <Button className="w-full h-12 rounded-xl font-semibold" onClick={() => navigate("/home")}>
          Finish & Return Home
          <ChevronRight className="size-4" />
        </Button>
      )}

      <p className="text-[11px] text-muted-foreground text-center">
        Demo mode — Exercise data is sample content. Consult a professional before starting any exercise program.
      </p>
    </div>
  )
}
