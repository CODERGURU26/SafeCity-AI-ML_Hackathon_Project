"use client"

import { Suspense, useEffect, useState, useCallback } from "react"
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

function LocationAnalyticsContent() {
    const searchParams = useSearchParams()
    const location = searchParams.get("location") || "Andheri"

    const [timeframeData, setTimeframeData] = useState([])
    const [crimeTypeData, setCrimeTypeData] = useState([])
    const [hourlyData, setHourlyData] = useState([])
    const [stats, setStats] = useState({})
    const [timeframe, setTimeframe] = useState("monthly")

    // ... rest of your component code (all the existing logic)
    // Copy everything from generateLocationData down to the return statement
    
    const generateLocationData = useCallback(() => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
        const timeData = months.map((month, idx) => ({
            name: month,
            crimes: Math.floor(50 + Math.random() * 100),
            police: Math.floor(5 + Math.random() * 12),
            closed: Math.floor(30 + Math.random() * 50),
        }))

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
            {/* All your existing JSX code stays exactly the same */}
            <div className="space-y-6">
                {/* ... rest of your JSX ... */}
            </div>
        </AppShell>
    )
}

export default function LocationAnalyticsPage() {
    return (
        <Suspense fallback={
            <AppShell>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading analytics...</p>
                    </div>
                </div>
            </AppShell>
        }>
            <LocationAnalyticsContent />
        </Suspense>
    )
}