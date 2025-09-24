"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, BookOpen, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AssignCourseDialog } from "./assign-course-dialog";
import { useOrganizationData } from "@/contexts/organization-data-context";
import { Course } from "@/lib/types";

interface ClassCourseViewProps {
  classId: string;
}

export function ClassCourseView({ classId }: ClassCourseViewProps) {
  const getCourseColor = (index: number) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-orange-500",
    ];
    return colors[index % colors.length];
  };

  const { classRoom, getClassesById, unassignCoursesFromClassroom } =
    useOrganizationData();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAssignCourseDialogOpen, setIsAssignCourseDialogOpen] =
    useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    getClassesById(classId, token || "");
  }, [classId, token]);

  // Use the actual courses from classRoom instead of sample boards data
  const courses = classRoom?.courses || [];

  const filteredCourses: Course[] = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.description &&
        course.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAssignCourses = (courseIds: string[]) => {
    // In a real app, this would update the class-course associations in the database
    // For now, we'll just simulate the assignment
    console.log("Assigning courses:", courseIds);
    setIsAssignCourseDialogOpen(false);
    // You would typically refresh the class data here
    getClassesById(classId, token || "");
  };

  const handleRemoveCourse = (courseId: string) => {
    // In a real app, this would remove the course from the class in the database
    console.log("Removing course:", courseId);
    unassignCoursesFromClassroom(courseId, classId, token || "");
    getClassesById(classId, token || "");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Courses for {classRoom?.name}</h2>
          <p className="text-sm text-muted-foreground">
            Manage the courses associated with this class
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsAssignCourseDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Assign Course
          </Button>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/20">
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No Courses Found</h3>
          <p className="text-muted-foreground mb-4 max-w-md">
            {searchQuery
              ? "No courses match your search criteria. Try a different search term."
              : "This class doesn't have any courses assigned yet. Assign courses to get started."}
          </p>
          {!searchQuery && (
            <Button onClick={() => setIsAssignCourseDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Assign Course
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course, index) => (
            <Card key={course._id}>
              <CardHeader className="pb-2 ">
                <div className="flex justify-between items-start">
                  <div
                    className={`h-10 w-1 rounded-full  ${getCourseColor(
                      index
                    )}`}
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Course</DropdownMenuItem>
                      <DropdownMenuItem>View Analytics</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleRemoveCourse(course._id)}
                      >
                        Remove from Class
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="text-lg">{course.name}</CardTitle>
                <CardDescription>
                  {course.description || "No description available"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <span>Duration: {course.duration} weeks</span>
                  <span>
                    Created: {new Date(course.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-muted-foreground">
                    School:{" "}
                    {typeof course.school === "string"
                      ? course.school
                      : course.school.name}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href={`/school/admin/syllabus/${course.syllabus}`}>View Course</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AssignCourseDialog
        isOpen={isAssignCourseDialogOpen}
        onClose={() => setIsAssignCourseDialogOpen(false)}
        onAssign={handleAssignCourses}
        classData={{
          id: classId,
          name: classRoom?.name,
          courses: classRoom?.courses,
        }}
      />
    </div>
  );
}
