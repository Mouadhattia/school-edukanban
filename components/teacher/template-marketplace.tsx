"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Grid, List, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { MarketplaceTemplateCard } from "@/components/teacher/marketplace-template-card"
import { TeacherSidebar } from "@/components/teacher/teacher-sidebar"
import { TemplateCheckout } from "@/components/teacher/template-checkout"
import { getMarketplaceTemplates } from "@/lib/data"
import type { Template, UserRole } from "@/lib/types"
import Link from "next/link"

interface TemplateMarketplaceProps {
  userRole: UserRole
  schoolId: string
}

export function TemplateMarketplace({ userRole, schoolId }: TemplateMarketplaceProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [purchasedTemplates, setPurchasedTemplates] = useState<Template[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid" | "trial">("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [checkoutTemplate, setCheckoutTemplate] = useState<Template | null>(null)
  const [isCheckoutMode, setIsCheckoutMode] = useState(false)

  // Load templates on component mount
  useEffect(() => {
    const allTemplates = getMarketplaceTemplates()
    // Filter out already purchased templates
    const purchased = allTemplates.filter((t) => t.isPurchased)
    const available = allTemplates.filter((t) => !t.isPurchased)

    setTemplates(available)
    setPurchasedTemplates(purchased)
  }, [])

  // Get all unique subjects from templates
  const allSubjects = Array.from(new Set(templates.flatMap((template) => template.subjects))).sort()

  // Get all unique education levels from templates
  const allLevels = Array.from(new Set(templates.flatMap((template) => template.educationLevels))).sort()

  // Filter templates based on search query, subjects, levels, and price
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSubjects =
      selectedSubjects.length === 0 || template.subjects.some((subject) => selectedSubjects.includes(subject))

    const matchesLevels =
      selectedLevels.length === 0 || template.educationLevels.some((level) => selectedLevels.includes(level))

    const matchesPrice = priceFilter === "all" || template.pricing.type === priceFilter

    // Check if template is restricted to specific schools
    const isAccessible =
      !template.restrictedToSchools ||
      template.restrictedToSchools.length === 0 ||
      template.restrictedToSchools.includes(schoolId)

    return matchesSearch && matchesSubjects && matchesLevels && matchesPrice && isAccessible
  })

  // Filter purchased templates
  const filteredPurchasedTemplates = purchasedTemplates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSubjects =
      selectedSubjects.length === 0 || template.subjects.some((subject) => selectedSubjects.includes(subject))

    const matchesLevels =
      selectedLevels.length === 0 || template.educationLevels.some((level) => selectedLevels.includes(level))

    return matchesSearch && matchesSubjects && matchesLevels
  })

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) => (prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]))
  }

  const toggleLevel = (level: string) => {
    setSelectedLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]))
  }

  const clearFilters = () => {
    setSelectedSubjects([])
    setSelectedLevels([])
    setPriceFilter("all")
    setSearchQuery("")
  }

  const handlePurchaseTemplate = (template: Template) => {
    setCheckoutTemplate(template)
    setIsCheckoutMode(true)
  }

  const handleCompletePurchase = (template: Template, paymentMethod: string) => {
    // Add the template to purchased templates
    setPurchasedTemplates([...purchasedTemplates, { ...template, isPurchased: true }])

    // Remove from available templates
    setTemplates(templates.filter((t) => t.id !== template.id))

    // Exit checkout mode
    setIsCheckoutMode(false)
    setCheckoutTemplate(null)
  }

  if (isCheckoutMode && checkoutTemplate) {
    return (
      <div className="flex min-h-screen">
        <TeacherSidebar />
        <div className="flex-1 p-6">
          <TemplateCheckout
            template={checkoutTemplate}
            onBack={() => setIsCheckoutMode(false)}
            onComplete={handleCompletePurchase}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />

      <div className="flex-1">
        <header className="sticky top-0 z-10 border-b bg-background">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" passHref>
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to dashboard</span>
                </Button>
              </Link>
              <h1 className="text-xl font-bold">Template Marketplace</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search templates..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant={isFilterOpen ? "default" : "outline"} onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <div className="flex items-center border rounded-md p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">List view</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="flex gap-6">
            {isFilterOpen && (
              <div className="w-64 shrink-0">
                <div className="border rounded-lg p-4 space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Price</h3>
                    <Select
                      value={priceFilter}
                      onValueChange={(value) => setPriceFilter(value as "all" | "free" | "paid" | "trial")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="trial">Free Trial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Education Level</h3>
                    <div className="space-y-2">
                      {allLevels.map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <Checkbox
                            id={`level-${level}`}
                            checked={selectedLevels.includes(level)}
                            onCheckedChange={() => toggleLevel(level)}
                          />
                          <Label htmlFor={`level-${level}`} className="font-normal capitalize">
                            {level} School
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Subject</h3>
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {allSubjects.map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox
                            id={`subject-${subject}`}
                            checked={selectedSubjects.includes(subject)}
                            onCheckedChange={() => toggleSubject(subject)}
                          />
                          <Label htmlFor={`subject-${subject}`} className="font-normal capitalize">
                            {subject}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}

            <div className="flex-1">
              <Tabs defaultValue="all" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="all">All Templates</TabsTrigger>
                  <TabsTrigger value="purchased">Purchased</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-6">
                  {filteredTemplates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/20">
                      <div className="text-muted-foreground">No templates found matching your criteria</div>
                    </div>
                  ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredTemplates.map((template) => (
                        <MarketplaceTemplateCard
                          key={template.id}
                          template={template}
                          userRole={userRole}
                          schoolId={schoolId}
                          onPurchase={handlePurchaseTemplate}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="border rounded-md divide-y">
                      {filteredTemplates.map((template) => (
                        <div key={template.id} className="flex items-center p-4 hover:bg-muted/50">
                          <div className={`h-10 w-1 rounded-full ${template.color} mr-4`} />
                          <div className="flex-1">
                            <h3 className="font-medium">{template.title}</h3>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {template.subjects.slice(0, 3).map((subject) => (
                                <span key={subject} className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                  {subject}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-sm font-medium">
                              {template.pricing.type === "free"
                                ? "Free"
                                : template.pricing.type === "trial"
                                  ? "Free Trial"
                                  : `$${template.pricing.price?.toFixed(2)}`}
                            </div>
                            <Button onClick={() => handlePurchaseTemplate(template)}>
                              {template.pricing.type === "free" || template.pricing.type === "trial"
                                ? "Use Template"
                                : "Purchase"}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="purchased" className="space-y-6">
                  {filteredPurchasedTemplates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/20">
                      <div className="text-muted-foreground">No purchased templates found</div>
                    </div>
                  ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredPurchasedTemplates.map((template) => (
                        <MarketplaceTemplateCard
                          key={template.id}
                          template={template}
                          userRole={userRole}
                          schoolId={schoolId}
                          isPurchased={true}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="border rounded-md divide-y">
                      {filteredPurchasedTemplates.map((template) => (
                        <div key={template.id} className="flex items-center p-4 hover:bg-muted/50">
                          <div className={`h-10 w-1 rounded-full ${template.color} mr-4`} />
                          <div className="flex-1">
                            <h3 className="font-medium">{template.title}</h3>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          </div>
                          <Button>Use Template</Button>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Other tabs would have similar content but with different sorting/filtering */}
                <TabsContent value="popular" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates
                      .sort((a, b) => b.stats.installs - a.stats.installs)
                      .slice(0, 6)
                      .map((template) => (
                        <MarketplaceTemplateCard
                          key={template.id}
                          template={template}
                          userRole={userRole}
                          schoolId={schoolId}
                          onPurchase={handlePurchaseTemplate}
                        />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="new" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates
                      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                      .slice(0, 6)
                      .map((template) => (
                        <MarketplaceTemplateCard
                          key={template.id}
                          template={template}
                          userRole={userRole}
                          schoolId={schoolId}
                          onPurchase={handlePurchaseTemplate}
                        />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="recommended" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates
                      .sort((a, b) => (b.stats.rating || 0) - (a.stats.rating || 0))
                      .slice(0, 6)
                      .map((template) => (
                        <MarketplaceTemplateCard
                          key={template.id}
                          template={template}
                          userRole={userRole}
                          schoolId={schoolId}
                          onPurchase={handlePurchaseTemplate}
                        />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
