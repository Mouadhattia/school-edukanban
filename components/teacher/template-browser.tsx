"use client"

import { useState } from "react"
import { Search, Filter, Grid, List, BookmarkPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { getMarketplaceTemplates } from "@/lib/data"
import type { Template } from "@/lib/types"

interface TemplateBrowserProps {
  schoolId: string
  teacherId: string
}

export function TemplateBrowser({ schoolId, teacherId }: TemplateBrowserProps) {
  const [templates, setTemplates] = useState<Template[]>(getMarketplaceTemplates())
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid" | "trial">("all")
  const [isFilterOpen, setIsFilterOpen] = useState(true)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isRequestOpen, setIsRequestOpen] = useState(false)
  const [requestReason, setRequestReason] = useState("")
  const [requestSuccess, setRequestSuccess] = useState(false)

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

    return matchesSearch && matchesSubjects && matchesLevels && matchesPrice
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

  const handlePreviewTemplate = (template: Template) => {
    setSelectedTemplate(template)
    setIsPreviewOpen(true)
  }

  const handleRequestTemplate = (template: Template) => {
    setSelectedTemplate(template)
    setIsRequestOpen(true)
    setRequestSuccess(false)
  }

  const submitTemplateRequest = () => {
    // In a real application, this would send the request to the backend
    console.log("Requesting template:", selectedTemplate?.id)
    console.log("Reason:", requestReason)

    // Simulate success
    setRequestSuccess(true)
    setRequestReason("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Template Library</h2>
          <p className="text-muted-foreground">Browse and request curriculum templates for your classroom</p>
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
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">All Templates</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredTemplates.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/20">
                  <div className="text-muted-foreground">No templates found matching your criteria</div>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTemplates.map((template) => (
                    <Card key={template.id} className="overflow-hidden flex flex-col h-full">
                      <div className={`h-2 ${template.color}`} />
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{template.title}</CardTitle>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            {template.pricing.type === "free"
                              ? "Free"
                              : template.pricing.type === "trial"
                                ? "Free Trial"
                                : `$${template.pricing.price?.toFixed(2)}`}
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2 mt-1">{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 flex-grow">
                        <div className="aspect-video rounded-md border overflow-hidden mb-3">
                          <img
                            src={template.previewImage || "/placeholder.svg?height=150&width=300"}
                            alt={template.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {template.educationLevels.map((level) => (
                            <Badge key={level} variant="outline" className="bg-blue-100 text-blue-800 capitalize">
                              {level}
                            </Badge>
                          ))}
                          {template.subjects.slice(0, 2).map((subject) => (
                            <Badge key={subject} variant="outline" className="bg-purple-100 text-purple-800 capitalize">
                              {subject}
                            </Badge>
                          ))}
                          {template.subjects.length > 2 && (
                            <Badge variant="outline" className="bg-purple-100 text-purple-800">
                              +{template.subjects.length - 2}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/placeholder.svg?height=24&width=24" alt={template.designerName} />
                            <AvatarFallback>{template.designerName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{template.designerName}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 border-t mt-auto">
                        <div className="flex gap-2 w-full">
                          <Button variant="outline" className="flex-1" onClick={() => handlePreviewTemplate(template)}>
                            Preview
                          </Button>
                          <Button className="flex-1" onClick={() => handleRequestTemplate(template)}>
                            <BookmarkPlus className="mr-2 h-4 w-4" />
                            Request
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
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
                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => handlePreviewTemplate(template)}>
                            Preview
                          </Button>
                          <Button onClick={() => handleRequestTemplate(template)}>Request</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Other tabs would have similar content but with different sorting/filtering */}
            <TabsContent value="popular" className="space-y-4">
              {/* Similar content as "all" tab but sorted by popularity */}
            </TabsContent>
            <TabsContent value="new" className="space-y-4">
              {/* Similar content as "all" tab but sorted by date */}
            </TabsContent>
            <TabsContent value="recommended" className="space-y-4">
              {/* Similar content as "all" tab but filtered for recommendations */}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{selectedTemplate?.title}</DialogTitle>
            <DialogDescription>{selectedTemplate?.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-video rounded-md border overflow-hidden">
              <img
                src={selectedTemplate?.previewImage || "/placeholder.svg?height=300&width=600"}
                alt={selectedTemplate?.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedTemplate?.educationLevels.map((level) => (
                <Badge key={level} variant="outline" className="bg-blue-100 text-blue-800 capitalize">
                  {level} School
                </Badge>
              ))}
              {selectedTemplate?.subjects.map((subject) => (
                <Badge key={subject} variant="outline" className="bg-purple-100 text-purple-800 capitalize">
                  {subject}
                </Badge>
              ))}
            </div>
            <div>
              <h3 className="font-medium mb-2">Pricing</h3>
              <p>
                {selectedTemplate?.pricing.type === "free"
                  ? "Free"
                  : selectedTemplate?.pricing.type === "trial"
                    ? "Free Trial"
                    : `$${selectedTemplate?.pricing.price?.toFixed(2)}`}
              </p>
              {selectedTemplate?.pricing.type === "trial" && (
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                  <li>{selectedTemplate.pricing.trialPeriod} day trial</li>
                  <li>Up to {selectedTemplate.pricing.trialInstances} boards</li>
                  <li>Max {selectedTemplate.pricing.maxStudents} students</li>
                </ul>
              )}
              {selectedTemplate?.pricing.type === "paid" && (
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                  <li>One-time purchase</li>
                  <li>Unlimited boards</li>
                  <li>Unlimited students</li>
                  <li>Free updates</li>
                </ul>
              )}
            </div>
            <div>
              <h3 className="font-medium mb-2">Template Contents</h3>
              <p className="text-sm text-muted-foreground">
                This template includes pre-configured columns, sample tasks, and educational workflows designed for{" "}
                {selectedTemplate?.subjects.join(", ")} curriculum.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setIsPreviewOpen(false)
                handleRequestTemplate(selectedTemplate!)
              }}
            >
              Request Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Dialog */}
      <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request Template</DialogTitle>
            <DialogDescription>
              {requestSuccess
                ? "Your request has been submitted to the administrator for approval"
                : "Submit a request to your administrator to approve this template"}
            </DialogDescription>
          </DialogHeader>

          {!requestSuccess ? (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-md">
                <h3 className="font-medium">{selectedTemplate?.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{selectedTemplate?.description}</p>
                <div className="flex items-center mt-2">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    {selectedTemplate?.pricing.type === "free"
                      ? "Free"
                      : selectedTemplate?.pricing.type === "trial"
                        ? "Free Trial"
                        : `$${selectedTemplate?.pricing.price?.toFixed(2)}`}
                  </Badge>
                </div>
              </div>

              {selectedTemplate?.pricing.type === "paid" && (
                <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50 rounded-r-md">
                  <p className="text-sm font-medium">This is a paid template</p>
                  <p className="text-sm text-muted-foreground">
                    Your administrator will need to approve the purchase of this template.
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Request</Label>
                <textarea
                  id="reason"
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  placeholder="Explain why you need this template for your classroom..."
                  value={requestReason}
                  onChange={(e) => setRequestReason(e.target.value)}
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRequestOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={submitTemplateRequest}>Submit Request</Button>
              </DialogFooter>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center p-6">
                <div className="rounded-full bg-green-100 p-3">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-medium">Request Submitted</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your administrator will review your request and notify you when it's approved.
                </p>
              </div>

              <DialogFooter>
                <Button onClick={() => setIsRequestOpen(false)}>Close</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
