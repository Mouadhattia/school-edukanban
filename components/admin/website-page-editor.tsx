"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Save,
  Eye,
  Layout,
  Image,
  Type,
  FileText,
  Grid,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Settings,
} from "lucide-react"
import Link from "next/link"

interface WebsitePageEditorProps {
  pageId: string
}

export function WebsitePageEditor({ pageId }: WebsitePageEditorProps) {
  const [activeTab, setActiveTab] = useState("editor")
  const [previewMode, setPreviewMode] = useState(false)

  // Mock data for a website page
  const page = {
    id: pageId,
    title:
      pageId === "home"
        ? "Home"
        : pageId === "about"
          ? "About Us"
          : pageId === "academics"
            ? "Academics"
            : pageId === "admissions"
              ? "Admissions"
              : pageId === "faculty"
                ? "Faculty & Staff"
                : pageId === "news"
                  ? "News & Events"
                  : pageId === "contact"
                    ? "Contact"
                    : "Custom Page",
    slug: pageId,
    metaTitle: "",
    metaDescription: "",
    isPublished: true,
    lastUpdated: "2023-09-15T14:30:00Z",
    sections: [
      {
        id: "section-1",
        type: "hero",
        title: "Welcome to Our School",
        subtitle: "Empowering students to achieve academic excellence",
        backgroundImage: "/placeholder.svg?height=400&width=1200",
        ctaText: "Apply Now",
        ctaLink: "/admissions",
      },
      {
        id: "section-2",
        type: "text",
        title: "Our Mission",
        content:
          "Our mission is to provide a nurturing environment where students can develop their intellectual, social, and creative abilities. We strive to inspire a lifelong love of learning and to prepare our students for success in college and beyond.",
      },
      {
        id: "section-3",
        type: "image-text",
        title: "Academic Excellence",
        content:
          "Our rigorous curriculum is designed to challenge students and prepare them for success in college and beyond. Our dedicated faculty members are experts in their fields and committed to helping each student reach their full potential.",
        image: "/placeholder.svg?height=300&width=400",
        imagePosition: "right",
      },
      {
        id: "section-4",
        type: "gallery",
        title: "Campus Life",
        images: [
          "/placeholder.svg?height=200&width=300",
          "/placeholder.svg?height=200&width=300",
          "/placeholder.svg?height=200&width=300",
          "/placeholder.svg?height=200&width=300",
        ],
      },
    ],
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center space-x-2">
        <Link href="/admin/website">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Edit Page: {page.title}</h2>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <FileText className="h-4 w-4" />
          <span>/{page.slug}</span>
          <span>•</span>
          <span>Last updated: {new Date(page.lastUpdated).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="mr-2 h-4 w-4" />
            {previewMode ? "Exit Preview" : "Preview"}
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {previewMode ? (
        <PagePreview page={page} />
      ) : (
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="editor">Page Editor</TabsTrigger>
            <TabsTrigger value="settings">Page Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Page Content</CardTitle>
                <CardDescription>Add and arrange content sections for this page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {page.sections.map((section, index) => (
                  <div key={section.id} className="rounded-lg border p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {section.type === "hero" && <Layout className="h-5 w-5 text-muted-foreground" />}
                        {section.type === "text" && <Type className="h-5 w-5 text-muted-foreground" />}
                        {section.type === "image-text" && <Image className="h-5 w-5 text-muted-foreground" />}
                        {section.type === "gallery" && <Grid className="h-5 w-5 text-muted-foreground" />}
                        <h3 className="font-medium capitalize">{section.type} Section</h3>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" disabled={index === 0}>
                          <MoveUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" disabled={index === page.sections.length - 1}>
                          <MoveDown className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {section.type === "hero" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`${section.id}-title`}>Title</Label>
                          <Input id={`${section.id}-title`} defaultValue={section.title} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`${section.id}-subtitle`}>Subtitle</Label>
                          <Input id={`${section.id}-subtitle`} defaultValue={section.subtitle} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`${section.id}-cta-text`}>Button Text</Label>
                          <Input id={`${section.id}-cta-text`} defaultValue={section.ctaText} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`${section.id}-cta-link`}>Button Link</Label>
                          <Input id={`${section.id}-cta-link`} defaultValue={section.ctaLink} />
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label htmlFor={`${section.id}-bg-image`}>Background Image</Label>
                          <div className="flex items-center space-x-2">
                            <Input id={`${section.id}-bg-image`} defaultValue={section.backgroundImage} />
                            <Button variant="outline">Upload</Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {section.type === "text" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`${section.id}-title`}>Title</Label>
                          <Input id={`${section.id}-title`} defaultValue={section.title} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`${section.id}-content`}>Content</Label>
                          <Textarea id={`${section.id}-content`} defaultValue={section.content} rows={6} />
                        </div>
                      </div>
                    )}

                    {section.type === "image-text" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`${section.id}-title`}>Title</Label>
                            <Input id={`${section.id}-title`} defaultValue={section.title} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`${section.id}-image-position`}>Image Position</Label>
                            <select
                              id={`${section.id}-image-position`}
                              defaultValue={section.imagePosition}
                              className="w-full rounded-md border border-input bg-background px-3 py-2"
                            >
                              <option value="left">Left</option>
                              <option value="right">Right</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`${section.id}-content`}>Content</Label>
                          <Textarea id={`${section.id}-content`} defaultValue={section.content} rows={4} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`${section.id}-image`}>Image</Label>
                          <div className="flex items-center space-x-2">
                            <Input id={`${section.id}-image`} defaultValue={section.image} />
                            <Button variant="outline">Upload</Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {section.type === "gallery" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`${section.id}-title`}>Title</Label>
                          <Input id={`${section.id}-title`} defaultValue={section.title} />
                        </div>
                        <div className="space-y-2">
                          <Label>Images</Label>
                          <div className="grid grid-cols-4 gap-4">
                            {section.images.map((image, i) => (
                              <div key={i} className="relative">
                                <img
                                  src={image || "/placeholder.svg"}
                                  alt={`Gallery image ${i + 1}`}
                                  className="h-24 w-full rounded-md object-cover"
                                />
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                            <Button variant="outline" className="h-24 w-full flex flex-col items-center justify-center">
                              <Plus className="h-6 w-6 mb-1" />
                              <span>Add Image</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex justify-center">
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Section
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Page Settings</CardTitle>
                <CardDescription>Configure settings for this page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pageTitle">Page Title</Label>
                    <Input id="pageTitle" defaultValue={page.title} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pageSlug">Page URL</Label>
                    <div className="flex items-center space-x-2">
                      <span>/</span>
                      <Input id="pageSlug" defaultValue={page.slug} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input id="metaTitle" defaultValue={page.metaTitle || page.title} />
                  <p className="text-xs text-muted-foreground">
                    The title that appears in search engine results (recommended: 50-60 characters)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea id="metaDescription" defaultValue={page.metaDescription} rows={3} />
                  <p className="text-xs text-muted-foreground">
                    A brief description of the page for search engine results (recommended: 150-160 characters)
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

interface PagePreviewProps {
  page: any
}

function PagePreview({ page }: PagePreviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Preview</CardTitle>
        <CardDescription>Preview how this page will appear on your website</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-lg border shadow-sm">
          <div className="bg-background p-2 border-b flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs font-mono text-muted-foreground">example-school.edukanban.com/{page.slug}</span>
            </div>
            <div className="w-16" />
          </div>
          <div className="h-[600px] overflow-auto">
            <div className="bg-background">
              {/* Header (just for preview) */}
              <header className="border-b p-4 flex items-center justify-between bg-primary text-white">
                <div className="flex items-center space-x-2">
                  <img
                    src="/placeholder.svg?height=100&width=100"
                    alt="School Logo"
                    className="h-10 w-10 rounded-md bg-white object-contain p-1"
                  />
                  <h1 className="text-xl font-bold">Example School</h1>
                </div>
                <nav className="hidden md:block">
                  <ul className="flex space-x-6">
                    <li className={page.slug === "home" ? "font-bold" : ""}>Home</li>
                    <li className={page.slug === "about" ? "font-bold" : ""}>About</li>
                    <li className={page.slug === "academics" ? "font-bold" : ""}>Academics</li>
                    <li className={page.slug === "admissions" ? "font-bold" : ""}>Admissions</li>
                    <li className={page.slug === "faculty" ? "font-bold" : ""}>Faculty</li>
                    <li className={page.slug === "news" ? "font-bold" : ""}>News</li>
                    <li className={page.slug === "contact" ? "font-bold" : ""}>Contact</li>
                  </ul>
                </nav>
                <button className="md:hidden">
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
                  >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                </button>
              </header>

              {/* Page Content */}
              <div>
                {page.sections.map((section) => {
                  if (section.type === "hero") {
                    return (
                      <section key={section.id} className="relative h-80 bg-gray-200 flex items-center justify-center">
                        <img
                          src={section.backgroundImage || "/placeholder.svg"}
                          alt="Hero background"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="relative z-10 text-center text-white p-6">
                          <h2 className="text-4xl font-bold mb-4">{section.title}</h2>
                          <p className="text-xl mb-6">{section.subtitle}</p>
                          <button className="px-6 py-3 rounded-md font-medium bg-secondary">{section.ctaText}</button>
                        </div>
                      </section>
                    )
                  }

                  if (section.type === "text") {
                    return (
                      <section key={section.id} className="py-12 px-6">
                        <div className="max-w-4xl mx-auto">
                          <h2 className="text-3xl font-bold text-center mb-6">{section.title}</h2>
                          <div className="prose max-w-none">
                            <p>{section.content}</p>
                          </div>
                        </div>
                      </section>
                    )
                  }

                  if (section.type === "image-text") {
                    return (
                      <section key={section.id} className="py-12 px-6 bg-gray-50">
                        <div className="max-w-4xl mx-auto">
                          <h2 className="text-3xl font-bold text-center mb-8">{section.title}</h2>
                          <div
                            className={`flex flex-col ${section.imagePosition === "right" ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
                          >
                            <div className="flex-1">
                              <img
                                src={section.image || "/placeholder.svg"}
                                alt={section.title}
                                className="rounded-lg w-full h-auto shadow-md"
                              />
                            </div>
                            <div className="flex-1">
                              <p>{section.content}</p>
                            </div>
                          </div>
                        </div>
                      </section>
                    )
                  }

                  if (section.type === "gallery") {
                    return (
                      <section key={section.id} className="py-12 px-6">
                        <div className="max-w-4xl mx-auto">
                          <h2 className="text-3xl font-bold text-center mb-8">{section.title}</h2>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {section.images.map((image, i) => (
                              <img
                                key={i}
                                src={image || "/placeholder.svg"}
                                alt={`Gallery image ${i + 1}`}
                                className="rounded-lg w-full h-48 object-cover shadow-sm hover:shadow-md transition-shadow"
                              />
                            ))}
                          </div>
                        </div>
                      </section>
                    )
                  }

                  return null
                })}
              </div>

              {/* Footer (just for preview) */}
              <footer className="bg-gray-800 text-white py-8 px-6">
                <div className="text-center">
                  <p>&copy; 2023 Example School. All rights reserved.</p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
