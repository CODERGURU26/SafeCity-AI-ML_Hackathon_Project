"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2, Download } from "lucide-react"

const firData = [
  {
    id: "FIR-2024-1847",
    date: "2024-01-27",
    time: "14:32",
    type: "Theft",
    location: "Andheri West",
    complainant: "Rajesh Kumar",
    status: "open",
    priority: "high",
    officer: "SI Patil",
  },
  {
    id: "FIR-2024-1846",
    date: "2024-01-27",
    time: "12:15",
    type: "Assault",
    location: "Bandra",
    complainant: "Priya Sharma",
    status: "investigating",
    priority: "high",
    officer: "SI Deshmukh",
  },
  {
    id: "FIR-2024-1845",
    date: "2024-01-27",
    time: "10:45",
    type: "Fraud",
    location: "Powai",
    complainant: "Amit Verma",
    status: "open",
    priority: "medium",
    officer: "SI Kulkarni",
  },
  {
    id: "FIR-2024-1844",
    date: "2024-01-26",
    time: "22:30",
    type: "Robbery",
    location: "Kurla",
    complainant: "Sunita Patel",
    status: "closed",
    priority: "high",
    officer: "SI Jadhav",
  },
  {
    id: "FIR-2024-1843",
    date: "2024-01-26",
    time: "18:20",
    type: "Vandalism",
    location: "Dadar",
    complainant: "Mohammed Ali",
    status: "investigating",
    priority: "low",
    officer: "SI Patil",
  },
  {
    id: "FIR-2024-1842",
    date: "2024-01-26",
    time: "15:10",
    type: "Cyber Crime",
    location: "Goregaon",
    complainant: "Sneha Reddy",
    status: "open",
    priority: "medium",
    officer: "SI Deshmukh",
  },
  {
    id: "FIR-2024-1841",
    date: "2024-01-26",
    time: "11:00",
    type: "Theft",
    location: "Malad",
    complainant: "Vikram Singh",
    status: "closed",
    priority: "low",
    officer: "SI Kulkarni",
  },
  {
    id: "FIR-2024-1840",
    date: "2024-01-25",
    time: "20:45",
    type: "Assault",
    location: "Vikhroli",
    complainant: "Neha Gupta",
    status: "investigating",
    priority: "high",
    officer: "SI Jadhav",
  },
]

const getStatusBadge = (status) => {
  switch (status) {
    case "open":
      return <Badge className="bg-primary/10 text-primary border-primary/30">Open</Badge>
    case "investigating":
      return <Badge className="bg-warning/10 text-warning border-warning/30">Investigating</Badge>
    case "closed":
      return <Badge className="bg-success/10 text-success border-success/30">Closed</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const getPriorityBadge = (priority) => {
  switch (priority) {
    case "high":
      return <Badge variant="destructive" className="bg-destructive/80">High</Badge>
    case "medium":
      return <Badge className="bg-warning/80 text-warning-foreground">Medium</Badge>
    case "low":
      return <Badge className="bg-muted text-muted-foreground">Low</Badge>
    default:
      return <Badge variant="outline">{priority}</Badge>
  }
}

export function FIRTable() {
  const [selectedRows, setSelectedRows] = useState([])

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    setSelectedRows((prev) =>
      prev.length === firData.length ? [] : firData.map((row) => row.id)
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedRows.length === firData.length}
                onCheckedChange={toggleAll}
                className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
            </TableHead>
            <TableHead className="text-muted-foreground font-semibold">FIR ID</TableHead>
            <TableHead className="text-muted-foreground font-semibold">Date & Time</TableHead>
            <TableHead className="text-muted-foreground font-semibold">Type</TableHead>
            <TableHead className="text-muted-foreground font-semibold">Location</TableHead>
            <TableHead className="text-muted-foreground font-semibold">Complainant</TableHead>
            <TableHead className="text-muted-foreground font-semibold">Status</TableHead>
            <TableHead className="text-muted-foreground font-semibold">Priority</TableHead>
            <TableHead className="text-muted-foreground font-semibold">Officer</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {firData.map((fir) => (
            <TableRow
              key={fir.id}
              className="border-border hover:bg-secondary/50 transition-colors"
            >
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(fir.id)}
                  onCheckedChange={() => toggleRow(fir.id)}
                  className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
              </TableCell>
              <TableCell className="font-mono text-sm text-primary">{fir.id}</TableCell>
              <TableCell className="text-foreground">
                <div>
                  <div className="text-sm">{fir.date}</div>
                  <div className="text-xs text-muted-foreground">{fir.time}</div>
                </div>
              </TableCell>
              <TableCell className="text-foreground">{fir.type}</TableCell>
              <TableCell className="text-foreground">{fir.location}</TableCell>
              <TableCell className="text-foreground">{fir.complainant}</TableCell>
              <TableCell>{getStatusBadge(fir.status)}</TableCell>
              <TableCell>{getPriorityBadge(fir.priority)}</TableCell>
              <TableCell className="text-foreground">{fir.officer}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border-border">
                    <DropdownMenuItem className="text-foreground focus:bg-secondary">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-foreground focus:bg-secondary">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-foreground focus:bg-secondary">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive focus:bg-secondary">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
