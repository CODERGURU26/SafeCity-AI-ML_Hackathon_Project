"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { FIRTable } from "@/components/fir/fir-table"
import { FIRFilters } from "@/components/fir/fir-filters"
import { FIRStats } from "@/components/fir/fir-stats"

export default function FIRDataPage() {
  const [activeFilters, setActiveFilters] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">FIR Data Management</h1>
          <p className="text-muted-foreground">View, manage, and analyze First Information Reports</p>
        </div>

        {/* Stats */}
        <FIRStats />

        {/* Filters */}
        <FIRFilters 
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Table */}
        <FIRTable 
          activeFilters={activeFilters}
          searchQuery={searchQuery}
        />

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing 1-8 of 1,247 records
          </p>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
              Previous
            </button>
            <button className="rounded-lg border border-primary bg-primary/10 px-3 py-1.5 text-sm text-primary">
              1
            </button>
            <button className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
              2
            </button>
            <button className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
              3
            </button>
            <span className="text-muted-foreground">...</span>
            <button className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
              156
            </button>
            <button className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
