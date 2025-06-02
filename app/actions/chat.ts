"use server"

import type { Message, Usage } from "@/types/chat"

// Simple ID generator function
function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Pricing constants
const GROQ_COST_PER_1K_TOKENS = 0.0002 // $0.0002 per 1K tokens
const GPT4_COST_PER_1K_TOKENS = 0.0006 // $0.0006 per 1K tokens

// System prompt that encourages markdown formatting
const SYSTEM_PROMPT = `You are Saiver, an eco-friendly AI assistant. You help users with questions about sustainability, environmental topics, and general knowledge.

When responding, please use markdown formatting to enhance readability:
- Use **bold text** for emphasis on key phrases or important information
- Use *italic text* for highlighting specific terms, definitions, or examples
- Use \`inline code\` for short code snippets or technical terms
- Use code blocks with language specification for longer code examples
- Use bullet points or numbered lists to organize information
- Convert URLs into clickable links using [text](url) format
- Use headers (##, ###) to structure longer responses
- Use > for quotes or important callouts

Always provide clear, well-structured responses that are easy to read and understand.`

export async function sendChatMessage(messages: Message[]): Promise<{ message: Message; error?: string }> {
  try {
    // Check if the Groq API key is configured
    if (!process.env.GROQ_API_KEY) {
      throw new Error("Groq API key is not configured. Please add your GROQ_API_KEY to the environment variables.")
    }

    // Format messages for the API, adding the system prompt
    const apiMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.map(({ role, content }) => ({ role, content })),
    ]

    // Make a direct API call to Groq
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error?.message || `API request failed with status ${response.status}`)
    }

    const data = await response.json()

    // Extract the response content and usage data
    const content = data.choices[0]?.message?.content || ""
    const usage: Usage = {
      prompt_tokens: data.usage?.prompt_tokens || 0,
      completion_tokens: data.usage?.completion_tokens || 0,
      total_tokens: data.usage?.total_tokens || 0,
    }

    // Create a new message with the response and usage data
    const newMessage: Message = {
      id: generateId(),
      role: "assistant",
      content,
      createdAt: new Date(),
      usage,
    }

    return { message: newMessage }
  } catch (error) {
    console.error("Error in chat action:", error)
    let errorMessage = "Failed to process chat request"

    if (error instanceof Error) {
      errorMessage = error.message
    }

    return {
      message: {
        id: generateId(),
        role: "assistant",
        content: "",
        createdAt: new Date(),
      },
      error: errorMessage,
    }
  }
}
