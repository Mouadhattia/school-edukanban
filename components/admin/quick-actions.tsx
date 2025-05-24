"use client"

import { ActionButton } from "@/components/ui/action-button"
import { UserPlus, BookPlus, CalendarPlus, FileText, Download, Upload } from "lucide-react"

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ActionButton
        action="navigate"
        path="/admin/teachers"
        variant="outline"
        className="flex flex-col items-center justify-center h-24 space-y-2"
      >
        <UserPlus className="h-6 w-6" />
        <span>Add Teacher</span>
      </ActionButton>

      <ActionButton
        action="navigate"
        path="/admin/students"
        variant="outline"
        className="flex flex-col items-center justify-center h-24 space-y-2"
      >
        <UserPlus className="h-6 w-6" />
        <span>Add Student</span>
      </ActionButton>

      <ActionButton
        action="navigate"
        path="/admin/classes"
        variant="outline"
        className="flex flex-col items-center justify-center h-24 space-y-2"
      >
        <BookPlus className="h-6 w-6" />
        <span>Create Class</span>
      </ActionButton>

      <ActionButton
        action="navigate"
        path="/admin/boards"
        variant="outline"
        className="flex flex-col items-center justify-center h-24 space-y-2"
      >
        <CalendarPlus className="h-6 w-6" />
        <span>Create Board</span>
      </ActionButton>

      <ActionButton
        action="navigate"
        path="/admin/reports"
        variant="outline"
        className="flex flex-col items-center justify-center h-24 space-y-2"
      >
        <FileText className="h-6 w-6" />
        <span>Generate Report</span>
      </ActionButton>

      <ActionButton
        action="navigate"
        path="/admin/data"
        variant="outline"
        className="flex flex-col items-center justify-center h-24 space-y-2"
      >
        <div className="flex space-x-1">
          <Download className="h-5 w-5" />
          <Upload className="h-5 w-5" />
        </div>
        <span>Import/Export</span>
      </ActionButton>
    </div>
  )
}
