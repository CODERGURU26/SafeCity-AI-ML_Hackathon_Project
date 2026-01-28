"use client"

import { useState, useEffect } from "react"
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
import { Calendar } from "lucide-react"

const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042", "#FF6B9D", "#C44569", "#1B9CFC"]

export function CrimeAnalyticsFiltered({ data = [], onLocationSelect }) {
    const [timeframe, setTimeframe] = useState("monthly")
    const [trendData, setTrendData] = useState([])
    const [crimeTypeData, setCrimeTypeData] = useState([])
    const [hourlyData, setHourlyData] = useState([])

    useEffect(() => {
        if (!data || data.length === 0) return

        // Process data based on timeframe
        const processedData = aggregateByTimeframe(data, timeframe)
        setTrendData(processedData)

        // Crime type distribution
        const types = {}
        data.forEach((record) => {
            const type = getCrimeType(record["Crime Description"])
            types[type] = (types[type] || 0) + 1
        })
        setCrimeTypeData(
            Object.entries(types)
                .map(([name, value]) => ({ name, value }))
                .sort((a, b) => b.value - a.value),
        )

        // Hourly pattern
        const hourly = Array(24)
            .fill(0)
            .map((_, i) => ({
                hour: `${String(i).padStart(2, "0")}:00`,
                incidents: 0,
            }))
        data.forEach((record) => {
            try {
                const hour = new Date(record["Time of Occurrence"]).getHours()
                if (hour >= 0 && hour < 24) {
                    hourly[hour].incidents += 1
                }
            } catch (e) {
                console.error("Error parsing time:", record["Time of Occurrence"], e)
            }
        })
        setHourlyData(hourly)
    }, [data, timeframe])

    const aggregateByTimeframe = (data, timeframe) => {
        const aggregated = {}

        data.forEach((record) => {
            const date = new Date(record["Date Reported"])
            let timeKey
            let displayKey

            if (timeframe === "daily") {
                timeKey = date.toISOString().split("T")[0]
                displayKey = date.getDate()
            } else if (timeframe === "monthly") {
                const month = date.getMonth()
                timeKey = `${date.getFullYear()}-${month}`
                displayKey = date.toLocaleDateString("en-US", { month: "short" })
            } else {
                timeKey = date.getFullYear().toString()
                displayKey = date.getFullYear()
            }

            if (!aggregated[timeKey]) {
                aggregated[timeKey] = {
                    name: displayKey,
                    crimes: 0,
                    police: 0,
                }
            }

            aggregated[timeKey].crimes += 1
            aggregated[timeKey].police += parseInt(record["Police Deployed"] || 0)
        })

        return Object.values(aggregated)
    }

    const getCrimeType = (description) => {
        if (!description) return "other"
        const desc = description.toLowerCase()
        if (desc.includes("theft") || desc.includes("steal")) return "Theft"
        if (desc.includes("assault") || desc.includes("attack")) return "Assault"
        if (desc.includes("robbery")) return "Robbery"
        if (desc.includes("fraud") || desc.includes("cheating")) return "Fraud"
        if (desc.includes("burglary")) return "Burglary"
        if (desc.includes("pickpocket")) return "Pickpocketing"
        return "Other"
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
                    <p className="font-semibold text-foreground">{payload[0].payload.name}</p>
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
        <div className="space-y-6">
            {/* Time Filter */}
            <Card className="bg-card border-border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Time Duration Filter
                    </CardTitle>
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

            {/* Charts Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Crime Trend Chart */}
                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle>Crime Trends & Police Allocation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={trendData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Line type="monotone" dataKey="crimes" stroke="#00C49F" strokeWidth={2} name="Incidents" />
                                <Line type="monotone" dataKey="police" stroke="#0088FE" strokeWidth={2} name="Police Deployed" />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Crime Type Distribution Pie Chart */}
                <Card className="bg-card border-border">
                    <CardHeader>
                        <CardTitle>Crime Distribution by Type</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={crimeTypeData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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

                {/* Hourly Crime Pattern */}
                <Card className="bg-card border-border lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Hourly Crime Pattern</CardTitle>
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

                {/* Crime Type Comparison Bar Chart */}
                <Card className="bg-card border-border lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Crime Types Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={crimeTypeData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis dataKey="name" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="value" fill="#0088FE" name="Incidents" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
