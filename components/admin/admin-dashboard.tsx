"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QuickActions } from "@/components/admin/quick-actions"
import { RecentActivityFeed } from "@/components/admin/recent-activity-feed"
import { SystemStatus } from "@/components/admin/system-status"
import { TemplateRequestNotification } from "@/components/admin/template-request-notification"
import { ActionButton } from "@/components/ui/action-button"
import { AdminAnalytics } from "@/components/admin/admin-analytics"
import { NotificationsPanel } from "@/components/admin/notifications-panel"
import { AuditLogTable } from "@/components/admin/audit-log-table"
import { useOrganizationData } from "@/contexts/organization-data-context"

export function AdminDashboard() {
  const { schoolDashboard,user,getSchoolDashboard } = useOrganizationData();


  useEffect(() => {
    if (user && user.schoolIds) {
      getSchoolDashboard(user.schoolIds[0]);
    }
  }, [user]);

  const router = useRouter()
  // Mock data for pending template requests
  const pendingTemplateRequests = 3
  const [notificationCount, setNotificationCount] = useState(5)
  const [activeTab, setActiveTab] = useState("overview")

  const handleNotificationsClick = () => {
    // Set the active tab to notifications
    setActiveTab("notifications")
    setNotificationCount(0)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <ActionButton action="navigate" path="/admin/settings" variant="outline">
              Settings
            </ActionButton>
            <ActionButton action="navigate" path="/admin/analytics">
              Analytics
            </ActionButton>
          </div>
        </div>

        {/* Template Request Notification */}
        <TemplateRequestNotification pendingCount={pendingTemplateRequests} />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="audit">Audit Log</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{schoolDashboard?.data?.users?.breakdown?.teachers || 0}</div>
                  <p className="text-xs text-muted-foreground"> across {schoolDashboard?.data?.classrooms?.total || 0} classrooms</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{schoolDashboard?.data?.users?.breakdown?.students || 0}</div>
                  <p className="text-xs text-muted-foreground">across {schoolDashboard?.data?.classrooms?.total || 0} classrooms</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Boards</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{schoolDashboard?.data?.boards?.total || 0}</div>
                  <p className="text-xs text-muted-foreground">across {schoolDashboard?.data?.classrooms?.total || 0} classrooms</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Course Usage</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{schoolDashboard?.data?.courses?.total || 0}</div>
                  <p className="text-xs text-muted-foreground">across {schoolDashboard?.data?.classrooms?.total || 0} classrooms</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Recent actions taken by </CardDescription>
                  </div>
                  <ActionButton action="navigate" path="/admin/activity" variant="outline" size="sm">
                    View All
                  </ActionButton>
                </CardHeader>
                <CardContent>
                  <RecentActivityFeed recentActivity={schoolDashboard?.data?.recentActivity || { newUsersThisWeek: 0, newClassroomsThisWeek: 0, newBoardsThisWeek: 0 }} />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <QuickActions />
                </CardContent>
              </Card>
            </div>
            {/* <div className="grid gap-4 grid-cols-1">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle>System Status</CardTitle>
                    <CardDescription>Current system performance and metrics</CardDescription>
                  </div>
                  <ActionButton action="navigate" path="/admin/system" variant="outline" size="sm">
                    System Settings
                  </ActionButton>
                </CardHeader>
                <CardContent>
                  <SystemStatus />
                </CardContent>
              </Card>
            </div> */}
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>School performance metrics and trends</CardDescription>
              </CardHeader>
              <CardContent className="h-[500px]">
                <AdminAnalytics schoolId={ user?.schoolIds?.[0] || "" } />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Generate and view school reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Report generation functionality will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>System notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <NotificationsPanel onClose={() => {}} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Audit Log</CardTitle>
                <CardDescription>System activity and user actions</CardDescription>
              </CardHeader>
              <CardContent>
                <AuditLogTable schoolId={ user?.schoolIds?.[0] || "" } />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
