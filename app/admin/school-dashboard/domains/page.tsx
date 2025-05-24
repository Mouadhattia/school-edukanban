"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Check, Copy, ExternalLink, Globe, Home, Layout, Plus, Settings, Users } from "lucide-react"

export default function DomainsPage() {
  const [domains, setDomains] = useState([
    {
      id: "1",
      name: "lincoln.edusite.com",
      type: "subdomain",
      status: "active",
      site: "Lincoln High School",
      ssl: true,
    },
    {
      id: "2",
      name: "lincolnhighschool.org",
      type: "custom",
      status: "active",
      site: "Lincoln High School",
      ssl: true,
    },
    {
      id: "3",
      name: "washington.edusite.com",
      type: "subdomain",
      status: "active",
      site: "Washington Elementary",
      ssl: true,
    },
  ])

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-5 w-5" />
            <span>EduSite</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/sites"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
              My Sites
            </Link>
            <Link
              href="/dashboard/templates"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Layout className="h-4 w-4" />
              Templates
            </Link>
            <Link
              href="/dashboard/domains"
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all"
            >
              <Globe className="h-4 w-4" />
              Domains
            </Link>
            <Link
              href="/dashboard/users"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <div className="md:hidden">
            <BookOpen className="h-6 w-6" />
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="sm">
              Upgrade Plan
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Toggle user menu">
              <img src="/diverse-avatars.png" alt="Avatar" className="rounded-full" height={32} width={32} />
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Domain Management</h1>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Domain
            </Button>
          </div>
          <Tabs defaultValue="all" className="mt-6">
            <TabsList>
              <TabsTrigger value="all">All Domains</TabsTrigger>
              <TabsTrigger value="subdomains">Subdomains</TabsTrigger>
              <TabsTrigger value="custom">Custom Domains</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Domains</CardTitle>
                  <CardDescription>Manage your subdomains and custom domains for your school websites.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {domains.map((domain) => (
                      <div key={domain.id} className="rounded-lg border p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{domain.name}</h3>
                              <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                                <Copy className="h-4 w-4" />
                                <span className="sr-only">Copy domain</span>
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Visit site</span>
                              </Button>
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                              <p className="text-sm text-muted-foreground">
                                {domain.type === "subdomain" ? "Subdomain" : "Custom Domain"}
                              </p>
                              <div className="flex items-center">
                                <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></div>
                                <span className="text-xs text-green-500">Active</span>
                              </div>
                              {domain.ssl && (
                                <div className="flex items-center">
                                  <Check className="h-3.5 w-3.5 text-green-500 mr-1" />
                                  <span className="text-xs">SSL</span>
                                </div>
                              )}
                            </div>
                            <p className="text-sm mt-1">
                              Site: <span className="text-muted-foreground">{domain.site}</span>
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-4 sm:mt-0">
                            <Button variant="outline" size="sm">
                              DNS Settings
                            </Button>
                            <Button size="sm">Manage</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Add a Custom Domain</CardTitle>
                  <CardDescription>Connect your own domain to your school website.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <label htmlFor="domain" className="text-sm font-medium">
                        Domain Name
                      </label>
                      <div className="flex gap-2">
                        <Input id="domain" placeholder="example.com" />
                        <Button>Add</Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Enter your domain name without www (e.g., yourschool.org)
                      </p>
                    </div>
                    <div className="rounded-lg border p-4 bg-muted/40">
                      <h3 className="font-medium mb-2">How to connect your domain</h3>
                      <ol className="space-y-2 text-sm">
                        <li className="flex items-start">
                          <span className="mr-2 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium">1</span>
                          <span>Add your domain above and click "Add"</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium">2</span>
                          <span>Configure your DNS settings at your domain registrar</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium">3</span>
                          <span>Verify domain ownership and wait for DNS propagation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium">4</span>
                          <span>SSL certificate will be automatically provisioned</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="subdomains" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subdomains</CardTitle>
                  <CardDescription>Manage your edusite.com subdomains.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {domains
                      .filter((domain) => domain.type === "subdomain")
                      .map((domain) => (
                        <div key={domain.id} className="rounded-lg border p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">{domain.name}</h3>
                                <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                                  <Copy className="h-4 w-4" />
                                  <span className="sr-only">Copy domain</span>
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <ExternalLink className="h-4 w-4" />
                                  <span className="sr-only">Visit site</span>
                                </Button>
                              </div>
                              <div className="flex items-center gap-3 mt-1">
                                <p className="text-sm text-muted-foreground">Subdomain</p>
                                <div className="flex items-center">
                                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></div>
                                  <span className="text-xs text-green-500">Active</span>
                                </div>
                                {domain.ssl && (
                                  <div className="flex items-center">
                                    <Check className="h-3.5 w-3.5 text-green-500 mr-1" />
                                    <span className="text-xs">SSL</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-sm mt-1">
                                Site: <span className="text-muted-foreground">{domain.site}</span>
                              </p>
                            </div>
                            <div className="flex items-center gap-2 mt-4 sm:mt-0">
                              <Button size="sm">Manage</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="custom" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Custom Domains</CardTitle>
                  <CardDescription>Manage your custom domains.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {domains
                      .filter((domain) => domain.type === "custom")
                      .map((domain) => (
                        <div key={domain.id} className="rounded-lg border p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">{domain.name}</h3>
                                <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                                  <Copy className="h-4 w-4" />
                                  <span className="sr-only">Copy domain</span>
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <ExternalLink className="h-4 w-4" />
                                  <span className="sr-only">Visit site</span>
                                </Button>
                              </div>
                              <div className="flex items-center gap-3 mt-1">
                                <p className="text-sm text-muted-foreground">Custom Domain</p>
                                <div className="flex items-center">
                                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></div>
                                  <span className="text-xs text-green-500">Active</span>
                                </div>
                                {domain.ssl && (
                                  <div className="flex items-center">
                                    <Check className="h-3.5 w-3.5 text-green-500 mr-1" />
                                    <span className="text-xs">SSL</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-sm mt-1">
                                Site: <span className="text-muted-foreground">{domain.site}</span>
                              </p>
                            </div>
                            <div className="flex items-center gap-2 mt-4 sm:mt-0">
                              <Button variant="outline" size="sm">
                                DNS Settings
                              </Button>
                              <Button size="sm">Manage</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
