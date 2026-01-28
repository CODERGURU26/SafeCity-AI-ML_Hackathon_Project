"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, FileText, MapPin, Shield, Clock } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "alert",
    title: "High Alert Issued",
    description: "Multiple incidents reported in Andheri West sector",
    time: "2 mins ago",
    icon: AlertCircle,
    severity: "high",
  },
  {
    id: 2,
    type: "fir",
    title: "New FIR Filed",
    description: "Case #2024-1847 - Vehicle theft reported",
    time: "8 mins ago",
    icon: FileText,
    severity: "medium",
  },
  {
    id: 3,
    type: "patrol",
    title: "Patrol Dispatched",
    description: "Unit 7 responding to Bandra location",
    time: "15 mins ago",
    icon: Shield,
    severity: "low",
  },
  {
    id: 4,
    type: "location",
    title: "Hotspot Detected",
    description: "Unusual activity pattern in Kurla East",
    time: "23 mins ago",
    icon: MapPin,
    severity: "medium",
  },
  {
    id: 5,
    type: "resolved",
    title: "Case Resolved",
    description: "Case #2024-1832 closed successfully",
    time: "45 mins ago",
    icon: Shield,
    severity: "success",
  },
  {
    id: 6,
    type: "fir",
    title: "FIR Updated",
    description: "Case #2024-1840 - New evidence added",
    time: "1 hour ago",
    icon: FileText,
    severity: "low",
  },
]

const getSeverityColor = (severity) => {
  switch (severity) {
    case "high":
      return "border-destructive/50 bg-destructive/10"
    case "medium":
      return "border-warning/50 bg-warning/10"
    case "low":
      return "border-border bg-secondary"
    case "success":
      return "border-success/50 bg-success/10"
    default:
      return "border-border bg-secondary"
  }
}

const getSeverityIconColor = (severity) => {
  switch (severity) {
    case "high":
      return "text-destructive"
    case "medium":
      return "text-warning"
    case "low":
      return "text-muted-foreground"
    case "success":
      return "text-success"
    default:
      return "text-muted-foreground"
  }
}

export function RecentActivity() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg font-semibold text-foreground">
          <span>Recent Activity</span>
          <Badge variant="outline" className="border-primary/50 text-primary">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[460px] pr-4">
          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className={`rounded-lg border p-3 transition-colors hover:border-primary/30 ${getSeverityColor(activity.severity)}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${getSeverityIconColor(activity.severity)}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground">{activity.title}</h4>
                    <p className="mt-0.5 text-xs text-muted-foreground truncate">{activity.description}</p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
