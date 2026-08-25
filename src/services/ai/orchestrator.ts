/**
 * AI Orchestrator — abstraction over AI providers and specialized modules.
 *
 * The orchestrator determines which specialized AI capability should handle
 * a request. Business rules live in the domain layer, NOT in AI output.
 *
 * IMPORTANT: This is a mock implementation. No real AI provider is called.
 * Do not send sensitive health data from the mobile client to an AI provider.
 * Future production architecture should use a secure backend proxy.
 */

import type {
  AIProvider,
  AIProviderId,
  AIRequest,
  AIResponse,
  AISpecialty,
} from "@/types"

export const AI_PROVIDERS: AIProvider[] = [
  { id: "mock", label: "Demo (Mock)", available: true },
  { id: "openai", label: "OpenAI", available: false },
  { id: "gemini", label: "Gemini", available: false },
  { id: "anthropic", label: "Anthropic", available: false },
]

const SPECIALTY_LABELS: Record<AISpecialty, string> = {
  lab_intelligence: "Lab Intelligence",
  health_navigator: "Health Navigator",
  wellness_companion: "Wellness Companion",
  fitness_coach: "Fitness Coach",
}

export class AIOrchestrator {
  private activeProvider: AIProviderId = "mock"

  setProvider(id: AIProviderId): void {
    this.activeProvider = id
  }

  getProvider(): AIProviderId {
    return this.activeProvider
  }

  async generate(request: AIRequest): Promise<AIResponse> {
    // TODO: In production, this calls a secure backend that:
    // 1. Validates the safety state
    // 2. Constructs a context-aware prompt
    // 3. Calls the configured AI provider
    // 4. Validates the output
    // 5. Returns the response
    //
    // For now, return a demo response based on specialty.
    return this.mockResponse(request)
  }

  private async mockResponse(request: AIRequest): Promise<AIResponse> {
    const content = this.getDemoContent(request.specialty, request.userInput)
    return {
      content,
      specialty: request.specialty,
      provider: this.activeProvider,
      isDemo: true,
    }
  }

  private getDemoContent(specialty: AISpecialty, userInput: string): string {
    switch (specialty) {
      case "wellness_companion":
        return `I hear you. Based on your recent data, your energy has been a bit lower than usual this week. Remember the progress you've made — 7 kg lighter and exercising 4 times a week compared to once when you started. What would feel most helpful right now?`
      case "lab_intelligence":
        return `Your latest results show improvement in 4 of 6 markers. Vitamin D is now in normal range, and HbA1c has improved. One marker (Ferritin) is borderline — discuss with your doctor whether iron supplementation is appropriate.`
      case "health_navigator":
        return `Based on your reported symptoms, the Safety Engine has assessed this as Level ${request_safetyLevel}. ${userInput ? `You mentioned: "${userInput}". ` : ""}Consider discussing these symptoms with your primary care physician. Bring a list of your symptoms, their duration, and any patterns you've noticed.`
      case "fitness_coach":
        return `Given your slightly shorter sleep and mild fatigue today, I'd suggest reducing intensity by 15-20%. You can still do your Lower Body session, but focus on form. A 30-minute walk would also keep your streak alive.`
      default:
        return "Demo response — not AI-generated."
    }
  }
}

// Helper for health_navigator demo content
let request_safetyLevel = 0
export function setNavigatorSafetyLevel(level: number): void {
  request_safetyLevel = level
}

export function getSpecialtyLabel(specialty: AISpecialty): string {
  return SPECIALTY_LABELS[specialty]
}

export const aiOrchestrator = new AIOrchestrator()
