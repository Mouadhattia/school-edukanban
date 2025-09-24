"use client";

import { useEffect, useState } from "react";
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
import { AddStudentDialog } from "@/components/admin/add-student-dialog";
import { EditTeacherDialog as EditStudentDialog } from "@/components/admin/edit-teacher-dialog";
import { ResetPasswordDialog } from "@/components/admin/reset-password-dialog";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import { useOrganizationData } from "@/contexts/organization-data-context";

export function StudentsList() {
  const router = useRouter();
  const { user, getUsers, usersData, createUser, updateUser, deleteUser } =
    useOrganizationData();
  const schoolId =
    user && user?.schoolIds && user?.schoolIds?.length > 0
      ? user?.schoolIds[0]
      : null;

  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isEditStudentOpen, setIsEditStudentOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isDeactivateConfirmOpen, setIsDeactivateConfirmOpen] = useState(false);
  const [isReactivateConfirmOpen, setIsReactivateConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // This code runs only on the client
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (schoolId && token) {
      getUsers(
        {
          page: currentPage,
          limit: itemsPerPage,
          search: searchQuery,
          role: "student",
          schoolId: schoolId,
        },
        token
      );
    }
  }, [schoolId, currentPage, itemsPerPage, searchQuery, token]);

  const students = usersData?.users || [];
  const totalPages = usersData?.totalPages || 1;
  const totalStudents = usersData?.totalUsers || 0;

  const handleAddStudent = async (student: {
    fullName: string;
    email: string;
    password: string;
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
      // Create student using the createUser function with proper role and schoolIds
      await createUser(
        {
          fullName: student.fullName,
          email: student.email,
          role: "student",
          schoolId: schoolId,
          status: "active",
          password: student.password,
        },
        token
      );

      setIsAddStudentOpen(false);
      toast({
        title: "Student Added",
        description: `${student.fullName} has been added successfully.`,
      });
    } catch (error) {
      console.error("Error creating student:", error);
      toast({
        title: "Error",
        description: "Failed to add student. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditStudent = async (updatedStudent: any) => {
    if (!token || !selectedStudent) {
      toast({
        title: "Error",
        description: "Authentication token or selected student missing.",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateUser(
        selectedStudent._id,
        {
          fullName: updatedStudent.fullName,
          email: updatedStudent.email,
        },
        token
      );

      setIsEditStudentOpen(false);
      toast({
        title: "Student Updated",
        description: `${updatedStudent.fullName}'s information has been updated.`,
      });
    } catch (error) {
      console.error("Error updating student:", error);
      toast({
        title: "Error",
        description: "Failed to update student. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleResetPassword = (studentId: string, newPassword: string) => {
    // In a real application, you would call an API to reset the password
    console.log(`Password for student ${studentId} reset to: ${newPassword}`);
    setIsResetPasswordOpen(false);

    setTimeout(() => {
      toast({
        title: "Password Reset",
        description: "The password has been reset successfully.",
      });
    }, 0);
  };

  const handleDeactivateStudent = async () => {
    if (!selectedStudent || !token) return;

    try {
      await updateUser(
        selectedStudent._id,
        {
          status: "suspended",
        },
        token
      );

      setIsDeactivateConfirmOpen(false);
      toast({
        title: "Student Deactivated",
        description: `${selectedStudent.fullName} has been deactivated.`,
        variant: "destructive",
      });
    } catch (error) {
      console.error("Error deactivating student:", error);
      toast({
        title: "Error",
        description: "Failed to deactivate student. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReactivateStudent = async () => {
    if (!selectedStudent || !token) return;

    try {
      await updateUser(
        selectedStudent._id,
        {
          status: "active",
        },
        token
      );

      setIsReactivateConfirmOpen(false);
      toast({
        title: "Student Reactivated",
        description: `${selectedStudent.fullName} has been reactivated.`,
      });
    } catch (error) {
      console.error("Error reactivating student:", error);
      toast({
        title: "Error",
        description: "Failed to reactivate student. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteStudent = async () => {
    if (!selectedStudent || !token) return;

    try {
      await deleteUser(selectedStudent._id, token);

      setIsDeleteConfirmOpen(false);
      toast({
        title: "Student Deleted",
        description: `${selectedStudent.fullName} has been permanently deleted.`,
        variant: "destructive",
      });
    } catch (error) {
      console.error("Error deleting student:", error);
      toast({
        title: "Error",
        description: "Failed to delete student. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewBoards = (studentId: string) => {
    // In a real application, you would navigate to the student's boards page
    router.push(`/admin/students/${studentId}/boards`);
    // For now, we'll just log it
    console.log(`Viewing boards for student ${studentId}`);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Since API handles pagination and filtering, use students directly
  const filteredStudents = students;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Students</h3>
          <p className="text-sm text-muted-foreground">
            Manage students for this school
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search students..."
            className="w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={() => setIsAddStudentOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No students found. Try a different search or add a new
                  student.
                </TableCell>
              </TableRow>
            ) : (
              filteredStudents.map((student) => (
                <TableRow key={student._id}>
                  <TableCell className="font-medium">
                    {student.fullName}
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell className="capitalize">{student.role}</TableCell>
                  <TableCell>
                    {student.createdAt
                      ? new Date(student.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        student.status === "active"
                          ? "bg-green-100 text-green-800"
                          : student.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : student.status === "suspended"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {student.status}
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
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedStudent(student);
                            setIsEditStudentOpen(true);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleViewBoards(student._id)}
                        >
                          View Boards
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedStudent(student);
                            setIsResetPasswordOpen(true);
                          }}
                        >
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {student.status === "suspended" ? (
                          <DropdownMenuItem
                            className="text-green-600"
                            onClick={() => {
                              setSelectedStudent(student);
                              setIsReactivateConfirmOpen(true);
                            }}
                          >
                            Reactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => {
                              setSelectedStudent(student);
                              setIsDeactivateConfirmOpen(true);
                            }}
                          >
                            Deactivate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setSelectedStudent(student);
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
      {totalStudents > 0 && (
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between">
            {/* Left side: Items per page and summary */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Show</span>
                <Select
                  value={itemsPerPage.toString()}
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
                Showing{" "}
                {Math.min((currentPage - 1) * itemsPerPage + 1, totalStudents)}{" "}
                to {Math.min(currentPage * itemsPerPage, totalStudents)} of{" "}
                {totalStudents} students
              </div>
            </div>

            {/* Right side: Page navigation */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Previous page</span>‹
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Next page</span>›
              </Button>
            </div>
          </div>
        </div>
      )}

      <AddStudentDialog
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onAdd={handleAddStudent}
      />

      <EditStudentDialog
        isOpen={isEditStudentOpen}
        onClose={() => setIsEditStudentOpen(false)}
        onSave={handleEditStudent}
        teacher={selectedStudent}
      />

      <ResetPasswordDialog
        isOpen={isResetPasswordOpen}
        onClose={() => setIsResetPasswordOpen(false)}
        onReset={handleResetPassword}
        teacherId={selectedStudent?._id || ""}
        teacherName={selectedStudent?.fullName || ""}
      />

      <ConfirmDialog
        isOpen={isDeactivateConfirmOpen}
        onClose={() => setIsDeactivateConfirmOpen(false)}
        onConfirm={handleDeactivateStudent}
        title="Deactivate Student"
        description={`Are you sure you want to deactivate ${selectedStudent?.fullName}? They will no longer be able to access the system.`}
        confirmText="Deactivate"
        variant="destructive"
      />

      <ConfirmDialog
        isOpen={isReactivateConfirmOpen}
        onClose={() => setIsReactivateConfirmOpen(false)}
        onConfirm={handleReactivateStudent}
        title="Reactivate Student"
        description={`Are you sure you want to reactivate ${selectedStudent?.fullName}? They will regain access to the system.`}
        confirmText="Reactivate"
        variant="default"
      />

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDeleteStudent}
        title="Delete Student"
        description={`Are you sure you want to permanently delete ${selectedStudent?.fullName}? This action cannot be undone and will remove all associated data.`}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
}
