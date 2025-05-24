"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Users, Award, TrendingUp, CheckCircle, Calendar, Filter } from "lucide-react"
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Line,
  LineChart as RechartsLineChart,
  Area,
  AreaChart,
} from "recharts"

// Mock data for teacher analytics
const studentPerformanceData = [
  { name: "John D.", score: 85, previousScore: 80, improvement: 5 },
  { name: "Emma S.", score: 92, previousScore: 88, improvement: 4 },
  { name: "Michael T.", score: 78, previousScore: 75, improvement: 3 },
  { name: "Sophia R.", score: 90, previousScore: 92, improvement: -2 },
  { name: "James L.", score: 65, previousScore: 60, improvement: 5 },
  { name: "Olivia P.", score: 88, previousScore: 85, improvement: 3 },
  { name: "William K.", score: 75, previousScore: 72, improvement: 3 },
  { name: "Ava M.", score: 90, previousScore: 87, improvement: 3 },
]

const assignmentCompletionData = [
  { name: "Homework 1", completed: 25, incomplete: 3, onTime: 22, late: 3 },
  { name: "Quiz 1", completed: 27, incomplete: 1, onTime: 25, late: 2 },
  { name: "Project", completed: 22, incomplete: 6, onTime: 20, late: 2 },
  { name: "Midterm", completed: 28, incomplete: 0, onTime: 28, late: 0 },
  { name: "Homework 2", completed: 24, incomplete: 4, onTime: 21, late: 3 },
]

const weeklyProgressData = [
  { day: "Mon", attendance: 28, participation: 22, engagement: 20 },
  { day: "Tue", attendance: 27, participation: 25, engagement: 23 },
  { day: "Wed", attendance: 26, participation: 20, engagement: 18 },
  { day: "Thu", attendance: 28, participation: 24, engagement: 22 },
  { day: "Fri", attendance: 25, participation: 23, engagement: 21 },
]

const gradeDistributionData = [
  { name: "A", value: 8, color: "#4ade80" },
  { name: "B", value: 10, color: "#a3e635" },
  { name: "C", value: 7, color: "#fbbf24" },
  { name: "D", value: 3, color: "#fb923c" },
  { name: "F", value: 2, color: "#f87171" },
]

const studentList = [
  { id: 1, name: "John Doe", grade: "B+", lastSubmission: "2 days ago", status: "on-track", improvement: "+5%" },
  { id: 2, name: "Emma Smith", grade: "A", lastSubmission: "Yesterday", status: "on-track", improvement: "+3%" },
  { id: 3, name: "Michael Taylor", grade: "C", lastSubmission: "5 days ago", status: "at-risk", improvement: "-2%" },
  { id: 4, name: "Sophia Rodriguez", grade: "A-", lastSubmission: "Today", status: "on-track", improvement: "+4%" },
  { id: 5, name: "James Lee", grade: "D+", lastSubmission: "1 week ago", status: "at-risk", improvement: "-4%" },
]

const monthlyTrendsData = [
  { month: "Jan", avgScore: 78, attendance: 92 },
  { month: "Feb", avgScore: 80, attendance: 94 },
  { month: "Mar", avgScore: 82, attendance: 90 },
  { month: "Apr", avgScore: 79, attendance: 88 },
  { month: "May", avgScore: 85, attendance: 92 },
  { month: "Jun", avgScore: 88, attendance: 95 },
]

const skillsBreakdownData = [
  { name: "Critical Thinking", score: 82 },
  { name: "Problem Solving", score: 78 },
  { name: "Communication", score: 85 },
  { name: "Collaboration", score: 90 },
  { name: "Research", score: 75 },
  { name: "Technical Skills", score: 88 },
]

const timeSpentData = [
  { activity: "Reading", hours: 12, color: "#8884d8" },
  { activity: "Assignments", hours: 8, color: "#82ca9d" },
  { activity: "Discussion", hours: 5, color: "#ffc658" },
  { activity: "Quizzes", hours: 3, color: "#ff8042" },
  { activity: "Projects", hours: 7, color: "#0088fe" },
]

const classComparisonData = [
  { subject: "Math", currentClass: 85, schoolAvg: 78 },
  { subject: "Science", currentClass: 82, schoolAvg: 80 },
  { subject: "English", currentClass: 88, schoolAvg: 82 },
  { subject: "History", currentClass: 79, schoolAvg: 75 },
  { subject: "Art", currentClass: 92, schoolAvg: 85 },
]

export function TeacherAnalytics() {
  const [selectedClass, setSelectedClass] = useState<string>("Physics 101")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("This Week")
  const [selectedView, setSelectedView] = useState<string>("overview")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Class Insights</h1>
          <p className="text-muted-foreground">Monitor student progress and classroom performance</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Physics 101">Physics 101</SelectItem>
              <SelectItem value="Chemistry Lab">Chemistry Lab</SelectItem>
              <SelectItem value="Biology 201">Biology 201</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Today">Today</SelectItem>
              <SelectItem value="This Week">This Week</SelectItem>
              <SelectItem value="This Month">This Month</SelectItem>
              <SelectItem value="This Semester">This Semester</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Class Size</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28</div>
                <div className="flex items-center pt-1">
                  <span className="text-xs text-muted-foreground">2 absent today</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">86%</div>
                <Progress value={86} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Class Average</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">B (83%)</div>
                <div className="flex items-center pt-1">
                  <TrendingUp className="h-3 w-3 text-emerald-500 mr-1" />
                  <span className="text-xs text-emerald-500">+2.5% from last week</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <div className="flex items-center pt-1">
                  <span className="text-xs text-muted-foreground">Quiz (Fri), Lab Report (Mon)</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid gap-4 md:grid-cols-7">
            {/* Left Column - 4/7 width */}
            <div className="md:col-span-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Progress</CardTitle>
                  <CardDescription>Attendance and participation this week</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyProgressData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 30]} />
                      <Tooltip
                        formatter={(value, name) => [`${value} students`, name.charAt(0).toUpperCase() + name.slice(1)]}
                      />
                      <Legend verticalAlign="top" height={36} />
                      <Bar name="Attendance" dataKey="attendance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar name="Participation" dataKey="participation" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      <Bar name="Engagement" dataKey="engagement" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assignment Completion</CardTitle>
                  <CardDescription>Status of recent assignments</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={assignmentCompletionData}
                      layout="vertical"
                      margin={{ top: 10, right: 10, left: 70, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                      <XAxis type="number" domain={[0, 30]} />
                      <YAxis type="category" dataKey="name" width={70} />
                      <Tooltip />
                      <Legend verticalAlign="top" height={36} />
                      <Bar name="On Time" dataKey="onTime" stackId="a" fill="#22c55e" />
                      <Bar name="Late" dataKey="late" stackId="a" fill="#eab308" />
                      <Bar name="Incomplete" dataKey="incomplete" stackId="a" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - 3/7 width */}
            <div className="md:col-span-3 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Grade Distribution</CardTitle>
                  <CardDescription>Current grade breakdown</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={gradeDistributionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {gradeDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} students`]} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Performance</CardTitle>
                  <CardDescription>Individual scores (most recent assessment)</CardDescription>
                </CardHeader>
                <CardContent className="h-[350px] overflow-auto">
                  <div className="space-y-4">
                    {studentPerformanceData.map((student) => (
                      <div key={student.name} className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{student.name}</p>
                          <div className="flex items-center">
                            <span className={`text-xs ${student.improvement > 0 ? "text-green-500" : "text-red-500"}`}>
                              {student.improvement > 0 ? "+" : ""}
                              {student.improvement}%
                            </span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0 w-[60%]">
                          <div className="flex items-center gap-2">
                            <Progress
                              value={student.score}
                              className="h-2"
                              indicatorClassName={
                                student.score >= 90
                                  ? "bg-emerald-500"
                                  : student.score >= 80
                                    ? "bg-green-500"
                                    : student.score >= 70
                                      ? "bg-yellow-500"
                                      : student.score >= 60
                                        ? "bg-orange-500"
                                        : "bg-red-500"
                              }
                            />
                            <span className="text-sm font-medium w-8">{student.score}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Students At Risk */}
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div>
                <CardTitle>Students Needing Attention</CardTitle>
                <CardDescription>Students who may need additional support</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Student</th>
                      <th className="text-left py-3 px-2 font-medium">Current Grade</th>
                      <th className="text-left py-3 px-2 font-medium">Last Submission</th>
                      <th className="text-left py-3 px-2 font-medium">Status</th>
                      <th className="text-left py-3 px-2 font-medium">Trend</th>
                      <th className="text-left py-3 px-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentList
                      .filter((s) => s.status === "at-risk")
                      .map((student) => (
                        <tr key={student.id} className="border-b">
                          <td className="py-3 px-2">{student.name}</td>
                          <td className="py-3 px-2">{student.grade}</td>
                          <td className="py-3 px-2">{student.lastSubmission}</td>
                          <td className="py-3 px-2">
                            <Badge variant="destructive">Needs Help</Badge>
                          </td>
                          <td className="py-3 px-2">
                            <span className={student.improvement.startsWith("+") ? "text-green-500" : "text-red-500"}>
                              {student.improvement}
                            </span>
                          </td>
                          <td className="py-3 px-2">
                            <Button variant="ghost" size="sm">
                              Contact
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Student Improvement</CardTitle>
                <CardDescription>Progress compared to previous assessment</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={studentPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" width={80} />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Bar name="Current Score" dataKey="score" fill="#3b82f6" />
                    <Bar name="Previous Score" dataKey="previousScore" fill="#9ca3af" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Patterns</CardTitle>
                <CardDescription>Student attendance over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrendsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis domain={[70, 100]} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="attendance"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorAttendance)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student Engagement Details</CardTitle>
              <CardDescription>Comprehensive view of student participation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Student</th>
                      <th className="text-left py-3 px-2 font-medium">Attendance</th>
                      <th className="text-left py-3 px-2 font-medium">Participation</th>
                      <th className="text-left py-3 px-2 font-medium">Assignments</th>
                      <th className="text-left py-3 px-2 font-medium">Current Grade</th>
                      <th className="text-left py-3 px-2 font-medium">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentList.map((student) => (
                      <tr key={student.id} className="border-b">
                        <td className="py-3 px-2 font-medium">{student.name}</td>
                        <td className="py-3 px-2">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            95%
                          </Badge>
                        </td>
                        <td className="py-3 px-2">
                          <Progress value={student.id % 2 === 0 ? 85 : 70} className="h-2 w-24" />
                        </td>
                        <td className="py-3 px-2">
                          {student.id % 3 === 0 ? (
                            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                              2 Late
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                              All Complete
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-2">{student.grade}</td>
                        <td className="py-3 px-2">
                          <span className={student.improvement.startsWith("+") ? "text-green-500" : "text-red-500"}>
                            {student.improvement}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Completion Rates</CardTitle>
                <CardDescription>Submission status by assignment</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={assignmentCompletionData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Bar name="On Time" dataKey="onTime" stackId="a" fill="#22c55e" />
                    <Bar name="Late" dataKey="late" stackId="a" fill="#eab308" />
                    <Bar name="Incomplete" dataKey="incomplete" stackId="a" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assignment Performance</CardTitle>
                <CardDescription>Average scores by assignment type</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={[
                      { name: "Homework", score: 82 },
                      { name: "Quizzes", score: 78 },
                      { name: "Projects", score: 85 },
                      { name: "Tests", score: 76 },
                      { name: "Participation", score: 90 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
              <CardDescription>Comprehensive view of all assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Assignment</th>
                      <th className="text-left py-3 px-2 font-medium">Type</th>
                      <th className="text-left py-3 px-2 font-medium">Due Date</th>
                      <th className="text-left py-3 px-2 font-medium">Completion</th>
                      <th className="text-left py-3 px-2 font-medium">Avg. Score</th>
                      <th className="text-left py-3 px-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignmentCompletionData.map((assignment, index) => (
                      <tr key={assignment.name} className="border-b">
                        <td className="py-3 px-2 font-medium">{assignment.name}</td>
                        <td className="py-3 px-2">
                          {index % 3 === 0 ? "Homework" : index % 3 === 1 ? "Quiz" : "Project"}
                        </td>
                        <td className="py-3 px-2">
                          {new Date(
                            Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000,
                          ).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <Progress
                              value={(assignment.completed / (assignment.completed + assignment.incomplete)) * 100}
                              className="h-2 w-24"
                            />
                            <span className="text-sm">
                              {Math.round(
                                (assignment.completed / (assignment.completed + assignment.incomplete)) * 100,
                              )}
                              %
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-2">{75 + Math.floor(Math.random() * 15)}%</td>
                        <td className="py-3 px-2">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance Trends</CardTitle>
                <CardDescription>Average scores and attendance over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={monthlyTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" domain={[70, 100]} />
                    <YAxis yAxisId="right" orientation="right" domain={[70, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="avgScore"
                      name="Average Score"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line yAxisId="right" type="monotone" dataKey="attendance" name="Attendance %" stroke="#82ca9d" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Class Comparison</CardTitle>
                <CardDescription>Performance relative to school average</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={classComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar name="Current Class" dataKey="currentClass" fill="#3b82f6" />
                    <Bar name="School Average" dataKey="schoolAvg" fill="#9ca3af" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Time Spent Analysis</CardTitle>
              <CardDescription>Distribution of class time by activity</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={timeSpentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="hours"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {timeSpentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} hours`]} />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Skills Breakdown</CardTitle>
                <CardDescription>Average proficiency by skill area</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={skillsBreakdownData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#8884d8" background={{ fill: "#eee" }} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Development Over Time</CardTitle>
                <CardDescription>Progress in key competency areas</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={[
                      { month: "Sep", critical: 70, problem: 65, communication: 75 },
                      { month: "Oct", critical: 72, problem: 68, communication: 78 },
                      { month: "Nov", critical: 75, problem: 72, communication: 80 },
                      { month: "Dec", critical: 78, problem: 75, communication: 82 },
                      { month: "Jan", critical: 80, problem: 78, communication: 85 },
                      { month: "Feb", critical: 82, problem: 78, communication: 85 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[60, 90]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="critical"
                      name="Critical Thinking"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                    <Line type="monotone" dataKey="problem" name="Problem Solving" stroke="#82ca9d" strokeWidth={2} />
                    <Line
                      type="monotone"
                      dataKey="communication"
                      name="Communication"
                      stroke="#ffc658"
                      strokeWidth={2}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Individual Skill Assessment</CardTitle>
              <CardDescription>Detailed breakdown by student</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Student</th>
                      <th className="text-left py-3 px-2 font-medium">Critical Thinking</th>
                      <th className="text-left py-3 px-2 font-medium">Problem Solving</th>
                      <th className="text-left py-3 px-2 font-medium">Communication</th>
                      <th className="text-left py-3 px-2 font-medium">Collaboration</th>
                      <th className="text-left py-3 px-2 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentList.map((student) => (
                      <tr key={student.id} className="border-b">
                        <td className="py-3 px-2 font-medium">{student.name}</td>
                        <td className="py-3 px-2">
                          <Progress value={70 + Math.floor(Math.random() * 20)} className="h-2 w-24" />
                        </td>
                        <td className="py-3 px-2">
                          <Progress value={70 + Math.floor(Math.random() * 20)} className="h-2 w-24" />
                        </td>
                        <td className="py-3 px-2">
                          <Progress value={70 + Math.floor(Math.random() * 20)} className="h-2 w-24" />
                        </td>
                        <td className="py-3 px-2">
                          <Progress value={70 + Math.floor(Math.random() * 20)} className="h-2 w-24" />
                        </td>
                        <td className="py-3 px-2">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
