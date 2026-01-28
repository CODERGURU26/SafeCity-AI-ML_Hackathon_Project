"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Layers, ZoomIn, ZoomOut, Maximize2, Filter } from "lucide-react"

// Dynamically import leaflet components with SSR disabled
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Circle = dynamic(() => import("react-leaflet").then((mod) => mod.Circle), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

import "leaflet/dist/leaflet.css"

// =======================
// Types matching your API
// =======================
type Level = "High" | "Medium" | "Low"

interface Hotspot {
  City: string
  latitude: number
  longitude: number
  risk_zone: Level
  police_needed: number
}

// =======================
// Zone config (colors)
// =======================
const zoneConfig: Record<Level, { color: string; radius: number }> = {
  High: { color: "red", radius: 1800 },
  Medium: { color: "orange", radius: 1300 },
  Low: { color: "green", radius: 900 },
}

// =======================
// Main Component
// =======================
export function CrimeMap() {
  const [crimeHotspots, setCrimeHotspots] = useState<Hotspot[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/zones")
      .then((res) => res.json())
      .then((data) => {
        setCrimeHotspots(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("API error:", err)
        setLoading(false)
      })
  }, [])

  return (
    <Card className="col-span-2 bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">
          Live Crime Zone Map (Mumbai)
        </CardTitle>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon"><Layers className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon"><ZoomIn className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon"><ZoomOut className="h-4 w-4" /></Button>
          <Button variant="outline" size="icon"><Maximize2 className="h-4 w-4" /></Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* Map */}
        <div className="h-[500px] rounded-lg overflow-hidden border border-border">
          <MapContainer
            center={[19.076, 72.8777]}
            zoom={11}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {!loading &&
              crimeHotspots.map((spot, index) => (
                <Circle
                  key={index}
                  center={[spot.latitude, spot.longitude]}
                  radius={zoneConfig[spot.risk_zone].radius}
                  pathOptions={{
                    color: zoneConfig[spot.risk_zone].color,
                    fillOpacity: 0.35,
                  }}
                >
                  <Popup>
                    <div className="space-y-1">
                      <h3 className="font-semibold capitalize">{spot.City}</h3>
                      <p className="text-sm">
                        Police Needed: {spot.police_needed}
                      </p>

                      <Badge
                        variant="outline"
                        className={
                          spot.risk_zone === "High"
                            ? "border-red-500 text-red-500"
                            : spot.risk_zone === "Medium"
                            ? "border-orange-500 text-orange-500"
                            : "border-green-500 text-green-500"
                        }
                      >
                        {spot.risk_zone.toUpperCase()} RISK
                      </Badge>
                    </div>
                  </Popup>
                </Circle>
              ))}
          </MapContainer>

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white">
              Loading map data...
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-6">
            <Legend color="red" label="High Risk" />
            <Legend color="orange" label="Medium Risk" />
            <Legend color="green" label="Low Risk" />
          </div>
          <span className="text-xs text-muted-foreground">Live data</span>
        </div>
      </CardContent>
    </Card>
  )
}

// =======================
// Legend component
// =======================
function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  )
}