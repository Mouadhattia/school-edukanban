"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getBoardById } from "@/lib/data"
import type { Board } from "@/lib/types"

interface AdminBoardViewProps {
  boardId: string
}

export function AdminBoardView({ boardId }: AdminBoardViewProps) {
  const [board, setBoard] = useState<Board | null>(null)

  // Load board data
  useEffect(() => {
    const loadedBoard = getBoardById(boardId)
    if (loadedBoard) {
      setBoard(loadedBoard)
    }
  }, [boardId])

  if (!board) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard" passHref>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to dashboard</span>
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{board.title}</h1>
          <p className="text-muted-foreground">{board.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-center h-[500px] border rounded-lg bg-muted/20">
        <div className="text-center">
          <h2 className="text-xl font-medium mb-2">Admin Board View</h2>
          <p className="text-muted-foreground">Advanced board management features for administrators</p>
          <p className="text-sm text-muted-foreground mt-4">This view is under development</p>
        </div>
      </div>
    </div>
  )
}
