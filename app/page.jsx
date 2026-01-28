"use client"

import { useState, useEffect } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { CrimeMap } from "@/components/dashboard/crime-map"
import { QuickFilters } from "@/components/dashboard/quick-filters"
import TopCases, { ActiveOfficers } from "@/components/dashboard/top-cases"
// import 'leaflet/dist/leaflet.css';

export default function DashboardPage() {
  const [filters, setFilters] = useState({
    crimeType: "all",
  })
  const [mounted, setMounted] = useState(false)

  // Load filters from localStorage on mount
  useEffect(() => {
    const savedFilters = localStorage.getItem("dashboardFilters")
    if (savedFilters) {
      try {
        setFilters(JSON.parse(savedFilters))
      } catch (error) {
        console.error("Error loading filters:", error)
      }
    }
    setMounted(true)
  }, [])

  // Save filters to localStorage whenever they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("dashboardFilters", JSON.stringify(filters))
    }
  }, [filters, mounted])

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters)
  }

  const handleResetFilters = () => {
    setFilters({
      crimeType: "all",
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Real-time crime monitoring and analytics</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Map + Activity */}
          <div className="lg:col-span-2 space-y-6">
            <CrimeMap filters={filters} />
            <TopCases />
            <ActiveOfficers />
          </div>

          {/* Sidebar Widgets */}
          <div className="space-y-6">
            <QuickFilters onApplyFilters={handleApplyFilters} onResetFilters={handleResetFilters} />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
