"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Globe, Edit, Eye } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useOrganizationData } from "@/contexts/organization-data-context";




export default function DashboardPage() {
  const { sites, fetchSitesData, user ,} = useOrganizationData();
 
  const recentSites = useMemo(() => sites?.map(site=>{
    return  {
      id: site._id,
      name: site.name,
      domain: site.domain,
      status: site.status,
      lastModified: site.last_updated,
      created_at: site.created_at,
    }}) || []
  , [sites]); // dependency array
  
const totalSites = recentSites?.length || 0
const publishedSites = recentSites?.filter(site=>site.status === "published").length || 0
const draftSites = recentSites?.filter(site=>site.status === "draft").length || 0
const thisMonthSites = recentSites?.filter(site=>site.created_at >= new Date(new Date().setMonth(new Date().getMonth() - 1))).length || 0

   useEffect(() => {
     if (user && user.schoolIds) {
       fetchSitesData({ schoolId: user.schoolIds[0], status, page: 1, limit: 10 ,search: ""});
     }
   }, [user, status]);
  return (
    <div>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your school websites.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link href="/admin/sites/new">
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
            <div className="text-2xl font-bold">{totalSites}</div>
            <p className="text-xs text-muted-foreground">+ {thisMonthSites} from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedSites}</div>
            <p className="text-xs text-muted-foreground">{publishedSites / totalSites * 100}% of total sites</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Draft</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftSites}</div>
            <p className="text-xs text-muted-foreground">Ready for review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Plus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisMonthSites}</div>
            <p className="text-xs text-muted-foreground">New site created</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Sites</CardTitle>
            <CardDescription>
              Your most recently modified school websites.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSites.map((site) => (
                <div
                  key={site.id}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {site.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {site.domain}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        site.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {site.status}
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/sites/${site.id}/editor`}>
                        Edit
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/admin/sites">View All Sites</Link>
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
              <Link href="/admin/sites/new">
                <Plus className="mr-2 h-4 w-4" />
                Create New Site
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/sites">
                <Globe className="mr-2 h-4 w-4" />
                Manage Sites
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
