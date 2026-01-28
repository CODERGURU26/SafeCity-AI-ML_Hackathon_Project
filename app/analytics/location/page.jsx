"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { ChevronLeft, TrendingUp, AlertCircle, Target } from "lucide-react"
import Link from "next/link"

const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042", "#FF6B9D", "#C44569", "#1B9CFC"]

export default function LocationAnalyticsPage() {
  const searchParams = useSearchParams()
  const location = searchParams.get("location") || "Andheri"

  const [timeframeData, setTimeframeData] = useState([])
  const [crimeTypeData, setCrimeTypeData] = useState([])
  const [hourlyData, setHourlyData] = useState([])
  const [stats, setStats] = useState({})
  const [timeframe, setTimeframe] = useState("monthly")

  // Simulated data for the location
  const generateLocationData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    const timeData = months.map((month, idx) => ({
      name: month,
      crimes: Math.floor(50 + Math.random() * 100),
      police: Math.floor(5 + Math.random() * 12),
      closed: Math.floor(30 + Math.random() * 50),
    }))

    const crimeTypes = [
      { name: "Theft", value: 245, caseClosed: 178 },
      { name: "Assault", value: 156, caseClosed: 98 },
      { name: "Fraud", value: 134, caseClosed: 89 },
      { name: "Burglary", value: 98, caseClosed: 56 },
      { name: "Robbery", value: 67, caseClosed: 34 },
      { name: "Other", value: 120, caseClosed: 75 },
    ]

    const hourly = Array(24)
      .fill(0)
      .map((_, i) => ({
        hour: `${String(i).padStart(2, "0")}:00`,
        incidents: Math.floor(5 + Math.random() * 25),
      }))

    const totalCrimes = crimeTypes.reduce((sum, t) => sum + t.value, 0)
    const totalClosed = crimeTypes.reduce((sum, t) => sum + t.caseClosed, 0)

    setTimeframeData(timeData)
    setCrimeTypeData(crimeTypes)
    setHourlyData(hourly)
    setStats({
      total: totalCrimes,
      caseClosed: totalClosed,
      resolutionRate: ((totalClosed / totalCrimes) * 100).toFixed(1),
      avgPolice: 8,
    })
  }

  useEffect(() => {
    generateLocationData()
  }, [location])

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
          <p className="font-semibold text-foreground">{payload[0].payload.name || payload[0].payload.hour}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Link href="/analytics">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{location} Crime Analysis</h1>
            <p className="text-muted-foreground">Detailed analytics and predictive insights for {location}</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-green-500">+12%</span>
              </div>
              <div className="mt-3">
                <h3 className="text-2xl font-bold text-foreground">{stats.total}</h3>
                <p className="text-sm text-muted-foreground">Total Incidents</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                  <Target className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-green-500">+5%</span>
              </div>
              <div className="mt-3">
                <h3 className="text-2xl font-bold text-foreground">{stats.resolutionRate}%</h3>
                <p className="text-sm text-muted-foreground">Resolution Rate</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-green-500">+3%</span>
              </div>
              <div className="mt-3">
                <h3 className="text-2xl font-bold text-foreground">{stats.caseClosed}</h3>
                <p className="text-sm text-muted-foreground">Cases Closed</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-green-500">+2%</span>
              </div>
              <div className="mt-3">
                <h3 className="text-2xl font-bold text-foreground">{stats.avgPolice}</h3>
                <p className="text-sm text-muted-foreground">Avg Police Deployed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Filter */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Time Period Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              {["daily", "monthly", "yearly"].map((tf) => (
                <Button
                  key={tf}
                  variant={timeframe === tf ? "default" : "outline"}
                  onClick={() => setTimeframe(tf)}
                  className="capitalize"
                >
                  {tf}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Crime Timeline */}
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle>Crime Timeline & Police Response</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeframeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="crimes" stroke="#FF6B6B" strokeWidth={2} name="Crimes" />
                  <Line type="monotone" dataKey="police" stroke="#4ECDC4" strokeWidth={2} name="Police Deployed" />
                  <Line type="monotone" dataKey="closed" stroke="#45B7D1" strokeWidth={2} name="Cases Closed" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Crime Type Distribution */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Crime Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={crimeTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {crimeTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Case Resolution Rate */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Case Resolution by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={crimeTypeData.map((ct) => ({
                    name: ct.name,
                    resolved: ct.caseClosed,
                    pending: ct.value - ct.caseClosed,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="resolved" fill="#4ECDC4" name="Resolved" />
                  <Bar dataKey="pending" fill="#FFB6C1" name="Pending" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Hourly Pattern */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Hourly Crime Pattern for {location}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="hour" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="incidents" fill="#FF8042" name="Incidents" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Location-Specific Insights */}
        <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardHeader>
            <CardTitle>Location-Specific Insights & Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-card p-4 border border-border">
                <h4 className="font-semibold text-foreground mb-2">Peak Crime Hours</h4>
                <p className="text-sm text-muted-foreground">
                  Highest crime incidents occur between 18:00-22:00. Recommend patrol intensification during these hours.
                </p>
              </div>
              <div className="rounded-lg bg-card p-4 border border-border">
                <h4 className="font-semibold text-foreground mb-2">Most Common Crime</h4>
                <p className="text-sm text-muted-foreground">
                  Theft is the most prevalent crime type (45% of incidents). Deploy specialized theft prevention units.
                </p>
              </div>
              <div className="rounded-lg bg-card p-4 border border-border">
                <h4 className="font-semibold text-foreground mb-2">Resolution Performance</h4>
                <p className="text-sm text-muted-foreground">
                  Case resolution rate of 65% is above average. Current police strategy showing positive results.
                </p>
              </div>
              <div className="rounded-lg bg-card p-4 border border-border">
                <h4 className="font-semibold text-foreground mb-2">Predicted Trend</h4>
                <p className="text-sm text-muted-foreground">
                  ML model predicts 18% increase in mobile theft during next month. Preemptive measures recommended.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
