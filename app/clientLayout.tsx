"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutGrid, Settings, Users, Leaf, BarChart2, BookOpen, FileText } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { SettingsProvider } from "@/contexts/settings-context"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleNewChat = () => {
    // Navigate to the home page which will reset the chat
    router.push("/")
    // Force a refresh to ensure the chat state is reset
    window.location.href = "/"
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <SettingsProvider>
      <ThemeProvider>
        <div className="flex h-screen bg-background">
          {/* Sidebar - Fixed position */}
          <div className="w-64 border-r bg-emerald-50 dark:bg-emerald-950/30 fixed h-full z-10">
            <div className="p-4 border-b">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="h-6 w-6 rounded-full bg-emerald-600 flex items-center justify-center">
                  <Leaf className="h-3 w-3 text-white" />
                </div>
                <span className="font-semibold text-emerald-800 dark:text-emerald-300">Saiver</span>
              </Link>
            </div>
            <div className="h-[calc(100vh-64px)] flex flex-col">
              <ScrollArea className="flex-1">
                <div className="space-y-4 p-4">
                  <nav className="space-y-2">
                    <Link href="/" passHref>
                      <Button
                        variant={isActive("/") ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          isActive("/")
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                        }`}
                      >
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link href="/resources" passHref>
                      <Button
                        variant={isActive("/resources") ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          isActive("/resources")
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                        }`}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Resources
                      </Button>
                    </Link>
                    <Link href="/eco-topics" passHref>
                      <Button
                        variant={isActive("/eco-topics") ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          isActive("/eco-topics")
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                        }`}
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Eco Topics
                      </Button>
                    </Link>
                    <Link href="/community" passHref>
                      <Button
                        variant={isActive("/community") ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          isActive("/community")
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                        }`}
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Community
                      </Button>
                    </Link>
                    <Link href="/analytics" passHref>
                      <Button
                        variant={isActive("/analytics") ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          isActive("/analytics")
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                        }`}
                      >
                        <BarChart2 className="mr-2 h-4 w-4" />
                        Analytics
                      </Button>
                    </Link>
                    <Link href="/settings" passHref>
                      <Button
                        variant={isActive("/settings") ? "default" : "ghost"}
                        className={`w-full justify-start ${
                          isActive("/settings")
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                        }`}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                    </Link>
                  </nav>
                </div>
              </ScrollArea>

              {/* Fixed bottom section */}
              <div className="p-4 border-t border-emerald-200 dark:border-emerald-800">
                <Button
                  variant="outline"
                  className="w-full justify-start text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                  onClick={handleNewChat}
                >
                  <Leaf className="mr-2 h-4 w-4" />
                  New Chat
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content - With left margin to account for fixed sidebar */}
          <div className="flex-1 flex flex-col ml-64">
            {/* Header */}
            <header className="h-14 border-b border-emerald-200 dark:border-emerald-800 px-4 flex items-center justify-between bg-emerald-50/50 dark:bg-emerald-950/20">
              <h1 className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                Saiver - Eco-Friendly AI Assistant
              </h1>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                  onClick={handleNewChat}
                >
                  New Chat
                </Button>
              </div>
            </header>
            {children}
          </div>
        </div>
      </ThemeProvider>
    </SettingsProvider>
  )
}
