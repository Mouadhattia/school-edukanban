"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, Users, Lock, Clock, FileText } from "lucide-react"

export function SecurityOverview() {
  // Mock security score and data
  const securityScore = 78
  const securityIssues = 3
  const lastAudit = "2023-11-15"
  const activeUsers = 245
  const activeSessions = 32

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Security Score</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="text-2xl font-bold">{securityScore}%</div>
            <Progress value={securityScore} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {securityScore >= 80 ? "Good" : securityScore >= 60 ? "Fair" : "Poor"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Security Issues</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="text-2xl font-bold">{securityIssues}</div>
            <p className="text-xs text-muted-foreground">
              {securityIssues === 0 ? "No issues detected" : `${securityIssues} issues need attention`}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last Security Audit</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="text-2xl font-bold">{lastAudit}</div>
            <p className="text-xs text-muted-foreground">
              {new Date(lastAudit) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                ? "Up to date"
                : "Audit recommended"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="text-2xl font-bold">{activeUsers}</div>
            <p className="text-xs text-muted-foreground">Total users with active accounts</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="text-2xl font-bold">{activeSessions}</div>
            <p className="text-xs text-muted-foreground">Current active user sessions</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">2FA Adoption</CardTitle>
          <Lock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-2">
            <div className="text-2xl font-bold">42%</div>
            <Progress value={42} className="h-2" />
            <p className="text-xs text-muted-foreground">Percentage of users with 2FA enabled</p>
          </div>
        </CardContent>
      </Card>

      {securityIssues > 0 && (
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Security Recommendations</CardTitle>
            <CardDescription>Address these issues to improve your security posture</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Weak Password Policy</AlertTitle>
              <AlertDescription>
                Your current password policy does not meet recommended standards. Consider increasing minimum length and
                complexity requirements.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Two-Factor Authentication</AlertTitle>
              <AlertDescription>
                Only 42% of your users have enabled two-factor authentication. Consider making 2FA mandatory for all
                staff accounts.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Outdated API Keys</AlertTitle>
              <AlertDescription>
                You have API keys that have not been rotated in over 180 days. Consider rotating these keys for better
                security.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
