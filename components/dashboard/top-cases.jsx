"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, Users, MapPin, Phone, ExternalLink } from "lucide-react"
import Link from "next/link"

const PRIORITY_STYLES = {
  high:   "bg-destructive/10 text-destructive border-destructive/30",
  medium: "bg-warning/10 text-warning border-warning/30",
  low:    "bg-muted text-muted-foreground border-border",
}

const STATUS_STYLES = {
  open:          "bg-primary/10 text-primary border-primary/30",
  investigating: "bg-warning/10 text-warning border-warning/30",
  closed:        "bg-success/10 text-success border-success/30",
}

const OFFICER_STATUS_STYLES = {
  "On Duty":   "bg-success/10 text-success border-success/30",
  "On Patrol": "bg-primary/10 text-primary border-primary/30",
  "Off Duty":  "bg-muted text-muted-foreground border-border",
  "On Leave":  "bg-warning/10 text-warning border-warning/30",
}

const OFFICER_STATUS_DOT = {
  "On Duty":   "bg-success",
  "On Patrol": "bg-primary",
  "Off Duty":  "bg-muted-foreground",
  "On Leave":  "bg-warning",
}

function CaseSkeleton() {
  return (
    <div className="space-y-2">
      {[1,2,3].map(i => (
        <div key={i} className="rounded-lg border border-border p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="skeleton h-3 w-28 rounded" />
            <div className="skeleton h-4 w-14 rounded-full" />
          </div>
          <div className="skeleton h-3 w-40 rounded mb-1" />
          <div className="skeleton h-2 w-20 rounded" />
        </div>
      ))}
    </div>
  )
}

export default function TopCases() {
  const [cases, setCases] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/fir?priority=high&status=open&limit=5&page=1")
        if (res.ok) {
          const data = await res.json()
          if (data.success) {
            // Also try investigating
            const res2 = await fetch("/api/fir?status=investigating&limit=3&page=1")
            let combined = data.data || []
            if (res2.ok) {
              const data2 = await res2.json()
              if (data2.success) {
                // Merge, deduplicate by firId, cap at 8
                const ids = new Set(combined.map(c => c.firId))
                const extra = (data2.data || []).filter(c => !ids.has(c.firId))
                combined = [...combined, ...extra].slice(0, 8)
              }
            }
            setCases(combined)
          }
        }
      } catch (err) {
        console.error("Top cases fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetch_()
  }, [])

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span className="font-semibold text-sm text-foreground">Priority Cases</span>
        </div>
        <Link
          href="/fir-data"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          View all <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      <ScrollArea className="h-[280px]">
        <div className="p-3 space-y-2">
          {loading ? (
            <CaseSkeleton />
          ) : cases.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
              <Shield className="h-8 w-8 mb-2 opacity-30" />
              <p className="text-sm">No open cases</p>
            </div>
          ) : (
            cases.map((c, i) => (
              <div
                key={c.firId || c._id}
                className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-primary">{c.firId}</span>
                    <span className={`text-[10px] font-semibold rounded-full border px-1.5 py-0.5 capitalize ${PRIORITY_STYLES[c.priority] || PRIORITY_STYLES.low}`}>
                      {c.priority}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/80 truncate">
                    {c.type} &bull; <span className="flex items-center gap-1 inline-flex"><MapPin className="h-2.5 w-2.5 inline" />{c.location}</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{c.date} &bull; {c.officer}</p>
                </div>
                <span className={`shrink-0 text-[10px] font-semibold rounded-full border px-2 py-0.5 capitalize ${STATUS_STYLES[c.status] || ""}`}>
                  {c.status === "investigating" ? "Active" : c.status}
                </span>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

export function ActiveOfficers() {
  const [officers, setOfficers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/officers?limit=8")
        if (res.ok) {
          const data = await res.json()
          if (data.success) setOfficers(data.data)
        }
      } catch (err) {
        console.error("Officers fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetch_()
  }, [])

  const getInitials = (name) =>
    name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <span className="font-semibold text-sm text-foreground">Active Officers</span>
        </div>
        <Link
          href="/police-allocation"
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          Manage <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      <ScrollArea className="h-[280px]">
        <div className="p-3 space-y-2">
          {loading ? (
            <div className="space-y-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <div className="skeleton h-8 w-8 rounded-full shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="skeleton h-3 w-28 rounded" />
                    <div className="skeleton h-2.5 w-20 rounded" />
                  </div>
                  <div className="skeleton h-5 w-16 rounded-full" />
                </div>
              ))}
            </div>
          ) : officers.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
              <Users className="h-8 w-8 mb-2 opacity-30" />
              <p className="text-sm">No officers found</p>
            </div>
          ) : (
            officers.map((officer, i) => (
              <div
                key={officer._id}
                className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/25">
                      <span className="text-[10px] font-bold text-primary">{getInitials(officer.name)}</span>
                    </div>
                    <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-card ${OFFICER_STATUS_DOT[officer.status] || "bg-muted-foreground"}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold text-foreground truncate">{officer.name}</p>
                      <span className="text-[9px] text-muted-foreground shrink-0">#{officer.badge}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {officer.rank} &bull; Zone: {officer.zone}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`text-[10px] font-semibold rounded-full border px-2 py-0.5 ${OFFICER_STATUS_STYLES[officer.status] || ""}`}>
                    {officer.status}
                  </span>
                  <span className="text-[9px] text-muted-foreground">{officer.caseCount} cases</span>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
