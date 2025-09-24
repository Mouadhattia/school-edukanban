"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Globe, MoreHorizontal, Pencil, Plus, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOrganizationData } from "@/contexts/organization-data-context";

export default function SitesPage() {
  const { sites, fetchSitesData, user } = useOrganizationData();

  const [status, setStatus] = useState("draft");

  useEffect(() => {
    if (user && user.schoolIds) {
      fetchSitesData({ schoolId: user.schoolIds[0], status, page: 1, limit: 10 ,search: ""});
    }
  }, [user, status]);
  // const sites = [
  //   {
  //     id: "1",
  //     name: "Lincoln High School",
  //     domain: "lincoln.edusite.com",
  //     status: "published",
  //     lastUpdated: "2 days ago",
  //     image: "/high-school-website-template.png",
  //   },
  //   {
  //     id: "2",
  //     name: "Washington Elementary",
  //     domain: "washington.edusite.com",
  //     status: "published",
  //     lastUpdated: "5 days ago",
  //     image: "/elementary-school-website.png",
  //   },
  //   {
  //     id: "3",
  //     name: "Jefferson Middle School",
  //     domain: "jefferson.edusite.com",
  //     status: "draft",
  //     lastUpdated: "1 week ago",
  //     image: "/middle-school-website-template.png",
  //   },
  // ];

  function formatDate(input: Date | string): string {
    const date = typeof input === "string" ? new Date(input) : input;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">School Websites</h1>
          <p className="text-muted-foreground">
            Manage and customize your school websites.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/sites/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Site
          </Link>
        </Button>
      </div>
      {(!sites || sites.length === 0) && <div>No sites found</div>}
      {sites && sites.length > 0 && (
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setStatus("all")}>
              All Sites
            </TabsTrigger>
            <TabsTrigger
              value="published"
              onClick={() => setStatus("published")}
            >
              Published
            </TabsTrigger>
            <TabsTrigger value="draft" onClick={() => setStatus("draft")}>
              Draft
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sites?.map((site) => (
                <Card key={site._id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img
                      src={
                        "https://images-platform.99static.com//pIbvuLLaXZvvayBCdrGDahz08ps=/4x0:1363x1359/fit-in/500x500/99designs-contests-attachments/56/56251/attachment_56251104"
                      }
                      alt={site.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Analytics</DropdownMenuItem>
                          <DropdownMenuItem>Edit Settings</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Delete Site
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle>{site.name}</CardTitle>
                    <CardDescription>{site.domain}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          site.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {site.status}
                      </div>
                      <span className="text-muted-foreground">
                        Updated {formatDate(site.last_updated)}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Link
                      href={`/admin/sites/${site._id}/editor`}
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/preview/${site._id}`} className="flex-1">
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
                  <Card key={site._id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src="https://images-platform.99static.com//pIbvuLLaXZvvayBCdrGDahz08ps=/4x0:1363x1359/fit-in/500x500/99designs-contests-attachments/56/56251/attachment_56251104"
                        alt={site.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Analytics</DropdownMenuItem>
                            <DropdownMenuItem>Edit Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Delete Site
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{site.name}</CardTitle>
                      <CardDescription>{site.domain}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                          {site.status}
                        </div>
                        <span className="text-muted-foreground">
                          Updated {formatDate(site.updated_at)}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex gap-2">
                      <Link
                        href={`/admin/sites/${site._id}/editor`}
                        className="flex-1"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </Link>
                      <Link href={`/preview/${site._id}`} className="flex-1">
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

          <TabsContent value="draft" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sites
                .filter((site) => site.status === "draft")
                .map((site) => (
                  <Card key={site._id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img
                        src={
                          "https://images-platform.99static.com//pIbvuLLaXZvvayBCdrGDahz08ps=/4x0:1363x1359/fit-in/500x500/99designs-contests-attachments/56/56251/attachment_56251104"
                        }
                        alt={site.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Analytics</DropdownMenuItem>
                            <DropdownMenuItem>Edit Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Delete Site
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{site.name}</CardTitle>
                      <CardDescription>{site.domain}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                          {site.status}
                        </div>
                        <span className="text-muted-foreground">
                          Updated {formatDate(site.updated_at)}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex gap-2">
                      <Link
                        href={`/admin/sites/${site._id}/editor`}
                        className="flex-1"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                      </Link>
                      <Link href={`/preview/${site._id}`} className="flex-1">
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
      )}
    </div>
  );
}
