"use client"

import { useState } from "react"
import { Clock, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface TemplateRequest {
  id: string
  templateId: string
  templateTitle: string
  templateDescription: string
  templateImage: string
  templateColor: string
  price: number | null
  pricingType: "free" | "paid" | "trial"
  requestDate: Date
  reason: string
  status: "pending" | "approved" | "rejected"
  adminFeedback?: string
}

export function TemplateRequests() {
  const [requests, setRequests] = useState<TemplateRequest[]>([
    {
      id: "req-1",
      templateId: "template-1",
      templateTitle: "Science Curriculum for 5th Grade",
      templateDescription:
        "A comprehensive science curriculum covering earth science, biology, and basic physics concepts for 5th grade students",
      templateImage: "/placeholder.svg?height=150&width=300",
      templateColor: "bg-green-500",
      price: null,
      pricingType: "free",
      requestDate: new Date("2025-03-15"),
      reason: "I need this template for my upcoming science unit on ecosystems.",
      status: "pending",
    },
    {
      id: "req-2",
      templateId: "template-2",
      templateTitle: "High School Chemistry Lab",
      templateDescription: "Template for organizing and tracking high school chemistry lab experiments and reports",
      templateImage: "/placeholder.svg?height=150&width=300",
      templateColor: "bg-blue-500",
      price: 29.99,
      pricingType: "paid",
      requestDate: new Date("2025-03-10"),
      reason: "This template would help me organize the lab experiments for my chemistry class.",
      status: "approved",
    },
    {
      id: "req-3",
      templateId: "template-3",
      templateTitle: "Middle School Math Project Tracker",
      templateDescription: "Template for tracking and organizing math projects for middle school students",
      templateImage: "/placeholder.svg?height=150&width=300",
      templateColor: "bg-purple-500",
      price: null,
      pricingType: "trial",
      requestDate: new Date("2025-03-05"),
      reason:
        "I want to try this template for my algebra unit to see if it helps students track their project progress.",
      status: "rejected",
      adminFeedback: "We already have a similar template available. Please check the 'Algebra Fundamentals' template.",
    },
  ])

  const [selectedRequest, setSelectedRequest] = useState<TemplateRequest | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const handleViewDetails = (request: TemplateRequest) => {
    setSelectedRequest(request)
    setIsDetailsOpen(true)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending Approval"
      case "approved":
        return "Approved"
      case "rejected":
        return "Rejected"
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Template Requests</h2>
        <p className="text-muted-foreground">Track the status of your template requests</p>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {requests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <div className="text-muted-foreground">You haven't made any template requests yet</div>
                <Button className="mt-4">Browse Templates</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {requests.map((request) => (
                <Card key={request.id} className="overflow-hidden flex flex-col h-full">
                  <div className={`h-2 ${request.templateColor}`} />
                  <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{request.templateTitle}</CardTitle>
                      <Badge variant="outline" className={getStatusColor(request.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(request.status)}
                          {getStatusText(request.status)}
                        </span>
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2 mt-1">{request.templateDescription}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 flex-grow">
                    <div className="aspect-video rounded-md border overflow-hidden mb-3">
                      <img
                        src={request.templateImage || "/placeholder.svg"}
                        alt={request.templateTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        {request.pricingType === "free"
                          ? "Free"
                          : request.pricingType === "trial"
                            ? "Free Trial"
                            : `$${request.price?.toFixed(2)}`}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Requested on {request.requestDate.toLocaleDateString()}
                      </span>
                    </div>
                    {request.status === "rejected" && request.adminFeedback && (
                      <div className="border-l-4 border-red-500 pl-3 py-2 mt-2 bg-red-50 text-sm">
                        <p className="font-medium">Feedback from administrator:</p>
                        <p className="text-muted-foreground">{request.adminFeedback}</p>
                      </div>
                    )}
                  </CardContent>
                  <div className="p-4 pt-0 border-t mt-auto">
                    <Button variant="outline" className="w-full" onClick={() => handleViewDetails(request)}>
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests
              .filter((r) => r.status === "pending")
              .map((request) => (
                <Card key={request.id} className="overflow-hidden flex flex-col h-full">
                  {/* Same card content as above */}
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests
              .filter((r) => r.status === "approved")
              .map((request) => (
                <Card key={request.id} className="overflow-hidden flex flex-col h-full">
                  {/* Same card content as above */}
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests
              .filter((r) => r.status === "rejected")
              .map((request) => (
                <Card key={request.id} className="overflow-hidden flex flex-col h-full">
                  {/* Same card content as above */}
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Request Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Template Request Details</DialogTitle>
            <DialogDescription>Details of your template request and its current status</DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/3">
                  <div className="aspect-video rounded-md border overflow-hidden">
                    <img
                      src={selectedRequest.templateImage || "/placeholder.svg"}
                      alt={selectedRequest.templateTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-2/3">
                  <h3 className="font-medium">{selectedRequest.templateTitle}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{selectedRequest.templateDescription}</p>
                  <div className="flex items-center mt-2 gap-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      {selectedRequest.pricingType === "free"
                        ? "Free"
                        : selectedRequest.pricingType === "trial"
                          ? "Free Trial"
                          : `$${selectedRequest.price?.toFixed(2)}`}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(selectedRequest.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(selectedRequest.status)}
                        {getStatusText(selectedRequest.status)}
                      </span>
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Your Request</h4>
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm">{selectedRequest.reason}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  Submitted on {selectedRequest.requestDate.toLocaleDateString()}
                </div>
              </div>

              {selectedRequest.status === "rejected" && selectedRequest.adminFeedback && (
                <div className="space-y-2">
                  <h4 className="font-medium">Administrator Feedback</h4>
                  <div className="border-l-4 border-red-500 pl-3 py-2 bg-red-50">
                    <p className="text-sm">{selectedRequest.adminFeedback}</p>
                  </div>
                </div>
              )}

              {selectedRequest.status === "approved" && (
                <div className="space-y-2">
                  <h4 className="font-medium">Next Steps</h4>
                  <div className="border-l-4 border-green-500 pl-3 py-2 bg-green-50">
                    <p className="text-sm">
                      This template has been approved and is now available for you to use. You can find it in your
                      templates library.
                    </p>
                  </div>
                </div>
              )}

              {selectedRequest.status === "pending" && (
                <div className="space-y-2">
                  <h4 className="font-medium">Status</h4>
                  <div className="border-l-4 border-yellow-500 pl-3 py-2 bg-yellow-50">
                    <p className="text-sm">
                      Your request is currently being reviewed by an administrator. You will be notified when a decision
                      is made.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
