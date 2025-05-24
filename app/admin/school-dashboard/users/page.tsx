"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Globe,
  Home,
  Layout,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Trash2,
  Users,
} from "lucide-react"

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddUserDialog, setShowAddUserDialog] = useState(false)

  const users = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      role: "Admin",
      avatar: "/placeholder.svg?height=40&width=40&query=avatar woman with glasses",
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.chen@example.com",
      role: "Editor",
      avatar: "/placeholder.svg?height=40&width=40&query=avatar asian man",
      lastActive: "1 day ago",
    },
    {
      id: "3",
      name: "Jessica Williams",
      email: "jessica.williams@example.com",
      role: "Viewer",
      avatar: "/placeholder.svg?height=40&width=40&query=avatar black woman",
      lastActive: "3 days ago",
    },
    {
      id: "4",
      name: "David Rodriguez",
      email: "david.rodriguez@example.com",
      role: "Editor",
      avatar: "/placeholder.svg?height=40&width=40&query=avatar hispanic man",
      lastActive: "1 week ago",
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-5 w-5" />
            <span>EduSite</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/sites"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
              My Sites
            </Link>
            <Link
              href="/dashboard/templates"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Layout className="h-4 w-4" />
              Templates
            </Link>
            <Link
              href="/dashboard/domains"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
              Domains
            </Link>
            <Link
              href="/dashboard/users"
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all"
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <div className="md:hidden">
            <BookOpen className="h-6 w-6" />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="sm">
              Upgrade Plan
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Toggle user menu">
              <img src="/diverse-avatars.png" alt="Avatar" className="rounded-full" height={32} width={32} />
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
              <p className="text-muted-foreground">Manage users and their access to your school websites.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>Invite a new user to collaborate on your school websites.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Enter user's name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Enter user's email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select defaultValue="editor">
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setShowAddUserDialog(false)}>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Invitation
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage users and their permissions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No users found matching your search.</p>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
                      <div className="col-span-5">User</div>
                      <div className="col-span-3">Role</div>
                      <div className="col-span-3">Last Active</div>
                      <div className="col-span-1"></div>
                    </div>
                    {filteredUsers.map((user) => (
                      <div key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center border-b last:border-0">
                        <div className="col-span-5 flex items-center gap-3">
                          <img
                            src={user.avatar || "/placeholder.svg"}
                            alt={user.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              user.role === "Admin"
                                ? "bg-primary/10 text-primary"
                                : user.role === "Editor"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                            }`}
                          >
                            {user.role}
                          </span>
                        </div>
                        <div className="col-span-3 text-sm text-muted-foreground">{user.lastActive}</div>
                        <div className="col-span-1 flex justify-end">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>User Actions</DialogTitle>
                                <DialogDescription>Manage {user.name}'s account and permissions.</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-role">Role</Label>
                                  <Select defaultValue={user.role.toLowerCase()}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="admin">Admin</SelectItem>
                                      <SelectItem value="editor">Editor</SelectItem>
                                      <SelectItem value="viewer">Viewer</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <DialogFooter className="flex justify-between">
                                <Button variant="destructive" size="sm">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Remove User
                                </Button>
                                <Button>Save Changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
