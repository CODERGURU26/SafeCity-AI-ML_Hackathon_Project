"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  Users,
  Radio,
} from "lucide-react"
import { useState } from "react"

const navItems = [
  {
    title: "Live Monitoring",
    href: "/",
    icon: Radio,
    badge: null,
  },
  {
    title: "FIR Data",
    href: "/fir-data",
    icon: FileText,
  },
  {
    title: "Crime Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Police Allocation",
    href: "/police-allocation",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border sidebar-gradient transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <span className="text-base font-bold tracking-tight text-foreground">
                  Safe<span className="text-primary">City</span>
                </span>
                <p className="text-[10px] text-muted-foreground leading-none mt-0.5 truncate">
                  Mumbai Police HQ
                </p>
              </div>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 p-3 pt-4">
          <div className={cn("mb-4 px-3", collapsed && "hidden")}>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              Navigation
            </p>
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/12 text-primary shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-primary" />
                )}
                <item.icon
                  className={cn(
                    "h-4.5 w-4.5 shrink-0 transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                {!collapsed && (
                  <span className="flex-1">{item.title}</span>
                )}
                {!collapsed && isActive && (
                  <span className="live-dot" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Officer Profile */}
        {!collapsed && (
          <div className="border-t border-border mx-3 mb-3 pt-3">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 bg-secondary/50">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 ring-1 ring-primary/30">
                <span className="text-xs font-bold text-primary">SP</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-foreground truncate">SI Prasun Shrivastav</p>
                <p className="text-[10px] text-muted-foreground truncate">Badge #MUM-2401 • Zone B</p>
              </div>
              <div className="live-dot shrink-0" title="On Duty" />
            </div>
          </div>
        )}

        {/* Collapse Button */}
        <div className={cn("border-t border-border p-3", !collapsed && "pt-0")}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  )
}
