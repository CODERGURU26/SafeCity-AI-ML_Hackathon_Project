"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Filter, Download, Plus, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function FIRFilters({ activeFilters, setActiveFilters, searchQuery, setSearchQuery }) {
  const addFilter = (type, value) => {
    if (value && value !== "all") {
      const existing = activeFilters.find((f) => f.type === type)
      if (existing) {
        setActiveFilters((prev) =>
          prev.map((f) => (f.type === type ? { ...f, value } : f))
        )
      } else {
        setActiveFilters((prev) => [...prev, { type, value }])
      }
    }
  }

  const removeFilter = (type) => {
    setActiveFilters((prev) => prev.filter((f) => f.type !== type))
  }

  const clearAllFilters = () => {
    setActiveFilters([])
    setSearchQuery("")
  }

  return (
    <div className="space-y-4">
      {/* Main Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search FIR ID, complainant, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Status Filter */}
        <Select onValueChange={(value) => addFilter("status", value)}>
          <SelectTrigger className="w-[150px] bg-secondary border-border text-foreground">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all" className="text-foreground focus:bg-secondary">All Status</SelectItem>
            <SelectItem value="open" className="text-foreground focus:bg-secondary">Open</SelectItem>
            <SelectItem value="investigating" className="text-foreground focus:bg-secondary">Investigating</SelectItem>
            <SelectItem value="closed" className="text-foreground focus:bg-secondary">Closed</SelectItem>
          </SelectContent>
        </Select>

        {/* Crime Type Filter */}
        <Select onValueChange={(value) => addFilter("type", value)}>
          <SelectTrigger className="w-[150px] bg-secondary border-border text-foreground">
            <SelectValue placeholder="Crime Type" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all" className="text-foreground focus:bg-secondary">All Types</SelectItem>
            <SelectItem value="theft" className="text-foreground focus:bg-secondary">Theft</SelectItem>
            <SelectItem value="assault" className="text-foreground focus:bg-secondary">Assault</SelectItem>
            <SelectItem value="robbery" className="text-foreground focus:bg-secondary">Robbery</SelectItem>
            <SelectItem value="fraud" className="text-foreground focus:bg-secondary">Fraud</SelectItem>
            <SelectItem value="vandalism" className="text-foreground focus:bg-secondary">Vandalism</SelectItem>
            <SelectItem value="cyber" className="text-foreground focus:bg-secondary">Cyber Crime</SelectItem>
          </SelectContent>
        </Select>

        {/* Priority Filter */}
        <Select onValueChange={(value) => addFilter("priority", value)}>
          <SelectTrigger className="w-[150px] bg-secondary border-border text-foreground">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all" className="text-foreground focus:bg-secondary">All Priority</SelectItem>
            <SelectItem value="high" className="text-foreground focus:bg-secondary">High</SelectItem>
            <SelectItem value="medium" className="text-foreground focus:bg-secondary">Medium</SelectItem>
            <SelectItem value="low" className="text-foreground focus:bg-secondary">Low</SelectItem>
          </SelectContent>
        </Select>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline" className="border-border bg-secondary text-foreground hover:bg-primary/10 hover:text-primary">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
          <Button variant="outline" className="border-border bg-secondary text-foreground hover:bg-primary/10 hover:text-primary">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            New FIR
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {activeFilters.map((filter) => (
            <Badge
              key={filter.type}
              variant="outline"
              className="flex items-center gap-1 border-primary/30 bg-primary/10 text-primary"
            >
              <span className="capitalize">{filter.type}:</span>
              <span className="capitalize">{filter.value}</span>
              <button
                onClick={() => removeFilter(filter.type)}
                className="ml-1 hover:text-primary/70"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-6 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  )
}
