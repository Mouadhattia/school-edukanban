"use client"

import { useState } from "react"
import { ArrowLeft, Download, Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { TeacherSidebar } from "@/components/teacher/teacher-sidebar"
import Link from "next/link"
import type { Template } from "@/lib/types"

interface PurchaseReceiptProps {
  purchaseId: string
}

interface Purchase {
  id: string
  templateId: string
  templateTitle: string
  price: number
  purchaseDate: Date
  paymentMethod: string
  status: "completed" | "pending" | "refunded"
  transactionId: string
  billingAddress?: {
    name: string
    school: string
    address: string
    city: string
    state: string
    zip: string
    country: string
  }
  template: Template
}

export function PurchaseReceipt({ purchaseId }: PurchaseReceiptProps) {
  const [copied, setCopied] = useState(false)

  // In a real app, this would fetch the purchase from an API
  const purchase: Purchase = {
    id: purchaseId,
    templateId: "template-1",
    templateTitle: "Physics 101 Curriculum",
    price: 49.99,
    purchaseDate: new Date(),
    paymentMethod: "Credit Card (ending in 4242)",
    status: "completed",
    transactionId: "TRX-" + Math.floor(Math.random() * 1000000),
    billingAddress: {
      name: "Dr. Smith",
      school: "Westview High School",
      address: "123 Education Blvd",
      city: "Springfield",
      state: "IL",
      zip: "62704",
      country: "United States",
    },
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
  }

  const copyToClipboard = () => {
    const receiptText = `
Receipt for ${purchase.templateTitle}
Transaction ID: ${purchase.transactionId}
Date: ${purchase.purchaseDate.toLocaleDateString()}
Amount: $${purchase.price.toFixed(2)}
Payment Method: ${purchase.paymentMethod}
Status: ${purchase.status}
    `
    navigator.clipboard.writeText(receiptText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex min-h-screen">
      <TeacherSidebar />

      <div className="flex-1 p-6">
        <div className="flex items-center mb-6">
          <Link href="/purchases" passHref>
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Purchases
            </Button>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight">Purchase Receipt</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="text-center border-b pb-6">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Thank You for Your Purchase!</CardTitle>
              <CardDescription>Receipt for your template purchase</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">Receipt</h3>
                  <p className="text-sm text-muted-foreground">Transaction ID: {purchase.transactionId}</p>
                  <p className="text-sm text-muted-foreground">Date: {purchase.purchaseDate.toLocaleDateString()}</p>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                </Badge>
              </div>

              <div className="border rounded-md p-4 bg-muted/20">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{purchase.templateTitle}</h3>
                    <p className="text-sm text-muted-foreground">{purchase.template.description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Template Price</span>
                  <span>${purchase.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${purchase.price.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Payment Information</h3>
                <div className="text-sm">
                  <p>
                    <span className="text-muted-foreground">Payment Method:</span> {purchase.paymentMethod}
                  </p>
                </div>
              </div>

              {purchase.billingAddress && (
                <div className="space-y-2">
                  <h3 className="font-medium">Billing Information</h3>
                  <div className="text-sm">
                    <p>{purchase.billingAddress.name}</p>
                    <p>{purchase.billingAddress.school}</p>
                    <p>{purchase.billingAddress.address}</p>
                    <p>
                      {purchase.billingAddress.city}, {purchase.billingAddress.state} {purchase.billingAddress.zip}
                    </p>
                    <p>{purchase.billingAddress.country}</p>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={copyToClipboard}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Receipt
                  </>
                )}
              </Button>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Need help with your purchase? Contact our support team.
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="link" size="sm">
                Contact Support
              </Button>
              <Button variant="link" size="sm">
                FAQs
              </Button>
              <Button variant="link" size="sm">
                Refund Policy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
