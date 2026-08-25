/**
 * Core domain types for the health companion app.
 * These interfaces define the shape of data across the app.
 * UI components should depend on these types, not on demo data directly.
 */

// ─── User & Profile ──────────────────────────────────────────

export type Sex = "Male" | "Female" | "Other"
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "athlete"
export type Goal =
  | "weight-loss" | "muscle-gain" | "better-energy" | "better-sleep"
  | "cardiovascular" | "stress-management" | "mobility" | "consistency" | "healthy-aging"

export interface HealthProfile {
  id: string
  name: string
  age: number
  sex: Sex
  height: number       // cm
  weight: number       // kg
  bmi: number
  bloodType?: string
  avatar: string       // initials
  goal: string
  activityLevel: ActivityLevel
  joinDate: string
  streak: number
  knownConditions: string[]
  allergies: string[]
}

// ─── Health Event (unified) ──────────────────────────────────

export type HealthEventType =
  | "symptom_reported"
  | "lab_uploaded"
  | "lab_result_recorded"
  | "medication_started"
  | "medication_taken"
  | "medication_skipped"
  | "workout_completed"
  | "workout_skipped"
  | "mood_checkin"
  | "sleep_recorded"
  | "measurement_recorded"
  | "doctor_visit"
  | "wearable_measurement"
  | "goal_achieved"
  | "setback"
  | "milestone"

export type DataSourceType =
  | "USER_REPORTED"
  | "LAB_RESULT"
  | "CLINICIAN_CONFIRMED"
  | "WEARABLE"
  | "IMPORTED_RECORD"
  | "AI_INFERENCE"

export interface HealthEvent {
  id: string
  type: HealthEventType
  date: string               // ISO date
  label: string
  description?: string
  source: DataSourceType
  metadata?: Record<string, unknown>
  tags: string[]             // e.g. ["milestone", "weight"], ["setback"], ["current"]
}

// ─── Health State ────────────────────────────────────────────

export type Level = "low" | "fair" | "moderate" | "good" | "high"
export type EnergyLevel = "low" | "fair" | "moderate" | "good"
export type FitnessLevel = "beginner" | "intermediate" | "advanced"
export type Consistency = "low" | "improving" | "good" | "excellent"
export type PainLevel = "none" | "mild" | "moderate" | "severe"

export interface HealthState {
  energy: EnergyLevel
  sleep: Level
  mood: Level
  stress: Level
  activity: Level
  pain: PainLevel
  fitnessLevel: FitnessLevel
  consistency: Consistency
  goal: Goal
  safetyLevel: SafetyLevel
}

// ─── Safety Engine ───────────────────────────────────────────

export type SafetyLevel = 0 | 1 | 2 | 3 | 4

export type SafetyStateId =
  | "NORMAL"
  | "MONITOR"
  | "MEDICAL_FOLLOW_UP"
  | "URGENT"
  | "EMERGENCY"

export interface SafetyStateInfo {
  level: SafetyLevel
  stateId: SafetyStateId
  label: string
  color: string
  description: string
  action: string
}

export interface SafetyAssessmentInput {
  symptoms: string[]
  severity?: string
  duration?: string
  age?: number
  knownConditions?: string[]
  medications?: string[]
}

export interface SafetyAssessmentResult {
  level: SafetyLevel
  stateId: SafetyStateId
  info: SafetyStateInfo
  allowedActions: string[]
  recommendedNextStep: string
}

// ─── Symptoms ────────────────────────────────────────────────

export interface Symptom {
  id: string
  label: string
  icon: string
  category: string
}

export interface SymptomReport {
  symptoms: string[]
  originalUserStatement?: string
  duration?: string
  severity?: string
  frequency?: string
  triggers?: string
  associatedSymptoms?: string
}

// ─── Labs ────────────────────────────────────────────────────

export type LabResultStatus = "normal" | "borderline" | "abnormal" | "critical"
export type LabResultTrend = "improved" | "stable" | "worsened" | "new"

export interface LabResultItem {
  name: string
  value: number
  unit: string
  previousValue?: number
  referenceMin: number
  referenceMax: number
  status: LabResultStatus
  trend: LabResultTrend
  explanation: string
  source: DataSourceType
}

export interface LabReport {
  id: string
  date: string
  label: string
  status: string
  source: DataSourceType
  results: LabResultItem[]
}

// ─── Medications ─────────────────────────────────────────────

export type MedicationCategory = "Supplement" | "Prescription" | "Over-the-counter"

export interface Medication {
  id: string
  name: string
  dose: string
  frequency: string
  timing: string
  category: MedicationCategory
  prescribedBy: string
  adherence: number
  takenToday: boolean
  refillDue: string
  source: DataSourceType
}

// ─── Workouts ────────────────────────────────────────────────

export type WorkoutType = "Strength" | "Cardio" | "Rest" | "Mobility"
export type WorkoutIntensity = "None" | "Low" | "Light" | "Moderate" | "High"

export interface WorkoutExercise {
  name: string
  sets: number
  reps: string
  rest: string
  done: boolean
}

export interface WorkoutDay {
  day: string
  type: WorkoutType
  label: string
  done: boolean
  duration: number
  intensity: WorkoutIntensity
}

export interface WorkoutPlan {
  weekLabel: string
  days: WorkoutDay[]
}

export interface TodayWorkout {
  title: string
  duration: number
  intensity: WorkoutIntensity
  calories: number
  exercises: WorkoutExercise[]
}

// ─── Wellness ────────────────────────────────────────────────

export interface WellnessCheckIn {
  mood: string
  energy: number
  sleep: number
  activity: number
  date: string
}

// ─── Companion ───────────────────────────────────────────────

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  time: string
}

// ─── Timeline ────────────────────────────────────────────────

export interface TimelineEvent {
  id: string
  date: string
  label: string
  weight: number
  weeklyWorkouts: number
  sleepQuality: string
  energyLevel: number
  notes: string
  highlight: boolean
  tags: string[]
  healthEvent?: HealthEvent
}

// ─── Next Best Action ────────────────────────────────────────

export type NextBestActionCategory =
  | "workout" | "recovery" | "medication" | "wellness" | "lab" | "symptom" | "companion"

export interface NextBestAction {
  id: string
  title: string
  reason: string
  category: NextBestActionCategory
  route?: string
  priority: number
}

// ─── Vitals ──────────────────────────────────────────────────

export interface VitalsToday {
  energy: number
  sleep: number
  activity: number
  mood: number
  consistency: number
  recovery: number
  stepsToday: number
  stepsGoal: number
  waterMl: number
  waterGoal: number
  caloriesBurned: number
  heartRate: number
  focusArea: string
  focusReason: string
}

// ─── AI ──────────────────────────────────────────────────────

export type AIProviderId = "openai" | "gemini" | "anthropic" | "mock"

export interface AIProvider {
  id: AIProviderId
  label: string
  available: boolean
}

export type AISpecialty = "lab_intelligence" | "health_navigator" | "wellness_companion" | "fitness_coach"

export interface AIRequest {
  specialty: AISpecialty
  healthState: HealthState
  safetyState: SafetyStateInfo
  userInput: string
  context?: Record<string, unknown>
}

export interface AIResponse {
  content: string
  specialty: AISpecialty
  provider: AIProviderId
  isDemo: boolean
}

// ─── Wearable ────────────────────────────────────────────────

export type WearableProvider = "apple_health" | "google_health_connect" | "garmin" | "fitbit" | "oura" | "whoop"

export interface WearableDataPoint {
  type: string
  value: number
  unit: string
  timestamp: string
}

export interface HealthDataProvider {
  id: WearableProvider
  label: string
  available: boolean
}

// ─── Clinical Validation ─────────────────────────────────────

export type ClinicalRuleStatus = "DRAFT" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "RETIRED"

export interface ClinicalRule {
  ruleId: string
  category: string
  description: string
  source: string
  version: string
  status: ClinicalRuleStatus
  reviewedBy?: string
  reviewedAt?: string
}

// ─── Analytics ───────────────────────────────────────────────

export type AnalyticsEvent =
  | "onboarding_started" | "onboarding_completed"
  | "symptom_started" | "symptom_completed"
  | "lab_uploaded" | "lab_viewed"
  | "workout_started" | "workout_completed"
  | "medication_logged" | "wellness_checkin"
  | "timeline_viewed" | "progress_viewed" | "subscription_viewed"

export interface AnalyticsAdapter {
  track(event: AnalyticsEvent, properties?: Record<string, unknown>): void
}

// ─── Repositories ────────────────────────────────────────────

export interface Repository<T> {
  getAll(): Promise<T[]>
  getById(id: string): Promise<T | null>
  create(item: T): Promise<T>
  update(id: string, updates: Partial<T>): Promise<T>
  delete(id: string): Promise<void>
}
