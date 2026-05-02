"use client"

import { useState, useEffect } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { CrimeMap } from "@/components/dashboard/crime-map"
import { QuickFilters } from "@/components/dashboard/quick-filters"
import TopCases, { ActiveOfficers } from "@/components/dashboard/top-cases"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Radio } from "lucide-react"

export default function DashboardPage() {
  const [filters, setFilters] = useState({ crimeType: "all" })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedFilters = localStorage.getItem("dashboardFilters")
    if (savedFilters) {
      try { setFilters(JSON.parse(savedFilters)) } catch {}
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) localStorage.setItem("dashboardFilters", JSON.stringify(filters))
  }, [filters, mounted])

  if (!mounted) return null

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Radio className="h-5 w-5 text-primary" />
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                Live Monitoring
              </h1>
              <div className="flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 ml-1">
                <span className="live-dot" style={{ width: 6, height: 6 }} />
                <span className="text-[10px] font-semibold text-success">Live</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Real-time crime monitoring, FIR tracking, and officer deployment
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Map + Cases + Officers */}
          <div className="lg:col-span-2 space-y-5">
            <CrimeMap filters={filters} />
            <TopCases />
            <ActiveOfficers />
          </div>

          {/* Sidebar: Filters + Activity */}
          <div className="space-y-5">
            <QuickFilters
              onApplyFilters={setFilters}
              onResetFilters={() => setFilters({ crimeType: "all" })}
            />
            <RecentActivity />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
