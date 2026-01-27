"use client"

import { Card, CardContent } from "@/components/ui/card"
import { FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react"

const stats = [
  {
    title: "Total FIRs",
    value: "1,247",
    subtitle: "This month",
    icon: FileText,
    color: "primary",
  },
  {
    title: "Open Cases",
    value: "342",
    subtitle: "Pending review",
    icon: Clock,
    color: "warning",
  },
  {
    title: "Resolved",
    value: "856",
    subtitle: "Closed cases",
    icon: CheckCircle,
    color: "success",
  },
  {
    title: "High Priority",
    value: "49",
    subtitle: "Requires attention",
    icon: AlertTriangle,
    color: "destructive",
  },
]

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
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${getColorClasses(stat.color)}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
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
