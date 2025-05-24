"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface AuditLogTableProps {
  schoolId: string
}

export function AuditLogTable({ schoolId }: AuditLogTableProps) {
  const [selectedAction, setSelectedAction] = useState<string>("all")

  // Sample audit log data
  const auditLogs = [
    {
      id: "log-1",
      user: "Dr. Smith",
      action: "create",
      resource: "Board",
      resourceName: "Physics 101 - Spring Semester",
      timestamp: "2025-03-15T10:30:45",
      ipAddress: "192.168.1.105",
    },
    {
      id: "log-2",
      user: "Admin",
      action: "create",
      resource: "User",
      resourceName: "Ms. Johnson",
      timestamp: "2025-03-15T10:15:22",
      ipAddress: "192.168.1.1",
    },
    {
      id: "log-3",
      user: "Prof. Johnson",
      action: "update",
      resource: "Board",
      resourceName: "Chemistry Lab Activities",
      timestamp: "2025-03-15T09:45:10",
      ipAddress: "192.168.1.110",
    },
    {
      id: "log-4",
      user: "Admin",
      action: "delete",
      resource: "Task",
      resourceName: "Lab Report Submission",
      timestamp: "2025-03-15T09:30:05",
      ipAddress: "192.168.1.1",
    },
    {
      id: "log-5",
      user: "Ms. Williams",
      action: "update",
      resource: "User",
      resourceName: "Alex Johnson",
      timestamp: "2025-03-15T09:15:30",
      ipAddress: "192.168.1.115",
    },
    {
      id: "log-6",
      user: "System",
      action: "backup",
      resource: "Database",
      resourceName: "Weekly Backup",
      timestamp: "2025-03-15T02:00:00",
      ipAddress: "192.168.1.2",
    },
    {
      id: "log-7",
      user: "Dr. Martinez",
      action: "login",
      resource: "System",
      resourceName: "User Login",
      timestamp: "2025-03-15T08:30:15",
      ipAddress: "192.168.1.120",
    },
    {
      id: "log-8",
      user: "Jamie Smith",
      action: "update",
      resource: "Task",
      resourceName: "Biology Research Project",
      timestamp: "2025-03-15T08:15:45",
      ipAddress: "192.168.1.125",
    },
  ]

  // Filter logs based on selected action
  const filteredLogs = selectedAction === "all" ? auditLogs : auditLogs.filter((log) => log.action === selectedAction)

  // Function to format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  // Function to get badge color based on action
  const getActionBadge = (action: string) => {
    switch (action) {
      case "create":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Create</Badge>
      case "update":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Update</Badge>
      case "delete":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Delete</Badge>
      case "login":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Login</Badge>
      case "backup":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Backup</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{action}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Audit Log</h3>
          <p className="text-sm text-muted-foreground">Track all system activities and changes</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search logs..." className="w-full pl-8" />
          </div>
          <Select value={selectedAction} onValueChange={setSelectedAction}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="create">Create</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
              <SelectItem value="login">Login</SelectItem>
              <SelectItem value="backup">Backup</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>Resource Name</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-xs">{formatTimestamp(log.timestamp)}</TableCell>
                <TableCell>{log.user}</TableCell>
                <TableCell>{getActionBadge(log.action)}</TableCell>
                <TableCell>{log.resource}</TableCell>
                <TableCell className="max-w-[200px] truncate">{log.resourceName}</TableCell>
                <TableCell className="font-mono text-xs">{log.ipAddress}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
