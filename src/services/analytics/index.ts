/**
 * Privacy-conscious analytics abstraction.
 *
 * Do not collect sensitive health data as analytics metadata unnecessarily.
 * Only product-level events (not health content) are tracked.
 */

import type { AnalyticsAdapter, AnalyticsEvent } from "@/types"

class MockAnalytics implements AnalyticsAdapter {
  track(event: AnalyticsEvent, properties?: Record<string, unknown>): void {
    // TODO: Integrate with a privacy-conscious analytics provider.
    // Only pass non-sensitive metadata (counts, screen names, durations).
    // Never pass symptom text, lab values, medication names, or diagnoses.
    if (import.meta.env.DEV) {
      console.debug(`[analytics] ${event}`, properties ?? {})
    }
  }
}

export const analytics: AnalyticsAdapter = new MockAnalytics()
