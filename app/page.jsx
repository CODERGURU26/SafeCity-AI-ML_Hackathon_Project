import { AppShell } from "@/components/layout/app-shell"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { CrimeMap } from "@/components/dashboard/crime-map"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { QuickFilters } from "@/components/dashboard/quick-filters"
// import 'leaflet/dist/leaflet.css';

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Real-time crime monitoring and analytics</p>
        </div>

        {/* Stats */}
        <StatsCards />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Map + Activity */}
          <div className="lg:col-span-2 space-y-6">
            <CrimeMap />
          </div>

          {/* Sidebar Widgets */}
          <div className="space-y-6">
            <QuickFilters />
            <RecentActivity />
          </div>
        </div>
      </div>
    </AppShell>
  )
}
