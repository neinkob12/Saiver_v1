export interface Usage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

export interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  createdAt?: Date
  usage?: Usage
}

export interface TokenCost {
  tokens: number
  promptTokens: number
  completionTokens: number
  cost: number
  gptCost: number
  savingsPercent: number
  energySavingsPercent: number
}
