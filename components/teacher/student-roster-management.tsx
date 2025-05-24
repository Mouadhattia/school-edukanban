"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Upload, Download, MoreHorizontal, UserPlus, Mail, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Student } from "@/lib/types"

interface StudentRosterManagementProps {
  classId: string
  className: string
}

export function StudentRosterManagement({ classId, className }: StudentRosterManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [isImportOpen, setIsImportOpen] = useState(false)
  const [isEmailOpen, setIsEmailOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("enrolled")

  // Mock data for students
  const [students, setStudents] = useState<Student[]>([
    { id: "1", name: "Alex Johnson", email: "alex@example.edu", grade: "11th", classes: [classId] },
    { id: "2", name: "Jamie Smith", email: "jamie@example.edu", grade: "10th", classes: [classId] },
    { id: "3", name: "Taylor Brown", email: "taylor@example.edu", grade: "11th", classes: [classId] },
    { id: "4", name: "Morgan Lee", email: "morgan@example.edu", grade: "10th", classes: [classId] },
    { id: "5", name: "Casey Wilson", email: "casey@example.edu", grade: "9th", classes: [classId] },
  ])

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredStudents.map((student) => student.id))
    }
  }

  const handleSelectStudent = (studentId: string) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId))
    } else {
      setSelectedStudents([...selectedStudents, studentId])
    }
  }

  const handleAddStudent = (student: Omit<Student, "id">) => {
    const newStudent = {
      ...student,
      id: `student-${Date.now()}`,
      classes: [classId],
    }
    setStudents([...students, newStudent])
    setIsAddStudentOpen(false)
  }

  const handleRemoveStudents = () => {
    setStudents(students.filter((student) => !selectedStudents.includes(student.id)))
    setSelectedStudents([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Student Roster</CardTitle>
              <CardDescription>Manage students enrolled in {className}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsImportOpen(true)}>
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm" onClick={() => setIsAddStudentOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="enrolled" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="enrolled">Enrolled ({students.length})</TabsTrigger>
                <TabsTrigger value="pending">Pending Invitations (2)</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search students..."
                    className="pl-8 w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                {selectedStudents.length > 0 && (
                  <Button variant="outline" size="sm" onClick={() => setIsEmailOpen(true)}>
                    <Mail className="mr-2 h-4 w-4" />
                    Email Selected
                  </Button>
                )}
                {selectedStudents.length > 0 && (
                  <Button variant="destructive" size="sm" onClick={handleRemoveStudents}>
                    Remove Selected
                  </Button>
                )}
              </div>
            </div>

            <TabsContent value="enrolled">
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={filteredStudents.length > 0 && selectedStudents.length === filteredStudents.length}
                          onCheckedChange={handleSelectAll}
                          aria-label="Select all"
                        />
                      </TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedStudents.includes(student.id)}
                              onCheckedChange={() => handleSelectStudent(student.id)}
                              aria-label={`Select ${student.name}`}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={student.name} />
                                <AvatarFallback>
                                  {student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="font-medium">{student.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.grade}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Active
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
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">Remove from Class</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          {searchQuery
                            ? "No students found matching your search"
                            : "No students enrolled in this class yet"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Invited On</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>JD</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">Jordan Davis</div>
                        </div>
                      </TableCell>
                      <TableCell>jordan.davis@example.edu</TableCell>
                      <TableCell>May 15, 2025</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Pending
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>RP</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">Riley Parker</div>
                        </div>
                      </TableCell>
                      <TableCell>riley.parker@example.edu</TableCell>
                      <TableCell>May 14, 2025</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                          Pending
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Student Dialog */}
      <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Student to {className}</DialogTitle>
            <DialogDescription>Add a new student to this class or invite an existing student.</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="existing">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="existing">Existing Student</TabsTrigger>
              <TabsTrigger value="new">New Student</TabsTrigger>
            </TabsList>
            <TabsContent value="existing" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search students by name or email..." className="pl-8" />
                </div>
                <div className="border rounded-md divide-y max-h-[300px] overflow-y-auto">
                  <div className="p-3 flex items-center hover:bg-muted/50">
                    <Checkbox id="student-1" className="mr-3" />
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarFallback>RW</AvatarFallback>
                    </Avatar>
                    <Label htmlFor="student-1" className="flex-1 cursor-pointer">
                      <div className="font-medium">Robin Wilson</div>
                      <div className="text-sm text-muted-foreground">robin@example.edu</div>
                    </Label>
                    <Badge variant="outline">Grade 10</Badge>
                  </div>
                  <div className="p-3 flex items-center hover:bg-muted/50">
                    <Checkbox id="student-2" className="mr-3" />
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <Label htmlFor="student-2" className="flex-1 cursor-pointer">
                      <div className="font-medium">Sam Johnson</div>
                      <div className="text-sm text-muted-foreground">sam@example.edu</div>
                    </Label>
                    <Badge variant="outline">Grade 11</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="new" className="space-y-4 py-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter student's full name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter student's email address" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="grade">Grade Level</Label>
                  <Select>
                    <SelectTrigger id="grade">
                      <SelectValue placeholder="Select grade level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">9th Grade</SelectItem>
                      <SelectItem value="10">10th Grade</SelectItem>
                      <SelectItem value="11">11th Grade</SelectItem>
                      <SelectItem value="12">12th Grade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddStudentOpen(false)}>
              Cancel
            </Button>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add to Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Students Dialog */}
      <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Import Students</DialogTitle>
            <DialogDescription>
              Import students from a CSV file or by pasting a list of email addresses.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="csv">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="csv">CSV File</TabsTrigger>
              <TabsTrigger value="emails">Email List</TabsTrigger>
            </TabsList>
            <TabsContent value="csv" className="space-y-4 py-4">
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <h3 className="mt-2 text-sm font-medium">Drag and drop your CSV file here</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Or <span className="text-primary font-medium">browse</span> to upload
                </p>
                <Input type="file" className="hidden" accept=".csv" />
                <p className="mt-4 text-xs text-muted-foreground">
                  Your CSV should include columns for name, email, and grade level
                </p>
              </div>
              <div>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="emails" className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="emails">Student Emails (one per line)</Label>
                <textarea
                  id="emails"
                  className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="student1@example.edu&#10;student2@example.edu&#10;student3@example.edu"
                ></textarea>
                <p className="text-xs text-muted-foreground">
                  Students will be invited to join the class. If they don't have an account, they will be prompted to
                  create one.
                </p>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportOpen(false)}>
              Cancel
            </Button>
            <Button>Import Students</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Email Students Dialog */}
      <Dialog open={isEmailOpen} onOpenChange={setIsEmailOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Email Students</DialogTitle>
            <DialogDescription>
              Send an email to {selectedStudents.length} selected student{selectedStudents.length !== 1 ? "s" : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter email subject" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <textarea
                id="message"
                className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Enter your message here..."
              ></textarea>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEmailOpen(false)}>
              Cancel
            </Button>
            <Button>Send Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
