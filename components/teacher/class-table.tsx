"use client"

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
import { Edit, Trash, Users, BookOpen } from "lucide-react"
import type { Class } from "@/lib/types"
import { useRouter } from "next/navigation"
import { navigateTo } from "@/lib/navigation"

interface ClassTableProps {
  classes: Class[]
  onNavigate?: (path: string) => void
  onDelete?: (classId: string) => void
}

export function ClassTable({ classes, onNavigate, onDelete }: ClassTableProps) {
  const router = useRouter()

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path)
    } else {
      navigateTo(router, path, {
        onError: (error) => {
          console.error("Navigation error:", error)
        },
        fallbackPath: "/teacher/classes",
        userRole: "teacher", // Default role
      })
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Class Name</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Students</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((cls) => (
            <TableRow key={cls.id}>
              <TableCell className="font-medium">{cls.name}</TableCell>
              <TableCell>{cls.subject}</TableCell>
              <TableCell>{cls.grade}</TableCell>
              <TableCell>{cls.studentCount}</TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleNavigate(`/classes/${cls.id}`)}>
                    <BookOpen className="h-4 w-4" />
                    <span className="sr-only">View Class</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleNavigate(`/classes/${cls.id}/boards`)}>
                    <Users className="h-4 w-4" />
                    <span className="sr-only">Manage Boards</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleNavigate(`/classes/${cls.id}`)}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        View Class
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleNavigate(`/classes/${cls.id}/boards`)}>
                        <Users className="mr-2 h-4 w-4" />
                        Manage Boards
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleNavigate(`/classes/${cls.id}/edit`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Class
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this class?")) {
                            // Call the onDelete prop if provided
                            if (onDelete) {
                              onDelete(cls.id)
                            }
                          }
                        }}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Class
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
