"use client"

import { useEffect, useState } from "react"
import { FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react"

const COLOR_CONFIG = {
  primary:     { card: "stat-card-primary",  icon: "bg-primary/15 text-primary" },
  warning:     { card: "stat-card-warning",  icon: "bg-warning/15 text-warning" },
  success:     { card: "stat-card-success",  icon: "bg-success/15 text-success" },
  destructive: { card: "stat-card-danger",   icon: "bg-destructive/15 text-destructive" },
}

export function FIRStats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard/stats")
        if (res.ok) {
          const data = await res.json()
          if (data.success) setStats(data.data)
        }
      } catch (err) {
        console.error("FIR Stats fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total FIRs",
      value: stats?.totalFIRsAll ?? 0,
      subtitle: "All time records",
      icon: FileText,
      color: "primary",
    },
    {
      title: "Open Cases",
      value: stats?.openCases ?? 0,
      subtitle: "Pending review",
      icon: Clock,
      color: "warning",
    },
    {
      title: "Resolved",
      value: stats?.closedCases ?? 0,
      subtitle: `${stats?.resolutionRate ?? 0}% resolution rate`,
      icon: CheckCircle,
      color: "success",
    },
    {
      title: "High Priority",
      value: stats?.highPriority ?? 0,
      subtitle: "Requires attention",
      icon: AlertTriangle,
      color: "destructive",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {statCards.map((stat, i) => {
        const cfg = COLOR_CONFIG[stat.color] || COLOR_CONFIG.primary
        return (
          <div
            key={stat.title}
            className={`rounded-xl p-4 card-lift fade-in ${cfg.card}`}
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${cfg.icon}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <h3 className="text-2xl font-bold text-foreground tabular-nums">
                  {loading ? (
                    <span className="skeleton inline-block h-7 w-14 rounded" />
                  ) : (
                    stat.value.toLocaleString()
                  )}
                </h3>
                <p className="text-sm font-medium text-foreground/70">{stat.title}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {loading ? "—" : stat.subtitle}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
