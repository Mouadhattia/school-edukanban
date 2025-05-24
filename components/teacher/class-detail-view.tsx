"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, FileText, CheckCircle, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { TeacherSidebar } from "@/components/teacher/teacher-sidebar"
import { mockClasses, mockStudents, mockAssignments } from "@/lib/mock-teacher-data"
import { StudentRosterManagement } from "@/components/teacher/student-roster-management"
import { AttendanceTracker } from "@/components/teacher/attendance-tracker"
import type { Class, Student, Assignment } from "@/lib/types"

interface ClassDetailViewProps {
  classId: string
}

export function ClassDetailView({ classId }: ClassDetailViewProps) {
  const [classData, setClassData] = useState<Class | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("overview")

  // Load class data
  useEffect(() => {
    const foundClass = mockClasses.find((c) => c.id === classId)
    if (foundClass) {
      setClassData(foundClass)

      // Get students in this class
      const classStudents = mockStudents.filter((student) => student.classes && student.classes.includes(classId))
      setStudents(classStudents)

      // Get assignments for this class
      const classAssignments = mockAssignments.filter((assignment) => assignment.classId === classId)
      setAssignments(classAssignments)
    }
  }, [classId])

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (!classData) {
    return (
      <div className="flex min-h-screen">
        <TeacherSidebar />
        <div className="flex-1 p-6">
          <div className="flex items-center justify-center h-full">
            <p>Loading class data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />
      <div className="flex-1 p-6">
        <div className="flex items-center mb-6">
          <Link href="/dashboard" className="mr-4">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to dashboard</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{classData.name}</h1>
            <p className="text-muted-foreground">
              {classData.grade} | {classData.subject} | {classData.period}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href={`/classes/${classId}/attendance`}>
                <Users className="mr-2 h-4 w-4" />
                Attendance
              </Link>
            </Button>
            <Button asChild>
              <Link href={`/classes/${classId}/assignments/create`}>
                <Plus className="mr-2 h-4 w-4" />
                Create Assignment
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{students.length}</div>
                  <p className="text-xs text-muted-foreground">Enrolled in this class</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{assignments.length}</div>
                  <p className="text-xs text-muted-foreground">Active assignments</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <p className="text-xs text-muted-foreground">Class average performance</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Schedule</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-md font-medium">
                    {classData.startTime} - {classData.endTime}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {classData.days?.join(", ")} | {classData.room}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Class Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{classData.description}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignments.length > 0 ? (
                      assignments
                        .filter((assignment) => new Date(assignment.dueDate) > new Date())
                        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                        .slice(0, 3)
                        .map((assignment) => (
                          <div key={assignment.id} className="flex items-center">
                            <div className="flex-1">
                              <h4 className="font-medium">{assignment.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                Due {new Date(assignment.dueDate).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant="outline">{assignment.type}</Badge>
                          </div>
                        ))
                    ) : (
                      <p className="text-muted-foreground">No upcoming assignments</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students">
            <StudentRosterManagement classId={classId} className={classData.name} />
          </TabsContent>

          <TabsContent value="assignments">
            <Card>
              <CardHeader>
                <CardTitle>Assignments</CardTitle>
                <CardDescription>Manage assignments for this class</CardDescription>
                <div className="mt-4 flex justify-end">
                  <Button asChild>
                    <Link href={`/classes/${classId}/assignments/create`}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Assignment
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg divide-y">
                  {assignments.length > 0 ? (
                    assignments.map((assignment) => (
                      <div key={assignment.id} className="p-4 flex items-center">
                        <div className="flex-1">
                          <h4 className="font-medium">{assignment.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Due {new Date(assignment.dueDate).toLocaleDateString()} | {assignment.points} points
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{assignment.type}</Badge>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/assignments/${assignment.id}`}>View</Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/assignments/${assignment.id}/edit`}>Edit</Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/assignments/${assignment.id}/grade`}>Grade</Link>
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-muted-foreground">No assignments found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <AttendanceTracker classId={classId} className={classData.name} students={students} />
          </TabsContent>

          <TabsContent value="grades">
            <Card>
              <CardHeader>
                <CardTitle>Grades</CardTitle>
                <CardDescription>View and manage student grades</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-medium">Student</th>
                        {assignments.map((assignment) => (
                          <th key={assignment.id} className="text-left p-3 font-medium">
                            {assignment.title}
                            <div className="text-xs font-normal text-muted-foreground">{assignment.points} pts</div>
                          </th>
                        ))}
                        <th className="text-left p-3 font-medium">Overall</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {students.map((student) => (
                        <tr key={student.id}>
                          <td className="p-3">
                            <div className="font-medium">{student.name}</div>
                            <div className="text-xs text-muted-foreground">{student.email}</div>
                          </td>
                          {assignments.map((assignment) => (
                            <td key={`${student.id}-${assignment.id}`} className="p-3">
                              <Button variant="ghost" size="sm">
                                Enter Grade
                              </Button>
                            </td>
                          ))}
                          <td className="p-3">
                            <div className="font-medium">--</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Resources</CardTitle>
                <CardDescription>Class materials and resources</CardDescription>
                <div className="mt-4 flex justify-end">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Resource
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg divide-y">
                  <div className="p-4 flex items-center">
                    <div className="flex-1">
                      <h4 className="font-medium">Class Syllabus</h4>
                      <p className="text-sm text-muted-foreground">PDF document | 1.2 MB</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="p-4 flex items-center">
                    <div className="flex-1">
                      <h4 className="font-medium">Lecture Slides</h4>
                      <p className="text-sm text-muted-foreground">PowerPoint presentation | 5.8 MB</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="p-4 flex items-center">
                    <div className="flex-1">
                      <h4 className="font-medium">Study Guide</h4>
                      <p className="text-sm text-muted-foreground">Word document | 0.8 MB</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
