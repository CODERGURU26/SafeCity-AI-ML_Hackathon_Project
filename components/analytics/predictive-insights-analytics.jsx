"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, TrendingDown, MapPin, Clock, Zap } from "lucide-react"

const insights = [
  {
    type: "high-risk-alert",
    title: "High Risk Alert",
    description: "Predicted 23% increase in theft incidents in Andheri West between 6 - 10 PM this weekend",
    confidence: "87%",
    icon: AlertTriangle,
    color: "bg-red-500/10 text-red-500",
  },
  {
    type: "positive-trend",
    title: "Positive Trend",
    description: "Assault cases have decreased by 15% compared to last month. Police strategies showing positive results.",
    confidence: "92%",
    icon: TrendingDown,
    color: "bg-green-500/10 text-green-500",
  },
  {
    type: "hotspot",
    title: "Hotspot Emerging",
    description: "New crime cluster detected near Kurla station with 45% increase in mobile theft. Recommend increased patrolling.",
    confidence: "78%",
    icon: MapPin,
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    type: "peak-hours",
    title: "Peak Hours Shift",
    description: "Crime peak hours shifting from 20:00 to 18:00 in commercial areas. Adjust patrol schedules accordingly.",
    confidence: "94%",
    icon: Clock,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    type: "resource-optimization",
    title: "Resource Optimization",
    description: "Data suggests reallocating 15% of resources from South Mumbai to North Mumbai for better coverage.",
    confidence: "85%",
    icon: Zap,
    color: "bg-purple-500/10 text-purple-500",
  },
]

export function PredictiveInsightsAnalytics() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Predictive Insights</h2>
        <span className="text-sm text-muted-foreground">AI Powered</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {insights.map((insight) => {
          const IconComponent = insight.icon
          return (
            <Card key={insight.type} className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${insight.color}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-500">
                      {insight.confidence} confidence
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground">{insight.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        style={{ width: insight.confidence }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Actionable Recommendations */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white flex-shrink-0">
              1
            </div>
            <p className="text-sm text-foreground">
              Increase police presence in Andheri West between 6-10 PM on weekends to counter predicted theft surge
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white flex-shrink-0">
              2
            </div>
            <p className="text-sm text-foreground">Deploy specialized mobile theft units to Kurla station area</p>
          </div>
          <div className="flex gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white flex-shrink-0">
              3
            </div>
            <p className="text-sm text-foreground">Adjust shift timing from 20:00 to 18:00 for commercial area patrols</p>
          </div>
          <div className="flex gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white flex-shrink-0">
              4
            </div>
            <p className="text-sm text-foreground">Reallocate 15% resources from South to North Mumbai starting next month</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
