"use client"

import { KanbanBoard } from "@/components/kanban-board"

interface TeacherBoardViewProps {
  boardId: string
}

export function TeacherBoardView({ boardId }: TeacherBoardViewProps) {
  return (
    <div className="container mx-auto py-6">
      <KanbanBoard boardId={boardId} currentUserId="teacher-1" />
    </div>
  )
}
