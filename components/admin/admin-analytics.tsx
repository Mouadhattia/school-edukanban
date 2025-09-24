"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Download, 
  HelpCircle, 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Activity,
  School,
  GraduationCap,
  UserCheck,
  Clock,
  Target,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react"
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
  Area,
  AreaChart,
} from "recharts"
import { useOrganizationData } from "@/contexts/organization-data-context"

interface AdminAnalyticsProps {
  schoolId: string
}

export function AdminAnalytics({ schoolId }: AdminAnalyticsProps) {
  const [period, setPeriod] = useState<string>("month")
  const { schoolDashboard, user, getSchoolDashboard } = useOrganizationData();

  useEffect(() => {
    if (user && user.schoolIds) {
      getSchoolDashboard(user.schoolIds[0]);
    }
  }, [user]);

  // Transform real data for user activity chart
  const userActivityData = schoolDashboard?.data?.users?.registrationTrends?.length && schoolDashboard.data.users.registrationTrends.length > 0 
    ? schoolDashboard.data.users.registrationTrends.map((trend: any, index: number) => ({
        date: trend.month || `Month ${index + 1}`,
        teachers: trend.teachers || 0,
        students: trend.students || 0,
      }))
    : [
        { date: "Current", teachers: schoolDashboard?.data?.users?.breakdown?.teachers || 0, students: schoolDashboard?.data?.users?.breakdown?.students || 0 },
      ];

  // Transform real data for department/subject usage - using enrollment trends as proxy
  const boardUsageData = schoolDashboard?.data?.enrollments?.monthlyTrends?.length && schoolDashboard.data.enrollments.monthlyTrends.length > 0
    ? schoolDashboard.data.enrollments.monthlyTrends.slice(0, 5).map((trend: any, index: number) => ({
        name: `Period ${trend._id.month}/${trend._id.year}`,
        value: trend.total,
      }))
    : [
        { name: "Active Classrooms", value: schoolDashboard?.data?.classrooms?.active || 0 },
        { name: "Total Courses", value: schoolDashboard?.data?.courses?.total || 0 },
        { name: "Total Boards", value: schoolDashboard?.data?.boards?.total || 0 },
        { name: "Active Users", value: schoolDashboard?.data?.users?.active || 0 },
        { name: "Sessions", value: schoolDashboard?.data?.sessions?.total || 0 },
      ];

  // Transform real data for task completion - using enrollment status as proxy
  const taskCompletionData = schoolDashboard?.data?.enrollments?.monthlyTrends?.length && schoolDashboard.data.enrollments.monthlyTrends.length > 0
    ? schoolDashboard.data.enrollments.monthlyTrends.map((trend: any) => ({
        month: `${trend._id.month}/${trend._id.year}`,
        completed: trend.active,
        overdue: 0, // Not available in current data structure
        inProgress: trend.pending,
      }))
    : [
        {
          month: "Current",
          completed: schoolDashboard?.data?.enrollments?.active || 0,
          overdue: schoolDashboard?.data?.enrollments?.rejected || 0,
          inProgress: schoolDashboard?.data?.enrollments?.pending || 0,
        },
      ];

  // Additional data transformations for new charts
  const capacityData = [
    {
      name: "Used Capacity",
      value: schoolDashboard?.data?.classrooms?.capacityStats?.totalCapacity ? 
        Math.round((schoolDashboard.data.classrooms.active / schoolDashboard.data.classrooms.total) * 100) : 0,
      count: schoolDashboard?.data?.classrooms?.active || 0
    },
    {
      name: "Available Capacity", 
      value: schoolDashboard?.data?.classrooms?.capacityStats?.totalCapacity ?
        Math.round(((schoolDashboard.data.classrooms.total - schoolDashboard.data.classrooms.active) / schoolDashboard.data.classrooms.total) * 100) : 0,
      count: (schoolDashboard?.data?.classrooms?.total || 0) - (schoolDashboard?.data?.classrooms?.active || 0)
    }
  ];

  const academicData = [
    { name: "Study Periods", value: schoolDashboard?.data?.academic?.studyPeriods?.total || 0, active: schoolDashboard?.data?.academic?.studyPeriods?.active || 0 },
    { name: "Academic Levels", value: schoolDashboard?.data?.academic?.levels || 0, active: schoolDashboard?.data?.academic?.levels || 0 },
    { name: "Total Sessions", value: schoolDashboard?.data?.sessions?.total || 0, active: schoolDashboard?.data?.sessions?.thisMonth || 0 },
  ];

  const boardsTasksData = [
    { 
      category: "Boards", 
      total: schoolDashboard?.data?.boards?.total || 0, 
      thisMonth: schoolDashboard?.data?.boards?.createdThisMonth || 0,
      members: schoolDashboard?.data?.boards?.stats?.totalMembers || 0
    },
    { 
      category: "Tasks", 
      total: schoolDashboard?.data?.tasks?.total || 0, 
      thisMonth: schoolDashboard?.data?.tasks?.createdThisMonth || 0,
      members: 0
    }
  ];

  const recentActivityData = [
    { metric: "New Users", value: schoolDashboard?.data?.recentActivity?.newUsersThisWeek || 0, icon: Users },
    { metric: "New Classrooms", value: schoolDashboard?.data?.recentActivity?.newClassroomsThisWeek || 0, icon: School },
    { metric: "New Boards", value: schoolDashboard?.data?.recentActivity?.newBoardsThisWeek || 0, icon: BarChart3 },
  ];

  // Colors for pie chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#FF6B6B", "#4ECDC4", "#45B7D1"]

  // Loading state
  if (!schoolDashboard) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">School Analytics</h3>
            <p className="text-sm text-muted-foreground">Loading analytics data...</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse mt-2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">School Analytics Dashboard</h3>
          <p className="text-sm text-muted-foreground">Comprehensive overview of {schoolDashboard?.data?.school?.name || "your school"}'s performance and activities</p>
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

      {/* School Overview Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <School className="h-5 w-5 text-blue-600" />
            School Overview
          </CardTitle>
          <CardDescription>Quick snapshot of your institution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-xl font-bold">{schoolDashboard?.data?.users?.total || 0}</p>
                <Badge variant="secondary" className="text-xs">
                  {schoolDashboard?.data?.users?.active || 0} active
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Courses</p>
                <p className="text-xl font-bold">{schoolDashboard?.data?.courses?.total || 0}</p>
                <Badge variant="secondary" className="text-xs">
                  ${schoolDashboard?.data?.courses?.analytics?.totalRevenue?.toLocaleString() || 0} revenue
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <School className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Classrooms</p>
                <p className="text-xl font-bold">{schoolDashboard?.data?.classrooms?.active || 0}</p>
                <Badge variant="secondary" className="text-xs">
                  of {schoolDashboard?.data?.classrooms?.total || 0} total
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <UserCheck className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Attendance</p>
                <p className="text-xl font-bold">{schoolDashboard?.data?.attendance?.rate?.attendanceRate?.toFixed(1) || 0}%</p>
                <Badge variant="secondary" className="text-xs">
                  {schoolDashboard?.data?.attendance?.rate?.totalSessions || 0} sessions
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            Recent Activity (This Week)
          </CardTitle>
          <CardDescription>Latest activities and growth metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {recentActivityData.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Icon className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.metric}</p>
                      <p className="text-2xl font-bold text-green-600">+{item.value}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Growth
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Analytics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* User Activity Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4" />
                User Activity Trends
              </CardTitle>
              <CardDescription>Monthly active users breakdown</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[250px]">
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
                  <AreaChart data={userActivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" fontSize={12} />
                    <YAxis fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="students"
                      stackId="1"
                      stroke="var(--color-students)"
                      fill="var(--color-students)"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="teachers"
                      stackId="1"
                      stroke="var(--color-teachers)"
                      fill="var(--color-teachers)"
                      fillOpacity={0.8}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* School Activity Distribution */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <PieChartIcon className="h-4 w-4" />
                Resource Distribution
              </CardTitle>
              <CardDescription>Breakdown of school resources</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={boardUsageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={70}
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

        {/* Boards & Tasks Overview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="h-4 w-4" />
                Boards & Tasks Activity
              </CardTitle>
              <CardDescription>Monthly creation and activity metrics</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[250px]">
              <ChartContainer
                config={{
                  total: {
                    label: "Total",
                    color: "hsl(var(--chart-1))",
                  },
                  thisMonth: {
                    label: "This Month",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={boardsTasksData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" fontSize={12} />
                    <YAxis fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="total" fill="var(--color-total)" />
                    <Bar dataKey="thisMonth" fill="var(--color-thisMonth)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Analytics Grid */}
      {/* <div className="grid gap-6 md:grid-cols-2">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Enrollment Status
              </CardTitle>
              <CardDescription>Student enrollment trends and status</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[200px]">
              <ChartContainer
                config={{
                  completed: {
                    label: "Active",
                    color: "hsl(var(--chart-3))",
                  },
                  overdue: {
                    label: "Rejected",
                    color: "hsl(var(--chart-4))",
                  },
                  inProgress: {
                    label: "Pending",
                    color: "hsl(var(--chart-5))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={taskCompletionData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" fontSize={11} tick={{ fontSize: 11 }} />
                    <YAxis fontSize={11} tick={{ fontSize: 11 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="completed" stackId="a" fill="var(--color-completed)" />
                    <Bar dataKey="overdue" stackId="a" fill="var(--color-overdue)" />
                    <Bar dataKey="inProgress" stackId="a" fill="var(--color-inProgress)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div> */}

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Key performance indicators for your school</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground">Total Users</div>
              <div className="mt-2 flex items-center">
                <div className="text-2xl font-bold">{schoolDashboard?.data?.users?.total || 0}</div>
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
                  <span className="ml-1">{schoolDashboard?.data?.users?.active || 0} active</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground">Attendance Rate</div>
              <div className="mt-2 flex items-center">
                <div className="text-2xl font-bold">{schoolDashboard?.data?.attendance?.rate?.attendanceRate?.toFixed(1) || 0}%</div>
                <div className="ml-2 flex items-center text-sm text-blue-500">
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
                  <span className="ml-1">{schoolDashboard?.data?.attendance?.rate?.totalSessions || 0} sessions</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground">Active Classrooms</div>
              <div className="mt-2 flex items-center">
                <div className="text-2xl font-bold">{schoolDashboard?.data?.classrooms?.active || 0}</div>
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
                  <span className="ml-1">of {schoolDashboard?.data?.classrooms?.total || 0} total</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm font-medium text-muted-foreground">Total Revenue</div>
              <div className="mt-2 flex items-center">
                <div className="text-2xl font-bold">${schoolDashboard?.data?.courses?.analytics?.totalRevenue?.toLocaleString() || 0}</div>
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
                  <span className="ml-1">{schoolDashboard?.data?.courses?.total || 0} courses</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Performance Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Academic Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Academic Metrics
            </CardTitle>
            <CardDescription>Study periods, levels, and sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {academicData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.active !== item.value ? `${item.active} active` : 'All active'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">{item.value}</div>
                    <Progress 
                      value={item.value > 0 ? (item.active / item.value) * 100 : 0} 
                      className="w-20 h-2" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Capacity Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <School className="h-5 w-5 text-purple-600" />
              Capacity Utilization
            </CardTitle>
            <CardDescription>Classroom capacity breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {Math.round(((schoolDashboard?.data?.classrooms?.active || 0) / (schoolDashboard?.data?.classrooms?.total || 1)) * 100)}%
                </div>
                <p className="text-sm text-muted-foreground">Utilization Rate</p>
              </div>
              <div className="space-y-2">
                {capacityData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.count}</span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-purple-600 rounded-full" 
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              User Breakdown
            </CardTitle>
            <CardDescription>Detailed user statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {schoolDashboard?.data?.users?.breakdown?.teachers || 0}
                  </div>
                  <p className="text-xs text-blue-600">Teachers</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {schoolDashboard?.data?.users?.breakdown?.students || 0}
                  </div>
                  <p className="text-xs text-green-600">Students</p>
                </div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {schoolDashboard?.data?.users?.breakdown?.admins || 0}
                </div>
                <p className="text-xs text-purple-600">Administrators</p>
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-sm">
                  <span>Active Users</span>
                  <span className="font-medium">{schoolDashboard?.data?.users?.active || 0}</span>
                </div>
                <Progress 
                  value={((schoolDashboard?.data?.users?.active || 0) / (schoolDashboard?.data?.users?.total || 1)) * 100} 
                  className="mt-1" 
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Overview */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Financial Overview
          </CardTitle>
          <CardDescription>Course revenue and pricing analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                ${schoolDashboard?.data?.courses?.analytics?.totalRevenue?.toLocaleString() || 0}
              </div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                ${schoolDashboard?.data?.courses?.analytics?.averagePrice?.toFixed(0) || 0}
              </div>
              <p className="text-sm text-muted-foreground">Average Price</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {schoolDashboard?.data?.courses?.analytics?.averageDuration?.toFixed(0) || 0}
              </div>
              <p className="text-sm text-muted-foreground">Avg Duration (hrs)</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {schoolDashboard?.data?.courses?.joinEnabled || 0}
              </div>
              <p className="text-sm text-muted-foreground">Active Courses</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
