"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, School } from "lucide-react";
import { BoardClassesDialog } from "@/components/admin/board-classes-dialog";
import { useOrganizationData } from "@/contexts/organization-data-context";
import { Board, User } from "@/lib/types";
import { AddBoardDialog } from "./add-board-dialog";
import { useRouter } from "next/navigation";

export function BoardsList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { boards, getAllBoards, updateBoard, createBoard, deleteBoard } =
    useOrganizationData();

  useEffect(() => {
    getAllBoards();
  }, []);

  const handleDeleteBoard = (boardId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this board? This action cannot be undone."
      )
    ) {
      deleteBoard(boardId);
    }
  };

  const handleViewBoard = (boardId: string) => {
    // In a real app, this would navigate to the board detail page

    router.push(`/admin/boards/${boardId}`);
  };

  const handleAddBoard = (board: Partial<Board>) => {
    try {
      if (selectedBoard) {
        updateBoard(selectedBoard._id, board);
      } else {
        createBoard(board);
      }
    } catch (error) {
      console.error("Error adding board:", error);
    } finally {
      onClose();
    }
  };
  const onClose = () => {
    setIsOpen(false);
    setSelectedBoard(null);
  };
  const handleEditBoard = (board: Board) => {
    setSelectedBoard(board);
    setIsOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Boards</h3>
          <p className="text-sm text-muted-foreground">
            View and manage all boards for this school
          </p>
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
          <Button onClick={() => setIsOpen(true)}>Add Board</Button>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  setBoards(boards.filter((board) => board.status === "Active"))
                }
              >
                Active Boards
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setBoards(
                    boards.filter((board) => board.status === "Archived")
                  )
                }
              >
                Archived Boards
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setBoards([...boards])}>
                Reset Filters
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Board Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Members</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          {boards.length > 0 ? (
            <TableBody>
              {boards.map((board) => (
                <TableRow key={board.id}>
                  <TableCell className="font-medium">{board.title}</TableCell>
                  <TableCell>{(board.createdBy as User).fullName}</TableCell>
                  <TableCell>
                    {new Date(board.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{board.members.length}</TableCell>
                  {/* <TableCell>
                  {board.classes.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      <Badge
                        variant="outline"
                        className="bg-blue-100 text-blue-800"
                      >
                        {board.classes.length}{" "}
                        {board.classes.length === 1 ? "class" : "classes"}
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
                </TableCell> */}
                  {/* <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      board.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {board.status}
                  </div>
                </TableCell> */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleViewBoard(board._id)}
                        >
                          View Board
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditBoard(board)}
                        >
                          Edit Board
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteBoard(board._id)}
                        >
                          Delete Board
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No boards found
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>

      {/* {showClassesDialogForBoard && (
        <BoardClassesDialog
          isOpen={!!showClassesDialogForBoard}
          onClose={() => setShowClassesDialogForBoard(null)}
          board={getSelectedBoard(showClassesDialogForBoard)}
          onUpdateClasses={(classes) =>
            handleUpdateBoardClasses(showClassesDialogForBoard, classes)
          }
        />
      )} */}
      <AddBoardDialog
        isOpen={isOpen}
        onClose={onClose}
        onAdd={handleAddBoard}
        board={selectedBoard}
      />
    </div>
  );
}
