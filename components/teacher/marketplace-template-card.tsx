"use client"

import { useState } from "react"
import { Download, Eye, Star, ShoppingCart, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Template, UserRole } from "@/lib/types"

interface MarketplaceTemplateCardProps {
  template: Template
  userRole: UserRole
  schoolId: string
  isPurchased?: boolean
  onPurchase?: (template: Template) => void
}

export function MarketplaceTemplateCard({
  template,
  userRole,
  schoolId,
  isPurchased = false,
  onPurchase,
}: MarketplaceTemplateCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isUseTemplateOpen, setIsUseTemplateOpen] = useState(false)

  // Format pricing display
  const getPricingDisplay = () => {
    if (template.pricing.type === "free") {
      return "Free"
    } else if (template.pricing.type === "trial") {
      return "Free Trial"
    } else {
      return `$${template.pricing.price?.toFixed(2)}`
    }
  }

  // Check if user can use this template
  const canUseTemplate =
    userRole === "teacher" ||
    userRole === "admin" ||
    (template.restrictedToSchools && template.restrictedToSchools.includes(schoolId))

  return (
    <>
      <Card className="overflow-hidden flex flex-col h-full">
        <div className={`h-2 ${template.color}`} />
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{template.title}</CardTitle>
            <Badge
              variant="outline"
              className={`${isPurchased ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
            >
              {isPurchased ? "Purchased" : getPricingDisplay()}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2 mt-1">{template.description}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow">
          <div className="aspect-video rounded-md border overflow-hidden mb-3">
            <img
              src={template.previewImage || "/placeholder.svg?height=150&width=300"}
              alt={template.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {template.educationLevels.map((level) => (
              <Badge key={level} variant="outline" className="bg-blue-100 text-blue-800 capitalize">
                {level}
              </Badge>
            ))}
            {template.subjects.slice(0, 2).map((subject) => (
              <Badge key={subject} variant="outline" className="bg-purple-100 text-purple-800 capitalize">
                {subject}
              </Badge>
            ))}
            {template.subjects.length > 2 && (
              <Badge variant="outline" className="bg-purple-100 text-purple-800">
                +{template.subjects.length - 2}
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Download className="h-4 w-4 mr-1" />
              <span>{template.stats.installs} installs</span>
            </div>
            {template.stats.rating && (
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                <span>{template.stats.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between border-t mt-auto">
          <Button variant="outline" size="sm" onClick={() => setIsPreviewOpen(true)}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          {isPurchased ? (
            <Button size="sm" onClick={() => setIsUseTemplateOpen(true)}>
              <Check className="h-4 w-4 mr-2" />
              Use Template
            </Button>
          ) : template.pricing.type === "free" || template.pricing.type === "trial" ? (
            <Button size="sm" onClick={() => setIsUseTemplateOpen(true)}>
              Use Template
            </Button>
          ) : (
            <Button size="sm" onClick={() => onPurchase && onPurchase(template)}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Purchase
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{template.title}</DialogTitle>
            <DialogDescription>{template.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="aspect-video rounded-md border overflow-hidden">
              <img
                src={template.previewImage || "/placeholder.svg?height=300&width=600"}
                alt={template.title}
                className="w-full h-full object-cover"
              />
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
              <h3 className="font-medium mb-2">Pricing</h3>
              <p>{getPricingDisplay()}</p>
              {template.pricing.type === "trial" && (
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                  <li>{template.pricing.trialPeriod} day trial</li>
                  <li>Up to {template.pricing.trialInstances} boards</li>
                  <li>Max {template.pricing.maxStudents} students</li>
                </ul>
              )}
              {template.pricing.type === "paid" && (
                <ul className="list-disc list-inside text-sm text-muted-foreground mt-1">
                  <li>One-time purchase</li>
                  <li>Unlimited boards</li>
                  <li>Unlimited students</li>
                  <li>Free updates</li>
                </ul>
              )}
            </div>
            <div>
              <h3 className="font-medium mb-2">Template Contents</h3>
              <p className="text-sm text-muted-foreground">
                This template includes pre-configured columns, sample tasks, and educational workflows designed for{" "}
                {template.subjects.join(", ")} curriculum.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Close
            </Button>
            {isPurchased ? (
              <Button
                onClick={() => {
                  setIsPreviewOpen(false)
                  setIsUseTemplateOpen(true)
                }}
              >
                Use Template
              </Button>
            ) : template.pricing.type === "free" || template.pricing.type === "trial" ? (
              <Button
                onClick={() => {
                  setIsPreviewOpen(false)
                  setIsUseTemplateOpen(true)
                }}
              >
                Use Template
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setIsPreviewOpen(false)
                  onPurchase && onPurchase(template)
                }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Purchase
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Use Template Dialog */}
      <Dialog open={isUseTemplateOpen} onOpenChange={setIsUseTemplateOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Use Template</DialogTitle>
            <DialogDescription>Create a new board based on this template</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-md">
              <h3 className="font-medium">{template.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
              <div className="flex items-center mt-2">
                <Badge
                  variant="outline"
                  className={isPurchased ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                >
                  {isPurchased ? "Purchased" : getPricingDisplay()}
                </Badge>
              </div>
            </div>
            {template.pricing.type === "paid" && !isPurchased && (
              <div className="border-l-4 border-yellow-500 pl-4 py-2 bg-yellow-50 rounded-r-md">
                <p className="text-sm font-medium">This is a paid template</p>
                <p className="text-sm text-muted-foreground">
                  Your school will be charged ${template.pricing.price?.toFixed(2)} for using this template.
                </p>
              </div>
            )}
            {template.pricing.type === "trial" && (
              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-md">
                <p className="text-sm font-medium">Free Trial</p>
                <p className="text-sm text-muted-foreground">
                  You can try this template for {template.pricing.trialPeriod} days with up to{" "}
                  {template.pricing.maxStudents} students.
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUseTemplateOpen(false)}>
              Cancel
            </Button>
            <Button>Create Board from Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
