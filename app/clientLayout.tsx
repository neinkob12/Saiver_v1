"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutGrid, Settings, Users, Leaf, BarChart2, BookOpen, FileText, Menu, X } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { SettingsProvider } from "@/contexts/settings-context"
import { useState, useEffect } from "react"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // Auto-close sidebar on mobile when window resizes to desktop
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      document.body.classList.add("mobile-menu-open")
      document.body.style.overflow = "hidden"
    } else {
      document.body.classList.remove("mobile-menu-open")
      document.body.style.overflow = "unset"
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove("mobile-menu-open")
      document.body.style.overflow = "unset"
    }
  }, [isMobile, isSidebarOpen])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleNewChat = () => {
    // Navigate to the home page which will reset the chat
    router.push("/")
    // Force a refresh to ensure the chat state is reset
    window.location.href = "/"
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleNavClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }

  return (
    <SettingsProvider>
      <ThemeProvider>
        <div className="flex h-screen bg-background">
          {/* Mobile Overlay */}
          {isMobile && isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`
            w-64 border-r bg-emerald-50 dark:bg-emerald-950/30 
            fixed h-full z-30 transition-transform duration-300 ease-in-out
            ${isMobile ? (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
            md:relative md:translate-x-0
          `}
          >
            <div className="p-4 border-b flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="h-6 w-6 rounded-full bg-emerald-600 flex items-center justify-center">
                  <Leaf className="h-3 w-3 text-white" />
                </div>
                <span className="font-semibold text-emerald-800 dark:text-emerald-300">Saiver</span>
              </Link>
              {/* Mobile Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 h-8 w-8"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close navigation"
              >
                <X className="h-4 w-4" />
              </Button>
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
                        onClick={handleNavClick}
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
                        onClick={handleNavClick}
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
                        onClick={handleNavClick}
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
                        onClick={handleNavClick}
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
                        onClick={handleNavClick}
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
                        onClick={handleNavClick}
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

          {/* Main Content */}
          <div
            className={`
            flex-1 flex flex-col transition-all duration-300 ease-in-out
            ${isMobile ? "ml-0" : "ml-64"}
            md:ml-64
          `}
          >
            {/* Header */}
            <header className="h-14 border-b border-emerald-200 dark:border-emerald-800 px-4 flex items-center justify-between bg-emerald-50/50 dark:bg-emerald-950/20">
              <div className="flex items-center gap-3">
                {/* Mobile Menu Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                  onClick={toggleSidebar}
                  aria-label={isSidebarOpen ? "Close navigation" : "Open navigation"}
                >
                  {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
                <h1 className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
                  Saiver - Eco-Friendly AI Assistant
                </h1>
              </div>
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
