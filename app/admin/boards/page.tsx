"use client"
import { ToastProvider } from "@/components/ui/toast"
import { BoardsList } from "@/components/admin/boards-list"

export default function BoardsPage() {
  return (
    <ToastProvider>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-6">Manage Boards</h1>
        <BoardsList />
      </div>
    </ToastProvider>
  )
}
