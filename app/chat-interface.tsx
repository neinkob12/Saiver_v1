"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Copy, Download, ThumbsUp, ThumbsDown, Send, Leaf, AlertCircle, Zap, BarChart2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Progress } from "@/components/ui/progress"
import { useCustomChat } from "@/hooks/use-custom-chat"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { useSettings } from "@/contexts/settings-context"
import type { TokenCost } from "@/types/chat"

interface FeedbackState {
  [messageId: string]: "like" | "dislike" | null
}

// Pricing constants
const GROQ_COST_PER_1K_TOKENS = 0.0002 // $0.0002 per 1K tokens
const GPT4_COST_PER_1K_TOKENS = 0.0006 // $0.0006 per 1K tokens
// Energy efficiency ratio
const ENERGY_EFFICIENCY_RATIO = 0.65 // Groq uses ~65% of the energy compared to GPT-4

// Function to calculate cost based on tokens
const calculateCost = (completionTokens: number, promptTokens: number): TokenCost => {
  const tokens = completionTokens
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
    tokens,
    promptTokens,
    completionTokens,
    cost,
    gptCost,
    savingsPercent,
    energySavingsPercent: 100 - energySavingsPercent, // Convert to savings percentage
  }
}

export default function ChatInterface() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error: chatError,
    setError,
    setMessages,
  } = useCustomChat()

  const { enterToSend } = useSettings()

  const [feedback, setFeedback] = useState<FeedbackState>({})
  const [tokenCosts, setTokenCosts] = useState<{ [messageId: string]: TokenCost }>({})
  const [showTokenDetails, setShowTokenDetails] = useState<{ [messageId: string]: boolean }>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    const adjustHeight = () => {
      textarea.style.height = "auto"
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
    }

    adjustHeight()
  }, [input])

  // Calculate token costs when messages change
  useEffect(() => {
    const newTokenCosts = { ...tokenCosts }

    messages.forEach((message) => {
      if (message.role === "assistant" && !tokenCosts[message.id] && message.usage) {
        // Use actual token usage data from the API
        const completionTokens = message.usage.completion_tokens
        const promptTokens = message.usage.prompt_tokens

        newTokenCosts[message.id] = calculateCost(completionTokens, promptTokens)
      }
    })

    setTokenCosts(newTokenCosts)
  }, [messages])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Only use Enter to send if the setting is enabled
    if (e.key === "Enter" && !e.shiftKey && enterToSend) {
      e.preventDefault()
      if (input.trim() && !isLoading) {
        handleSubmit(e as any)
      }
    }
  }

  const handleFeedback = (messageId: string, type: "like" | "dislike") => {
    setFeedback((prev) => {
      // If already selected this type, remove it
      if (prev[messageId] === type) {
        const newFeedback = { ...prev }
        newFeedback[messageId] = null
        return newFeedback
      }
      // Otherwise set to this type
      return { ...prev, [messageId]: type }
    })

    toast({
      description:
        type === "like"
          ? "Thank you for your positive feedback!"
          : "We appreciate your feedback and will work to improve.",
      duration: 3000,
    })
  }

  const toggleTokenDetails = (messageId: string) => {
    setShowTokenDetails((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      description: "Message copied to clipboard",
      duration: 3000,
    })
  }

  const downloadConversation = () => {
    const conversationText = messages.map((m) => `${m.role === "user" ? "You" : "Saiver"}: ${m.content}`).join("\n\n")

    const blob = new Blob([conversationText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `saiver-conversation-${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      description: "Conversation downloaded successfully",
      duration: 3000,
    })
  }

  const startNewChat = () => {
    setMessages([])
    setError(null) // Clear any existing errors
    toast({
      description: "Started a new conversation",
      duration: 3000,
    })
  }

  // Function to set example questions properly
  const setExampleQuestion = (question: string) => {
    // Clear any existing errors
    setError(null)
    // Update the input state
    handleInputChange({
      target: { value: question },
    } as React.ChangeEvent<HTMLTextAreaElement>)
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-950">
      <ScrollArea className="flex-1 p-4 md:p-6">
        <div className="space-y-6 max-w-3xl mx-auto">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-4">
                <Leaf className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mb-2">Welcome to Saiver</h2>
              <p className="text-emerald-600 dark:text-emerald-400 max-w-md mb-8">
                Your eco-friendly AI assistant powered by Groq's Llama3-70B model. Ask me anything about sustainability,
                environmental topics, or any other questions you have.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <div
                  onClick={() => setExampleQuestion("What are the most endangered species in 2025?")}
                  className="p-3 border border-emerald-200 dark:border-emerald-800 rounded-lg cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                >
                  <h3 className="font-medium text-emerald-800 dark:text-emerald-300">Endangered Species</h3>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                    What are the most endangered species in 2025?
                  </p>
                </div>

                <div
                  onClick={() => setExampleQuestion("How can I reduce my carbon footprint?")}
                  className="p-3 border border-emerald-200 dark:border-emerald-800 rounded-lg cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                >
                  <h3 className="font-medium text-emerald-800 dark:text-emerald-300">Carbon Footprint</h3>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                    How can I reduce my carbon footprint?
                  </p>
                </div>

                <div
                  onClick={() => setExampleQuestion("What are the latest renewable energy technologies?")}
                  className="p-3 border border-emerald-200 dark:border-emerald-800 rounded-lg cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                >
                  <h3 className="font-medium text-emerald-800 dark:text-emerald-300">Renewable Energy</h3>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                    What are the latest renewable energy technologies?
                  </p>
                </div>

                <div
                  onClick={() => setExampleQuestion("Explain sustainable agriculture practices.")}
                  className="p-3 border border-emerald-200 dark:border-emerald-800 rounded-lg cursor-pointer hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                >
                  <h3 className="font-medium text-emerald-800 dark:text-emerald-300">Sustainable Agriculture</h3>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                    Explain sustainable agriculture practices.
                  </p>
                </div>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={cn("flex gap-3 max-w-[90%]", message.role === "user" ? "ml-auto flex-row-reverse" : "")}
            >
              {message.role !== "user" ? (
                <div className="h-8 w-8 rounded-full bg-emerald-600 dark:bg-emerald-700 flex-shrink-0 flex items-center justify-center self-start mt-1.5">
                  <Leaf className="h-4 w-4 text-white" />
                </div>
              ) : (
                <div className="h-8 w-8 rounded-full bg-emerald-200 dark:bg-emerald-800 flex-shrink-0 flex items-center justify-center self-start mt-1.5">
                  <span className="text-xs font-medium text-emerald-800 dark:text-emerald-200">GG</span>
                </div>
              )}
              <div className="space-y-2">
                <div
                  className={cn(
                    "p-4 rounded-lg",
                    message.role === "user"
                      ? "bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-50"
                      : "bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-800 shadow-sm",
                  )}
                >
                  {message.role === "user" ? (
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  ) : (
                    <MarkdownRenderer content={message.content} />
                  )}

                  {/* Token cost display for assistant messages */}
                  {message.role === "assistant" && message.usage && tokenCosts[message.id] && (
                    <div className="mt-3 pt-2 border-t border-emerald-100 dark:border-emerald-800/50">
                      <div className="flex items-center justify-between mb-1">
                        <button
                          onClick={() => toggleTokenDetails(message.id)}
                          className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                        >
                          <Zap className="h-3 w-3" />
                          <span>Energy savings details {showTokenDetails[message.id] ? "(hide)" : "(show)"}</span>
                        </button>
                      </div>

                      {/* Energy savings visualization */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-emerald-600 dark:text-emerald-400 min-w-[90px]">Energy savings:</span>
                        <div className="flex-1">
                          <Progress
                            value={tokenCosts[message.id].energySavingsPercent}
                            className="h-2 bg-emerald-100 dark:bg-emerald-900/30"
                          />
                        </div>
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          {tokenCosts[message.id].energySavingsPercent.toFixed(0)}%
                        </span>
                      </div>

                      {/* Detailed token information */}
                      {showTokenDetails[message.id] && (
                        <div className="mt-2 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-md text-xs space-y-1">
                          <div className="flex justify-between">
                            <span className="text-emerald-700 dark:text-emerald-300">Prompt tokens:</span>
                            <span className="font-medium">{message.usage.prompt_tokens}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-emerald-700 dark:text-emerald-300">Completion tokens:</span>
                            <span className="font-medium">{message.usage.completion_tokens}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-emerald-700 dark:text-emerald-300">Total tokens:</span>
                            <span className="font-medium">{message.usage.total_tokens}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-emerald-700 dark:text-emerald-300">Groq cost:</span>
                            <span className="font-medium">${tokenCosts[message.id].cost.toFixed(5)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-emerald-700 dark:text-emerald-300">GPT-4 cost:</span>
                            <span className="font-medium">${tokenCosts[message.id].gptCost.toFixed(5)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-emerald-700 dark:text-emerald-300">Cost savings:</span>
                            <span className="font-medium text-green-600 dark:text-green-400">
                              ${(tokenCosts[message.id].gptCost - tokenCosts[message.id].cost).toFixed(5)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-emerald-700 dark:text-emerald-300">Cost efficiency:</span>
                            <span className="font-medium text-green-600 dark:text-green-400">
                              {tokenCosts[message.id].savingsPercent.toFixed(0)}% cheaper than GPT-4
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-emerald-700 dark:text-emerald-300">Energy efficiency:</span>
                            <span className="font-medium text-green-600 dark:text-green-400">
                              {tokenCosts[message.id].energySavingsPercent.toFixed(0)}% less energy than GPT-4
                            </span>
                          </div>
                          <div className="mt-1 pt-1 border-t border-emerald-200 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400 italic">
                            Based on actual token usage from Groq API
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {message.role !== "user" && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                      onClick={() => copyToClipboard(message.content)}
                      aria-label="Copy message"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                      onClick={downloadConversation}
                      aria-label="Download conversation"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={feedback[message.id] === "like" ? "secondary" : "ghost"}
                      size="icon"
                      className={cn(
                        "h-8 w-8",
                        feedback[message.id] === "like"
                          ? "bg-emerald-200 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300"
                          : "text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30",
                      )}
                      onClick={() => handleFeedback(message.id, "like")}
                      aria-label="Like message"
                    >
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={feedback[message.id] === "dislike" ? "secondary" : "ghost"}
                      size="icon"
                      className={cn(
                        "h-8 w-8",
                        feedback[message.id] === "dislike"
                          ? "bg-emerald-200 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300"
                          : "text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30",
                      )}
                      onClick={() => handleFeedback(message.id, "dislike")}
                      aria-label="Dislike message"
                    >
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                      onClick={() => toggleTokenDetails(message.id)}
                      aria-label="View token details"
                    >
                      <BarChart2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      {chatError && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 p-4 rounded-md mb-4 max-w-3xl mx-auto flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-800 dark:text-red-300">Error</h3>
            <p className="text-sm">{chatError}</p>
            {chatError.includes("API key") && (
              <div className="mt-2 text-sm">
                <p className="font-medium">To fix this issue:</p>
                <ol className="list-decimal pl-5 mt-1 space-y-1">
                  <li>Make sure you've added your Groq API key to the environment variables</li>
                  <li>Restart the application after adding the API key</li>
                  <li>
                    If using Vercel, add the GROQ_API_KEY in your project settings under the Environment Variables
                    section
                  </li>
                </ol>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="p-4 md:p-6 border-t border-emerald-200 dark:border-emerald-800 bg-white dark:bg-gray-900">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!input.trim()) return

            try {
              // Clear any existing errors before submitting
              setError(null)
              handleSubmit(e)
              // Reset textarea height after submission
              if (textareaRef.current) {
                setTimeout(() => {
                  textareaRef.current!.style.height = "auto"
                }, 0)
              }
            } catch (err) {
              console.error("Error submitting form:", err)
              setError("Failed to send message. Please try again.")
            }
          }}
          className="flex gap-2 max-w-3xl mx-auto"
        >
          <Textarea
            ref={textareaRef}
            placeholder={
              enterToSend
                ? "Ask Saiver something... (Press Enter to send, Shift+Enter for new line)"
                : "Ask Saiver something..."
            }
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="min-h-[44px] max-h-[200px] border-emerald-200 dark:border-emerald-800 focus-visible:ring-emerald-500 resize-none overflow-auto"
            disabled={isLoading}
            rows={1}
          />
          <Button
            type="submit"
            className="px-4 bg-emerald-600 hover:bg-emerald-700 text-white h-auto"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Thinking...</span>
              </div>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send
              </>
            )}
          </Button>
        </form>
      </div>
      <Toaster />
    </div>
  )
}
