"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSettings } from "@/contexts/settings-context"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { enterToSend, setEnterToSend } = useSettings()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const [model, setModel] = useState("llama3-70b-8192")
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(2000)
  const [autoSave, setAutoSave] = useState(true)
  const [notifications, setNotifications] = useState(true)

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
      duration: 3000,
    })
  }

  return (
    <div className="flex-1 p-6 bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-950">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 mb-6">Settings</h1>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6 bg-emerald-100 dark:bg-emerald-900/30">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="model">Model</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Interface Settings</CardTitle>
                  <CardDescription>Configure how you interact with Saiver</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enter-to-send" className="text-base">
                        Enter to send message
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Press Enter to send your message. Use Shift+Enter for a new line.
                      </p>
                    </div>
                    <Switch id="enter-to-send" checked={enterToSend} onCheckedChange={setEnterToSend} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-save" className="text-base">
                        Auto-save conversations
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically save your conversations for future reference
                      </p>
                    </div>
                    <Switch id="auto-save" checked={autoSave} onCheckedChange={setAutoSave} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="notifications" className="text-base">
                        Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for new messages and updates
                      </p>
                    </div>
                    <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="model">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Model Settings</CardTitle>
                  <CardDescription>Configure the AI model and generation parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="model-select">Model</Label>
                    <Select value={model} onValueChange={setModel}>
                      <SelectTrigger id="model-select">
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="llama3-70b-8192">Llama 3 70B</SelectItem>
                        <SelectItem value="llama3-8b-8192">Llama 3 8B</SelectItem>
                        <SelectItem value="mixtral-8x7b-32768">Mixtral 8x7B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="temperature">Temperature: {temperature.toFixed(1)}</Label>
                    </div>
                    <Slider
                      id="temperature"
                      min={0}
                      max={1}
                      step={0.1}
                      value={[temperature]}
                      onValueChange={(value) => setTemperature(value[0])}
                    />
                    <p className="text-sm text-muted-foreground">
                      Lower values make responses more focused and deterministic. Higher values make responses more
                      creative and varied.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="max-tokens">Max Tokens: {maxTokens}</Label>
                    </div>
                    <Slider
                      id="max-tokens"
                      min={100}
                      max={4000}
                      step={100}
                      value={[maxTokens]}
                      onValueChange={(value) => setMaxTokens(value[0])}
                    />
                    <p className="text-sm text-muted-foreground">
                      Maximum number of tokens to generate in the response.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appearance">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how Saiver looks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <RadioGroup
                      value={mounted ? theme || "system" : "system"}
                      onValueChange={(value) => setTheme(value)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="light" />
                        <Label
                          htmlFor="light"
                          className={theme === "light" ? "font-semibold text-emerald-700 dark:text-emerald-300" : ""}
                        >
                          Light
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="dark" />
                        <Label
                          htmlFor="dark"
                          className={theme === "dark" ? "font-semibold text-emerald-700 dark:text-emerald-300" : ""}
                        >
                          Dark
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="system" />
                        <Label
                          htmlFor="system"
                          className={theme === "system" ? "font-semibold text-emerald-700 dark:text-emerald-300" : ""}
                        >
                          System
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="privacy">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Manage your data and privacy preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="save-history" className="text-base">
                        Save Chat History
                      </Label>
                      <p className="text-sm text-muted-foreground">Store your conversation history locally</p>
                    </div>
                    <Switch id="save-history" checked={autoSave} onCheckedChange={setAutoSave} />
                  </div>

                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                    >
                      Clear All Conversations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end">
          <Button onClick={handleSaveSettings} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Save Settings
          </Button>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
