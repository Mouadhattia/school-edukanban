"use client";

import { useOrganizationData } from "@/contexts/organization-data-context";
import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddCourseDialog } from "@/components/admin/add-course-dialog";
import { EditCourseDialog } from "@/components/admin/edit-course-dialog";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { toast } from "@/lib/toast";
import type { Course } from "@/lib/types";

export const CourseList = () => {
  const {
    courses,
    loading,
    getAllCourses,
    user,
    createCourse,
    updateCourse,
    deleteCourse,
  } = useOrganizationData();

  // use debounce function to debounce the search input
  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
  };

  const [token, setToken] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 500);

  // Dialog states
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const schoolId =
    user && user?.schoolIds && user?.schoolIds?.length > 0
      ? user?.schoolIds[0]
      : null;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, [user]);

  useEffect(() => {
    if (token && user && schoolId) {
      getAllCourses(token, {
        schoolId: schoolId,
        search: debouncedSearch,
        page: page,
        limit: limit,
      });
    }
  }, [debouncedSearch, page, limit, token, user, schoolId]);

  const coursesList = courses?.courses || [];
  const totalPages = Math.ceil((courses?.total || 0) / limit);
  const totalCourses = courses?.total || 0;

  const handleAddCourse = async (courseData: {
    name: string;
    description: string;
    price: number;
    duration: number;
    image: string;
    video: string;
  }) => {
    if (!token || !schoolId) {
      toast({
        title: "Error",
        description: "Authentication token or school ID missing.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createCourse(
        {
          ...courseData,
          school: schoolId,
        },
        token
      );

      setIsAddCourseOpen(false);
      toast({
        title: "Course Added",
        description: `${courseData.name} has been added successfully.`,
      });
    } catch (error) {
      console.error("Error creating course:", error);
      toast({
        title: "Error",
        description: "Failed to add course. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditCourse = async (updatedCourse: {
    name: string;
    description: string;
    price: number;
    duration: number;
    image: string;
    video: string;
  }) => {
    if (!token || !selectedCourse) {
      toast({
        title: "Error",
        description: "Authentication token or selected course missing.",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateCourse(selectedCourse._id, updatedCourse, token);

      setIsEditCourseOpen(false);
      toast({
        title: "Course Updated",
        description: `${updatedCourse.name} has been updated successfully.`,
      });
    } catch (error) {
      console.error("Error updating course:", error);
      toast({
        title: "Error",
        description: "Failed to update course. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCourse = async () => {
    if (!selectedCourse || !token) return;

    try {
      await deleteCourse(selectedCourse._id, token);

      setIsDeleteConfirmOpen(false);
      toast({
        title: "Course Deleted",
        description: `${selectedCourse.name} has been permanently deleted.`,
        variant: "destructive",
      });
    } catch (error) {
      console.error("Error deleting course:", error);
      toast({
        title: "Error",
        description: "Failed to delete course. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    setLimit(parseInt(value));
    setPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Courses</h3>
          <p className="text-sm text-muted-foreground">
            Manage courses for this school
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search courses..."
            className="w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={() => setIsAddCourseOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Duration (hrs)</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  Loading courses...
                </TableCell>
              </TableRow>
            ) : coursesList.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No courses found. Try a different search or add a new course.
                </TableCell>
              </TableRow>
            ) : (
              coursesList.map((course) => (
                <TableRow key={course._id}>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {course.description || "No description"}
                  </TableCell>
                  <TableCell>${course.price?.toFixed(2) || "0.00"}</TableCell>
                  <TableCell>{course.duration || 0}</TableCell>
                  <TableCell>
                    {course.createdAt
                      ? new Date(course.createdAt).toLocaleDateString()
                      : "N/A"}
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
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedCourse(course);
                            setIsEditCourseOpen(true);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setSelectedCourse(course);
                            setIsDeleteConfirmOpen(true);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalCourses > 0 && (
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between">
            {/* Left side: Items per page and summary */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Show</span>
                <Select
                  value={limit.toString()}
                  onValueChange={handleItemsPerPageChange}
                >
                  <SelectTrigger className="w-16 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm font-medium">entries</span>
              </div>

              <div className="text-sm text-muted-foreground">
                Showing {Math.min((page - 1) * limit + 1, totalCourses)} to{" "}
                {Math.min(page * limit, totalCourses)} of {totalCourses} courses
              </div>
            </div>

            {/* Right side: Page navigation */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">
                Page {page} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Previous page</span>‹
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Next page</span>›
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Dialogs */}
      <AddCourseDialog
        isOpen={isAddCourseOpen}
        onClose={() => setIsAddCourseOpen(false)}
        onAdd={handleAddCourse}
      />

      <EditCourseDialog
        isOpen={isEditCourseOpen}
        onClose={() => setIsEditCourseOpen(false)}
        onSave={handleEditCourse}
        course={selectedCourse}
      />

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDeleteCourse}
        title="Delete Course"
        description={`Are you sure you want to permanently delete "${selectedCourse?.name}"? This action cannot be undone and will remove all associated data.`}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
};
