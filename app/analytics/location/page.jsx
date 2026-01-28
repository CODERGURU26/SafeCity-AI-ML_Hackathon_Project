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
    const [selectedCrimeType, setSelectedCrimeType] = useState(null)

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

    const getCrimeSuggestions = (crime) => {
        if (!crime) return null

        const total = crime.value
        const resolved = crime.caseClosed
        const pending = total - resolved
        const resolutionRate = ((resolved / total) * 100).toFixed(1)

        const suggestions = {
            Theft: {
                strategies: [
                    "Increase CCTV surveillance in high-traffic areas",
                    "Deploy plainclothes officers during peak shopping hours",
                    "Collaborate with retail establishments for better security",
                    "Focus on serial theft locations"
                ],
                priority: resolutionRate < 50 ? "high" : "medium",
                resource: pending > resolved ? 8 : 5,
                action: "Implement vehicle patrol on main streets"
            },
            Assault: {
                strategies: [
                    "Increase presence in known hotspots",
                    "Conduct community awareness programs",
                    "Deploy officers in high-conflict areas",
                    "Establish rapid response teams"
                ],
                priority: resolutionRate < 55 ? "high" : "medium",
                resource: pending > resolved ? 6 : 4,
                action: "Set up mobile patrol units in conflict zones"
            },
            Fraud: {
                strategies: [
                    "Strengthen cyber crime unit resources",
                    "Partner with financial institutions",
                    "Educate public about common fraud tactics",
                    "Focus on online transaction monitoring"
                ],
                priority: resolutionRate < 60 ? "high" : "low",
                resource: pending > resolved ? 5 : 3,
                action: "Establish fraud investigation task force"
            },
            Burglary: {
                strategies: [
                    "Increase residential area patrols",
                    "Community neighborhood watch programs",
                    "Target known burglary hotspots",
                    "Focus on commercial areas during off-hours"
                ],
                priority: resolutionRate < 50 ? "high" : "medium",
                resource: pending > resolved ? 6 : 4,
                action: "Implement neighborhood security checkpoints"
            },
            Robbery: {
                strategies: [
                    "Increase nighttime patrols",
                    "Deploy tactical response teams",
                    "Focus on high-value robbery locations",
                    "Enhance ATM and bank security coordination"
                ],
                priority: resolutionRate < 45 ? "critical" : "high",
                resource: pending > resolved ? 10 : 7,
                action: "Deploy armed rapid response teams during peak hours"
            },
            Vandalism: {
                strategies: [
                    "Increase community engagement",
                    "Deploy youth intervention programs",
                    "Increase street lighting and CCTV",
                    "Focus on repeat offender tracking"
                ],
                priority: resolutionRate < 65 ? "medium" : "low",
                resource: pending > resolved ? 3 : 2,
                action: "Engage community for preventive measures"
            },
            Other: {
                strategies: [
                    "Conduct detailed case analysis",
                    "Increase general patrol presence",
                    "Focus on community policing",
                    "Establish tip lines for public information"
                ],
                priority: resolutionRate < 50 ? "medium" : "low",
                resource: pending > resolved ? 4 : 2,
                action: "Launch community awareness campaign"
            }
        }

        return {
            crime: crime.name,
            total,
            resolved,
            pending,
            resolutionRate,
            ...(suggestions[crime.name] || suggestions.Other)
        }
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
                        {/* Location-Specific Insights */}
                        <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                            <CardHeader>
                                <CardTitle>24-Hour Deployment Recommendations</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">


                                {/* Hourly Breakdown Table */}
                                <div className="mt-6 pt-4 border-t border-blue-500/20">

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
                            <CardTitle>Case Resolution by Crime Type - Click to View Suggestions</CardTitle>
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
                                    <XAxis
                                        dataKey="name"
                                        stroke="#9CA3AF"
                                        style={{ cursor: "pointer" }}
                                    />
                                    <YAxis stroke="#9CA3AF" />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    <Bar
                                        dataKey="resolved"
                                        fill="#4ECDC4"
                                        name="Resolved"
                                        onClick={(data) => {
                                            const crime = crimeTypeData.find(ct => ct.name === data.name)
                                            setSelectedCrimeType(crime)
                                        }}
                                        style={{ cursor: "pointer" }}
                                    />
                                    <Bar
                                        dataKey="pending"
                                        fill="#FFB6C1"
                                        name="Pending"
                                        onClick={(data) => {
                                            const crime = crimeTypeData.find(ct => ct.name === data.name)
                                            setSelectedCrimeType(crime)
                                        }}
                                        style={{ cursor: "pointer" }}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Crime-Type Suggestions Card */}
                    {selectedCrimeType && (() => {
                        const suggestionData = getCrimeSuggestions(selectedCrimeType)
                        const priorityColors = {
                            critical: "from-red-500/5 to-red-500/5 border-red-500",
                            high: "from-orange-500/5 to-orange-500/5 border-orange-500",
                            medium: "from-yellow-500/5 to-yellow-500/5 border-yellow-500",
                            low: "from-green-500/5 to-green-500/5 border-green-500"
                        }
                        return (
                            <Card className={`bg-gradient-to-br border-l-4 lg:col-span-2 ${priorityColors[suggestionData.priority]}`}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-xl">{selectedCrimeType.name} - Crime Analysis & Recommendations</CardTitle>
                                            <p className="text-sm text-muted-foreground mt-1">Click on the chart bars to view different crime types</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSelectedCrimeType(null)}
                                        >
                                            ✕
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {/* Stats */}
                                    <div className="grid gap-4 md:grid-cols-4">
                                        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                            <p className="text-xs text-muted-foreground uppercase">Total Cases</p>
                                            <p className="text-2xl font-bold text-foreground mt-1">{suggestionData.total}</p>
                                        </div>
                                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                                            <p className="text-xs text-muted-foreground uppercase">Resolved</p>
                                            <p className="text-2xl font-bold text-green-500 mt-1">{suggestionData.resolved}</p>
                                        </div>
                                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                            <p className="text-xs text-muted-foreground uppercase">Pending</p>
                                            <p className="text-2xl font-bold text-red-500 mt-1">{suggestionData.pending}</p>
                                        </div>
                                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                            <p className="text-xs text-muted-foreground uppercase">Resolution Rate</p>
                                            <p className="text-2xl font-bold text-purple-500 mt-1">{suggestionData.resolutionRate}%</p>
                                        </div>
                                    </div>

                                    {/* Priority & Resource Allocation */}
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className={`p-4 rounded-lg border ${suggestionData.priority === "critical"
                                                ? "bg-red-500/10 border-red-500/20"
                                                : suggestionData.priority === "high"
                                                    ? "bg-orange-500/10 border-orange-500/20"
                                                    : suggestionData.priority === "medium"
                                                        ? "bg-yellow-500/10 border-yellow-500/20"
                                                        : "bg-green-500/10 border-green-500/20"
                                            }`}>
                                            <p className="text-xs font-semibold uppercase text-muted-foreground">Priority Level</p>
                                            <p className={`text-lg font-bold mt-2 uppercase ${suggestionData.priority === "critical"
                                                    ? "text-red-500"
                                                    : suggestionData.priority === "high"
                                                        ? "text-orange-500"
                                                        : suggestionData.priority === "medium"
                                                            ? "text-yellow-500"
                                                            : "text-green-500"
                                                }`}>{suggestionData.priority}</p>
                                        </div>
                                        <div className="p-4 rounded-lg border bg-blue-500/10 border-blue-500/20">
                                            <p className="text-xs font-semibold uppercase text-muted-foreground">Recommended Police Deployment</p>
                                            <p className="text-lg font-bold mt-2 text-blue-500">{suggestionData.resource} Officers</p>
                                        </div>
                                    </div>

                                    {/* Action Item */}
                                    <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
                                        <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">Recommended Action</p>
                                        <p className="text-foreground font-semibold">{suggestionData.action}</p>
                                    </div>

                                    {/* Strategies */}
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                            <span className="text-lg">🎯</span> Strategic Recommendations
                                        </h4>
                                        <div className="grid gap-2">
                                            {suggestionData.strategies.map((strategy, idx) => (
                                                <div key={idx} className="flex gap-3 p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-border transition-colors">
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-600 flex-shrink-0 text-xs font-bold">
                                                        {idx + 1}
                                                    </div>
                                                    <p className="text-sm text-foreground">{strategy}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })()}
                </div>




            </div>
        </AppShell>
    )
}