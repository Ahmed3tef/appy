/**
 * Mock repository implementations backed by demo data.
 *
 * These implement the Repository<T> interface so mock data can later be
 * replaced by a real backend without changing UI code.
 *
 * TODO: Replace with Supabase-backed repositories in a future phase.
 */

import type {
  HealthProfile,
  TimelineEvent,
  LabReport,
  LabResultStatus,
  LabResultTrend,
  Medication,
  MedicationCategory,
  WorkoutPlan,
  WorkoutType,
  WorkoutIntensity,
  TodayWorkout,
  VitalsToday,
  Symptom,
  ChatMessage,
  HealthState,
} from "@/types"

import {
  DEMO_USER,
  DEMO_TIMELINE,
  DEMO_LAB_RESULTS,
  DEMO_MEDICATIONS,
  DEMO_WORKOUT_PLAN,
  DEMO_TODAY_WORKOUT,
  DEMO_VITALS_TODAY,
  DEMO_SYMPTOMS,
  DEMO_CHAT_HISTORY,
} from "@/data/demo"

import { DEMO_HEALTH_STATE } from "@/domain/health-state"

// ─── Health Profile Repository ───────────────────────────────

class HealthProfileRepository {
  private profile: HealthProfile = {
    ...DEMO_USER,
    knownConditions: [],
    allergies: [],
  } as HealthProfile

  async get(): Promise<HealthProfile> {
    return { ...this.profile }
  }

  async update(updates: Partial<HealthProfile>): Promise<HealthProfile> {
    this.profile = { ...this.profile, ...updates }
    return { ...this.profile }
  }
}

// ─── Timeline Repository ─────────────────────────────────────

class TimelineRepository {
  private events: TimelineEvent[] = [...DEMO_TIMELINE]

  async getAll(): Promise<TimelineEvent[]> {
    return [...this.events]
  }

  async add(event: TimelineEvent): Promise<TimelineEvent> {
    this.events.push(event)
    return event
  }
}

// ─── Lab Repository ──────────────────────────────────────────

class LabRepository {
  private reports: LabReport[] = DEMO_LAB_RESULTS.map(r => ({
    ...r,
    source: "LAB_RESULT" as const,
    results: r.results.map(item => ({
      ...item,
      source: "LAB_RESULT" as const,
      status: item.status as LabResultStatus,
      trend: item.trend as LabResultTrend,
    })),
  })) as LabReport[]

  async getAll(): Promise<LabReport[]> {
    return [...this.reports]
  }

  async getById(id: string): Promise<LabReport | null> {
    return this.reports.find(r => r.id === id) ?? null
  }

  async add(report: LabReport): Promise<LabReport> {
    this.reports.push(report)
    return report
  }
}

// ─── Medication Repository ───────────────────────────────────

class MedicationRepository {
  private meds: Medication[] = DEMO_MEDICATIONS.map(m => ({
    ...m,
    source: "CLINICIAN_CONFIRMED" as const,
    category: m.category as MedicationCategory,
  })) as Medication[]

  async getAll(): Promise<Medication[]> {
    return [...this.meds]
  }

  async update(id: string, updates: Partial<Medication>): Promise<Medication> {
    const idx = this.meds.findIndex(m => m.id === id)
    if (idx === -1) throw new Error(`Medication ${id} not found`)
    this.meds[idx] = { ...this.meds[idx], ...updates }
    return { ...this.meds[idx] }
  }
}

// ─── Workout Repository ──────────────────────────────────────

class WorkoutRepository {
  async getPlan(): Promise<WorkoutPlan> {
    return { ...DEMO_WORKOUT_PLAN, days: DEMO_WORKOUT_PLAN.days.map(d => ({
      ...d,
      type: d.type as WorkoutType,
      intensity: d.intensity as WorkoutIntensity,
    })) } as WorkoutPlan
  }

  async getToday(): Promise<TodayWorkout> {
    return { ...DEMO_TODAY_WORKOUT, intensity: DEMO_TODAY_WORKOUT.intensity as WorkoutIntensity } as TodayWorkout
  }
}

// ─── Vitals Repository ───────────────────────────────────────

class VitalsRepository {
  async getToday(): Promise<VitalsToday> {
    return { ...DEMO_VITALS_TODAY }
  }
}

// ─── Symptom Repository ──────────────────────────────────────

class SymptomRepository {
  async getAll(): Promise<Symptom[]> {
    return [...DEMO_SYMPTOMS]
  }
}

// ─── Companion / Chat Repository ─────────────────────────────

class ChatRepository {
  private messages: ChatMessage[] = [...DEMO_CHAT_HISTORY] as ChatMessage[]

  async getHistory(): Promise<ChatMessage[]> {
    return [...this.messages]
  }

  async add(message: ChatMessage): Promise<ChatMessage> {
    this.messages.push(message)
    return message
  }
}

// ─── Health State Repository ─────────────────────────────────

class HealthStateRepository {
  async getCurrent(): Promise<HealthState> {
    return { ...DEMO_HEALTH_STATE }
  }
}

// ─── Export singletons ───────────────────────────────────────

export const healthProfileRepo = new HealthProfileRepository()
export const timelineRepo = new TimelineRepository()
export const labRepo = new LabRepository()
export const medicationRepo = new MedicationRepository()
export const workoutRepo = new WorkoutRepository()
export const vitalsRepo = new VitalsRepository()
export const symptomRepo = new SymptomRepository()
export const chatRepo = new ChatRepository()
export const healthStateRepo = new HealthStateRepository()
