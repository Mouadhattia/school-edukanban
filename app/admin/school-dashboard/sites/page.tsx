import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Globe, MoreHorizontal, Pencil, Plus, Trash } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function SitesPage() {
  const sites = [
    {
      id: "1",
      name: "Lincoln High School",
      domain: "lincoln.edusite.com",
      status: "published",
      lastUpdated: "2 days ago",
      image: "/high-school-website-template.png",
    },
    {
      id: "2",
      name: "Washington Elementary",
      domain: "washington.edusite.com",
      status: "published",
      lastUpdated: "5 days ago",
      image: "/elementary-school-website.png",
    },
    {
      id: "3",
      name: "Jefferson Middle School",
      domain: "jefferson.edusite.com",
      status: "draft",
      lastUpdated: "1 week ago",
      image: "/middle-school-website-template.png",
    },
  ]

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Sites</h2>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/sites/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Site
            </Button>
          </Link>
        </div>
      </div>
      <Tabs defaultValue="all" className="space-y-4 mt-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Sites</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
          <div className="relative w-[200px]">
            <Input placeholder="Search sites..." className="pl-8" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sites.map((site) => (
              <Card key={site.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={site.image || "/placeholder.svg"}
                    alt={site.name}
                    className="h-full w-full object-cover transition-all hover:scale-105"
                  />
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{site.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Globe className="mr-1 h-3 w-3" />
                        {site.domain}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span
                      className={`mr-2 h-2 w-2 rounded-full ${site.status === "published" ? "bg-green-500" : "bg-yellow-500"}`}
                    ></span>
                    <span className="capitalize">{site.status}</span>
                    <span className="mx-2">•</span>
                    <span>Updated {site.lastUpdated}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Link href={`/dashboard/sites/${site.id}/editor`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/preview/${site.id}/home`} className="flex-1">
                    <Button size="sm" className="w-full">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="published" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sites
              .filter((site) => site.status === "published")
              .map((site) => (
                <Card key={site.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={site.image || "/placeholder.svg"}
                      alt={site.name}
                      className="h-full w-full object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{site.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Globe className="mr-1 h-3 w-3" />
                          {site.domain}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                      <span className="capitalize">{site.status}</span>
                      <span className="mx-2">•</span>
                      <span>Updated {site.lastUpdated}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Link href={`/dashboard/sites/${site.id}/editor`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/preview/${site.id}/home`} className="flex-1">
                      <Button size="sm" className="w-full">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="drafts" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sites
              .filter((site) => site.status === "draft")
              .map((site) => (
                <Card key={site.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={site.image || "/placeholder.svg"}
                      alt={site.name}
                      className="h-full w-full object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{site.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Globe className="mr-1 h-3 w-3" />
                          {site.domain}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></span>
                      <span className="capitalize">{site.status}</span>
                      <span className="mx-2">•</span>
                      <span>Updated {site.lastUpdated}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Link href={`/dashboard/sites/${site.id}/editor`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/preview/${site.id}/home`} className="flex-1">
                      <Button size="sm" className="w-full">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
