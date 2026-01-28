"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Filter,
  BarChart3,
  X,
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
// Fallback data
// =======================
const policeByRisk: Record<Level, number> = {
  High: 8,
  Medium: 5,
  Low: 3,
};

const FALLBACK_HOTSPOTS: Hotspot[] = [
  {
    City: "Andheri",
    latitude: 19.119698,
    longitude: 72.84642,
    risk_zone: "Medium",
    police_needed: policeByRisk.Medium,
  },
  {
    City: "Bandra",
    latitude: 19.054979,
    longitude: 72.84022,
    risk_zone: "High",
    police_needed: policeByRisk.High,
  },
  {
    City: "Belapur",
    latitude: 19.008841,
    longitude: 73.028777,
    risk_zone: "Medium",
    police_needed: policeByRisk.Medium,
  },
  {
    City: "Bhandup",
    latitude: 19.143868,
    longitude: 72.938433,
    risk_zone: "High",
    police_needed: policeByRisk.High,
  },
  {
    City: "Borivali",
    latitude: 19.229068,
    longitude: 72.857363,
    risk_zone: "Low",
    police_needed: policeByRisk.Low,
  },
  {
    City: "Byculla",
    latitude: 18.976622,
    longitude: 72.832794,
    risk_zone: "Low",
    police_needed: policeByRisk.Low,
  },
  {
    City: "Chembur",
    latitude: 19.054818,
    longitude: 72.897971,
    risk_zone: "High",
    police_needed: policeByRisk.High,
  },
  {
    City: "Churchgate",
    latitude: 18.93548,
    longitude: 72.827174,
    risk_zone: "Low",
    police_needed: policeByRisk.Low,
  },
  {
    City: "Colaba",
    latitude: 18.915091,
    longitude: 72.825969,
    risk_zone: "Low",
    police_needed: policeByRisk.Low,
  },
  {
    City: "Cuffe Parade",
    latitude: 18.91292,
    longitude: 72.820138,
    risk_zone: "Low",
    police_needed: policeByRisk.Low,
  },
  {
    City: "Dadar",
    latitude: 19.017734,
    longitude: 72.843752,
    risk_zone: "High",
    police_needed: policeByRisk.High,
  },
  {
    City: "Dahisar",
    latitude: 19.045147,
    longitude: 72.945195,
    risk_zone: "High",
    police_needed: policeByRisk.High,
  },
  {
    City: "Fort",
    latitude: 18.933266,
    longitude: 72.834515,
    risk_zone: "Low",
    police_needed: policeByRisk.Low,
  },
  {
    City: "Ghatkopar",
    latitude: 19.085693,
    longitude: 72.908367,
    risk_zone: "High",
    police_needed: policeByRisk.High,
  },
  {
    City: "Govandi",
    latitude: 19.055369,
    longitude: 72.91507,
    risk_zone: "High",
    police_needed: policeByRisk.High,
  },
  {
    City: "Jogeshwari",
    latitude: 19.134899,
    longitude: 72.84882,
    risk_zone: "Medium",
    police_needed: policeByRisk.Medium,
  },
  {
    City: "Juhu",
    latitude: 19.107021,
    longitude: 72.827528,
    risk_zone: "Medium",
    police_needed: policeByRisk.Medium,
  },
  {
    City: "Kandivali",
    latitude: 19.204114,
    longitude: 72.851738,
    risk_zone: "Low",
    police_needed: policeByRisk.Low,
  },
  {
    City: "Kanjurmarg",
    latitude: 19.124102,
    longitude: 72.938556,
    risk_zone: "High",
    police_needed: policeByRisk.High,
  },
  {
    City: "Kharghar",
    latitude: 19.025773,
    longitude: 73.059185,
    risk_zone: "Medium",
    police_needed: policeByRisk.Medium,
  },
  {
    City: "Kurla",
    latitude: 19.06554,
    longitude: 72.879564,
    risk_zone: "High",
    police_needed: policeByRisk.High,
  },
  {
    City: "Lower Parel",
    latitude: 18.99568,
    longitude: 72.830276,
    risk_zone: "High",
    police_needed: policeByRisk.High,
  },
  {
    City: "Malad",
    latitude: 19.186719,
    longitude: 72.848588,
    risk_zone: "Low",
    police_needed: policeByRisk.Low,
  },
  {
    City: "Mankhurd",
    latitude: 19.048518,
    longitude: 72.932336,
    risk_zone: "High",
    police_needed: policeByRisk.High,
  },
  {
    City: "Matunga",
    latitude: 19.027436,
    longitude: 72.850147,
    risk_zone: "High",
    police_needed: policeByRisk.High,
  },
  {
    City: "Mulund",
    latitude: 19.172176,
    longitude: 72.956238,
    risk_zone: "High",
    police_needed: policeByRisk.High,
  },
  {
    City: "Navi Mumbai",
    latitude: 19.151101,
    longitude: 72.999536,
    risk_zone: "High",
    police_needed: policeByRisk.High,
  },
  {
    City: "Nerul",
    latitude: 19.033594,
    longitude: 73.018164,
    risk_zone: "Medium",
    police_needed: policeByRisk.Medium,
  },
  {
    City: "Parel",
    latitude: 19.008427,
    longitude: 72.842505,
    risk_zone: "High",
    police_needed: policeByRisk.High,
  },
  {
    City: "Powai",
    latitude: 19.11872,
    longitude: 72.907348,
    risk_zone: "High",
    police_needed: policeByRisk.High,
  },
  {
    City: "Saki Naka",
    latitude: 19.108206,
    longitude: 72.88284,
    risk_zone: "Medium",
    police_needed: policeByRisk.Medium,
  },
  {
    City: "Sion",
    latitude: 19.046521,
    longitude: 72.863283,
    risk_zone: "High",
    police_needed: policeByRisk.High,
  },
  {
    City: "Thane East",
    latitude: 19.033817,
    longitude: 73.017041,
    risk_zone: "Medium",
    police_needed: policeByRisk.Medium,
  },
  {
    City: "Thane West",
    latitude: 19.010742,
    longitude: 73.011756,
    risk_zone: "Medium",
    police_needed: policeByRisk.Medium,
  },
  {
    City: "Vashi",
    latitude: 19.063248,
    longitude: 72.998797,
    risk_zone: "Medium",
    police_needed: policeByRisk.Medium,
  },
  {
    City: "Vikhroli",
    latitude: 19.11148,
    longitude: 72.928021,
    risk_zone: "High",
    police_needed: policeByRisk.High,
  },
  {
    City: "Vile Parle",
    latitude: 19.09991,
    longitude: 72.844004,
    risk_zone: "Medium",
    police_needed: policeByRisk.Medium,
  },
  {
    City: "Wadala",
    latitude: 19.026919,
    longitude: 72.875934,
    risk_zone: "High",
    police_needed: policeByRisk.High,
  },
];

// =======================
// Main Component
// =======================
interface CrimeMapProps {
  filters?: {
    crimeType: string;
  };
}

export function CrimeMap({ filters }: CrimeMapProps) {
  const [crimeHotspots, setCrimeHotspots] = useState<Hotspot[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const mapRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    setCrimeHotspots(FALLBACK_HOTSPOTS);
    setLoading(false);
    setError(null);
  }, [isClient]);

  // Filter hotspots based on selected risk level
  const filteredHotspots = crimeHotspots.filter((spot) => {
    if (!filters || filters.crimeType === "all") return true;

    const filterMapping: Record<string, Level> = {
      theft: "Low",
      assault: "Medium",
      robbery: "High",
      fraud: "Low",
      vandalism: "Low",
      cyber: "Medium",
    };

    const targetRiskZone = filterMapping[filters.crimeType];
    return targetRiskZone ? spot.risk_zone === targetRiskZone : true;
  });

  const handleLocationClick = (city: string) => {
    router.push(`/analytics/location?location=${encodeURIComponent(city)}`);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
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

  // Fullscreen view
  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        {/* Fullscreen Header */}
        <div className="absolute top-0 left-0 right-0 z-[1001] bg-background/95 backdrop-blur border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Live Crime Zone Map (Mumbai)
              </h2>
              <p className="text-sm text-muted-foreground">
                Showing {filteredHotspots.length} of {crimeHotspots.length} locations
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="h-10 w-10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Active Filter Banner in Fullscreen */}
          {filters && filters.crimeType !== "all" && (
            <div className="mt-3 p-2 rounded-lg bg-primary/10 border border-primary/30 text-sm">
              <span className="font-medium">Active Filter:</span> Showing{" "}
              <span className="capitalize font-semibold">{filters.crimeType}</span> zones
            </div>
          )}
        </div>

        {/* Fullscreen Map */}
        <div className="h-full w-full pt-24">
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

              {filteredHotspots.map((spot, index) => (
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

        {/* Fullscreen Legend */}
        <div className="absolute bottom-6 right-6 z-[1001] rounded-lg bg-background/95 backdrop-blur p-4 shadow-lg border border-border">
          <p className="mb-3 text-sm font-semibold text-foreground">
            Crime Severity
          </p>
          <div className="space-y-2">
            <Legend color="red" label="High Risk" />
            <Legend color="orange" label="Medium Risk" />
            <Legend color="green" label="Low Risk" />
          </div>
        </div>
      </div>
    );
  }

  // Normal view
  return (
    <Card className="col-span-2 bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">
          Live Crime Zone Map (Mumbai)
        </CardTitle>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleFullscreen}
            className="h-8 w-8"
          >
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

        {/* Filter Info */}
        {filters && filters.crimeType !== "all" && (
          <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/30 text-sm">
            <span className="font-medium">Active Filter:</span> Showing{" "}
            <span className="capitalize font-semibold">{filters.crimeType}</span> zones ({filteredHotspots.length} locations)
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

              {filteredHotspots.map((spot, index) => (
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
          <span className="text-xs text-muted-foreground">
            Showing {filteredHotspots.length} of {crimeHotspots.length} locations
          </span>
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