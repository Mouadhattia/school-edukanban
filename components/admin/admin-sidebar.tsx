"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  Settings,
  BarChart,
  Store,
  FileCheck,
  Globe,
  Bell,
  Shield,
  Server,
} from "lucide-react";
import { DashboardSidebar } from "@/components/ui/dashboard-sidebar";
import type { NavItem } from "@/lib/types";

interface AdminSidebarProps {
  className?: string;
  onToggle?: (collapsed: boolean) => void;
}

export function AdminSidebar({ className, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();

  // Mock data for pending template requests count
  const pendingTemplateRequests = 3;
  // Mock data for system alerts
  const systemAlerts = 2;

  const navItems: NavItem[] = [
    {
      title: "Main",
      items: [
        {
          title: "Dashboard",
          href: "/admin/dashboard",
          icon: LayoutDashboard,
          active: pathname === "/admin/dashboard",
        },
        {
          title: "Teachers",
          href: "/admin/teachers",
          icon: Users,
          active: pathname === "/admin/teachers",
        },
        {
          title: "Students",
          href: "/admin/students",
          icon: GraduationCap,
          active: pathname === "/admin/students",
        },
        {
          title: "Classes",
          href: "/admin/classes",
          icon: BookOpen,
          active:
            pathname === "/admin/classes" ||
            pathname?.startsWith("/admin/classes/"),
        },
        {
          title: "Boards",
          href: "/admin/boards",
          icon: Calendar,
          active: pathname === "/admin/boards",
        },
        {
          title: "Courses",
          href: "/admin/courses",
          icon: BookOpen,
          active: pathname === "/admin/courses",
        },
        {
          title: "Products",
          href: "/admin/products",
          icon: Store,
          active: pathname === "/admin/products",
        },
        {
          title: "Syllabus",
          href: "/admin/syllabus",
          icon: BookOpen,
          active: pathname === "/admin/syllabus",
        },
      ],
    },
    {
      title: "Content",
      items: [
        {
          title: "Templates",
          href: "/admin/templates",
          icon: Store,
          active: pathname === "/admin/templates",
        },
        {
          title: "Template Requests",
          href: "/admin/template-requests",
          icon: FileCheck,
          active: pathname === "/admin/template-requests",
          badge:
            pendingTemplateRequests > 0 ? pendingTemplateRequests : undefined,
          badgeVariant: "destructive",
        },
        {
          title: "School Website",
          href: "/admin/school-dashboard",
          icon: Globe,
          active:
            pathname === "/admin/website" ||
            pathname?.startsWith("/admin/school-dashboard"),
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          title: "Analytics",
          href: "/admin/analytics",
          icon: BarChart,
          active: pathname === "/admin/analytics",
        },
        {
          title: "Notifications",
          href: "/admin/notifications",
          icon: Bell,
          active: pathname === "/admin/notifications",
          badge: systemAlerts > 0 ? systemAlerts : undefined,
          badgeVariant: "destructive",
        },
        {
          title: "Security",
          href: "/admin/security",
          icon: Shield,
          active: pathname === "/admin/security",
        },
        {
          title: "System",
          href: "/admin/system",
          icon: Server,
          active: pathname === "/admin/system",
        },
        {
          title: "Settings",
          href: "/admin/settings",
          icon: Settings,
          active: pathname === "/admin/settings",
        },
      ],
    },
  ];

  return (
    <DashboardSidebar
      items={navItems}
      title="Admin Dashboard"
      className={className}
      onToggle={onToggle}
    />
  );
}
