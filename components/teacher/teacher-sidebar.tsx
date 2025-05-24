"use client"

import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  BarChart3,
  ClipboardList,
  HelpCircle,
  ShoppingCart,
  Trello,
} from "lucide-react"
import { DashboardSidebar } from "@/components/ui/dashboard-sidebar"
import type { NavItem } from "@/lib/types"

export function TeacherSidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      title: "Main",
      items: [
        {
          title: "Dashboard",
          href: "/teacher/dashboard",
          icon: LayoutDashboard,
          active: pathname === "/teacher/dashboard",
        },
        {
          title: "Classes",
          href: "/teacher/classes",
          icon: BookOpen,
          active: pathname === "/teacher/classes" || pathname.startsWith("/teacher/classes/"),
          badge: "4", // Show the number of classes
        },
        {
          title: "Students",
          href: "/teacher/students",
          icon: Users,
          active: pathname === "/teacher/students" || pathname.startsWith("/teacher/students/"),
        },
        {
          title: "Assignments",
          href: "/teacher/assignments",
          icon: ClipboardList,
          active: pathname === "/teacher/assignments" || pathname.startsWith("/teacher/assignments/"),
          badge: "2", // Show the number of pending assignments
          badgeVariant: "destructive",
        },
        {
          title: "Analytics",
          href: "/teacher/analytics",
          icon: BarChart3,
          active: pathname === "/teacher/analytics",
        },
        {
          title: "Boards",
          href: "/teacher/boards",
          icon: Trello,
          active: pathname === "/teacher/boards" || pathname.startsWith("/board/"),
        },
      ],
    },
    {
      title: "Marketplace",
      items: [
        {
          title: "Templates",
          href: "/templates/browse",
          icon: ShoppingCart,
          active: pathname === "/templates/browse" || pathname.startsWith("/templates/browse"),
        },
        {
          title: "My Purchases",
          href: "/teacher/purchases",
          icon: BookOpen,
          active: pathname === "/teacher/purchases" || pathname.startsWith("/teacher/purchases"),
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Settings",
          href: "/teacher/settings",
          icon: Settings,
          active: pathname === "/teacher/settings",
        },
        {
          title: "Help & Support",
          href: "/help",
          icon: HelpCircle,
          active: pathname === "/help",
        },
      ],
    },
  ]

  return <DashboardSidebar items={navItems} title="EduKanban" className={className} />
}
