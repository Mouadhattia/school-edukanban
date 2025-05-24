"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { AddStudentDialog } from "@/components/admin/add-student-dialog"

interface StudentsListProps {
  schoolId: string
}

export function StudentsList({ schoolId }: StudentsListProps) {
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)

  // Sample students data
  const [students, setStudents] = useState([
    {
      id: "student-1",
      name: "Alex Johnson",
      email: "alex@example.edu",
      grade: "11",
      joinDate: "Sep 1, 2023",
      status: "Active",
    },
    {
      id: "student-2",
      name: "Jamie Smith",
      email: "jamie@example.edu",
      grade: "10",
      joinDate: "Sep 1, 2023",
      status: "Active",
    },
    {
      id: "student-3",
      name: "Taylor Brown",
      email: "taylor@example.edu",
      grade: "12",
      joinDate: "Sep 1, 2022",
      status: "Active",
    },
    {
      id: "student-4",
      name: "Morgan Lee",
      email: "morgan@example.edu",
      grade: "9",
      joinDate: "Sep 1, 2023",
      status: "Active",
    },
    {
      id: "student-5",
      name: "Casey Wilson",
      email: "casey@example.edu",
      grade: "11",
      joinDate: "Sep 1, 2023",
      status: "Inactive",
    },
  ])

  const handleAddStudent = (student: any) => {
    setStudents([
      ...students,
      {
        id: `student-${Date.now()}`,
        ...student,
        joinDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        status: "Active",
      },
    ])
    setIsAddStudentOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Students</h3>
          <p className="text-sm text-muted-foreground">Manage students for this school</p>
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="Search students..." className="w-64" />
          <Button onClick={() => setIsAddStudentOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>{student.joinDate}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      student.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {student.status}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Boards</DropdownMenuItem>
                      <DropdownMenuItem>Reset Password</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AddStudentDialog isOpen={isAddStudentOpen} onClose={() => setIsAddStudentOpen(false)} onAdd={handleAddStudent} />
    </div>
  )
}
