"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { BarChart2, Users, BookOpen, Calendar, Search, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TeacherSidebar } from "@/components/teacher/teacher-sidebar"
import { UserNav } from "@/components/shared/user-nav"
import { ClassProgressChart } from "@/components/teacher/class-progress-chart"
import { StudentProgressTable } from "@/components/teacher/student-progress-table"
import { TaskCompletionChart } from "@/components/teacher/task-completion-chart"
import { StudentComparisonChart } from "@/components/teacher/student-comparison-chart"

export function TeacherProgressTracking() {
  const [selectedClass, setSelectedClass] = useState<string>("class-1")
  const [searchQuery, setSearchQuery] = useState<string>("")

  // Sample classes data
  const classes = [
    { id: "class-1", name: "Physics 101 - Period 1" },
    { id: "class-2", name: "Physics 101 - Period 2" },
    { id: "class-3", name: "Chemistry 201" },
  ]

  // Sample progress data
  const progressData = {
    overallCompletion: 72,
    studentsOnTrack: 18,
    totalStudents: 25,
    averageGrade: "B",
    tasksCompleted: 156,
    totalTasks: 200,
    subjects: [
      { name: "Mechanics", completion: 85 },
      { name: "Thermodynamics", completion: 65 },
      { name: "Waves", completion: 70 },
      { name: "Electricity", completion: 60 },
    ],
  }

  const handleClassChange = (value: string) => {
    setSelectedClass(value)
  }

  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />

      <div className="flex-1">
        <header className="sticky top-0 z-10 border-b bg-background">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Select value={selectedClass} onValueChange={handleClassChange}>
                <SelectTrigger className="w-[240px]">
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
            <div className="flex items-center gap-4">
              <UserNav role="teacher" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Student Progress Tracking</h2>
            <p className="text-muted-foreground mt-1">
              Monitor student progress and performance for {classes.find((cls) => cls.id === selectedClass)?.name}
            </p>
          </div>

          {/* Progress Overview Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overall Completion</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{progressData.overallCompletion}%</div>
                <Progress value={progressData.overallCompletion} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {progressData.tasksCompleted} of {progressData.totalTasks} tasks completed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Students On Track</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {progressData.studentsOnTrack}/{progressData.totalStudents}
                </div>
                <Progress value={(progressData.studentsOnTrack / progressData.totalStudents) * 100} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {Math.round((progressData.studentsOnTrack / progressData.totalStudents) * 100)}% of students on track
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{progressData.averageGrade}</div>
                <p className="text-xs text-muted-foreground mt-2">Class average across all assignments</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Assessment</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Apr 15</div>
                <p className="text-xs text-muted-foreground mt-2">Physics Quiz: Waves and Optics</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">
                <BarChart2 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="students">
                <Users className="h-4 w-4 mr-2" />
                Students
              </TabsTrigger>
              <TabsTrigger value="tasks">
                <BookOpen className="h-4 w-4 mr-2" />
                Tasks
              </TabsTrigger>
              <TabsTrigger value="calendar">
                <Calendar className="h-4 w-4 mr-2" />
                Calendar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Class Progress Over Time</CardTitle>
                    <CardDescription>Average completion rate over the past 8 weeks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ClassProgressChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Task Completion</CardTitle>
                    <CardDescription>Breakdown by task type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TaskCompletionChart />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Topic Progress</CardTitle>
                  <CardDescription>Completion rate by subject area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {progressData.subjects.map((subject) => (
                      <div key={subject.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{subject.name}</span>
                          <span className="text-sm font-medium">{subject.completion}%</span>
                        </div>
                        <Progress value={subject.completion} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search students..."
                    className="w-full pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Students</SelectItem>
                      <SelectItem value="on-track">On Track</SelectItem>
                      <SelectItem value="at-risk">At Risk</SelectItem>
                      <SelectItem value="behind">Behind</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Student Progress</CardTitle>
                  <CardDescription>Individual student performance and completion rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <StudentProgressTable />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Comparison</CardTitle>
                  <CardDescription>Compare performance across different metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <StudentComparisonChart />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Task Completion Rates</CardTitle>
                  <CardDescription>Percentage of students who have completed each task</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Physics Lab Report", completion: 92, dueDate: "Mar 28, 2025" },
                      { name: "Forces and Motion Quiz", completion: 100, dueDate: "Mar 20, 2025" },
                      { name: "Thermodynamics Problem Set", completion: 84, dueDate: "Apr 2, 2025" },
                      { name: "Wave Properties Lab", completion: 76, dueDate: "Apr 8, 2025" },
                      { name: "Electricity Homework", completion: 60, dueDate: "Apr 12, 2025" },
                    ].map((task) => (
                      <div key={task.name}>
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <span className="text-sm font-medium">{task.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">Due: {task.dueDate}</span>
                          </div>
                          <span className="text-sm font-medium">{task.completion}%</span>
                        </div>
                        <Progress value={task.completion} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Class Calendar</CardTitle>
                  <CardDescription>View upcoming assignments and assessments</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Calendar view would be implemented here</p>
                    <p className="text-sm text-muted-foreground mt-2">Showing tasks organized by due dates</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
