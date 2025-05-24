"use client"

import { useState } from "react"
import { CalendarIcon, Clock, FileText, GraduationCap, Mail, User } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const statusMap = {
  pending: { label: "Pending", variant: "outline" as const },
  in_progress: { label: "In Progress", variant: "secondary" as const },
  approved: { label: "Approved", variant: "success" as const },
  rejected: { label: "Rejected", variant: "destructive" as const },
}

const subjectMap = {
  math: "Mathematics",
  science: "Science",
  english: "English",
  history: "History",
  art: "Art",
  music: "Music",
  pe: "Physical Education",
  other: "Other",
}

const gradeLevelMap = {
  k: "Kindergarten",
  "1": "1st Grade",
  "2": "2nd Grade",
  "3": "3rd Grade",
  "4": "4th Grade",
  "5": "5th Grade",
  "6": "6th Grade",
  "7": "7th Grade",
  "8": "8th Grade",
  "9": "9th Grade",
  "10": "10th Grade",
  "11": "11th Grade",
  "12": "12th Grade",
}

interface AdminRequestDetailsProps {
  request: {
    id: string
    title: string
    subject: string
    gradeLevel: string
    status: string
    submittedAt: string
    description: string
    neededBy: string | null
    feedback: string | null
    teacherId: string
    teacherName: string
    teacherEmail: string
  }
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdminRequestDetails({ request, open, onOpenChange }: AdminRequestDetailsProps) {
  const [status, setStatus] = useState(request.status)
  const [feedback, setFeedback] = useState(request.feedback || "")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleUpdateRequest = async () => {
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Request updated",
        description: "The template request has been updated successfully.",
      })

      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "The request could not be updated. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{request.title}</span>
            <Badge variant={statusMap[request.status as keyof typeof statusMap].variant}>
              {statusMap[request.status as keyof typeof statusMap].label}
            </Badge>
          </DialogTitle>
          <DialogDescription>Request ID: {request.id}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Teacher</p>
                <p className="text-sm text-muted-foreground">{request.teacherName}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{request.teacherEmail}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Subject</p>
                <p className="text-sm text-muted-foreground">
                  {subjectMap[request.subject as keyof typeof subjectMap]}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <GraduationCap className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Grade Level</p>
                <p className="text-sm text-muted-foreground">
                  {gradeLevelMap[request.gradeLevel as keyof typeof gradeLevelMap]}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Submitted On</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(request.submittedAt).toLocaleDateString()} at{" "}
                  {new Date(request.submittedAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
            {request.neededBy && (
              <div className="flex items-start gap-2">
                <CalendarIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Needed By</p>
                  <p className="text-sm text-muted-foreground">{new Date(request.neededBy).toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-2">Description</h4>
            <div className="rounded-md bg-muted p-3">
              <p className="text-sm whitespace-pre-wrap">{request.description}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <label htmlFor="status" className="text-sm font-medium">
                Update Status
              </label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status" className="mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="feedback" className="text-sm font-medium">
                Feedback to Teacher
              </label>
              <Textarea
                id="feedback"
                placeholder="Provide feedback on this template request..."
                className="mt-1 min-h-[120px]"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdateRequest} disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
