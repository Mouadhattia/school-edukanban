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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AddTeacherDialog } from "@/components/admin/add-teacher-dialog";
import { EditTeacherDialog } from "@/components/admin/edit-teacher-dialog";
import { ResetPasswordDialog } from "@/components/admin/reset-password-dialog";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";
import { useOrganizationData } from "@/contexts/organization-data-context";

export function TeachersList() {
  const router = useRouter();
  const { user, getUsers, usersData, createUser, updateUser, deleteUser } =
    useOrganizationData();
  const schoolId =
    user && user?.schoolIds && user?.schoolIds?.length > 0
      ? user?.schoolIds[0]
      : null;

  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [isEditTeacherOpen, setIsEditTeacherOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isDeactivateConfirmOpen, setIsDeactivateConfirmOpen] = useState(false);
  const [isReactivateConfirmOpen, setIsReactivateConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
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
          role: "teacher",
        },
        token
      );
    }
  }, [schoolId, currentPage, itemsPerPage, searchQuery, token]);

  const teachers = usersData?.users || [];
  const totalPages = usersData?.totalPages || 1;
  const totalTeachers = usersData?.totalUsers || 0;

  const handleAddTeacher = async (teacher: {
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
      // Create teacher using the createUser function with proper role and schoolIds
      await createUser(
        {
          fullName: teacher.fullName,
          email: teacher.email,
          role: "teacher",
          schoolId: schoolId,
          status: "active",
          password: teacher.password,
        },
        token
      );

      setIsAddTeacherOpen(false);
      toast({
        title: "Teacher Added",
        description: `${teacher.fullName} has been added successfully.`,
      });

      // Refresh the teachers list
      if (schoolId && token) {
        getUsers(
          {
            page: currentPage,
            limit: itemsPerPage,
            search: searchQuery,
            role: "teacher",
          },
          token
        );
      }
    } catch (error) {
      console.error("Error creating teacher:", error);
      toast({
        title: "Error",
        description: "Failed to add teacher. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditTeacher = async (updatedTeacher: any) => {
    if (!token || !selectedTeacher) {
      toast({
        title: "Error",
        description: "Authentication token or selected teacher missing.",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateUser(
        selectedTeacher._id,
        {
          fullName: updatedTeacher.fullName,
          email: updatedTeacher.email,
        },
        token
      );

      setIsEditTeacherOpen(false);
      toast({
        title: "Teacher Updated",
        description: `${updatedTeacher.fullName}'s information has been updated.`,
      });
    } catch (error) {
      console.error("Error updating teacher:", error);
      toast({
        title: "Error",
        description: "Failed to update teacher. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleResetPassword = (teacherId: string, newPassword: string) => {
    if (!token || !selectedTeacher) {
      toast({
        title: "Error",
        description: "Authentication token or selected teacher missing.",
        variant: "destructive",
      });
      return;
    }

    updateUser(
      selectedTeacher._id,
      {
        password: newPassword,
      },
      token
    );

    setIsResetPasswordOpen(false);

    setTimeout(() => {
      toast({
        title: "Password Reset",
        description: "The password has been reset successfully.",
      });
    }, 0);
  };

  const handleDeactivateTeacher = async () => {
    if (!selectedTeacher || !token) return;

    try {
      await updateUser(
        selectedTeacher._id,
        {
          status: "suspended",
        },
        token
      );

      setIsDeactivateConfirmOpen(false);
      toast({
        title: "Teacher Deactivated",
        description: `${selectedTeacher.fullName} has been deactivated.`,
        variant: "destructive",
      });
    } catch (error) {
      console.error("Error deactivating teacher:", error);
      toast({
        title: "Error",
        description: "Failed to deactivate teacher. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReactivateTeacher = async () => {
    if (!selectedTeacher || !token) return;

    try {
      await updateUser(
        selectedTeacher._id,
        {
          status: "active",
        },
        token
      );

      setIsReactivateConfirmOpen(false);
      toast({
        title: "Teacher Reactivated",
        description: `${selectedTeacher.fullName} has been reactivated.`,
      });
    } catch (error) {
      console.error("Error reactivating teacher:", error);
      toast({
        title: "Error",
        description: "Failed to reactivate teacher. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTeacher = async () => {
    if (!selectedTeacher || !token) return;

    try {
      await deleteUser(selectedTeacher._id, token);

      setIsDeleteConfirmOpen(false);
      toast({
        title: "Teacher Deleted",
        description: `${selectedTeacher.fullName} has been permanently deleted.`,
        variant: "destructive",
      });
    } catch (error) {
      console.error("Error deleting teacher:", error);
      toast({
        title: "Error",
        description: "Failed to delete teacher. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleViewBoards = (teacherId: string) => {
    // In a real application, you would navigate to the teacher's boards page
    router.push(`/admin/teachers/${teacherId}/boards`);
    // For now, we'll just log it
    console.log(`Viewing boards for teacher ${teacherId}`);
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

  // Since API handles pagination and filtering, use teachers directly
  const filteredTeachers = teachers;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Teachers</h3>
          <p className="text-sm text-muted-foreground">
            Manage teachers for this school
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search teachers..."
            className="w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={() => setIsAddTeacherOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Teacher
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
            {filteredTeachers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No teachers found. Try a different search or add a new
                  teacher.
                </TableCell>
              </TableRow>
            ) : (
              filteredTeachers.map((teacher) => (
                <TableRow key={teacher._id}>
                  <TableCell className="font-medium">
                    {teacher.fullName}
                  </TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell className="capitalize">{teacher.role}</TableCell>
                  <TableCell>
                    {teacher.createdAt
                      ? new Date(teacher.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        teacher.status === "active"
                          ? "bg-green-100 text-green-800"
                          : teacher.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : teacher.status === "suspended"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {teacher.status}
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
                            setSelectedTeacher(teacher);
                            setIsEditTeacherOpen(true);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleViewBoards(teacher._id)}
                        >
                          View Boards
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedTeacher(teacher);
                            setIsResetPasswordOpen(true);
                          }}
                        >
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {teacher.status === "suspended" ? (
                          <DropdownMenuItem
                            className="text-green-600"
                            onClick={() => {
                              setSelectedTeacher(teacher);
                              setIsReactivateConfirmOpen(true);
                            }}
                          >
                            Reactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => {
                              setSelectedTeacher(teacher);
                              setIsDeactivateConfirmOpen(true);
                            }}
                          >
                            Deactivate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setSelectedTeacher(teacher);
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
      {totalTeachers > 0 && (
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
                {Math.min((currentPage - 1) * itemsPerPage + 1, totalTeachers)}{" "}
                to {Math.min(currentPage * itemsPerPage, totalTeachers)} of{" "}
                {totalTeachers} teachers
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

      <AddTeacherDialog
        isOpen={isAddTeacherOpen}
        onClose={() => setIsAddTeacherOpen(false)}
        onAdd={handleAddTeacher}
      />

      <EditTeacherDialog
        isOpen={isEditTeacherOpen}
        onClose={() => setIsEditTeacherOpen(false)}
        onSave={handleEditTeacher}
        teacher={selectedTeacher}
      />

      <ResetPasswordDialog
        isOpen={isResetPasswordOpen}
        onClose={() => setIsResetPasswordOpen(false)}
        onReset={handleResetPassword}
        teacherId={selectedTeacher?._id || ""}
        teacherName={selectedTeacher?.fullName || ""}
      />

      <ConfirmDialog
        isOpen={isDeactivateConfirmOpen}
        onClose={() => setIsDeactivateConfirmOpen(false)}
        onConfirm={handleDeactivateTeacher}
        title="Deactivate Teacher"
        description={`Are you sure you want to deactivate ${selectedTeacher?.fullName}? They will no longer be able to access the system.`}
        confirmText="Deactivate"
        variant="destructive"
      />

      <ConfirmDialog
        isOpen={isReactivateConfirmOpen}
        onClose={() => setIsReactivateConfirmOpen(false)}
        onConfirm={handleReactivateTeacher}
        title="Reactivate Teacher"
        description={`Are you sure you want to reactivate ${selectedTeacher?.fullName}? They will regain access to the system.`}
        confirmText="Reactivate"
        variant="default"
      />

      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDeleteTeacher}
        title="Delete Teacher"
        description={`Are you sure you want to permanently delete ${selectedTeacher?.fullName}? This action cannot be undone and will remove all associated data.`}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
}
