"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SecurityOverview } from "./security-overview"
import { PasswordPolicySettings } from "./password-policy-settings"
import { TwoFactorSettings } from "./two-factor-settings"
import { SecurityAuditLogs } from "./security-audit-logs"
import { ApiKeyManagement } from "./api-key-management"
import { SessionManagement } from "./session-management"
import { UserAccessControls } from "./user-access-controls"

export function SecurityDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Security Settings</h1>
        <p className="text-muted-foreground">
          Manage security settings, policies, and monitor security events for your school.
        </p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="access">Access Controls</TabsTrigger>
          <TabsTrigger value="password">Password Policy</TabsTrigger>
          <TabsTrigger value="2fa">Two-Factor Auth</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <SecurityOverview />
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <UserAccessControls />
        </TabsContent>

        <TabsContent value="password" className="space-y-4">
          <PasswordPolicySettings />
        </TabsContent>

        <TabsContent value="2fa" className="space-y-4">
          <TwoFactorSettings />
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <SecurityAuditLogs />
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <ApiKeyManagement />
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <SessionManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}
