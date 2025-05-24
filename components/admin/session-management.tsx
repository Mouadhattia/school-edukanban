"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { LogOut, Monitor, Smartphone, Laptop, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock session data
const mockSessions = [
  {
    id: "session-001",
    device: "Chrome on Windows",
    deviceType: "desktop",
    ipAddress: "192.168.1.1",
    location: "New York, USA",
    lastActive: "2023-11-20T14:32:15",
    isCurrent: true,
  },
  {
    id: "session-002",
    device: "Safari on iPhone",
    deviceType: "mobile",
    ipAddress: "192.168.1.45",
    location: "New York, USA",
    lastActive: "2023-11-19T09:15:22",
    isCurrent: false,
  },
  {
    id: "session-003",
    device: "Firefox on MacOS",
    deviceType: "desktop",
    ipAddress: "192.168.1.78",
    location: "New York, USA",
    lastActive: "2023-11-18T10:45:30",
    isCurrent: false,
  },
  {
    id: "session-004",
    device: "Chrome on Android",
    deviceType: "mobile",
    ipAddress: "203.0.113.42",
    location: "Boston, USA",
    lastActive: "2023-11-15T16:22:10",
    isCurrent: false,
  },
  {
    id: "session-005",
    device: "Edge on Windows",
    deviceType: "desktop",
    ipAddress: "192.168.1.100",
    location: "New York, USA",
    lastActive: "2023-11-10T08:30:15",
    isCurrent: false,
  },
]

export function SessionManagement() {
  const [sessions, setSessions] = useState(mockSessions)
  const [isTerminateAllDialogOpen, setIsTerminateAllDialogOpen] = useState(false)

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Calculate time since last active
  const getTimeSinceLastActive = (lastActiveDate: string) => {
    const lastActive = new Date(lastActiveDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - lastActive.getTime())
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
    } else {
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`
    }
  }

  // Get icon for device type
  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case "desktop":
        return <Monitor className="h-4 w-4" />
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "tablet":
        return <Laptop className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  // Handle terminating a session
  const handleTerminateSession = (sessionId: string) => {
    setSessions(sessions.filter((session) => session.id !== sessionId))

    toast({
      title: "Session terminated",
      description: "The session has been terminated successfully.",
    })
  }

  // Handle terminating all other sessions
  const handleTerminateAllSessions = () => {
    setSessions(sessions.filter((session) => session.isCurrent))
    setIsTerminateAllDialogOpen(false)

    toast({
      title: "All sessions terminated",
      description: "All other sessions have been terminated successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Active Sessions</CardTitle>
            <CardDescription>Manage your active sessions across devices</CardDescription>
          </div>
          <Dialog open={isTerminateAllDialogOpen} onOpenChange={setIsTerminateAllDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Terminate All Other Sessions
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Terminate all other sessions</DialogTitle>
                <DialogDescription>
                  Are you sure you want to terminate all sessions except your current one? This will log out all other
                  devices.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setIsTerminateAllDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleTerminateAllSessions}>
                  Terminate All
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Device</TableHead>
                  <TableHead className="hidden md:table-cell">IP Address</TableHead>
                  <TableHead className="hidden md:table-cell">Location</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(session.deviceType)}
                        <div>
                          <div className="font-medium">{session.device}</div>
                          <div className="text-xs text-muted-foreground md:hidden">{session.ipAddress}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell font-mono text-xs">{session.ipAddress}</TableCell>
                    <TableCell className="hidden md:table-cell">{session.location}</TableCell>
                    <TableCell>
                      <div className="font-medium">{getTimeSinceLastActive(session.lastActive)}</div>
                      <div className="text-xs text-muted-foreground">{formatDate(session.lastActive)}</div>
                    </TableCell>
                    <TableCell>
                      {session.isCurrent ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Current
                        </Badge>
                      ) : (
                        <Badge variant="outline">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTerminateSession(session.id)}
                        disabled={session.isCurrent}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Terminate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {sessions.length > 2 && (
            <Alert className="mt-4" variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Multiple Active Sessions</AlertTitle>
              <AlertDescription>
                You have {sessions.length} active sessions. If you don't recognize any of these devices, terminate those
                sessions immediately and change your password.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
