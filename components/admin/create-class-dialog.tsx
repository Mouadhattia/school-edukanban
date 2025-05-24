"use client"

import type React from "react"

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Info } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CreateClassDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreateClass: (classData: any) => void
}

export function CreateClassDialog({ isOpen, onClose, onCreateClass }: CreateClassDialogProps) {
  const [classType, setClassType] = useState<"traditional" | "specialized">("traditional")
  const [name, setName] = useState("")
  const [grade, setGrade] = useState("")
  const [subject, setSubject] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [status, setStatus] = useState<"active" | "scheduled">("active")
  const [description, setDescription] = useState("")
  const [room, setRoom] = useState("")
  const [period, setPeriod] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [days, setDays] = useState<string[]>(["Monday", "Wednesday", "Friday"])
  const [color, setColor] = useState("bg-blue-500")
  const [enableAttendance, setEnableAttendance] = useState(true)
  const [enableGrading, setEnableGrading] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleDayToggle = (day: string) => {
    if (days.includes(day)) {
      setDays(days.filter((d) => d !== day))
    } else {
      setDays([...days, day])
    }
  }

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1)
  }

  // Update the handleSubmit function to properly create a class
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const classData = {
        name,
        type: classType,
        grade,
        subject,
        startDate,
        endDate,
        status,
        description,
        room,
        period,
        startTime,
        endTime,
        days,
        color,
        settings: {
          enableAttendance,
          enableGrading,
        },
        // Add studentCount for display purposes
        studentCount: 0,
        teacherId: "teacher-1", // In a real app, this would come from auth context
      }

      onCreateClass(classData)
      resetForm()
      setIsSubmitting(false)
      onClose()
    }, 1000)
  }

  const resetForm = () => {
    setName("")
    setGrade("")
    setSubject("")
    setStartDate(undefined)
    setEndDate(undefined)
    setStatus("active")
    setDescription("")
    setRoom("")
    setPeriod("")
    setStartTime("")
    setEndTime("")
    setDays(["Monday", "Wednesday", "Friday"])
    setColor("bg-blue-500")
    setEnableAttendance(true)
    setEnableGrading(true)
    setCurrentStep(1)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const colorOptions = [
    { value: "bg-blue-500", label: "Blue" },
    { value: "bg-green-500", label: "Green" },
    { value: "bg-purple-500", label: "Purple" },
    { value: "bg-yellow-500", label: "Yellow" },
    { value: "bg-red-500", label: "Red" },
    { value: "bg-indigo-500", label: "Indigo" },
    { value: "bg-pink-500", label: "Pink" },
    { value: "bg-orange-500", label: "Orange" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Class</DialogTitle>
            <DialogDescription>Create a new class or course for your school</DialogDescription>
          </DialogHeader>

          {currentStep === 1 && (
            <div className="py-4">
              <div className="mb-4">
                <Label className="mb-2 block">Class Type</Label>
                <RadioGroup
                  value={classType}
                  onValueChange={(value) => setClassType(value as "traditional" | "specialized")}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="traditional" id="traditional" />
                    <Label htmlFor="traditional">Traditional Class</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="specialized" id="specialized" />
                    <Label htmlFor="specialized">Specialized Course</Label>
                  </div>
                </RadioGroup>
              </div>

              <Tabs value={classType} className="mt-6">
                <TabsContent value="traditional" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="trad-name">Class Name</Label>
                      <Input
                        id="trad-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Grade 5A"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="grade">Grade Level</Label>
                      <Select value={grade} onValueChange={setGrade} required>
                        <SelectTrigger id="grade">
                          <SelectValue placeholder="Select grade level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="K">Kindergarten</SelectItem>
                          <SelectItem value="1">1st Grade</SelectItem>
                          <SelectItem value="2">2nd Grade</SelectItem>
                          <SelectItem value="3">3rd Grade</SelectItem>
                          <SelectItem value="4">4th Grade</SelectItem>
                          <SelectItem value="5">5th Grade</SelectItem>
                          <SelectItem value="6">6th Grade</SelectItem>
                          <SelectItem value="7">7th Grade</SelectItem>
                          <SelectItem value="8">8th Grade</SelectItem>
                          <SelectItem value="9">9th Grade</SelectItem>
                          <SelectItem value="10">10th Grade</SelectItem>
                          <SelectItem value="11">11th Grade</SelectItem>
                          <SelectItem value="12">12th Grade</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select value={subject} onValueChange={setSubject} required>
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="History">History</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="Art">Art</SelectItem>
                          <SelectItem value="Music">Music</SelectItem>
                          <SelectItem value="Physical Education">Physical Education</SelectItem>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Brief description of the class"
                        rows={3}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="specialized" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="spec-name">Course Name</Label>
                      <Input
                        id="spec-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Advanced Spanish - Evening"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select value={subject} onValueChange={setSubject} required>
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="History">History</SelectItem>
                          <SelectItem value="Spanish">Spanish</SelectItem>
                          <SelectItem value="French">French</SelectItem>
                          <SelectItem value="Art">Art</SelectItem>
                          <SelectItem value="Music">Music</SelectItem>
                          <SelectItem value="Physical Education">Physical Education</SelectItem>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="start-date">Start Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="start-date"
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !startDate && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {startDate ? format(startDate, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="end-date">End Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="end-date"
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !endDate && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {endDate ? format(endDate, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={endDate}
                              onSelect={setEndDate}
                              initialFocus
                              disabled={(date) => (startDate ? date < startDate : false)}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Brief description of the course"
                        rows={3}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {currentStep === 2 && (
            <div className="py-4">
              <h3 className="text-lg font-medium mb-4">Schedule &amp; Location</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="period">Period</Label>
                    <Input
                      id="period"
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      placeholder="e.g., 1st Period"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="room">Room</Label>
                    <Input
                      id="room"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      placeholder="e.g., Room 101"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Input id="end-time" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Days</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                      <Button
                        key={day}
                        type="button"
                        variant={days.includes(day) ? "default" : "outline"}
                        onClick={() => handleDayToggle(day)}
                        className="flex-1"
                      >
                        {day.substring(0, 3)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Color</Label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((colorOption) => (
                      <Button
                        key={colorOption.value}
                        type="button"
                        variant="outline"
                        className={cn(
                          "w-8 h-8 rounded-full p-0 border-2",
                          color === colorOption.value && "border-black dark:border-white",
                        )}
                        style={{ backgroundColor: colorOption.value.replace("bg-", "") }}
                        onClick={() => setColor(colorOption.value)}
                      >
                        <span className="sr-only">{colorOption.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="py-4">
              <h3 className="text-lg font-medium mb-4">Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="attendance">Enable Attendance Tracking</Label>
                    <p className="text-sm text-muted-foreground">Track student attendance for this class</p>
                  </div>
                  <Switch id="attendance" checked={enableAttendance} onCheckedChange={setEnableAttendance} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="grading">Enable Grading</Label>
                    <p className="text-sm text-muted-foreground">Allow grading of assignments for this class</p>
                  </div>
                  <Switch id="grading" checked={enableGrading} onCheckedChange={setEnableGrading} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="status">Class Status</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Active classes are visible to students. Scheduled classes are hidden until activated.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-sm text-muted-foreground">Set the visibility status of this class</p>
                  </div>
                  <Select value={status} onValueChange={(value) => setStatus(value as "active" | "scheduled")}>
                    <SelectTrigger id="status" className="w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={handlePreviousStep}>
                Back
              </Button>
            )}
            {currentStep < 3 ? (
              <Button type="button" onClick={handleNextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Class"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
