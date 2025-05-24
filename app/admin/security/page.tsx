import type { Metadata } from "next"
import { SecurityDashboard } from "@/components/admin/security-dashboard"

export const metadata: Metadata = {
  title: "Security Settings | Admin Dashboard",
  description: "Manage security settings and policies for your school",
}

export default function SecurityPage() {
  return <SecurityDashboard />
}
