"use client"

import React, { useState, useEffect } from "react"
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
  {
    id: "FIR-2024-1839",
    date: "2024-01-25",
    time: "19:15",
    type: "Theft",
    location: "Lower Parel",
    complainant: "Kapil Sharma",
    status: "open",
    priority: "medium",
    officer: "SI Patil",
  },
  {
    id: "FIR-2024-1838",
    date: "2024-01-25",
    time: "17:30",
    type: "Robbery",
    location: "Colaba",
    complainant: "Arjun Nair",
    status: "closed",
    priority: "high",
    officer: "SI Deshmukh",
  },
  {
    id: "FIR-2024-1837",
    date: "2024-01-25",
    time: "15:45",
    type: "Fraud",
    location: "Vile Parle",
    complainant: "Meera Patel",
    status: "investigating",
    priority: "medium",
    officer: "SI Kulkarni",
  },
  {
    id: "FIR-2024-1836",
    date: "2024-01-25",
    time: "14:20",
    type: "Vandalism",
    location: "Thane",
    complainant: "Rohit Gupta",
    status: "open",
    priority: "low",
    officer: "SI Jadhav",
  },
  {
    id: "FIR-2024-1835",
    date: "2024-01-25",
    time: "12:00",
    type: "Cyber Crime",
    location: "Fort",
    complainant: "Divya Reddy",
    status: "investigating",
    priority: "high",
    officer: "SI Patil",
  },
  {
    id: "FIR-2024-1834",
    date: "2024-01-24",
    time: "20:30",
    type: "Theft",
    location: "Borivali",
    complainant: "Sanjay Kumar",
    status: "closed",
    priority: "low",
    officer: "SI Deshmukh",
  },
  {
    id: "FIR-2024-1833",
    date: "2024-01-24",
    time: "18:45",
    type: "Assault",
    location: "Navi Mumbai",
    complainant: "Pooja Singh",
    status: "open",
    priority: "high",
    officer: "SI Kulkarni",
  },
  {
    id: "FIR-2024-1832",
    date: "2024-01-24",
    time: "16:15",
    type: "Robbery",
    location: "Dombivali",
    complainant: "Vikram Verma",
    status: "investigating",
    priority: "high",
    officer: "SI Jadhav",
  },
  {
    id: "FIR-2024-1831",
    date: "2024-01-24",
    time: "14:50",
    type: "Fraud",
    location: "Panvel",
    complainant: "Anjali Sharma",
    status: "open",
    priority: "medium",
    officer: "SI Patil",
  },
  {
    id: "FIR-2024-1830",
    date: "2024-01-24",
    time: "13:30",
    type: "Cyber Crime",
    location: "Airoli",
    complainant: "Rohan Patel",
    status: "closed",
    priority: "medium",
    officer: "SI Deshmukh",
  },
  {
    id: "FIR-2024-1829",
    date: "2024-01-24",
    time: "11:45",
    type: "Vandalism",
    location: "Kalyan",
    complainant: "Sunita Desai",
    status: "investigating",
    priority: "low",
    officer: "SI Kulkarni",
  },
  {
    id: "FIR-2024-1828",
    date: "2024-01-23",
    time: "20:20",
    type: "Theft",
    location: "Ulhasnagar",
    complainant: "Manoj Reddy",
    status: "open",
    priority: "high",
    officer: "SI Jadhav",
  },
  {
    id: "FIR-2024-1827",
    date: "2024-01-23",
    time: "19:00",
    type: "Assault",
    location: "Ambernath",
    complainant: "Priya Sharma",
    status: "open",
    priority: "medium",
    officer: "SI Patil",
  },
  {
    id: "FIR-2024-1826",
    date: "2024-01-23",
    time: "17:30",
    type: "Robbery",
    location: "Badlapur",
    complainant: "Harshad Singh",
    status: "closed",
    priority: "high",
    officer: "SI Deshmukh",
  },
  {
    id: "FIR-2024-1825",
    date: "2024-01-23",
    time: "16:00",
    type: "Fraud",
    location: "Khopoli",
    complainant: "Kavya Gupta",
    status: "investigating",
    priority: "low",
    officer: "SI Kulkarni",
  },
  {
    id: "FIR-2024-1824",
    date: "2024-01-23",
    time: "14:45",
    type: "Cyber Crime",
    location: "Matheran",
    complainant: "Anil Verma",
    status: "open",
    priority: "high",
    officer: "SI Jadhav",
  },
  {
    id: "FIR-2024-1823",
    date: "2024-01-23",
    time: "13:15",
    type: "Vandalism",
    location: "Raigad",
    complainant: "Rita Patel",
    status: "investigating",
    priority: "medium",
    officer: "SI Patil",
  },
  {
    id: "FIR-2024-1822",
    date: "2024-01-22",
    time: "20:00",
    type: "Theft",
    location: "Raigarh",
    complainant: "Saurabh Kumar",
    status: "closed",
    priority: "low",
    officer: "SI Deshmukh",
  },
  {
    id: "FIR-2024-1821",
    date: "2024-01-22",
    time: "18:30",
    type: "Assault",
    location: "Satara",
    complainant: "Deepti Sharma",
    status: "open",
    priority: "high",
    officer: "SI Kulkarni",
  },
  {
    id: "FIR-2024-1820",
    date: "2024-01-22",
    time: "17:00",
    type: "Robbery",
    location: "Kolhapur",
    complainant: "Nikhil Singh",
    status: "investigating",
    priority: "high",
    officer: "SI Jadhav",
  },
  {
    id: "FIR-2024-1819",
    date: "2024-01-22",
    time: "15:30",
    type: "Fraud",
    location: "Sangli",
    complainant: "Nisha Gupta",
    status: "open",
    priority: "medium",
    officer: "SI Patil",
  },
  {
    id: "FIR-2024-1818",
    date: "2024-01-22",
    time: "14:00",
    type: "Cyber Crime",
    location: "Chiplun",
    complainant: "Vikram Reddy",
    status: "closed",
    priority: "medium",
    officer: "SI Deshmukh",
  },
  {
    id: "FIR-2024-1817",
    date: "2024-01-22",
    time: "12:45",
    type: "Vandalism",
    location: "Belgaum",
    complainant: "Swetha Patel",
    status: "investigating",
    priority: "low",
    officer: "SI Kulkarni",
  },
  {
    id: "FIR-2024-1816",
    date: "2024-01-21",
    time: "20:15",
    type: "Theft",
    location: "Belgaum City",
    complainant: "Rajeev Kumar",
    status: "open",
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

export function FIRTable({ activeFilters = [], searchQuery = "", currentPage = 1, itemsPerPage = 8, onTotalItemsChange }) {
  const [selectedRows, setSelectedRows] = useState([])

  // Filter the data based on search query and active filters
  const filteredData = firData.filter((fir) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch = 
        fir.id.toLowerCase().includes(query) ||
        fir.complainant.toLowerCase().includes(query) ||
        fir.location.toLowerCase().includes(query)
      
      if (!matchesSearch) return false
    }

    // Active filters
    for (const filter of activeFilters) {
      if (filter.type === "status" && fir.status !== filter.value) return false
      if (filter.type === "type" && fir.type.toLowerCase() !== filter.value.toLowerCase()) return false
      if (filter.type === "priority" && fir.priority !== filter.value) return false
    }

    return true
  })

  // Calculate pagination
  const totalItems = filteredData.length
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  // Notify parent of total items count
  useEffect(() => {
    if (onTotalItemsChange) {
      onTotalItemsChange(totalItems)
    }
  }, [filteredData.length, onTotalItemsChange])

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    setSelectedRows((prev) =>
      prev.length === paginatedData.length ? [] : paginatedData.map((row) => row.id)
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
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
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan="10" className="text-center py-8 text-muted-foreground">
                No results found
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((fir) => (
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
          ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
