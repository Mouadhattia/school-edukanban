import { saveSite } from "@/lib/save-site"
import { toast } from "@/components/ui/use-toast"

export async function handleSave(
  siteId: string,
  pagesContent: Record<string, any[]>,
  pageTitle: string,
  pageSections: any[],
  setIsSaving: (isSaving: boolean) => void,
  setShowSaveDialog: (show: boolean) => void,
) {
  setIsSaving(true)

  try {
    const result = await saveSite(siteId, {
      pages: pagesContent,
      pageTitle,
      pageSections,
    })

    if (result.success) {
      setShowSaveDialog(true)
      toast({
        title: "Site saved",
        description: "Your changes have been saved successfully.",
      })
    } else {
      toast({
        title: "Error saving site",
        description: result.message,
        variant: "destructive",
      })
    }
  } catch (error) {
    console.error("Error saving site:", error)
    toast({
      title: "Error saving site",
      description: "An unexpected error occurred while saving your site.",
      variant: "destructive",
    })
  } finally {
    setIsSaving(false)
  }
}
