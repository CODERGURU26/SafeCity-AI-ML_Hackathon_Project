"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Left Section */}
      <div className="flex items-center gap-4">
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
      </div>

      {/* Center Section */}
      <div className="flex items-center">
   
          <div className="text-center">
            <p className="text-sm font-bold text-foreground">Mira-Bhyandar Police Department</p>
          </div>
        
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <Card className="px-4 py-2 bg-secondary border-border">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">5 Active Centers</p>
          </div>
        </Card>
      </div>
    </header>
  )
}
