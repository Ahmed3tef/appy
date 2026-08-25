/**
 * Safety Engine — protective domain layer.
 *
 * The Safety Engine evaluates user input BEFORE any AI or recommendation logic.
 * It produces a SafetyState that governs what actions are allowed.
 *
 * IMPORTANT: This is a demo/prototype. The rules here are simple heuristics,
 * NOT medically validated. Real clinical rules require physician review.
 * See ClinicalRule in types/index.ts for the future validation architecture.
 */

import type {
  SafetyAssessmentInput,
  SafetyAssessmentResult,
  SafetyLevel,
  SafetyStateId,
  SafetyStateInfo,
} from "@/types"

export const SAFETY_STATES: Record<SafetyLevel, SafetyStateInfo> = {
  0: {
    level: 0,
    stateId: "NORMAL",
    label: "Normal",
    color: "health-success",
    description: "No concerning patterns detected.",
    action: "Continue as normal",
  },
  1: {
    level: 1,
    stateId: "MONITOR",
    label: "Monitor",
    color: "health-warning",
    description: "Some patterns worth monitoring.",
    action: "Log symptoms and check in tomorrow",
  },
  2: {
    level: 2,
    stateId: "MEDICAL_FOLLOW_UP",
    label: "Follow-up",
    color: "health-warning",
    description: "Recommend scheduling a medical follow-up.",
    action: "Book appointment within 1-2 weeks",
  },
  3: {
    level: 3,
    stateId: "URGENT",
    label: "Urgent",
    color: "health-danger",
    description: "Symptoms warrant prompt medical evaluation.",
    action: "See a doctor within 24-48 hours",
  },
  4: {
    level: 4,
    stateId: "EMERGENCY",
    label: "Emergency",
    color: "destructive",
    description: "Seek emergency medical care immediately.",
    action: "Call emergency services or go to ER now",
  },
}

// High-priority symptoms that should escalate safety state
const HIGH_PRIORITY_SYMPTOMS = ["s4", "s5"]   // Chest Pain, Shortness of Breath

/**
 * DEMO SAFETY RULES — not medically validated.
 *
 * TODO(clinical): Replace with physician-reviewed ClinicalRule entries.
 * The future architecture loads approved rules from a validated clinical
 * knowledge base with status = APPROVED, reviewedBy, and reviewedAt.
 */
export function assessSafety(input: SafetyAssessmentInput): SafetyAssessmentResult {
  const { symptoms, knownConditions = [] } = input
  const symptomCount = symptoms.length
  const hasHighPriority = symptoms.some(s => HIGH_PRIORITY_SYMPTOMS.includes(s))
  const hasChronicCondition = knownConditions.length > 0

  let level: SafetyLevel = 0

  if (hasHighPriority) {
    level = 3
  } else if (symptomCount > 2) {
    level = 2
  } else if (symptomCount > 0) {
    level = hasChronicCondition ? 2 : 1
  }

  const info = SAFETY_STATES[level]
  const allowedActions = getAllowedActions(level)
  const recommendedNextStep = getRecommendedNextStep(level)

  return { level, stateId: info.stateId, info, allowedActions, recommendedNextStep }
}

function getAllowedActions(level: SafetyLevel): string[] {
  switch (level) {
    case 0:
      return ["workout", "wellness_checkin", "companion", "lab_view", "medication_log"]
    case 1:
      return ["workout_adjusted", "wellness_checkin", "companion", "lab_view", "medication_log", "symptom_monitor"]
    case 2:
      return ["wellness_checkin", "companion", "lab_view", "medication_log", "medical_follow_up"]
    case 3:
      return ["companion", "medication_log", "urgent_medical_evaluation"]
    case 4:
      return ["emergency_services"]
    default:
      return []
  }
}

function getRecommendedNextStep(level: SafetyLevel): string {
  switch (level) {
    case 0:
      return "Continue your normal routine and check in with your Health Companion tomorrow."
    case 1:
      return "Monitor your symptoms over the next few days. Log any changes."
    case 2:
      return "Consider scheduling a non-urgent appointment with your primary care physician."
    case 3:
      return "Seek medical evaluation promptly. Contact your doctor or visit urgent care within 24-48 hours."
    case 4:
      return "Call emergency services or go to the nearest emergency room immediately."
    default:
      return "Continue as normal."
  }
}

export function getStateInfo(level: SafetyLevel): SafetyStateInfo {
  return SAFETY_STATES[level]
}

export function getStateId(level: SafetyLevel): SafetyStateId {
  return SAFETY_STATES[level].stateId
}
