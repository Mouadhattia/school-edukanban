"use client"

import { FileText, Bell, Clock, GraduationCap, Settings, School } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivityFeed() {
  const activities = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SJ",
        role: "Teacher",
      },
      action: "added a new assignment",
      target: "Science Project",
      time: "10 minutes ago",
      icon: FileText,
      iconColor: "text-blue-500 bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 2,
      user: {
        name: "Admin",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "A",
        role: "System",
      },
      action: "created a new class",
      target: "Advanced Mathematics",
      time: "45 minutes ago",
      icon: School,
      iconColor: "text-green-500 bg-green-100 dark:bg-green-900/30",
    },
    {
      id: 3,
      user: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MC",
        role: "Principal",
      },
      action: "sent an announcement",
      target: "Staff Meeting",
      time: "2 hours ago",
      icon: Bell,
      iconColor: "text-red-500 bg-red-100 dark:bg-red-900/30",
    },
    {
      id: 4,
      user: {
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ER",
        role: "Counselor",
      },
      action: "updated student record",
      target: "James Wilson",
      time: "3 hours ago",
      icon: GraduationCap,
      iconColor: "text-purple-500 bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: 5,
      user: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DK",
        role: "IT Admin",
      },
      action: "changed system settings",
      target: "Notification Preferences",
      time: "Yesterday",
      icon: Settings,
      iconColor: "text-gray-500 bg-gray-100 dark:bg-gray-800",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <div className={`p-2 rounded-full ${activity.iconColor} mt-1`}>
            <activity.icon className="h-3 w-3" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{activity.user.name}</span>
              <span className="text-xs text-muted-foreground">({activity.user.role})</span>
            </div>
            <p className="text-sm">
              {activity.action} <span className="font-medium">{activity.target}</span>
            </p>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              {activity.time}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
