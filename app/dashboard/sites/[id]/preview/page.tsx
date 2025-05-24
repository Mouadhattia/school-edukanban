"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, BookOpen, Eye, Layers, RefreshCw, Smartphone, Tablet } from "lucide-react"

interface Site {
  _id: string
  name: string
  domain: string
  customDomain?: string | null
  status: "Draft" | "Published"
  template: string
  pages: Array<{
    id: string
    name: string
    slug: string
    isHomePage: boolean
  }>
  settings: {
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
  createdAt: string
  updatedAt: string
}

export default function SitePreviewPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [site, setSite] = useState<Site | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeView, setActiveView] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [currentPage, setCurrentPage] = useState("home")
  const [previewError, setPreviewError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  // Fetch site data from the database
  useEffect(() => {
    const fetchSite = async () => {
      try {
        setLoading(true)
        setPreviewError(null)

        const response = await fetch(`/api/sites/${params.id}`)

        if (!response.ok) {
          if (response.status === 404) {
            setPreviewError("Site not found. Please check the site ID and try again.")
          } else if (response.status === 401) {
            setPreviewError("You don't have permission to view this site.")
          } else {
            setPreviewError("Failed to load site data. Please try again later.")
          }
          setLoading(false)
          return
        }

        const siteData = await response.json()
        setSite(siteData)

        // Set the current page to the home page if it exists
        const homePage = siteData.pages?.find((page: any) => page.isHomePage)
        if (homePage) {
          setCurrentPage(homePage.slug)
        } else if (siteData.pages?.length > 0) {
          setCurrentPage(siteData.pages[0].slug)
        } else {
          setCurrentPage("home")
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching site:", error)
        setPreviewError("Failed to load site data. Please try again later.")
        setLoading(false)
      }
    }

    if (params.id) {
      fetchSite()
    }
  }, [params.id])

  // Function to refresh the preview
  const refreshPreview = () => {
    setRefreshKey((prev) => prev + 1)
    setPreviewError(null)
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading preview...</p>
        </div>
      </div>
    )
  }

  if (!site) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Site Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The site you're looking for doesn't exist or you don't have access to it.
          </p>
          <Button asChild>
            <Link href="/dashboard/sites">Back to Sites</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Get available pages from the site data
  const availablePages = site.pages || [
    { id: "home", name: "Home", slug: "home", isHomePage: true },
    { id: "about", name: "About", slug: "about", isHomePage: false },
    { id: "academics", name: "Academics", slug: "academics", isHomePage: false },
    { id: "contact", name: "Contact", slug: "contact", isHomePage: false },
  ]

  const getViewportWidth = () => {
    switch (activeView) {
      case "mobile":
        return "375px"
      case "tablet":
        return "768px"
      default:
        return "100%"
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b bg-background px-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <span className="font-semibold">EduSite</span>
          </Link>
          <div className="h-6 w-px bg-border" />
          <Link
            href={`/dashboard/sites/${params.id}/editor`}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to editor
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/sites/${params.id}/editor`}>
              <Eye className="mr-2 h-4 w-4" />
              Edit Site
            </Link>
          </Button>
          <Button size="sm" asChild>
            <a href={`/preview/${params.id}/home`} target="_blank" rel="noopener noreferrer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Open in New Tab
            </a>
          </Button>
        </div>
      </header>

      {/* Preview Controls */}
      <div className="border-b p-4 bg-background">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">{site.name} Preview</h1>
            <p className="text-sm text-muted-foreground">Previewing how your site will look to visitors</p>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  site.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {site.status}
              </span>
              <span className="text-xs text-muted-foreground">{site.customDomain || site.domain}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={currentPage} onValueChange={setCurrentPage} className="w-auto">
              <TabsList className="grid grid-cols-4">
                {availablePages.slice(0, 4).map((page) => (
                  <TabsTrigger key={page.id} value={page.slug} className="capitalize text-xs">
                    {page.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="flex items-center border rounded-md p-1 ml-2">
              <Button
                variant={activeView === "desktop" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveView("desktop")}
                className="h-8 w-8 p-0"
              >
                <Layers className="h-4 w-4" />
                <span className="sr-only">Desktop view</span>
              </Button>
              <Button
                variant={activeView === "tablet" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveView("tablet")}
                className="h-8 w-8 p-0"
              >
                <Tablet className="h-4 w-4" />
                <span className="sr-only">Tablet view</span>
              </Button>
              <Button
                variant={activeView === "mobile" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveView("mobile")}
                className="h-8 w-8 p-0"
              >
                <Smartphone className="h-4 w-4" />
                <span className="sr-only">Mobile view</span>
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshPreview}
              className="h-8 w-8 p-0 ml-1"
              title="Refresh preview"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Refresh preview</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto bg-muted p-4">
        {previewError ? (
          <Alert variant="destructive" className="mb-4 mx-auto max-w-3xl">
            <AlertDescription className="flex flex-col gap-4">
              <p>{previewError}</p>
              <Button onClick={refreshPreview} variant="outline" className="w-fit">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Preview
              </Button>
            </AlertDescription>
          </Alert>
        ) : (
          <div
            className="mx-auto bg-background shadow-lg rounded-lg overflow-hidden transition-all duration-300"
            style={{ maxWidth: getViewportWidth() }}
          >
            <iframe
              key={`preview-${refreshKey}-${currentPage}-${activeView}`}
              src={`/preview/${params.id}/${currentPage}`}
              className="w-full border-none"
              style={{ height: "80vh", minHeight: "600px" }}
              title={`${site.name} - ${currentPage} preview`}
              sandbox="allow-same-origin allow-scripts allow-forms"
            />
          </div>
        )}
      </div>
    </div>
  )
}
