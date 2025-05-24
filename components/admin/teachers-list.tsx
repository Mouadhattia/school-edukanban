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
import { AddTeacherDialog } from "@/components/admin/add-teacher-dialog"
import { EditTeacherDialog } from "@/components/admin/edit-teacher-dialog"
import { ResetPasswordDialog } from "@/components/admin/reset-password-dialog"
import { ConfirmDialog } from "@/components/admin/confirm-dialog"
import { useRouter } from "next/navigation"
import { toast } from "@/lib/toast"

interface TeachersListProps {
  schoolId: string
}

export function TeachersList({ schoolId }: TeachersListProps) {
  const router = useRouter()
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false)
  const [isEditTeacherOpen, setIsEditTeacherOpen] = useState(false)
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false)
  const [isDeactivateConfirmOpen, setIsDeactivateConfirmOpen] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Sample teachers data
  const [teachers, setTeachers] = useState([
    {
      id: "teacher-1",
      name: "Dr. Smith",
      email: "smith@example.edu",
      department: "Science",
      joinDate: "Jan 15, 2024",
      status: "Active",
    },
    {
      id: "teacher-2",
      name: "Prof. Johnson",
      email: "johnson@example.edu",
      department: "English",
      joinDate: "Feb 3, 2024",
      status: "Active",
    },
    {
      id: "teacher-3",
      name: "Ms. Williams",
      email: "williams@example.edu",
      department: "Mathematics",
      joinDate: "Mar 10, 2024",
      status: "Active",
    },
    {
      id: "teacher-4",
      name: "Mr. Davis",
      email: "davis@example.edu",
      department: "History",
      joinDate: "Jan 5, 2024",
      status: "On Leave",
    },
    {
      id: "teacher-5",
      name: "Dr. Martinez",
      email: "martinez@example.edu",
      department: "Science",
      joinDate: "Feb 20, 2024",
      status: "Active",
    },
  ])

  const handleAddTeacher = (teacher: any) => {
    console.log("Adding teacher:", teacher)
    setTeachers((prevTeachers) => [
      ...prevTeachers,
      {
        id: `teacher-${Date.now()}`,
        ...teacher,
        joinDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        status: "Active",
      },
    ])
    setIsAddTeacherOpen(false)

    // Use a setTimeout to ensure the toast is called after the component has mounted
    setTimeout(() => {
      toast({
        title: "Teacher Added",
        description: `${teacher.name} has been added successfully.`,
      })
    }, 0)
  }

  const handleEditTeacher = (updatedTeacher: any) => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) => (teacher.id === updatedTeacher.id ? updatedTeacher : teacher)),
    )
    setIsEditTeacherOpen(false)

    setTimeout(() => {
      toast({
        title: "Teacher Updated",
        description: `${updatedTeacher.name}'s information has been updated.`,
      })
    }, 0)
  }

  const handleResetPassword = (teacherId: string, newPassword: string) => {
    // In a real application, you would call an API to reset the password
    console.log(`Password for teacher ${teacherId} reset to: ${newPassword}`)
    setIsResetPasswordOpen(false)

    setTimeout(() => {
      toast({
        title: "Password Reset",
        description: "The password has been reset successfully.",
      })
    }, 0)
  }

  const handleDeactivateTeacher = () => {
    if (!selectedTeacher) return

    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) => (teacher.id === selectedTeacher.id ? { ...teacher, status: "Inactive" } : teacher)),
    )
    setIsDeactivateConfirmOpen(false)

    setTimeout(() => {
      toast({
        title: "Teacher Deactivated",
        description: `${selectedTeacher.name} has been deactivated.`,
        variant: "destructive",
      })
    }, 0)
  }

  const handleViewBoards = (teacherId: string) => {
    // In a real application, you would navigate to the teacher's boards page
    router.push(`/admin/teachers/${teacherId}/boards`)
    // For now, we'll just log it
    console.log(`Viewing boards for teacher ${teacherId}`)
  }

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Teachers</h3>
          <p className="text-sm text-muted-foreground">Manage teachers for this school</p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search teachers..."
            className="w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={() => setIsAddTeacherOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Teacher
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeachers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No teachers found. Try a different search or add a new teacher.
                </TableCell>
              </TableRow>
            ) : (
              filteredTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.department}</TableCell>
                  <TableCell>{teacher.joinDate}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        teacher.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : teacher.status === "On Leave"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {teacher.status}
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
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedTeacher(teacher)
                            setIsEditTeacherOpen(true)
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewBoards(teacher.id)}>View Boards</DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedTeacher(teacher)
                            setIsResetPasswordOpen(true)
                          }}
                        >
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setSelectedTeacher(teacher)
                            setIsDeactivateConfirmOpen(true)
                          }}
                          disabled={teacher.status === "Inactive"}
                        >
                          Deactivate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AddTeacherDialog isOpen={isAddTeacherOpen} onClose={() => setIsAddTeacherOpen(false)} onAdd={handleAddTeacher} />

      <EditTeacherDialog
        isOpen={isEditTeacherOpen}
        onClose={() => setIsEditTeacherOpen(false)}
        onSave={handleEditTeacher}
        teacher={selectedTeacher}
      />

      <ResetPasswordDialog
        isOpen={isResetPasswordOpen}
        onClose={() => setIsResetPasswordOpen(false)}
        onReset={handleResetPassword}
        teacherId={selectedTeacher?.id || ""}
        teacherName={selectedTeacher?.name || ""}
      />

      <ConfirmDialog
        isOpen={isDeactivateConfirmOpen}
        onClose={() => setIsDeactivateConfirmOpen(false)}
        onConfirm={handleDeactivateTeacher}
        title="Deactivate Teacher"
        description={`Are you sure you want to deactivate ${selectedTeacher?.name}? They will no longer be able to access the system.`}
        confirmText="Deactivate"
        variant="destructive"
      />
    </div>
  )
}
