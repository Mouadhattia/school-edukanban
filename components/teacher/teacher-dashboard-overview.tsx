"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActionButton } from "@/components/ui/action-button"
import { BoardCard } from "@/components/shared/board-card"
import { getTeacherBoards, getSharedBoards } from "@/lib/data"
import { Plus, Users, BookOpen, ClipboardList, School } from "lucide-react"
import { ClassroomInsightsDashboard } from "./classroom-insights-dashboard"
import { CreateBoardDialog } from "@/components/shared/create-board-dialog"
import type { Board, Template, Class, School as SchoolType } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { PublishBoardDialog } from "@/components/shared/publish-board-dialog"
import { Badge } from "@/components/ui/badge"

// Mock data for purchased templates
const purchasedTemplates: Template[] = [
  {
    id: "template-1",
    title: "Science Curriculum for High School",
    description: "A comprehensive science curriculum covering physics, chemistry, and biology concepts",
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
    description: "Template for organizing and tracking high school chemistry lab experiments",
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
]

// Mock data for classes
const classes: Class[] = [
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

// Add mock schools data
const mockSchools: SchoolType[] = [
  { id: "school-1", name: "Lincoln High School", logo: "/placeholder.svg?height=40&width=40", address: "123 Main St" },
  {
    id: "school-2",
    name: "Washington Elementary",
    logo: "/placeholder.svg?height=40&width=40",
    address: "456 Oak Ave",
  },
  {
    id: "school-3",
    name: "Jefferson Middle School",
    logo: "/placeholder.svg?height=40&width=40",
    address: "789 Pine Rd",
  },
]

// Update the TeacherDashboardOverview component to handle school selection
export function TeacherDashboardOverview() {
  const router = useRouter()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedSchool, setSelectedSchool] = useState<string>("")
  const [boards, setBoards] = useState<Board[]>([])
  const [sharedBoards, setSharedBoards] = useState<Board[]>([])
  const { toast } = useToast()
  const [boardToPublish, setBoardToPublish] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("recent-boards")

  // On initial load, get the default school from localStorage or use the first school
  useEffect(() => {
    const defaultSchool = localStorage.getItem("defaultSchool") || mockSchools[0].id
    setSelectedSchool(defaultSchool)
  }, [])

  // Update boards when selected school changes
  useEffect(() => {
    if (selectedSchool) {
      setBoards(getTeacherBoards(selectedSchool))
      setSharedBoards(getSharedBoards(selectedSchool))
    }
  }, [selectedSchool])

  // Group boards by class
  const boardsByClass = classes.map((cls) => {
    const classBoards = boards.filter((board) => board.classId === cls.id)
    return {
      class: cls,
      boards: classBoards,
      draftCount: classBoards.filter((board) => board.status === "draft").length,
      publishedCount: classBoards.filter((board) => board.status === "published").length,
    }
  })

  // Get boards without a class
  const unassignedBoards = boards.filter((board) => !board.classId)

  const handlePublishBoard = (boardId: string) => {
    // Check if the board has a class assigned
    const board = boards.find((b) => b.id === boardId)

    if (board && board.classId) {
      // If already assigned to a class, publish directly
      setBoards(boards.map((b) => (b.id === boardId ? { ...b, status: "published" } : b)))

      toast({
        title: "Board Published",
        description: `${board.title} has been published and is now available to students.`,
      })
    } else {
      // If not assigned to a class, open dialog to select one
      setBoardToPublish(boardId)
    }
  }

  const handleConfirmPublish = (classId: string) => {
    if (!boardToPublish) return

    // Update the board with class and published status
    setBoards(boards.map((b) => (b.id === boardToPublish ? { ...b, classId, status: "published" } : b)))

    const board = boards.find((b) => b.id === boardToPublish)
    const className = classes.find((c) => c.id === classId)?.name

    toast({
      title: "Board Published",
      description: `${board?.title} has been published to ${className} and is now available to students.`,
    })

    setBoardToPublish(null)
  }

  const handleCreateBoard = (board: any) => {
    const newBoard: Board = {
      ...board,
      id: `board-${Date.now()}`,
      createdAt: new Date(),
      ownerId: "teacher-1",
      ownerName: "Dr. Smith",
      schoolId: selectedSchool,
      boardModel: board.boardModel,
      status: "draft", // Set initial status as draft
    }

    setBoards([newBoard, ...boards])
    setIsCreateDialogOpen(false)

    let successMessage = `${newBoard.title} has been created successfully`

    if (board.classId && board.classId !== "none") {
      const classData = classes.find((c) => c.id === board.classId)
      if (classData) {
        successMessage += ` for ${classData.name}`
      }
    }

    if (board.columns) {
      successMessage += ` with ${board.columns.length} columns`
    } else if (board.templateId) {
      successMessage += ` from template`
    } else if (board.fromJsonFile) {
      successMessage += ` from uploaded JSON`
    }

    toast({
      title: "Board created",
      description: successMessage,
    })
  }

  const handleBoardClick = (boardId: string) => {
    const board = boards.find((b) => b.id === boardId) || sharedBoards.find((b) => b.id === boardId)
    if (board && board.boardModel) {
      router.push(`/board/${boardId}?model=${board.boardModel}`)
    } else {
      router.push(`/board/${boardId}`)
    }
  }

  const recentBoards = boards.slice(0, 3)
  const recentSharedBoards = sharedBoards.slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your teaching activities at{" "}
            {mockSchools.find((s) => s.id === selectedSchool)?.name}.
          </p>
        </div>
        <ActionButton onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Board
        </ActionButton>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">Across {classes.length} classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classes.length}</div>
            <p className="text-xs text-muted-foreground">2 in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">2 due today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Boards</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{boards.filter((b) => b.status === "draft").length}</div>
            <p className="text-xs text-muted-foreground">Waiting to be published</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent-boards">Recent Boards</TabsTrigger>
          <TabsTrigger value="class-boards">Boards by Class</TabsTrigger>
          <TabsTrigger value="shared-boards">Shared With Me</TabsTrigger>
          <TabsTrigger value="analytics">Quick Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="recent-boards" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentBoards.map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                userRole="teacher"
                onClick={() => handleBoardClick(board.id)}
                onPublish={handlePublishBoard}
              />
            ))}
            {recentBoards.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <p className="mb-2 text-muted-foreground">You don't have any boards yet</p>
                  <ActionButton onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Board
                  </ActionButton>
                </CardContent>
              </Card>
            )}
          </div>
          {recentBoards.length > 0 && (
            <div className="flex justify-center">
              <ActionButton variant="outline" action="navigate" path="/teacher/boards">
                View All Boards
              </ActionButton>
            </div>
          )}
        </TabsContent>

        <TabsContent value="class-boards" className="space-y-6">
          {/* Unassigned boards section */}
          {unassignedBoards.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Unassigned Boards</h3>
                <Badge variant="outline" className="bg-muted">
                  {unassignedBoards.length} {unassignedBoards.length === 1 ? "board" : "boards"}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {unassignedBoards.map((board) => (
                  <BoardCard
                    key={board.id}
                    board={board}
                    userRole="teacher"
                    onClick={() => handleBoardClick(board.id)}
                    onPublish={handlePublishBoard}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Boards by class */}
          {boardsByClass.map(({ class: cls, boards, draftCount, publishedCount }) => (
            <div key={cls.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${cls.color}`}></div>
                  <h3 className="text-lg font-medium">{cls.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  {draftCount > 0 && (
                    <Badge variant="outline" className="bg-amber-100 text-amber-800">
                      {draftCount} Draft{draftCount !== 1 && "s"}
                    </Badge>
                  )}
                  {publishedCount > 0 && (
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      {publishedCount} Published
                    </Badge>
                  )}
                  {boards.length === 0 && (
                    <Badge variant="outline" className="bg-muted">
                      No boards
                    </Badge>
                  )}
                </div>
              </div>

              {boards.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {boards.map((board) => (
                    <BoardCard
                      key={board.id}
                      board={board}
                      userRole="teacher"
                      onClick={() => handleBoardClick(board.id)}
                      onPublish={handlePublishBoard}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-6">
                    <p className="mb-2 text-muted-foreground">No boards for this class yet</p>
                    <ActionButton
                      onClick={() => {
                        setIsCreateDialogOpen(true)
                      }}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Board for {cls.name}
                    </ActionButton>
                  </CardContent>
                </Card>
              )}
            </div>
          ))}
        </TabsContent>

        <TabsContent value="shared-boards" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentSharedBoards.map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                userRole="teacher"
                onClick={() => handleBoardClick(board.id)}
                onPublish={handlePublishBoard}
              />
            ))}
            {recentSharedBoards.length === 0 && (
              <Card className="col-span-full">
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <p className="text-muted-foreground">No boards have been shared with you yet</p>
                </CardContent>
              </Card>
            )}
          </div>
          {recentSharedBoards.length > 0 && (
            <div className="flex justify-center">
              <ActionButton variant="outline" action="navigate" path="/teacher/boards?tab=shared">
                View All Shared Boards
              </ActionButton>
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Class Performance Overview</CardTitle>
              <CardDescription>Quick view of student performance across your classes</CardDescription>
            </CardHeader>
            <CardContent>
              <ClassroomInsightsDashboard simplified />
            </CardContent>
          </Card>
          <div className="flex justify-center">
            <ActionButton variant="outline" action="navigate" path="/teacher/analytics">
              View Detailed Analytics
            </ActionButton>
          </div>
        </TabsContent>
      </Tabs>

      <CreateBoardDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreateBoard={handleCreateBoard}
        classes={classes}
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
