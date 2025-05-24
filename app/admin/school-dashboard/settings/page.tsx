"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, CreditCard, Globe, Home, Layout, LogOut, Save, Settings, Shield, Users } from "lucide-react"

export default function SettingsPage() {
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
              href="/dashboard/users"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-lg bg-accent px-3 py-2 text-accent-foreground transition-all"
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
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences.</p>
          </div>

          <Tabs defaultValue="account" className="mt-6">
            <TabsList className="w-full justify-start overflow-auto">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update your account details and profile information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="Sarah Johnson" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="sarah.johnson@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school">School/Organization</Label>
                    <Input id="school" defaultValue="Lincoln High School" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us about yourself"
                      defaultValue="Principal at Lincoln High School with 15 years of experience in education administration."
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>Update your profile picture.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src="/placeholder.svg?height=80&width=80&query=avatar woman with glasses"
                      alt="Profile"
                      className="h-20 w-20 rounded-full object-cover"
                    />
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        Upload New Picture
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="billing" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plan</CardTitle>
                  <CardDescription>Manage your subscription and billing information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="font-medium">Pro Plan</h3>
                        <p className="text-sm text-muted-foreground">$29/month, billed monthly</p>
                        <ul className="mt-2 text-sm space-y-1">
                          <li className="flex items-center">
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
                              className="h-4 w-4 mr-2 text-green-500"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Up to 5 school websites
                          </li>
                          <li className="flex items-center">
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
                              className="h-4 w-4 mr-2 text-green-500"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Custom domains
                          </li>
                          <li className="flex items-center">
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
                              className="h-4 w-4 mr-2 text-green-500"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Advanced analytics
                          </li>
                        </ul>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button>Upgrade Plan</Button>
                        <Button variant="outline">View All Plans</Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Payment Method</h3>
                    <div className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Billing History</h3>
                    <div className="rounded-lg border">
                      <div className="grid grid-cols-4 gap-4 p-4 font-medium border-b">
                        <div>Date</div>
                        <div>Amount</div>
                        <div>Status</div>
                        <div></div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 p-4 items-center border-b">
                        <div className="text-sm">May 1, 2023</div>
                        <div className="text-sm">$29.00</div>
                        <div>
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Paid
                          </span>
                        </div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 p-4 items-center border-b">
                        <div className="text-sm">Apr 1, 2023</div>
                        <div className="text-sm">$29.00</div>
                        <div>
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Paid
                          </span>
                        </div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-4 p-4 items-center">
                        <div className="text-sm">Mar 1, 2023</div>
                        <div className="text-sm">$29.00</div>
                        <div>
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Paid
                          </span>
                        </div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notifications" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Website updates</p>
                          <p className="text-sm text-muted-foreground">Receive notifications about website changes.</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">User activity</p>
                          <p className="text-sm text-muted-foreground">Receive notifications about user actions.</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Billing and subscription</p>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about billing and payments.
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Product updates</p>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about new features and updates.
                          </p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing and promotions</p>
                          <p className="text-sm text-muted-foreground">Receive marketing emails and special offers.</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="security" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-factor authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Secure your account with two-factor authentication.
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sessions</CardTitle>
                  <CardDescription>Manage your active sessions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border">
                    <div className="grid grid-cols-3 gap-4 p-4 font-medium border-b">
                      <div>Device</div>
                      <div>Location</div>
                      <div>Last Active</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-4 items-center border-b">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">MacBook Pro (Current)</span>
                      </div>
                      <div className="text-sm">New York, USA</div>
                      <div className="text-sm">Just now</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 p-4 items-center">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">iPhone 13</span>
                      </div>
                      <div className="text-sm">New York, USA</div>
                      <div className="text-sm">2 hours ago</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out of All Devices
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
