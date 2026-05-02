"use client"

import { useEffect, useState, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, FileText, MapPin, Shield, Clock, RefreshCw } from "lucide-react"

const TYPE_CONFIG = {
  alert:    { icon: AlertCircle, label: "Alert",    severity: "high" },
  fir:      { icon: FileText,    label: "FIR",      severity: "medium" },
  patrol:   { icon: Shield,      label: "Patrol",   severity: "low" },
  location: { icon: MapPin,      label: "Location", severity: "medium" },
  resolved: { icon: Shield,      label: "Resolved", severity: "success" },
}

const SEVERITY_CLASSES = {
  high:    "border-destructive/40 bg-destructive/8",
  medium:  "border-warning/40 bg-warning/8",
  low:     "border-border bg-secondary/40",
  success: "border-success/40 bg-success/8",
}

const SEVERITY_ICON_CLASSES = {
  high:    "text-destructive",
  medium:  "text-warning",
  low:     "text-muted-foreground",
  success: "text-success",
}

const SEVERITY_DOT = {
  high:    "bg-destructive",
  medium:  "bg-warning",
  low:     "bg-muted-foreground",
  success: "bg-success",
}

function ActivitySkeleton() {
  return (
    <div className="space-y-3">
      {[1,2,3,4].map(i => (
        <div key={i} className="rounded-lg border border-border p-3">
          <div className="flex items-start gap-3">
            <div className="skeleton h-4 w-4 rounded mt-0.5" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-3 w-32 rounded" />
              <div className="skeleton h-3 w-48 rounded" />
              <div className="skeleton h-2 w-16 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function RecentActivity() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState(null)

  const fetchActivity = useCallback(async () => {
    try {
      const res = await fetch("/api/dashboard/activity")
      if (res.ok) {
        const data = await res.json()
        if (data.success) {
          setActivities(data.data)
          setLastRefresh(new Date())
        }
      }
    } catch (err) {
      console.error("Activity fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchActivity()
    const interval = setInterval(fetchActivity, 30000)
    return () => clearInterval(interval)
  }, [fetchActivity])

  const formatRefresh = () => {
    if (!lastRefresh) return ""
    const diffSec = Math.floor((new Date() - lastRefresh) / 1000)
    if (diffSec < 5) return "just now"
    if (diffSec < 60) return `${diffSec}s ago`
    return `${Math.floor(diffSec / 60)}m ago`
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-foreground">Recent Activity</span>
          <div className="flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2 py-0.5">
            <span className="live-dot" style={{ width: 6, height: 6 }} />
            <span className="text-[10px] font-semibold text-success">Live</span>
          </div>
        </div>
        <button
          onClick={fetchActivity}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          title="Refresh"
        >
          <RefreshCw className="h-3 w-3" />
          <span className="hidden sm:inline">Refreshed {formatRefresh()}</span>
        </button>
      </div>

      {/* Activity List */}
      <ScrollArea className="h-[420px]">
        <div className="p-3 space-y-2">
          {loading ? (
            <ActivitySkeleton />
          ) : activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <FileText className="h-8 w-8 mb-2 opacity-30" />
              <p className="text-sm">No recent activity</p>
            </div>
          ) : (
            activities.map((activity, i) => {
              const config = TYPE_CONFIG[activity.type] || TYPE_CONFIG.fir
              const Icon = config.icon
              const sev = activity.severity || "low"

              return (
                <div
                  key={activity.id}
                  className={`rounded-lg border p-3 transition-colors hover:border-primary/30 fade-in ${SEVERITY_CLASSES[sev] || SEVERITY_CLASSES.low}`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 shrink-0 ${SEVERITY_ICON_CLASSES[sev] || ""}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="text-xs font-semibold text-foreground">{activity.title}</h4>
                        {sev === "high" && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-destructive bg-destructive/10 rounded px-1 py-0.5">
                            HIGH
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">{activity.description}</p>
                      <div className="mt-1.5 flex items-center gap-3">
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock className="h-2.5 w-2.5" />
                          <span>{activity.time}</span>
                        </div>
                        {activity.location && (
                          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <MapPin className="h-2.5 w-2.5" />
                            <span className="truncate">{activity.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${SEVERITY_DOT[sev]}`} />
                  </div>
                </div>
              )
            })
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
