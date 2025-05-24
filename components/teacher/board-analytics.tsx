"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Pie,
  PieChart,
  Scatter,
  ScatterChart,
  ZAxis,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Download, Filter, Users } from "lucide-react"
import type { Task, Student } from "@/lib/types"

interface BoardAnalyticsProps {
  tasks: Task[]
  students: Student[]
}

export function BoardAnalytics({ tasks, students }: BoardAnalyticsProps) {
  const [timeRange, setTimeRange] = useState<string>("semester")
  const [studentFilter, setStudentFilter] = useState<string>("all")

  // Calculate task completion data
  const tasksByType = tasks.reduce(
    (acc, task) => {
      acc[task.type] = (acc[task.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const taskTypeData = Object.entries(tasksByType).map(([name, value]) => ({
    name,
    value,
  }))

  // Calculate task priority data
  const tasksByPriority = tasks.reduce(
    (acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const priorityData = [
    { name: "High", value: tasksByPriority.high || 0 },
    { name: "Medium", value: tasksByPriority.medium || 0 },
    { name: "Low", value: tasksByPriority.low || 0 },
  ]

  // Calculate student assignment data
  const studentAssignmentCounts = students.map((student) => {
    const assignedCount = tasks.filter((task) => task.assignedStudentIds.includes(student.id)).length
    const completedCount = Math.floor(Math.random() * assignedCount) // Simulated data
    const lateCount = Math.floor(Math.random() * (assignedCount - completedCount)) // Simulated data

    return {
      id: student.id,
      name: student.name,
      firstName: student.name.split(" ")[0], // Just use first name for chart
      assignments: assignedCount,
      completed: completedCount,
      late: lateCount,
      onTime: completedCount - lateCount,
      completionRate: assignedCount > 0 ? (completedCount / assignedCount) * 100 : 0,
    }
  })

  // Sample data for task completion over time
  const completionTimelineData = [
    { date: "Week 1", completed: 5, assigned: 8, onTime: 4, late: 1 },
    { date: "Week 2", completed: 7, assigned: 10, onTime: 5, late: 2 },
    { date: "Week 3", completed: 9, assigned: 12, onTime: 7, late: 2 },
    { date: "Week 4", completed: 12, assigned: 15, onTime: 10, late: 2 },
    { date: "Week 5", completed: 15, assigned: 18, onTime: 12, late: 3 },
    { date: "Week 6", completed: 18, assigned: 20, onTime: 15, late: 3 },
  ]

  // Student engagement scatter plot data
  const studentEngagementData = studentAssignmentCounts.map((student) => ({
    name: student.firstName,
    completionRate: student.completionRate,
    assignments: student.assignments,
    onTimeRate: (student.onTime / (student.completed || 1)) * 100,
  }))

  // Task difficulty analysis
  const taskDifficultyData = [
    { name: "Forces and Motion", avgCompletionTime: 5.2, lateSubmissions: 3, type: "assignment" },
    { name: "Momentum Problems", avgCompletionTime: 2.8, lateSubmissions: 1, type: "homework" },
    { name: "Midterm Review", avgCompletionTime: 4.5, lateSubmissions: 0, type: "review" },
    { name: "Kinematics Quiz", avgCompletionTime: 1.2, lateSubmissions: 2, type: "assessment" },
  ]

  // Student progress comparison
  const studentProgressData = studentAssignmentCounts.map((student) => ({
    name: student.firstName,
    completionRate: student.completionRate,
    classAverage: 78, // Simulated class average
  }))

  // Skill mastery heatmap data (simulated)
  const skillMasteryData = [
    { skill: "Newton's First Law", mastery: 85 },
    { skill: "Newton's Second Law", mastery: 72 },
    { skill: "Newton's Third Law", mastery: 68 },
    { skill: "Conservation of Momentum", mastery: 76 },
    { skill: "Kinematics Equations", mastery: 81 },
  ]

  // Time spent analysis
  const timeSpentData = [
    { day: "Mon", hours: 1.5 },
    { day: "Tue", hours: 2.1 },
    { day: "Wed", hours: 1.8 },
    { day: "Thu", hours: 2.3 },
    { day: "Fri", hours: 1.2 },
    { day: "Sat", hours: 0.5 },
    { day: "Sun", hours: 0.3 },
  ]

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  // Calculate insights
  const mostActiveStudent = [...studentAssignmentCounts].sort((a, b) => b.completed - a.completed)[0]
  const leastActiveStudent = [...studentAssignmentCounts].sort((a, b) => a.completed - b.completed)[0]
  const mostDifficultTask = [...taskDifficultyData].sort((a, b) => b.avgCompletionTime - a.avgCompletionTime)[0]
  const mostLateSubmissions = [...taskDifficultyData].sort((a, b) => b.lateSubmissions - a.lateSubmissions)[0]

  return (
    <div className="space-y-6 pb-8">
      {/* Analytics Controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Past Week</SelectItem>
              <SelectItem value="month">Past Month</SelectItem>
              <SelectItem value="semester">Full Semester</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Select value={studentFilter} onValueChange={setStudentFilter}>
            <SelectTrigger className="w-[180px]">
              <Users className="mr-2 h-4 w-4" />
              <SelectValue placeholder="All Students" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
              {students.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="students">Student Analysis</TabsTrigger>
          <TabsTrigger value="tasks">Task Analysis</TabsTrigger>
          <TabsTrigger value="skills">Skill Mastery</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Key Insights */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>Important patterns and observations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Most Active Student</div>
                  <div className="mt-1">
                    <div className="text-lg font-bold">{mostActiveStudent.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Completed {mostActiveStudent.completed} of {mostActiveStudent.assignments} tasks
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Needs Attention</div>
                  <div className="mt-1">
                    <div className="text-lg font-bold">{leastActiveStudent.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Only completed {leastActiveStudent.completed} of {leastActiveStudent.assignments} tasks
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Most Challenging Task</div>
                  <div className="mt-1">
                    <div className="text-lg font-bold truncate">{mostDifficultTask.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Avg. completion time: {mostDifficultTask.avgCompletionTime} days
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Most Late Submissions</div>
                  <div className="mt-1">
                    <div className="text-lg font-bold truncate">{mostLateSubmissions.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {mostLateSubmissions.lateSubmissions} late submissions
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Task Completion Timeline</CardTitle>
                <CardDescription>Progress over time</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px]">
                  <ChartContainer
                    config={{
                      completed: {
                        label: "Completed",
                        color: "hsl(var(--chart-5))",
                      },
                      assigned: {
                        label: "Assigned",
                        color: "hsl(var(--chart-6))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={completionTimelineData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend verticalAlign="top" height={36} />
                        <Line
                          type="monotone"
                          dataKey="assigned"
                          stroke="var(--color-assigned)"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                        <Line
                          type="monotone"
                          dataKey="completed"
                          stroke="var(--color-completed)"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Student Engagement</CardTitle>
                <CardDescription>Completion rate vs. assignments</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px]">
                  <ChartContainer
                    config={{
                      completionRate: {
                        label: "Completion Rate",
                        color: "hsl(var(--chart-1))",
                      },
                      assignments: {
                        label: "Assignments",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="assignments" name="Assignments" />
                        <YAxis
                          type="number"
                          dataKey="completionRate"
                          name="Completion Rate"
                          unit="%"
                          domain={[0, 100]}
                        />
                        <ZAxis type="number" range={[50, 400]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend verticalAlign="top" height={36} />
                        <Scatter name="Students" data={studentEngagementData} fill="var(--color-completionRate)" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Task Distribution by Type</CardTitle>
                <CardDescription>Breakdown of tasks by category</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <Pie
                        data={taskTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {taskTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Time Spent by Day</CardTitle>
                <CardDescription>Average student time spent on tasks</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px]">
                  <ChartContainer
                    config={{
                      hours: {
                        label: "Hours",
                        color: "hsl(var(--chart-4))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={timeSpentData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend verticalAlign="top" height={36} />
                        <Bar dataKey="hours" fill="var(--color-hours)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Student Analysis Tab */}
        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Student Performance Comparison</CardTitle>
              <CardDescription>Individual completion rates compared to class average</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[350px]">
                <ChartContainer
                  config={{
                    completionRate: {
                      label: "Student Completion Rate",
                      color: "hsl(var(--chart-1))",
                    },
                    classAverage: {
                      label: "Class Average",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={studentProgressData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 60, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" width={60} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend verticalAlign="top" height={36} />
                      <Bar dataKey="completionRate" fill="var(--color-completionRate)" />
                      <Bar dataKey="classAverage" fill="var(--color-classAverage)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>On-Time vs. Late Submissions</CardTitle>
                <CardDescription>Breakdown of submission timeliness</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px]">
                  <ChartContainer
                    config={{
                      onTime: {
                        label: "On Time",
                        color: "hsl(var(--chart-3))",
                      },
                      late: {
                        label: "Late",
                        color: "hsl(var(--chart-4))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={studentAssignmentCounts} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="firstName" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend verticalAlign="top" height={36} />
                        <Bar dataKey="onTime" stackId="a" fill="var(--color-onTime)" />
                        <Bar dataKey="late" stackId="a" fill="var(--color-late)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Student Engagement Trends</CardTitle>
                <CardDescription>Weekly activity patterns</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center h-[250px]">
                  <p className="text-muted-foreground">Detailed student engagement trends would be shown here</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Individual Student Insights</CardTitle>
              <CardDescription>Select a student to view detailed analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[150px]">
                <p className="text-muted-foreground">
                  {studentFilter === "all"
                    ? "Select a specific student from the dropdown above to view detailed insights"
                    : `Detailed analytics for ${students.find((s) => s.id === studentFilter)?.name || "selected student"} would be shown here`}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Task Analysis Tab */}
        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Task Difficulty Analysis</CardTitle>
              <CardDescription>Average completion time and late submissions by task</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[350px]">
                <ChartContainer
                  config={{
                    avgCompletionTime: {
                      label: "Avg. Completion Time (days)",
                      color: "hsl(var(--chart-5))",
                    },
                    lateSubmissions: {
                      label: "Late Submissions",
                      color: "hsl(var(--chart-6))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={taskDifficultyData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 100, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend verticalAlign="top" height={36} />
                      <Bar dataKey="avgCompletionTime" fill="var(--color-avgCompletionTime)" />
                      <Bar dataKey="lateSubmissions" fill="var(--color-lateSubmissions)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Task Priority Distribution</CardTitle>
                <CardDescription>Breakdown of tasks by priority level</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[250px]">
                  <ChartContainer
                    config={{
                      value: {
                        label: "Tasks",
                        color: "hsl(var(--chart-7))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={priorityData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend verticalAlign="top" height={36} />
                        <Bar dataKey="value" fill="var(--color-value)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Task Completion Patterns</CardTitle>
                <CardDescription>When students typically complete tasks</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col items-center justify-center h-[250px] gap-4">
                  <Clock className="h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground text-center">
                    Most tasks are completed between
                    <br />
                    <span className="font-bold">7:00 PM and 10:00 PM</span>
                    <br />
                    with a peak on Sunday evenings
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Task Correlation Analysis</CardTitle>
              <CardDescription>Relationships between different tasks and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[150px]">
                <p className="text-muted-foreground">
                  Students who performed well on "Forces and Motion" also excelled at "Momentum Problems"
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skill Mastery Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Class Skill Mastery</CardTitle>
              <CardDescription>Average mastery level for key physics concepts</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    mastery: {
                      label: "Mastery Level",
                      color: "hsl(var(--chart-8))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={skillMasteryData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 120, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="skill" type="category" width={120} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend verticalAlign="top" height={36} />
                      <Bar dataKey="mastery" fill="var(--color-mastery)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Skill Growth Over Time</CardTitle>
                <CardDescription>Progress in mastery throughout the semester</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center h-[250px]">
                  <p className="text-muted-foreground">Skill growth timeline would be shown here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Skill Gap Analysis</CardTitle>
                <CardDescription>Areas needing additional focus</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center h-[250px]">
                  <p className="text-muted-foreground">
                    <span className="font-bold">Newton's Third Law</span> has the lowest mastery level and may require
                    additional instruction
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Individual Student Skill Mastery</CardTitle>
              <CardDescription>Select a student to view their skill mastery levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[150px]">
                <p className="text-muted-foreground">
                  {studentFilter === "all"
                    ? "Select a specific student from the dropdown above to view their skill mastery"
                    : `Skill mastery breakdown for ${students.find((s) => s.id === studentFilter)?.name || "selected student"} would be shown here`}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
