"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Search,
  AlertTriangle,
  Shield,
  UserPlus,
  UserMinus,
  Settings,
  Key,
  LogIn,
  LogOut,
} from "lucide-react"

// Mock audit log data
const mockAuditLogs = [
  {
    id: "log-001",
    timestamp: "2023-11-20T14:32:15",
    user: "admin@school.edu",
    action: "login",
    description: "Successful login",
    ipAddress: "192.168.1.1",
    userAgent: "Chrome/Windows",
    severity: "info",
  },
  {
    id: "log-002",
    timestamp: "2023-11-20T14:30:05",
    user: "admin@school.edu",
    action: "login_failed",
    description: "Failed login attempt",
    ipAddress: "192.168.1.1",
    userAgent: "Chrome/Windows",
    severity: "warning",
  },
  {
    id: "log-003",
    timestamp: "2023-11-20T13:45:22",
    user: "teacher1@school.edu",
    action: "password_change",
    description: "Password changed successfully",
    ipAddress: "192.168.1.45",
    userAgent: "Safari/MacOS",
    severity: "info",
  },
  {
    id: "log-004",
    timestamp: "2023-11-20T11:22:18",
    user: "admin@school.edu",
    action: "user_create",
    description: "Created new user account: student15@school.edu",
    ipAddress: "192.168.1.1",
    userAgent: "Chrome/Windows",
    severity: "info",
  },
  {
    id: "log-005",
    timestamp: "2023-11-19T16:05:33",
    user: "admin@school.edu",
    action: "settings_change",
    description: "Modified password policy settings",
    ipAddress: "192.168.1.1",
    userAgent: "Chrome/Windows",
    severity: "info",
  },
  {
    id: "log-006",
    timestamp: "2023-11-19T15:47:12",
    user: "unknown",
    action: "login_failed",
    description: "Failed login attempt: user not found",
    ipAddress: "203.0.113.42",
    userAgent: "Firefox/Linux",
    severity: "alert",
  },
  {
    id: "log-007",
    timestamp: "2023-11-19T10:32:05",
    user: "teacher2@school.edu",
    action: "api_access",
    description: "API access: GET /api/classes",
    ipAddress: "192.168.1.78",
    userAgent: "PostmanRuntime/7.29.0",
    severity: "info",
  },
  {
    id: "log-008",
    timestamp: "2023-11-18T09:15:42",
    user: "admin@school.edu",
    action: "user_role_change",
    description: "Changed role for user teacher3@school.edu from 'teacher' to 'admin'",
    ipAddress: "192.168.1.1",
    userAgent: "Chrome/Windows",
    severity: "warning",
  },
  {
    id: "log-009",
    timestamp: "2023-11-18T08:55:17",
    user: "system",
    action: "backup_complete",
    description: "Automated system backup completed successfully",
    ipAddress: "127.0.0.1",
    userAgent: "SystemService",
    severity: "info",
  },
  {
    id: "log-010",
    timestamp: "2023-11-17T22:43:11",
    user: "unknown",
    action: "brute_force_detected",
    description: "Multiple failed login attempts detected",
    ipAddress: "203.0.113.100",
    userAgent: "Unknown/Linux",
    severity: "critical",
  },
]

export function SecurityAuditLogs() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [filterAction, setFilterAction] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter logs based on search and filters
  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSeverity = filterSeverity === "all" || log.severity === filterSeverity
    const matchesAction = filterAction === "all" || log.action === filterAction

    return matchesSearch && matchesSeverity && matchesAction
  })

  // Paginate logs
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage)
  const paginatedLogs = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Get icon for action type
  const getActionIcon = (action: string) => {
    switch (action) {
      case "login":
        return <LogIn className="h-4 w-4" />
      case "login_failed":
        return <AlertTriangle className="h-4 w-4" />
      case "logout":
        return <LogOut className="h-4 w-4" />
      case "user_create":
        return <UserPlus className="h-4 w-4" />
      case "user_delete":
        return <UserMinus className="h-4 w-4" />
      case "settings_change":
        return <Settings className="h-4 w-4" />
      case "password_change":
        return <Key className="h-4 w-4" />
      case "brute_force_detected":
        return <Shield className="h-4 w-4" />
      default:
        return <Shield className="h-4 w-4" />
    }
  }

  // Get badge variant for severity
  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "info":
        return "secondary"
      case "warning":
        return "warning"
      case "alert":
        return "destructive"
      case "critical":
        return "destructive"
      default:
        return "secondary"
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Audit Logs</CardTitle>
          <CardDescription>Review security events and user activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search logs..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-40">
                <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="alert">Alert</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-40">
                <Select value={filterAction} onValueChange={setFilterAction}>
                  <SelectTrigger>
                    <SelectValue placeholder="Action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="login">Login</SelectItem>
                    <SelectItem value="login_failed">Failed Login</SelectItem>
                    <SelectItem value="logout">Logout</SelectItem>
                    <SelectItem value="user_create">User Create</SelectItem>
                    <SelectItem value="settings_change">Settings Change</SelectItem>
                    <SelectItem value="password_change">Password Change</SelectItem>
                    <SelectItem value="brute_force_detected">Brute Force</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="hidden md:table-cell">IP Address</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLogs.length > 0 ? (
                  paginatedLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">{formatDate(log.timestamp)}</TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getActionIcon(log.action)}
                          <span className="hidden md:inline capitalize">{log.action.replace(/_/g, " ")}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell font-mono text-xs">{log.ipAddress}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{log.description}</TableCell>
                      <TableCell>
                        <Badge variant={getSeverityVariant(log.severity)}>{log.severity}</Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {filteredLogs.length > itemsPerPage && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredLogs.length)} of {filteredLogs.length} entries
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
