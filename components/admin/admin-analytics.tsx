"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, HelpCircle } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"

interface AdminAnalyticsProps {
  schoolId: string
}

export function AdminAnalytics({ schoolId }: AdminAnalyticsProps) {
  const [period, setPeriod] = useState<string>("month")

  // Sample data for user activity
  const userActivityData = [
    { date: "Jan", teachers: 120, students: 450 },
    { date: "Feb", teachers: 140, students: 480 },
    { date: "Mar", teachers: 160, students: 520 },
    { date: "Apr", teachers: 180, students: 550 },
    { date: "May", teachers: 200, students: 580 },
    { date: "Jun", teachers: 220, students: 600 },
    { date: "Jul", teachers: 240, students: 620 },
    { date: "Aug", teachers: 260, students: 640 },
    { date: "Sep", teachers: 280, students: 660 },
    { date: "Oct", teachers: 300, students: 680 },
    { date: "Nov", teachers: 320, students: 700 },
    { date: "Dec", teachers: 340, students: 720 },
  ]

  // Sample data for board usage
  const boardUsageData = [
    { name: "Science", value: 35 },
    { name: "Math", value: 25 },
    { name: "English", value: 20 },
    { name: "History", value: 15 },
    { name: "Art", value: 5 },
  ]

  // Sample data for task completion
  const taskCompletionData = [
    { month: "Jan", completed: 65, overdue: 10, inProgress: 25 },
    { month: "Feb", completed: 68, overdue: 12, inProgress: 20 },
    { month: "Mar", completed: 70, overdue: 8, inProgress: 22 },
    { month: "Apr", completed: 72, overdue: 7, inProgress: 21 },
    { month: "May", completed: 75, overdue: 5, inProgress: 20 },
    { month: "Jun", completed: 78, overdue: 4, inProgress: 18 },
  ]

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">School Analytics</h3>
          <p className="text-sm text-muted-foreground">View usage statistics and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={period} onValueChange={setPeriod} className="w-[400px]">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="quarter">Quarter</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">User Activity</CardTitle>
              <CardDescription>Monthly active users</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  teachers: {
                    label: "Teachers",
                    color: "hsl(var(--chart-1))",
                  },
                  students: {
                    label: "Students",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="teachers"
                      stroke="var(--color-teachers)"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="students" stroke="var(--color-students)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Board Usage by Department</CardTitle>
              <CardDescription>Distribution of active boards</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={boardUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {boardUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base">Task Completion Rate</CardTitle>
              <CardDescription>Monthly task status breakdown</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  completed: {
                    label: "Completed",
                    color: "hsl(var(--chart-3))",
                  },
                  overdue: {
                    label: "Overdue",
                    color: "hsl(var(--chart-4))",
                  },
                  inProgress: {
                    label: "In Progress",
                    color: "hsl(var(--chart-5))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={taskCompletionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="completed" stackId="a" fill="var(--color-completed)" />
                    <Bar dataKey="overdue" stackId="a" fill="var(--color-overdue)" />
                    <Bar dataKey="inProgress" stackId="a" fill="var(--color-inProgress)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Key performance indicators for your school</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground">Average Task Completion Time</div>
              <div className="mt-2 flex items-center">
                <div className="text-2xl font-bold">3.2 days</div>
                <div className="ml-2 flex items-center text-sm text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 01-1 1H9a1 1 0 01-1-1V6a1 1 0 011-1h2a1 1 0 011 1v1zm-4 4a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a3 3 0 11-6 0 3 3 0 016 0zm-9 8a3 3 0 116 0 3 3 0 01-6 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-1">-0.5 days</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground">Student Engagement Rate</div>
              <div className="mt-2 flex items-center">
                <div className="text-2xl font-bold">87%</div>
                <div className="ml-2 flex items-center text-sm text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 01-1 1H9a1 1 0 01-1-1V6a1 1 0 011-1h2a1 1 0 011 1v1zm-4 4a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a3 3 0 11-6 0 3 3 0 016 0zm-9 8a3 3 0 116 0 3 3 0 01-6 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-1">+3%</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground">Teacher Participation</div>
              <div className="mt-2 flex items-center">
                <div className="text-2xl font-bold">92%</div>
                <div className="ml-2 flex items-center text-sm text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 01-1 1H9a1 1 0 01-1-1V6a1 1 0 011-1h2a1 1 0 011 1v1zm-4 4a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a3 3 0 11-6 0 3 3 0 016 0zm-9 8a3 3 0 116 0 3 3 0 01-6 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-1">+5%</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground">System Uptime</div>
              <div className="mt-2 flex items-center">
                <div className="text-2xl font-bold">99.9%</div>
                <div className="ml-2 flex items-center text-sm text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 01-1 1H9a1 1 0 01-1-1V6a1 1 0 011-1h2a1 1 0 011 1v1zm-4 4a1 1 0 011-1h2a1 1 0 011 1v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm9 4a3 3 0 11-6 0 3 3 0 016 0zm-9 8a3 3 0 116 0 3 3 0 01-6 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-1">+0.2%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
