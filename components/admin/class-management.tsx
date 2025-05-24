"use client"

import { useState } from "react"
import { Plus, Search, Filter, School, Users, BookOpen, MoreHorizontal, Edit, Trash, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreateClassDialog } from "@/components/admin/create-class-dialog"
import { AssignBoardDialog } from "@/components/admin/assign-board-dialog"
import { AssignStudentsDialog } from "@/components/admin/assign-students-dialog"
import { AssignTeachersDialog } from "@/components/admin/assign-teachers-dialog"

interface Class {
  id: string
  name: string
  type: "traditional" | "specialized"
  grade?: string
  subject?: string
  teacherCount: number
  studentCount: number
  boardCount: number
  startDate?: Date
  endDate?: Date
  status: "active" | "scheduled" | "completed" | "archived"
}

export function ClassManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isAssignBoardDialogOpen, setIsAssignBoardDialogOpen] = useState(false)
  const [isAssignStudentsDialogOpen, setIsAssignStudentsDialogOpen] = useState(false)
  const [isAssignTeachersDialogOpen, setIsAssignTeachersDialogOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState<Class | null>(null)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  // Sample classes data
  const [classes, setClasses] = useState<Class[]>([
    {
      id: "class-1",
      name: "Grade 5A",
      type: "traditional",
      grade: "5",
      teacherCount: 6,
      studentCount: 28,
      boardCount: 5,
      status: "active",
    },
    {
      id: "class-2",
      name: "Grade 5B",
      type: "traditional",
      grade: "5",
      teacherCount: 6,
      studentCount: 26,
      boardCount: 5,
      status: "active",
    },
    {
      id: "class-3",
      name: "Advanced Spanish - Evening",
      type: "specialized",
      subject: "Spanish",
      teacherCount: 1,
      studentCount: 12,
      boardCount: 1,
      startDate: new Date("2025-03-15"),
      endDate: new Date("2025-06-15"),
      status: "active",
    },
    {
      id: "class-4",
      name: "Introduction to Programming",
      type: "specialized",
      subject: "Computer Science",
      teacherCount: 1,
      studentCount: 15,
      boardCount: 1,
      startDate: new Date("2025-04-01"),
      endDate: new Date("2025-07-01"),
      status: "scheduled",
    },
    {
      id: "class-5",
      name: "Grade 4C",
      type: "traditional",
      grade: "4",
      teacherCount: 5,
      studentCount: 24,
      boardCount: 4,
      status: "active",
    },
  ])

  const handleCreateClass = (newClass: Omit<Class, "id" | "teacherCount" | "studentCount" | "boardCount">) => {
    const classWithId: Class = {
      ...newClass,
      id: `class-${Date.now()}`,
      teacherCount: 0,
      studentCount: 0,
      boardCount: 0,
    }

    setClasses([classWithId, ...classes])
    setIsCreateDialogOpen(false)
  }

  const handleAssignBoard = (classId: string, boardIds: string[]) => {
    // In a real app, this would update the class-board associations in the database
    setClasses(classes.map((c) => (c.id === classId ? { ...c, boardCount: c.boardCount + boardIds.length } : c)))
    setIsAssignBoardDialogOpen(false)
  }

  const handleAssignStudents = (classId: string, studentIds: string[]) => {
    // In a real app, this would update the class-student associations in the database
    setClasses(classes.map((c) => (c.id === classId ? { ...c, studentCount: c.studentCount + studentIds.length } : c)))
    setIsAssignStudentsDialogOpen(false)
  }

  const handleAssignTeachers = (classId: string, teacherIds: string[]) => {
    // In a real app, this would update the class-teacher associations in the database
    setClasses(classes.map((c) => (c.id === classId ? { ...c, teacherCount: c.teacherCount + teacherIds.length } : c)))
    setIsAssignTeachersDialogOpen(false)
  }

  const handleDeleteClass = (classId: string) => {
    setClasses(classes.filter((c) => c.id !== classId))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search classes..." className="w-full pl-8" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Class
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Classes</TabsTrigger>
          <TabsTrigger value="traditional">Traditional Classes</TabsTrigger>
          <TabsTrigger value="specialized">Specialized Courses</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Teachers</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Boards</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((cls) => (
                <TableRow key={cls.id}>
                  <TableCell className="font-medium">{cls.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        cls.type === "traditional" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                      }
                    >
                      {cls.type === "traditional" ? "Traditional" : "Specialized"}
                    </Badge>
                  </TableCell>
                  <TableCell>{cls.teacherCount}</TableCell>
                  <TableCell>{cls.studentCount}</TableCell>
                  <TableCell>{cls.boardCount}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        cls.status === "active"
                          ? "bg-green-100 text-green-800"
                          : cls.status === "scheduled"
                            ? "bg-amber-100 text-amber-800"
                            : cls.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                      }
                    >
                      {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <a href={`/admin/classes/${cls.id}/boards`}>
                            <BookOpen className="mr-2 h-4 w-4" />
                            View Boards
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedClass(cls)
                            setIsAssignBoardDialogOpen(true)
                          }}
                        >
                          <BookOpen className="mr-2 h-4 w-4" />
                          Assign Boards
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedClass(cls)
                            setIsAssignStudentsDialogOpen(true)
                          }}
                        >
                          <Users className="mr-2 h-4 w-4" />
                          Assign Students
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedClass(cls)
                            setIsAssignTeachersDialogOpen(true)
                          }}
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          Assign Teachers
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Class
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteClass(cls.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Class
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="traditional" className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Teachers</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Boards</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes
                .filter((cls) => cls.type === "traditional")
                .map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell className="font-medium">{cls.name}</TableCell>
                    <TableCell>{cls.grade}</TableCell>
                    <TableCell>{cls.teacherCount}</TableCell>
                    <TableCell>{cls.studentCount}</TableCell>
                    <TableCell>{cls.boardCount}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          cls.status === "active"
                            ? "bg-green-100 text-green-800"
                            : cls.status === "scheduled"
                              ? "bg-amber-100 text-amber-800"
                              : cls.status === "completed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                        }
                      >
                        {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <a href={`/admin/classes/${cls.id}/boards`}>
                              <BookOpen className="mr-2 h-4 w-4" />
                              View Boards
                            </a>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedClass(cls)
                              setIsAssignBoardDialogOpen(true)
                            }}
                          >
                            <BookOpen className="mr-2 h-4 w-4" />
                            Assign Boards
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedClass(cls)
                              setIsAssignStudentsDialogOpen(true)
                            }}
                          >
                            <Users className="mr-2 h-4 w-4" />
                            Assign Students
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedClass(cls)
                              setIsAssignTeachersDialogOpen(true)
                            }}
                          >
                            <UserPlus className="mr-2 h-4 w-4" />
                            Assign Teachers
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Class
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteClass(cls.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete Class
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="specialized" className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes
                .filter((cls) => cls.type === "specialized")
                .map((cls) => (
                  <TableRow key={cls.id}>
                    <TableCell className="font-medium">{cls.name}</TableCell>
                    <TableCell>{cls.subject}</TableCell>
                    <TableCell>{cls.teacherCount}</TableCell>
                    <TableCell>{cls.studentCount}</TableCell>
                    <TableCell>{cls.startDate?.toLocaleDateString()}</TableCell>
                    <TableCell>{cls.endDate?.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          cls.status === "active"
                            ? "bg-green-100 text-green-800"
                            : cls.status === "scheduled"
                              ? "bg-amber-100 text-amber-800"
                              : cls.status === "completed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                        }
                      >
                        {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <a href={`/admin/classes/${cls.id}/boards`}>
                              <BookOpen className="mr-2 h-4 w-4" />
                              View Board
                            </a>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedClass(cls)
                              setIsAssignBoardDialogOpen(true)
                            }}
                          >
                            <BookOpen className="mr-2 h-4 w-4" />
                            Assign Board
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedClass(cls)
                              setIsAssignStudentsDialogOpen(true)
                            }}
                          >
                            <Users className="mr-2 h-4 w-4" />
                            Assign Students
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedClass(cls)
                              setIsAssignTeachersDialogOpen(true)
                            }}
                          >
                            <UserPlus className="mr-2 h-4 w-4" />
                            Assign Teacher
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Course
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteClass(cls.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete Course
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="archived" className="space-y-6">
          <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/20">
            <School className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No Archived Classes</h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              When you archive classes, they will appear here for future reference.
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <CreateClassDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreateClass={handleCreateClass}
      />

      {selectedClass && (
        <>
          <AssignBoardDialog
            isOpen={isAssignBoardDialogOpen}
            onClose={() => setIsAssignBoardDialogOpen(false)}
            onAssign={(boardIds) => handleAssignBoard(selectedClass.id, boardIds)}
            classData={selectedClass}
          />

          <AssignStudentsDialog
            isOpen={isAssignStudentsDialogOpen}
            onClose={() => setIsAssignStudentsDialogOpen(false)}
            onAssign={(studentIds) => handleAssignStudents(selectedClass.id, studentIds)}
            classData={selectedClass}
          />

          <AssignTeachersDialog
            isOpen={isAssignTeachersDialogOpen}
            onClose={() => setIsAssignTeachersDialogOpen(false)}
            onAssign={(teacherIds) => handleAssignTeachers(selectedClass.id, teacherIds)}
            classData={selectedClass}
          />
        </>
      )}
    </div>
  )
}
