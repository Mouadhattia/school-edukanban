"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, FileText, CheckCircle, XCircle, Clock } from "lucide-react"
import Link from "next/link"
import { TeacherSidebar } from "@/components/teacher/teacher-sidebar"
import { mockAssignments, mockStudents } from "@/lib/mock-teacher-data"
import type { Assignment, Student } from "@/lib/types"

interface GradeAssignmentFormProps {
  assignmentId: string
  studentId: string
}

export function GradeAssignmentForm({ assignmentId, studentId }: GradeAssignmentFormProps) {
  const [assignment, setAssignment] = useState<Assignment | null>(null)
  const [student, setStudent] = useState<Student | null>(null)
  const [grade, setGrade] = useState("")
  const [feedback, setFeedback] = useState("")
  const [selectedTab, setSelectedTab] = useState("grade")

  // Mock submission data
  const [submission, setSubmission] = useState<{
    status: "submitted" | "late" | "missing"
    submittedAt?: Date
    files?: { name: string; size: string }[]
    comments?: string
  } | null>(null)

  // Load data
  useEffect(() => {
    const foundAssignment = mockAssignments.find((a) => a.id === assignmentId)
    const foundStudent = mockStudents.find((s) => s.id === studentId)

    if (foundAssignment) {
      setAssignment(foundAssignment)
    }

    if (foundStudent) {
      setStudent(foundStudent)
    }

    // Generate mock submission
    const random = Math.random()
    if (random > 0.8) {
      setSubmission({
        status: "missing",
      })
    } else if (random > 0.6) {
      setSubmission({
        status: "late",
        submittedAt: new Date(new Date().getTime() - Math.random() * 86400000 * 3),
        files: [
          { name: "Assignment_Submission.pdf", size: "1.5 MB" },
          { name: "Data_Analysis.xlsx", size: "0.8 MB" },
        ],
        comments: "Sorry for the late submission. I had some technical issues.",
      })
      setGrade(String(Math.floor(Math.random() * 30) + 70))
      setFeedback("Good work, but please try to submit on time.")
    } else {
      setSubmission({
        status: "submitted",
        submittedAt: new Date(new Date().getTime() - Math.random() * 86400000 * 5),
        files: [
          { name: "Assignment_Submission.pdf", size: "1.5 MB" },
          { name: "Data_Analysis.xlsx", size: "0.8 MB" },
          { name: "References.docx", size: "0.3 MB" },
        ],
        comments: "I've completed all the required tasks and included my analysis.",
      })
      setGrade(String(Math.floor(Math.random() * 20) + 80))
      setFeedback("Excellent work! Your analysis was thorough and well-presented.")
    }
  }, [assignmentId, studentId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the grade to the server
    console.log({
      assignmentId,
      studentId,
      grade,
      feedback,
    })

    // Redirect to assignment page
    window.location.href = `/assignments/${assignmentId}`
  }

  if (!assignment || !student) {
    return (
      <div className="flex min-h-screen">
        <TeacherSidebar />
        <div className="flex-1 p-6">
          <div className="flex items-center justify-center h-full">
            <p>Loading data...</p>
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
          <Link href={`/assignments/${assignmentId}`} className="mr-4">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to assignment</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Grade Assignment</h1>
            <p className="text-muted-foreground">
              {assignment.title} | {student.name}
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Title</h3>
                  <p>{assignment.title}</p>
                </div>
                <div>
                  <h3 className="font-medium">Class</h3>
                  <p>{assignment.className}</p>
                </div>
                <div>
                  <h3 className="font-medium">Due Date</h3>
                  <p>{new Date(assignment.dueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="font-medium">Points</h3>
                  <p>{assignment.points}</p>
                </div>
                <div>
                  <h3 className="font-medium">Type</h3>
                  <p>{assignment.type}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Name</h3>
                  <p>{student.name}</p>
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p>{student.email}</p>
                </div>
                <div>
                  <h3 className="font-medium">Grade Level</h3>
                  <p>{student.grade}</p>
                </div>
                <div>
                  <h3 className="font-medium">Submission Status</h3>
                  <div className="mt-1">
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
                  </div>
                </div>
                {submission?.submittedAt && (
                  <div>
                    <h3 className="font-medium">Submitted On</h3>
                    <p>{new Date(submission.submittedAt).toLocaleString()}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Grade Submission</CardTitle>
                <CardDescription>Review and grade the student's submission</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="grade" value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="submission">Submission</TabsTrigger>
                    <TabsTrigger value="grade">Grade</TabsTrigger>
                  </TabsList>

                  <TabsContent value="submission">
                    {submission?.status === "missing" ? (
                      <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/20">
                        <XCircle className="h-12 w-12 text-red-500 mb-4" />
                        <h3 className="text-xl font-medium mb-2">No Submission</h3>
                        <p className="text-muted-foreground mb-4">
                          This student has not submitted this assignment yet.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {submission?.files && submission.files.length > 0 && (
                          <div className="space-y-2">
                            <h3 className="font-medium">Submitted Files</h3>
                            <div className="space-y-2">
                              {submission.files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                                  <div className="flex items-center">
                                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span>{file.name}</span>
                                    <span className="ml-2 text-xs text-muted-foreground">{file.size}</span>
                                  </div>
                                  <Button variant="ghost" size="icon">
                                    <Download className="h-4 w-4" />
                                    <span className="sr-only">Download</span>
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {submission?.comments && (
                          <div className="space-y-2">
                            <h3 className="font-medium">Student Comments</h3>
                            <div className="p-4 border rounded-md bg-muted/20">
                              <p>{submission.comments}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="grade">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="grade">Grade (out of {assignment.points})</Label>
                        <Input
                          id="grade"
                          type="number"
                          min="0"
                          max={assignment.points}
                          placeholder={`Enter grade (0-${assignment.points})`}
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                          required={submission?.status !== "missing"}
                          disabled={submission?.status === "missing"}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="feedback">Feedback</Label>
                        <Textarea
                          id="feedback"
                          placeholder="Enter feedback for the student"
                          rows={6}
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          disabled={submission?.status === "missing"}
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" type="button" asChild>
                          <Link href={`/assignments/${assignmentId}`}>Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={submission?.status === "missing"}>
                          Save Grade
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
