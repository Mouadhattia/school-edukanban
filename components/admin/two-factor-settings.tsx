"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Smartphone, Mail, Shield, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function TwoFactorSettings() {
  // Mock initial values
  const [enable2FA, setEnable2FA] = useState(false)
  const [require2FA, setRequire2FA] = useState(false)
  const [require2FAForRoles, setRequire2FAForRoles] = useState(false)
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["admin", "teacher"])
  const [defaultMethod, setDefaultMethod] = useState("app")
  const [rememberDevice, setRememberDevice] = useState(true)
  const [rememberDuration, setRememberDuration] = useState("30")

  const handleSave = () => {
    // Mock API call to save settings
    setTimeout(() => {
      toast({
        title: "Two-factor authentication settings updated",
        description: "Your 2FA settings have been saved successfully.",
      })
    }, 500)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Configure two-factor authentication settings for your school</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <div>
                <Label htmlFor="enable-2fa" className="text-base">
                  Enable two-factor authentication
                </Label>
                <p className="text-sm text-muted-foreground">Allow users to set up 2FA for their accounts</p>
              </div>
              <Switch id="enable-2fa" checked={enable2FA} onCheckedChange={setEnable2FA} />
            </div>

            {enable2FA && (
              <>
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="require-2fa" className="text-base">
                      Require two-factor authentication
                    </Label>
                    <p className="text-sm text-muted-foreground">Make 2FA mandatory for all users</p>
                  </div>
                  <Switch id="require-2fa" checked={require2FA} onCheckedChange={setRequire2FA} />
                </div>

                {!require2FA && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between space-x-2">
                      <div>
                        <Label htmlFor="require-2fa-roles" className="text-base">
                          Require 2FA for specific roles
                        </Label>
                        <p className="text-sm text-muted-foreground">Make 2FA mandatory only for selected user roles</p>
                      </div>
                      <Switch
                        id="require-2fa-roles"
                        checked={require2FAForRoles}
                        onCheckedChange={setRequire2FAForRoles}
                      />
                    </div>

                    {require2FAForRoles && (
                      <div className="pl-6 border-l-2 border-muted mt-4 space-y-2">
                        <Label className="text-sm">Select roles that require 2FA:</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="role-admin"
                              checked={selectedRoles.includes("admin")}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedRoles([...selectedRoles, "admin"])
                                } else {
                                  setSelectedRoles(selectedRoles.filter((r) => r !== "admin"))
                                }
                              }}
                            />
                            <Label htmlFor="role-admin" className="text-sm">
                              Administrators
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="role-teacher"
                              checked={selectedRoles.includes("teacher")}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedRoles([...selectedRoles, "teacher"])
                                } else {
                                  setSelectedRoles(selectedRoles.filter((r) => r !== "teacher"))
                                }
                              }}
                            />
                            <Label htmlFor="role-teacher" className="text-sm">
                              Teachers
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="role-staff"
                              checked={selectedRoles.includes("staff")}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedRoles([...selectedRoles, "staff"])
                                } else {
                                  setSelectedRoles(selectedRoles.filter((r) => r !== "staff"))
                                }
                              }}
                            />
                            <Label htmlFor="role-staff" className="text-sm">
                              Staff
                            </Label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="default-method" className="text-base">
                    Default 2FA method
                  </Label>
                  <RadioGroup
                    id="default-method"
                    value={defaultMethod}
                    onValueChange={setDefaultMethod}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="app" id="app" />
                      <Label htmlFor="app" className="flex items-center">
                        <Smartphone className="mr-2 h-4 w-4" />
                        Authenticator App
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="sms" id="sms" />
                      <Label htmlFor="sms" className="flex items-center">
                        <Smartphone className="mr-2 h-4 w-4" />
                        SMS
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-3">
                      <RadioGroupItem value="email" id="email" />
                      <Label htmlFor="email" className="flex items-center">
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="remember-device" className="text-base">
                        Remember device
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Allow users to remember devices and skip 2FA for a period of time
                      </p>
                    </div>
                    <Switch id="remember-device" checked={rememberDevice} onCheckedChange={setRememberDevice} />
                  </div>

                  {rememberDevice && (
                    <div className="pl-6 border-l-2 border-muted mt-4">
                      <Label htmlFor="remember-duration" className="text-sm">
                        Remember duration
                      </Label>
                      <Select value={rememberDuration} onValueChange={setRememberDuration}>
                        <SelectTrigger className="mt-1 w-full md:w-1/3">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 day</SelectItem>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </>
            )}

            {!enable2FA && (
              <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Security Risk</AlertTitle>
                <AlertDescription>
                  Two-factor authentication is currently disabled. Enabling 2FA significantly improves account security.
                </AlertDescription>
              </Alert>
            )}

            {enable2FA && !require2FA && !require2FAForRoles && (
              <Alert className="mt-4">
                <Shield className="h-4 w-4" />
                <AlertTitle>Security Recommendation</AlertTitle>
                <AlertDescription>
                  Consider requiring 2FA for administrative accounts to enhance security.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
