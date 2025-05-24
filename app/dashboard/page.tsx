import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Plus, Globe, Edit, Eye } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your school websites",
}

// Mock data for demonstration
const recentSites = [
  {
    id: "1",
    name: "Lincoln Elementary",
    domain: "lincoln-elementary.edu",
    status: "published",
    lastModified: "2 hours ago",
  },
  {
    id: "2",
    name: "Roosevelt High School",
    domain: "roosevelt-high.edu",
    status: "draft",
    lastModified: "1 day ago",
  },
  {
    id: "3",
    name: "Washington Middle School",
    domain: "washington-middle.edu",
    status: "published",
    lastModified: "3 days ago",
  },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your school websites.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/dashboard/sites/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Site
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sites</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">67% of total sites</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Draft</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Ready for review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">New site created</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Sites</CardTitle>
            <CardDescription>Your most recently modified school websites.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSites.map((site) => (
                <div key={site.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{site.name}</p>
                    <p className="text-sm text-muted-foreground">{site.domain}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        site.status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {site.status}
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/sites/${site.id}/editor`}>Edit</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/sites">View All Sites</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" asChild>
              <Link href="/dashboard/sites/new">
                <Plus className="mr-2 h-4 w-4" />
                Create New Site
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/dashboard/sites">
                <Globe className="mr-2 h-4 w-4" />
                Manage Sites
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
