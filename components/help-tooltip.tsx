import type React from "react"
import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface HelpTooltipProps {
  content: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
}

export function HelpTooltip({ content, side = "top", align = "center" }: HelpTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <button className="inline-flex items-center justify-center rounded-full h-4 w-4 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            <HelpCircle className="h-3 w-3" />
            <span className="sr-only">Help</span>
          </button>
        </TooltipTrigger>
        <TooltipContent side={side} align={align} className="max-w-xs">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
