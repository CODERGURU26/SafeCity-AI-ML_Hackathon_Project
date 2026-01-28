"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const data = [
  { zone: "Zone 1", current: 145, previous: 132 },
  { zone: "Zone 2", current: 198, previous: 210 },
  { zone: "Zone 3", current: 167, previous: 158 },
  { zone: "Zone 4", current: 221, previous: 195 },
  { zone: "Zone 5", current: 134, previous: 148 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
        <p className="mb-2 font-semibold text-foreground">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value} cases
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function ZoneComparisonChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Zone-wise Crime Comparison
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2538" />
            <XAxis dataKey="zone" stroke="#8a8f9d" fontSize={12} />
            <YAxis stroke="#8a8f9d" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => (
                <span className="text-foreground capitalize">
                  {value === "current" ? "Current Month" : "Previous Month"}
                </span>
              )}
            />
            <Bar dataKey="current" fill="#00d9ff" radius={[4, 4, 0, 0]} />
            <Bar dataKey="previous" fill="#1e2538" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
