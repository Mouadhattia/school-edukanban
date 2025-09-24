"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Filter,
  School,
  Users,
  BookOpen,
  MoreHorizontal,
  Edit,
  Trash,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
import { CreateClassDialog } from "@/components/admin/create-class-dialog";
import { AssignBoardDialog } from "@/components/admin/assign-board-dialog";
import { AssignStudentsDialog } from "@/components/admin/assign-students-dialog";
import { AssignTeachersDialog } from "@/components/admin/assign-teachers-dialog";
import { useOrganizationData } from "@/contexts/organization-data-context";
import { Classroom, FullClassRoomCreationData } from "@/lib/types";
import Link from "next/link";

export function ClassManagement() {
  // context
  const {
    user,
    getClasses,
    classesData,
    updateClassroom,
    deleteClassroom,
    createFullClassRoom,
  } = useOrganizationData();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAssignBoardDialogOpen, setIsAssignBoardDialogOpen] = useState(false);
  const [isAssignStudentsDialogOpen, setIsAssignStudentsDialogOpen] =
    useState(false);
  const [isAssignTeachersDialogOpen, setIsAssignTeachersDialogOpen] =
    useState(false);
  const [selectedClass, setSelectedClass] = useState<Classroom | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch classes on mount
  useEffect(() => {
    if (user && user.schoolIds && user.schoolIds.length > 0) {
      setLoading(true);
      getClasses(
        {
          page: 1,
          limit: 20,
          search: searchQuery,
          schoolId: user.schoolIds[0],
          fromDate: "",
          toDate: "",
        },
        localStorage.getItem("token") || ""
      ).finally(() => setLoading(false));
    }
  }, [user, searchQuery]);

  const handleCreateClass = async (classData: FullClassRoomCreationData) => {
    if (!user || !user.schoolIds || user.schoolIds.length === 0) return;
    setLoading(true);
    await createFullClassRoom(classData, localStorage.getItem("token") || "");
    setIsCreateDialogOpen(false);
    setLoading(false);
  };

  const handleAssignBoard = (classId: string, boardIds: string[]) => {
    // In a real app, this would update the class-board associations in the database
    // setClasses(
    //   classes.map((c) =>
    //     c.id === classId
    //       ? { ...c, boardCount: c.boardCount + boardIds.length }
    //       : c
    // )
    // );
    setIsAssignBoardDialogOpen(false);
  };

  const handleAssignStudents = (classId: string, studentIds: string[]) => {
    // In a real app, this would update the class-student associations in the database
    // setClasses(
    //   classes.map((c) =>
    //     c.id === classId
    //       ? { ...c, studentCount: c.studentCount + studentIds.length }
    //       : c
    // )
    // );
    setIsAssignStudentsDialogOpen(false);
  };

  const handleAssignTeachers = (classId: string, teacherIds: string[]) => {
    // In a real app, this would update the class-teacher associations in the database
    // setClasses(
    //   classes.map((c) =>
    //     c.id === classId
    //       ? { ...c, teacherCount: c.teacherCount + teacherIds.length }
    //       : c
    // )
    // );
    setIsAssignTeachersDialogOpen(false);
  };

  const handleDeleteClass = async (classId: string) => {
    setLoading(true);
    await deleteClassroom(classId, localStorage.getItem("token") || "");
    setLoading(false);
  };

  // Use real classes from API
  const classes = classesData.classes || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search classes..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Class
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-muted-foreground"
              >
                No classes found.
              </TableCell>
            </TableRow>
          ) : (
            classes.map((cls) => (
              <TableRow key={cls._id}>
                <TableCell className="font-medium">{cls.name}</TableCell>

                <TableCell>{cls.status}</TableCell>
                <TableCell>
                  {typeof cls.levelId === "string"
                    ? cls.levelId
                    : cls.levelId?.name}
                </TableCell>
                <TableCell>
                  {cls.createdAt
                    ? new Date(cls.createdAt).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell>
                  {cls.updatedAt
                    ? new Date(cls.updatedAt).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/classes/${cls._id}/boards`}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          View Boards
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/classes/${cls._id}/courses`}>
                          <BookOpen className="mr-2 h-4 w-4" />
                          View Courses
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDeleteClass(cls._id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete Class
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <CreateClassDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreateClass={handleCreateClass}
      />

      {selectedClass && (
        <>
          <AssignBoardDialog
            isOpen={isAssignBoardDialogOpen}
            onClose={() => setIsAssignBoardDialogOpen(false)}
            onAssign={(boardIds) =>
              handleAssignBoard(selectedClass._id, boardIds)
            }
            classData={selectedClass}
          />

          <AssignStudentsDialog
            isOpen={isAssignStudentsDialogOpen}
            onClose={() => setIsAssignStudentsDialogOpen(false)}
            onAssign={(studentIds) =>
              handleAssignStudents(selectedClass._id, studentIds)
            }
            classData={selectedClass}
          />

          <AssignTeachersDialog
            isOpen={isAssignTeachersDialogOpen}
            onClose={() => setIsAssignTeachersDialogOpen(false)}
            onAssign={(teacherIds) =>
              handleAssignTeachers(selectedClass._id, teacherIds)
            }
            classData={selectedClass}
          />
        </>
      )}
    </div>
  );
}
