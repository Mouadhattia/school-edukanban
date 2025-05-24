"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function PasswordPolicySettings() {
  // Mock initial values
  const [minLength, setMinLength] = useState(8)
  const [requireUppercase, setRequireUppercase] = useState(true)
  const [requireLowercase, setRequireLowercase] = useState(true)
  const [requireNumbers, setRequireNumbers] = useState(true)
  const [requireSpecialChars, setRequireSpecialChars] = useState(false)
  const [passwordExpiration, setPasswordExpiration] = useState(90)
  const [preventReuse, setPreventReuse] = useState(true)
  const [preventReuseCount, setPreventReuseCount] = useState(5)
  const [lockoutThreshold, setLockoutThreshold] = useState(5)
  const [lockoutDuration, setLockoutDuration] = useState(30)

  const handleSave = () => {
    // Mock API call to save settings
    setTimeout(() => {
      toast({
        title: "Password policy updated",
        description: "Your password policy settings have been saved successfully.",
      })
    }, 500)
  }

  // Calculate password strength based on settings
  const calculateStrength = () => {
    let strength = 0
    if (minLength >= 12) strength += 30
    else if (minLength >= 10) strength += 20
    else if (minLength >= 8) strength += 10

    if (requireUppercase) strength += 15
    if (requireLowercase) strength += 15
    if (requireNumbers) strength += 15
    if (requireSpecialChars) strength += 25

    return Math.min(strength, 100)
  }

  const passwordStrength = calculateStrength()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password Policy</CardTitle>
          <CardDescription>Configure password requirements for all users in your school</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="min-length">Minimum Password Length ({minLength} characters)</Label>
              <Slider
                id="min-length"
                min={6}
                max={16}
                step={1}
                value={[minLength]}
                onValueChange={(value) => setMinLength(value[0])}
                className="mt-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="require-uppercase">Require uppercase letters</Label>
                <Switch id="require-uppercase" checked={requireUppercase} onCheckedChange={setRequireUppercase} />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="require-lowercase">Require lowercase letters</Label>
                <Switch id="require-lowercase" checked={requireLowercase} onCheckedChange={setRequireLowercase} />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="require-numbers">Require numbers</Label>
                <Switch id="require-numbers" checked={requireNumbers} onCheckedChange={setRequireNumbers} />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="require-special">Require special characters</Label>
                <Switch id="require-special" checked={requireSpecialChars} onCheckedChange={setRequireSpecialChars} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Password Expiration & History</h3>

            <div>
              <Label htmlFor="password-expiration">Password expiration (days)</Label>
              <Input
                id="password-expiration"
                type="number"
                min={0}
                max={365}
                value={passwordExpiration}
                onChange={(e) => setPasswordExpiration(Number.parseInt(e.target.value))}
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-1">Set to 0 for no expiration</p>
            </div>

            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="prevent-reuse">Prevent password reuse</Label>
              <Switch id="prevent-reuse" checked={preventReuse} onCheckedChange={setPreventReuse} />
            </div>

            {preventReuse && (
              <div>
                <Label htmlFor="prevent-reuse-count">Number of previous passwords to remember</Label>
                <Input
                  id="prevent-reuse-count"
                  type="number"
                  min={1}
                  max={24}
                  value={preventReuseCount}
                  onChange={(e) => setPreventReuseCount(Number.parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Account Lockout</h3>

            <div>
              <Label htmlFor="lockout-threshold">Failed login attempts before lockout</Label>
              <Input
                id="lockout-threshold"
                type="number"
                min={1}
                max={10}
                value={lockoutThreshold}
                onChange={(e) => setLockoutThreshold(Number.parseInt(e.target.value))}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="lockout-duration">Account lockout duration (minutes)</Label>
              <Input
                id="lockout-duration"
                type="number"
                min={5}
                max={1440}
                value={lockoutDuration}
                onChange={(e) => setLockoutDuration(Number.parseInt(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Password Strength</h3>
            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  passwordStrength >= 80 ? "bg-green-500" : passwordStrength >= 60 ? "bg-yellow-500" : "bg-red-500"
                }`}
                style={{ width: `${passwordStrength}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Current policy strength: {passwordStrength}% (
              {passwordStrength >= 80 ? "Strong" : passwordStrength >= 60 ? "Medium" : "Weak"})
            </p>

            {passwordStrength < 60 && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Weak Password Policy</AlertTitle>
                <AlertDescription>
                  Your current password policy is weak. Consider increasing the minimum length and requiring special
                  characters.
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
