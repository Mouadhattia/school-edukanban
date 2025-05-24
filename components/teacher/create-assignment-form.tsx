"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ArrowLeft, Upload, X, FileText } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import { TeacherSidebar } from "@/components/teacher/teacher-sidebar"
import { mockClasses } from "@/lib/mock-teacher-data"

export function CreateAssignmentForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [classId, setClassId] = useState("")
  const [dueDate, setDueDate] = useState<Date>()
  const [points, setPoints] = useState("100")
  const [type, setType] = useState("")
  const [attachments, setAttachments] = useState<{ name: string; size: string }[]>([])
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleAddAttachment = () => {
    // In a real app, this would open a file picker
    // For now, we'll just add a mock attachment
    const mockAttachments = [
      { name: "Assignment_Instructions.pdf", size: "1.2 MB" },
      { name: "Rubric.pdf", size: "0.5 MB" },
      { name: "Example.docx", size: "0.8 MB" },
      { name: "Data_Set.xlsx", size: "1.5 MB" },
    ]

    const randomAttachment = mockAttachments[Math.floor(Math.random() * mockAttachments.length)]
    if (!attachments.some((a) => a.name === randomAttachment.name)) {
      setAttachments([...attachments, randomAttachment])
    }
  }

  const handleRemoveAttachment = (name: string) => {
    setAttachments(attachments.filter((a) => a.name !== name))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit the form data to the server
    console.log({
      title,
      description,
      classId,
      dueDate,
      points,
      type,
      attachments,
    })

    // Redirect to assignments page
    window.location.href = "/assignments"
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
            <h1 className="text-3xl font-bold">Create Assignment</h1>
            <p className="text-muted-foreground">Create a new assignment for your class</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
              <CardDescription>Enter the details for the new assignment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Assignment Title</Label>
                <Input
                  id="title"
                  placeholder="Enter assignment title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter assignment description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="class">Class</Label>
                  <Select value={classId} onValueChange={setClassId} required>
                    <SelectTrigger id="class">
                      <SelectValue placeholder="Select a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockClasses.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Assignment Type</Label>
                  <Select value={type} onValueChange={setType} required>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select assignment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homework">Homework</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="test">Test</SelectItem>
                      <SelectItem value="project">Project</SelectItem>
                      <SelectItem value="essay">Essay</SelectItem>
                      <SelectItem value="lab">Lab Report</SelectItem>
                      <SelectItem value="presentation">Presentation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal" id="dueDate">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dueDate ? format(dueDate, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dueDate}
                        onSelect={(date) => {
                          setDueDate(date)
                          setIsCalendarOpen(false)
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="points">Points</Label>
                  <Input
                    id="points"
                    type="number"
                    min="0"
                    placeholder="Enter point value"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Attachments</Label>
                <div className="border rounded-lg p-4">
                  <div className="space-y-4">
                    {attachments.length > 0 && (
                      <div className="space-y-2">
                        {attachments.map((attachment) => (
                          <div
                            key={attachment.name}
                            className="flex items-center justify-between p-2 border rounded-md"
                          >
                            <div className="flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{attachment.name}</span>
                              <span className="ml-2 text-xs text-muted-foreground">{attachment.size}</span>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveAttachment(attachment.name)}>
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <Button type="button" variant="outline" className="w-full" onClick={handleAddAttachment}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Files
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" asChild>
                <Link href="/assignments">Cancel</Link>
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" type="button">
                  Save as Draft
                </Button>
                <Button type="submit">Create Assignment</Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}
