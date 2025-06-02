import type React from "react"
import ClientLayout from "./clientLayout"
import "./globals.css"

export const metadata = {
  title: "Saiver - Eco-Friendly AI Assistant",
  description: "An eco-friendly AI assistant powered by Groq",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
