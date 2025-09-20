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
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";
import { useOrganizationData } from "@/contexts/organization-data-context";

interface AssignCourseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (courseIds: string[]) => void;
  classData: any;
}

export function AssignCourseDialog({
  isOpen,
  onClose,
  onAssign,
  classData,
}: AssignCourseDialogProps) {
  const {
    courses,
    getAllCourses,
    user,
    assignMultiCoursestoClassroom,
    getClassesById,
  } = useOrganizationData();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);
  useEffect(() => {
    getAllCourses(token || "", {
      schoolId: user?.schoolIds?.[0] || "",
      search: searchQuery,
      page: 1,
      limit: 100,
    });
  }, [user?.schoolIds, token]);

  // Sample courses data
  //   const courses: Course[] = [
  //     {
  //       id: "course-1",
  //       title: "Physics 101 - Spring Semester",
  //       description: "Track assignments and projects for Physics 101",
  //       color: "bg-green-500",
  //     },
  //     {
  //       id: "course-2",
  //       title: "Chemistry Lab Activities",
  //       description: "Organize and track chemistry lab experiments and reports",
  //       color: "bg-blue-500",
  //     },
  //     {
  //       id: "course-3",
  //       title: "Math Homework Tracker",
  //       description: "Track progress on weekly math assignments",
  //       color: "bg-purple-500",
  //     },
  //     {
  //       id: "course-4",
  //       title: "Biology Research Project",
  //       description: "Group research project on ecosystems",
  //       color: "bg-yellow-500",
  //     },
  //     {
  //       id: "course-5",
  //       title: "Literature Analysis",
  //       description: "Track progress on literature analysis assignments",
  //       color: "bg-red-500",
  //     },
  //   ];

  //   const filteredCourses = courses.filter(
  //     (course) =>
  //       course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       course.description.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  const colors = [
    "bg-green-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-gray-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-lime-500",
  ];
  const handleToggleCourse = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleAssignMultiCourses = () => {
    assignMultiCoursestoClassroom(selectedCourses, classData.id, token || "");
    setSelectedCourses([]);
    setSearchQuery("");
    getClassesById(classData.id, token || "");
    onClose();
  };
  const filteredCourses = courses.courses.filter(
    (course) => {
      return !classData.courses?.some((c: any) => {
        return c._id == course._id;
      });
    }
    // check if the course is already assigned to the classroom
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Assign Courses to {classData.name}</DialogTitle>
          <DialogDescription>
            {classData.type === "traditional"
              ? "Select the courses to assign to this class. Students and teachers in this class will have access to these courses."
              : "Select a course for this specialized course. This will be the main workspace for the course."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search courses..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="border rounded-md divide-y max-h-[300px] overflow-y-auto">
            {filteredCourses.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No courses found matching your search
              </div>
            ) : (
              filteredCourses.map((course, index) => (
                <div
                  key={course._id}
                  className="flex items-center p-3 hover:bg-muted/50"
                >
                  <Checkbox
                    id={`course-${course._id}`}
                    checked={selectedCourses.includes(course._id)}
                    onCheckedChange={() => handleToggleCourse(course._id)}
                    className="mr-3"
                  />
                  <div
                    className={`h-10 w-1 rounded-full ${
                      colors[index % colors.length]
                    } mr-3`}
                  />
                  <Label
                    htmlFor={`course-${course._id}`}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="font-medium">{course.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {course.description}
                    </div>
                  </Label>
                </div>
              ))
            )}
          </div>

          <div className="mt-2 text-sm text-muted-foreground">
            {selectedCourses.length}{" "}
            {selectedCourses.length === 1 ? "course" : "courses"} selected
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAssignMultiCourses}
            disabled={selectedCourses.length === 0}
          >
            Assign {selectedCourses.length}{" "}
            {selectedCourses.length === 1 ? "Course" : "Courses"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
