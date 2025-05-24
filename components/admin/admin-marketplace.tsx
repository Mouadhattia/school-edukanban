"use client"

import { useState } from "react"
import { Search, Filter, Grid, List, Plus, Download, Upload, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MarketplaceTemplateCard } from "@/components/teacher/marketplace-template-card"
import { getMarketplaceTemplates } from "@/lib/data"
import type { Template } from "@/lib/types"

interface AdminMarketplaceProps {
  schoolId: string
}

export function AdminMarketplace({ schoolId }: AdminMarketplaceProps) {
  const [templates, setTemplates] = useState<Template[]>(getMarketplaceTemplates())
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid" | "trial">("all")
  const [isFilterOpen, setIsFilterOpen] = useState(true)
  const [selectedTab, setSelectedTab] = useState("all")

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

  // Get templates based on tab selection
  const getTabTemplates = () => {
    switch (selectedTab) {
      case "popular":
        return [...filteredTemplates].sort((a, b) => b.stats.installs - a.stats.installs)
      case "new":
        return [...filteredTemplates].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      case "recommended":
        return [...filteredTemplates].sort((a, b) => (b.stats.rating || 0) - (a.stats.rating || 0))
      case "approved":
        return filteredTemplates.filter((t) => t.status === "approved")
      case "pending":
        return filteredTemplates.filter((t) => t.status === "pending")
      default:
        return filteredTemplates
    }
  }

  const displayTemplates = getTabTemplates()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Curriculum Marketplace</h2>
          <p className="text-muted-foreground">Manage and curate curriculum templates for your school</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Template
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
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

      <div className="flex gap-6">
        {isFilterOpen && (
          <div className="w-64 shrink-0">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Filters</CardTitle>
                <CardDescription>Refine template results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
                  <ScrollArea className="h-[200px]">
                    <div className="space-y-2 pr-4">
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
                  </ScrollArea>
                </div>

                <Button variant="outline" className="w-full" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex-1">
          <Card>
            <CardHeader className="pb-3">
              <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
                <TabsList className="grid grid-cols-6 w-full">
                  <TabsTrigger value="all">All Templates</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  {displayTemplates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/20">
                      <div className="text-muted-foreground">No templates found matching your criteria</div>
                    </div>
                  ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {displayTemplates.map((template) => (
                        <MarketplaceTemplateCard
                          key={template.id}
                          template={template}
                          userRole="admin"
                          schoolId={schoolId}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="border rounded-md divide-y">
                      {displayTemplates.map((template) => (
                        <div key={template.id} className="flex items-center p-4 hover:bg-muted/50">
                          <div className={`h-10 w-1 rounded-full ${template.color} mr-4`} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{template.title}</h3>
                              {template.status === "pending" && (
                                <Badge variant="outline" className="text-amber-500 border-amber-500">
                                  Pending
                                </Badge>
                              )}
                              {template.status === "approved" && (
                                <Badge variant="outline" className="text-green-500 border-green-500">
                                  Approved
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {template.subjects.slice(0, 3).map((subject) => (
                                <span key={subject} className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                  {subject}
                                </span>
                              ))}
                              {template.subjects.length > 3 && (
                                <span className="text-xs text-muted-foreground">
                                  +{template.subjects.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mr-4">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-amber-400 mr-1" />
                              <span className="text-sm">{template.stats.rating || 0}</span>
                            </div>
                            <div className="flex items-center">
                              <Download className="h-4 w-4 text-muted-foreground mr-1" />
                              <span className="text-sm">{template.stats.installs}</span>
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
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button size="sm">Approve</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Other tabs would have similar content but with different sorting/filtering */}
                <TabsContent value="popular" className="mt-6">
                  {displayTemplates.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/20">
                      <div className="text-muted-foreground">No popular templates found</div>
                    </div>
                  ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {displayTemplates.map((template) => (
                        <MarketplaceTemplateCard
                          key={template.id}
                          template={template}
                          userRole="admin"
                          schoolId={schoolId}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="border rounded-md divide-y">{/* Similar list view as in "all" tab */}</div>
                  )}
                </TabsContent>

                {/* Similar content for other tabs */}
              </Tabs>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {displayTemplates.length} of {templates.length} templates
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
