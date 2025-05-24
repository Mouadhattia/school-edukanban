"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Laptop, Smartphone, Tablet } from "lucide-react"

export default function TemplatePreviewPage({ params }: { params: { id: string } }) {
  const [activeView, setActiveView] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [currentSection, setCurrentSection] = useState(0)

  // Template data based on ID
  const templates = {
    "1": {
      name: "Modern School",
      category: "high-school",
      description: "A clean, contemporary design for high schools and academies.",
      image: "/modern-school-website-template.png",
      sections: [
        { name: "Home", image: "/modern-school-website-template.png" },
        { name: "About", image: "/placeholder.svg?height=600&width=800&query=modern school about page" },
        { name: "Academics", image: "/placeholder.svg?height=600&width=800&query=modern school academics page" },
        { name: "Calendar", image: "/placeholder.svg?height=600&width=800&query=modern school calendar page" },
        { name: "Contact", image: "/placeholder.svg?height=600&width=800&query=modern school contact page" },
      ],
    },
    "2": {
      name: "Elementary School",
      category: "elementary",
      description: "Colorful and engaging design perfect for elementary schools.",
      image: "/elementary-school-website.png",
      sections: [
        { name: "Home", image: "/elementary-school-website.png" },
        { name: "About", image: "/placeholder.svg?height=600&width=800&query=elementary school about page colorful" },
        {
          name: "Programs",
          image: "/placeholder.svg?height=600&width=800&query=elementary school programs page colorful",
        },
        { name: "Events", image: "/placeholder.svg?height=600&width=800&query=elementary school events page colorful" },
        {
          name: "Contact",
          image: "/placeholder.svg?height=600&width=800&query=elementary school contact page colorful",
        },
      ],
    },
    "3": {
      name: "High School Pro",
      category: "high-school",
      description: "Professional and academic design for high schools.",
      image: "/high-school-website-template.png",
      sections: [
        { name: "Home", image: "/high-school-website-template.png" },
        { name: "About", image: "/placeholder.svg?height=600&width=800&query=professional high school about page" },
        {
          name: "Academics",
          image: "/placeholder.svg?height=600&width=800&query=professional high school academics page",
        },
        {
          name: "Athletics",
          image: "/placeholder.svg?height=600&width=800&query=professional high school athletics page",
        },
        { name: "Contact", image: "/placeholder.svg?height=600&width=800&query=professional high school contact page" },
      ],
    },
  }

  const template = templates[params.id as keyof typeof templates]

  if (!template) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Template not found</h1>
          <p className="mt-2 text-muted-foreground">The template you're looking for doesn't exist.</p>
          <Button className="mt-4" asChild>
            <Link href="/dashboard/templates">Back to Templates</Link>
          </Button>
        </div>
      </div>
    )
  }

  const nextSection = () => {
    setCurrentSection((prev) => (prev < template.sections.length - 1 ? prev + 1 : prev))
  }

  const prevSection = () => {
    setCurrentSection((prev) => (prev > 0 ? prev - 1 : prev))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/templates" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Templates</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveView("desktop")}
              className={activeView === "desktop" ? "bg-accent" : ""}
            >
              <Laptop className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Desktop</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveView("tablet")}
              className={activeView === "tablet" ? "bg-accent" : ""}
            >
              <Tablet className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Tablet</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveView("mobile")}
              className={activeView === "mobile" ? "bg-accent" : ""}
            >
              <Smartphone className="h-4 w-4" />
              <span className="ml-2 hidden sm:inline">Mobile</span>
            </Button>
          </div>
          <Button asChild>
            <Link href={`/dashboard/sites/new?template=${params.id}`}>
              <Check className="mr-2 h-4 w-4" />
              Use Template
            </Link>
          </Button>
        </div>
      </header>
      <div className="flex flex-1 flex-col">
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{template.name}</h1>
            <p className="text-muted-foreground">{template.description}</p>
          </div>

          <Tabs defaultValue={template.sections[0].name.toLowerCase()} className="mb-6">
            <TabsList className="w-full justify-start overflow-auto">
              {template.sections.map((section, index) => (
                <TabsTrigger
                  key={section.name}
                  value={section.name.toLowerCase()}
                  onClick={() => setCurrentSection(index)}
                  className={currentSection === index ? "border-b-2 border-primary" : ""}
                >
                  {section.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="relative mx-auto bg-background border rounded-lg overflow-hidden shadow-sm">
            <div
              className={`transition-all mx-auto ${
                activeView === "desktop" ? "w-full max-w-6xl" : activeView === "tablet" ? "w-[768px]" : "w-[375px]"
              }`}
            >
              <img
                src={template.sections[currentSection].image || "/placeholder.svg"}
                alt={`${template.name} - ${template.sections[currentSection].name}`}
                className="w-full h-auto"
              />
            </div>

            {/* Navigation arrows */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
              onClick={prevSection}
              disabled={currentSection === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
              onClick={nextSection}
              disabled={currentSection === template.sections.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-6 flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard/templates">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Templates
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/dashboard/sites/new?template=${params.id}`}>
                <Check className="mr-2 h-4 w-4" />
                Use Template
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
