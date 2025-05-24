"use client"

import { useState, useRef } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpTooltip } from "./help-tooltip"

export interface FontStyle {
  id: string
  name: string
  description: string
  category: "playful" | "professional" | "tech" | "elegant" | "modern" | "traditional"
  heading: string
  body: string
  preview: string
}

// Collection of font styles
export const fontStyles: FontStyle[] = [
  {
    id: "playful-primary",
    name: "Playful Primary",
    description: "Fun and engaging fonts for elementary schools",
    category: "playful",
    heading: "'Comic Neue', cursive",
    body: "'Nunito', sans-serif",
    preview: "ABCabc123",
  },
  {
    id: "playful-rounded",
    name: "Playful Rounded",
    description: "Rounded and friendly fonts for younger students",
    category: "playful",
    heading: "'Varela Round', sans-serif",
    body: "'Quicksand', sans-serif",
    preview: "ABCabc123",
  },
  {
    id: "professional-classic",
    name: "Professional Classic",
    description: "Classic professional fonts for high schools",
    category: "professional",
    heading: "'Playfair Display', serif",
    body: "'Source Sans Pro', sans-serif",
    preview: "ABCabc123",
  },
  {
    id: "professional-modern",
    name: "Professional Modern",
    description: "Modern professional fonts for high schools",
    category: "professional",
    heading: "'Montserrat', sans-serif",
    body: "'Open Sans', sans-serif",
    preview: "ABCabc123",
  },
  {
    id: "tech-modern",
    name: "Tech Modern",
    description: "Modern tech-inspired fonts",
    category: "tech",
    heading: "'Roboto', sans-serif",
    body: "'Roboto Mono', monospace",
    preview: "ABCabc123",
  },
  {
    id: "tech-futuristic",
    name: "Tech Futuristic",
    description: "Futuristic tech-inspired fonts",
    category: "tech",
    heading: "'Space Grotesk', sans-serif",
    body: "'Inter', sans-serif",
    preview: "ABCabc123",
  },
  {
    id: "elegant-serif",
    name: "Elegant Serif",
    description: "Elegant serif fonts for a traditional look",
    category: "elegant",
    heading: "'Cormorant Garamond', serif",
    body: "'Lora', serif",
    preview: "ABCabc123",
  },
  {
    id: "modern-clean",
    name: "Modern Clean",
    description: "Clean and minimal modern fonts",
    category: "modern",
    heading: "'Poppins', sans-serif",
    body: "'Work Sans', sans-serif",
    preview: "ABCabc123",
  },
  {
    id: "traditional-academic",
    name: "Traditional Academic",
    description: "Traditional academic fonts with a timeless feel",
    category: "traditional",
    heading: "'Merriweather', serif",
    body: "'PT Serif', serif",
    preview: "ABCabc123",
  },
  {
    id: "modern-accessible",
    name: "Modern Accessible",
    description: "Highly readable fonts for accessibility",
    category: "modern",
    heading: "'Atkinson Hyperlegible', sans-serif",
    body: "'Atkinson Hyperlegible', sans-serif",
    preview: "ABCabc123",
  },
  // Adding more font styles to ensure scrolling is necessary
  {
    id: "elegant-modern",
    name: "Elegant Modern",
    description: "Modern elegant fonts with a clean look",
    category: "elegant",
    heading: "'Playfair Display', serif",
    body: "'Raleway', sans-serif",
    preview: "ABCabc123",
  },
  {
    id: "tech-minimal",
    name: "Tech Minimal",
    description: "Minimal tech-inspired fonts",
    category: "tech",
    heading: "'DM Sans', sans-serif",
    body: "'IBM Plex Sans', sans-serif",
    preview: "ABCabc123",
  },
  {
    id: "playful-creative",
    name: "Playful Creative",
    description: "Creative and playful fonts for art programs",
    category: "playful",
    heading: "'Fredoka One', cursive",
    body: "'Comfortaa', cursive",
    preview: "ABCabc123",
  },
  {
    id: "traditional-elegant",
    name: "Traditional Elegant",
    description: "Elegant traditional fonts with a classic feel",
    category: "traditional",
    heading: "'Libre Baskerville', serif",
    body: "'Crimson Text', serif",
    preview: "ABCabc123",
  },
]

interface FontStylePickerProps {
  value: {
    heading: string
    body: string
  }
  onChange: (fonts: {
    heading: string
    body: string
  }) => void
}

export function FontStylePicker({ value, onChange }: FontStylePickerProps) {
  const [activeTab, setActiveTab] = useState<string>("all")
  const [isOpen, setIsOpen] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleFontSelect = (fonts: { heading: string; body: string }) => {
    onChange(fonts)
  }

  const getCurrentFontName = () => {
    const currentFont = fontStyles.find((style) => style.heading === value.heading && style.body === value.body)
    return currentFont ? currentFont.name : "Custom"
  }

  const getFilteredFonts = () => {
    switch (activeTab) {
      case "playful":
        return fontStyles.filter((style) => style.category === "playful")
      case "professional":
        return fontStyles.filter((style) => style.category === "professional" || style.category === "elegant")
      case "tech":
        return fontStyles.filter((style) => style.category === "tech" || style.category === "modern")
      default:
        return fontStyles
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="text-sm font-medium">Font Style</h3>
          <HelpTooltip content="Choose fonts that match your school's personality" />
        </div>
        <Button variant="outline" size="sm" className="h-8" onClick={() => setIsOpen(true)}>
          <span className="text-xs">{getCurrentFontName()}</span>
        </Button>
      </div>

      <div className="space-y-2">
        <div className="p-2 bg-muted/50 rounded">
          <p className="text-sm font-semibold" style={{ fontFamily: value.heading }}>
            Heading Preview: The quick brown fox jumps over the lazy dog
          </p>
        </div>
        <div className="p-2 bg-muted/50 rounded">
          <p className="text-sm" style={{ fontFamily: value.body }}>
            Body Preview: The quick brown fox jumps over the lazy dog. 0123456789
          </p>
        </div>
      </div>

      {/* Using Dialog instead of Popover for better scrolling support */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose Font Style</DialogTitle>
            <DialogDescription>Select fonts that match your school's personality</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mt-2">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="playful" className="text-xs">
                Playful
              </TabsTrigger>
              <TabsTrigger value="professional" className="text-xs">
                Professional
              </TabsTrigger>
              <TabsTrigger value="tech" className="text-xs">
                Tech
              </TabsTrigger>
            </TabsList>

            <div className="relative">
              <TabsContent value={activeTab} className="mt-0 pt-0 data-[state=active]:block" forceMount>
                <div ref={scrollContainerRef} className="h-[300px] overflow-y-auto space-y-3 pr-2">
                  {getFilteredFonts().map((style) => {
                    const isSelected = value.heading === style.heading && value.body === style.body

                    return (
                      <div
                        key={style.id}
                        className={`p-3 rounded-md border cursor-pointer transition-all hover:border-primary ${
                          isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-accent/50"
                        }`}
                        onClick={() => handleFontSelect({ heading: style.heading, body: style.body })}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{style.name}</span>
                          {isSelected && <Check className="h-4 w-4 text-primary" />}
                        </div>
                        <div className="text-xs text-muted-foreground mb-3">{style.description}</div>
                        <div className="space-y-2">
                          <div className="p-2 bg-muted/50 rounded">
                            <p className="text-sm font-semibold" style={{ fontFamily: style.heading }}>
                              Heading: {style.preview}
                            </p>
                          </div>
                          <div className="p-2 bg-muted/50 rounded">
                            <p className="text-sm" style={{ fontFamily: style.body }}>
                              Body: {style.preview}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>
            </div>
          </Tabs>

          <div className="flex justify-end">
            <Button onClick={() => setIsOpen(false)}>Done</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
