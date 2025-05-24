"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Edit, Trash2, Users, Shield, Lock } from "lucide-react"

// Mock role data
const mockRoles = [
  {
    id: "role-001",
    name: "Administrator",
    description: "Full access to all system features",
    userCount: 5,
    permissions: ["view:all", "manage:all"],
    isSystem: true,
  },
  {
    id: "role-002",
    name: "Teacher",
    description: "Access to teaching resources and student data",
    userCount: 42,
    permissions: [
      "view:classes",
      "create:class",
      "edit:class",
      "delete:class",
      "view:students",
      "manage:students",
      "view:boards",
      "create:board",
      "edit:board",
      "delete:board",
      "view:assignments",
      "create:assignment",
      "grade:assignment",
    ],
    isSystem: true,
  },
  {
    id: "role-003",
    name: "Student",
    description: "Limited access to learning resources",
    userCount: 850,
    permissions: ["view:classes", "view:assignments", "submit:assignment", "view:boards", "view:progress"],
    isSystem: true,
  },
  {
    id: "role-004",
    name: "Department Head",
    description: "Administrative access for specific department",
    userCount: 8,
    permissions: [
      "view:classes",
      "create:class",
      "edit:class",
      "view:students",
      "manage:students",
      "view:boards",
      "create:board",
      "edit:board",
      "view:assignments",
      "create:assignment",
      "grade:assignment",
      "view:reports",
      "view:analytics",
    ],
    isSystem: false,
  },
  {
    id: "role-005",
    name: "Teaching Assistant",
    description: "Limited teaching capabilities",
    userCount: 15,
    permissions: ["view:classes", "view:students", "view:boards", "view:assignments", "grade:assignment"],
    isSystem: false,
  },
]

// Mock permission categories
const permissionCategories = [
  {
    name: "Classes",
    permissions: [
      { id: "view:classes", name: "View Classes" },
      { id: "create:class", name: "Create Class" },
      { id: "edit:class", name: "Edit Class" },
      { id: "delete:class", name: "Delete Class" },
    ],
  },
  {
    name: "Students",
    permissions: [
      { id: "view:students", name: "View Students" },
      { id: "manage:students", name: "Manage Students" },
    ],
  },
  {
    name: "Boards",
    permissions: [
      { id: "view:boards", name: "View Boards" },
      { id: "create:board", name: "Create Board" },
      { id: "edit:board", name: "Edit Board" },
      { id: "delete:board", name: "Delete Board" },
    ],
  },
  {
    name: "Assignments",
    permissions: [
      { id: "view:assignments", name: "View Assignments" },
      { id: "create:assignment", name: "Create Assignment" },
      { id: "submit:assignment", name: "Submit Assignment" },
      { id: "grade:assignment", name: "Grade Assignment" },
    ],
  },
  {
    name: "Analytics",
    permissions: [
      { id: "view:reports", name: "View Reports" },
      { id: "view:analytics", name: "View Analytics" },
    ],
  },
  {
    name: "System",
    permissions: [
      { id: "view:all", name: "View All" },
      { id: "manage:all", name: "Manage All" },
    ],
  },
]

export function UserAccessControls() {
  const [roles, setRoles] = useState(mockRoles)
  const [activeTab, setActiveTab] = useState("roles")
  const [isCreateRoleDialogOpen, setIsCreateRoleDialogOpen] = useState(false)
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false)
  const [isDeleteRoleDialogOpen, setIsDeleteRoleDialogOpen] = useState(false)
  const [currentRole, setCurrentRole] = useState<(typeof mockRoles)[0] | null>(null)
  const [newRoleName, setNewRoleName] = useState("")
  const [newRoleDescription, setNewRoleDescription] = useState("")
  const [newRolePermissions, setNewRolePermissions] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  // Filter roles based on search
  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle creating a new role
  const handleCreateRole = () => {
    const newRole = {
      id: `role-${roles.length + 1}`.padStart(7, "0"),
      name: newRoleName,
      description: newRoleDescription,
      userCount: 0,
      permissions: newRolePermissions,
      isSystem: false,
    }

    setRoles([...roles, newRole])
    setIsCreateRoleDialogOpen(false)

    // Reset form
    setNewRoleName("")
    setNewRoleDescription("")
    setNewRolePermissions([])

    toast({
      title: "Role created",
      description: `The role "${newRoleName}" has been created successfully.`,
    })
  }

  // Handle updating a role
  const handleUpdateRole = () => {
    if (!currentRole) return

    setRoles(
      roles.map((role) =>
        role.id === currentRole.id
          ? {
              ...role,
              name: newRoleName,
              description: newRoleDescription,
              permissions: newRolePermissions,
            }
          : role,
      ),
    )

    setIsEditRoleDialogOpen(false)

    toast({
      title: "Role updated",
      description: `The role "${newRoleName}" has been updated successfully.`,
    })
  }

  // Handle deleting a role
  const handleDeleteRole = () => {
    if (!currentRole) return

    setRoles(roles.filter((role) => role.id !== currentRole.id))
    setIsDeleteRoleDialogOpen(false)

    toast({
      title: "Role deleted",
      description: `The role "${currentRole.name}" has been deleted successfully.`,
    })
  }

  // Open edit role dialog
  const openEditRoleDialog = (role: (typeof mockRoles)[0]) => {
    setCurrentRole(role)
    setNewRoleName(role.name)
    setNewRoleDescription(role.description)
    setNewRolePermissions([...role.permissions])
    setIsEditRoleDialogOpen(true)
  }

  // Open delete role dialog
  const openDeleteRoleDialog = (role: (typeof mockRoles)[0]) => {
    setCurrentRole(role)
    setIsDeleteRoleDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="roles" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="roles" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center">
            <Shield className="mr-2 h-4 w-4" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Lock className="mr-2 h-4 w-4" />
            Access Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>User Roles</CardTitle>
                <CardDescription>Manage roles and their permissions</CardDescription>
              </div>
              <Dialog open={isCreateRoleDialogOpen} onOpenChange={setIsCreateRoleDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Role
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create new role</DialogTitle>
                    <DialogDescription>Create a new role with specific permissions</DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="role-name">Role name</Label>
                      <Input
                        id="role-name"
                        placeholder="e.g., Department Head"
                        value={newRoleName}
                        onChange={(e) => setNewRoleName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role-description">Description</Label>
                      <Input
                        id="role-description"
                        placeholder="e.g., Administrative access for specific department"
                        value={newRoleDescription}
                        onChange={(e) => setNewRoleDescription(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Permissions</Label>
                      <div className="border rounded-md p-4 space-y-4">
                        {permissionCategories.map((category) => (
                          <div key={category.name} className="space-y-2">
                            <h4 className="text-sm font-medium">{category.name}</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {category.permissions.map((permission) => (
                                <div key={permission.id} className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id={`permission-${permission.id}`}
                                    checked={newRolePermissions.includes(permission.id)}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setNewRolePermissions([...newRolePermissions, permission.id])
                                      } else {
                                        setNewRolePermissions(newRolePermissions.filter((p) => p !== permission.id))
                                      }
                                    }}
                                  />
                                  <Label htmlFor={`permission-${permission.id}`} className="text-sm">
                                    {permission.name}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateRoleDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateRole} disabled={!newRoleName || newRolePermissions.length === 0}>
                      Create Role
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search roles..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role</TableHead>
                      <TableHead className="hidden md:table-cell">Description</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRoles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell>
                          <div className="font-medium">{role.name}</div>
                          <div className="text-xs text-muted-foreground md:hidden">{role.description}</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{role.description}</TableCell>
                        <TableCell>{role.userCount}</TableCell>
                        <TableCell>
                          {role.isSystem ? (
                            <Badge variant="secondary">System</Badge>
                          ) : (
                            <Badge variant="outline">Custom</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditRoleDialog(role)}
                              disabled={role.isSystem}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openDeleteRoleDialog(role)}
                              disabled={role.isSystem || role.userCount > 0}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredRoles.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No roles found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Edit Role Dialog */}
          <Dialog open={isEditRoleDialogOpen} onOpenChange={setIsEditRoleDialogOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Edit role</DialogTitle>
                <DialogDescription>Modify role details and permissions</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-role-name">Role name</Label>
                  <Input id="edit-role-name" value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-role-description">Description</Label>
                  <Input
                    id="edit-role-description"
                    value={newRoleDescription}
                    onChange={(e) => setNewRoleDescription(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="border rounded-md p-4 space-y-4">
                    {permissionCategories.map((category) => (
                      <div key={category.name} className="space-y-2">
                        <h4 className="text-sm font-medium">{category.name}</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {category.permissions.map((permission) => (
                            <div key={permission.id} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`edit-permission-${permission.id}`}
                                checked={newRolePermissions.includes(permission.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setNewRolePermissions([...newRolePermissions, permission.id])
                                  } else {
                                    setNewRolePermissions(newRolePermissions.filter((p) => p !== permission.id))
                                  }
                                }}
                              />
                              <Label htmlFor={`edit-permission-${permission.id}`} className="text-sm">
                                {permission.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditRoleDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateRole} disabled={!newRoleName || newRolePermissions.length === 0}>
                  Update Role
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Role Dialog */}
          <Dialog open={isDeleteRoleDialogOpen} onOpenChange={setIsDeleteRoleDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete role</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this role? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>

              {currentRole && (
                <div className="py-4">
                  <p className="font-medium">{currentRole.name}</p>
                  <p className="text-sm text-muted-foreground">{currentRole.description}</p>
                </div>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteRoleDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteRole}>
                  Delete Role
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>View and manage available permissions in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {permissionCategories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <h3 className="text-lg font-medium">{category.name}</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Permission</TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead>Description</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {category.permissions.map((permission) => (
                            <TableRow key={permission.id}>
                              <TableCell className="font-medium">{permission.name}</TableCell>
                              <TableCell className="font-mono text-xs">{permission.id}</TableCell>
                              <TableCell>
                                {permission.id === "view:classes" && "Allows viewing class information"}
                                {permission.id === "create:class" && "Allows creating new classes"}
                                {permission.id === "edit:class" && "Allows editing existing classes"}
                                {permission.id === "delete:class" && "Allows deleting classes"}
                                {permission.id === "view:students" && "Allows viewing student information"}
                                {permission.id === "manage:students" && "Allows managing student accounts"}
                                {permission.id === "view:boards" && "Allows viewing kanban boards"}
                                {permission.id === "create:board" && "Allows creating new boards"}
                                {permission.id === "edit:board" && "Allows editing existing boards"}
                                {permission.id === "delete:board" && "Allows deleting boards"}
                                {permission.id === "view:assignments" && "Allows viewing assignments"}
                                {permission.id === "create:assignment" && "Allows creating new assignments"}
                                {permission.id === "submit:assignment" && "Allows submitting assignments"}
                                {permission.id === "grade:assignment" && "Allows grading assignments"}
                                {permission.id === "view:reports" && "Allows viewing reports"}
                                {permission.id === "view:analytics" && "Allows viewing analytics"}
                                {permission.id === "view:all" && "Allows viewing all system resources"}
                                {permission.id === "manage:all" && "Allows managing all system resources"}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Control Settings</CardTitle>
              <CardDescription>Configure global access control settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Login Restrictions</h3>

                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="ip-restriction" className="text-base">
                      IP address restrictions
                    </Label>
                    <p className="text-sm text-muted-foreground">Restrict access to the system based on IP addresses</p>
                  </div>
                  <Switch id="ip-restriction" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="time-restriction" className="text-base">
                      Time-based restrictions
                    </Label>
                    <p className="text-sm text-muted-foreground">Restrict access to the system during specific hours</p>
                  </div>
                  <Switch id="time-restriction" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="concurrent-sessions" className="text-base">
                      Limit concurrent sessions
                    </Label>
                    <p className="text-sm text-muted-foreground">Limit the number of active sessions per user</p>
                  </div>
                  <Switch id="concurrent-sessions" defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">User Management</h3>

                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="self-registration" className="text-base">
                      Allow self-registration
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow users to register accounts without admin approval
                    </p>
                  </div>
                  <Switch id="self-registration" />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="admin-approval" className="text-base">
                      Require admin approval for new accounts
                    </Label>
                    <p className="text-sm text-muted-foreground">New accounts must be approved by an administrator</p>
                  </div>
                  <Switch id="admin-approval" defaultChecked />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="auto-deactivate" className="text-base">
                      Auto-deactivate inactive accounts
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically deactivate accounts after a period of inactivity
                    </p>
                  </div>
                  <Switch id="auto-deactivate" defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Role Assignment</h3>

                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="default-role" className="text-base">
                      Default role for new users
                    </Label>
                    <p className="text-sm text-muted-foreground">Role automatically assigned to new user accounts</p>
                  </div>
                  <Select defaultValue="student">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="role-delegation" className="text-base">
                      Allow role delegation
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow administrators to delegate role assignment to other users
                    </p>
                  </div>
                  <Switch id="role-delegation" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
