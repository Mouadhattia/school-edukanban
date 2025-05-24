"use client"

import { useState, useEffect } from "react"
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
import { Search, School, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface BoardClassesDialogProps {
  isOpen: boolean
  onClose: () => void
  board: any
  onUpdateClasses: (classes: string[]) => void
}

export function BoardClassesDialog({ isOpen, onClose, board, onUpdateClasses }: BoardClassesDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])
  const { toast } = useToast()

  // Sample classes data
  const allClasses = [
    { id: "class-1", name: "Grade 5A", type: "traditional", grade: "5" },
    { id: "class-2", name: "Grade 5B", type: "traditional", grade: "5" },
    { id: "class-3", name: "Advanced Spanish - Evening", type: "specialized", subject: "Spanish" },
    { id: "class-4", name: "Introduction to Programming", type: "specialized", subject: "Computer Science" },
    { id: "class-5", name: "Grade 4C", type: "traditional", grade: "4" },
  ]

  // Initialize selected classes based on board's current classes
  useEffect(() => {
    if (board && board.classes) {
      setSelectedClasses(board.classes)
    }
  }, [board])

  const filteredClasses = allClasses.filter((cls) => cls.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleToggleClass = (className: string) => {
    setSelectedClasses((prev) =>
      prev.includes(className) ? prev.filter((name) => name !== className) : [...prev, className],
    )
  }

  const handleRemoveClass = (className: string) => {
    setSelectedClasses((prev) => prev.filter((name) => name !== className))
  }

  const handleSave = () => {
    onUpdateClasses(selectedClasses)
    toast({
      title: "Classes updated",
      description: `Updated classes for board "${board.title}"`,
    })
  }

  if (!board) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Manage Classes for {board.title}</DialogTitle>
          <DialogDescription>
            Associate this board with classes to give students and teachers in those classes access to this board.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Currently assigned classes */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label className="text-sm font-medium">Currently Assigned Classes</Label>
              {selectedClasses.length > 0 && (
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => setSelectedClasses([])}>
                  Clear All
                </Button>
              )}
            </div>
            {selectedClasses.length === 0 ? (
              <div className="text-sm text-muted-foreground py-2">No classes are currently assigned to this board.</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedClasses.map((className) => (
                  <Badge key={className} variant="secondary" className="flex items-center gap-1 py-1">
                    <School className="h-3 w-3" />
                    {className}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1 rounded-full"
                      onClick={() => handleRemoveClass(className)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Search and add classes */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Add Classes</Label>
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search classes..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              )}
            </div>

            {filteredClasses.length > 0 && (
              <div className="flex items-center p-2 border-b">
                <Checkbox
                  id="select-all"
                  checked={
                    filteredClasses.length > 0 && filteredClasses.every((cls) => selectedClasses.includes(cls.name))
                  }
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedClasses([...new Set([...selectedClasses, ...filteredClasses.map((c) => c.name)])])
                    } else {
                      setSelectedClasses(
                        selectedClasses.filter((name) => !filteredClasses.map((c) => c.name).includes(name)),
                      )
                    }
                  }}
                  className="mr-3"
                />
                <Label htmlFor="select-all" className="flex-1 cursor-pointer font-medium">
                  Select All Filtered Classes
                </Label>
              </div>
            )}

            <div className="border rounded-md divide-y max-h-[200px] overflow-y-auto">
              {filteredClasses.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">No classes found matching your search</div>
              ) : (
                filteredClasses.map((cls) => (
                  <div key={cls.id} className="flex items-center p-3 hover:bg-muted/50">
                    <Checkbox
                      id={`class-${cls.id}`}
                      checked={selectedClasses.includes(cls.name)}
                      onCheckedChange={() => handleToggleClass(cls.name)}
                      className="mr-3"
                    />
                    <Label htmlFor={`class-${cls.id}`} className="flex-1 cursor-pointer">
                      <div className="font-medium">{cls.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {cls.type === "traditional" ? `Grade ${cls.grade}` : cls.subject}
                      </div>
                    </Label>
                    <Badge
                      variant="outline"
                      className={
                        cls.type === "traditional" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                      }
                    >
                      {cls.type === "traditional" ? "Traditional" : "Specialized"}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
