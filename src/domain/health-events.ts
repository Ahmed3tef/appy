/**
 * Health Events domain — unified event model.
 *
 * Anything important that happens to the user can become a Health Event.
 * These events feed the Health Timeline and influence the Health State.
 */

import type { HealthEvent, HealthEventType, DataSourceType } from "@/types"

let eventCounter = 0

export function createHealthEvent(params: {
  type: HealthEventType
  date: string
  label: string
  description?: string
  source?: DataSourceType
  tags?: string[]
  metadata?: Record<string, unknown>
}): HealthEvent {
  return {
    id: `evt-${Date.now()}-${eventCounter++}`,
    type: params.type,
    date: params.date,
    label: params.label,
    description: params.description,
    source: params.source ?? "USER_REPORTED",
    tags: params.tags ?? [],
    metadata: params.metadata,
  }
}

export function isMilestone(event: HealthEvent): boolean {
  return event.tags.includes("milestone")
}

export function isSetback(event: HealthEvent): boolean {
  return event.tags.includes("setback")
}

export function isCurrent(event: HealthEvent): boolean {
  return event.tags.includes("current")
}
