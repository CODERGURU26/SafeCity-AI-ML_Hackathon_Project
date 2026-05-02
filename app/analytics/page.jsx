"use client"

import { useState, useEffect } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { CrimeAnalyticsFiltered } from "@/components/analytics/crime-analytics-filtered"
import { PredictiveInsightsAnalytics } from "@/components/analytics/predictive-insights-analytics"
import {
  TrendingUp, TrendingDown, Target, AlertCircle,
  Loader2, BarChart3,
} from "lucide-react"

const COLOR_CONFIG = {
  primary: { card: "stat-card-primary",  icon: "bg-primary/15 text-primary" },
  success: { card: "stat-card-success",  icon: "bg-success/15 text-success" },
  warning: { card: "stat-card-warning",  icon: "bg-warning/15 text-warning" },
}

export default function AnalyticsPage() {
  const [crimeData, setCrimeData] = useState([])
  const [liveStats, setLiveStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats and crime data concurrently
        const [statsRes, firRes] = await Promise.all([
          fetch("/api/dashboard/stats"),
          fetch("/api/fir?limit=200&page=1"),
        ])

        if (statsRes.ok) {
          const s = await statsRes.json()
          if (s.success) setLiveStats(s.data)
        }

        if (firRes.ok) {
          const f = await firRes.json()
          if (f.success && f.data?.length > 0) {
            // Map MongoDB FIR fields → analytics format
            const mapped = f.data.map(fir => ({
              "Report Number": fir.firId,
              "Date Reported": fir.date,
              "Date of Occurrence": fir.date,
              "Time of Occurrence": fir.time || "00:00:00",
              "City": fir.location,
              "Crime Code": fir.type,
              "Crime Description": fir.type,
              "Victim Age": "",
              "Victim Gender": "",
              "Weapon Used": "None",
              "Crime Domain": fir.type,
              "Police Deployed": "5",
              "Case Closed": fir.status === "closed" ? "Yes" : "No",
            }))
            setCrimeData(mapped)
          }
        }
      } catch (err) {
        console.error("Analytics fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const analyticsStats = liveStats
    ? [
        {
          title: "Total Incidents",
          value: liveStats.totalFIRsAll?.toLocaleString() ?? "—",
          change: liveStats.todayChange ?? "—",
          trendUp: (liveStats.todayChange ?? "").startsWith("+"),
          icon: AlertCircle,
          color: "primary",
        },
        {
          title: "Resolution Rate",
          value: `${liveStats.resolutionRate ?? 0}%`,
          change: `${liveStats.closedCases ?? 0} closed`,
          trendUp: parseFloat(liveStats.resolutionRate) > 50,
          icon: Target,
          color: "success",
        },
        {
          title: "Open Cases",
          value: liveStats.openCases?.toLocaleString() ?? "—",
          change: `${liveStats.investigating ?? 0} investigating`,
          trendUp: false,
          icon: TrendingDown,
          color: "warning",
        },
        {
          title: "High Priority",
          value: liveStats.highPriority?.toLocaleString() ?? "—",
          change: "Needs attention",
          trendUp: false,
          icon: TrendingUp,
          color: "primary",
        },
      ]
    : []

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Crime Analytics
            </h1>
            <p className="text-sm text-muted-foreground">
              Comprehensive crime data analysis and predictive insights
            </p>
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {loading ? (
            [1,2,3,4].map(i => (
              <div key={i} className="rounded-xl p-4 stat-card-primary">
                <div className="skeleton h-10 w-10 rounded-lg mb-3" />
                <div className="skeleton h-7 w-16 rounded mb-1" />
                <div className="skeleton h-3 w-24 rounded" />
              </div>
            ))
          ) : (
            analyticsStats.map((stat, i) => {
              const cfg = COLOR_CONFIG[stat.color] || COLOR_CONFIG.primary
              return (
                <div
                  key={stat.title}
                  className={`rounded-xl p-4 card-lift fade-in ${cfg.card}`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${cfg.icon}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
                      stat.trendUp ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground tabular-nums">{stat.value}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.title}</p>
                </div>
              )
            })
          )}
        </div>

        {/* Charts */}
        {loading ? (
          <div className="flex items-center justify-center h-64 rounded-xl border border-border bg-card">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm">Loading crime data...</p>
            </div>
          </div>
        ) : crimeData.length > 0 ? (
          <CrimeAnalyticsFiltered data={crimeData} />
        ) : (
          <div className="flex items-center justify-center h-64 rounded-xl border border-border bg-card">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <BarChart3 className="h-8 w-8 opacity-30" />
              <p className="text-sm">No FIR data found. Add some FIRs to see analytics.</p>
            </div>
          </div>
        )}

        {/* Predictive Insights */}
        <div>
          <PredictiveInsightsAnalytics />
        </div>
      </div>
    </AppShell>
  )
}
