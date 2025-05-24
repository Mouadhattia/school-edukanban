"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DesignPreviewProps {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  fonts: {
    heading: string
    body: string
  }
}

export function DesignPreview({ colors, fonts }: DesignPreviewProps) {
  const [mounted, setMounted] = useState(false)

  // This is needed to prevent hydration errors with custom fonts
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div
          className="p-4"
          style={{
            backgroundColor: colors.background,
            color: colors.text,
            fontFamily: fonts.body,
          }}
        >
          <div className="mb-4 p-4 rounded" style={{ backgroundColor: colors.primary }}>
            <h2 className="text-xl font-bold mb-2" style={{ color: "#fff", fontFamily: fonts.heading }}>
              Header Example
            </h2>
            <p style={{ color: "#fff" }}>This shows how your header might look with these colors.</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2" style={{ color: colors.primary, fontFamily: fonts.heading }}>
              Main Heading
            </h3>
            <p className="mb-2">
              This is an example of body text using your selected font. The quick brown fox jumps over the lazy dog.
            </p>
            <Button
              className="mr-2"
              style={{
                backgroundColor: colors.primary,
                color: "#fff",
              }}
            >
              Primary Button
            </Button>
            <Button
              variant="outline"
              style={{
                borderColor: colors.secondary,
                color: colors.secondary,
              }}
            >
              Secondary Button
            </Button>
          </div>

          <div className="p-3 rounded mb-4" style={{ backgroundColor: colors.secondary, color: "#fff" }}>
            <h4 className="font-medium mb-1" style={{ fontFamily: fonts.heading }}>
              Secondary Section
            </h4>
            <p className="text-sm">This shows how a secondary section might appear.</p>
          </div>

          <div className="p-3 rounded" style={{ backgroundColor: colors.accent, color: "#fff" }}>
            <h4 className="font-medium mb-1" style={{ fontFamily: fonts.heading }}>
              Accent Section
            </h4>
            <p className="text-sm">This shows how an accent section might appear.</p>
          </div>
        </div>
      </Card>

      <div className="text-xs text-muted-foreground">
        <p>This is a preview of how your design choices might look on your website.</p>
        <p>The actual appearance may vary depending on the components you use.</p>
      </div>
    </div>
  )
}
