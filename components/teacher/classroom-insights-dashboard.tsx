"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, Users, CheckCircle, Award, TrendingUp, AlertTriangle, Clock, BookOpen } from "lucide-react"
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data for classroom insights
const weeklyAttendanceData = [
  { day: "Mon", present: 26, absent: 2 },
  { day: "Tue", present: 25, absent: 3 },
  { day: "Wed", present: 27, absent: 1 },
  { day: "Thu", present: 24, absent: 4 },
  { day: "Fri", present: 26, absent: 2 },
]

const assignmentStatusData = [
  { name: "Essay", completed: 22, late: 4, missing: 2 },
  { name: "Quiz", completed: 25, late: 2, missing: 1 },
  { name: "Project", completed: 20, late: 5, missing: 3 },
  { name: "Lab Report", completed: 24, late: 3, missing: 1 },
]

const studentScoreData = [
  { name: "Reading", below: 4, meeting: 18, exceeding: 6 },
  { name: "Writing", below: 6, meeting: 16, exceeding: 6 },
  { name: "Math", below: 5, meeting: 15, exceeding: 8 },
  { name: "Science", below: 3, meeting: 19, exceeding: 6 },
]

const gradeDistributionData = [
  { name: "A", value: 7, color: "#4ade80" },
  { name: "B", value: 12, color: "#a3e635" },
  { name: "C", value: 6, color: "#facc15" },
  { name: "D", value: 3, color: "#fb923c" },
  { name: "F", value: 2, color: "#f87171" },
]

const studentProgressData = [
  { name: "Alice Johnson", score: 92, trend: "+5%" },
  { name: "Bob Smith", score: 78, trend: "-2%" },
  { name: "Carol Williams", score: 85, trend: "+3%" },
  { name: "David Brown", score: 65, trend: "-4%" },
  { name: "Eva Davis", score: 88, trend: "+1%" },
]

const atRiskStudents = [
  { id: 1, name: "David Brown", issue: "Low test scores", lastActive: "3 days ago", grade: "D" },
  { id: 2, name: "Frank Miller", issue: "Missing assignments", lastActive: "5 days ago", grade: "F" },
  { id: 3, name: "Grace Taylor", issue: "Poor attendance", lastActive: "Yesterday", grade: "C-" },
]

const upcomingAssignments = [
  { id: 1, title: "Chapter 5 Quiz", dueDate: "Tomorrow", type: "Quiz" },
  { id: 2, title: "Research Paper", dueDate: "Next Monday", type: "Assignment" },
  { id: 3, title: "Group Presentation", dueDate: "Next Friday", type: "Project" },
]

export function ClassroomInsightsDashboard() {
  const [selectedClass, setSelectedClass] = useState<string>("English 101")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("Current Quarter")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Classroom Insights</h1>
          <p className="text-muted-foreground">Performance metrics and student progress tracking</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English 101">English 101</SelectItem>
              <SelectItem value="Math 202">Math 202</SelectItem>
              <SelectItem value="Science 303">Science 303</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Current Week">Current Week</SelectItem>
              <SelectItem value="Current Month">Current Month</SelectItem>
              <SelectItem value="Current Quarter">Current Quarter</SelectItem>
              <SelectItem value="Current Semester">Current Semester</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-muted-foreground">26 present today (93%)</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignment Completion</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-muted-foreground">12% late, 6% missing</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Average</CardTitle>
            <Award className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">B (84%)</div>
            <div className="flex items-center pt-1">
              <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-xs text-emerald-500">+1.5% from last quarter</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At-Risk Students</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex items-center pt-1">
              <span className="text-xs text-muted-foreground">10.7% of class needs intervention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Left Column - 2/3 width */}
        <div className="md:col-span-2 space-y-4">
          {/* Weekly Attendance */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance</CardTitle>
              <CardDescription>Daily attendance for the current week</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyAttendanceData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" />
                  <YAxis domain={[0, 30]} />
                  <Tooltip
                    formatter={(value, name) => [`${value} students`, name === "present" ? "Present" : "Absent"]}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Bar name="Present" dataKey="present" fill="#4ade80" radius={[4, 4, 0, 0]} />
                  <Bar name="Absent" dataKey="absent" fill="#f87171" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Assignment Status */}
          <Card>
            <CardHeader>
              <CardTitle>Assignment Status</CardTitle>
              <CardDescription>Recent assignments completion breakdown</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={assignmentStatusData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Bar name="Completed" dataKey="completed" stackId="a" fill="#4ade80" />
                  <Bar name="Late" dataKey="late" stackId="a" fill="#facc15" />
                  <Bar name="Missing" dataKey="missing" stackId="a" fill="#f87171" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Student Performance by Subject */}
          <Card>
            <CardHeader>
              <CardTitle>Performance by Subject</CardTitle>
              <CardDescription>Student achievement levels across subjects</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studentScoreData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Bar name="Below Standard" dataKey="below" stackId="a" fill="#f87171" />
                  <Bar name="Meeting Standard" dataKey="meeting" stackId="a" fill="#60a5fa" />
                  <Bar name="Exceeding Standard" dataKey="exceeding" stackId="a" fill="#4ade80" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-4">
          {/* Grade Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
              <CardDescription>Current grade breakdown</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {gradeDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} students`]} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
              <CardDescription>Next due dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center">
                    <div className="mr-4">
                      {assignment.type === "Quiz" && <BookOpen className="h-8 w-8 text-blue-500" />}
                      {assignment.type === "Assignment" && <Clock className="h-8 w-8 text-yellow-500" />}
                      {assignment.type === "Project" && <Users className="h-8 w-8 text-green-500" />}
                    </div>
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">Due: {assignment.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Assignments
              </Button>
            </CardFooter>
          </Card>

          {/* At-Risk Students */}
          <Card>
            <CardHeader>
              <CardTitle>Students Needing Support</CardTitle>
              <CardDescription>Intervention recommended</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {atRiskStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.issue}</p>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                          Grade: {student.grade}
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-2">Active: {student.lastActive}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Contact
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View Intervention Plans
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
