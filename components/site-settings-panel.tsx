"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ColorPalettePicker } from "./color-palette-picker"
import { FontStylePicker } from "./font-style-picker"
import { Palette, Type, Settings2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface SiteSettings {
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
  logo?: string
  favicon?: string
  socialLinks?: {
    facebook?: string
    twitter?: string
    instagram?: string
    youtube?: string
    linkedin?: string
  }
  analytics?: {
    googleAnalyticsId?: string
  }
  seo?: {
    title: string
    description: string
    keywords: string[]
  }
}

interface SiteSettingsPanelProps {
  siteId: string
  settings: SiteSettings
  onUpdate: (settings: SiteSettings) => void
  onClose?: () => void
}

export function SiteSettingsPanel({ siteId, settings, onUpdate, onClose }: SiteSettingsPanelProps) {
  const [activeTab, setActiveTab] = useState("design")
  const [isSaving, setIsSaving] = useState(false)
  const [currentSettings, setCurrentSettings] = useState<SiteSettings>(settings)

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // In a real implementation, this would save to the database
      await new Promise((resolve) => setTimeout(resolve, 1000))
      onUpdate(currentSettings)
      toast({
        title: "Settings saved",
        description: "Your site settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const updateColors = (colors: SiteSettings["colors"]) => {
    setCurrentSettings({
      ...currentSettings,
      colors,
    })
  }

  const updateFonts = (fonts: SiteSettings["fonts"]) => {
    setCurrentSettings({
      ...currentSettings,
      fonts,
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Site Settings</CardTitle>
        <CardDescription>Customize the appearance and behavior of your site</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="design" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>Design</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              <span>Content</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              <span>Advanced</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="design" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Colors & Typography</h3>
              <div className="space-y-6">
                <ColorPalettePicker value={currentSettings.colors} onChange={updateColors} />
                <Separator />
                <FontStylePicker value={currentSettings.fonts} onChange={updateFonts} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Site Information</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Content settings will be available in a future update.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Advanced Settings</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Advanced settings will be available in a future update.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
