"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type SettingsContextType = {
  enterToSend: boolean
  setEnterToSend: (value: boolean) => void
  theme: "light" | "dark" | "system"
  setTheme: (theme: "light" | "dark" | "system") => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  // Initialize with default values
  const [enterToSend, setEnterToSend] = useState(true)
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")

  // Load settings from localStorage on mount
  useEffect(() => {
    const storedEnterToSend = localStorage.getItem("enterToSend")
    if (storedEnterToSend !== null) {
      setEnterToSend(storedEnterToSend === "true")
    }

    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("enterToSend", String(enterToSend))
  }, [enterToSend])

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <SettingsContext.Provider value={{ enterToSend, setEnterToSend, theme, setTheme }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
