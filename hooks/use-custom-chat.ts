"use client"

import type React from "react"
import { useState, useCallback } from "react"
import type { Message } from "@/types/chat"
import { sendChatMessage } from "@/app/actions/chat"

// Simple ID generator function
function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function useCustomChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!input.trim() || isLoading) return

      try {
        setIsLoading(true)
        setError(null)

        // Create a new user message
        const userMessage: Message = {
          id: generateId(),
          role: "user",
          content: input,
          createdAt: new Date(),
        }

        // Add the user message to the messages array
        const updatedMessages = [...messages, userMessage]
        setMessages(updatedMessages)
        setInput("")

        // Send the message to the server
        const { message, error: responseError } = await sendChatMessage(updatedMessages)

        if (responseError) {
          setError(responseError)
          return
        }

        // Add the assistant message to the messages array
        setMessages((prev) => [...prev, message])
      } catch (err) {
        console.error("Error submitting message:", err)
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    },
    [input, isLoading, messages],
  )

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setMessages,
    setError,
  }
}
