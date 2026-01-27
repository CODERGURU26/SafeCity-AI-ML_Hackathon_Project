"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, AlertTriangle, FileText, Shield, Clock } from "lucide-react"

const stats = [
  {
    title: "Total FIRs Today",
    value: "247",
    change: "+12%",
    trend: "up",
    icon: FileText,
    color: "primary",
  },
  {
    title: "Active Alerts",
    value: "18",
    change: "+3",
    trend: "up",
    icon: AlertTriangle,
    color: "destructive",
  },
  {
    title: "Resolved Cases",
    value: "89",
    change: "+8%",
    trend: "up",
    icon: Shield,
    color: "success",
  },
  {
    title: "Avg Response Time",
    value: "4.2m",
    change: "-15%",
    trend: "down",
    icon: Clock,
    color: "warning",
  },
]

const getColorClasses = (color) => {
  switch (color) {
    case "primary":
      return "bg-primary/10 text-primary"
    case "destructive":
      return "bg-destructive/10 text-destructive"
    case "success":
      return "bg-success/10 text-success"
    case "warning":
      return "bg-warning/10 text-warning"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border-border hover:border-primary/30 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getColorClasses(stat.color)}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.trend === "up" && stat.color !== "destructive" ? "text-success" : stat.trend === "down" && stat.color === "warning" ? "text-success" : "text-destructive"}`}>
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
