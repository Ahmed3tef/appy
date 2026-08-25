/**
 * Health State Engine — structured representation of the user's current wellness context.
 *
 * This is NOT a medical diagnosis. It is a structured snapshot that feeds
 * into the Coach, Companion, Notifications, Dashboard, and recommendations.
 *
 * For the prototype, this returns deterministic demo data.
 * Future versions will consume real data from repositories + wearables.
 */

import type { HealthState, VitalsToday, NextBestAction } from "@/types"

export const DEMO_HEALTH_STATE: HealthState = {
  energy: "low",
  sleep: "fair",
  mood: "good",
  stress: "moderate",
  activity: "moderate",
  pain: "none",
  fitnessLevel: "intermediate",
  consistency: "improving",
  goal: "weight-loss",
  safetyLevel: 0,
}

export function getHealthState(): HealthState {
  // TODO: In production, derive this from latest vitals, wellness check-ins,
  // wearable data, and health events. For now, return demo state.
  return DEMO_HEALTH_STATE
}

/**
 * Generate Today's Next Best Action based on the current Health State.
 *
 * The recommendation comes from structured state, not arbitrary AI text.
 */
export function getNextBestAction(
  healthState: HealthState,
  vitals: VitalsToday,
  medsPending: number,
): NextBestAction {
  // Medication due → highest priority (safety)
  if (medsPending > 0) {
    return {
      id: "nba-medication",
      title: "Log your medication",
      reason: `You have ${medsPending} medication${medsPending > 1 ? "s" : ""} pending today. Staying consistent with your schedule supports your treatment plan.`,
      category: "medication",
      route: "/medication",
      priority: 100,
    }
  }

  // Low energy + poor sleep → recovery focus
  if (healthState.energy === "low" || vitals.sleep < 60) {
    return {
      id: "nba-recovery",
      title: "Focus on recovery today",
      reason: "Your energy is lower than usual and sleep was below average. A gentle walk or stretching session will keep your streak without overexerting.",
      category: "recovery",
      route: "/workout",
      priority: 80,
    }
  }

  // Good energy + activity below goal → workout
  if (vitals.activity < 50 && vitals.energy >= 60) {
    return {
      id: "nba-workout",
      title: "Complete today's workout",
      reason: "You've been mostly sedentary today and your energy is decent. Your Lower Body Strength session is ready — 45 minutes.",
      category: "workout",
      route: "/workout/today",
      priority: 70,
    }
  }

  // No wellness check-in today → check in
  return {
    id: "nba-wellness",
    title: "Complete a wellness check-in",
    reason: "A quick daily check-in helps your companion understand how you're doing and tailor guidance to your current state.",
    category: "wellness",
    route: "/wellness",
    priority: 50,
  }
}
