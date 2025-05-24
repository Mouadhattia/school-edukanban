"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, School } from "lucide-react"
import { BoardClassesDialog } from "@/components/admin/board-classes-dialog"

interface BoardsListProps {
  schoolId?: string
}

export function BoardsList({ schoolId = "school-1" }: BoardsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showClassesDialogForBoard, setShowClassesDialogForBoard] = useState<string | null>(null)

  // Sample boards data
  const [boards, setBoards] = useState([
    {
      id: "board-1",
      title: "Physics 101 - Spring Semester",
      owner: "Dr. Smith",
      createdAt: "Jan 15, 2025",
      students: 28,
      status: "Active",
      classes: ["Grade 5A", "Grade 5B"],
    },
    {
      id: "board-2",
      title: "Chemistry Lab Activities",
      owner: "Dr. Smith",
      createdAt: "Feb 10, 2025",
      students: 24,
      status: "Active",
      classes: ["Grade 5A"],
    },
    {
      id: "board-3",
      title: "Math Homework Tracker",
      owner: "Dr. Smith",
      createdAt: "Mar 5, 2025",
      students: 32,
      status: "Active",
      classes: ["Grade 5A", "Grade 5B", "Grade 4C"],
    },
    {
      id: "board-4",
      title: "Biology Research Project",
      owner: "Prof. Johnson",
      createdAt: "Feb 20, 2025",
      students: 18,
      status: "Active",
      classes: ["Advanced Spanish - Evening"],
    },
    {
      id: "board-5",
      title: "Literature Analysis",
      owner: "Prof. Johnson",
      createdAt: "Mar 15, 2025",
      students: 26,
      status: "Archived",
      classes: [],
    },
  ])

  const filteredBoards = boards.filter(
    (board) =>
      board.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      board.owner.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getSelectedBoard = (boardId: string) => {
    return boards.find((board) => board.id === boardId) || null
  }

  const handleUpdateBoardClasses = (boardId: string, classes: string[]) => {
    setBoards(boards.map((board) => (board.id === boardId ? { ...board, classes } : board)))
    setShowClassesDialogForBoard(null)
  }

  const handleBoardStatusChange = (boardId: string, newStatus: string) => {
    setBoards(boards.map((board) => (board.id === boardId ? { ...board, status: newStatus } : board)))
  }

  const handleDeleteBoard = (boardId: string) => {
    if (confirm("Are you sure you want to delete this board? This action cannot be undone.")) {
      setBoards(boards.filter((board) => board.id !== boardId))
    }
  }

  const handleViewBoard = (boardId: string) => {
    // In a real app, this would navigate to the board detail page
    alert(`Navigating to board ${boardId}`)
  }

  const handleViewAnalytics = (boardId: string) => {
    // In a real app, this would navigate to the analytics page for this board
    alert(`Viewing analytics for board ${boardId}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Boards</h3>
          <p className="text-sm text-muted-foreground">View and manage all boards for this school</p>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setBoards(boards.filter((board) => board.status === "Active"))}>
                Active Boards
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setBoards(boards.filter((board) => board.status === "Archived"))}>
                Archived Boards
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setBoards([...boards])}>Reset Filters</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Board Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Classes</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBoards.map((board) => (
              <TableRow key={board.id}>
                <TableCell className="font-medium">{board.title}</TableCell>
                <TableCell>{board.owner}</TableCell>
                <TableCell>{board.createdAt}</TableCell>
                <TableCell>{board.students}</TableCell>
                <TableCell>
                  {board.classes.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        {board.classes.length} {board.classes.length === 1 ? "class" : "classes"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs"
                        onClick={() => setShowClassesDialogForBoard(board.id)}
                      >
                        View
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => setShowClassesDialogForBoard(board.id)}
                    >
                      Assign to classes
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      board.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {board.status}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        Actions
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleViewBoard(board.id)}>View Board</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleViewAnalytics(board.id)}>View Analytics</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setShowClassesDialogForBoard(board.id)}>
                        <School className="mr-2 h-4 w-4" />
                        Manage Classes
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {board.status === "Active" ? (
                        <DropdownMenuItem onClick={() => handleBoardStatusChange(board.id, "Archived")}>
                          Archive Board
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => handleBoardStatusChange(board.id, "Active")}>
                          Restore Board
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteBoard(board.id)}>
                        Delete Board
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showClassesDialogForBoard && (
        <BoardClassesDialog
          isOpen={!!showClassesDialogForBoard}
          onClose={() => setShowClassesDialogForBoard(null)}
          board={getSelectedBoard(showClassesDialogForBoard)}
          onUpdateClasses={(classes) => handleUpdateBoardClasses(showClassesDialogForBoard, classes)}
        />
      )}
    </div>
  )
}
