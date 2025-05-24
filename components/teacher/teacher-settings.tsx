"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Bell,
  ChevronsUpDown,
  Lock,
  LogOut,
  Moon,
  Palette,
  Save,
  Sun,
  User,
  Zap,
  Building,
  Loader2,
  Upload,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { School } from "@/lib/types"

// Mock schools data
const mockSchools: School[] = [
  { id: "school-1", name: "Lincoln High School", logo: "/placeholder.svg?height=40&width=40", address: "123 Main St" },
  {
    id: "school-2",
    name: "Washington Elementary",
    logo: "/placeholder.svg?height=40&width=40",
    address: "456 Oak Ave",
  },
  {
    id: "school-3",
    name: "Jefferson Middle School",
    logo: "/placeholder.svg?height=40&width=40",
    address: "789 Pine Rd",
  },
]

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z.string().min(1, { message: "This field is required." }).email("This is not a valid email."),
  bio: z.string().max(160).min(4),
  urls: z
    .object({
      portfolio: z.string().url({ message: "Please enter a valid URL." }).optional(),
      linkedin: z.string().url({ message: "Please enter a valid URL." }).optional(),
    })
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  username: "johndoe",
  email: "john.doe@example.com",
  bio: "I'm a high school science teacher with 10 years of experience teaching biology and chemistry.",
  urls: {
    portfolio: "https://example.com/portfolio",
    linkedin: "https://linkedin.com/in/johndoe",
  },
}

// Account form schema
const accountFormSchema = z.object({
  currentPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
  twoFactorEnabled: z.boolean().default(false),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

const accountDefaultValues: Partial<AccountFormValues> = {
  twoFactorEnabled: false,
}

// Appearance form schema
const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"]).default("system"),
  colorScheme: z.enum(["blue", "purple", "green"]).default("blue"),
  fontSize: z.enum(["small", "medium", "large"]).default("medium"),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

const appearanceDefaultValues: Partial<AppearanceFormValues> = {
  theme: "system",
  colorScheme: "blue",
  fontSize: "medium",
}

// Notifications form schema
const notificationsFormSchema = z.object({
  emailNotifications: z.object({
    assignmentSubmissions: z.boolean().default(true),
    dueDateReminders: z.boolean().default(true),
    templateUpdates: z.boolean().default(false),
    systemAnnouncements: z.boolean().default(true),
  }),
  inAppNotifications: z.object({
    studentMessages: z.boolean().default(true),
    taskUpdates: z.boolean().default(true),
    boardChanges: z.boolean().default(false),
  }),
})

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

const notificationsDefaultValues: Partial<NotificationsFormValues> = {
  emailNotifications: {
    assignmentSubmissions: true,
    dueDateReminders: true,
    templateUpdates: false,
    systemAnnouncements: true,
  },
  inAppNotifications: {
    studentMessages: true,
    taskUpdates: true,
    boardChanges: false,
  },
}

// Display form schema
const displayFormSchema = z.object({
  boardView: z.object({
    compactView: z.boolean().default(false),
    showDueDates: z.boolean().default(true),
    showAssignees: z.boolean().default(true),
  }),
  timeFormat: z.enum(["12hour", "24hour"]).default("12hour"),
  dateFormat: z.enum(["mdy", "dmy", "ymd"]).default("mdy"),
  language: z.enum(["en", "es", "fr", "de", "zh"]).default("en"),
})

type DisplayFormValues = z.infer<typeof displayFormSchema>

const displayDefaultValues: Partial<DisplayFormValues> = {
  boardView: {
    compactView: false,
    showDueDates: true,
    showAssignees: true,
  },
  timeFormat: "12hour",
  dateFormat: "mdy",
  language: "en",
}

// Schools form schema
const schoolsFormSchema = z.object({
  defaultSchool: z.string(),
  schoolPreferences: z.record(
    z.string(),
    z.object({
      showInDashboard: z.boolean().default(true),
      notificationsEnabled: z.boolean().default(true),
    }),
  ),
})

type SchoolsFormValues = z.infer<typeof schoolsFormSchema>

export function TeacherSettings() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [userSchools, setUserSchools] = useState<School[]>(mockSchools)
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profilePicture, setProfilePicture] = useState("/diverse-classroom.png")
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false)
  const fileInputRef = useState<HTMLInputElement | null>(null)

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const accountForm = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: accountDefaultValues,
    mode: "onChange",
  })

  const appearanceForm = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: appearanceDefaultValues,
    mode: "onChange",
  })

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: notificationsDefaultValues,
    mode: "onChange",
  })

  const displayForm = useForm<DisplayFormValues>({
    resolver: zodResolver(displayFormSchema),
    defaultValues: displayDefaultValues,
    mode: "onChange",
  })

  const schoolsForm = useForm<SchoolsFormValues>({
    resolver: zodResolver(schoolsFormSchema),
    defaultValues: {
      defaultSchool: localStorage.getItem("defaultSchool") || mockSchools[0].id,
      schoolPreferences: mockSchools.reduce(
        (acc, school) => {
          acc[school.id] = {
            showInDashboard: true,
            notificationsEnabled: true,
          }
          return acc
        },
        {} as Record<string, { showInDashboard: boolean; notificationsEnabled: boolean }>,
      ),
    },
    mode: "onChange",
  })

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploading(true)
      // Simulate upload delay
      setTimeout(() => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setProfilePicture(e.target.result as string)
            toast({
              title: "Profile picture updated",
              description: "Your profile picture has been updated successfully.",
            })
          }
        }
        reader.readAsDataURL(file)
        setIsUploading(false)
      }, 1500)
    }
  }

  const handleRemoveProfilePicture = () => {
    setIsUploading(true)
    // Simulate delay
    setTimeout(() => {
      setProfilePicture("/vibrant-street-market.png")
      setIsUploading(false)
      toast({
        title: "Profile picture removed",
        description: "Your profile picture has been removed.",
      })
    }, 800)
  }

  const handleLogout = () => {
    // Show loading state
    setIsSubmitting(true)

    // Simulate logout delay
    setTimeout(() => {
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      })
      router.push("/login")
    }, 1000)
  }

  const handleDeleteAccount = () => {
    setIsSubmitting(true)

    // Simulate account deletion delay
    setTimeout(() => {
      setShowDeleteAccountDialog(false)
      setIsSubmitting(false)
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
        variant: "destructive",
      })
      router.push("/login")
    }, 2000)
  }

  async function onProfileSubmit(data: ProfileFormValues) {
    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function onAccountSubmit(data: AccountFormValues) {
    setIsSubmitting(true)

    // Validate password confirmation
    if (data.newPassword !== data.confirmPassword) {
      toast({
        title: "Error",
        description: "New password and confirmation do not match.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Account updated",
        description: "Your account settings have been updated successfully.",
      })
      accountForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        twoFactorEnabled: data.twoFactorEnabled,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function onAppearanceSubmit(data: AppearanceFormValues) {
    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Apply theme changes immediately
      document.documentElement.setAttribute("data-theme", data.theme)
      document.documentElement.setAttribute("data-color-scheme", data.colorScheme)
      document.documentElement.setAttribute("data-font-size", data.fontSize)

      toast({
        title: "Appearance updated",
        description: "Your appearance settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your appearance settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function onNotificationsSubmit(data: NotificationsFormValues) {
    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Notifications updated",
        description: "Your notification settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your notification settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function onDisplaySubmit(data: DisplayFormValues) {
    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Display settings updated",
        description: "Your display settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your display settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function onSchoolsSubmit(data: SchoolsFormValues) {
    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save default school to localStorage
      localStorage.setItem("defaultSchool", data.defaultSchool)

      toast({
        title: "School settings updated",
        description: "Your school preferences have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your school settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        <Card>
          <CardHeader className="p-4">
            <CardTitle className="text-xl">Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="flex flex-col space-y-1 p-2">
                <Button
                  variant={activeTab === "profile" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant={activeTab === "account" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("account")}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Account
                </Button>
                <Button
                  variant={activeTab === "appearance" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("appearance")}
                >
                  <Palette className="mr-2 h-4 w-4" />
                  Appearance
                </Button>
                <Button
                  variant={activeTab === "notifications" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button
                  variant={activeTab === "display" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("display")}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Display
                </Button>
                <Button
                  variant={activeTab === "schools" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("schools")}
                >
                  <Building className="mr-2 h-4 w-4" />
                  Schools
                </Button>
                <Separator className="my-2" />
                <Button
                  variant="ghost"
                  className="justify-start text-red-500 hover:text-red-600 hover:bg-red-100"
                  onClick={handleLogout}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <LogOut className="mr-2 h-4 w-4" />
                  )}
                  Log out
                </Button>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>This is how others will see you on the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-6">
                  <Avatar className="h-20 w-20 relative">
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                      </div>
                    )}
                    <AvatarImage src={profilePicture || "/placeholder.svg"} alt="Profile picture" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="font-medium">Profile Picture</h3>
                    <div className="flex space-x-2">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="profile-picture-upload"
                        onChange={handleProfilePictureChange}
                        ref={(input) => (fileInputRef[1] = input)}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => fileInputRef[1]?.click()}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        ) : (
                          <Upload className="mr-2 h-3 w-3" />
                        )}
                        Change
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 hover:text-red-600"
                        onClick={handleRemoveProfilePicture}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                        ) : (
                          <Trash2 className="mr-2 h-3 w-3" />
                        )}
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <FormField
                      control={profileForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe" {...field} />
                          </FormControl>
                          <FormDescription>This is your public display name.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormDescription>We'll use this email to contact you.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={profileForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us a little bit about yourself"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>This will be displayed on your profile.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Links</Label>
                        <p className="text-sm text-muted-foreground">
                          Add links to your portfolio, LinkedIn, or other profiles.
                        </p>
                      </div>
                      <FormField
                        control={profileForm.control}
                        name="urls.portfolio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Portfolio</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="urls.linkedin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>LinkedIn</FormLabel>
                            <FormControl>
                              <Input placeholder="https://linkedin.com/in/johndoe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button type="submit" disabled={isSubmitting || !profileForm.formState.isDirty}>
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Save changes
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {activeTab === "account" && (
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account settings and security.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...accountForm}>
                  <form onSubmit={accountForm.handleSubmit(onAccountSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <div className="space-y-4">
                        <FormField
                          control={accountForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Current Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={accountForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={accountForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      <FormField
                        control={accountForm.control}
                        name="twoFactorEnabled"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Enable 2FA</FormLabel>
                              <FormDescription>Add an extra layer of security to your account.</FormDescription>
                            </div>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={
                        isSubmitting || (!accountForm.formState.isDirty && !accountForm.getValues("twoFactorEnabled"))
                      }
                    >
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Update Account
                    </Button>
                  </form>
                </Form>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all of your content.
                  </p>
                  <AlertDialog open={showDeleteAccountDialog} onOpenChange={setShowDeleteAccountDialog}>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete Account</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account and remove all of your
                          data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={(e) => {
                            e.preventDefault()
                            handleDeleteAccount()
                          }}
                          disabled={isSubmitting}
                          className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                        >
                          {isSubmitting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="mr-2 h-4 w-4" />
                          )}
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "appearance" && (
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the appearance of the application.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...appearanceForm}>
                  <form onSubmit={appearanceForm.handleSubmit(onAppearanceSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Theme</h3>
                      <FormField
                        control={appearanceForm.control}
                        name="theme"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-3 gap-4"
                              >
                                <div className="flex flex-col items-center space-y-2">
                                  <Label
                                    htmlFor="theme-light"
                                    className="flex flex-col items-center space-y-2 cursor-pointer"
                                  >
                                    <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                                    <div
                                      className={`w-full h-24 flex items-center justify-center rounded-md border-2 ${
                                        field.value === "light" ? "border-primary" : "border-muted"
                                      }`}
                                    >
                                      <Sun className="h-6 w-6" />
                                    </div>
                                    <span className="text-sm font-medium">Light</span>
                                  </Label>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                  <Label
                                    htmlFor="theme-dark"
                                    className="flex flex-col items-center space-y-2 cursor-pointer"
                                  >
                                    <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                                    <div
                                      className={`w-full h-24 flex items-center justify-center rounded-md border-2 ${
                                        field.value === "dark" ? "border-primary" : "border-muted"
                                      }`}
                                    >
                                      <Moon className="h-6 w-6" />
                                    </div>
                                    <span className="text-sm font-medium">Dark</span>
                                  </Label>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                  <Label
                                    htmlFor="theme-system"
                                    className="flex flex-col items-center space-y-2 cursor-pointer"
                                  >
                                    <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                                    <div
                                      className={`w-full h-24 flex items-center justify-center rounded-md border-2 ${
                                        field.value === "system" ? "border-primary" : "border-muted"
                                      }`}
                                    >
                                      <ChevronsUpDown className="h-6 w-6" />
                                    </div>
                                    <span className="text-sm font-medium">System</span>
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Color Scheme</h3>
                      <FormField
                        control={appearanceForm.control}
                        name="colorScheme"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-3 gap-4"
                              >
                                <div className="flex flex-col items-center space-y-2">
                                  <Label
                                    htmlFor="color-blue"
                                    className="flex flex-col items-center space-y-2 cursor-pointer"
                                  >
                                    <RadioGroupItem value="blue" id="color-blue" className="sr-only" />
                                    <div
                                      className={`w-full h-12 bg-blue-500 rounded-md border-2 ${
                                        field.value === "blue" ? "border-primary" : "border-transparent"
                                      }`}
                                    />
                                    <span className="text-sm font-medium">Blue</span>
                                  </Label>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                  <Label
                                    htmlFor="color-purple"
                                    className="flex flex-col items-center space-y-2 cursor-pointer"
                                  >
                                    <RadioGroupItem value="purple" id="color-purple" className="sr-only" />
                                    <div
                                      className={`w-full h-12 bg-purple-500 rounded-md border-2 ${
                                        field.value === "purple" ? "border-primary" : "border-transparent"
                                      }`}
                                    />
                                    <span className="text-sm font-medium">Purple</span>
                                  </Label>
                                </div>
                                <div className="flex flex-col items-center space-y-2">
                                  <Label
                                    htmlFor="color-green"
                                    className="flex flex-col items-center space-y-2 cursor-pointer"
                                  >
                                    <RadioGroupItem value="green" id="color-green" className="sr-only" />
                                    <div
                                      className={`w-full h-12 bg-green-500 rounded-md border-2 ${
                                        field.value === "green" ? "border-primary" : "border-transparent"
                                      }`}
                                    />
                                    <span className="text-sm font-medium">Green</span>
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Font Size</h3>
                      <FormField
                        control={appearanceForm.control}
                        name="fontSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select font size" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="small">Small</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="large">Large</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting || !appearanceForm.formState.isDirty}>
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Save Preferences
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure how you receive notifications.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...notificationsForm}>
                  <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Email Notifications</h3>
                      <div className="space-y-4">
                        <FormField
                          control={notificationsForm.control}
                          name="emailNotifications.assignmentSubmissions"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Assignment Submissions</FormLabel>
                                <FormDescription>Receive emails when students submit assignments.</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={notificationsForm.control}
                          name="emailNotifications.dueDateReminders"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Due Date Reminders</FormLabel>
                                <FormDescription>
                                  Receive reminders about upcoming assignment due dates.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={notificationsForm.control}
                          name="emailNotifications.templateUpdates"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Template Updates</FormLabel>
                                <FormDescription>Receive notifications about template updates.</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={notificationsForm.control}
                          name="emailNotifications.systemAnnouncements"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">System Announcements</FormLabel>
                                <FormDescription>Receive important system announcements.</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">In-App Notifications</h3>
                      <div className="space-y-4">
                        <FormField
                          control={notificationsForm.control}
                          name="inAppNotifications.studentMessages"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Student Messages</FormLabel>
                                <FormDescription>Receive notifications when students send messages.</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={notificationsForm.control}
                          name="inAppNotifications.taskUpdates"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Task Updates</FormLabel>
                                <FormDescription>Receive notifications when tasks are updated.</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={notificationsForm.control}
                          name="inAppNotifications.boardChanges"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Board Changes</FormLabel>
                                <FormDescription>Receive notifications when boards are modified.</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Button type="submit" disabled={isSubmitting || !notificationsForm.formState.isDirty}>
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Save Notification Settings
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {activeTab === "display" && (
            <Card>
              <CardHeader>
                <CardTitle>Display</CardTitle>
                <CardDescription>Customize how content is displayed.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...displayForm}>
                  <form onSubmit={displayForm.handleSubmit(onDisplaySubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Board View</h3>
                      <div className="space-y-4">
                        <FormField
                          control={displayForm.control}
                          name="boardView.compactView"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Compact View</FormLabel>
                                <FormDescription>Display more tasks in less space.</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={displayForm.control}
                          name="boardView.showDueDates"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Show Due Dates</FormLabel>
                                <FormDescription>Display due dates on task cards.</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={displayForm.control}
                          name="boardView.showAssignees"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Show Assignees</FormLabel>
                                <FormDescription>Display assignee avatars on task cards.</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Time Format</h3>
                      <FormField
                        control={displayForm.control}
                        name="timeFormat"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="12hour" id="12hour" />
                                  <Label htmlFor="12hour">12-hour (1:30 PM)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="24hour" id="24hour" />
                                  <Label htmlFor="24hour">24-hour (13:30)</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Date Format</h3>
                      <FormField
                        control={displayForm.control}
                        name="dateFormat"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select date format" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                                  <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                                  <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Language</h3>
                      <FormField
                        control={displayForm.control}
                        name="language"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="en">English</SelectItem>
                                  <SelectItem value="es">Spanish</SelectItem>
                                  <SelectItem value="fr">French</SelectItem>
                                  <SelectItem value="de">German</SelectItem>
                                  <SelectItem value="zh">Chinese</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" disabled={isSubmitting || !displayForm.formState.isDirty}>
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Save Display Settings
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {activeTab === "schools" && (
            <Card>
              <CardHeader>
                <CardTitle>Schools</CardTitle>
                <CardDescription>Manage your school settings and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...schoolsForm}>
                  <form onSubmit={schoolsForm.handleSubmit(onSchoolsSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Default School</h3>
                      <FormField
                        control={schoolsForm.control}
                        name="defaultSchool"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select your default school</FormLabel>
                            <FormDescription>This school will be selected by default when you log in.</FormDescription>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a school" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {userSchools.map((school) => (
                                  <SelectItem key={school.id} value={school.id}>
                                    <div className="flex items-center gap-2">
                                      <img
                                        src={school.logo || "/placeholder.svg?height=40&width=40"}
                                        alt={school.name}
                                        className="h-5 w-5 rounded-full"
                                      />
                                      <span>{school.name}</span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">School Preferences</h3>
                      <div className="space-y-4">
                        {userSchools.map((school) => (
                          <div key={school.id} className="rounded-lg border p-4">
                            <div className="flex items-center gap-2 mb-4">
                              <img
                                src={school.logo || "/placeholder.svg?height=40&width=40"}
                                alt={school.name}
                                className="h-8 w-8 rounded-full"
                              />
                              <div>
                                <h4 className="font-medium">{school.name}</h4>
                                <p className="text-sm text-muted-foreground">{school.address}</p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <FormField
                                control={schoolsForm.control}
                                name={`schoolPreferences.${school.id}.showInDashboard`}
                                render={({ field }) => (
                                  <FormItem className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-base">Show in Dashboard</FormLabel>
                                      <FormDescription>Display this school in your dashboard.</FormDescription>
                                    </div>
                                    <FormControl>
                                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={schoolsForm.control}
                                name={`schoolPreferences.${school.id}.notificationsEnabled`}
                                render={({ field }) => (
                                  <FormItem className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                      <FormLabel className="text-base">Notifications</FormLabel>
                                      <FormDescription>Receive notifications for this school.</FormDescription>
                                    </div>
                                    <FormControl>
                                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button type="submit" disabled={isSubmitting || !schoolsForm.formState.isDirty}>
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="mr-2 h-4 w-4" />
                      )}
                      Save School Settings
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
