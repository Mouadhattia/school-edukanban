"use client"

import { CheckCircle, AlertCircle, XCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function SystemStatus() {
  const systems = [
    {
      name: "Student Information System",
      status: "operational",
      uptime: 99.9,
      lastIncident: "None",
    },
    {
      name: "Learning Management System",
      status: "operational",
      uptime: 99.7,
      lastIncident: "3 days ago",
    },
    {
      name: "Email & Communication",
      status: "operational",
      uptime: 100,
      lastIncident: "None",
    },
    {
      name: "Attendance Tracking",
      status: "degraded",
      uptime: 95.2,
      lastIncident: "Today",
    },
    {
      name: "Financial System",
      status: "operational",
      uptime: 99.8,
      lastIncident: "2 weeks ago",
    },
    {
      name: "Library Management",
      status: "operational",
      uptime: 99.9,
      lastIncident: "None",
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "degraded":
        return <AlertCircle className="h-5 w-5 text-amber-500" />
      case "outage":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "operational":
        return "Operational"
      case "degraded":
        return "Degraded Performance"
      case "outage":
        return "System Outage"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {systems.map((system) => (
          <div key={system.name} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{system.name}</h3>
              {getStatusIcon(system.status)}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status:</span>
                <span
                  className={
                    system.status === "operational"
                      ? "text-green-500"
                      : system.status === "degraded"
                        ? "text-amber-500"
                        : "text-red-500"
                  }
                >
                  {getStatusText(system.status)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Uptime:</span>
                <span>{system.uptime}%</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Uptime</span>
                  <span>{system.uptime}%</span>
                </div>
                <Progress value={system.uptime} className="h-1" />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Incident:</span>
                <span>{system.lastIncident}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
