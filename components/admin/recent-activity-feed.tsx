"use client"

import { Users, School, Target, TrendingUp } from "lucide-react"

interface RecentActivityData {
  newUsersThisWeek: number;
  newClassroomsThisWeek: number;
  newBoardsThisWeek: number;
}

export function RecentActivityFeed({ recentActivity }: { recentActivity: RecentActivityData  }) {
  // Transform the recentActivity data into display format
  const activities = [
    {
      id: 1,
      metric: "New Users",
      value: recentActivity?.newUsersThisWeek || 0,
      icon: Users,
      iconColor: "text-blue-500 bg-blue-100 dark:bg-blue-900/30",
      description: "users joined this week",
    },
    {
      id: 2,
      metric: "New Classrooms",
      value: recentActivity?.newClassroomsThisWeek || 0,
      icon: School,
      iconColor: "text-green-500 bg-green-100 dark:bg-green-900/30",
      description: "classrooms created this week",
    },
    {
      id: 3,
      metric: "New Boards",
      value: recentActivity?.newBoardsThisWeek || 0,
      icon: Target,
      iconColor: "text-purple-500 bg-purple-100 dark:bg-purple-900/30",
      description: "boards created this week",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${activity.iconColor}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-medium">{activity.metric}</h4>
              <p className="text-xs text-muted-foreground">{activity.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              +{activity.value}
            </div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              This week
            </div>
          </div>
        </div>
      ))}
      
      {/* Show empty state if no activity */}
      {(!recentActivity || (recentActivity.newUsersThisWeek === 0 && recentActivity.newClassroomsThisWeek === 0 && recentActivity.newBoardsThisWeek === 0)) && (
        <div className="text-center py-8 text-muted-foreground">
          <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No recent activity this week</p>
        </div>
      )}
    </div>
  )
}
