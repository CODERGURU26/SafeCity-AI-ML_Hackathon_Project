"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, Users } from "lucide-react"

const topCasesData = [
  {
    id: 'FIR-2024-001',
    crimeType: 'Theft',
    location: 'Bandra West',
    date: '2024-01-25',
    status: 'Under Investigation',
    severity: 'high'
  },
  {
    id: 'FIR-2024-002',
    crimeType: 'Burglary',
    location: 'Andheri East',
    date: '2024-01-24',
    status: 'Pending',
    severity: 'critical'
  },
  {
    id: 'FIR-2024-003',
    crimeType: 'Fraud',
    location: 'Dadar',
    date: '2024-01-23',
    status: 'Resolved',
    severity: 'medium'
  },
  {
    id: 'FIR-2024-004',
    crimeType: 'Assault',
    location: 'Colaba',
    date: '2024-01-22',
    status: 'Under Investigation',
    severity: 'critical'
  },
  {
    id: 'FIR-2024-005',
    crimeType: 'Cybercrime',
    location: 'Fort',
    date: '2024-01-21',
    status: 'Pending',
    severity: 'high'
  }
]

const activeOfficersData = [
  {
    id: 'OFF-001',
    name: 'Rajesh Kumar',
    badge: '2401',
    zone: 'Bandra',
    status: 'On Duty',
    caseCount: 8
  },
  {
    id: 'OFF-002',
    name: 'Priya Singh',
    badge: '2402',
    zone: 'Andheri',
    status: 'On Duty',
    caseCount: 12
  },
  {
    id: 'OFF-003',
    name: 'Vikram Patel',
    badge: '2403',
    zone: 'Dadar',
    status: 'On Patrol',
    caseCount: 5
  },
  {
    id: 'OFF-004',
    name: 'Neha Sharma',
    badge: '2404',
    zone: 'Colaba',
    status: 'On Duty',
    caseCount: 9
  },
  {
    id: 'OFF-005',
    name: 'Anil Desai',
    badge: '2405',
    zone: 'Fort',
    status: 'Off Duty',
    caseCount: 6
  }
]

const getSeverityBadgeVariant = (severity) => {
  switch(severity) {
    case 'critical': return 'destructive'
    case 'high': return 'default'
    case 'medium': return 'secondary'
    default: return 'outline'
  }
}

const getStatusBadgeVariant = (status) => {
  switch(status) {
    case 'Resolved': return 'secondary'
    case 'Under Investigation': return 'default'
    case 'Pending': return 'outline'
    default: return 'secondary'
  }
}

const getOfficerStatusBadgeVariant = (status) => {
  switch(status) {
    case 'On Duty': return 'default'
    case 'On Patrol': return 'secondary'
    case 'Off Duty': return 'outline'
    default: return 'secondary'
  }
}

export default function TopCases() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Shield className="h-5 w-5 text-primary" />
          <span>Top Cases</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {topCasesData.map((caseItem) => (
              <div key={caseItem.id} className="flex items-start justify-between gap-4 p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-foreground">{caseItem.id}</span>
                    <Badge variant={getSeverityBadgeVariant(caseItem.severity)}>
                      {caseItem.severity.charAt(0).toUpperCase() + caseItem.severity.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{caseItem.crimeType} • {caseItem.location}</p>
                  <p className="text-xs text-muted-foreground">{caseItem.date}</p>
                </div>
                <div className="text-right whitespace-nowrap">
                  <Badge variant={getStatusBadgeVariant(caseItem.status)}>
                    {caseItem.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export function ActiveOfficers() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Users className="h-5 w-5 text-primary" />
          <span>Active Officers</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {activeOfficersData.map((officer) => (
              <div key={officer.id} className="flex items-start justify-between gap-4 p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-foreground">{officer.name}</span>
                    <span className="text-xs text-muted-foreground">#{officer.badge}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Zone: {officer.zone}</p>
                  <p className="text-xs text-muted-foreground">Active Cases: {officer.caseCount}</p>
                </div>
                <div className="text-right whitespace-nowrap">
                  <Badge variant={getOfficerStatusBadgeVariant(officer.status)}>
                    {officer.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
