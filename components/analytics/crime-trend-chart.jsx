"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const data = [
  { month: "Jan", theft: 120, assault: 45, robbery: 28, fraud: 35 },
  { month: "Feb", theft: 132, assault: 52, robbery: 31, fraud: 42 },
  { month: "Mar", theft: 101, assault: 38, robbery: 24, fraud: 38 },
  { month: "Apr", theft: 134, assault: 48, robbery: 35, fraud: 45 },
  { month: "May", theft: 90, assault: 42, robbery: 22, fraud: 32 },
  { month: "Jun", theft: 110, assault: 55, robbery: 29, fraud: 48 },
  { month: "Jul", theft: 142, assault: 62, robbery: 38, fraud: 52 },
  { month: "Aug", theft: 128, assault: 58, robbery: 32, fraud: 46 },
  { month: "Sep", theft: 115, assault: 45, robbery: 28, fraud: 40 },
  { month: "Oct", theft: 125, assault: 50, robbery: 30, fraud: 44 },
  { month: "Nov", theft: 118, assault: 47, robbery: 26, fraud: 38 },
  { month: "Dec", theft: 135, assault: 54, robbery: 34, fraud: 50 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
        <p className="mb-2 font-semibold text-foreground">{label}</p>
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

export function CrimeTrendChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Crime Trends Over Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2538" />
            <XAxis dataKey="month" stroke="#8a8f9d" fontSize={12} />
            <YAxis stroke="#8a8f9d" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => <span className="text-foreground capitalize">{value}</span>}
            />
            <Line
              type="monotone"
              dataKey="theft"
              stroke="#00d9ff"
              strokeWidth={2}
              dot={{ fill: "#00d9ff", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#00d9ff" }}
            />
            <Line
              type="monotone"
              dataKey="assault"
              stroke="#ff4081"
              strokeWidth={2}
              dot={{ fill: "#ff4081", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#ff4081" }}
            />
            <Line
              type="monotone"
              dataKey="robbery"
              stroke="#ffd600"
              strokeWidth={2}
              dot={{ fill: "#ffd600", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#ffd600" }}
            />
            <Line
              type="monotone"
              dataKey="fraud"
              stroke="#00e676"
              strokeWidth={2}
              dot={{ fill: "#00e676", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#00e676" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
