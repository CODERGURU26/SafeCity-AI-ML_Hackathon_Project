"use client"

import { useEffect, useState } from "react"
import { Bell, AlertTriangle, Radio, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function Topbar() {
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")
  const [stats, setStats] = useState({ activeAlerts: 0, onDutyOfficers: 0 })
  const [notifications, setNotifications] = useState([])

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }))
      setDate(now.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }))
    }
    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  // Fetch live stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsRes, officersRes, activityRes] = await Promise.all([
          fetch("/api/dashboard/stats"),
          fetch("/api/officers?status=On Duty&limit=100"),
          fetch("/api/dashboard/activity"),
        ])

        if (statsRes.ok) {
          const s = await statsRes.json()
          if (s.success) {
            setStats(prev => ({ ...prev, activeAlerts: s.data.highPriority || 0 }))
          }
        }

        if (officersRes.ok) {
          const o = await officersRes.json()
          if (o.success) {
            setStats(prev => ({ ...prev, onDutyOfficers: o.pagination?.total || o.data?.length || 0 }))
          }
        }

        if (activityRes.ok) {
          const a = await activityRes.json()
          if (a.success) {
            const highPriorityItems = a.data
              .filter(item => item.severity === "high")
              .slice(0, 5)
            setNotifications(highPriorityItems)
          }
        }
      } catch (err) {
        console.error("Topbar stats error:", err)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 30000) // refresh every 30s
    return () => clearInterval(interval)
  }, [])

  // Determine shift
  const getShift = () => {
    const hour = new Date().getHours()
    if (hour >= 6 && hour < 14) return { label: "Morning", time: "06:00–14:00", color: "text-warning" }
    if (hour >= 14 && hour < 22) return { label: "Afternoon", time: "14:00–22:00", color: "text-primary" }
    return { label: "Night", time: "22:00–06:00", color: "text-blue-400" }
  }
  const shift = getShift()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Left: Notifications + Alert count */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              <Bell className="h-4.5 w-4.5" />
              {stats.activeAlerts > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-white alert-pulse">
                  {stats.activeAlerts > 9 ? "9+" : stats.activeAlerts}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-80 bg-card border-border shadow-xl">
            <DropdownMenuLabel className="flex items-center justify-between text-foreground">
              <span>Live Alerts</span>
              {stats.activeAlerts > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {stats.activeAlerts} Active
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />

            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No active alerts
              </div>
            ) : (
              notifications.map((n) => (
                <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-1 p-3 focus:bg-secondary cursor-pointer">
                  <div className="flex items-center gap-2 w-full">
                    <AlertTriangle className="h-3.5 w-3.5 text-destructive shrink-0" />
                    <span className="text-sm font-medium text-foreground flex-1 truncate">{n.title}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                  </div>
                  <span className="text-xs text-muted-foreground pl-5.5 truncate w-full">{n.description}</span>
                </DropdownMenuItem>
              ))
            )}

            {notifications.length > 0 && (
              <>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem className="text-center text-xs text-primary justify-center focus:bg-secondary">
                  View all alerts in FIR Data
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* High priority badge */}
        {stats.activeAlerts > 0 && (
          <div className="flex items-center gap-1.5 rounded-md bg-destructive/10 border border-destructive/25 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
            <span className="text-xs font-semibold text-destructive">
              {stats.activeAlerts} High Priority
            </span>
          </div>
        )}
      </div>

      {/* Center: Department + Shift */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <Radio className="h-3.5 w-3.5 text-primary" />
          <p className="text-sm font-bold tracking-wide text-foreground">
            Mumbai Police Department
          </p>
        </div>
        <p className={`text-[10px] font-medium ${shift.color}`}>
          {shift.label} Shift &bull; {shift.time}
        </p>
      </div>

      {/* Right: Clock + Officers */}
      <div className="flex items-center gap-3">
        {/* Officers on duty */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-md bg-secondary border border-border px-2.5 py-1.5">
          <Users className="h-3.5 w-3.5 text-success" />
          <span className="text-xs font-semibold text-foreground">{stats.onDutyOfficers}</span>
          <span className="text-[10px] text-muted-foreground">On Duty</span>
        </div>

        {/* Live Clock */}
        <div className="flex items-center gap-1.5 rounded-md bg-secondary border border-border px-2.5 py-1.5">
          <Clock className="h-3.5 w-3.5 text-primary" />
          <div className="text-right">
            <p className="text-xs font-bold text-foreground font-mono tabular-nums">{time}</p>
            <p className="text-[9px] text-muted-foreground leading-none">{date}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
