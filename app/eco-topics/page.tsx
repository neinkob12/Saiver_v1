"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Recycle, Sun, Droplets, TreePine, Heart, BookOpen, TrendingUp } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  readTime: number
  icon: React.ReactNode
  tags: string[]
  publishedAt: string
  featured?: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: "renewable-energy-2025",
    title: "The Future of Renewable Energy: 2025 Breakthrough Technologies",
    excerpt:
      "Discover the cutting-edge renewable energy technologies that are reshaping our world and making clean energy more accessible than ever.",
    content: `The renewable energy landscape is experiencing unprecedented innovation in 2025. From floating solar farms to advanced wind turbine designs, we're witnessing technologies that seemed like science fiction just a decade ago.

**Floating Solar Farms: The Ocean's New Power Plants**

Floating photovoltaic systems are revolutionizing solar energy generation. These innovative installations can generate up to 15% more electricity than land-based systems due to the cooling effect of water. Countries like Singapore and the Netherlands are leading this charge, with massive floating solar farms powering entire cities.

**Next-Generation Wind Turbines**

Modern wind turbines are becoming smarter and more efficient. The latest designs feature AI-powered blade adjustments that can increase energy output by 20%. Offshore wind farms are now capable of powering millions of homes while having minimal environmental impact.

**Energy Storage Breakthroughs**

Perhaps the most exciting development is in energy storage. New lithium-sulfur batteries can store three times more energy than traditional lithium-ion batteries, making renewable energy viable even when the sun isn't shining or the wind isn't blowing.

**The Economic Impact**

The renewable energy sector now employs over 13 million people globally, with job growth outpacing traditional energy sectors by 300%. This transition isn't just good for the planet—it's creating a new economy built on sustainability.

**What You Can Do**

Consider installing solar panels, supporting renewable energy policies, and choosing energy providers that prioritize clean sources. Every action contributes to this green revolution.`,
    category: "Energy",
    readTime: 3,
    icon: <Sun className="h-5 w-5" />,
    tags: ["Solar", "Wind", "Innovation", "Technology"],
    publishedAt: "2025-01-20",
    featured: true,
  },
  {
    id: "sustainable-agriculture",
    title: "Regenerative Agriculture: Healing the Earth While Feeding the World",
    excerpt:
      "Learn how regenerative farming practices are restoring soil health, increasing biodiversity, and creating more resilient food systems.",
    content: `Regenerative agriculture represents a paradigm shift from extractive farming to restorative practices that work with nature rather than against it.

**What is Regenerative Agriculture?**

Unlike conventional farming that depletes soil over time, regenerative agriculture focuses on rebuilding soil organic matter and restoring degraded soil biodiversity. This approach can actually reverse climate change by sequestering carbon in the soil.

**Key Practices Transforming Farms**

Cover cropping is one of the most powerful tools. By keeping living roots in the soil year-round, farmers can prevent erosion, improve water retention, and feed beneficial microorganisms. Crop rotation and diverse plantings create resilient ecosystems that naturally resist pests and diseases.

**The Carbon Connection**

Healthy soils can store massive amounts of carbon—more than the atmosphere and all plant life combined. When farmers adopt regenerative practices, they turn their fields into carbon sinks, actively removing CO2 from the atmosphere.

**Economic Benefits for Farmers**

Regenerative farms often see reduced input costs as they rely less on synthetic fertilizers and pesticides. Many farmers report increased yields after a transition period, along with improved soil water retention that provides resilience during droughts.

**Supporting the Movement**

Consumers can support regenerative agriculture by choosing products from certified regenerative farms, supporting local farmers markets, and advocating for agricultural policies that incentivize sustainable practices.

**The Future of Food**

As climate change intensifies, regenerative agriculture offers hope for a food system that not only feeds the world but actively heals the planet in the process.`,
    category: "Agriculture",
    readTime: 3,
    icon: <TreePine className="h-5 w-5" />,
    tags: ["Farming", "Soil Health", "Carbon", "Food Systems"],
    publishedAt: "2025-01-18",
  },
  {
    id: "circular-economy",
    title: "The Circular Economy: Redesigning Waste Out of Existence",
    excerpt:
      "Explore how the circular economy model is transforming industries by turning waste into resources and creating sustainable business models.",
    content: `The circular economy represents a fundamental shift from our traditional "take-make-dispose" model to a regenerative approach where waste becomes a resource.

**Understanding the Circular Model**

In a circular economy, products are designed for durability, reuse, and recyclability from the very beginning. Instead of ending up in landfills, materials flow continuously through the economy, maintaining their highest value for as long as possible.

**Industry Transformations**

Fashion brands are pioneering clothing rental services and take-back programs. Electronics companies are designing modular devices that can be easily repaired and upgraded. Even the construction industry is embracing circular principles with buildings designed for disassembly and material reuse.

**The Role of Technology**

Digital platforms are enabling new circular business models. Apps connect consumers with repair services, material exchanges help businesses find uses for their waste streams, and blockchain technology tracks materials through their lifecycle.

**Economic Opportunities**

The circular economy could generate $4.5 trillion in economic benefits by 2030. It's creating new job categories—from repair technicians to material flow analysts—while reducing resource costs for businesses.

**Consumer Power**

Every purchase decision is a vote for the kind of economy we want. Choosing durable goods, supporting companies with take-back programs, and participating in sharing economies all contribute to the circular transition.

**Local Initiatives**

Cities worldwide are implementing circular strategies, from zero-waste programs to industrial symbiosis projects where one company's waste becomes another's input material.

**Building a Circular Future**

The transition to a circular economy requires collaboration between businesses, governments, and consumers. Together, we can create a world where waste is designed out of existence.`,
    category: "Economy",
    readTime: 3,
    icon: <Recycle className="h-5 w-5" />,
    tags: ["Circular Economy", "Waste", "Business", "Innovation"],
    publishedAt: "2025-01-15",
  },
  {
    id: "water-conservation",
    title: "Smart Water Management: Technology Solutions for a Thirsty Planet",
    excerpt:
      "Discover innovative water conservation technologies and strategies that are helping communities worldwide manage this precious resource more effectively.",
    content: `Water scarcity affects 2 billion people globally, but innovative technologies and smart management strategies are providing hope for a more water-secure future.

**Smart Irrigation Systems**

Modern irrigation technology uses soil moisture sensors, weather data, and AI algorithms to deliver exactly the right amount of water at the optimal time. These systems can reduce agricultural water use by up to 30% while maintaining or even increasing crop yields.

**Atmospheric Water Generation**

New technologies can literally pull water from thin air. Atmospheric water generators use renewable energy to extract moisture from humidity, providing clean drinking water even in arid regions. Some systems can produce thousands of liters per day.

**Greywater Recycling**

Home and building systems now capture and treat water from sinks, showers, and washing machines for reuse in irrigation and toilet flushing. This can reduce household water consumption by 40% while lowering utility bills.

**Leak Detection Innovation**

Smart water meters and AI-powered monitoring systems can detect leaks within minutes, preventing the massive water waste that occurs when leaks go unnoticed. Some cities have reduced water loss by 25% using these technologies.

**Desalination Advances**

New desalination technologies are becoming more energy-efficient and environmentally friendly. Solar-powered desalination plants and innovative membrane technologies are making seawater a viable freshwater source for coastal communities.

**Community-Based Solutions**

Rainwater harvesting systems, community gardens with water-wise plants, and neighborhood water-sharing programs are creating resilient local water systems.

**Personal Water Stewardship**

Simple actions like fixing leaks promptly, installing low-flow fixtures, and choosing drought-resistant plants can significantly reduce individual water footprints while inspiring others to act.`,
    category: "Conservation",
    readTime: 3,
    icon: <Droplets className="h-5 w-5" />,
    tags: ["Water", "Technology", "Conservation", "Innovation"],
    publishedAt: "2025-01-12",
  },
  {
    id: "green-cities",
    title: "Green Cities Revolution: Urban Planning for a Sustainable Future",
    excerpt:
      "Explore how cities worldwide are transforming into green, livable spaces that prioritize both human well-being and environmental health.",
    content: `Cities house over half the world's population and are responsible for 70% of global carbon emissions. But they're also becoming laboratories for sustainability innovation.

**Vertical Forests and Green Buildings**

Modern cities are integrating nature into their architecture. Vertical forests—buildings covered in vegetation—improve air quality, reduce energy consumption, and provide habitat for urban wildlife. Milan's Bosco Verticale has inspired similar projects worldwide.

**15-Minute Cities**

The concept of 15-minute cities ensures that residents can access most daily needs within a 15-minute walk or bike ride. This reduces transportation emissions while improving quality of life and community connections.

**Urban Agriculture**

Rooftop gardens, vertical farms, and community food forests are bringing food production back to cities. These initiatives reduce food miles, provide fresh produce to urban communities, and create green jobs.

**Smart Transportation Networks**

Electric bus systems, bike-sharing programs, and pedestrian-priority zones are transforming urban mobility. Some cities are achieving 50% reductions in transportation emissions through integrated sustainable transport systems.

**Green Infrastructure**

Cities are replacing traditional gray infrastructure with green alternatives. Bioswales manage stormwater naturally, green roofs reduce urban heat islands, and permeable pavements prevent flooding while filtering pollutants.

**Circular Waste Systems**

Progressive cities are implementing zero-waste strategies, turning organic waste into compost and energy, and creating local recycling loops that keep materials in the community.

**Community Engagement**

The most successful green city initiatives involve residents in planning and implementation. Citizen science projects, community gardens, and participatory budgeting ensure that sustainability efforts meet real community needs.

**Measuring Success**

Cities are using sophisticated monitoring systems to track air quality, energy use, and biodiversity, creating feedback loops that drive continuous improvement in urban sustainability.`,
    category: "Urban Planning",
    readTime: 3,
    icon: <TreePine className="h-5 w-5" />,
    tags: ["Cities", "Urban Planning", "Green Infrastructure", "Community"],
    publishedAt: "2025-01-10",
  },
  {
    id: "climate-action",
    title: "Individual Climate Action: Small Steps, Big Impact",
    excerpt:
      "Discover practical, science-backed actions individuals can take to reduce their carbon footprint and contribute to climate solutions.",
    content: `While systemic change is crucial for addressing climate change, individual actions collectively create powerful momentum for transformation.

**The Power of Personal Carbon Footprints**

The average person in developed countries produces 16 tons of CO2 annually. By making strategic lifestyle changes, individuals can reduce this by 50% or more while often saving money and improving quality of life.

**Transportation Transformation**

Transportation accounts for the largest portion of most people's carbon footprints. Walking, cycling, using public transit, or switching to electric vehicles can dramatically reduce emissions. Even one car-free day per week makes a meaningful difference.

**Energy at Home**

Simple changes like LED lighting, smart thermostats, and energy-efficient appliances can cut home energy use by 30%. Adding solar panels or choosing renewable energy providers can make homes carbon-neutral or even carbon-negative.

**Food Choices Matter**

Reducing meat consumption, especially beef, can cut food-related emissions by 50%. Supporting local, seasonal, and organic foods further reduces environmental impact while supporting sustainable agriculture.

**Mindful Consumption**

Buying less, choosing durable goods, and supporting companies with strong environmental commitments sends market signals that drive business sustainability. The sharing economy and second-hand markets offer alternatives to constant consumption.

**Financial Climate Action**

Moving money to banks and investment funds that don't finance fossil fuels can have enormous impact. Sustainable investing is growing rapidly as people align their financial choices with their values.

**Advocacy and Community**

Individual actions multiply when shared with others. Talking about climate solutions, supporting environmental policies, and participating in community sustainability initiatives amplifies personal impact.

**Staying Motivated**

Climate action is a marathon, not a sprint. Celebrating progress, connecting with like-minded communities, and focusing on co-benefits like health and cost savings help maintain long-term commitment to sustainable living.`,
    category: "Lifestyle",
    readTime: 3,
    icon: <Heart className="h-5 w-5" />,
    tags: ["Climate Action", "Lifestyle", "Carbon Footprint", "Personal"],
    publishedAt: "2025-01-08",
  },
]

export default function EcoTopicsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const categories = ["All", "Energy", "Agriculture", "Economy", "Conservation", "Urban Planning", "Lifestyle"]

  const filteredPosts =
    selectedCategory === "All" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory)

  const featuredPost = blogPosts.find((post) => post.featured)

  if (selectedPost) {
    return (
      <div className="flex-1 bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-950">
        <div className="max-w-4xl mx-auto p-6">
          <Button
            variant="ghost"
            onClick={() => setSelectedPost(null)}
            className="mb-6 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
          >
            ← Back to Eco Topics
          </Button>

          <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                  {selectedPost.icon}
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {selectedPost.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {selectedPost.readTime} min read
                  </div>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">{selectedPost.title}</h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-emerald-700 dark:text-emerald-300">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="prose prose-emerald dark:prose-invert max-w-none">
                {selectedPost.content.split("\n\n").map((paragraph, index) => {
                  if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                    return (
                      <h3
                        key={index}
                        className="text-xl font-semibold text-emerald-800 dark:text-emerald-300 mt-6 mb-3"
                      >
                        {paragraph.slice(2, -2)}
                      </h3>
                    )
                  }
                  return (
                    <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                      {paragraph}
                    </p>
                  )
                })}
              </div>
            </div>
          </article>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-950">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-300 mb-2">Eco Topics</h1>
          <p className="text-emerald-600 dark:text-emerald-400">
            Discover insights, innovations, and actionable advice for sustainable living
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Card className="mb-8 border-emerald-200 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/30">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                <Badge className="bg-emerald-600 text-white">Featured</Badge>
              </div>
              <CardTitle className="text-2xl text-emerald-800 dark:text-emerald-300">{featuredPost.title}</CardTitle>
              <CardDescription className="text-emerald-700 dark:text-emerald-400">
                {featuredPost.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm text-emerald-700 dark:text-emerald-400">
                      {featuredPost.readTime} min read
                    </span>
                  </div>
                  <Badge variant="outline" className="text-emerald-700 dark:text-emerald-300">
                    {featuredPost.category}
                  </Badge>
                </div>
                <Button
                  onClick={() => setSelectedPost(featuredPost)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Article
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="border-emerald-200 dark:border-emerald-800 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                    {post.icon}
                  </div>
                  <Badge variant="outline" className="text-emerald-700 dark:text-emerald-300">
                    {post.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg text-emerald-800 dark:text-emerald-300 line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {post.readTime} min read
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                  >
                    Read More →
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
