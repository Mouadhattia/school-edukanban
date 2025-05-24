"use client"

import { useState } from "react"
import { Search, Grid, List, Download, Upload, Users, Lock, Unlock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getMarketplaceTemplates } from "@/lib/data"
import type { Template } from "@/lib/types"

interface AdminTemplatesProps {
  schoolId: string
}

export function AdminTemplates({ schoolId }: AdminTemplatesProps) {
  const [templates, setTemplates] = useState<Template[]>(getMarketplaceTemplates())
  const [purchasedTemplates, setPurchasedTemplates] = useState<Template[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false)
  const [isAccessDialogOpen, setIsAccessDialogOpen] = useState(false)
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])

  // Sample teachers data
  const teachers = [
    { id: "teacher-1", name: "Dr. Smith", subject: "Physics" },
    { id: "teacher-2", name: "Prof. Johnson", subject: "Biology" },
    { id: "teacher-3", name: "Mrs. Williams", subject: "Mathematics" },
    { id: "teacher-4", name: "Mr. Davis", subject: "English" },
    { id: "teacher-5", name: "Ms. Rodriguez", subject: "Chemistry" },
    { id: "teacher-6", name: "Dr. Patel", subject: "Computer Science" },
  ]

  // Filter templates based on search query
  const filteredTemplates = templates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filter purchased templates based on search query
  const filteredPurchasedTemplates = purchasedTemplates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handlePurchaseTemplate = (template: Template) => {
    setSelectedTemplate(template)
    setIsPurchaseDialogOpen(true)
  }

  const confirmPurchase = () => {
    if (selectedTemplate) {
      // Add the template to purchased templates
      setPurchasedTemplates([...purchasedTemplates, selectedTemplate])

      // Remove from available templates
      setTemplates(templates.filter((t) => t.id !== selectedTemplate.id))
    }
    setIsPurchaseDialogOpen(false)
  }

  const handleManageAccess = (template: Template) => {
    setSelectedTemplate(template)
    setSelectedTeachers(template.accessGranted || [])
    setIsAccessDialogOpen(true)
  }

  const toggleTeacherAccess = (teacherId: string) => {
    if (selectedTeachers.includes(teacherId)) {
      setSelectedTeachers(selectedTeachers.filter((id) => id !== teacherId))
    } else {
      setSelectedTeachers([...selectedTeachers, teacherId])
    }
  }

  const saveAccessSettings = () => {
    if (selectedTemplate) {
      // Update the template with the new access settings
      const updatedTemplates = purchasedTemplates.map((template) =>
        template.id === selectedTemplate.id ? { ...template, accessGranted: selectedTeachers } : template,
      )
      setPurchasedTemplates(updatedTemplates)
    }
    setIsAccessDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Template Management</h2>
          <p className="text-muted-foreground">Purchase and manage curriculum templates for your school</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
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

      <Tabs defaultValue="marketplace" className="space-y-6">
        <TabsList>
          <TabsTrigger value="marketplace">Template Marketplace</TabsTrigger>
          <TabsTrigger value="purchased">Purchased Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Available Templates</CardTitle>
              <CardDescription>Browse and purchase curriculum templates from designers</CardDescription>
            </CardHeader>
            <CardContent>
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
                        <Button className="w-full" onClick={() => handlePurchaseTemplate(template)}>
                          Purchase Template
                        </Button>
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
                        <Button onClick={() => handlePurchaseTemplate(template)}>Purchase</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchased" className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Purchased Templates</CardTitle>
              <CardDescription>Manage access to templates for your teachers</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredPurchasedTemplates.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/20">
                  <div className="text-muted-foreground">No purchased templates yet</div>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => document.querySelector('[value="marketplace"]')?.click()}
                  >
                    Browse Template Marketplace
                  </Button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPurchasedTemplates.map((template) => (
                    <Card key={template.id} className="overflow-hidden flex flex-col h-full">
                      <div className={`h-2 ${template.color}`} />
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{template.title}</CardTitle>
                          <Badge variant="outline" className="flex items-center gap-1">
                            {template.accessGranted && template.accessGranted.length > 0 ? (
                              <>
                                <Unlock className="h-3 w-3" />
                                <span>{template.accessGranted.length} teachers</span>
                              </>
                            ) : (
                              <>
                                <Lock className="h-3 w-3" />
                                <span>No access</span>
                              </>
                            )}
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
                        </div>
                        {template.accessGranted && template.accessGranted.length > 0 && (
                          <div className="flex -space-x-2 mt-2">
                            {template.accessGranted.slice(0, 3).map((teacherId) => {
                              const teacher = teachers.find((t) => t.id === teacherId)
                              return (
                                <Avatar key={teacherId} className="h-6 w-6 border-2 border-background">
                                  <AvatarFallback>{teacher?.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              )
                            })}
                            {template.accessGranted.length > 3 && (
                              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs">
                                +{template.accessGranted.length - 3}
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="p-4 pt-0 border-t mt-auto">
                        <Button className="w-full" onClick={() => handleManageAccess(template)}>
                          <Users className="mr-2 h-4 w-4" />
                          Manage Teacher Access
                        </Button>
                      </CardFooter>
                    </Card>
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
                      <div className="flex items-center gap-2 mr-4">
                        <Badge variant="outline" className="flex items-center gap-1">
                          {template.accessGranted && template.accessGranted.length > 0 ? (
                            <>
                              <Unlock className="h-3 w-3" />
                              <span>{template.accessGranted.length} teachers</span>
                            </>
                          ) : (
                            <>
                              <Lock className="h-3 w-3" />
                              <span>No access</span>
                            </>
                          )}
                        </Badge>
                      </div>
                      <Button onClick={() => handleManageAccess(template)}>
                        <Users className="mr-2 h-4 w-4" />
                        Manage Access
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Purchase Confirmation Dialog */}
      <Dialog open={isPurchaseDialogOpen} onOpenChange={setIsPurchaseDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Purchase Template</DialogTitle>
            <DialogDescription>Confirm your purchase of this template for your school</DialogDescription>
          </DialogHeader>

          {selectedTemplate && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-md">
                <h3 className="font-medium">{selectedTemplate.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{selectedTemplate.description}</p>
                <div className="flex items-center mt-2">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    {selectedTemplate.pricing.type === "free"
                      ? "Free"
                      : selectedTemplate.pricing.type === "trial"
                        ? "Free Trial"
                        : `$${selectedTemplate.pricing.price?.toFixed(2)}`}
                  </Badge>
                </div>
              </div>

              {selectedTemplate.pricing.type === "paid" && (
                <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50 rounded-r-md">
                  <p className="text-sm font-medium">This is a paid template</p>
                  <p className="text-sm text-muted-foreground">
                    Your school will be charged ${selectedTemplate.pricing.price?.toFixed(2)} for using this template.
                  </p>
                </div>
              )}

              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-md">
                <p className="text-sm font-medium">After purchase:</p>
                <p className="text-sm text-muted-foreground">
                  You'll need to grant access to specific teachers who can use this template.
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPurchaseDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmPurchase}>Confirm Purchase</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Teacher Access Dialog */}
      <Dialog open={isAccessDialogOpen} onOpenChange={setIsAccessDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Manage Teacher Access</DialogTitle>
            <DialogDescription>Select which teachers can use this template</DialogDescription>
          </DialogHeader>

          {selectedTemplate && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-md">
                <h3 className="font-medium">{selectedTemplate.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{selectedTemplate.description}</p>
              </div>

              <div className="border rounded-md">
                <div className="p-3 border-b bg-muted/50">
                  <h4 className="font-medium">Teachers</h4>
                </div>
                <ScrollArea className="h-[200px]">
                  <div className="p-4 space-y-3">
                    {teachers.map((teacher) => (
                      <div key={teacher.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`teacher-${teacher.id}`}
                          checked={selectedTeachers.includes(teacher.id)}
                          onCheckedChange={() => toggleTeacherAccess(teacher.id)}
                        />
                        <Label htmlFor={`teacher-${teacher.id}`} className="flex items-center gap-2 cursor-pointer">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{teacher.name}</div>
                            <div className="text-xs text-muted-foreground">{teacher.subject}</div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{selectedTeachers.length} teachers selected</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    selectedTeachers.length === teachers.length
                      ? setSelectedTeachers([])
                      : setSelectedTeachers(teachers.map((t) => t.id))
                  }
                >
                  {selectedTeachers.length === teachers.length ? "Deselect All" : "Select All"}
                </Button>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAccessDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveAccessSettings}>Save Access Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
