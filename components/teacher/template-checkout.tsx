"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Check, ArrowLeft, ShieldCheck, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Template } from "@/lib/types"

interface TemplateCheckoutProps {
  template: Template
  onBack: () => void
  onComplete: (template: Template, paymentMethod: string) => void
}

export function TemplateCheckout({ template, onBack, onComplete }: TemplateCheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState<"credit_card" | "purchase_order" | "school_account">("credit_card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvc, setCardCvc] = useState("")
  const [poNumber, setPoNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState<"details" | "payment" | "confirmation">("details")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      onComplete(template, paymentMethod)
    }, 1500)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return value
    }
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }

    return value
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h2 className="text-2xl font-bold">Purchase Template</h2>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Tabs value={currentStep} onValueChange={(value) => setCurrentStep(value as any)} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="details" disabled={currentStep !== "details"}>
                Template Details
              </TabsTrigger>
              <TabsTrigger value="payment" disabled={currentStep !== "payment" && currentStep !== "confirmation"}>
                Payment
              </TabsTrigger>
              <TabsTrigger value="confirmation" disabled={currentStep !== "confirmation"}>
                Confirmation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Template Information</CardTitle>
                  <CardDescription>Review the template details before purchase</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video rounded-md border overflow-hidden">
                    <img
                      src={template.previewImage || "/placeholder.svg?height=300&width=600"}
                      alt={template.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{template.title}</h3>
                    <p className="text-muted-foreground mt-1">{template.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {template.educationLevels.map((level) => (
                      <Badge key={level} variant="outline" className="bg-blue-100 text-blue-800 capitalize">
                        {level} School
                      </Badge>
                    ))}
                    {template.subjects.map((subject) => (
                      <Badge key={subject} variant="outline" className="bg-purple-100 text-purple-800 capitalize">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-medium">What's included:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                      <li>Pre-configured kanban board structure</li>
                      <li>{template.columns?.length || 4} columns for organizing tasks</li>
                      <li>{template.tasks?.length || 8} sample tasks to get started</li>
                      <li>Curriculum-aligned workflow</li>
                      <li>Unlimited usage within your school</li>
                      <li>Free updates and improvements</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => setCurrentStep("payment")} className="ml-auto">
                    Continue to Payment
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose how you want to pay for this template</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <form onSubmit={handleSubmit}>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={(value) => setPaymentMethod(value as any)}
                      className="space-y-4"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="credit_card" id="credit_card" />
                          <Label htmlFor="credit_card" className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Credit Card
                          </Label>
                        </div>

                        {paymentMethod === "credit_card" && (
                          <div className="mt-4 space-y-4 pl-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="card_number">Card Number</Label>
                                <Input
                                  id="card_number"
                                  placeholder="1234 5678 9012 3456"
                                  value={cardNumber}
                                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                  maxLength={19}
                                  required={paymentMethod === "credit_card"}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="card_name">Cardholder Name</Label>
                                <Input
                                  id="card_name"
                                  placeholder="John Smith"
                                  value={cardName}
                                  onChange={(e) => setCardName(e.target.value)}
                                  required={paymentMethod === "credit_card"}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="card_expiry">Expiry Date</Label>
                                <Input
                                  id="card_expiry"
                                  placeholder="MM/YY"
                                  value={cardExpiry}
                                  onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                                  maxLength={5}
                                  required={paymentMethod === "credit_card"}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="card_cvc">CVC</Label>
                                <Input
                                  id="card_cvc"
                                  placeholder="123"
                                  value={cardCvc}
                                  onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, ""))}
                                  maxLength={3}
                                  required={paymentMethod === "credit_card"}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="purchase_order" id="purchase_order" />
                          <Label htmlFor="purchase_order" className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            Purchase Order
                          </Label>
                        </div>

                        {paymentMethod === "purchase_order" && (
                          <div className="mt-4 space-y-4 pl-6">
                            <div className="space-y-2">
                              <Label htmlFor="po_number">Purchase Order Number</Label>
                              <Input
                                id="po_number"
                                placeholder="PO-12345"
                                value={poNumber}
                                onChange={(e) => setPoNumber(e.target.value)}
                                required={paymentMethod === "purchase_order"}
                              />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              An invoice will be sent to your school's billing department. Payment is due within 30
                              days.
                            </p>
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="school_account" id="school_account" />
                          <Label htmlFor="school_account" className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            School Account
                          </Label>
                        </div>

                        {paymentMethod === "school_account" && (
                          <div className="mt-4 space-y-4 pl-6">
                            <p className="text-sm text-muted-foreground">
                              This purchase will be charged to your school's account. Your school administrator will
                              need to approve this purchase.
                            </p>
                          </div>
                        )}
                      </div>
                    </RadioGroup>

                    <div className="flex justify-between mt-8">
                      <Button type="button" variant="outline" onClick={() => setCurrentStep("details")}>
                        Back
                      </Button>
                      <Button type="submit" disabled={isProcessing}>
                        {isProcessing ? "Processing..." : "Complete Purchase"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="confirmation" className="space-y-4">
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Purchase Complete!</CardTitle>
                  <CardDescription>Your template is now available for use</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-md p-4 bg-muted/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{template.title}</h3>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Purchased
                      </Badge>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Receipt</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Template:</span>
                        <span>{template.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price:</span>
                        <span>${template.pricing.price?.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Method:</span>
                        <span>
                          {paymentMethod === "credit_card"
                            ? "Credit Card"
                            : paymentMethod === "purchase_order"
                              ? `Purchase Order (${poNumber})`
                              : "School Account"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transaction ID:</span>
                        <span>TRX-{Math.floor(Math.random() * 1000000)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border p-4 bg-blue-50 text-blue-800">
                    <div className="flex">
                      <ShieldCheck className="h-5 w-5 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Your purchase is protected</p>
                        <p className="text-sm">
                          If you encounter any issues with this template, contact our support team for assistance.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button onClick={onBack}>Return to Marketplace</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Template Price</span>
                <span>${template.pricing.price?.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${template.pricing.price?.toFixed(2)}</span>
              </div>

              <div className="pt-4">
                <h4 className="font-medium mb-2">License Details</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                    <span>School-wide license</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                    <span>Unlimited boards</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                    <span>Unlimited students</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                    <span>Free updates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-600 mt-0.5" />
                    <span>Email support</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
