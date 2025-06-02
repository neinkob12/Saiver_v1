import type { TokenCost } from "@/types/chat"

// Pricing constants
export const GROQ_COST_PER_1K_TOKENS = 0.0002 // $0.0002 per 1K tokens
export const GPT4_COST_PER_1K_TOKENS = 0.0006 // $0.0006 per 1K tokens
// Energy efficiency ratio
export const ENERGY_EFFICIENCY_RATIO = 0.65 // Groq uses ~65% of the energy compared to GPT-4

// Function to calculate cost based on tokens
export function calculateCost(completionTokens: number, promptTokens: number): TokenCost {
  const totalTokens = completionTokens + promptTokens

  // Groq pricing
  const cost = (totalTokens / 1000) * GROQ_COST_PER_1K_TOKENS

  // GPT-4 pricing
  const gptCost = (totalTokens / 1000) * GPT4_COST_PER_1K_TOKENS

  // Calculate cost savings percentage
  const savingsPercent = ((gptCost - cost) / gptCost) * 100

  // Calculate energy savings using the formula provided
  // ((Tokens used for output in Saiver/Groq * Cost per token on Groq) /
  // (Theoretical tokens used with ChatGPT4 * Cost per token on ChatGPT)) * 100
  const energySavingsPercent =
    ((totalTokens * GROQ_COST_PER_1K_TOKENS) / 1000 / ((totalTokens * GPT4_COST_PER_1K_TOKENS) / 1000)) *
    100 *
    ENERGY_EFFICIENCY_RATIO

  return {
    tokens: totalTokens,
    promptTokens,
    completionTokens,
    cost,
    gptCost,
    savingsPercent,
    energySavingsPercent: 100 - energySavingsPercent, // Convert to savings percentage
  }
}

// Function to estimate tokens from text (fallback if API doesn't provide usage)
export function estimateTokens(text: string): number {
  // GPT models use ~4 chars per token on average
  return Math.ceil(text.length / 4)
}
