/**
 * Wearable data provider abstraction.
 *
 * Future providers: Apple HealthKit, Google Health Connect, Garmin, Fitbit, Oura, WHOOP.
 * Not all providers expose the same data — the abstraction handles capability differences.
 *
 * TODO: Implement actual provider integrations in a future phase.
 */

import type { HealthDataProvider, WearableProvider, WearableDataPoint } from "@/types"

export const WEARABLE_PROVIDERS: HealthDataProvider[] = [
  { id: "apple_health", label: "Apple HealthKit", available: false },
  { id: "google_health_connect", label: "Google Health Connect", available: false },
  { id: "garmin", label: "Garmin", available: false },
  { id: "fitbit", label: "Fitbit", available: false },
  { id: "oura", label: "Oura", available: false },
  { id: "whoop", label: "WHOOP", available: false },
]

export interface WearableAdapter {
  isAvailable(): boolean
  connect(): Promise<boolean>
  getDataPoints(types: string[]): Promise<WearableDataPoint[]>
}

export class MockWearableAdapter implements WearableAdapter {
  isAvailable(): boolean {
    return false
  }

  async connect(): Promise<boolean> {
    return false
  }

  async getDataPoints(_types: string[]): Promise<WearableDataPoint[]> {
    return []
  }
}

export function getWearableProvider(id: WearableProvider): HealthDataProvider | undefined {
  return WEARABLE_PROVIDERS.find(p => p.id === id)
}
