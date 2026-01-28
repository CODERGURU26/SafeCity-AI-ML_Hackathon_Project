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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { MoreHorizontal, Edit, Trash2, Download, Loader2, Plus, FileText, Upload } from "lucide-react"
import { useFIRData } from "@/hooks/use-fir-data"
import { exportToExcel, exportToCSV, getTimestamp } from "@/lib/export-fir"
import NewFIRForm from "./new-fir-form"
import ImportFIRForm from "./import-fir-form"
import EditFIRForm from "./edit-fir-form"
import { toast } from "sonner"

// Fallback data for when MongoDB is not connected
const fallbackFireData = [
  {
    firId: "FIR-2024-1847",
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
    firId: "FIR-2024-1846",
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
    firId: "FIR-2024-1845",
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
    firId: "FIR-2024-1844",
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
    firId: "FIR-2024-1843",
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
    firId: "FIR-2024-1842",
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
    firId: "FIR-2024-1841",
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
    firId: "FIR-2024-1840",
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
    firId: "FIR-2024-1839",
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
    firId: "FIR-2024-1838",
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
    firId: "FIR-2024-1837",
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
    firId: "FIR-2024-1836",
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
    firId: "FIR-2024-1835",
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
    firId: "FIR-2024-1834",
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
    firId: "FIR-2024-1833",
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
    firId: "FIR-2024-1832",
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
    firId: "FIR-2024-1831",
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
    firId: "FIR-2024-1830",
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
    firId: "FIR-2024-1829",
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
    firId: "FIR-2024-1828",
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
    firId: "FIR-2024-1827",
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
    firId: "FIR-2024-1826",
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
    firId: "FIR-2024-1825",
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
    firId: "FIR-2024-1824",
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
    firId: "FIR-2024-1823",
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
    firId: "FIR-2024-1822",
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
    firId: "FIR-2024-1821",
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
    firId: "FIR-2024-1820",
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
    firId: "FIR-2024-1819",
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
    firId: "FIR-2024-1818",
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
    firId: "FIR-2024-1817",
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
    firId: "FIR-2024-1816",
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
  const [isNewFIROpen, setIsNewFIROpen] = useState(false)
  const [isImportOpen, setIsImportOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedFIR, setSelectedFIR] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [firToDelete, setFirToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const { firs, loading, error, pagination, fetchFIRs, deleteFIR } = useFIRData()

  // Fetch FIRs when filters or search changes
  useEffect(() => {
    const filters = {}

    for (const filter of activeFilters) {
      if (filter.type === "status") filters.status = filter.value
      if (filter.type === "type") filters.type = filter.value
      if (filter.type === "priority") filters.priority = filter.value
    }

    fetchFIRs(currentPage, searchQuery, filters)
  }, [currentPage, searchQuery, activeFilters, fetchFIRs])

  // Notify parent of total items count
  useEffect(() => {
    if (onTotalItemsChange) {
      onTotalItemsChange(pagination.total || 0)
    }
  }, [pagination.total, onTotalItemsChange])

  const displayData = firs.length > 0 ? firs : fallbackFireData
  const isUsingFallback = firs.length === 0 && !loading

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    setSelectedRows((prev) =>
      prev.length === displayData.length ? [] : displayData.map((row) => row.firId)
    )
  }

  const handleExportExcel = async () => {
    try {
      setIsExporting(true)
      const dataToExport = selectedRows.length > 0
        ? displayData.filter((fir) => selectedRows.includes(fir.firId))
        : displayData

      if (dataToExport.length === 0) {
        toast.error("No data to export")
        return
      }

      await exportToExcel(dataToExport, `FIR-Records-${getTimestamp()}`)
      toast.success(`Exported ${dataToExport.length} FIR records to Excel`)
    } catch (error) {
      console.error("Export failed:", error)
      toast.error("Failed to export data")
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportCSV = () => {
    try {
      setIsExporting(true)
      const dataToExport = selectedRows.length > 0
        ? displayData.filter((fir) => selectedRows.includes(fir.firId))
        : displayData

      if (dataToExport.length === 0) {
        toast.error("No data to export")
        return
      }

      exportToCSV(dataToExport, `FIR-Records-${getTimestamp()}`)
      toast.success(`Exported ${dataToExport.length} FIR records to CSV`)
    } catch (error) {
      console.error("Export failed:", error)
      toast.error("Failed to export data")
    } finally {
      setIsExporting(false)
    }
  }

  const handleEditFIR = (fir) => {
    setSelectedFIR(fir)
    setIsEditOpen(true)
  }

  const handleDeleteFIR = (fir) => {
    setFirToDelete(fir)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!firToDelete) return

    setIsDeleting(true)
    try {
      await deleteFIR(firToDelete.firId || firToDelete._id)
      toast.success("FIR deleted successfully")
      setIsDeleteDialogOpen(false)
      setFirToDelete(null)
      fetchFIRs()
    } catch (error) {
      console.error("Error deleting FIR:", error)
      toast.error(error.message || "Failed to delete FIR")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEditSuccess = () => {
    setIsEditOpen(false)
    setSelectedFIR(null)
    fetchFIRs()
  }

  const handleImportSuccess = () => {
    setSelectedRows([])
    fetchFIRs()
  }

  const handleNewFIRSuccess = () => {
    setSelectedRows([])
    fetchFIRs()
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex gap-2">
          <Button
            onClick={() => setIsNewFIROpen(true)}
            className="gap-2"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            New FIR
          </Button>

          <Button
            onClick={() => setIsImportOpen(true)}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Import
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                disabled={isExporting}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Export
                {isExporting && <Loader2 className="h-4 w-4 animate-spin ml-1" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={handleExportExcel} disabled={isExporting}>
                <FileText className="mr-2 h-4 w-4" />
                Export to Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportCSV} disabled={isExporting}>
                <FileText className="mr-2 h-4 w-4" />
                Export to CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {selectedRows.length > 0 && (
          <div className="text-sm text-muted-foreground">
            {selectedRows.length} selected
          </div>
        )}
      </div>

      {/* Modals will be rendered at the end of the component */}

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-muted-foreground">Loading FIRs...</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-destructive/10 border-b border-destructive/20 text-destructive text-sm rounded-t-lg">
          ⚠️ Error: {error}. Showing sample data.
        </div>
      )}

      {isUsingFallback && (
        <div className="p-4 bg-warning/10 border-b border-warning/20 text-warning text-sm rounded-t-lg">
          ℹ️ MongoDB not connected. Showing sample data. Please configure MONGODB_URI in .env.local
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-12">
              <Checkbox
                checked={selectedRows.length === displayData.length && displayData.length > 0}
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
          {displayData.length === 0 ? (
            <TableRow>
              <TableCell colSpan="10" className="text-center py-8 text-muted-foreground">
                No results found
              </TableCell>
            </TableRow>
          ) : (
            displayData.map((fir) => (
              <TableRow
                key={fir.firId}
                className="border-border hover:bg-secondary/50 transition-colors"
              >
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(fir.firId)}
                    onCheckedChange={() => toggleRow(fir.firId)}
                    className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </TableCell>
                <TableCell className="font-mono text-sm text-primary">{fir.firId}</TableCell>
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
                      <DropdownMenuItem
                        className="text-foreground focus:bg-secondary cursor-pointer"
                        onClick={() => handleEditFIR(fir)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:bg-secondary cursor-pointer"
                        onClick={() => handleDeleteFIR(fir)}
                      >
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

      {/* Edit FIR Form */}
      <EditFIRForm
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        firData={selectedFIR}
        onSuccess={handleEditSuccess}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete FIR</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete FIR {firToDelete?.firId}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* New FIR Form */}
      <NewFIRForm
        isOpen={isNewFIROpen}
        onOpenChange={setIsNewFIROpen}
        onSuccess={handleNewFIRSuccess}
        useFIRData={useFIRData}
      />

      {/* Import FIR Form */}
      <ImportFIRForm
        isOpen={isImportOpen}
        onOpenChange={setIsImportOpen}
        onSuccess={handleImportSuccess}
        useFIRData={useFIRData}
      />
    </div>
  )
}
