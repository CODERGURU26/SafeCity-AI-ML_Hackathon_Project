"use client"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown, AlertTriangle, FileText, Shield, Clock } from "lucide-react"

function SkeletonCard() {
  return (
    <div className="rounded-xl p-5 stat-card-primary card-lift">
      <div className="flex items-center justify-between mb-4">
        <div className="skeleton h-10 w-10 rounded-lg" />
        <div className="skeleton h-5 w-12 rounded" />
      </div>
      <div className="skeleton h-8 w-20 rounded mb-1" />
      <div className="skeleton h-4 w-28 rounded" />
    </div>
  )
}

export function StatsCards() {
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
        console.error("Stats fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
    const interval = setInterval(fetchStats, 60000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
      </div>
    )
  }

  const cards = [
    {
      title: "Total FIRs Today",
      value: stats?.totalFIRsToday ?? 0,
      sub: `${stats?.totalFIRsAll ?? 0} total all-time`,
      change: stats?.todayChange ?? "+0%",
      trendUp: (stats?.todayChange ?? "").startsWith("+"),
      icon: FileText,
      cardClass: "stat-card-primary",
      iconClass: "bg-primary/15 text-primary",
      goodUp: true,
    },
    {
      title: "Active Alerts",
      value: stats?.activeAlerts ?? 0,
      sub: `${stats?.highPriority ?? 0} high priority`,
      change: `${stats?.openCases ?? 0} open`,
      trendUp: (stats?.activeAlerts ?? 0) > 0,
      icon: AlertTriangle,
      cardClass: "stat-card-danger",
      iconClass: "bg-destructive/15 text-destructive",
      goodUp: false,
    },
    {
      title: "Resolved Cases",
      value: stats?.closedCases ?? 0,
      sub: `${stats?.resolutionRate ?? 0}% resolution rate`,
      change: `+${stats?.closedCases ?? 0}`,
      trendUp: true,
      icon: Shield,
      cardClass: "stat-card-success",
      iconClass: "bg-success/15 text-success",
      goodUp: true,
    },
    {
      title: "Avg Response Time",
      value: stats?.avgResponseTime ?? "—",
      sub: "Per incident dispatch",
      change: "-15%",
      trendUp: false,
      icon: Clock,
      cardClass: "stat-card-warning",
      iconClass: "bg-warning/15 text-warning",
      goodUp: false,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <div
          key={card.title}
          className={`rounded-xl p-5 card-lift fade-in ${card.cardClass}`}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.iconClass}`}>
              <card.icon className="h-5 w-5" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5 ${
              card.trendUp && card.goodUp
                ? "bg-success/10 text-success"
                : !card.trendUp && !card.goodUp
                ? "bg-success/10 text-success"
                : card.trendUp && !card.goodUp
                ? "bg-destructive/10 text-destructive"
                : "bg-muted text-muted-foreground"
            }`}>
              {card.trendUp
                ? <TrendingUp className="h-3 w-3" />
                : <TrendingDown className="h-3 w-3" />}
              <span>{card.change}</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-foreground tabular-nums">{card.value}</h3>
          <p className="text-sm font-medium text-foreground/70 mt-0.5">{card.title}</p>
          <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
        </div>
      ))}
    </div>
  )
}
