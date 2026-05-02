"use client"

import { AppShell } from "@/components/layout/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Users, MapPin, AlertCircle, Loader2, RefreshCw, TrendingUp, BarChart3 } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"

function SummarySkeleton() {
  return (
    <div className="skeleton rounded-xl h-28 w-full" />
  )
}

const STATUS_STYLES = {
  optimal:  "bg-success/10 text-success border-success/30",
  warning:  "bg-warning/10 text-warning border-warning/30",
  critical: "bg-destructive/10 text-destructive border-destructive/30",
}

const STATUS_BAR_COLOR = {
  optimal:  "bg-success",
  warning:  "bg-warning",
  critical: "bg-destructive",
}

export default function PoliceAllocationPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({ allocatedOfficers: "", availableOfficers: "", requiredOfficers: "" })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fetchAllocations = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/allocation")
      if (res.ok) {
        const json = await res.json()
        if (json.success) setData(json.data)
      }
    } catch (err) {
      console.error("Allocation fetch error:", err)
      toast.error("Failed to load allocation data")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAllocations()
  }, [fetchAllocations])

  // Computed summary totals from real data
  const totals = data.reduce(
    (acc, item) => ({
      allocated: acc.allocated + (item.allocatedOfficers || 0),
      available: acc.available + (item.availableOfficers || 0),
      required: acc.required + (item.requiredOfficers || 0),
      critical: acc.critical + (item.status === "critical" ? 1 : 0),
    }),
    { allocated: 0, available: 0, required: 0, critical: 0 }
  )

  const handleEditClick = (item) => {
    setEditingItem(item)
    setFormData({
      allocatedOfficers: item.allocatedOfficers,
      availableOfficers: item.availableOfficers,
      requiredOfficers: item.requiredOfficers,
    })
    setIsDialogOpen(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }))
  }

  const handleSave = async () => {
    if (!editingItem?._id) return
    setSaving(true)
    try {
      const res = await fetch(`/api/allocation/${editingItem._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setData(prev => prev.map(item => item._id === editingItem._id ? json.data : item))
        toast.success(`Allocation updated for ${editingItem.location}`)
        setIsDialogOpen(false)
        setEditingItem(null)
      } else {
        toast.error(json.error || "Failed to save changes")
      }
    } catch (err) {
      toast.error("Network error. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const getEfficiencyPct = (item) =>
    item.requiredOfficers > 0
      ? Math.min(100, Math.round((item.availableOfficers / item.requiredOfficers) * 100))
      : 100

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Police Allocation</h1>
              <p className="text-sm text-muted-foreground">
                Manage officer distribution across all zones
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-border"
            onClick={fetchAllocations}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {loading ? (
            [1,2,3,4].map(i => <SummarySkeleton key={i} />)
          ) : (
            <>
              <div className="rounded-xl p-5 stat-card-primary card-lift fade-in">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Total</span>
                </div>
                <p className="text-3xl font-bold text-foreground tabular-nums">{totals.allocated}</p>
                <p className="text-sm text-muted-foreground mt-1">Allocated Officers</p>
              </div>

              <div className="rounded-xl p-5 stat-card-success card-lift fade-in" style={{ animationDelay: "70ms" }}>
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-5 w-5 text-success" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Active</span>
                </div>
                <p className="text-3xl font-bold text-foreground tabular-nums">{totals.available}</p>
                <p className="text-sm text-muted-foreground mt-1">Available Officers</p>
              </div>

              <div className="rounded-xl p-5 stat-card-warning card-lift fade-in" style={{ animationDelay: "140ms" }}>
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-5 w-5 text-warning" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Needed</span>
                </div>
                <p className="text-3xl font-bold text-foreground tabular-nums">{totals.required}</p>
                <p className="text-sm text-muted-foreground mt-1">Required Officers</p>
              </div>

              <div className="rounded-xl p-5 stat-card-danger card-lift fade-in" style={{ animationDelay: "210ms" }}>
                <div className="flex items-center justify-between mb-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Critical</span>
                </div>
                <p className="text-3xl font-bold text-foreground tabular-nums">{totals.critical}</p>
                <p className="text-sm text-muted-foreground mt-1">Critical Zones</p>
              </div>
            </>
          )}
        </div>

        {/* Allocation Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm text-foreground">Zone-wise Allocation</span>
              {!loading && (
                <Badge variant="outline" className="text-[10px] border-border text-muted-foreground">
                  {data.length} zones
                </Badge>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2 text-sm text-muted-foreground">Loading zones...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground font-semibold text-xs">Zone</TableHead>
                    <TableHead className="text-center text-muted-foreground font-semibold text-xs">Allocated</TableHead>
                    <TableHead className="text-center text-muted-foreground font-semibold text-xs">Available</TableHead>
                    <TableHead className="text-center text-muted-foreground font-semibold text-xs">Required</TableHead>
                    <TableHead className="text-muted-foreground font-semibold text-xs">Capacity</TableHead>
                    <TableHead className="text-center text-muted-foreground font-semibold text-xs">Status</TableHead>
                    <TableHead className="text-right text-muted-foreground font-semibold text-xs">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item, i) => {
                    const pct = getEfficiencyPct(item)
                    return (
                      <TableRow
                        key={item._id}
                        className="border-border hover:bg-secondary/30 fade-in"
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <span className="text-sm font-medium text-foreground">{item.location}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-sm font-bold text-foreground">{item.allocatedOfficers}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`text-sm font-bold ${
                            item.availableOfficers >= item.requiredOfficers ? "text-success" : "text-warning"
                          }`}>
                            {item.availableOfficers}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-sm text-muted-foreground">{item.requiredOfficers}</span>
                        </TableCell>
                        <TableCell className="min-w-[120px]">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[10px] text-muted-foreground">
                              <span>Capacity</span>
                              <span>{pct}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${STATUS_BAR_COLOR[item.status] || "bg-primary"}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className={`text-xs font-semibold rounded-full border px-2.5 py-1 capitalize ${STATUS_STYLES[item.status] || ""}`}>
                            {item.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 border-border hover:border-primary/40 hover:text-primary"
                            onClick={() => handleEditClick(item)}
                          >
                            Adjust
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-card border-border shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Edit: {editingItem?.location}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Adjust officer numbers. Status is automatically computed.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2">
              {[
                { id: "allocatedOfficers", label: "Allocated Officers", hint: "Total officers assigned to zone" },
                { id: "availableOfficers", label: "Available Officers", hint: "Officers currently on duty" },
                { id: "requiredOfficers", label: "Required Officers", hint: "Recommended minimum for zone" },
              ].map(field => (
                <div key={field.id} className="space-y-1.5">
                  <Label htmlFor={field.id} className="text-sm font-medium text-foreground">
                    {field.label}
                  </Label>
                  <Input
                    id={field.id}
                    name={field.id}
                    type="number"
                    value={formData[field.id]}
                    onChange={handleInputChange}
                    className="bg-secondary border-border text-foreground h-9"
                    min="0"
                  />
                  <p className="text-[11px] text-muted-foreground">{field.hint}</p>
                </div>
              ))}

              {/* Live status preview */}
              {formData.requiredOfficers > 0 && (
                <div className="rounded-lg bg-secondary/50 border border-border p-3">
                  <p className="text-xs text-muted-foreground mb-1">Status Preview</p>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const ratio = formData.availableOfficers / formData.requiredOfficers
                      const status = ratio >= 0.7 ? "optimal" : ratio >= 0.4 ? "warning" : "critical"
                      return (
                        <span className={`text-xs font-semibold rounded-full border px-2.5 py-0.5 capitalize ${STATUS_STYLES[status]}`}>
                          → {status}
                        </span>
                      )
                    })()}
                    <span className="text-xs text-muted-foreground">
                      ({Math.round((formData.availableOfficers / formData.requiredOfficers) * 100)}% capacity)
                    </span>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-border text-foreground hover:bg-secondary"
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  )
}
