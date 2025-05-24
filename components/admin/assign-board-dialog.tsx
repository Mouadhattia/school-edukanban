"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Search } from "lucide-react"

interface Board {
  id: string
  title: string
  description: string
  color: string
}

interface AssignBoardDialogProps {
  isOpen: boolean
  onClose: () => void
  onAssign: (boardIds: string[]) => void
  classData: any
}

export function AssignBoardDialog({ isOpen, onClose, onAssign, classData }: AssignBoardDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBoards, setSelectedBoards] = useState<string[]>([])

  // Sample boards data
  const boards: Board[] = [
    {
      id: "board-1",
      title: "Physics 101 - Spring Semester",
      description: "Track assignments and projects for Physics 101",
      color: "bg-green-500",
    },
    {
      id: "board-2",
      title: "Chemistry Lab Activities",
      description: "Organize and track chemistry lab experiments and reports",
      color: "bg-blue-500",
    },
    {
      id: "board-3",
      title: "Math Homework Tracker",
      description: "Track progress on weekly math assignments",
      color: "bg-purple-500",
    },
    {
      id: "board-4",
      title: "Biology Research Project",
      description: "Group research project on ecosystems",
      color: "bg-yellow-500",
    },
    {
      id: "board-5",
      title: "Literature Analysis",
      description: "Track progress on literature analysis assignments",
      color: "bg-red-500",
    },
  ]

  const filteredBoards = boards.filter(
    (board) =>
      board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      board.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleToggleBoard = (boardId: string) => {
    setSelectedBoards((prev) => (prev.includes(boardId) ? prev.filter((id) => id !== boardId) : [...prev, boardId]))
  }

  const handleAssign = () => {
    onAssign(selectedBoards)
    setSelectedBoards([])
    setSearchQuery("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Assign Boards to {classData.name}</DialogTitle>
          <DialogDescription>
            {classData.type === "traditional"
              ? "Select the boards to assign to this class. Students and teachers in this class will have access to these boards."
              : "Select a board for this specialized course. This will be the main workspace for the course."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search boards..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="border rounded-md divide-y max-h-[300px] overflow-y-auto">
            {filteredBoards.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">No boards found matching your search</div>
            ) : (
              filteredBoards.map((board) => (
                <div key={board.id} className="flex items-center p-3 hover:bg-muted/50">
                  <Checkbox
                    id={`board-${board.id}`}
                    checked={selectedBoards.includes(board.id)}
                    onCheckedChange={() => handleToggleBoard(board.id)}
                    className="mr-3"
                  />
                  <div className={`h-10 w-1 rounded-full ${board.color} mr-3`} />
                  <Label htmlFor={`board-${board.id}`} className="flex-1 cursor-pointer">
                    <div className="font-medium">{board.title}</div>
                    <div className="text-sm text-muted-foreground">{board.description}</div>
                  </Label>
                </div>
              ))
            )}
          </div>

          <div className="mt-2 text-sm text-muted-foreground">
            {selectedBoards.length} {selectedBoards.length === 1 ? "board" : "boards"} selected
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={selectedBoards.length === 0}>
            Assign {selectedBoards.length} {selectedBoards.length === 1 ? "Board" : "Boards"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
