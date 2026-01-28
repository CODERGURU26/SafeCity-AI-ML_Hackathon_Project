"use client"

import { useEffect, useState, useCallback } from "react"
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
    // Get location from URL on client side only
    const [location, setLocation] = useState("Andheri")
    const [timeframeData, setTimeframeData] = useState([])
    const [crimeTypeData, setCrimeTypeData] = useState([])
    const [hourlyData, setHourlyData] = useState([])
    const [stats, setStats] = useState({})
    const [timeframe, setTimeframe] = useState("monthly")

    // Get location from URL on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search)
            const locationParam = params.get("location")
            if (locationParam) {
                setLocation(locationParam)
            }
        }
    }, [])

    // Simulated data for the location
    const generateLocationData = useCallback(() => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
        const timeData = months.map((month, idx) => ({
            name: month,
            crimes: Math.floor(50 + Math.random() * 100),
            police: Math.floor(5 + Math.random() * 12),
            closed: Math.floor(30 + Math.random() * 50),
        }))

        // Hourly data for 24-hour IST chart
        const hourlyData = Array(24)
            .fill(0)
            .map((_, i) => {
                const crimes = Math.floor(5 + Math.random() * 25)
                const police = Math.floor(2 + Math.random() * 10)
                return {
                    hour: `${String(i).padStart(2, "0")}:00 IST`,
                    hourNum: i,
                    crimes,
                    police,
                    change: i > 0 && Math.random() > 0.5 ? `+${Math.floor(Math.random() * 30)}%` : null,
                }
            })

        // Crime types data based on timeframe
        let crimeTypes = []
        if (timeframe === "daily") {
            crimeTypes = [
                { name: "Theft", value: Math.floor(30 + Math.random() * 20), caseClosed: Math.floor(15 + Math.random() * 10) },
                { name: "Assault", value: Math.floor(15 + Math.random() * 15), caseClosed: Math.floor(8 + Math.random() * 8) },
                { name: "Fraud", value: Math.floor(10 + Math.random() * 10), caseClosed: Math.floor(5 + Math.random() * 6) },
                { name: "Burglary", value: Math.floor(8 + Math.random() * 8), caseClosed: Math.floor(4 + Math.random() * 4) },
                { name: "Robbery", value: Math.floor(5 + Math.random() * 6), caseClosed: Math.floor(2 + Math.random() * 3) },
                { name: "Other", value: Math.floor(12 + Math.random() * 12), caseClosed: Math.floor(6 + Math.random() * 8) },
            ]
        } else if (timeframe === "monthly") {
            crimeTypes = [
                { name: "Theft", value: Math.floor(200 + Math.random() * 100), caseClosed: Math.floor(130 + Math.random() * 50) },
                { name: "Assault", value: Math.floor(120 + Math.random() * 80), caseClosed: Math.floor(70 + Math.random() * 40) },
                { name: "Fraud", value: Math.floor(100 + Math.random() * 60), caseClosed: Math.floor(60 + Math.random() * 35) },
                { name: "Burglary", value: Math.floor(70 + Math.random() * 50), caseClosed: Math.floor(40 + Math.random() * 25) },
                { name: "Robbery", value: Math.floor(50 + Math.random() * 35), caseClosed: Math.floor(25 + Math.random() * 15) },
                { name: "Other", value: Math.floor(90 + Math.random() * 60), caseClosed: Math.floor(55 + Math.random() * 35) },
            ]
        } else {
            crimeTypes = [
                { name: "Theft", value: Math.floor(2500 + Math.random() * 1000), caseClosed: Math.floor(1600 + Math.random() * 600) },
                { name: "Assault", value: Math.floor(1500 + Math.random() * 800), caseClosed: Math.floor(900 + Math.random() * 500) },
                { name: "Fraud", value: Math.floor(1200 + Math.random() * 700), caseClosed: Math.floor(750 + Math.random() * 450) },
                { name: "Burglary", value: Math.floor(850 + Math.random() * 600), caseClosed: Math.floor(500 + Math.random() * 350) },
                { name: "Robbery", value: Math.floor(600 + Math.random() * 400), caseClosed: Math.floor(350 + Math.random() * 200) },
                { name: "Other", value: Math.floor(1100 + Math.random() * 800), caseClosed: Math.floor(700 + Math.random() * 450) },
            ]
        }

        const hourly = Array(24)
            .fill(0)
            .map((_, i) => ({
                hour: `${String(i).padStart(2, "0")}:00`,
                incidents: Math.floor(5 + Math.random() * 25),
            }))

        const totalCrimes = crimeTypes.reduce((sum, t) => sum + t.value, 0)
        const totalClosed = crimeTypes.reduce((sum, t) => sum + t.caseClosed, 0)

        setTimeframeData(hourlyData)
        setCrimeTypeData(crimeTypes)
        setHourlyData(hourly)
        setStats({
            total: totalCrimes,
            caseClosed: totalClosed,
            resolutionRate: ((totalClosed / totalCrimes) * 100).toFixed(1),
            avgPolice: 8,
        })
    }, [timeframe])

    useEffect(() => {
        generateLocationData()
    }, [location, timeframe, generateLocationData])

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

                {/* Charts */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Hourly Crime Pattern - 24 Hour IST with Analysis */}
                    <Card className="bg-card border-border lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Hourly Crime Pattern for {location}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {/* Chart */}
                                <ResponsiveContainer width="100%" height={350}>
                                    <LineChart data={timeframeData} margin={{ top: 5, right: 80, left: 0, bottom: 60 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                        <XAxis
                                            dataKey="hour"
                                            stroke="#9CA3AF"
                                            tick={{ fontSize: 12 }}
                                            interval={1}
                                        />
                                        <YAxis
                                            stroke="#9CA3AF"
                                            label={{ value: "Count", angle: 90, position: "insideRight", offset: -10 }}
                                        />
                                        <Tooltip
                                            content={<CustomTooltip />}
                                            contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151" }}
                                        />
                                        <Legend wrapperStyle={{ paddingTop: "20px" }} />
                                        <Line
                                            type="monotone"
                                            dataKey="crimes"
                                            stroke="#FF6B6B"
                                            strokeWidth={2.5}
                                            dot={{ fill: "#FF6B6B", r: 4 }}
                                            activeDot={{ r: 6 }}
                                            name="Crimes"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="police"
                                            stroke="#4ECDC4"
                                            strokeWidth={2.5}
                                            dot={{ fill: "#4ECDC4", r: 4 }}
                                            activeDot={{ r: 6 }}
                                            name="Police Deployed"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>

                                {/* Crime Pattern Analysis & Alerts */}
                                <div className="space-y-4 border-t border-border pt-6">
                                    <h3 className="font-semibold text-foreground">Crime Pattern Analysis & Alerts</h3>

                                    {/* Peak Hour Alerts */}
                                    <div className="grid gap-3 md:grid-cols-3">
                                        {timeframeData.slice(16, 22).map((hour, idx) => {
                                            const isHighCrime = hour.crimes > 15
                                            return (
                                                <div
                                                    key={idx}
                                                    className={`p-3 rounded-lg border text-sm ${isHighCrime
                                                        ? "bg-red-500/10 border-red-500/30"
                                                        : "bg-blue-500/10 border-blue-500/30"
                                                        }`}
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <p className="font-semibold text-foreground">{hour.hour}</p>
                                                            <p className="text-xs text-muted-foreground mt-1">
                                                                Crimes: <span className="text-foreground font-bold">{hour.crimes}</span>
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                Police: <span className="text-foreground font-bold">{hour.police}</span>
                                                            </p>
                                                        </div>
                                                        {isHighCrime && (
                                                            <div className="inline-flex items-center rounded-full bg-red-500/20 px-1.5 py-0.5">
                                                                <div className="h-1.5 w-1.5 bg-red-500 rounded-full mr-1"></div>
                                                                <span className="text-xs font-semibold text-red-600">High</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* Analysis Summary */}
                                    <div className="space-y-3 pt-3">
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-600 flex-shrink-0 text-sm font-bold">
                                                ⚠️
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-foreground">Peak Crime Hours</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Crimes peak between 18:00-22:00 IST. Recommend intensifying patrol during these hours.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500/10 text-yellow-600 flex-shrink-0 text-sm font-bold">
                                                📈
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-foreground">Crime Increase Alert</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Detected 23% increase in theft crimes during evening hours. Deploy additional mobile units.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/10 text-blue-600 flex-shrink-0 text-sm font-bold">
                                                💡
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-foreground">Recommendation</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Current police deployment shows {Math.round((5 / 12) * 100)}% efficiency. Increase deployment by 15% during peak hours for optimal coverage.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Crime Type Distribution */}
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Crime Type Distribution</CardTitle>
                                <div className="flex gap-2">
                                    {["daily", "monthly", "yearly"].map((tf) => (
                                        <Button
                                            key={tf}
                                            variant={timeframe === tf ? "default" : "outline"}
                                            onClick={() => setTimeframe(tf)}
                                            className="capitalize text-xs"
                                            size="sm"
                                        >
                                            {tf}
                                        </Button>
                                    ))}
                                </div>
                            </div>
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

                    {/* Resolution Rate Comparison */}
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle>Case Resolution by Crime Type</CardTitle>
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



                {/* Location-Specific Insights */}
                <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                    <CardHeader>
                        <CardTitle>24-Hour Crime Pattern Insights & Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="rounded-lg bg-card p-4 border border-border">
                                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                    <span className="text-red-500">🔴</span> Critical Peak Hours
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Highest crime incidents occur between 18:00-22:00 IST (Evening Peak). Currently experiencing 23% increase in theft crimes during this window.
                                </p>
                            </div>
                            <div className="rounded-lg bg-card p-4 border border-border">
                                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                    <span className="text-yellow-500">🟡</span> Police Deployment Gap
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Current police deployment shows 58% efficiency during peak hours. Recommend increasing deployment by 15% (from 6 to 7 officers) during 18:00-23:00.
                                </p>
                            </div>
                            <div className="rounded-lg bg-card p-4 border border-border">
                                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                    <span className="text-blue-500">🔵</span> Low Crime Hours
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Crimes at minimum between 04:00-07:00 IST (Early Morning). Can reduce deployment to 2 officers during this period for cost optimization.
                                </p>
                            </div>
                            <div className="rounded-lg bg-card p-4 border border-border">
                                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                    <span className="text-green-500">🟢</span> Actionable Alert
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    Mobile theft incidents trending upward (+23%). Deploy specialized theft prevention units with plainclothes officers in commercial zones during peak hours.
                                </p>
                            </div>
                        </div>

                        {/* Hourly Breakdown Table */}
                        <div className="mt-6 pt-4 border-t border-blue-500/20">
                            <h4 className="font-semibold text-foreground mb-3">24-Hour Deployment Recommendations</h4>
                            <div className="grid gap-2 text-sm">
                                <div className="flex justify-between items-center p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                                    <span className="text-foreground font-semibold">18:00-22:00 IST (Peak)</span>
                                    <span className="text-red-600 font-bold">Deploy 8-10 Officers</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                    <span className="text-foreground font-semibold">12:00-18:00 IST (Moderate)</span>
                                    <span className="text-yellow-600 font-bold">Deploy 5-6 Officers</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                    <span className="text-foreground font-semibold">22:00-04:00 IST (Low)</span>
                                    <span className="text-blue-600 font-bold">Deploy 3-4 Officers</span>
                                </div>
                                <div className="flex justify-between items-center p-2 bg-green-500/10 rounded-lg border border-green-500/20">
                                    <span className="text-foreground font-semibold">04:00-12:00 IST (Minimum)</span>
                                    <span className="text-green-600 font-bold">Deploy 2-3 Officers</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    )
}