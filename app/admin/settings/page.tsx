export default function SettingsPage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">School Settings</h1>
      <div className="grid gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>
          <p className="text-muted-foreground">Configure general school settings and preferences.</p>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <p className="text-muted-foreground">Manage user accounts, roles, and permissions.</p>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <p className="text-muted-foreground">Configure notification settings and preferences.</p>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          <p className="text-muted-foreground">Manage security settings and access controls.</p>
        </div>
      </div>
    </div>
  )
}
