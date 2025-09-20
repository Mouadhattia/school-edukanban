"use client";

import type React from "react";
import { useEffect, useState } from "react";
import {
  Award,
  CheckCircle,
  Clock,
  Plus,
  Star,
  X,
  Zap,
  BarChart,
  Loader2,
  GripVertical,
  Trash2,
  MoreVertical,
  Edit,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { ColumnColor } from "@/lib/column-system";
import { Card as CardType, List } from "@/lib/types";
import { useOrganizationData } from "@/contexts/organization-data-context";
import { ConfirmDialog } from "./confirm-dialog";

import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";

interface KanbanBoardProps {
  boardId: string;
}

export function KanbanBoard({ boardId }: KanbanBoardProps) {
  const {
    getBoardById,
    board,
    createList,
    deleteList,
    createCard,
    updateCard,
    deleteCard,
    moveCard,
    cardLoading,
    user,
    updateList,
  } = useOrganizationData();

  const [kanbanFilter, setKanbanFilter] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [deleteColumnDialogOpen, setDeleteColumnDialogOpen] = useState(false);
  const [deleteCardDialogOpen, setDeleteCardDialogOpen] = useState(false);
  const [deleteColumnId, setDeleteColumnId] = useState<string | null>(null);
  const [deleteCardId, setDeleteCardId] = useState<string | null>(null);
  const [isNewColumnDialogOpen, setIsNewColumnDialogOpen] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [newColumnColor, setNewColumnColor] = useState<ColumnColor>("blue");
  const [addCardDialogOpen, setAddCardDialogOpen] = useState(false);
  const [card, setCard] = useState<Partial<CardType> | null>({
    title: "",
    listId: "",
    boardId: "",
    position: 0,
  });
  const [selectedColumn, setSelectedColumn] = useState<Partial<List> | null>(
    null
  );

  // Track which card is currently being moved for visual feedback only
  const [movingCardId, setMovingCardId] = useState<string | null>(null);

  useEffect(() => {
    getBoardById(boardId);
  }, [boardId]);

  const allColumns = board?.lists || [];

  // Calculate overall progress percentage
  const progressPercentage = Math.round((20 / 50) * 100);

  const handleOpenDeleteColumnDialog = (columnId: string) => {
    setDeleteColumnId(columnId);
    setDeleteColumnDialogOpen(true);
  };

  const handleOpenDeleteCardDialog = (cardId: string) => {
    setDeleteCardId(cardId);
    setDeleteCardDialogOpen(true);
  };

  const handleDeleteColumn = () => {
    if (!deleteColumnId) return;
    deleteList(deleteColumnId);
    setDeleteColumnDialogOpen(false);
  };

  const handleDeleteCard = () => {
    if (!deleteCardId) return;
    deleteCard(deleteCardId);
    setDeleteCardDialogOpen(false);
  };

  const handleCreateCard = () => {
    if (!card) return;
    createCard(card);
    setAddCardDialogOpen(false);
    setCard({ title: "", listId: "", boardId: "", position: 0 });
  };

  const handleUpdateCard = (id: string, card: Partial<CardType>) => {
    updateCard(id, card);
  };

  const handleCreateColumn = (column: Partial<List>) => {
    if (!column || !board || !user) return;
    if (selectedColumn && selectedColumn._id) {
      updateList(selectedColumn._id, column);
    } else {
      createList({
        ...column,
        boardId: board?._id,
        createdBy: user?.userId,
        position: board?.lists.length + 1,
      });
    }
    setIsNewColumnDialogOpen(false);
    setNewColumnName("");
    setNewColumnColor("blue");
    setSelectedColumn(null);
  };

  const onDragStart = (start: any) => {
    console.log("🟢 Drag started:", start.draggableId);
    setMovingCardId(start.draggableId);
  };

  const onDragUpdate = (update: any) => {
    console.log("🟡 Drag update:", {
      draggableId: update.draggableId,
      destination: update.destination,
      source: update.source,
    });
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Reset visual state
    setMovingCardId(null);

    // If no destination, user dropped outside valid area
    if (!destination) {
      return;
    }

    // If same position, no move needed
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Check if we should prevent the move due to loading
    if (cardLoading) {
      console.log("❌ Card already loading - preventing move");
      return;
    }

    console.log("✅ Proceeding with move operation");

    try {
      await moveCard(draggableId, destination.index, destination.droppableId);
    } catch (error) {
      console.error("❌ Error moving card:", error);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* Loading overlay */}
      {cardLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-10 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            <span className="text-sm font-medium">Moving card...</span>
          </div>
        </div>
      )}

      {/* Header Card */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold">
                {board?.title}: Overall Progress
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1 text-sm">
                  <Award className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </div>
            <div className="w-full md:w-48">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Course Progress</span>
                <span className="text-sm font-bold">{progressPercentage}%</span>
              </div>
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-600"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
            {board?.lists.map((column) => (
              <div key={column._id} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-blue-400"></div>
                <span>{column.title}</span>
              </div>
            ))}
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-blue-600" />
              <span>Quiz</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500" />
              <span>Test</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <BarChart className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Kanban Board View</h3>
            <p className="text-sm text-gray-600">
              This view organizes activities by their status. Drag and drop
              activities between columns to update their status and track your
              progress.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Course Activities Board</h2>
          <p className="text-gray-600">
            Organize and track your learning activities
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            value={kanbanFilter || ""}
            onChange={(e) => setKanbanFilter(e.target.value || null)}
          >
            <option value="">All Units</option>
            {board?.lists.map((unit, index) => (
              <option key={unit._id} value={unit._id}>
                Unit {index + 1}: {unit.title}
              </option>
            ))}
          </select>

          {kanbanFilter && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setKanbanFilter(null)}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" /> Clear Filter
            </Button>
          )}

          <Dialog
            open={isNewColumnDialogOpen}
            onOpenChange={setIsNewColumnDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 bg-transparent"
              >
                <Plus className="h-4 w-4" /> Add Column
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Column</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="column-name">Column Name</Label>
                  <Input
                    id="column-name"
                    value={newColumnName}
                    onChange={(e) => setNewColumnName(e.target.value)}
                    placeholder="Enter column name..."
                  />
                </div>
                <div>
                  <Label>Column Color</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {/* Predefined color options for custom columns */}
                    {(
                      [
                        "red",
                        "orange",
                        "yellow",
                        "green",
                        "teal",
                        "blue",
                        "indigo",
                        "pink",
                      ] as ColumnColor[]
                    ).map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewColumnColor(color)}
                        className={`p-2 rounded-lg border-2 transition-all ${
                          newColumnColor === color
                            ? `border-${color}-200 bg-${color}-100`
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-${color}-500 mx-auto`}
                        ></div>
                        <span className="text-xs mt-1 block capitalize">
                          {color}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedColumn(null);
                      setNewColumnName("");
                      setNewColumnColor("blue");
                      setIsNewColumnDialogOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() =>
                      handleCreateColumn({
                        title: newColumnName,
                        color: newColumnColor,
                      })
                    }
                    disabled={!newColumnName.trim()}
                  >
                    Create Column
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* Kanban Board */}
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {board?.lists.map((column) => {
            const colorClasses = {
              bg: `bg-${column.color}-100`,
              border: `border-${column.color}-200`,
              text: `text-${column.color}-700`,
              dot: `bg-${column.color}-500`,
            };

            const isDragOver = dragOverColumn === column._id;
            const dragOverClasses = isDragOver
              ? `ring-2 ring-${column.color}-400 ring-opacity-50`
              : "";
            return (
              <div key={`column-${column._id}`} className="flex flex-col">
                {/* Column Header */}
                <div
                  className={`${colorClasses.bg} rounded-t-lg p-3 border ${colorClasses.border} border-b-0`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${colorClasses.dot}`}
                      ></div>
                      <h3 className={`font-bold ${colorClasses.text}`}>
                        {column.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge
                        variant="outline"
                        className={`${colorClasses.bg} ${colorClasses.text}`}
                      >
                        {column.cards.length}
                      </Badge>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDeleteColumnDialog(column._id)}
                        className="h-6 w-6 p-0 hover:bg-red-100"
                      >
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedColumn(column);
                          setIsNewColumnDialogOpen(true);
                          setNewColumnName(column.title);
                          setNewColumnColor(column.color as ColumnColor);
                        }}
                        className="h-6 w-6 p-0 hover:bg-blue-100"
                      >
                        <Edit className="h-3 w-3 text-blue-500" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Droppable Area */}
                <Droppable droppableId={column._id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`
                        flex-1 bg-blue-50 p-3 rounded-b-lg border border-blue-200 
                        min-h-[200px] transition-all
                        ${
                          snapshot.isDraggingOver
                            ? "bg-blue-100 ring-2 ring-blue-400"
                            : ""
                        }
                      `}
                      >
                        <div className="space-y-2">
                          {column.cards.map(
                            (activity: CardType, index: number) => {
                              const isMoving = movingCardId === activity._id;

                              return (
                                <Draggable
                                  key={activity._id}
                                  draggableId={activity._id}
                                  index={index}
                                  isDragDisabled={cardLoading && !isMoving}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`
                                        bg-white p-3 rounded-lg border shadow-sm 
                                        transition-all cursor-grab active:cursor-grabbing
                                        ${
                                          snapshot.isDragging
                                            ? "opacity-75 rotate-2 shadow-xl z-50"
                                            : "hover:shadow-md"
                                        }
                                        ${
                                          isMoving ? "ring-2 ring-blue-400" : ""
                                        }
                                        ${
                                          cardLoading && !isMoving
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                        }
                                      `}
                                      >
                                        <div className="flex items-start gap-2">
                                          {/* Left drag handle */}
                                          <div className="mt-1">
                                            {isMoving && cardLoading ? (
                                              <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
                                            ) : (
                                              <GripVertical className="h-4 w-4 text-gray-400" />
                                            )}
                                          </div>

                                          {/* Card content */}
                                          <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm text-gray-900 truncate">
                                              {activity.title}
                                            </h4>
                                            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                                              <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                <span>5 min</span>
                                              </div>
                                              <div className="flex items-center gap-1">
                                                <Award className="h-3 w-3" />
                                                <span>10 pts</span>
                                              </div>
                                            </div>
                                          </div>

                                          {/* Right dropdown menu */}
                                          <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                              <button className="p-1 rounded-full hover:bg-gray-100">
                                                <MoreVertical className="h-4 w-4 text-gray-500" />
                                              </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                              align="end"
                                              className="w-32"
                                            >
                                              <DropdownMenuItem
                                                onClick={() =>
                                                  console.log(
                                                    "View",
                                                    activity._id
                                                  )
                                                }
                                              >
                                                View Card
                                              </DropdownMenuItem>
                                              <DropdownMenuItem
                                                onClick={() =>
                                                  handleOpenDeleteCardDialog(
                                                    activity._id
                                                  )
                                                }
                                                className="text-red-600 focus:text-red-600"
                                              >
                                                Delete Card
                                              </DropdownMenuItem>
                                            </DropdownMenuContent>
                                          </DropdownMenu>
                                        </div>
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            }
                          )}

                          {provided.placeholder}
                        </div>

                        {/* Empty State */}
                        {column.cards.length === 0 && (
                          <div
                            className={`
                          flex flex-col items-center justify-center h-32 
                          border-2 border-dashed border-gray-300 rounded-lg
                          ${
                            snapshot.isDraggingOver
                              ? "border-blue-400 bg-blue-50"
                              : "bg-gray-50"
                          }
                          text-gray-500
                        `}
                          >
                            <p className="text-sm">
                              {snapshot.isDraggingOver
                                ? "Drop here!"
                                : "No activities"}
                            </p>
                          </div>
                        )}

                        {/* Add Card Button */}
                        <button
                          onClick={() => {
                            setCard({
                              title: "",
                              listId: column._id,
                              boardId: board?._id || "",
                              position: column.cards.length,
                            });
                            setAddCardDialogOpen(true);
                          }}
                          className="w-full mt-2 p-2 border-2 border-dashed border-gray-300 
                                 rounded-lg text-gray-600 hover:border-gray-400 hover:bg-gray-50 
                                 transition-all disabled:opacity-50 disabled:cursor-not-allowed
                                 flex items-center justify-center gap-1"
                          disabled={cardLoading}
                        >
                          <Plus className="h-4 w-4" />
                          Add Activity
                        </button>
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      {/* Dialogs */}
      <ConfirmDialog
        isOpen={deleteColumnDialogOpen}
        onClose={() => setDeleteColumnDialogOpen(false)}
        onConfirm={handleDeleteColumn}
        title="Delete Column"
        description="Are you sure you want to delete this column?"
      />

      <ConfirmDialog
        isOpen={deleteCardDialogOpen}
        onClose={() => setDeleteCardDialogOpen(false)}
        onConfirm={handleDeleteCard}
        title="Delete Card"
        description="Are you sure you want to delete this card?"
      />

      {/* Add Card Dialog */}
      <Dialog open={addCardDialogOpen} onOpenChange={setAddCardDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Activity</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="card-title">Activity Title</Label>
              <Input
                id="card-title"
                value={card?.title || ""}
                onChange={(e) =>
                  setCard((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter activity title..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setAddCardDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateCard}
                disabled={!card?.title?.trim()}
              >
                Add Activity
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
