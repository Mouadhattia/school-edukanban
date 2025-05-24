"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AlertTriangle, CheckCircle, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function StudentProgressTable() {
  // Sample data for the student progress table
  const students = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@example.edu",
      completion: 85,
      grade: "A-",
      status: "on-track",
      lastActive: "Today, 2:30 PM",
      tasksCompleted: 12,
      totalTasks: 15,
    },
    {
      id: "2",
      name: "Jamie Smith",
      email: "jamie@example.edu",
      completion: 92,
      grade: "A",
      status: "on-track",
      lastActive: "Today, 10:15 AM",
      tasksCompleted: 14,
      totalTasks: 15,
    },
    {
      id: "3",
      name: "Taylor Brown",
      email: "taylor@example.edu",
      completion: 65,
      grade: "B",
      status: "at-risk",
      lastActive: "Yesterday, 4:45 PM",
      tasksCompleted: 10,
      totalTasks: 15,
    },
    {
      id: "4",
      name: "Morgan Lee",
      email: "morgan@example.edu",
      completion: 78,
      grade: "B+",
      status: "on-track",
      lastActive: "Today, 9:30 AM",
      tasksCompleted: 12,
      totalTasks: 15,
    },
    {
      id: "5",
      name: "Casey Wilson",
      email: "casey@example.edu",
      completion: 45,
      grade: "C",
      status: "behind",
      lastActive: "3 days ago",
      tasksCompleted: 7,
      totalTasks: 15,
    },
  ]

  // Function to get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  // Function to get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on-track":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            On Track
          </Badge>
        )
      case "at-risk":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <AlertTriangle className="h-3 w-3 mr-1" />
            At Risk
          </Badge>
        )
      case "behind":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Behind
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Unknown
          </Badge>
        )
    }
  }

  // Function to get grade badge color
  const getGradeBadgeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-green-100 text-green-800 hover:bg-green-100"
    if (grade.startsWith("B")) return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    if (grade.startsWith("C")) return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    if (grade.startsWith("D")) return "bg-orange-100 text-orange-800 hover:bg-orange-100"
    return "bg-red-100 text-red-800 hover:bg-red-100"
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Completion</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Active</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{student.name}</div>
                  <div className="text-xs text-muted-foreground">{student.email}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{student.completion}%</span>
                  <span className="text-xs text-muted-foreground">
                    {student.tasksCompleted}/{student.totalTasks}
                  </span>
                </div>
                <Progress value={student.completion} />
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className={getGradeBadgeColor(student.grade)}>
                {student.grade}
              </Badge>
            </TableCell>
            <TableCell>{getStatusBadge(student.status)}</TableCell>
            <TableCell className="text-sm">{student.lastActive}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                    <DropdownMenuItem>Generate Report</DropdownMenuItem>
                    <DropdownMenuItem>View Submissions</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
