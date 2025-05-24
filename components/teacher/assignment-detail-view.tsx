"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Calendar, FileText, Download, Edit, CheckCircle, XCircle, Clock } from "lucide-react"
import Link from "next/link"
import { TeacherSidebar } from "@/components/teacher/teacher-sidebar"
import { mockAssignments, mockStudents } from "@/lib/mock-teacher-data"
import type { Assignment, Student } from "@/lib/types"

interface AssignmentDetailViewProps {
  assignmentId: string
}

export function AssignmentDetailView({ assignmentId }: AssignmentDetailViewProps) {
  const [assignment, setAssignment] = useState<Assignment | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [selectedTab, setSelectedTab] = useState("overview")

  // Mock submission data
  const [submissions, setSubmissions] = useState<
    {
      studentId: string
      status: "submitted" | "late" | "missing"
      submittedAt?: Date
      grade?: number
      feedback?: string
    }[]
  >([])

  // Load assignment data
  useEffect(() => {
    const foundAssignment = mockAssignments.find((a) => a.id === assignmentId)
    if (foundAssignment) {
      setAssignment(foundAssignment)

      // Get students in this class
      const classStudents = mockStudents.filter(
        (student) => student.classes && student.classes.includes(foundAssignment.classId),
      )
      setStudents(classStudents)

      // Generate mock submissions
      const mockSubmissions = classStudents.map((student) => {
        const random = Math.random()
        if (random > 0.8) {
          return {
            studentId: student.id,
            status: "missing" as const,
          }
        } else if (random > 0.6) {
          return {
            studentId: student.id,
            status: "late" as const,
            submittedAt: new Date(new Date().getTime() - Math.random() * 86400000 * 3),
            grade: Math.floor(Math.random() * 30) + 70,
          }
        } else {
          return {
            studentId: student.id,
            status: "submitted" as const,
            submittedAt: new Date(new Date().getTime() - Math.random() * 86400000 * 5),
            grade: Math.floor(Math.random() * 20) + 80,
            feedback: random > 0.3 ? "Good work!" : undefined,
          }
        }
      })

      setSubmissions(mockSubmissions)
    }
  }, [assignmentId])

  // Calculate submission stats
  const submissionStats = {
    submitted: submissions.filter((s) => s.status === "submitted").length,
    late: submissions.filter((s) => s.status === "late").length,
    missing: submissions.filter((s) => s.status === "missing").length,
    graded: submissions.filter((s) => s.grade !== undefined).length,
    averageGrade:
      submissions.filter((s) => s.grade !== undefined).reduce((acc, s) => acc + (s.grade || 0), 0) /
      (submissions.filter((s) => s.grade !== undefined).length || 1),
  }

  if (!assignment) {
    return (
      <div className="flex min-h-screen">
        <TeacherSidebar />
        <div className="flex-1 p-6">
          <div className="flex items-center justify-center h-full">
            <p>Loading assignment data...</p>
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
          <Link href="/assignments" className="mr-4">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to assignments</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{assignment.title}</h1>
            <p className="text-muted-foreground">
              {assignment.className} | {assignment.type}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href={`/assignments/${assignmentId}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/assignments/${assignmentId}/grade`}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Grade
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Due Date</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{new Date(assignment.dueDate).toLocaleDateString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(assignment.dueDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Points</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{assignment.points}</div>
                  <p className="text-xs text-muted-foreground">Total possible points</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Submissions</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {submissionStats.submitted + submissionStats.late} / {students.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {submissionStats.late} late, {submissionStats.missing} missing
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{submissionStats.averageGrade.toFixed(1)}</div>
                  <p className="text-xs text-muted-foreground">
                    {submissionStats.graded} of {students.length} graded
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{assignment.description}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Attachments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assignment.attachments.length > 0 ? (
                      assignment.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{attachment.name}</span>
                            <span className="ml-2 text-xs text-muted-foreground">{attachment.size}</span>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">No attachments</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Submission Status</CardTitle>
                <CardDescription>Student submission progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Submitted: {submissionStats.submitted}</span>
                      <span>{Math.round((submissionStats.submitted / students.length) * 100)}%</span>
                    </div>
                    <Progress value={(submissionStats.submitted / students.length) * 100} className="bg-muted h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Late: {submissionStats.late}</span>
                      <span>{Math.round((submissionStats.late / students.length) * 100)}%</span>
                    </div>
                    <Progress value={(submissionStats.late / students.length) * 100} className="bg-yellow-200 h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Missing: {submissionStats.missing}</span>
                      <span>{Math.round((submissionStats.missing / students.length) * 100)}%</span>
                    </div>
                    <Progress value={(submissionStats.missing / students.length) * 100} className="bg-red-200 h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <CardTitle>Student Submissions</CardTitle>
                <CardDescription>View and manage student submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg divide-y">
                  {students.map((student) => {
                    const submission = submissions.find((s) => s.studentId === student.id)
                    return (
                      <div key={student.id} className="p-4 flex items-center">
                        <Avatar className="h-10 w-10 mr-4">
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={student.name} />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {submission?.status === "submitted" && (
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Submitted
                            </Badge>
                          )}
                          {submission?.status === "late" && (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                              <Clock className="h-3 w-3 mr-1" />
                              Late
                            </Badge>
                          )}
                          {submission?.status === "missing" && (
                            <Badge variant="outline" className="bg-red-100 text-red-800">
                              <XCircle className="h-3 w-3 mr-1" />
                              Missing
                            </Badge>
                          )}
                          {submission?.submittedAt && (
                            <span className="text-sm text-muted-foreground">
                              {new Date(submission.submittedAt).toLocaleDateString()}
                            </span>
                          )}
                          {submission?.grade !== undefined && (
                            <Badge variant="outline">
                              {submission.grade} / {assignment.points}
                            </Badge>
                          )}
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/assignments/${assignmentId}/submissions/${student.id}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades">
            <Card>
              <CardHeader>
                <CardTitle>Grades</CardTitle>
                <CardDescription>Manage student grades for this assignment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-medium">Student</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Submitted</th>
                        <th className="text-left p-3 font-medium">Grade</th>
                        <th className="text-left p-3 font-medium">Feedback</th>
                        <th className="text-left p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {students.map((student) => {
                        const submission = submissions.find((s) => s.studentId === student.id)
                        return (
                          <tr key={student.id}>
                            <td className="p-3">
                              <div className="font-medium">{student.name}</div>
                              <div className="text-xs text-muted-foreground">{student.email}</div>
                            </td>
                            <td className="p-3">
                              {submission?.status === "submitted" && (
                                <Badge variant="outline" className="bg-green-100 text-green-800">
                                  Submitted
                                </Badge>
                              )}
                              {submission?.status === "late" && (
                                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                                  Late
                                </Badge>
                              )}
                              {submission?.status === "missing" && (
                                <Badge variant="outline" className="bg-red-100 text-red-800">
                                  Missing
                                </Badge>
                              )}
                            </td>
                            <td className="p-3">
                              {submission?.submittedAt ? new Date(submission.submittedAt).toLocaleDateString() : "--"}
                            </td>
                            <td className="p-3">
                              {submission?.grade !== undefined ? `${submission.grade} / ${assignment.points}` : "--"}
                            </td>
                            <td className="p-3">{submission?.feedback || "--"}</td>
                            <td className="p-3">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/assignments/${assignmentId}/grade/${student.id}`}>Grade</Link>
                              </Button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
