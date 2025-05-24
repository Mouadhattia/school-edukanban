"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Download, Globe, Home, Layout, Settings, TrendingUp, Users } from "lucide-react"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d")
  const [selectedSite, setSelectedSite] = useState("all")

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
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Globe className="h-4 w-4" />
              Domains
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all"
            >
              <TrendingUp className="h-4 w-4" />
              Analytics
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
              <p className="text-muted-foreground">Track performance and engagement for your school websites.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={selectedSite} onValueChange={setSelectedSite}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select site" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sites</SelectItem>
                  <SelectItem value="lincoln">Lincoln High School</SelectItem>
                  <SelectItem value="washington">Washington Elementary</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="12m">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,543</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+12.5%</span> from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45,678</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+8.2%</span> from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Session Duration</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2m 45s</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-500">-1.5%</span> from last period
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32.5%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">-3.2%</span> from last period
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="pages">Pages</TabsTrigger>
                <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
                <TabsTrigger value="devices">Devices</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Visitors Over Time</CardTitle>
                    <CardDescription>Daily visitors to your school websites.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <img
                        src="/placeholder.svg?height=300&width=800&query=line chart showing website visitors over time"
                        alt="Visitors chart"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Pages</CardTitle>
                      <CardDescription>Most visited pages on your websites.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="font-medium">Home</div>
                          </div>
                          <div className="text-sm text-muted-foreground">12,345 views</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="font-medium">About</div>
                          </div>
                          <div className="text-sm text-muted-foreground">8,765 views</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="font-medium">Calendar</div>
                          </div>
                          <div className="text-sm text-muted-foreground">6,543 views</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="font-medium">Staff Directory</div>
                          </div>
                          <div className="text-sm text-muted-foreground">5,432 views</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="font-medium">Contact</div>
                          </div>
                          <div className="text-sm text-muted-foreground">4,321 views</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Traffic Sources</CardTitle>
                      <CardDescription>Where your visitors are coming from.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <img
                          src="/placeholder.svg?height=250&width=400&query=pie chart showing website traffic sources"
                          alt="Traffic sources chart"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="pages" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Page Performance</CardTitle>
                    <CardDescription>Detailed metrics for all pages on your websites.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                        <div>Page</div>
                        <div>Views</div>
                        <div>Avg. Time</div>
                        <div>Bounce Rate</div>
                        <div>Conversion</div>
                      </div>
                      <div className="grid grid-cols-5 gap-4 p-4 items-center border-b">
                        <div className="font-medium">Home</div>
                        <div>12,345</div>
                        <div>1m 45s</div>
                        <div>32.5%</div>
                        <div>4.2%</div>
                      </div>
                      <div className="grid grid-cols-5 gap-4 p-4 items-center border-b">
                        <div className="font-medium">About</div>
                        <div>8,765</div>
                        <div>2m 15s</div>
                        <div>28.3%</div>
                        <div>2.1%</div>
                      </div>
                      <div className="grid grid-cols-5 gap-4 p-4 items-center border-b">
                        <div className="font-medium">Calendar</div>
                        <div>6,543</div>
                        <div>3m 22s</div>
                        <div>18.7%</div>
                        <div>5.8%</div>
                      </div>
                      <div className="grid grid-cols-5 gap-4 p-4 items-center border-b">
                        <div className="font-medium">Staff Directory</div>
                        <div>5,432</div>
                        <div>2m 54s</div>
                        <div>22.1%</div>
                        <div>1.5%</div>
                      </div>
                      <div className="grid grid-cols-5 gap-4 p-4 items-center">
                        <div className="font-medium">Contact</div>
                        <div>4,321</div>
                        <div>1m 32s</div>
                        <div>35.6%</div>
                        <div>8.9%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="traffic" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Sources</CardTitle>
                    <CardDescription>Detailed breakdown of where your visitors are coming from.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="h-[300px]">
                        <img
                          src="/placeholder.svg?height=300&width=400&query=pie chart showing website traffic sources"
                          alt="Traffic sources chart"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-primary"></div>
                            <div className="font-medium">Direct</div>
                          </div>
                          <div className="text-sm">42% (5,245)</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                            <div className="font-medium">Search</div>
                          </div>
                          <div className="text-sm">35% (4,378)</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <div className="font-medium">Social</div>
                          </div>
                          <div className="text-sm">15% (1,865)</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <div className="font-medium">Referral</div>
                          </div>
                          <div className="text-sm">8% (1,055)</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h3 className="font-medium mb-4">Top Referrers</h3>
                      <div className="rounded-md border">
                        <div className="grid grid-cols-3 gap-4 p-4 font-medium border-b">
                          <div>Source</div>
                          <div>Visitors</div>
                          <div>Conversion Rate</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4 items-center border-b">
                          <div className="font-medium">google.com</div>
                          <div>3,245</div>
                          <div>4.5%</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4 items-center border-b">
                          <div className="font-medium">facebook.com</div>
                          <div>1,235</div>
                          <div>3.2%</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4 items-center border-b">
                          <div className="font-medium">district.edu</div>
                          <div>845</div>
                          <div>5.8%</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4 items-center">
                          <div className="font-medium">twitter.com</div>
                          <div>432</div>
                          <div>2.1%</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="devices" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Device Breakdown</CardTitle>
                    <CardDescription>What devices your visitors are using.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="h-[300px]">
                        <img
                          src="/placeholder.svg?height=300&width=400&query=pie chart showing device usage breakdown"
                          alt="Device breakdown chart"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-primary"></div>
                            <div className="font-medium">Mobile</div>
                          </div>
                          <div className="text-sm">58% (7,245)</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                            <div className="font-medium">Desktop</div>
                          </div>
                          <div className="text-sm">32% (4,012)</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <div className="font-medium">Tablet</div>
                          </div>
                          <div className="text-sm">10% (1,286)</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <h3 className="font-medium mb-4">Browser Usage</h3>
                      <div className="rounded-md border">
                        <div className="grid grid-cols-3 gap-4 p-4 font-medium border-b">
                          <div>Browser</div>
                          <div>Users</div>
                          <div>Percentage</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4 items-center border-b">
                          <div className="font-medium">Chrome</div>
                          <div>6,542</div>
                          <div>52.2%</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4 items-center border-b">
                          <div className="font-medium">Safari</div>
                          <div>3,254</div>
                          <div>26.0%</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4 items-center border-b">
                          <div className="font-medium">Firefox</div>
                          <div>1,376</div>
                          <div>11.0%</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 p-4 items-center">
                          <div className="font-medium">Edge</div>
                          <div>1,054</div>
                          <div>8.4%</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
