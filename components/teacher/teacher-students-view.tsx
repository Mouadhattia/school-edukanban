"use client"

import { useState, useEffect } from "react"
import { Search, Filter, UserPlus, Download, Grid, List } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AddStudentDialog } from "@/components/admin/add-student-dialog"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock data for students
const mockStudents = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.j@school.edu",
    avatar: "/diverse-students-studying.png",
    grade: "10th",
    classes: ["Math 101", "Science 101", "English 101"],
    performance: 85,
    lastActive: "2 hours ago",
    status: "Active",
  },
  {
    id: "2",
    name: "Jamie Smith",
    email: "jamie.s@school.edu",
    avatar: "/diverse-students-studying.png",
    grade: "10th",
    classes: ["Math 101", "History 101"],
    performance: 92,
    lastActive: "1 day ago",
    status: "Active",
  },
  {
    id: "3",
    name: "Taylor Wilson",
    email: "taylor.w@school.edu",
    avatar: "/diverse-students-studying.png",
    grade: "10th",
    classes: ["Science 101", "English 101"],
    performance: 78,
    lastActive: "3 days ago",
    status: "Inactive",
  },
  {
    id: "4",
    name: "Morgan Lee",
    email: "morgan.l@school.edu",
    avatar: "/diverse-students-studying.png",
    grade: "10th",
    classes: ["Math 101", "Science 101", "History 101"],
    performance: 88,
    lastActive: "5 hours ago",
    status: "Active",
  },
  {
    id: "5",
    name: "Casey Brown",
    email: "casey.b@school.edu",
    avatar: "/diverse-students-studying.png",
    grade: "10th",
    classes: ["English 101", "History 101"],
    performance: 65,
    lastActive: "1 week ago",
    status: "At Risk",
  },
  {
    id: "6",
    name: "Riley Davis",
    email: "riley.d@school.edu",
    avatar: "/diverse-students-studying.png",
    grade: "10th",
    classes: ["Math 101", "Science 101"],
    performance: 95,
    lastActive: "Yesterday",
    status: "Active",
  },
]

// Mock data for classes
const mockClasses = [
  { id: "1", name: "Math 101" },
  { id: "2", name: "Science 101" },
  { id: "3", name: "English 101" },
  { id: "4", name: "History 101" },
]

// Mock data for boards
const mockBoards = [
  { id: "1", name: "Math Fundamentals" },
  { id: "2", name: "Science Projects" },
  { id: "3", name: "Essay Writing" },
  { id: "4", name: "Historical Timeline" },
]

export function TeacherStudentsView() {
  const router = useRouter()
  const { toast } = useToast()
  const [view, setView] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClass, setSelectedClass] = useState("all")
  const [selectedBoard, setSelectedBoard] = useState("all")
  const [filteredStudents, setFilteredStudents] = useState(mockStudents)
  const [activeTab, setActiveTab] = useState("all")
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    let result = mockStudents

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by class
    if (selectedClass !== "all") {
      result = result.filter((student) => student.classes.includes(selectedClass))
    }

    // Filter by board
    if (selectedBoard !== "all") {
      // This is just a simulation - in a real app, you'd have actual board assignments
      result = result.filter((student) => student.id.charCodeAt(0) % 2 === 0)
    }

    // Filter by status tab
    if (activeTab !== "all") {
      const statusMap = {
        active: "Active",
        inactive: "Inactive",
        "at-risk": "At Risk",
      }
      result = result.filter((student) => student.status === statusMap[activeTab])
    }

    setFilteredStudents(result)
  }, [searchQuery, selectedClass, selectedBoard, activeTab])

  const handleAddStudent = (newStudent) => {
    const studentWithId = {
      id: `student-${Date.now()}`,
      name: newStudent.name,
      email: newStudent.email,
      grade: `${newStudent.grade}th`,
      avatar: "/diverse-students-studying.png",
      classes: ["Math 101"],
      performance: 85,
      lastActive: "Just now",
      status: "Active",
    }

    // Add the new student to the list
    setFilteredStudents([studentWithId, ...filteredStudents])

    // Show success toast
    toast({
      title: "Student Added",
      description: `${newStudent.name} has been added successfully.`,
    })

    // Close the dialog
    setIsAddStudentOpen(false)
  }

  const handleViewProfile = (student) => {
    // Navigate to student profile page
    router.push(`/teacher/students/${student.id}`)
  }

  const handleMessage = (student) => {
    setSelectedStudent(student)
    setIsMessageDialogOpen(true)
  }

  const handleSendMessage = () => {
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${selectedStudent.name}.`,
    })
    setIsMessageDialogOpen(false)
  }

  const handleExport = () => {
    setIsExportDialogOpen(true)
  }

  const handleConfirmExport = () => {
    toast({
      title: "Export Started",
      description: "Student data is being exported. You'll receive a download link shortly.",
    })
    setIsExportDialogOpen(false)
  }

  const handleDeleteStudent = (student) => {
    setSelectedStudent(student)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteStudent = () => {
    // Remove the student from the list
    setFilteredStudents(filteredStudents.filter((s) => s.id !== selectedStudent.id))

    toast({
      title: "Student Removed",
      description: `${selectedStudent.name} has been removed from your class.`,
      variant: "destructive",
    })

    setIsDeleteDialogOpen(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-500"
      case "Inactive":
        return "bg-gray-500"
      case "At Risk":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return "bg-green-500"
    if (performance >= 80) return "bg-blue-500"
    if (performance >= 70) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="hidden md:flex gap-1">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button variant="outline" size="sm" className="hidden md:flex gap-1" onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="gap-1" onClick={() => setIsAddStudentOpen(true)}>
            <UserPlus className="h-4 w-4" />
            Add Student
          </Button>
          <div className="border rounded-md flex">
            <Button
              variant={view === "grid" ? "default" : "ghost"}
              size="sm"
              className="rounded-none rounded-l-md"
              onClick={() => setView("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="sm"
              className="rounded-none rounded-r-md"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-48">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {mockClasses.map((cls) => (
                <SelectItem key={cls.id} value={cls.name}>
                  {cls.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-48">
          <Select value={selectedBoard} onValueChange={setSelectedBoard}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by board" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Boards</SelectItem>
              {mockBoards.map((board) => (
                <SelectItem key={board.id} value={board.id}>
                  {board.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Students</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="at-risk">At Risk</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-6">
          {filteredStudents.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="rounded-full bg-muted p-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No students found</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedClass("all")
                  setSelectedBoard("all")
                  setActiveTab("all")
                }}
                variant="outline"
                className="mt-4"
              >
                Reset filters
              </Button>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map((student) => (
                <Card key={student.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border">
                          <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{student.name}</CardTitle>
                          <CardDescription className="text-xs">{student.email}</CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge
                          variant="outline"
                          className={`text-xs px-2 py-0 rounded-full ${getStatusColor(student.status)} text-white`}
                        >
                          {student.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground mt-1">{student.lastActive}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Performance</span>
                        <span className="text-sm font-medium">{student.performance}%</span>
                      </div>
                      <Progress value={student.performance} className={getPerformanceColor(student.performance)} />
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Classes</h4>
                      <ScrollArea className="h-12">
                        <div className="flex flex-wrap gap-1">
                          {student.classes.map((cls, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {cls}
                            </Badge>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => handleViewProfile(student)}>
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleMessage(student)}>
                      Message
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Classes</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-xs text-muted-foreground">{student.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-[150px]">
                          {student.classes.map((cls, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {cls}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={student.performance}
                            className={`w-16 ${getPerformanceColor(student.performance)}`}
                          />
                          <span>{student.performance}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getStatusColor(student.status)} text-white`}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{student.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewProfile(student)}>
                            View
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleMessage(student)}>
                            Message
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteStudent(student)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            Remove
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Student Dialog */}
      <AddStudentDialog isOpen={isAddStudentOpen} onClose={() => setIsAddStudentOpen(false)} onAdd={handleAddStudent} />

      {/* Export Dialog */}
      <AlertDialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Export Student Data</AlertDialogTitle>
            <AlertDialogDescription>
              This will export data for {filteredStudents.length} students. Choose your export format:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button variant="outline" onClick={handleConfirmExport}>
              CSV Format
            </Button>
            <Button variant="outline" onClick={handleConfirmExport}>
              Excel Format
            </Button>
            <Button variant="outline" onClick={handleConfirmExport}>
              PDF Format
            </Button>
            <Button variant="outline" onClick={handleConfirmExport}>
              Google Sheets
            </Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Message Dialog */}
      {selectedStudent && (
        <AlertDialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Message to {selectedStudent.name}</AlertDialogTitle>
              <AlertDialogDescription>Send a direct message to this student or their guardian.</AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid gap-4 py-4">
              <Select defaultValue="student">
                <SelectTrigger>
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="guardian">Guardian</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Subject" />
              <textarea
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Type your message here..."
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSendMessage}>Send Message</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedStudent && (
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove Student</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to remove {selectedStudent.name} from your class? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteStudent} className="bg-red-500 hover:bg-red-600">
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
