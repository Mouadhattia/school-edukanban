import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ToastProvider } from "@/components/ui/toast"
import { OrganizationDataProvider } from "@/contexts/organization-data-context"

export const metadata: Metadata = {
  title: "Kanban Board for Teachers",
  description: "A kanban board application for teachers to manage tasks and assignments",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <OrganizationDataProvider>
        <ToastProvider>{children}</ToastProvider>
        </OrganizationDataProvider>
      </body>
    </html>
  )
}
