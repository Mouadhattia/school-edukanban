"use client"

import { useState } from "react"
import { Search, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AdminRequestDetails } from "./admin-request-details"

// Mock data for template requests (same as in my-template-requests.tsx)
const mockTemplateRequests = [
  {
    id: "req-1",
    title: "Weekly Math Quiz Template",
    subject: "math",
    gradeLevel: "5",
    status: "pending",
    submittedAt: "2023-11-10T14:30:00Z",
    description: "A template for creating weekly math quizzes with randomized questions from a question bank.",
    neededBy: "2023-12-15T00:00:00Z",
    feedback: null,
    teacherId: "teacher-123",
    teacherName: "John Smith",
    teacherEmail: "john.smith@school.edu",
  },
  {
    id: "req-2",
    title: "Science Lab Report",
    subject: "science",
    gradeLevel: "8",
    status: "approved",
    submittedAt: "2023-10-25T09:15:00Z",
    description: "A structured template for students to document their science lab experiments.",
    neededBy: null,
    feedback: "Great idea! This will be available in the template library by next week.",
    teacherId: "teacher-456",
    teacherName: "Sarah Johnson",
    teacherEmail: "sarah.johnson@school.edu",
  },
  {
    id: "req-3",
    title: "Book Report Template",
    subject: "english",
    gradeLevel: "6",
    status: "rejected",
    submittedAt: "2023-11-01T11:45:00Z",
    description: "A template for students to write book reports with guided sections for analysis.",
    neededBy: "2023-11-30T00:00:00Z",
    feedback: "We already have a similar template in the library. Please check 'Literature Analysis Template'.",
    teacherId: "teacher-789",
    teacherName: "Michael Brown",
    teacherEmail: "michael.brown@school.edu",
  },
  {
    id: "req-4",
    title: "Historical Timeline Project",
    subject: "history",
    gradeLevel: "10",
    status: "in_progress",
    submittedAt: "2023-11-05T16:20:00Z",
    description: "A template for students to create interactive historical timelines.",
    neededBy: "2023-12-20T00:00:00Z",
    feedback: "Currently being developed. We'll notify you when it's ready for review.",
    teacherId: "teacher-123",
    teacherName: "John Smith",
    teacherEmail: "john.smith@school.edu",
  },
  {
    id: "req-5",
    title: "Art Portfolio Template",
    subject: "art",
    gradeLevel: "11",
    status: "pending",
    submittedAt: "2023-11-12T10:05:00Z",
    description: "A template for art students to showcase their portfolio with proper formatting.",
    neededBy: "2024-01-15T00:00:00Z",
    feedback: null,
    teacherId: "teacher-456",
    teacherName: "Sarah Johnson",
    teacherEmail: "sarah.johnson@school.edu",
  },
]

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

export function TemplateRequestsAdmin() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)

  // Filter requests based on search query, status filter, and subject filter
  const filteredRequests = mockTemplateRequests.filter((request) => {
    const matchesSearch = request.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesSubject = subjectFilter === "all" || request.subject === subjectFilter
    return matchesSearch && matchesStatus && matchesSubject
  })

  const handleRowClick = (requestId: string) => {
    setSelectedRequest(requestId)
  }

  const selectedRequestData = mockTemplateRequests.find((request) => request.id === selectedRequest)

  const exportToCSV = () => {
    // In a real app, this would generate a CSV file
    alert("Exporting requests to CSV...")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Template Requests</h2>
        <Button variant="outline" onClick={exportToCSV}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search requests..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={subjectFilter} onValueChange={setSubjectFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            <SelectItem value="math">Mathematics</SelectItem>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="history">History</SelectItem>
            <SelectItem value="art">Art</SelectItem>
            <SelectItem value="music">Music</SelectItem>
            <SelectItem value="pe">Physical Education</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No template requests found.
                </TableCell>
              </TableRow>
            ) : (
              filteredRequests.map((request) => (
                <TableRow
                  key={request.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(request.id)}
                >
                  <TableCell className="font-medium">{request.title}</TableCell>
                  <TableCell>{request.teacherName}</TableCell>
                  <TableCell>{subjectMap[request.subject as keyof typeof subjectMap]}</TableCell>
                  <TableCell>{gradeLevelMap[request.gradeLevel as keyof typeof gradeLevelMap]}</TableCell>
                  <TableCell>{new Date(request.submittedAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={statusMap[request.status as keyof typeof statusMap].variant}>
                      {statusMap[request.status as keyof typeof statusMap].label}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedRequest && selectedRequestData && (
        <AdminRequestDetails
          request={selectedRequestData}
          open={!!selectedRequest}
          onOpenChange={(open) => {
            if (!open) setSelectedRequest(null)
          }}
        />
      )}
    </div>
  )
}
