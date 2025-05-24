import { AdminAnalytics } from "@/components/admin/admin-analytics"

export default function AnalyticsPage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      <AdminAnalytics schoolId="school-1" />
    </div>
  )
}
