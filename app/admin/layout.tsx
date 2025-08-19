"use client";

import type React from "react";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { DashboardHeader } from "@/components/ui/dashboard-header";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className="flex h-screen">
      <AdminSidebar onToggle={handleSidebarToggle} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader
          title="School Administration"
          showSchoolSelector={true}
        />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
