"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Globe, Home, Layout, Search, Settings, Users } from "lucide-react"

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const templates = [
    {
      id: "1",
      name: "Modern School",
      category: "high-school",
      description: "A clean, contemporary design for high schools and academies.",
      image: "/modern-school-website-template.png",
      popular: true,
    },
    {
      id: "2",
      name: "Elementary School",
      category: "elementary",
      description: "Colorful and engaging design perfect for elementary schools.",
      image: "/elementary-school-website.png",
      popular: true,
    },
    {
      id: "3",
      name: "High School Pro",
      category: "high-school",
      description: "Professional and academic design for high schools.",
      image: "/high-school-website-template.png",
      popular: false,
    },
    {
      id: "4",
      name: "University Prep",
      category: "high-school",
      description: "Sophisticated design for college preparatory schools.",
      image: "/university-prep-school-website.png",
      popular: false,
    },
    {
      id: "5",
      name: "Primary School",
      category: "elementary",
      description: "Fun and educational design for primary schools.",
      image: "/colorful-primary-school-website.png",
      popular: false,
    },
    {
      id: "6",
      name: "Middle School",
      category: "middle-school",
      description: "Balanced design for middle schools and junior high.",
      image: "/middle-school-website-template.png",
      popular: true,
    },
    {
      id: "7",
      name: "District Office",
      category: "district",
      description: "Professional design for school district offices.",
      image: "/placeholder.svg?height=300&width=400&query=school district office website template",
      popular: false,
    },
    {
      id: "8",
      name: "Charter School",
      category: "charter",
      description: "Unique design for charter and independent schools.",
      image: "/placeholder.svg?height=300&width=400&query=charter school website template",
      popular: false,
    },
  ]

  const filteredTemplates = (category: string) => {
    return templates.filter(
      (template) =>
        (category === "all" || template.category === category) &&
        (template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.description.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-5 w-5" />
            <span>EduSite</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/sites"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
              My Sites
            </Link>
            <Link
              href="/dashboard/templates"
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all"
            >
              <Layout className="h-4 w-4" />
              Templates
            </Link>
            <Link
              href="/dashboard/domains"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
              Domains
            </Link>
            <Link
              href="/dashboard/users"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <div className="md:hidden">
            <BookOpen className="h-6 w-6" />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="sm">
              Upgrade Plan
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Toggle user menu">
              <img src="/diverse-avatars.png" alt="Avatar" className="rounded-full" height={32} width={32} />
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Website Templates</h1>
              <p className="text-muted-foreground">Choose a template to start building your school website.</p>
            </div>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search templates..."
                className="w-full md:w-[250px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="mt-6">
            <TabsList>
              <TabsTrigger value="all">All Templates</TabsTrigger>
              <TabsTrigger value="high-school">High School</TabsTrigger>
              <TabsTrigger value="middle-school">Middle School</TabsTrigger>
              <TabsTrigger value="elementary">Elementary</TabsTrigger>
              <TabsTrigger value="district">District</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTemplates("all").map((template) => (
                  <Card key={template.id} className="overflow-hidden">
                    <div className="relative aspect-video">
                      <img
                        src={template.image || "/placeholder.svg"}
                        alt={template.name}
                        className="object-cover w-full h-full"
                      />
                      {template.popular && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          Popular
                        </div>
                      )}
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={`/dashboard/templates/${template.id}`}>Preview</Link>
                      </Button>
                      <Button size="sm" className="flex-1" asChild>
                        <Link href={`/dashboard/sites/new?template=${template.id}`}>Use Template</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            {["high-school", "middle-school", "elementary", "district"].map((category) => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredTemplates(category).map((template) => (
                    <Card key={template.id} className="overflow-hidden">
                      <div className="relative aspect-video">
                        <img
                          src={template.image || "/placeholder.svg"}
                          alt={template.name}
                          className="object-cover w-full h-full"
                        />
                        {template.popular && (
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                            Popular
                          </div>
                        )}
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <Link href={`/dashboard/templates/${template.id}`}>Preview</Link>
                        </Button>
                        <Button size="sm" className="flex-1" asChild>
                          <Link href={`/dashboard/sites/new?template=${template.id}`}>Use Template</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>
    </div>
  )
}
