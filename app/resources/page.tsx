"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  FileText,
  Book,
  Video,
  LinkIcon,
  Download,
  Search,
  BookOpen,
  Filter,
  Leaf,
  TreePine,
  Recycle,
  Droplets,
  Sun,
} from "lucide-react"

interface Resource {
  id: string
  title: string
  description: string
  type: "article" | "book" | "video" | "tool" | "dataset"
  url: string
  category: string
  tags: string[]
  icon: React.ReactNode
  featured?: boolean
}

const resources: Resource[] = [
  {
    id: "1",
    title: "The Comprehensive Guide to Carbon Footprint Reduction",
    description:
      "A detailed guide on practical steps individuals and businesses can take to reduce their carbon footprint.",
    type: "article",
    url: "#",
    category: "Climate Action",
    tags: ["carbon footprint", "sustainability", "lifestyle"],
    icon: <Leaf className="h-5 w-5" />,
    featured: true,
  },
  {
    id: "2",
    title: "Sustainable Materials Database",
    description: "A comprehensive database of sustainable materials for construction and manufacturing.",
    type: "dataset",
    url: "#",
    category: "Materials",
    tags: ["materials", "construction", "manufacturing"],
    icon: <Recycle className="h-5 w-5" />,
  },
  {
    id: "3",
    title: "Renewable Energy Transition: A Practical Handbook",
    description: "A complete guide to transitioning to renewable energy sources for homes and businesses.",
    type: "book",
    url: "#",
    category: "Energy",
    tags: ["renewable energy", "solar", "wind", "transition"],
    icon: <Sun className="h-5 w-5" />,
  },
  {
    id: "4",
    title: "Water Conservation Techniques for Urban Areas",
    description: "Learn effective water conservation strategies specifically designed for urban environments.",
    type: "article",
    url: "#",
    category: "Water",
    tags: ["water conservation", "urban", "sustainability"],
    icon: <Droplets className="h-5 w-5" />,
  },
  {
    id: "5",
    title: "The Future of Sustainable Agriculture",
    description: "An in-depth video series exploring innovative sustainable farming practices around the world.",
    type: "video",
    url: "#",
    category: "Agriculture",
    tags: ["agriculture", "farming", "food systems"],
    icon: <TreePine className="h-5 w-5" />,
  },
  {
    id: "6",
    title: "Carbon Footprint Calculator",
    description: "An interactive tool to calculate and track your personal or business carbon footprint.",
    type: "tool",
    url: "#",
    category: "Climate Action",
    tags: ["carbon footprint", "calculator", "tracking"],
    icon: <Leaf className="h-5 w-5" />,
  },
  {
    id: "7",
    title: "Biodiversity Conservation Strategies",
    description: "A comprehensive guide to protecting and enhancing biodiversity in various ecosystems.",
    type: "article",
    url: "#",
    category: "Biodiversity",
    tags: ["biodiversity", "conservation", "ecosystems"],
    icon: <TreePine className="h-5 w-5" />,
  },
  {
    id: "8",
    title: "Circular Economy Implementation Toolkit",
    description: "Practical tools and frameworks for implementing circular economy principles in your organization.",
    type: "tool",
    url: "#",
    category: "Circular Economy",
    tags: ["circular economy", "business", "waste reduction"],
    icon: <Recycle className="h-5 w-5" />,
  },
]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = [
    "All",
    "Climate Action",
    "Energy",
    "Water",
    "Agriculture",
    "Materials",
    "Biodiversity",
    "Circular Economy",
  ]
  const resourceTypes = ["All Types", "Article", "Book", "Video", "Tool", "Dataset"]

  const [selectedType, setSelectedType] = useState("All Types")

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory

    const matchesType = selectedType === "All Types" || resource.type.toLowerCase() === selectedType.toLowerCase()

    return matchesSearch && matchesCategory && matchesType
  })

  const featuredResource = resources.find((resource) => resource.featured)

  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="h-4 w-4" />
      case "book":
        return <Book className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "tool":
        return <LinkIcon className="h-4 w-4" />
      case "dataset":
        return <Download className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-950">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-300 mb-2">Resources</h1>
          <p className="text-emerald-600 dark:text-emerald-400">
            Discover curated resources to deepen your knowledge and take action
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-emerald-200 dark:border-emerald-800"
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-10 rounded-md border border-emerald-200 dark:border-emerald-800 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 pr-10"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="h-10 rounded-md border border-emerald-200 dark:border-emerald-800 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 pr-10"
                >
                  {resourceTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Featured Resource */}
        {featuredResource && (
          <Card className="mb-8 border-emerald-200 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/30">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-emerald-600 text-white">Featured</Badge>
              </div>
              <CardTitle className="text-2xl text-emerald-800 dark:text-emerald-300">
                {featuredResource.title}
              </CardTitle>
              <CardDescription className="text-emerald-700 dark:text-emerald-400">
                {featuredResource.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                    {getResourceTypeIcon(featuredResource.type)}
                    {featuredResource.type.charAt(0).toUpperCase() + featuredResource.type.slice(1)}
                  </Badge>
                  <Badge variant="outline" className="text-emerald-700 dark:text-emerald-300">
                    {featuredResource.category}
                  </Badge>
                </div>
                <Button
                  onClick={() => window.open(featuredResource.url, "_blank")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Access Resource
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <Card
              key={resource.id}
              className="border-emerald-200 dark:border-emerald-800 hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                    {resource.icon}
                  </div>
                  <Badge variant="outline" className="text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                    {getResourceTypeIcon(resource.type)}
                    {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                  </Badge>
                </div>
                <CardTitle className="text-lg text-emerald-800 dark:text-emerald-300 line-clamp-2">
                  {resource.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs text-emerald-700 dark:text-emerald-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  onClick={() => window.open(resource.url, "_blank")}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Access Resource
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-emerald-800 dark:text-emerald-300 mb-2">No resources found</h3>
            <p className="text-emerald-600 dark:text-emerald-400 max-w-md mx-auto">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
