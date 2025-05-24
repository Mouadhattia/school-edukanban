"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Mail, Printer, Settings, User, Users } from "lucide-react"

export function ProgressReportGenerator() {
  const [reportType, setReportType] = useState<"individual" | "class">("individual")
  const [selectedStudent, setSelectedStudent] = useState<string>("student-1")
  const [selectedClass, setSelectedClass] = useState<string>("class-1")
  const [timeframe, setTimeframe] = useState<string>("quarter")
  const [isGenerating, setIsGenerating] = useState<boolean>(false)

  // Sample students data
  const students = [
    { id: "student-1", name: "Alex Johnson" },
    { id: "student-2", name: "Jamie Smith" },
    { id: "student-3", name: "Taylor Brown" },
    { id: "student-4", name: "Morgan Lee" },
    { id: "student-5", name: "Casey Wilson" },
  ]

  // Sample classes data
  const classes = [
    { id: "class-1", name: "Physics 101 - Period 1" },
    { id: "class-2", name: "Physics 101 - Period 2" },
    { id: "class-3", name: "Chemistry 201" },
  ]

  const handleGenerateReport = () => {
    setIsGenerating(true)
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Generate Progress Report</CardTitle>
        <CardDescription>Create detailed progress reports for students or classes</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="individual" onValueChange={(value) => setReportType(value as "individual" | "class")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individual">
              <User className="h-4 w-4 mr-2" />
              Individual Student
            </TabsTrigger>
            <TabsTrigger value="class">
              <Users className="h-4 w-4 mr-2" />
              Entire Class
            </TabsTrigger>
          </TabsList>
          <TabsContent value="individual" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="student">Select Student</Label>
              <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                <SelectTrigger id="student">
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          <TabsContent value="class" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="class">Select Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="timeframe">Report Timeframe</Label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger id="timeframe">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Past Week</SelectItem>
                <SelectItem value="month">Past Month</SelectItem>
                <SelectItem value="quarter">Current Quarter</SelectItem>
                <SelectItem value="semester">Current Semester</SelectItem>
                <SelectItem value="year">Academic Year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Report Sections</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="grades" defaultChecked />
                <Label htmlFor="grades">Grades & Assessments</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="completion" defaultChecked />
                <Label htmlFor="completion">Task Completion</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="attendance" defaultChecked />
                <Label htmlFor="attendance">Attendance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="participation" defaultChecked />
                <Label htmlFor="participation">Participation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="comments" defaultChecked />
                <Label htmlFor="comments">Teacher Comments</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="comparison" defaultChecked />
                <Label htmlFor="comparison">Class Comparison</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Report Format</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="pdf" defaultChecked />
                <Label htmlFor="pdf">PDF Document</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="excel" />
                <Label htmlFor="excel">Excel Spreadsheet</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="online" />
                <Label htmlFor="online">Online View</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Advanced Options
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" disabled={isGenerating}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" disabled={isGenerating}>
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button onClick={handleGenerateReport} disabled={isGenerating}>
            {isGenerating ? (
              <>Generating...</>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
