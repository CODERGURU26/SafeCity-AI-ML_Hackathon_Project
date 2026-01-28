"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { hour: "00:00", incidents: 12 },
  { hour: "01:00", incidents: 8 },
  { hour: "02:00", incidents: 5 },
  { hour: "03:00", incidents: 4 },
  { hour: "04:00", incidents: 3 },
  { hour: "05:00", incidents: 6 },
  { hour: "06:00", incidents: 15 },
  { hour: "07:00", incidents: 22 },
  { hour: "08:00", incidents: 28 },
  { hour: "09:00", incidents: 35 },
  { hour: "10:00", incidents: 42 },
  { hour: "11:00", incidents: 48 },
  { hour: "12:00", incidents: 52 },
  { hour: "13:00", incidents: 45 },
  { hour: "14:00", incidents: 38 },
  { hour: "15:00", incidents: 42 },
  { hour: "16:00", incidents: 48 },
  { hour: "17:00", incidents: 55 },
  { hour: "18:00", incidents: 62 },
  { hour: "19:00", incidents: 58 },
  { hour: "20:00", incidents: 48 },
  { hour: "21:00", incidents: 38 },
  { hour: "22:00", incidents: 28 },
  { hour: "23:00", incidents: 18 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card p-3 shadow-lg">
        <p className="mb-1 font-semibold text-foreground">{label}</p>
        <p className="text-sm text-primary">{payload[0].value} incidents</p>
      </div>
    )
  }
  return null
}

export function HourlyPatternChart() {
  return (
    <Card className="col-span-2 bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Hourly Crime Pattern
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00d9ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2538" />
            <XAxis
              dataKey="hour"
              stroke="#8a8f9d"
              fontSize={10}
              tickFormatter={(value) => value.split(":")[0]}
            />
            <YAxis stroke="#8a8f9d" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="incidents"
              stroke="#00d9ff"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorIncidents)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
