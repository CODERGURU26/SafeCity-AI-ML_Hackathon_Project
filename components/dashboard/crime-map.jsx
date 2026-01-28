"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Layers, ZoomIn, ZoomOut, Maximize2, Filter } from "lucide-react"

const crimeHotspots = [
  { id: 1, name: "Andheri West", level: "high", incidents: 24, lat: 35, left: 25 },
  { id: 2, name: "Bandra", level: "medium", incidents: 12, lat: 45, left: 40 },
  { id: 3, name: "Dadar", level: "low", incidents: 5, lat: 55, left: 55 },
  { id: 4, name: "Kurla", level: "high", incidents: 18, lat: 40, left: 70 },
  { id: 5, name: "Powai", level: "medium", incidents: 9, lat: 25, left: 80 },
  { id: 6, name: "Malad", level: "low", incidents: 3, lat: 20, left: 15 },
  { id: 7, name: "Goregaon", level: "medium", incidents: 11, lat: 30, left: 35 },
  { id: 8, name: "Vikhroli", level: "high", incidents: 21, lat: 50, left: 85 },
]

const getLevelColor = (level) => {
  switch (level) {
    case "high":
      return "bg-destructive/80 shadow-[0_0_20px_rgba(255,23,68,0.5)]"
    case "medium":
      return "bg-warning/80 shadow-[0_0_15px_rgba(255,214,0,0.4)]"
    case "low":
      return "bg-success/80 shadow-[0_0_15px_rgba(0,230,118,0.4)]"
    default:
      return "bg-muted"
  }
}

const getLevelSize = (level) => {
  switch (level) {
    case "high":
      return "h-6 w-6"
    case "medium":
      return "h-5 w-5"
    case "low":
      return "h-4 w-4"
    default:
      return "h-4 w-4"
  }
}

export function CrimeMap() {
  const [selectedHotspot, setSelectedHotspot] = useState(null)
  const [zoom, setZoom] = useState(1)

  return (
    <Card className="col-span-2 bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-foreground">
          Live Crime Heatmap
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-8 w-8 border-border bg-secondary text-foreground hover:bg-primary/10 hover:text-primary">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 border-border bg-secondary text-foreground hover:bg-primary/10 hover:text-primary">
            <Layers className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 border-border bg-secondary text-foreground hover:bg-primary/10 hover:text-primary"
            onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8 border-border bg-secondary text-foreground hover:bg-primary/10 hover:text-primary"
            onClick={() => setZoom(Math.max(zoom - 0.2, 0.6))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 border-border bg-secondary text-foreground hover:bg-primary/10 hover:text-primary">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Map Container */}
        <div 
          className="relative h-[500px] overflow-hidden rounded-lg bg-secondary/50"
          style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
        >
          {/* Grid Overlay */}
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* City Outline (Simplified Mumbai shape) */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M20,10 Q10,30 15,50 Q10,70 25,90 Q50,95 75,85 Q90,70 85,50 Q90,30 80,15 Q60,5 40,8 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
              className="text-primary/40"
            />
            {/* District boundaries */}
            <path d="M30,20 L70,25" stroke="currentColor" strokeWidth="0.2" className="text-border" />
            <path d="M25,40 L75,45" stroke="currentColor" strokeWidth="0.2" className="text-border" />
            <path d="M30,60 L70,65" stroke="currentColor" strokeWidth="0.2" className="text-border" />
            <path d="M40,15 L45,85" stroke="currentColor" strokeWidth="0.2" className="text-border" />
            <path d="M60,20 L55,80" stroke="currentColor" strokeWidth="0.2" className="text-border" />
          </svg>

          {/* Hotspots */}
          {crimeHotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              className={`absolute rounded-full transition-all duration-300 hover:scale-125 ${getLevelColor(hotspot.level)} ${getLevelSize(hotspot.level)}`}
              style={{ top: `${hotspot.lat}%`, left: `${hotspot.left}%` }}
              onClick={() => setSelectedHotspot(selectedHotspot?.id === hotspot.id ? null : hotspot)}
            >
              <span className="sr-only">{hotspot.name}</span>
            </button>
          ))}

          {/* Selected Hotspot Info */}
          {selectedHotspot && (
            <div 
              className="absolute z-10 rounded-lg border border-border bg-card p-3 shadow-lg"
              style={{ 
                top: `${Math.min(selectedHotspot.lat + 5, 70)}%`, 
                left: `${Math.min(selectedHotspot.left + 5, 70)}%` 
              }}
            >
              <h4 className="font-semibold text-foreground">{selectedHotspot.name}</h4>
              <p className="text-sm text-muted-foreground">{selectedHotspot.incidents} incidents today</p>
              <Badge 
                variant="outline" 
                className={`mt-2 ${
                  selectedHotspot.level === "high" 
                    ? "border-destructive text-destructive" 
                    : selectedHotspot.level === "medium"
                    ? "border-warning text-warning"
                    : "border-success text-success"
                }`}
              >
                {selectedHotspot.level.toUpperCase()} RISK
              </Badge>
            </div>
          )}

          {/* Scanning Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute h-0.5 w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-pulse" style={{ top: "30%", animation: "scan 4s linear infinite" }} />
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive shadow-[0_0_10px_rgba(255,23,68,0.5)]" />
              <span className="text-sm text-muted-foreground">High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-warning shadow-[0_0_10px_rgba(255,214,0,0.4)]" />
              <span className="text-sm text-muted-foreground">Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-success shadow-[0_0_10px_rgba(0,230,118,0.4)]" />
              <span className="text-sm text-muted-foreground">Low Risk</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground">Last updated: 2 mins ago</span>
        </div>
      </CardContent>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(600px); opacity: 0; }
        }
      `}</style>
    </Card>
  )
}
