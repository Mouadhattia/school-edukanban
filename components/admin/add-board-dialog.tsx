"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Board } from "@/lib/types";
import { useOrganizationData } from "@/contexts/organization-data-context";

interface AddBoardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (board: Partial<Board>) => void;
  board?: Partial<Board> | null;
}

export function AddBoardDialog({
  isOpen,
  onClose,
  onAdd,
  board,
}: AddBoardDialogProps) {
  useEffect(() => {
    if (board?._id) {
      setFormData(board);
    }
  }, [board]);
  const { user } = useOrganizationData();
  const [formData, setFormData] = useState<Partial<Board>>({
    title: "",
    description: "",
    backgroundColor: "",
  });
  const colorPalettes: string[] = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-gray-500",

    "bg-black-500",
    "bg-white-500",
    "bg-brown-500",
  ];

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData?.title?.trim()) {
      newErrors.title = "Board title is required";
    }

    if (!formData?.description?.trim()) {
      newErrors.description = "Board description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      if (!user?.userId) return;
      if (board?._id) {
        onAdd(formData);
      } else {
        onAdd({
          ...formData,
          members: [
            {
              userId: user?.userId,
              role: "owner",
            },
          ],
          createdBy: user?.userId,
        });
      }
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      backgroundColor: "",
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Board</DialogTitle>
          <DialogDescription>
            Create a new board. Fill in the required information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Board Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter board title"
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter board description"
              className={errors.description ? "border-destructive" : ""}
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Background Color *</Label>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2">
                {colorPalettes.map((color) => (
                  <div
                    key={color}
                    className={`w-4 h-4 rounded-full ${color} cursor-pointer`}
                    onClick={() => handleInputChange("backgroundColor", color)}
                  />
                ))}
              </div>
              {/* show selected background color */}
              <div
                className={`w-8 h-8 rounded-full ${formData.backgroundColor}`}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Add Course</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
