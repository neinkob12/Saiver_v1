"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Download, TrendingUp, TrendingDown, Zap, ThumbsUp, BarChart2, PieChartIcon } from "lucide-react"

// Sample data for charts
const usageData = [
  { name: "Jan", conversations: 45, messages: 320, tokens: 64000 },
  { name: "Feb", conversations: 52, messages: 380, tokens: 76000 },
  { name: "Mar", conversations: 61, messages: 450, tokens: 90000 },
  { name: "Apr", conversations: 58, messages: 420, tokens: 84000 },
  { name: "May", conversations: 65, messages: 480, tokens: 96000 },
  { name: "Jun", conversations: 75, messages: 550, tokens: 110000 },
  { name: "Jul", conversations: 90, messages: 650, tokens: 130000 },
]

const topicData = [
  { name: "Climate Action", value: 35 },
  { name: "Renewable Energy", value: 25 },
  { name: "Sustainable Living", value: 20 },
  { name: "Conservation", value: 15 },
  { name: "Other", value: 5 },
]

const feedbackData = [
  { name: "Helpful", value: 78 },
  { name: "Needs Improvement", value: 22 },
]

const costComparisonData = [
  { name: "Groq (Llama3-70B)", cost: 0.7 },
  { name: "OpenAI (GPT-4)", cost: 1.0 },
  { name: "Anthropic (Claude)", cost: 0.85 },
]

const COLORS = ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#d1fae5"]
const FEEDBACK_COLORS = ["#10b981", "#f87171"]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="flex-1 bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-950">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-300 mb-2">Analytics</h1>
            <p className="text-emerald-600 dark:text-emerald-400">
              Track usage, performance, and cost metrics for your AI assistant
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-emerald-200 dark:border-emerald-800 rounded-md overflow-hidden">
              <Button
                variant={timeRange === "7d" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange("7d")}
                className={
                  timeRange === "7d"
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white rounded-none"
                    : "text-emerald-700 dark:text-emerald-300 rounded-none"
                }
              >
                7D
              </Button>
              <Button
                variant={timeRange === "30d" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange("30d")}
                className={
                  timeRange === "30d"
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white rounded-none"
                    : "text-emerald-700 dark:text-emerald-300 rounded-none"
                }
              >
                30D
              </Button>
              <Button
                variant={timeRange === "90d" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange("90d")}
                className={
                  timeRange === "90d"
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white rounded-none"
                    : "text-emerald-700 dark:text-emerald-300 rounded-none"
                }
              >
                90D
              </Button>
              <Button
                variant={timeRange === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange("all")}
                className={
                  timeRange === "all"
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white rounded-none"
                    : "text-emerald-700 dark:text-emerald-300 rounded-none"
                }
              >
                All
              </Button>
            </div>
            <Button variant="outline" size="sm" className="text-emerald-700 dark:text-emerald-300">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-emerald-200 dark:border-emerald-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Conversations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">446</div>
                <div className="flex items-center text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">+12.5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-emerald-200 dark:border-emerald-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">3,250</div>
                <div className="flex items-center text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">+18.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-emerald-200 dark:border-emerald-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">650K</div>
                <div className="flex items-center text-emerald-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">+15.7%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-emerald-200 dark:border-emerald-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">1.2s</div>
                <div className="flex items-center text-green-600">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  <span className="text-xs">-8.3%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="usage" className="w-full">
          <TabsList className="mb-6 bg-emerald-100 dark:bg-emerald-900/30">
            <TabsTrigger value="usage" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              Usage
            </TabsTrigger>
            <TabsTrigger value="topics" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              Topics
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-2">
              <ThumbsUp className="h-4 w-4" />
              Feedback
            </TabsTrigger>
            <TabsTrigger value="cost" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Cost Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="usage">
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="text-emerald-800 dark:text-emerald-300">Usage Metrics</CardTitle>
                <CardDescription>Track conversations, messages, and token usage over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={usageData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                      <XAxis dataKey="name" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderColor: "#d1d5db",
                          borderRadius: "0.375rem",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="conversations"
                        stroke="#10b981"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                      <Line type="monotone" dataKey="messages" stroke="#6ee7b7" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="topics">
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="text-emerald-800 dark:text-emerald-300">Conversation Topics</CardTitle>
                <CardDescription>Distribution of conversation topics and categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={topicData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {topicData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderColor: "#d1d5db",
                          borderRadius: "0.375rem",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <CardTitle className="text-emerald-800 dark:text-emerald-300">User Feedback</CardTitle>
                  <CardDescription>Analysis of thumbs up/down feedback from users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={feedbackData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {feedbackData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={FEEDBACK_COLORS[index % FEEDBACK_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            borderColor: "#d1d5db",
                            borderRadius: "0.375rem",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <CardTitle className="text-emerald-800 dark:text-emerald-300">Feedback Metrics</CardTitle>
                  <CardDescription>Key metrics related to user satisfaction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-muted-foreground">Satisfaction Rate</div>
                        <div className="text-sm font-medium text-emerald-800 dark:text-emerald-300">78%</div>
                      </div>
                      <div className="h-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-muted-foreground">Response Accuracy</div>
                        <div className="text-sm font-medium text-emerald-800 dark:text-emerald-300">85%</div>
                      </div>
                      <div className="h-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-muted-foreground">Helpfulness Score</div>
                        <div className="text-sm font-medium text-emerald-800 dark:text-emerald-300">92%</div>
                      </div>
                      <div className="h-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium text-muted-foreground">Repeat Usage</div>
                        <div className="text-sm font-medium text-emerald-800 dark:text-emerald-300">73%</div>
                      </div>
                      <div className="h-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: "73%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cost">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <CardTitle className="text-emerald-800 dark:text-emerald-300">Cost Comparison</CardTitle>
                  <CardDescription>Compare Groq costs with other LLM providers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={costComparisonData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            borderColor: "#d1d5db",
                            borderRadius: "0.375rem",
                          }}
                          formatter={(value) => [`$${value}`, "Relative Cost"]}
                        />
                        <Bar dataKey="cost" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-200 dark:border-emerald-800">
                <CardHeader>
                  <CardTitle className="text-emerald-800 dark:text-emerald-300">Cost Metrics</CardTitle>
                  <CardDescription>Key metrics related to token usage and costs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                          <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Total Cost This Month</div>
                          <div className="text-xl font-bold text-emerald-800 dark:text-emerald-300">$12.85</div>
                        </div>
                      </div>
                      <Badge className="bg-emerald-600 text-white">-30% vs GPT-4</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <div className="text-sm font-medium text-muted-foreground mb-1">Avg. Cost per Conversation</div>
                        <div className="text-lg font-bold text-emerald-800 dark:text-emerald-300">$0.029</div>
                        <div className="text-xs text-emerald-600">-25% vs GPT-4</div>
                      </div>
                      <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <div className="text-sm font-medium text-muted-foreground mb-1">Avg. Cost per 1K Tokens</div>
                        <div className="text-lg font-bold text-emerald-800 dark:text-emerald-300">$0.0020</div>
                        <div className="text-xs text-emerald-600">-33% vs GPT-4</div>
                      </div>
                      <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <div className="text-sm font-medium text-muted-foreground mb-1">Total Tokens This Month</div>
                        <div className="text-lg font-bold text-emerald-800 dark:text-emerald-300">6.4M</div>
                        <div className="text-xs text-emerald-600">+18% vs Last Month</div>
                      </div>
                      <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <div className="text-sm font-medium text-muted-foreground mb-1">Projected Monthly Cost</div>
                        <div className="text-lg font-bold text-emerald-800 dark:text-emerald-300">$15.20</div>
                        <div className="text-xs text-emerald-600">+18% vs Last Month</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
