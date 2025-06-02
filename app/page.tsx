"use client"

import { useEffect, useState } from "react"
import ChatInterface from "./chat-interface"

export default function Page() {
  const [apiKeyStatus, setApiKeyStatus] = useState<"checking" | "valid" | "missing">("checking")

  useEffect(() => {
    // Check if the API key is missing by making a test request
    const checkApiKey = async () => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [], // Empty array for testing
          }),
        })

        const data = await response.json()

        if (data.error && data.error.includes("API key")) {
          setApiKeyStatus("missing")
        } else if (data.success || response.ok) {
          setApiKeyStatus("valid")
        } else {
          setApiKeyStatus("valid") // Assume valid if no API key error
        }
      } catch (error) {
        console.error("Error checking API key:", error)
        setApiKeyStatus("valid") // Default to valid to allow the chat interface to load
      }
    }

    checkApiKey()
  }, [])

  if (apiKeyStatus === "checking") {
    return (
      <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-950">
        <div className="text-center">
          <div className="h-8 w-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-600 dark:text-emerald-400">Checking API configuration...</p>
        </div>
      </div>
    )
  }

  if (apiKeyStatus === "missing") {
    return <ApiKeyMissingComponent />
  }

  return <ChatInterface />
}

function ApiKeyMissingComponent() {
  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-950">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-red-600 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Groq API Key Missing</h2>
          </div>

          <p className="text-gray-600 dark:text-gray-300 mb-6">
            To use Saiver, you need to configure your Groq API key. The chatbot uses Groq's AI models to generate
            responses.
          </p>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-4 mb-6">
            <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">How to set up your Groq API key:</h3>
            <ol className="list-decimal pl-5 space-y-2 text-amber-700 dark:text-amber-300">
              <li>
                Sign up for an account at{" "}
                <a href="https://console.groq.com" className="underline" target="_blank" rel="noopener noreferrer">
                  console.groq.com
                </a>
              </li>
              <li>Generate an API key from your Groq dashboard</li>
              <li>
                Add the API key to your environment variables as{" "}
                <code className="bg-amber-100 dark:bg-amber-900/50 px-1 py-0.5 rounded">GROQ_API_KEY</code>
              </li>
              <li>Restart your application</li>
            </ol>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700 rounded-md p-4">
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">For Vercel deployment:</h3>
            <ol className="list-decimal pl-5 space-y-1 text-gray-600 dark:text-gray-300">
              <li>Go to your Vercel project dashboard</li>
              <li>Navigate to Settings → Environment Variables</li>
              <li>
                Add a new variable with the name{" "}
                <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">GROQ_API_KEY</code> and your API key
                as the value
              </li>
              <li>Redeploy your application</li>
            </ol>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    </div>
  )
}
