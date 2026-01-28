"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, RotateCcw, Check } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const crimeTypes = [
  { value: "all", label: "All Crimes" },
  { value: "theft", label: "Theft" },
  { value: "assault", label: "Assault" },
  { value: "robbery", label: "Robbery" },
  { value: "fraud", label: "Fraud" },
  { value: "vandalism", label: "Vandalism" },
  { value: "cyber", label: "Cyber Crime" },
]

export function QuickFilters({ onApplyFilters, onResetFilters }) {
  const [crimeType, setCrimeType] = useState("all")

  const handleReset = () => {
    setCrimeType("all")
    if (onResetFilters) {
      onResetFilters()
    }
  }

  const handleApply = () => {
    if (onApplyFilters) {
      onApplyFilters({
        crimeType,
      })
    }
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
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {crimeTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setCrimeType(type.value)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
                  crimeType === type.value
                    ? "bg-primary/20 text-primary border border-primary/50"
                    : "bg-secondary/50 text-foreground hover:bg-secondary border border-border"
                )}
              >
                <span>{type.label}</span>
                {crimeType === type.value && <Check className="h-4 w-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <Button 
          onClick={handleApply}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  )
}
