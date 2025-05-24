"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Plus, BookOpen, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AssignBoardDialog } from "@/components/admin/assign-board-dialog"

interface ClassBoardsViewProps {
  classId: string
  className: string
}

export function ClassBoardsView({ classId, className }: ClassBoardsViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAssignBoardDialogOpen, setIsAssignBoardDialogOpen] = useState(false)

  // Sample boards data for this class
  const [boards, setBoards] = useState([
    {
      id: "board-1",
      title: "Physics 101 - Spring Semester",
      description: "Track assignments and projects for Physics 101",
      color: "bg-green-500",
      taskCount: 24,
      completedTasks: 10,
    },
    {
      id: "board-2",
      title: "Chemistry Lab Activities",
      description: "Organize and track chemistry lab experiments and reports",
      color: "bg-blue-500",
      taskCount: 18,
      completedTasks: 7,
    },
    {
      id: "board-3",
      title: "Math Homework Tracker",
      description: "Track progress on weekly math assignments",
      color: "bg-purple-500",
      taskCount: 32,
      completedTasks: 15,
    },
  ])

  const filteredBoards = boards.filter(
    (board) =>
      board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      board.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAssignBoards = (boardIds: string[]) => {
    // In a real app, this would update the class-board associations in the database
    // For now, we'll just add some dummy boards to our list
    const newBoards = boardIds.map((id) => ({
      id,
      title: `New Board ${id.slice(-3)}`,
      description: "Newly assigned board",
      color: "bg-yellow-500",
      taskCount: 0,
      completedTasks: 0,
    }))

    setBoards([...boards, ...newBoards])
    setIsAssignBoardDialogOpen(false)
  }

  const handleRemoveBoard = (boardId: string) => {
    setBoards(boards.filter((board) => board.id !== boardId))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Boards for {className}</h2>
          <p className="text-sm text-muted-foreground">Manage the boards associated with this class</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search boards..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAssignBoardDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Assign Board
          </Button>
        </div>
      </div>

      {filteredBoards.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/20">
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No Boards Found</h3>
          <p className="text-muted-foreground mb-4 max-w-md">
            {searchQuery
              ? "No boards match your search criteria. Try a different search term."
              : "This class doesn't have any boards assigned yet. Assign boards to get started."}
          </p>
          {!searchQuery && (
            <Button onClick={() => setIsAssignBoardDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Assign Board
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBoards.map((board) => (
            <Card key={board.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className={`h-10 w-1 rounded-full ${board.color}`} />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Board</DropdownMenuItem>
                      <DropdownMenuItem>View Analytics</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleRemoveBoard(board.id)}
                      >
                        Remove from Class
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="text-lg">{board.title}</CardTitle>
                <CardDescription>{board.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <span>Tasks: {board.taskCount}</span>
                  <span>
                    Completed: {board.completedTasks} ({Math.round((board.completedTasks / board.taskCount) * 100)}%)
                  </span>
                </div>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(board.completedTasks / board.taskCount) * 100}%` }}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href={`/board/${board.id}`}>Open Board</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AssignBoardDialog
        isOpen={isAssignBoardDialogOpen}
        onClose={() => setIsAssignBoardDialogOpen(false)}
        onAssign={handleAssignBoards}
        classData={{ id: classId, name: className }}
      />
    </div>
  )
}
