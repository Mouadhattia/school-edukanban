"use client"

import { useState } from "react"
import { Download, FileText, Search, Filter, Calendar, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Template } from "@/lib/types"

interface PurchaseHistoryProps {
  schoolId: string
}

interface Purchase {
  id: string
  templateId: string
  templateTitle: string
  price: number
  purchaseDate: Date
  paymentMethod: string
  status: "completed" | "pending" | "refunded"
  receiptUrl?: string
  template: Template
  requestedBy?: string
  requestDate?: Date
  approvedBy?: string
  approvedDate?: Date
  notes?: string
}

export function PurchaseHistory({ schoolId }: PurchaseHistoryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "pending" | "refunded">("all")
  const [timeFilter, setTimeFilter] = useState<"all" | "this_month" | "last_month" | "this_year">("all")
  const [activeTab, setActiveTab] = useState<"all" | "requested" | "approved">("all")

  // Sample purchase data
  const [purchases] = useState<Purchase[]>([
    {
      id: "purchase-1",
      templateId: "template-1",
      templateTitle: "Physics 101 Curriculum",
      price: 49.99,
      purchaseDate: new Date(2023, 3, 15),
      paymentMethod: "Credit Card",
      status: "completed",
      receiptUrl: "#",
      requestedBy: "John Smith",
      requestDate: new Date(2023, 3, 10),
      approvedBy: "Principal Johnson",
      approvedDate: new Date(2023, 3, 12),
      notes: "Essential for our AP Physics classes",
      template: {
        id: "template-1",
        title: "Physics 101 Curriculum",
        description: "A comprehensive physics curriculum for high school students",
        createdAt: new Date(2023, 1, 10),
        updatedAt: new Date(2023, 2, 5),
        designerId: "designer-1",
        designerName: "Dr. Richard Feynman",
        organizationId: "org-1",
        color: "bg-blue-500",
        educationLevels: ["high"],
        subjects: ["physics", "science"],
        pricing: {
          type: "paid",
          price: 49.99,
        },
        status: "published",
        visibility: "public",
        stats: {
          views: 1250,
          installs: 320,
          activeInstances: 280,
          schoolsUsing: 45,
        },
        versions: [
          {
            version: "1.2.0",
            releaseDate: new Date(2023, 2, 5),
            changes: ["Added new experiments", "Fixed typos"],
          },
        ],
      },
    },
    {
      id: "purchase-2",
      templateId: "template-2",
      templateTitle: "Advanced Mathematics",
      price: 39.99,
      purchaseDate: new Date(2023, 4, 22),
      paymentMethod: "Purchase Order",
      status: "completed",
      receiptUrl: "#",
      requestedBy: "Sarah Johnson",
      requestDate: new Date(2023, 4, 15),
      approvedBy: "Principal Johnson",
      approvedDate: new Date(2023, 4, 18),
      notes: "For calculus and advanced algebra courses",
      template: {
        id: "template-2",
        title: "Advanced Mathematics",
        description: "Advanced mathematics curriculum for high school students",
        createdAt: new Date(2023, 2, 15),
        updatedAt: new Date(2023, 3, 10),
        designerId: "designer-2",
        designerName: "Dr. Ada Lovelace",
        organizationId: "org-2",
        color: "bg-purple-500",
        educationLevels: ["high"],
        subjects: ["mathematics", "algebra", "calculus"],
        pricing: {
          type: "paid",
          price: 39.99,
        },
        status: "published",
        visibility: "public",
        stats: {
          views: 980,
          installs: 210,
          activeInstances: 190,
          schoolsUsing: 32,
        },
        versions: [
          {
            version: "1.1.0",
            releaseDate: new Date(2023, 3, 10),
            changes: ["Added calculus section", "Improved problem sets"],
          },
        ],
      },
    },
    {
      id: "purchase-3",
      templateId: "template-3",
      templateTitle: "English Literature Classics",
      price: 29.99,
      purchaseDate: new Date(2023, 5, 8),
      paymentMethod: "School Account",
      status: "pending",
      requestedBy: "Current User",
      requestDate: new Date(2023, 5, 5),
      notes: "Requested for sophomore English classes",
      template: {
        id: "template-3",
        title: "English Literature Classics",
        description: "Classic literature curriculum for high school students",
        createdAt: new Date(2023, 4, 5),
        updatedAt: new Date(2023, 4, 20),
        designerId: "designer-3",
        designerName: "Prof. Jane Austen",
        organizationId: "org-1",
        color: "bg-emerald-500",
        educationLevels: ["high", "middle"],
        subjects: ["english", "literature"],
        pricing: {
          type: "paid",
          price: 29.99,
        },
        status: "published",
        visibility: "public",
        stats: {
          views: 750,
          installs: 180,
          activeInstances: 160,
          schoolsUsing: 28,
        },
        versions: [
          {
            version: "1.0.0",
            releaseDate: new Date(2023, 4, 20),
            changes: ["Initial release"],
          },
        ],
      },
    },
    {
      id: "purchase-4",
      templateId: "template-4",
      templateTitle: "Biology Essentials",
      price: 34.99,
      purchaseDate: new Date(2023, 6, 12),
      paymentMethod: "School Account",
      status: "pending",
      requestedBy: "Current User",
      requestDate: new Date(2023, 6, 10),
      notes: "Needed for freshman biology curriculum",
      template: {
        id: "template-4",
        title: "Biology Essentials",
        description: "Comprehensive biology curriculum with interactive elements",
        createdAt: new Date(2023, 5, 15),
        updatedAt: new Date(2023, 5, 30),
        designerId: "designer-4",
        designerName: "Dr. Charles Darwin",
        organizationId: "org-3",
        color: "bg-green-500",
        educationLevels: ["high", "middle"],
        subjects: ["biology", "science"],
        pricing: {
          type: "paid",
          price: 34.99,
        },
        status: "published",
        visibility: "public",
        stats: {
          views: 850,
          installs: 195,
          activeInstances: 175,
          schoolsUsing: 30,
        },
        versions: [
          {
            version: "1.0.0",
            releaseDate: new Date(2023, 5, 30),
            changes: ["Initial release"],
          },
        ],
      },
    },
  ])

  // Filter purchases based on search query, status, time, and active tab
  const filteredPurchases = purchases.filter((purchase) => {
    const matchesSearch =
      purchase.templateTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || purchase.status === statusFilter

    let matchesTime = true
    const now = new Date()
    const purchaseDate = new Date(purchase.purchaseDate)

    if (timeFilter === "this_month") {
      matchesTime = purchaseDate.getMonth() === now.getMonth() && purchaseDate.getFullYear() === now.getFullYear()
    } else if (timeFilter === "last_month") {
      const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1
      const lastMonthYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear()
      matchesTime = purchaseDate.getMonth() === lastMonth && purchaseDate.getFullYear() === lastMonthYear
    } else if (timeFilter === "this_year") {
      matchesTime = purchaseDate.getFullYear() === now.getFullYear()
    }

    // Filter by tab
    let matchesTab = true
    if (activeTab === "requested") {
      matchesTab = purchase.requestedBy === "Current User" && purchase.status === "pending"
    } else if (activeTab === "approved") {
      matchesTab = purchase.status === "completed"
    }

    return matchesSearch && matchesStatus && matchesTime && matchesTab
  })

  // Calculate total spent
  const totalSpent = filteredPurchases.reduce((total, purchase) => {
    return purchase.status !== "refunded" ? total + purchase.price : total
  }, 0)

  // Calculate pending requests
  const pendingRequests = purchases.filter(
    (purchase) => purchase.requestedBy === "Current User" && purchase.status === "pending",
  ).length

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Template Purchases</h2>
          <p className="text-muted-foreground">View and manage your curriculum template purchases</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Request Template
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export History
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6" onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="all">All Purchases</TabsTrigger>
          <TabsTrigger value="requested" className="relative">
            My Requests
            {pendingRequests > 0 && (
              <Badge className="ml-2 bg-primary text-primary-foreground">{pendingRequests}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">Approved Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <CardDescription>All time purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">{purchases.length} templates purchased</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Templates</CardTitle>
                <CardDescription>Templates in use</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{purchases.filter((p) => p.status === "completed").length}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((purchases.filter((p) => p.status === "completed").length / purchases.length) * 100)}% of
                  purchases
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Recent Purchase</CardTitle>
                <CardDescription>Last template purchased</CardDescription>
              </CardHeader>
              <CardContent>
                {purchases.length > 0 ? (
                  <>
                    <div className="text-lg font-medium truncate">
                      {purchases.sort((a, b) => b.purchaseDate.getTime() - a.purchaseDate.getTime())[0].templateTitle}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {purchases
                        .sort((a, b) => b.purchaseDate.getTime() - a.purchaseDate.getTime())[0]
                        .purchaseDate.toLocaleDateString()}
                    </p>
                  </>
                ) : (
                  <div className="text-muted-foreground">No purchases yet</div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requested" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                <CardDescription>Awaiting approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingRequests}</div>
                <p className="text-xs text-muted-foreground">
                  {pendingRequests > 0
                    ? `Last requested on ${purchases
                        .filter((p) => p.requestedBy === "Current User" && p.status === "pending")
                        .sort((a, b) => b.requestDate!.getTime() - a.requestDate!.getTime())[0]
                        .requestDate!.toLocaleDateString()}`
                    : "No pending requests"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
                <CardDescription>Request success rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {purchases.filter((p) => p.requestedBy === "Current User").length > 0
                    ? `${Math.round(
                        (purchases.filter((p) => p.requestedBy === "Current User" && p.status === "completed").length /
                          purchases.filter((p) => p.requestedBy === "Current User").length) *
                          100,
                      )}%`
                    : "N/A"}
                </div>
                <p className="text-xs text-muted-foreground">Based on your request history</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="approved" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Available Templates</CardTitle>
                <CardDescription>Ready to use</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{purchases.filter((p) => p.status === "completed").length}</div>
                <p className="text-xs text-muted-foreground">
                  Total value: $
                  {purchases
                    .filter((p) => p.status === "completed")
                    .reduce((total, p) => total + p.price, 0)
                    .toFixed(2)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Most Recent</CardTitle>
                <CardDescription>Latest approved template</CardDescription>
              </CardHeader>
              <CardContent>
                {purchases.filter((p) => p.status === "completed").length > 0 ? (
                  <>
                    <div className="text-lg font-medium truncate">
                      {
                        purchases
                          .filter((p) => p.status === "completed")
                          .sort((a, b) => b.approvedDate!.getTime() - a.approvedDate!.getTime())[0].templateTitle
                      }
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Approved on{" "}
                      {purchases
                        .filter((p) => p.status === "completed")
                        .sort((a, b) => b.approvedDate!.getTime() - a.approvedDate!.getTime())[0]
                        .approvedDate!.toLocaleDateString()}
                    </p>
                  </>
                ) : (
                  <div className="text-muted-foreground">No approved templates yet</div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search purchases..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeFilter} onValueChange={(value) => setTimeFilter(value as any)}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="this_month">This Month</SelectItem>
              <SelectItem value="last_month">Last Month</SelectItem>
              <SelectItem value="this_year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPurchases.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <BookOpen className="h-12 w-12 mb-2 opacity-20" />
                      <div>No purchases found</div>
                      {activeTab === "requested" && (
                        <Button variant="outline" className="mt-4">
                          Request New Template
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPurchases.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-md flex items-center justify-center text-white ${purchase.template.color}`}
                        >
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{purchase.templateTitle}</div>
                          <div className="text-sm text-muted-foreground">ID: {purchase.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>{purchase.purchaseDate.toLocaleDateString()}</div>
                      {purchase.requestDate && (
                        <div className="text-xs text-muted-foreground">
                          Requested: {purchase.requestDate.toLocaleDateString()}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>${purchase.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          purchase.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : purchase.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {purchase.requestedBy ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>
                              {purchase.requestedBy
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{purchase.requestedBy}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {purchase.status === "completed" && (
                          <>
                            <Button variant="outline" size="sm" asChild>
                              <a href={purchase.receiptUrl || "#"}>
                                <FileText className="h-4 w-4 mr-1" />
                                Receipt
                              </a>
                            </Button>
                            <Button size="sm" asChild>
                              <a href={`/template/${purchase.templateId}`}>Use</a>
                            </Button>
                          </>
                        )}
                        {purchase.status === "pending" && (
                          <Button variant="outline" size="sm">
                            Check Status
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
