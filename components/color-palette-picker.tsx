"use client"

import { useState, useRef } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HelpTooltip } from "./help-tooltip"

export interface ColorPalette {
  id: string
  name: string
  description: string
  category: "elementary" | "middle" | "high" | "university" | "modern" | "traditional" | "vibrant"
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
}

// Collection of modern color palettes
export const colorPalettes: ColorPalette[] = [
  {
    id: "elementary-bright",
    name: "Elementary Bright",
    description: "Bright and playful colors perfect for elementary schools",
    category: "elementary",
    colors: {
      primary: "#FF6B6B",
      secondary: "#4ECDC4",
      accent: "#FFE66D",
      background: "#FFFFFF",
      text: "#2D3748",
    },
  },
  {
    id: "elementary-soft",
    name: "Elementary Soft",
    description: "Soft and nurturing colors for younger students",
    category: "elementary",
    colors: {
      primary: "#98C1D9",
      secondary: "#E0FBFC",
      accent: "#EE6C4D",
      background: "#F7FFF7",
      text: "#293241",
    },
  },
  {
    id: "middle-school-cool",
    name: "Middle School Cool",
    description: "Cool and engaging colors for middle schools",
    category: "middle",
    colors: {
      primary: "#3A86FF",
      secondary: "#8338EC",
      accent: "#FF006E",
      background: "#FFFFFF",
      text: "#14213D",
    },
  },
  {
    id: "high-school-professional",
    name: "High School Professional",
    description: "Professional and mature colors for high schools",
    category: "high",
    colors: {
      primary: "#1A535C",
      secondary: "#4ECDC4",
      accent: "#FF6B6B",
      background: "#F7FFF7",
      text: "#2B2D42",
    },
  },
  {
    id: "university-classic",
    name: "University Classic",
    description: "Classic and prestigious colors for higher education",
    category: "university",
    colors: {
      primary: "#003049",
      secondary: "#D62828",
      accent: "#F77F00",
      background: "#FCFCFC",
      text: "#003049",
    },
  },
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    description: "Clean and minimal modern design",
    category: "modern",
    colors: {
      primary: "#2B2D42",
      secondary: "#8D99AE",
      accent: "#EF233C",
      background: "#EDF2F4",
      text: "#2B2D42",
    },
  },
  {
    id: "traditional-academic",
    name: "Traditional Academic",
    description: "Traditional academic colors with a timeless feel",
    category: "traditional",
    colors: {
      primary: "#14213D",
      secondary: "#FCA311",
      accent: "#E5E5E5",
      background: "#FFFFFF",
      text: "#000000",
    },
  },
  {
    id: "vibrant-creative",
    name: "Vibrant Creative",
    description: "Vibrant and creative colors for arts programs",
    category: "vibrant",
    colors: {
      primary: "#6A0572",
      secondary: "#AB83A1",
      accent: "#F7AEF8",
      background: "#FFFFFF",
      text: "#2D3748",
    },
  },
  {
    id: "tech-focused",
    name: "Tech Focused",
    description: "Modern tech-inspired color scheme",
    category: "modern",
    colors: {
      primary: "#3A506B",
      secondary: "#5BC0BE",
      accent: "#0B132B",
      background: "#FFFFFF",
      text: "#1C2541",
    },
  },
  {
    id: "nature-inspired",
    name: "Nature Inspired",
    description: "Calming nature-inspired colors",
    category: "traditional",
    colors: {
      primary: "#606C38",
      secondary: "#283618",
      accent: "#DDA15E",
      background: "#FEFAE0",
      text: "#283618",
    },
  },
  // Adding more palettes to ensure scrolling is necessary
  {
    id: "vibrant-primary",
    name: "Vibrant Primary",
    description: "Bold and vibrant primary colors",
    category: "vibrant",
    colors: {
      primary: "#E63946",
      secondary: "#457B9D",
      accent: "#F1FAEE",
      background: "#FFFFFF",
      text: "#1D3557",
    },
  },
  {
    id: "modern-dark",
    name: "Modern Dark",
    description: "Modern dark theme with accent colors",
    category: "modern",
    colors: {
      primary: "#2B2D42",
      secondary: "#8D99AE",
      accent: "#EF233C",
      background: "#EDF2F4",
      text: "#2B2D42",
    },
  },
  {
    id: "elementary-playful",
    name: "Elementary Playful",
    description: "Playful colors for elementary schools",
    category: "elementary",
    colors: {
      primary: "#FFBE0B",
      secondary: "#FB5607",
      accent: "#FF006E",
      background: "#FFFFFF",
      text: "#8338EC",
    },
  },
  {
    id: "university-modern",
    name: "University Modern",
    description: "Modern colors for higher education",
    category: "university",
    colors: {
      primary: "#3D5A80",
      secondary: "#98C1D9",
      accent: "#EE6C4D",
      background: "#F7FFF7",
      text: "#293241",
    },
  },
]

interface ColorPalettePickerProps {
  value: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  onChange: (colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }) => void
}

export function ColorPalettePicker({ value, onChange }: ColorPalettePickerProps) {
  const [activeTab, setActiveTab] = useState<string>("all")
  const [isOpen, setIsOpen] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Filter palettes based on active tab
  const filteredPalettes =
    activeTab === "all" ? colorPalettes : colorPalettes.filter((palette) => palette.category === activeTab)

  const handlePaletteSelect = (colors: ColorPalette["colors"]) => {
    onChange(colors)
  }

  const getCurrentPaletteName = () => {
    const currentPalette = colorPalettes.find((palette) => JSON.stringify(palette.colors) === JSON.stringify(value))
    return currentPalette ? currentPalette.name : "Custom"
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="text-sm font-medium">Color Palette</h3>
          <HelpTooltip content="Choose a color palette that matches your school's identity" />
        </div>
        <Button variant="outline" size="sm" className="h-8 gap-2" onClick={() => setIsOpen(true)}>
          <span className="text-xs">{getCurrentPaletteName()}</span>
          <div className="flex gap-1">
            <div className="h-3 w-3 rounded-full border" style={{ backgroundColor: value.primary }} />
            <div className="h-3 w-3 rounded-full border" style={{ backgroundColor: value.secondary }} />
            <div className="h-3 w-3 rounded-full border" style={{ backgroundColor: value.accent }} />
          </div>
        </Button>
      </div>

      <div className="flex gap-2">
        {Object.entries(value).map(([key, color]) => (
          <TooltipProvider key={key}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex flex-col items-center">
                  <div
                    className="h-8 w-8 rounded-full border-2 border-white shadow-sm cursor-pointer"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs mt-1 capitalize">{key.slice(0, 1)}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="capitalize">{key}</p>
                <p className="text-xs text-muted-foreground">{color}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      {/* Using Dialog instead of Popover for better scrolling support */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose Color Palette</DialogTitle>
            <DialogDescription>Select a color palette that matches your school's identity</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mt-2">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="elementary" className="text-xs">
                Elementary
              </TabsTrigger>
              <TabsTrigger value="middle" className="text-xs">
                Middle
              </TabsTrigger>
              <TabsTrigger value="high" className="text-xs">
                High School
              </TabsTrigger>
            </TabsList>

            <div className="relative">
              <TabsContent value={activeTab} className="mt-0 pt-0 data-[state=active]:block" forceMount>
                <div ref={scrollContainerRef} className="h-[300px] overflow-y-auto space-y-3 pr-2">
                  {filteredPalettes.map((palette) => {
                    const isSelected = JSON.stringify(value) === JSON.stringify(palette.colors)

                    return (
                      <div
                        key={palette.id}
                        className={`p-3 rounded-md border cursor-pointer transition-all hover:border-primary ${
                          isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-accent/50"
                        }`}
                        onClick={() => handlePaletteSelect(palette.colors)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{palette.name}</span>
                          {isSelected && <Check className="h-4 w-4 text-primary" />}
                        </div>
                        <div className="text-xs text-muted-foreground mb-3">{palette.description}</div>
                        <div className="flex gap-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className="h-6 w-6 rounded-full border-2 border-white shadow-sm"
                                  style={{ backgroundColor: palette.colors.primary }}
                                />
                              </TooltipTrigger>
                              <TooltipContent>Primary</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className="h-6 w-6 rounded-full border-2 border-white shadow-sm"
                                  style={{ backgroundColor: palette.colors.secondary }}
                                />
                              </TooltipTrigger>
                              <TooltipContent>Secondary</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className="h-6 w-6 rounded-full border-2 border-white shadow-sm"
                                  style={{ backgroundColor: palette.colors.accent }}
                                />
                              </TooltipTrigger>
                              <TooltipContent>Accent</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className="h-6 w-6 rounded-full border-2 border-white shadow-sm"
                                  style={{ backgroundColor: palette.colors.background }}
                                />
                              </TooltipTrigger>
                              <TooltipContent>Background</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div
                                  className="h-6 w-6 rounded-full border-2 border-white shadow-sm"
                                  style={{ backgroundColor: palette.colors.text }}
                                />
                              </TooltipTrigger>
                              <TooltipContent>Text</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
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
