"use client"

import { useState } from "react"
import { X, Bell, CheckCircle, AlertCircle, Info, Calendar, UserPlus, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NotificationsPanelProps {
  onClose: () => void
}

export function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const [activeTab, setActiveTab] = useState("all")

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: "success",
      title: "New Teacher Added",
      message: "Dr. Martinez was successfully added to the system.",
      time: "10 minutes ago",
      read: false,
      icon: <UserPlus className="h-5 w-5" />,
    },
    {
      id: 2,
      type: "info",
      title: "System Update",
      message: "The system will undergo maintenance tonight at 2 AM.",
      time: "1 hour ago",
      read: false,
      icon: <Info className="h-5 w-5" />,
    },
    {
      id: 3,
      type: "warning",
      title: "Storage Space Low",
      message: "Your school is approaching its storage limit. Consider upgrading.",
      time: "3 hours ago",
      read: false,
      icon: <AlertCircle className="h-5 w-5" />,
    },
    {
      id: 4,
      type: "info",
      title: "New Feature Available",
      message: "Check out the new analytics dashboard for improved insights.",
      time: "5 hours ago",
      read: true,
      icon: <Settings className="h-5 w-5" />,
    },
    {
      id: 5,
      type: "success",
      title: "Backup Completed",
      message: "Your weekly system backup was completed successfully.",
      time: "Yesterday",
      read: true,
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      id: 6,
      type: "info",
      title: "Upcoming Event",
      message: "Teacher training session scheduled for next Monday.",
      time: "2 days ago",
      read: true,
      icon: <Calendar className="h-5 w-5" />,
    },
  ]

  // Filter notifications based on active tab
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

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-80 md:w-96 bg-background border-l shadow-lg">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <h2 className="font-semibold">Notifications</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-4 pt-4">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="success">System</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-0">
          <div className="flex items-center justify-between px-4 py-2">
            <span className="text-sm text-muted-foreground">
              {filteredNotifications.length} {filteredNotifications.length === 1 ? "notification" : "notifications"}
            </span>
            <Button variant="ghost" size="sm" className="text-xs">
              Mark all as read
            </Button>
          </div>

          <ScrollArea className="h-[calc(100vh-140px)]">
            <div className="px-4 py-2">
              {filteredNotifications.length > 0 ? (
                <div className="space-y-1">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg ${notification.read ? "bg-background" : "bg-muted/50"}`}
                    >
                      <div className="flex gap-3">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${getIconColor(notification.type)}`}
                        >
                          {notification.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
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
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
        <Button variant="outline" className="w-full" onClick={() => console.log("View all notifications")}>
          Notification Settings
        </Button>
      </div>
    </div>
  )
}
