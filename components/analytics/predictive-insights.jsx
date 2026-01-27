"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, TrendingDown, MapPin, Clock } from "lucide-react"

const insights = [
  {
    id: 1,
    title: "High Risk Alert",
    description: "Predicted 23% increase in theft incidents in Andheri West between 6 PM - 10 PM this weekend",
    type: "warning",
    icon: AlertTriangle,
    confidence: 87,
  },
  {
    id: 2,
    title: "Positive Trend",
    description: "Assault cases in Zone 2 have decreased by 15% compared to last month",
    type: "success",
    icon: TrendingDown,
    confidence: 92,
  },
  {
    id: 3,
    title: "Hotspot Emerging",
    description: "New crime cluster detected near Kurla station - recommend increased patrolling",
    type: "alert",
    icon: MapPin,
    confidence: 78,
  },
  {
    id: 4,
    title: "Peak Hours Shift",
    description: "Crime peak hours shifting from 8-10 PM to 6-8 PM in commercial areas",
    type: "info",
    icon: Clock,
    confidence: 84,
  },
]

const getTypeStyles = (type) => {
  switch (type) {
    case "warning":
      return {
        border: "border-warning/30",
        bg: "bg-warning/5",
        iconBg: "bg-warning/10",
        iconColor: "text-warning",
        badge: "bg-warning/10 text-warning border-warning/30",
      }
    case "success":
      return {
        border: "border-success/30",
        bg: "bg-success/5",
        iconBg: "bg-success/10",
        iconColor: "text-success",
        badge: "bg-success/10 text-success border-success/30",
      }
    case "alert":
      return {
        border: "border-destructive/30",
        bg: "bg-destructive/5",
        iconBg: "bg-destructive/10",
        iconColor: "text-destructive",
        badge: "bg-destructive/10 text-destructive border-destructive/30",
      }
    default:
      return {
        border: "border-primary/30",
        bg: "bg-primary/5",
        iconBg: "bg-primary/10",
        iconColor: "text-primary",
        badge: "bg-primary/10 text-primary border-primary/30",
      }
  }
}

export function PredictiveInsights() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <TrendingUp className="h-5 w-5 text-primary" />
          Predictive Insights
          <Badge className="ml-auto bg-primary/10 text-primary border-primary/30">AI Powered</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {insights.map((insight) => {
          const styles = getTypeStyles(insight.type)
          return (
            <div
              key={insight.id}
              className={`rounded-lg border p-4 transition-colors hover:border-primary/30 ${styles.border} ${styles.bg}`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${styles.iconBg}`}>
                  <insight.icon className={`h-5 w-5 ${styles.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold text-foreground">{insight.title}</h4>
                    <Badge variant="outline" className={styles.badge}>
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
