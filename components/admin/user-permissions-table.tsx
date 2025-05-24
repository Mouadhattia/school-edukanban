"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, Plus } from "lucide-react"

interface UserPermissionsTableProps {
  schoolId: string
}

export function UserPermissionsTable({ schoolId }: UserPermissionsTableProps) {
  const [selectedRole, setSelectedRole] = useState<string>("all")

  // Sample roles and permissions data
  const roles = [
    {
      id: "role-1",
      name: "Administrator",
      description: "Full system access",
      users: 3,
    },
    {
      id: "role-2",
      name: "Teacher",
      description: "Manage boards and students",
      users: 24,
    },
    {
      id: "role-3",
      name: "Department Head",
      description: "Manage department teachers and boards",
      users: 8,
    },
    {
      id: "role-4",
      name: "Student",
      description: "View and interact with assigned boards",
      users: 573,
    },
    {
      id: "role-5",
      name: "Teaching Assistant",
      description: "Limited board management",
      users: 12,
    },
    {
      id: "role-6",
      name: "Parent",
      description: "View student progress",
      users: 420,
    },
    {
      id: "role-7",
      name: "Curriculum Designer",
      description: "Create and manage templates",
      users: 5,
    },
  ]

  // Sample permissions data
  const permissions = [
    { id: "perm-1", name: "View Boards" },
    { id: "perm-2", name: "Create Boards" },
    { id: "perm-3", name: "Edit Boards" },
    { id: "perm-4", name: "Delete Boards" },
    { id: "perm-5", name: "Manage Users" },
    { id: "perm-6", name: "View Analytics" },
    { id: "perm-7", name: "Export Data" },
    { id: "perm-8", name: "System Settings" },
    { id: "perm-9", name: "Manage Templates" },
    { id: "perm-10", name: "View Student Data" },
  ]

  // Sample role permissions mapping
  const rolePermissions = {
    "role-1": ["perm-1", "perm-2", "perm-3", "perm-4", "perm-5", "perm-6", "perm-7", "perm-8", "perm-9", "perm-10"],
    "role-2": ["perm-1", "perm-2", "perm-3", "perm-6", "perm-10"],
    "role-3": ["perm-1", "perm-2", "perm-3", "perm-4", "perm-6", "perm-7", "perm-10"],
    "role-4": ["perm-1"],
    "role-5": ["perm-1", "perm-3", "perm-10"],
    "role-6": ["perm-1", "perm-10"],
    "role-7": ["perm-1", "perm-2", "perm-3", "perm-9"],
  }

  // Filter roles based on selected role
  const filteredRoles = selectedRole === "all" ? roles : roles.filter((role) => role.id === selectedRole)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">User Permissions</h3>
          <p className="text-sm text-muted-foreground">Manage roles and permissions for users</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search roles..." className="w-full pl-8" />
          </div>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Role
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Role</TableHead>
              <TableHead className="w-[200px]">Description</TableHead>
              <TableHead className="w-[80px] text-center">Users</TableHead>
              {permissions.map((permission) => (
                <TableHead key={permission.id} className="text-center">
                  {permission.name}
                </TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell className="text-center">{role.users}</TableCell>
                {permissions.map((permission) => (
                  <TableCell key={permission.id} className="text-center">
                    <Checkbox
                      checked={rolePermissions[role.id as keyof typeof rolePermissions]?.includes(permission.id)}
                      className="mx-auto"
                    />
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
