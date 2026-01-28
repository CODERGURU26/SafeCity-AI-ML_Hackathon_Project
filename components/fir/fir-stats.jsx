"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react"

const getColorClasses = (color) => {
  switch (color) {
    case "primary":
      return "bg-primary/10 text-primary"
    case "warning":
      return "bg-warning/10 text-warning"
    case "success":
      return "bg-success/10 text-success"
    case "destructive":
      return "bg-destructive/10 text-destructive"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function FIRStats() {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    resolved: 0,
    highPriority: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Mock FIR data for stats calculation
        const mockFirs = [
          { id: "FIR001", status: "open", priority: "high" },
          { id: "FIR002", status: "open", priority: "medium" },
          { id: "FIR003", status: "closed", priority: "low" },
          { id: "FIR004", status: "open", priority: "high" },
          { id: "FIR005", status: "closed", priority: "high" },
          { id: "FIR006", status: "open", priority: "low" },
          { id: "FIR007", status: "closed", priority: "medium" },
          { id: "FIR008", status: "open", priority: "high" },
          { id: "FIR009", status: "closed", priority: "high" },
          { id: "FIR010", status: "open", priority: "medium" },
        ]

        // Calculate stats from mock data
        const statsData = {
          total: mockFirs.length,
          open: mockFirs.filter((fir) => fir.status === "open").length,
          resolved: mockFirs.filter((fir) => fir.status === "closed").length,
          highPriority: mockFirs.filter((fir) => fir.priority === "high").length,
        }

        setStats(statsData)
      } catch (error) {
        console.error("Error calculating stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total FIRs",
      value: stats.total.toLocaleString(),
      subtitle: "All records",
      icon: FileText,
      color: "primary",
    },
    {
      title: "Open Cases",
      value: stats.open.toLocaleString(),
      subtitle: "Pending review",
      icon: Clock,
      color: "warning",
    },
    {
      title: "Resolved",
      value: stats.resolved.toLocaleString(),
      subtitle: "Closed cases",
      icon: CheckCircle,
      color: "success",
    },
    {
      title: "High Priority",
      value: stats.highPriority.toLocaleString(),
      subtitle: "Requires attention",
      icon: AlertTriangle,
      color: "destructive",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {statCards.map((stat) => (
        <Card key={stat.title} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${getColorClasses(stat.color)}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {loading ? "-" : stat.value}
                </h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-xs text-muted-foreground/70">{stat.subtitle}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
