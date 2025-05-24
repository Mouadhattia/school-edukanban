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
import { Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Teacher {
  id: string
  name: string
  email: string
  department: string
  avatar?: string
}

interface AssignTeachersDialogProps {
  isOpen: boolean
  onClose: () => void
  onAssign: (teacherIds: string[]) => void
  classData: any
}

export function AssignTeachersDialog({ isOpen, onClose, onAssign, classData }: AssignTeachersDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>([])
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")

  // Sample teachers data
  const teachers: Teacher[] = [
    {
      id: "teacher-1",
      name: "Dr. Smith",
      email: "smith@example.edu",
      department: "Science",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "teacher-2",
      name: "Prof. Johnson",
      email: "johnson@example.edu",
      department: "Mathematics",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "teacher-3",
      name: "Ms. Williams",
      email: "williams@example.edu",
      department: "English",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "teacher-4",
      name: "Mr. Davis",
      email: "davis@example.edu",
      department: "History",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "teacher-5",
      name: "Dr. Martinez",
      email: "martinez@example.edu",
      department: "Science",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const filteredTeachers = teachers.filter(
    (teacher) =>
      (departmentFilter === "all" || teacher.department === departmentFilter) &&
      (teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleToggleTeacher = (teacherId: string) => {
    setSelectedTeachers((prev) =>
      prev.includes(teacherId) ? prev.filter((id) => id !== teacherId) : [...prev, teacherId],
    )
  }

  const handleAssign = () => {
    onAssign(selectedTeachers)
    setSelectedTeachers([])
    setSearchQuery("")
    setDepartmentFilter("all")
  }

  // Get unique departments for filter
  const departments = ["all", ...new Set(teachers.map((teacher) => teacher.department))]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Assign Teachers to {classData.name}</DialogTitle>
          <DialogDescription>
            {classData.type === "traditional"
              ? "Select teachers to assign to this class. Multiple teachers can be assigned to a traditional class."
              : "Select a teacher for this specialized course. This teacher will be the primary instructor."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search teachers..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept === "all" ? "All Departments" : dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-md divide-y max-h-[300px] overflow-y-auto">
            {filteredTeachers.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">No teachers found matching your search</div>
            ) : (
              filteredTeachers.map((teacher) => (
                <div key={teacher.id} className="flex items-center p-3 hover:bg-muted/50">
                  <Checkbox
                    id={`teacher-${teacher.id}`}
                    checked={selectedTeachers.includes(teacher.id)}
                    onCheckedChange={() => handleToggleTeacher(teacher.id)}
                    className="mr-3"
                  />
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={teacher.avatar} alt={teacher.name} />
                    <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Label htmlFor={`teacher-${teacher.id}`} className="flex-1 cursor-pointer">
                    <div className="font-medium">{teacher.name}</div>
                    <div className="text-sm text-muted-foreground">{teacher.email}</div>
                  </Label>
                  <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-800">
                    {teacher.department}
                  </Badge>
                </div>
              ))
            )}
          </div>

          <div className="mt-2 text-sm text-muted-foreground">
            {selectedTeachers.length} {selectedTeachers.length === 1 ? "teacher" : "teachers"} selected
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={selectedTeachers.length === 0}>
            Assign {selectedTeachers.length} {selectedTeachers.length === 1 ? "Teacher" : "Teachers"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
