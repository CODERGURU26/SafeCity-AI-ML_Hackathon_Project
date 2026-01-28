import { AppShell } from "@/components/layout/app-shell"
import { CrimeTrendChart } from "@/components/analytics/crime-trend-chart"
import { CrimeDistributionChart } from "@/components/analytics/crime-distribution-chart"
import { ZoneComparisonChart } from "@/components/analytics/zone-comparison-chart"
import { HourlyPatternChart } from "@/components/analytics/hourly-pattern-chart"
import { PredictiveInsights } from "@/components/analytics/predictive-insights"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Target, AlertCircle } from "lucide-react"

const analyticsStats = [
  {
    title: "Total Incidents",
    value: "4,287",
    change: "+8.2%",
    trend: "up",
    icon: AlertCircle,
    color: "primary",
  },
  {
    title: "Resolution Rate",
    value: "78.5%",
    change: "+3.1%",
    trend: "up",
    icon: Target,
    color: "success",
  },
  {
    title: "Avg Response Time",
    value: "4.2 min",
    change: "-12%",
    trend: "down",
    icon: TrendingDown,
    color: "warning",
  },
  {
    title: "Predictions Accuracy",
    value: "89.3%",
    change: "+2.4%",
    trend: "up",
    icon: TrendingUp,
    color: "primary",
  },
]

const getColorClasses = (color) => {
  switch (color) {
    case "primary":
      return "bg-primary/10 text-primary"
    case "success":
      return "bg-success/10 text-success"
    case "warning":
      return "bg-warning/10 text-warning"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function AnalyticsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Crime Analytics</h1>
          <p className="text-muted-foreground">Comprehensive crime data analysis and predictive insights</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          {analyticsStats.map((stat) => (
            <Card key={stat.title} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${getColorClasses(stat.color)}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <span className={`text-sm ${stat.trend === "up" && stat.color !== "warning" ? "text-success" : stat.trend === "down" && stat.color === "warning" ? "text-success" : "text-muted-foreground"}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <CrimeTrendChart />
          <CrimeDistributionChart />
          <ZoneComparisonChart />
          <PredictiveInsights />
        </div>

        {/* Full Width Chart */}
        <HourlyPatternChart />
      </div>
    </AppShell>
  )
}
