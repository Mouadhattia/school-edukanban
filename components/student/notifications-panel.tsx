"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "info" | "success" | "warning" | "error"
  link?: string
}

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Assignment Added",
      description: "Physics Lab Report has been assigned to you",
      time: "10 minutes ago",
      read: false,
      type: "info",
      link: "/board/physics-101",
    },
    {
      id: "2",
      title: "Assignment Graded",
      description: "Your Math Quiz has been graded. You received an A!",
      time: "2 hours ago",
      read: false,
      type: "success",
      link: "/task/math-quiz-1",
    },
    {
      id: "3",
      title: "Upcoming Due Date",
      description: "History Essay is due tomorrow",
      time: "5 hours ago",
      read: false,
      type: "warning",
      link: "/task/history-essay",
    },
    {
      id: "4",
      title: "Teacher Comment",
      description: "Ms. Johnson left a comment on your Science Project",
      time: "Yesterday",
      read: true,
      type: "info",
      link: "/task/science-project",
    },
    {
      id: "5",
      title: "Class Canceled",
      description: "Tomorrow's Art class has been canceled",
      time: "Yesterday",
      read: true,
      type: "error",
    },
  ])

  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )

    // Find the notification to navigate to its link if available
    const notification = notifications.find((n) => n.id === id)
    if (notification?.link) {
      setOpen(false) // Close the popover
      router.push(notification.link)
    } else {
      toast({
        title: "Notification read",
        description: "Notification marked as read",
      })
    }
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))

    toast({
      title: "All notifications read",
      description: "All notifications marked as read",
    })
  }

  const viewAllNotifications = () => {
    setOpen(false)
    router.push("/notifications")

    toast({
      title: "View all notifications",
      description: "Navigating to notifications page",
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <div className="h-2 w-2 rounded-full bg-green-500" />
      case "warning":
        return <div className="h-2 w-2 rounded-full bg-yellow-500" />
      case "error":
        return <div className="h-2 w-2 rounded-full bg-red-500" />
      default:
        return <div className="h-2 w-2 rounded-full bg-blue-500" />
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-medium">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto text-xs px-2" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 w-full rounded-none border-b">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="m-0">
            <ScrollArea className="h-[300px]">
              {notifications.length === 0 ? (
                <div className="flex items-center justify-center h-[300px] text-center p-4 text-muted-foreground">
                  No notifications
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-muted/50 cursor-pointer ${!notification.read ? "bg-muted/20" : ""}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <h5 className="font-medium text-sm">{notification.title}</h5>
                          <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="unread" className="m-0">
            <ScrollArea className="h-[300px]">
              {notifications.filter((n) => !n.read).length === 0 ? (
                <div className="flex items-center justify-center h-[300px] text-center p-4 text-muted-foreground">
                  No unread notifications
                </div>
              ) : (
                <div className="divide-y">
                  {notifications
                    .filter((notification) => !notification.read)
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 hover:bg-muted/50 cursor-pointer bg-muted/20"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1">
                            <h5 className="font-medium text-sm">{notification.title}</h5>
                            <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                            <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="read" className="m-0">
            <ScrollArea className="h-[300px]">
              {notifications.filter((n) => n.read).length === 0 ? (
                <div className="flex items-center justify-center h-[300px] text-center p-4 text-muted-foreground">
                  No read notifications
                </div>
              ) : (
                <div className="divide-y">
                  {notifications
                    .filter((notification) => notification.read)
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className="p-4 hover:bg-muted/50 cursor-pointer"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1">
                            <h5 className="font-medium text-sm">{notification.title}</h5>
                            <p className="text-xs text-muted-foreground mt-1">{notification.description}</p>
                            <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="p-2 border-t">
          <Button variant="outline" size="sm" className="w-full" onClick={viewAllNotifications}>
            View All Notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
