"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Copy, Key, Plus, RotateCw, Trash2, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock API key data
const mockApiKeys = [
  {
    id: "key-001",
    name: "Student Portal Integration",
    prefix: "sk_live_stu_",
    suffix: "...a7b9c",
    created: "2023-06-15T10:30:00",
    lastUsed: "2023-11-19T14:22:15",
    expiresAt: "2024-06-15T10:30:00",
    permissions: ["read:students", "read:classes"],
    status: "active",
  },
  {
    id: "key-002",
    name: "Attendance System",
    prefix: "sk_live_att_",
    suffix: "...x4y6z",
    created: "2023-08-22T09:15:00",
    lastUsed: "2023-11-20T08:45:30",
    expiresAt: "2024-08-22T09:15:00",
    permissions: ["read:attendance", "write:attendance"],
    status: "active",
  },
  {
    id: "key-003",
    name: "Reporting Dashboard",
    prefix: "sk_live_rep_",
    suffix: "...m5n7p",
    created: "2023-05-10T14:20:00",
    lastUsed: "2023-11-01T11:30:45",
    expiresAt: "2024-05-10T14:20:00",
    permissions: ["read:reports", "read:analytics"],
    status: "active",
  },
  {
    id: "key-004",
    name: "Legacy System",
    prefix: "sk_live_leg_",
    suffix: "...d2e4f",
    created: "2022-11-05T16:45:00",
    lastUsed: "2023-05-18T09:12:30",
    expiresAt: "2023-11-05T16:45:00",
    permissions: ["read:students", "read:classes", "read:grades"],
    status: "expired",
  },
]

export function ApiKeyManagement() {
  const [apiKeys, setApiKeys] = useState(mockApiKeys)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [newKeyPermissions, setNewKeyPermissions] = useState<string[]>([])
  const [newKeyExpiration, setNewKeyExpiration] = useState("1-year")
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null)

  // Calculate days since last used
  const getDaysSinceLastUsed = (lastUsedDate: string) => {
    const lastUsed = new Date(lastUsedDate)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - lastUsed.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(date)
  }

  // Check if key is expiring soon (within 30 days)
  const isExpiringSoon = (expiresAt: string) => {
    const expiryDate = new Date(expiresAt)
    const today = new Date()
    const diffTime = expiryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 && diffDays <= 30
  }

  // Handle creating a new API key
  const handleCreateKey = () => {
    // In a real app, this would call an API to create a key
    const newKey = `sk_live_${Math.random().toString(36).substring(2, 8)}_${Math.random().toString(36).substring(2, 15)}`
    setNewlyCreatedKey(newKey)

    // Add the new key to the list
    const prefix = `sk_live_${newKey.substring(8, 11)}_`
    const suffix = `...${newKey.substring(newKey.length - 4)}`

    // Calculate expiry date based on selection
    const now = new Date()
    let expiryDate = new Date()
    if (newKeyExpiration === "30-days") {
      expiryDate.setDate(now.getDate() + 30)
    } else if (newKeyExpiration === "90-days") {
      expiryDate.setDate(now.getDate() + 90)
    } else if (newKeyExpiration === "1-year") {
      expiryDate.setFullYear(now.getFullYear() + 1)
    } else if (newKeyExpiration === "never") {
      expiryDate = new Date(9999, 11, 31) // Far future date
    }

    const newApiKey = {
      id: `key-${apiKeys.length + 1}`.padStart(7, "0"),
      name: newKeyName,
      prefix,
      suffix,
      created: now.toISOString(),
      lastUsed: now.toISOString(),
      expiresAt: expiryDate.toISOString(),
      permissions: newKeyPermissions,
      status: "active",
    }

    setApiKeys([...apiKeys, newApiKey])

    // Reset form
    setNewKeyName("")
    setNewKeyPermissions([])
    setNewKeyExpiration("1-year")
  }

  // Handle copying API key to clipboard
  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast({
      title: "API key copied",
      description: "The API key has been copied to your clipboard.",
    })
  }

  // Handle revoking an API key
  const handleRevokeKey = (keyId: string) => {
    setApiKeys(apiKeys.map((key) => (key.id === keyId ? { ...key, status: "revoked" } : key)))

    toast({
      title: "API key revoked",
      description: "The API key has been revoked successfully.",
    })
  }

  // Handle rotating an API key
  const handleRotateKey = (keyId: string) => {
    const keyToRotate = apiKeys.find((key) => key.id === keyId)
    if (!keyToRotate) return

    // In a real app, this would call an API to rotate the key
    const newKey = `sk_live_${Math.random().toString(36).substring(2, 8)}_${Math.random().toString(36).substring(2, 15)}`
    const prefix = `sk_live_${newKey.substring(8, 11)}_`
    const suffix = `...${newKey.substring(newKey.length - 4)}`

    setApiKeys(
      apiKeys.map((key) =>
        key.id === keyId
          ? {
              ...key,
              prefix,
              suffix,
              created: new Date().toISOString(),
              lastUsed: new Date().toISOString(),
            }
          : key,
      ),
    )

    setNewlyCreatedKey(newKey)

    toast({
      title: "API key rotated",
      description: "The API key has been rotated successfully. Make sure to update your integrations.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>Manage API keys for external integrations and services</CardDescription>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create API Key
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create new API key</DialogTitle>
                <DialogDescription>Create a new API key for integrating with external services.</DialogDescription>
              </DialogHeader>

              {newlyCreatedKey ? (
                <div className="space-y-4">
                  <Alert variant="warning">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Important</AlertTitle>
                    <AlertDescription>
                      This API key will only be displayed once. Please copy it now and store it securely.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <Label>Your API Key</Label>
                    <div className="flex items-center">
                      <Input value={newlyCreatedKey} readOnly className="font-mono text-xs" />
                      <Button
                        variant="outline"
                        size="icon"
                        className="ml-2"
                        onClick={() => handleCopyKey(newlyCreatedKey)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      onClick={() => {
                        setNewlyCreatedKey(null)
                        setIsCreateDialogOpen(false)
                      }}
                    >
                      Done
                    </Button>
                  </DialogFooter>
                </div>
              ) : (
                <>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="key-name">Key name</Label>
                      <Input
                        id="key-name"
                        placeholder="e.g., Student Portal Integration"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Permissions</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "read:students",
                          "write:students",
                          "read:classes",
                          "write:classes",
                          "read:attendance",
                          "write:attendance",
                          "read:grades",
                          "write:grades",
                          "read:reports",
                          "read:analytics",
                        ].map((permission) => (
                          <div key={permission} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`permission-${permission}`}
                              checked={newKeyPermissions.includes(permission)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setNewKeyPermissions([...newKeyPermissions, permission])
                                } else {
                                  setNewKeyPermissions(newKeyPermissions.filter((p) => p !== permission))
                                }
                              }}
                            />
                            <Label htmlFor={`permission-${permission}`} className="text-sm">
                              {permission}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="key-expiration">Expiration</Label>
                      <Select value={newKeyExpiration} onValueChange={setNewKeyExpiration}>
                        <SelectTrigger id="key-expiration">
                          <SelectValue placeholder="Select expiration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30-days">30 days</SelectItem>
                          <SelectItem value="90-days">90 days</SelectItem>
                          <SelectItem value="1-year">1 year</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateKey} disabled={!newKeyName || newKeyPermissions.length === 0}>
                      Create Key
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Key</TableHead>
                  <TableHead className="hidden md:table-cell">Created</TableHead>
                  <TableHead className="hidden md:table-cell">Expires</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((apiKey) => (
                  <TableRow key={apiKey.id}>
                    <TableCell>
                      <div className="font-medium">{apiKey.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Last used {getDaysSinceLastUsed(apiKey.lastUsed)} days ago
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                        {apiKey.prefix}...{apiKey.suffix}
                      </code>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{formatDate(apiKey.created)}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        {formatDate(apiKey.expiresAt)}
                        {isExpiringSoon(apiKey.expiresAt) && apiKey.status === "active" && (
                          <Badge variant="warning">Expiring soon</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          apiKey.status === "active"
                            ? "success"
                            : apiKey.status === "expired"
                              ? "warning"
                              : "destructive"
                        }
                      >
                        {apiKey.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleRotateKey(apiKey.id)}
                          disabled={apiKey.status !== "active"}
                        >
                          <RotateCw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleRevokeKey(apiKey.id)}
                          disabled={apiKey.status !== "active"}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {apiKeys.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No API keys found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4">
            <Alert>
              <Key className="h-4 w-4" />
              <AlertTitle>API Key Security</AlertTitle>
              <AlertDescription>
                API keys provide full access to your school's data. Keep them secure and rotate them regularly.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
