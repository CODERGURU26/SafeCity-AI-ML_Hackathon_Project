"use client"

import { useState, useEffect } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { CrimeAnalyticsFiltered } from "@/components/analytics/crime-analytics-filtered"
import { PredictiveInsightsAnalytics } from "@/components/analytics/predictive-insights-analytics"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Target, AlertCircle } from "lucide-react"

export const dynamic = 'force-dynamic'

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

// Sample crime data (replace with real data from API if available)
const sampleCrimeData = [
  {
    "Report Number": "MUM800001",
    "Date Reported": "2023-10-19",
    "Date of Occurrence": "2023-10-17",
    "Time of Occurrence": "18:49:00",
    "City": "Andheri",
    "Crime Code": "276",
    "Crime Description": "Road accident FIR",
    "Victim Age": "34",
    "Victim Gender": "Other",
    "Weapon Used": "None",
    "Crime Domain": "Violent Crime",
    "Police Deployed": "7",
    "Case Closed": "Yes",
  },
  {
    "Report Number": "MUM800002",
    "Date Reported": "2024-03-04",
    "Date of Occurrence": "2024-02-28",
    "Time of Occurrence": "03:04:00",
    "City": "Andheri",
    "Crime Code": "882",
    "Crime Description": "Burglary",
    "Victim Age": "80",
    "Victim Gender": "Female",
    "Weapon Used": "Glass bottle",
    "Crime Domain": "Traffic",
    "Police Deployed": "7",
    "Case Closed": "No",
  },
  {
    "Report Number": "MUM800003",
    "Date Reported": "2022-09-02",
    "Date of Occurrence": "2022-09-02",
    "Time of Occurrence": "13:45:00",
    "City": "Andheri",
    "Crime Code": "728",
    "Crime Description": "Cyber fraud",
    "Victim Age": "80",
    "Victim Gender": "Other",
    "Weapon Used": "None",
    "Crime Domain": "Property Crime",
    "Police Deployed": "5",
    "Case Closed": "No",
  },
  {
    "Report Number": "MUM800004",
    "Date Reported": "2024-05-10",
    "Date of Occurrence": "2024-05-09",
    "Time of Occurrence": "15:30:00",
    "City": "Dadar",
    "Crime Code": "115",
    "Crime Description": "Mobile theft",
    "Victim Age": "45",
    "Victim Gender": "Male",
    "Weapon Used": "None",
    "Crime Domain": "Cyber Crime",
    "Police Deployed": "4",
    "Case Closed": "Yes",
  },
  {
    "Report Number": "MUM800005",
    "Date Reported": "2024-06-15",
    "Date of Occurrence": "2024-06-14",
    "Time of Occurrence": "20:15:00",
    "City": "Bandra",
    "Crime Code": "250",
    "Crime Description": "Assault",
    "Victim Age": "32",
    "Victim Gender": "Female",
    "Weapon Used": "Knife",
    "Crime Domain": "Violent Crime",
    "Police Deployed": "6",
    "Case Closed": "Yes",
  },
]

export default function AnalyticsPage() {
  const [crimeData, setCrimeData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Use sample data for now - in production, fetch from API
    setTimeout(() => {
      setCrimeData(sampleCrimeData)
      setLoading(false)
    }, 500)
  }, [])

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Crime Analytics Dashboard</h1>
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
                  <span
                    className={`text-sm ${stat.trend === "up" && stat.color !== "warning"
                        ? "text-success"
                        : stat.trend === "down" && stat.color === "warning"
                          ? "text-success"
                          : "text-muted-foreground"
                      }`}
                  >
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

        {/* Data-Driven Analytics Charts */}
        {!loading && <CrimeAnalyticsFiltered data={crimeData} />}

        {/* Predictive Insights */}
        <div className="mt-8">
          <PredictiveInsightsAnalytics />
        </div>
      </div>
    </AppShell>
  )
}
