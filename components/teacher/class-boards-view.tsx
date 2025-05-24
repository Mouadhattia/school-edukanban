"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, BookOpen, LayoutGrid, List } from "lucide-react"
import { Input } from "@/components/ui/input"
import { BoardCard } from "@/components/shared/board-card"
import { CreateBoardDialog } from "@/components/shared/create-board-dialog"
import { useToast } from "@/hooks/use-toast"
import type { Board, Template } from "@/lib/types"
// Add PublishBoardDialog import
import { PublishBoardDialog } from "@/components/shared/publish-board-dialog"

// Mock data for classes - in a real app, this would come from an API
const classes = [
  {
    id: "class-1",
    name: "Physics 101",
    subject: "Physics",
    grade: "11",
    period: "1",
    room: "SCI-201",
    studentCount: 28,
    color: "bg-blue-500",
    description: "Introduction to Physics concepts",
    teacherId: "teacher-1",
  },
  {
    id: "class-2",
    name: "Chemistry 101",
    subject: "Chemistry",
    grade: "10",
    period: "3",
    room: "SCI-101",
    studentCount: 24,
    color: "bg-green-500",
    description: "Introduction to Chemistry",
    teacherId: "teacher-1",
  },
  {
    id: "class-3",
    name: "Biology 201",
    subject: "Biology",
    grade: "12",
    period: "5",
    room: "SCI-301",
    studentCount: 22,
    color: "bg-purple-500",
    description: "Advanced Biology concepts",
    teacherId: "teacher-1",
  },
]

// Mock data for boards - in a real app, this would come from an API
const mockBoards: Board[] = [
  {
    id: "board-1",
    title: "Physics 101 - Spring Semester",
    description: "Track assignments and projects for Physics 101",
    createdAt: new Date("2025-01-15"),
    ownerId: "teacher-1",
    ownerName: "Dr. Smith",
    schoolId: "school-1",
    classId: "class-1",
    shared: true,
    color: "bg-green-500",
    templateId: "template-1",
    status: "published",
  },
  {
    id: "board-2",
    title: "Chemistry Lab Activities",
    description: "Organize and track chemistry lab experiments and reports",
    createdAt: new Date("2025-02-10"),
    ownerId: "teacher-1",
    ownerName: "Dr. Smith",
    schoolId: "school-1",
    classId: "class-2",
    shared: true,
    color: "bg-blue-500",
    templateId: "template-2",
    status: "published",
  },
  {
    id: "board-3",
    title: "Physics Homework Tracker",
    description: "Track progress on weekly physics assignments",
    createdAt: new Date("2025-03-05"),
    ownerId: "teacher-1",
    ownerName: "Dr. Smith",
    schoolId: "school-1",
    classId: "class-1",
    shared: false,
    color: "bg-purple-500",
    status: "draft",
  },
  {
    id: "board-4",
    title: "Biology Research Projects",
    description: "Track biology research projects",
    createdAt: new Date("2025-01-20"),
    ownerId: "teacher-1",
    ownerName: "Dr. Smith",
    schoolId: "school-1",
    classId: "class-3",
    shared: true,
    color: "bg-yellow-500",
    status: "draft",
  },
]

// Mock data for templates - in a real app, this would come from an API
const mockTemplates: Template[] = [
  {
    id: "template-1",
    title: "Science Curriculum for High School",
    description:
      "A comprehensive science curriculum covering physics, chemistry, and biology concepts for high school students",
    createdAt: new Date("2025-01-10"),
    updatedAt: new Date("2025-02-15"),
    designerId: "user-1",
    designerName: "Jane Cooper",
    organizationId: "org-1",
    previewImage: "/placeholder.svg?height=200&width=300",
    color: "bg-green-500",
    educationLevels: ["high"],
    subjects: ["science", "physics", "chemistry", "biology"],
    pricing: {
      type: "free",
    },
    status: "published",
    visibility: "public",
    stats: {
      views: 1250,
      installs: 87,
      activeInstances: 62,
      rating: 4.7,
      schoolsUsing: 15,
      revenue: 0,
    },
    versions: [
      {
        version: "1.0.0",
        releaseDate: new Date("2025-01-10"),
        changes: ["Initial release"],
      },
    ],
    isPurchased: true,
  },
  {
    id: "template-2",
    title: "Chemistry Lab Activities",
    description: "Template for organizing and tracking high school chemistry lab experiments and reports",
    createdAt: new Date("2025-02-05"),
    updatedAt: new Date("2025-02-05"),
    designerId: "user-1",
    designerName: "Jane Cooper",
    organizationId: "org-1",
    previewImage: "/placeholder.svg?height=200&width=300",
    color: "bg-blue-500",
    educationLevels: ["high"],
    subjects: ["chemistry", "science"],
    pricing: {
      type: "free",
    },
    status: "published",
    visibility: "public",
    stats: {
      views: 850,
      installs: 42,
      activeInstances: 38,
      rating: 4.5,
      schoolsUsing: 8,
      revenue: 0,
    },
    versions: [
      {
        version: "1.0.0",
        releaseDate: new Date("2025-02-05"),
        changes: ["Initial release"],
      },
    ],
    isPurchased: true,
  },
  {
    id: "template-3",
    title: "Biology Research Projects",
    description: "Template for managing biology research projects",
    createdAt: new Date("2025-03-01"),
    updatedAt: new Date("2025-03-01"),
    designerId: "user-2",
    designerName: "Alex Rodriguez",
    organizationId: "org-1",
    previewImage: "/placeholder.svg?height=200&width=300",
    color: "bg-yellow-500",
    educationLevels: ["high"],
    subjects: ["biology", "science"],
    pricing: {
      type: "free",
    },
    status: "published",
    visibility: "public",
    stats: {
      views: 620,
      installs: 28,
      activeInstances: 22,
      rating: 4.2,
      schoolsUsing: 5,
      revenue: 0,
    },
    versions: [
      {
        version: "1.0.0",
        releaseDate: new Date("2025-03-01"),
        changes: ["Initial release"],
      },
    ],
    isPurchased: true,
  },
]

interface ClassBoardsViewProps {
  schoolId?: string
}

export function ClassBoardsView({ schoolId = "school-1" }: ClassBoardsViewProps) {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [activeTab, setActiveTab] = useState("boards")
  const { toast } = useToast()
  // Add this state inside the component
  const [boardToPublish, setBoardToPublish] = useState<string | null>(null)

  // Filter boards by selected class
  const filteredBoards = mockBoards.filter(
    (board) =>
      (!selectedClass || board.classId === selectedClass) &&
      (board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        board.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Filter templates by subject of selected class
  const selectedClassData = selectedClass ? classes.find((c) => c.id === selectedClass) : null

  const filteredTemplates = mockTemplates.filter(
    (template) =>
      !selectedClass ||
      template.subjects.includes(selectedClassData?.subject.toLowerCase() || "") ||
      template.subjects.includes("science"), // Include general science templates
  )

  // Filter to only purchased templates
  const purchasedTemplates = filteredTemplates.filter((template) => template.isPurchased)

  const handleCreateBoard = (boardData: any) => {
    // In a real app, this would call an API to create the board
    let successMessage = `${boardData.title} has been created`

    if (boardData.classId && boardData.classId !== "none") {
      const classData = classes.find((c) => c.id === boardData.classId)
      if (classData) {
        successMessage += ` for ${classData.name}`
      }
    }

    if (boardData.columns) {
      successMessage += ` with ${boardData.columns.length} columns`
    } else if (boardData.templateId) {
      successMessage += ` from template`
    } else if (boardData.fromJsonFile) {
      successMessage += ` from uploaded JSON`
    }

    toast({
      title: "Board created",
      description: successMessage,
    })
    setIsCreateDialogOpen(false)
  }

  const handleUseTemplate = (template: Template) => {
    setIsCreateDialogOpen(true)
    // In a real app, we would pre-populate the create dialog with template data
  }

  // Add this handler function
  const handlePublishBoard = (boardId: string) => {
    // Check if the board has a class assigned
    const board = mockBoards.find((b) => b.id === boardId)

    if (board && board.classId) {
      // If already assigned to a class, publish directly
      // In a real app, this would call an API to update the board
      toast({
        title: "Board Published",
        description: `${board.title} has been published and is now available to students.`,
      })
    } else {
      // If not assigned to a class, open dialog to select one
      setBoardToPublish(boardId)
    }
  }

  // Add this handler function
  const handleConfirmPublish = (classId: string) => {
    if (!boardToPublish) return

    // In a real app, this would call an API to update the board
    const board = mockBoards.find((b) => b.id === boardToPublish)
    const className = classes.find((c) => c.id === classId)?.name

    toast({
      title: "Board Published",
      description: `${board?.title} has been published to ${className} and is now available to students.`,
    })

    setBoardToPublish(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Class Boards</h2>
          <p className="text-muted-foreground">Manage boards for your classes</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border rounded-md p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8 p-0"
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Board
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Class selection sidebar */}
        <div className="w-full md:w-64 space-y-4">
          <div className="font-medium">Classes</div>
          <div className="space-y-2">
            <Button
              variant={selectedClass === null ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedClass(null)}
            >
              All Classes
            </Button>
            {classes.map((cls) => (
              <Button
                key={cls.id}
                variant={selectedClass === cls.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedClass(cls.id)}
              >
                <div className={`w-2 h-2 rounded-full ${cls.color} mr-2`} />
                {cls.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="boards">Boards</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                </TabsList>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder={`Search ${activeTab}...`}
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <TabsContent value="boards" className="mt-4">
                {filteredBoards.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/20">
                    <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Boards Found</h3>
                    <p className="text-muted-foreground mb-4 max-w-md">
                      {searchQuery
                        ? "No boards match your search criteria. Try a different search term."
                        : selectedClass
                          ? "This class doesn't have any boards yet. Create a board to get started."
                          : "You don't have any boards yet. Create a board to get started."}
                    </p>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Board
                    </Button>
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredBoards.map((board) => (
                      <BoardCard key={board.id} board={board} userRole="teacher" onPublish={handlePublishBoard} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredBoards.map((board) => {
                      const boardClass = classes.find((c) => c.id === board.classId)
                      return (
                        <Card key={board.id}>
                          <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={`w-1 h-12 ${board.color} rounded-full mr-4`} />
                              <div>
                                <h3 className="font-medium">{board.title}</h3>
                                <p className="text-sm text-muted-foreground">{board.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {boardClass && (
                                <div className={`px-2 py-1 rounded-full text-xs ${boardClass.color} bg-opacity-20`}>
                                  {boardClass.name}
                                </div>
                              )}
                              <Button variant="outline" size="sm" asChild>
                                <a href={`/board/${board.id}`}>Open</a>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="templates" className="mt-4">
                {filteredTemplates.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/20">
                    <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Templates Found</h3>
                    <p className="text-muted-foreground mb-4 max-w-md">
                      {searchQuery
                        ? "No templates match your search criteria. Try a different search term."
                        : selectedClass
                          ? "No templates available for this class subject."
                          : "No templates available."}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTemplates.map((template) => (
                      <Card key={template.id}>
                        <CardHeader className="pb-2">
                          <div className={`h-2 ${template.color} rounded-full mb-2`} />
                          <CardTitle className="text-lg">{template.title}</CardTitle>
                          <CardDescription>{template.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {template.subjects.map((subject) => (
                              <div key={subject} className="px-2 py-1 bg-muted rounded-full text-xs">
                                {subject}
                              </div>
                            ))}
                          </div>
                          <Button className="w-full" onClick={() => handleUseTemplate(template)}>
                            Use Template
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <CreateBoardDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreateBoard={handleCreateBoard}
        classes={classes}
        selectedClassId={selectedClass}
        templates={purchasedTemplates}
      />
      <PublishBoardDialog
        isOpen={!!boardToPublish}
        onClose={() => setBoardToPublish(null)}
        onPublish={handleConfirmPublish}
        classes={classes}
      />
    </div>
  )
}
