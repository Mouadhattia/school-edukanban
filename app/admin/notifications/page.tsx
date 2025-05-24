"use client"

import { useState, useEffect } from "react"
import { Bell, CheckCircle, AlertCircle, Info, Calendar, UserPlus, Settings, Filter, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { fetchNotifications, markAllNotificationsAsRead, markNotificationAsRead } from "@/lib/api-service"

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notifications, setNotifications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("all")

  useEffect(() => {
    loadNotifications()
  }, [activeTab, timeRange])

  const loadNotifications = async () => {
    setIsLoading(true)
    try {
      // In a real implementation, we would pass filters based on activeTab and timeRange
      const data = await fetchNotifications(activeTab, timeRange)
      setNotifications(data)
    } catch (error) {
      console.error("Failed to load notifications:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead()
      // Update local state to mark all as read
      setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error)
    }
  }

  const handleMarkAsRead = async (id: number) => {
    try {
      await markNotificationAsRead(id)
      // Update local state to mark the specific notification as read
      setNotifications(
        notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
      )
    } catch (error) {
      console.error(`Failed to mark notification ${id} as read:`, error)
    }
  }

  // Filter notifications based on activeTab
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  // Function to get icon color based on notification type
  const getIconColor = (type: string) => {
    switch (type) {
      case "success":
        return "text-green-500 bg-green-100"
      case "warning":
        return "text-yellow-500 bg-yellow-100"
      case "error":
        return "text-red-500 bg-red-100"
      case "info":
      default:
        return "text-blue-500 bg-blue-100"
    }
  }

  // Function to get icon based on notification type
  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5" />
      case "warning":
        return <AlertCircle className="h-5 w-5" />
      case "info":
        return <Info className="h-5 w-5" />
      case "calendar":
        return <Calendar className="h-5 w-5" />
      case "user":
        return <UserPlus className="h-5 w-5" />
      case "settings":
        return <Settings className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Manage and view all system notifications</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={loadNotifications}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="default" size="sm" onClick={handleMarkAllAsRead}>
            Mark All as Read
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Notification Center</CardTitle>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <CardDescription>View and manage all system notifications in one place</CardDescription>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="all">
                All
                {notifications.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {notifications.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {notifications.filter((n) => !n.read).length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {notifications.filter((n) => !n.read).length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="success">System</TabsTrigger>
              <TabsTrigger value="warning">Alerts</TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-350px)] pr-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  <p className="text-sm text-muted-foreground">Loading notifications...</p>
                </div>
              </div>
            ) : filteredNotifications.length > 0 ? (
              <div className="space-y-4">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${notification.read ? "bg-background" : "bg-muted/50"}`}
                  >
                    <div className="flex gap-4">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${getIconColor(notification.type)}`}
                      >
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            {notification.actionUrl && (
                              <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                                <a href={notification.actionUrl}>View Details</a>
                              </Button>
                            )}
                          </div>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0 text-xs"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              Mark as Read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bell className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="font-medium">No notifications</h3>
                <p className="text-sm text-muted-foreground mt-1">You're all caught up!</p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Configure how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Alerts</p>
                    <p className="text-sm text-muted-foreground">Receive critical system alerts via email</p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      id="system-alerts"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">User Management</p>
                    <p className="text-sm text-muted-foreground">Notifications about user changes</p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      id="user-management"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Template Updates</p>
                    <p className="text-sm text-muted-foreground">Notifications about template changes</p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      id="template-updates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium">In-App Notifications</h3>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive system notifications in-app</p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      id="system-notifications"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">User Activity</p>
                    <p className="text-sm text-muted-foreground">Notifications about user activity</p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      id="user-activity"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Content Updates</p>
                    <p className="text-sm text-muted-foreground">Notifications about content changes</p>
                  </div>
                  <div className="flex items-center h-5">
                    <input
                      id="content-updates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button>Save Settings</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
