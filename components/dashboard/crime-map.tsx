"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Filter,
  BarChart3,
} from "lucide-react";

// Dynamically import leaflet components with SSR disabled
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] bg-muted flex items-center justify-center">
        Loading map...
      </div>
    ),
  },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);
const Circle = dynamic(
  () => import("react-leaflet").then((mod) => mod.Circle),
  { ssr: false },
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

import "leaflet/dist/leaflet.css";

// =======================
// Types matching your API
// =======================
type Level = "High" | "Medium" | "Low";

interface Hotspot {
  City: string;
  latitude: number;
  longitude: number;
  risk_zone: Level;
  police_needed: number;
}

// =======================
// Zone config (colors)
// =======================
const zoneConfig: Record<Level, { color: string; radius: number }> = {
  High: { color: "red", radius: 1800 },
  Medium: { color: "orange", radius: 1300 },
  Low: { color: "green", radius: 900 },
};

// =======================
// Fallback data for when API is unavailable
// =======================
const FALLBACK_HOTSPOTS: Hotspot[] = [
  {
    City: "Andheri",
    latitude: 19.1136,
    longitude: 72.8262,
    risk_zone: "High",
    police_needed: 8,
  },
  {
    City: "Dadar",
    latitude: 19.0176,
    longitude: 72.8292,
    risk_zone: "High",
    police_needed: 7,
  },
  {
    City: "Bandra",
    latitude: 19.0596,
    longitude: 72.8295,
    risk_zone: "Medium",
    police_needed: 5,
  },
  {
    City: "Kurla",
    latitude: 19.0713,
    longitude: 72.8761,
    risk_zone: "Medium",
    police_needed: 6,
  },
  {
    City: "Colaba",
    latitude: 18.9676,
    longitude: 72.8194,
    risk_zone: "Low",
    police_needed: 3,
  },
];

// =======================
// Main Component
// =======================
export function CrimeMap() {
  const [crimeHotspots, setCrimeHotspots] = useState<Hotspot[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const mapRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    fetch("http://127.0.0.1:8000/zones")
      .then((res) => {
        if (!res.ok) throw new Error("API returned status " + res.status);
        return res.json();
      })
      .then((data) => {
        setCrimeHotspots(data);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.error("API error:", err);
        // Use fallback data
        setCrimeHotspots(FALLBACK_HOTSPOTS);
        setLoading(false);
        setError("Using sample data - backend not available");
      });
  }, [isClient]);

  const handleLocationClick = (city: string) => {
    router.push(`/analytics/location?location=${encodeURIComponent(city)}`);
  };

  // Only render map on client side
  if (!isClient) {
    return (
      <Card className="col-span-2 bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">
            Live Crime Zone Map (Mumbai)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-2 bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">
          Live Crime Zone Map (Mumbai)
        </CardTitle>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Layers className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-700 text-sm">
            ⚠️ {error}
          </div>
        )}
        {/* Map Container */}
        <div
          className="h-[500px] rounded-lg overflow-hidden border border-border"
          ref={mapRef}
        >
          {loading ? (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <p className="text-muted-foreground">Loading map data...</p>
            </div>
          ) : (
            <MapContainer
              center={[19.076, 72.8777]}
              zoom={11}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              {crimeHotspots &&
                crimeHotspots.map((spot, index) => (
                  <Circle
                    key={`${spot.City}-${index}`}
                    center={[spot.latitude, spot.longitude]}
                    radius={zoneConfig[spot.risk_zone]?.radius || 1000}
                    pathOptions={{
                      color: zoneConfig[spot.risk_zone]?.color || "blue",
                      fillOpacity: 0.35,
                    }}
                  >
                    <Popup>
                      <div className="space-y-2 p-2">
                        <h3 className="font-semibold capitalize">
                          {spot.City}
                        </h3>
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

                        <Button
                          size="sm"
                          onClick={() => handleLocationClick(spot.City)}
                          className="w-full mt-2 gap-2"
                        >
                          <BarChart3 className="h-4 w-4" />
                          View Analysis
                        </Button>
                      </div>
                    </Popup>
                  </Circle>
                ))}
            </MapContainer>
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
  );
}

// =======================
// Legend component
// =======================
function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-3 w-3 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
