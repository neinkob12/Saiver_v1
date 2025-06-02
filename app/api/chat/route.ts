export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Check if the Groq API key is configured
    if (!process.env.GROQ_API_KEY) {
      console.error("Groq API key is not configured")
      return new Response(
        JSON.stringify({
          error: "Groq API key is not configured. Please add your GROQ_API_KEY to the environment variables.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // Handle empty messages array (for API key testing)
    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "API key is configured correctly",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    // For the API route, we'll just return a success message
    // The actual chat functionality is handled by the server action
    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    )
  } catch (error) {
    console.error("Error in chat route:", error)

    // Determine the type of error for better error messages
    let errorMessage = "Failed to process chat request"
    let statusCode = 500

    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        errorMessage = "Invalid API key or authentication error"
        statusCode = 401
      } else if (error.message.includes("rate limit")) {
        errorMessage = "Rate limit exceeded. Please try again later"
        statusCode = 429
      } else if (error.message.includes("timeout")) {
        errorMessage = "Request timed out. Please try again"
        statusCode = 408
      } else if (error.message.includes("empty")) {
        errorMessage = "Invalid request: messages cannot be empty"
        statusCode = 400
      }
    }

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    })
  }
}
