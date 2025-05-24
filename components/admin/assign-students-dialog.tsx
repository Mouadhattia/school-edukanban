"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, UserPlus, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Student {
  id: string
  name: string
  email: string
  grade?: string
  avatar?: string
}

interface AssignStudentsDialogProps {
  isOpen: boolean
  onClose: () => void
  onAssign: (studentIds: string[]) => void
  classData: any
}

export function AssignStudentsDialog({ isOpen, onClose, onAssign, classData }: AssignStudentsDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])

  // Sample students data
  const students: Student[] = [
    {
      id: "student-1",
      name: "Alex Johnson",
      email: "alex@example.edu",
      grade: "5",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "student-2",
      name: "Jamie Smith",
      email: "jamie@example.edu",
      grade: "5",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "student-3",
      name: "Taylor Brown",
      email: "taylor@example.edu",
      grade: "5",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "student-4",
      name: "Morgan Lee",
      email: "morgan@example.edu",
      grade: "4",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "student-5",
      name: "Casey Wilson",
      email: "casey@example.edu",
      grade: "4",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleToggleStudent = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId],
    )
  }

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredStudents.map((student) => student.id))
    }
  }

  const handleAssign = () => {
    onAssign(selectedStudents)
    setSelectedStudents([])
    setSearchQuery("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Assign Students to {classData.name}</DialogTitle>
          <DialogDescription>
            Select students to assign to this {classData.type === "traditional" ? "class" : "course"}.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search students..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="ml-2" onClick={handleSelectAll}>
              {selectedStudents.length === filteredStudents.length ? "Deselect All" : "Select All"}
            </Button>
          </div>

          <Tabs defaultValue="individual" className="mb-4">
            <TabsList>
              <TabsTrigger value="individual">
                <UserPlus className="h-4 w-4 mr-2" />
                Individual Students
              </TabsTrigger>
              <TabsTrigger value="bulk">
                <Users className="h-4 w-4 mr-2" />
                Bulk Assignment
              </TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="space-y-4 mt-4">
              <div className="border rounded-md divide-y max-h-[300px] overflow-y-auto">
                {filteredStudents.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">No students found matching your search</div>
                ) : (
                  filteredStudents.map((student) => (
                    <div key={student.id} className="flex items-center p-3 hover:bg-muted/50">
                      <Checkbox
                        id={`student-${student.id}`}
                        checked={selectedStudents.includes(student.id)}
                        onCheckedChange={() => handleToggleStudent(student.id)}
                        className="mr-3"
                      />
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Label htmlFor={`student-${student.id}`} className="flex-1 cursor-pointer">
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
                      </Label>
                      {student.grade && (
                        <Badge variant="outline" className="ml-2">
                          Grade {student.grade}
                        </Badge>
                      )}
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="bulk" className="space-y-4 mt-4">
              <div className="border rounded-md p-4">
                <Label htmlFor="bulk-emails" className="mb-2 block">
                  Student Emails (one per line)
                </Label>
                <textarea
                  id="bulk-emails"
                  className="w-full min-h-[150px] p-2 border rounded-md"
                  placeholder="student1@example.edu&#10;student2@example.edu&#10;student3@example.edu"
                ></textarea>
                <p className="text-sm text-muted-foreground mt-2">
                  Students will be automatically added to the class. If a student doesn't exist in the system, they will
                  be invited to join.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-2 text-sm text-muted-foreground">
            {selectedStudents.length} {selectedStudents.length === 1 ? "student" : "students"} selected
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={selectedStudents.length === 0}>
            Assign {selectedStudents.length} {selectedStudents.length === 1 ? "Student" : "Students"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
