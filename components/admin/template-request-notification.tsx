"use client"

import { FileCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface TemplateRequestNotificationProps {
  pendingCount: number
}

export function TemplateRequestNotification({ pendingCount }: TemplateRequestNotificationProps) {
  const router = useRouter()

  if (pendingCount === 0) return null

  return (
    <Card className="border-l-4 border-yellow-500">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <FileCheck className="mr-2 h-5 w-5 text-yellow-500" />
          Template Requests Pending
        </CardTitle>
        <CardDescription>You have template requests from teachers that need your approval</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 mr-2">
            {pendingCount} pending
          </Badge>
          <span className="text-sm text-muted-foreground">
            Teachers are waiting for your approval to use these templates
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => router.push("/admin/template-requests")}>Review Requests</Button>
      </CardFooter>
    </Card>
  )
}
