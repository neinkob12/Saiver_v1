"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  MessageCircle,
  Heart,
  Share2,
  Calendar,
  MapPin,
  Award,
  Recycle,
  Sun,
  Droplets,
  TreePine,
  Plus,
} from "lucide-react"

interface CommunityPost {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  comments: number
  tags: string[]
  category: "tip" | "question" | "achievement" | "event"
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  attendees: number
  category: string
  icon: React.ReactNode
}

interface Challenge {
  id: string
  title: string
  description: string
  participants: number
  daysLeft: number
  difficulty: "Easy" | "Medium" | "Hard"
  points: number
  icon: React.ReactNode
}

const communityPosts: CommunityPost[] = [
  {
    id: "1",
    author: "EcoWarrior23",
    avatar: "EW",
    content:
      "Just completed my first month of zero-waste living! Started with small changes like bringing reusable bags and containers. The biggest challenge was finding package-free alternatives, but I discovered an amazing bulk store nearby. My trash output went from 2 bags per week to just half a bag! 🌱",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    tags: ["zero-waste", "lifestyle"],
    category: "achievement",
  },
  {
    id: "2",
    author: "GreenThumb_Sarah",
    avatar: "GS",
    content:
      "Quick tip: Coffee grounds make excellent fertilizer for acid-loving plants like blueberries and azaleas! I've been collecting them from my local café (they're happy to give them away) and my garden has never looked better. Plus, it keeps organic waste out of landfills. Win-win! ☕🌿",
    timestamp: "4 hours ago",
    likes: 31,
    comments: 12,
    tags: ["gardening", "composting", "tip"],
    category: "tip",
  },
  {
    id: "3",
    author: "SolarPioneer",
    avatar: "SP",
    content:
      "Question for the community: I'm considering installing solar panels on my roof. Has anyone here made the switch? What was your experience with the installation process and how long did it take to see savings on your energy bill? Any recommendations for installers? 🌞",
    timestamp: "6 hours ago",
    likes: 18,
    comments: 15,
    tags: ["solar", "energy", "question"],
    category: "question",
  },
  {
    id: "4",
    author: "CycleCommuter",
    avatar: "CC",
    content:
      "Celebrating 1 year of bike commuting! 🚴‍♀️ I've saved over $2,000 in gas and parking fees, lost 15 pounds, and reduced my carbon footprint by 2.3 tons of CO2. The best part? I actually enjoy my commute now instead of sitting in traffic. If you're thinking about it, start with one day a week!",
    timestamp: "1 day ago",
    likes: 67,
    comments: 23,
    tags: ["cycling", "commute", "health"],
    category: "achievement",
  },
]

const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "Community Garden Workday",
    description: "Join us for our monthly community garden maintenance and harvest day. All skill levels welcome!",
    date: "2025-01-25",
    location: "Riverside Community Garden",
    attendees: 23,
    category: "Gardening",
    icon: <TreePine className="h-5 w-5" />,
  },
  {
    id: "2",
    title: "Solar Panel Installation Workshop",
    description: "Learn the basics of solar panel installation and maintenance from certified professionals.",
    date: "2025-01-28",
    location: "Green Energy Center",
    attendees: 45,
    category: "Energy",
    icon: <Sun className="h-5 w-5" />,
  },
  {
    id: "3",
    title: "Zero Waste Lifestyle Meetup",
    description: "Share tips, swap products, and learn new strategies for reducing waste in daily life.",
    date: "2025-02-02",
    location: "Downtown Library",
    attendees: 32,
    category: "Lifestyle",
    icon: <Recycle className="h-5 w-5" />,
  },
  {
    id: "4",
    title: "Water Conservation Workshop",
    description: "Discover practical ways to reduce water usage at home and in your garden.",
    date: "2025-02-05",
    location: "Environmental Center",
    attendees: 28,
    category: "Conservation",
    icon: <Droplets className="h-5 w-5" />,
  },
]

const activeChallenges: Challenge[] = [
  {
    id: "1",
    title: "30-Day Plastic-Free Challenge",
    description: "Eliminate single-use plastics from your daily routine for 30 days",
    participants: 156,
    daysLeft: 12,
    difficulty: "Medium",
    points: 500,
    icon: <Recycle className="h-5 w-5" />,
  },
  {
    id: "2",
    title: "Walk/Bike Week",
    description: "Use only walking, biking, or public transport for one week",
    participants: 89,
    daysLeft: 5,
    difficulty: "Easy",
    points: 250,
    icon: <TreePine className="h-5 w-5" />,
  },
  {
    id: "3",
    title: "Energy Efficiency Audit",
    description: "Complete a comprehensive energy audit of your home",
    participants: 67,
    daysLeft: 18,
    difficulty: "Hard",
    points: 750,
    icon: <Sun className="h-5 w-5" />,
  },
]

export default function CommunityPage() {
  const [newPost, setNewPost] = useState("")
  const [selectedTab, setSelectedTab] = useState("feed")

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      // In a real app, this would submit to a backend
      console.log("New post:", newPost)
      setNewPost("")
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-950">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-300 mb-2">Community</h1>
          <p className="text-emerald-600 dark:text-emerald-400">
            Connect with fellow eco-enthusiasts, share experiences, and grow together
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="mb-6 bg-emerald-100 dark:bg-emerald-900/30">
            <TabsTrigger value="feed">Community Feed</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            {/* Create Post */}
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="text-emerald-800 dark:text-emerald-300">Share with the Community</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Share your eco-friendly tips, achievements, or ask questions..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[100px] border-emerald-200 dark:border-emerald-800"
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-emerald-700 dark:text-emerald-300">
                      💡 Tip
                    </Badge>
                    <Badge variant="outline" className="text-emerald-700 dark:text-emerald-300">
                      🏆 Achievement
                    </Badge>
                    <Badge variant="outline" className="text-emerald-700 dark:text-emerald-300">
                      ❓ Question
                    </Badge>
                  </div>
                  <Button
                    onClick={handlePostSubmit}
                    disabled={!newPost.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Community Posts */}
            <div className="space-y-4">
              {communityPosts.map((post) => (
                <Card key={post.id} className="border-emerald-200 dark:border-emerald-800">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-emerald-200 dark:bg-emerald-800 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                          {post.avatar}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-emerald-800 dark:text-emerald-300">{post.author}</span>
                          <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              post.category === "achievement"
                                ? "text-yellow-700 dark:text-yellow-300"
                                : post.category === "tip"
                                  ? "text-green-700 dark:text-green-300"
                                  : post.category === "question"
                                    ? "text-blue-700 dark:text-blue-300"
                                    : "text-emerald-700 dark:text-emerald-300"
                            }`}
                          >
                            {post.category === "achievement" && "🏆"}
                            {post.category === "tip" && "💡"}
                            {post.category === "question" && "❓"}
                            {post.category === "event" && "📅"}
                          </Badge>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">{post.content}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs text-emerald-700 dark:text-emerald-300"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="text-emerald-700 dark:text-emerald-300">
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-emerald-700 dark:text-emerald-300">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-emerald-700 dark:text-emerald-300">
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="border-emerald-200 dark:border-emerald-800">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                        {event.icon}
                      </div>
                      <Badge variant="outline" className="text-emerald-700 dark:text-emerald-300">
                        {event.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-emerald-800 dark:text-emerald-300">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {event.attendees} attending
                      </div>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Join Event</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeChallenges.map((challenge) => (
                <Card key={challenge.id} className="border-emerald-200 dark:border-emerald-800">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                        {challenge.icon}
                      </div>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-emerald-800 dark:text-emerald-300">{challenge.title}</CardTitle>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Participants</span>
                        <span className="font-medium">{challenge.participants}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Days Left</span>
                        <span className="font-medium">{challenge.daysLeft}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Points</span>
                        <span className="font-medium text-emerald-600">{challenge.points}</span>
                      </div>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Join Challenge</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Community Leaderboard
                </CardTitle>
                <CardDescription>Top contributors this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { rank: 1, name: "EcoChampion_Alex", points: 2450, badge: "🥇" },
                    { rank: 2, name: "GreenGuru_Maria", points: 2180, badge: "🥈" },
                    { rank: 3, name: "SustainableSam", points: 1950, badge: "🥉" },
                    { rank: 4, name: "EcoWarrior23", points: 1720, badge: "⭐" },
                    { rank: 5, name: "ClimateHero_Jo", points: 1580, badge: "⭐" },
                    { rank: 6, name: "GreenThumb_Sarah", points: 1420, badge: "⭐" },
                    { rank: 7, name: "SolarPioneer", points: 1350, badge: "⭐" },
                    { rank: 8, name: "CycleCommuter", points: 1280, badge: "⭐" },
                  ].map((user) => (
                    <div
                      key={user.rank}
                      className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{user.badge}</span>
                        <div>
                          <span className="font-medium text-emerald-800 dark:text-emerald-300">{user.name}</span>
                          <div className="text-sm text-muted-foreground">Rank #{user.rank}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-600">{user.points}</div>
                        <div className="text-sm text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
