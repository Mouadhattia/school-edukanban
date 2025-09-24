"use client";

import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useOrganizationData } from "@/contexts/organization-data-context";

interface AddProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: {
    name: string;
    description: string;
    price: number;
    duration: number;
    image: string;
    video: string;
    enableJoinClass: boolean;
    courses: string[];
  }) => void;
}

export function AddProductDialog({
  isOpen,
  onClose,
  onAdd,
}: AddProductDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    duration: 0,
    image: "",
    video: "",
    enableJoinClass: false,
    courses: [] as string[],
  });
  const { courses, } = useOrganizationData();


  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Product description is required";
    }

    if (formData.price < 0) {
      newErrors.price = "Price must be a positive number";
    }

 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
 
    if (validateForm()) {
    

      onAdd({
        ...formData,
        duration: calculateTotalDuration(), // Use calculated duration from courses
        courses: formData.courses,
      });
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      duration: 0,
      image: "",
      video: "",
      enableJoinClass: false,
      courses: [] as string[],
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field: string, value: string | number | boolean | string[]) => {
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

  // Calculate total duration from selected courses
  const calculateTotalDuration = () => {
    if (!formData.courses || formData.courses.length === 0) return 0;
    return formData.courses.reduce((total, courseId) => {
      const course = courseList.find(c => c._id === courseId);
      return total + (course?.duration || 0);
    }, 0);
  };
  const courseList = courses?.courses || [];
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Create a new product. Fill in the required information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter product name"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter product description"
              className={errors.description ? "border-destructive" : ""}
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  handleInputChange("price", parseFloat(e.target.value) || 0)
                }
                placeholder="0.00"
                className={errors.price ? "border-destructive" : ""}
              />
              {errors.price && (
                <p className="text-sm text-destructive">{errors.price}</p>
              )}
            </div>

   
          </div>
        {/* checkbox select multiple courses */}
        <div className="space-y-2">
          <Label htmlFor="courses">Courses</Label>
          <div className="max-h-40 overflow-y-auto border rounded-md p-2">
            {courseList.length > 0 ? (
              courseList.map((course) => (
                <div key={course._id} className="flex items-center space-x-2 py-1">
                  <Checkbox 
                    id={course._id} 
                    checked={formData.courses.includes(course._id)} 
                    onCheckedChange={(checked) => 
                      handleInputChange("courses", 
                        checked 
                          ? [...formData.courses, course._id] 
                          : formData.courses.filter((id) => id !== course._id)
                      )
                    } 
                  />
                  <Label htmlFor={course._id} className="flex-1 cursor-pointer">
                    {course.name} ({course.duration || 0}h)
                  </Label>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No courses available</p>
            )}
          </div>
          {formData.courses.length > 0 && (
            <div className="text-sm text-muted-foreground">
              Selected: {formData.courses.length} courses, Total Duration: {calculateTotalDuration()} hours
            </div>
          )}
        </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              type="url"
              value={formData.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video">Video URL</Label>
            <Input
              id="video"
              type="url"
              value={formData.video}
              onChange={(e) => handleInputChange("video", e.target.value)}
              placeholder="https://example.com/video.mp4"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="enableJoinClass"
              checked={formData.enableJoinClass}
              onCheckedChange={(checked) =>
                handleInputChange("enableJoinClass", checked === true)
              }
            />
            <Label htmlFor="enableJoinClass">Enable Join Class</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Add Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
