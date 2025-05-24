"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Mail, Phone, Calendar, Clock, Edit, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Mock data for a single student
const mockStudentData = {
  "1": {
    id: "1",
    name: "Alex Johnson",
    email: "alex.j@school.edu",
    avatar: "/diverse-students-studying.png",
    grade: "10th",
    classes: ["Math 101", "Science 101", "English 101"],
    performance: 85,
    lastActive: "2 hours ago",
    status: "Active",
    phone: "(555) 123-4567",
    birthdate: "May 15, 2008",
    address: "123 School Lane, Education City, EC 12345",
    guardianName: "Sarah Johnson",
    guardianEmail: "sarah.j@example.com",
    guardianPhone: "(555) 987-6543",
    attendance: 95,
    assignments: [
      { id: "a1", title: "Math Quiz 1", grade: "A", score: 92, dueDate: "2023-09-15", status: "Completed" },
      { id: "a2", title: "Science Lab Report", grade: "B+", score: 88, dueDate: "2023-09-20", status: "Completed" },
      { id: "a3", title: "English Essay", grade: "Pending", score: null, dueDate: "2023-10-05", status: "In Progress" },
    ],
    notes: [
      {
        id: "n1",
        date: "2023-09-10",
        author: "Ms. Smith",
        content: "Alex is showing great improvement in problem-solving skills.",
      },
      {
        id: "n2",
        date: "2023-08-25",
        author: "Mr. Davis",
        content: "Participated actively in class discussion today.",
      },
    ],
    recentActivity: [
      { id: "ra1", date: "2023-09-22", action: "Submitted assignment", details: "English Essay draft" },
      { id: "ra2", date: "2023-09-21", action: "Viewed resource", details: "Science textbook chapter 3" },
      { id: "ra3", date: "2023-09-20", action: "Completed quiz", details: "Math Quiz 1 with score 92%" },
    ],
  },
  "2": {
    id: "2",
    name: "Jamie Smith",
    email: "jamie.s@school.edu",
    avatar: "/diverse-students-studying.png",
    grade: "10th",
    classes: ["Math 101", "History 101"],
    performance: 92,
    lastActive: "1 day ago",
    status: "Active",
    phone: "(555) 234-5678",
    birthdate: "June 22, 2008",
    address: "456 Learning Ave, Education City, EC 12345",
    guardianName: "Michael Smith",
    guardianEmail: "michael.s@example.com",
    guardianPhone: "(555) 876-5432",
    attendance: 98,
    assignments: [
      { id: "a1", title: "Math Quiz 1", grade: "A+", score: 98, dueDate: "2023-09-15", status: "Completed" },
      { id: "a2", title: "History Essay", grade: "A", score: 94, dueDate: "2023-09-18", status: "Completed" },
      { id: "a3", title: "Math Project", grade: "Pending", score: null, dueDate: "2023-10-10", status: "Not Started" },
    ],
    notes: [
      { id: "n1", date: "2023-09-12", author: "Ms. Smith", content: "Jamie continues to excel in mathematics." },
      { id: "n2", date: "2023-08-30", author: "Mr. Wilson", content: "Shows great interest in historical topics." },
    ],
    recentActivity: [
      { id: "ra1", date: "2023-09-21", action: "Viewed assignment", details: "Math Project details" },
      { id: "ra2", date: "2023-09-19", action: "Downloaded resource", details: "History reference materials" },
      { id: "ra3", date: "2023-09-18", action: "Submitted assignment", details: "History Essay final version" },
    ],
  },
  // Add more students as needed with the same structure
}

export function StudentProfileView({ studentId }) {
  const router = useRouter()
  const { toast } = useToast()
  const [student, setStudent] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use our mock data
    const studentData = mockStudentData[studentId] || mockStudentData["1"]
    setStudent(studentData)
  }, [studentId])

  if (!student) {
    return <div>Loading student profile...</div>
  }

  const handleSendMessage = () => {
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${student.name}.`,
    })
  }

  const handleDownloadReport = () => {
    toast({
      title: "Report Generated",
      description: "Student progress report is being generated. It will be available for download shortly.",
    })
  }

  const handleShareProfile = () => {
    toast({
      title: "Share Link Created",
      description: "A secure link to this student's profile has been copied to your clipboard.",
    })
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

  const getAssignmentStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-blue-100 text-blue-800"
      case "Not Started":
        return "bg-gray-100 text-gray-800"
      case "Late":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header with back button and student info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border">
              <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{student.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Badge variant="outline" className={`${getStatusColor(student.status)} text-white`}>
                  {student.status}
                </Badge>
                <span>{student.grade} Grade</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleSendMessage}>
            <Mail className="mr-2 h-4 w-4" />
            Message
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadReport}>
            <Download className="mr-2 h-4 w-4" />
            Report
          </Button>
          <Button variant="outline" size="sm" onClick={handleShareProfile}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{student.performance}%</div>
                <Progress value={student.performance} className={`mt-2 ${getPerformanceColor(student.performance)}`} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{student.attendance}%</div>
                <Progress value={student.attendance} className="mt-2 bg-blue-500" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{student.classes.length}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {student.classes.map((cls, index) => (
                    <Badge key={index} variant="secondary">
                      {cls}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Student and guardian contact details</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-semibold">Student</h3>
                <div className="grid grid-cols-[20px_1fr] items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{student.email}</span>
                </div>
                <div className="grid grid-cols-[20px_1fr] items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{student.phone}</span>
                </div>
                <div className="grid grid-cols-[20px_1fr] items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{student.birthdate}</span>
                </div>
                <div className="grid grid-cols-[20px_1fr] items-start gap-2">
                  <div className="mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <span>{student.address}</span>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">Guardian</h3>
                <div className="grid grid-cols-[20px_1fr] items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>{student.guardianName}</span>
                </div>
                <div className="grid grid-cols-[20px_1fr] items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{student.guardianEmail}</span>
                </div>
                <div className="grid grid-cols-[20px_1fr] items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{student.guardianPhone}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Student's recent actions and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignments</CardTitle>
              <CardDescription>Student's assignment history and upcoming work</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.assignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">Due: {assignment.dueDate}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={getAssignmentStatusColor(assignment.status)}>{assignment.status}</Badge>
                      <div className="text-right">
                        <p className="font-medium">{assignment.grade || "—"}</p>
                        <p className="text-sm text-muted-foreground">
                          {assignment.score ? `${assignment.score}%` : "Not graded"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Assignments
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Student's attendance record</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Overall Attendance</p>
                    <p className="text-sm text-muted-foreground">School year 2023-2024</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{student.attendance}%</p>
                  </div>
                </div>
                <Progress value={student.attendance} className="bg-blue-500" />

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Present</div>
                    <div className="text-2xl font-bold">42 days</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Absent</div>
                    <div className="text-2xl font-bold">2 days</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Late</div>
                    <div className="text-2xl font-bold">3 days</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Excused</div>
                    <div className="text-2xl font-bold">1 day</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View Detailed Attendance
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Teacher Notes</CardTitle>
                <CardDescription>Notes and observations about this student</CardDescription>
              </div>
              <Button size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Add Note
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student.notes.map((note) => (
                  <div key={note.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{note.author}</p>
                      <p className="text-sm text-muted-foreground">{note.date}</p>
                    </div>
                    <p>{note.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Notes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
