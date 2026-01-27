"use client"

import { Bell, Search, User, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search locations, cases..."
            className="w-80 bg-secondary pl-10 text-foreground placeholder:text-muted-foreground focus:ring-primary"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Location Indicator */}
        <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm text-foreground">Mumbai, MH</span>
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-destructive p-0 text-xs text-destructive-foreground">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-card border-border">
            <DropdownMenuLabel className="text-foreground">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 focus:bg-secondary">
              <span className="text-sm font-medium text-foreground">High Alert: Andheri West</span>
              <span className="text-xs text-muted-foreground">3 incidents reported in last hour</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 focus:bg-secondary">
              <span className="text-sm font-medium text-foreground">New FIR Filed</span>
              <span className="text-xs text-muted-foreground">Case #2024-1847 requires review</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 focus:bg-secondary">
              <span className="text-sm font-medium text-foreground">Patrol Update</span>
              <span className="text-xs text-muted-foreground">Unit 7 completed sector sweep</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="hidden flex-col items-start md:flex">
                <span className="text-sm font-medium text-foreground">Inspector Shah</span>
                <span className="text-xs text-muted-foreground">Zone 4 Command</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border-border">
            <DropdownMenuLabel className="text-foreground">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="text-foreground focus:bg-secondary">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-foreground focus:bg-secondary">Settings</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem className="text-destructive focus:bg-secondary">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
