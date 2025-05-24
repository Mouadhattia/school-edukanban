"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Download, ChevronLeft, ChevronRight, Check, X, Clock, AlertCircle } from "lucide-react"
import { format, addDays, subDays, isSameDay } from "date-fns"
import { cn } from "@/lib/utils"
import type { Student } from "@/lib/types"

interface AttendanceTrackerProps {
  classId: string
  className: string
  students: Student[]
}

type AttendanceStatus = "present" | "absent" | "late" | "excused" | null

interface AttendanceRecord {
  studentId: string
  date: Date
  status: AttendanceStatus
  notes?: string
}

export function AttendanceTracker({ classId, className, students }: AttendanceTrackerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [viewMode, setViewMode] = useState<"daily" | "weekly" | "monthly">("daily")

  // Generate some mock attendance data
  const generateMockAttendance = () => {
    const mockData: AttendanceRecord[] = []
    const today = new Date()

    // Generate attendance for the past 30 days
    for (let i = 0; i < 30; i++) {
      const date = subDays(today, i)

      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue

      students.forEach((student) => {
        // Randomly assign attendance status
        const random = Math.random()
        let status: AttendanceStatus

        if (random > 0.9) status = "absent"
        else if (random > 0.8) status = "late"
        else if (random > 0.7) status = "excused"
        else status = "present"

        mockData.push({
          studentId: student.id,
          date,
          status,
        })
      })
    }

    return mockData
  }

  // Initialize with mock data if no records exist
  if (attendanceRecords.length === 0) {
    setAttendanceRecords(generateMockAttendance())
  }

  const handlePreviousDay = () => {
    setSelectedDate(subDays(selectedDate, 1))
  }

  const handleNextDay = () => {
    setSelectedDate(addDays(selectedDate, 1))
  }

  const handleAttendanceChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceRecords((prev) => {
      // Find if there's an existing record for this student on this date
      const existingRecordIndex = prev.findIndex(
        (record) => record.studentId === studentId && isSameDay(record.date, selectedDate),
      )

      if (existingRecordIndex >= 0) {
        // Update existing record
        const newRecords = [...prev]
        newRecords[existingRecordIndex] = {
          ...newRecords[existingRecordIndex],
          status,
        }
        return newRecords
      } else {
        // Create new record
        return [
          ...prev,
          {
            studentId,
            date: selectedDate,
            status,
          },
        ]
      }
    })
  }

  const getAttendanceStatus = (studentId: string): AttendanceStatus => {
    const record = attendanceRecords.find(
      (record) => record.studentId === studentId && isSameDay(record.date, selectedDate),
    )
    return record?.status || null
  }

  const getAttendanceStats = () => {
    const todayRecords = attendanceRecords.filter((record) => isSameDay(record.date, selectedDate))

    const stats = {
      total: students.length,
      present: todayRecords.filter((record) => record.status === "present").length,
      absent: todayRecords.filter((record) => record.status === "absent").length,
      late: todayRecords.filter((record) => record.status === "late").length,
      excused: todayRecords.filter((record) => record.status === "excused").length,
      unmarked: students.length - todayRecords.length,
    }

    return stats
  }

  const handleSaveAttendance = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Here you would typically save the attendance records to your backend
    }, 1000)
  }

  const stats = getAttendanceStats()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Attendance</CardTitle>
              <CardDescription>Track and manage student attendance for {className}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "daily" | "weekly" | "monthly")}>
                <TabsList>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handlePreviousDay}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date || new Date())
                        setCalendarOpen(false)
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" size="icon" onClick={handleNextDay}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Present: {stats.present}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Absent: {stats.absent}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Late: {stats.late}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Excused: {stats.excused}</span>
                </div>
                {stats.unmarked > 0 && (
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span className="text-sm">Unmarked: {stats.unmarked}</span>
                  </div>
                )}
              </div>
            </div>

            <TabsContent value="daily" className="mt-0">
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => {
                      const status = getAttendanceStatus(student.id)
                      return (
                        <TableRow key={student.id}>
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
                          <TableCell>
                            {status === "present" && (
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                <Check className="mr-1 h-3 w-3" /> Present
                              </Badge>
                            )}
                            {status === "absent" && (
                              <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                                <X className="mr-1 h-3 w-3" /> Absent
                              </Badge>
                            )}
                            {status === "late" && (
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                <Clock className="mr-1 h-3 w-3" /> Late
                              </Badge>
                            )}
                            {status === "excused" && (
                              <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                <AlertCircle className="mr-1 h-3 w-3" /> Excused
                              </Badge>
                            )}
                            {status === null && (
                              <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                                Not marked
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={status || ""}
                              onValueChange={(value) => handleAttendanceChange(student.id, value as AttendanceStatus)}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Mark attendance" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="present">Present</SelectItem>
                                <SelectItem value="absent">Absent</SelectItem>
                                <SelectItem value="late">Late</SelectItem>
                                <SelectItem value="excused">Excused</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="weekly" className="mt-0">
              <div className="border rounded-md overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="sticky left-0 bg-background">Student</TableHead>
                      {Array.from({ length: 5 }).map((_, i) => {
                        const date = addDays(
                          new Date(
                            selectedDate.getFullYear(),
                            selectedDate.getMonth(),
                            selectedDate.getDate() - selectedDate.getDay() + 1,
                          ),
                          i,
                        )
                        return (
                          <TableHead key={i} className="text-center min-w-[100px]">
                            <div>{format(date, "EEE")}</div>
                            <div className="text-xs text-muted-foreground">{format(date, "MMM d")}</div>
                          </TableHead>
                        )
                      })}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="sticky left-0 bg-background">
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
                        {Array.from({ length: 5 }).map((_, i) => {
                          const date = addDays(
                            new Date(
                              selectedDate.getFullYear(),
                              selectedDate.getMonth(),
                              selectedDate.getDate() - selectedDate.getDay() + 1,
                            ),
                            i,
                          )
                          const record = attendanceRecords.find(
                            (record) => record.studentId === student.id && isSameDay(record.date, date),
                          )
                          return (
                            <TableCell key={i} className="text-center">
                              {record?.status === "present" && <Check className="mx-auto h-5 w-5 text-green-500" />}
                              {record?.status === "absent" && <X className="mx-auto h-5 w-5 text-red-500" />}
                              {record?.status === "late" && <Clock className="mx-auto h-5 w-5 text-yellow-500" />}
                              {record?.status === "excused" && (
                                <AlertCircle className="mx-auto h-5 w-5 text-blue-500" />
                              )}
                              {!record?.status && <div className="h-5 w-5 rounded-full bg-gray-200 mx-auto"></div>}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="monthly" className="mt-0">
              <div className="text-center p-8 border rounded-md">
                <h3 className="text-lg font-medium">Monthly View</h3>
                <p className="text-muted-foreground">
                  Monthly attendance view is coming soon. This will show a calendar view with attendance statistics.
                </p>
              </div>
            </TabsContent>

            <div className="flex justify-end">
              <Button onClick={handleSaveAttendance} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Attendance"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
