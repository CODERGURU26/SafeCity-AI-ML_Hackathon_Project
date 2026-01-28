"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, RotateCcw } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const crimeTypes = [
  { value: "all", label: "All Crime Types" },
  { value: "theft", label: "Theft" },
  { value: "assault", label: "Assault" },
  { value: "robbery", label: "Robbery" },
  { value: "fraud", label: "Fraud" },
  { value: "vandalism", label: "Vandalism" },
  { value: "cyber", label: "Cyber Crime" },
]

const zones = [
  { value: "all", label: "All Zones" },
  { value: "zone1", label: "Zone 1 - South" },
  { value: "zone2", label: "Zone 2 - Central" },
  { value: "zone3", label: "Zone 3 - West" },
  { value: "zone4", label: "Zone 4 - East" },
  { value: "zone5", label: "Zone 5 - North" },
]

const timeRanges = [
  { value: "24h", label: "Last 24 Hours" },
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "custom", label: "Custom Range" },
]

export function QuickFilters() {
  const [crimeType, setCrimeType] = useState("all")
  const [zone, setZone] = useState("all")
  const [timeRange, setTimeRange] = useState("24h")
  const [date, setDate] = useState(null)

  const handleReset = () => {
    setCrimeType("all")
    setZone("all")
    setTimeRange("24h")
    setDate(null)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg font-semibold text-foreground">
          <span>Quick Filters</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-8 text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="mr-1 h-3 w-3" />
            Reset
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Crime Type */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Crime Type</Label>
          <Select value={crimeType} onValueChange={setCrimeType}>
            <SelectTrigger className="bg-secondary border-border text-foreground">
              <SelectValue placeholder="Select crime type" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {crimeTypes.map((type) => (
                <SelectItem key={type.value} value={type.value} className="text-foreground focus:bg-secondary">
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Zone */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Zone</Label>
          <Select value={zone} onValueChange={setZone}>
            <SelectTrigger className="bg-secondary border-border text-foreground">
              <SelectValue placeholder="Select zone" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {zones.map((z) => (
                <SelectItem key={z.value} value={z.value} className="text-foreground focus:bg-secondary">
                  {z.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Time Range */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Time Range</Label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="bg-secondary border-border text-foreground">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {timeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value} className="text-foreground focus:bg-secondary">
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Custom Date */}
        {timeRange === "custom" && (
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-secondary border-border",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-card border-border" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="bg-card text-foreground"
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        {/* Apply Button */}
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  )
}
