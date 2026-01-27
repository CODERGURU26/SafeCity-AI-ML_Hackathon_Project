"use client"

import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"

export function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64 transition-all duration-300">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
