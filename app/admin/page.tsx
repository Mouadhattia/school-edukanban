import { redirect } from "next/navigation"

export default function AdminPage() {
  // Redirect to the dashboard
  redirect("/admin/dashboard")
}
