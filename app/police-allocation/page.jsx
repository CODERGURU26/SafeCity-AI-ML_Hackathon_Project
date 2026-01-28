"use client"

import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Users, MapPin, Phone, AlertCircle } from "lucide-react"
import { useState } from "react"

const allocationData = [
  {
    id: 1,
    location: "Andheri West",
    allocatedOfficers: 15,
    availableOfficers: 8,
    requiredOfficers: 12,
    status: "optimal",
  },
  {
    id: 2,
    location: "Bandra",
    allocatedOfficers: 12,
    availableOfficers: 3,
    requiredOfficers: 18,
    status: "critical",
  },
  {
    id: 3,
    location: "Powai",
    allocatedOfficers: 18,
    availableOfficers: 10,
    requiredOfficers: 15,
    status: "optimal",
  },
  {
    id: 4,
    location: "Kurla",
    allocatedOfficers: 14,
    availableOfficers: 5,
    requiredOfficers: 16,
    status: "warning",
  },
  {
    id: 5,
    location: "Dadar",
    allocatedOfficers: 16,
    availableOfficers: 12,
    requiredOfficers: 14,
    status: "optimal",
  },
]

export default function PoliceAllocationPage() {
  const [data, setData] = useState(allocationData)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    allocatedOfficers: "",
    availableOfficers: "",
    requiredOfficers: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleEditClick = (item) => {
    setEditingId(item.id)
    setFormData({
      allocatedOfficers: item.allocatedOfficers,
      availableOfficers: item.availableOfficers,
      requiredOfficers: item.requiredOfficers,
    })
    setIsDialogOpen(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }))
  }

  const handleSave = () => {
    setData((prev) =>
      prev.map((item) =>
        item.id === editingId
          ? {
              ...item,
              allocatedOfficers: formData.allocatedOfficers,
              availableOfficers: formData.availableOfficers,
              requiredOfficers: formData.requiredOfficers,
            }
          : item
      )
    )
    setIsDialogOpen(false)
    setEditingId(null)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "optimal":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/30">Optimal</Badge>
      case "warning":
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30">Warning</Badge>
      case "critical":
        return <Badge variant="destructive" className="bg-red-500/80">Critical</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Police Allocation</h1>
          <p className="text-muted-foreground">Manage and monitor police officer distribution across zones</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Allocated</p>
                  <p className="text-3xl font-bold text-foreground">75</p>
                </div>
                <Users className="h-12 w-12 text-primary/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Available Officers</p>
                  <p className="text-3xl font-bold text-foreground">38</p>
                </div>
                <Users className="h-12 w-12 text-green-500/30" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Required Officers</p>
                  <p className="text-3xl font-bold text-foreground">75</p>
                </div>
                <AlertCircle className="h-12 w-12 text-red-500/30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Allocation Table */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Zone-wise Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-muted-foreground font-semibold">Location</TableHead>
                    <TableHead className="text-center text-muted-foreground font-semibold">Allocated</TableHead>
                    <TableHead className="text-center text-muted-foreground font-semibold">Available</TableHead>
                    <TableHead className="text-center text-muted-foreground font-semibold">Required</TableHead>
                    <TableHead className="text-center text-muted-foreground font-semibold">Status</TableHead>
                    <TableHead className="text-right text-muted-foreground font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id} className="border-border hover:bg-secondary/50">
                      <TableCell className="text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {item.location}
                      </TableCell>
                      <TableCell className="text-center text-foreground">{item.allocatedOfficers}</TableCell>
                      <TableCell className="text-center text-foreground">{item.availableOfficers}</TableCell>
                      <TableCell className="text-center text-foreground">{item.requiredOfficers}</TableCell>
                      <TableCell className="text-center">{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-secondary border-border text-foreground hover:bg-secondary/80"
                          onClick={() => handleEditClick(item)}
                        >
                          Adjust
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Edit Officer Allocation</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Manually update the officer numbers for this location
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="allocatedOfficers" className="text-foreground">
                  Allocated Officers
                </Label>
                <Input
                  id="allocatedOfficers"
                  name="allocatedOfficers"
                  type="number"
                  value={formData.allocatedOfficers}
                  onChange={handleInputChange}
                  className="bg-secondary border-border text-foreground"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availableOfficers" className="text-foreground">
                  Available Officers
                </Label>
                <Input
                  id="availableOfficers"
                  name="availableOfficers"
                  type="number"
                  value={formData.availableOfficers}
                  onChange={handleInputChange}
                  className="bg-secondary border-border text-foreground"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requiredOfficers" className="text-foreground">
                  Required Officers
                </Label>
                <Input
                  id="requiredOfficers"
                  name="requiredOfficers"
                  type="number"
                  value={formData.requiredOfficers}
                  onChange={handleInputChange}
                  className="bg-secondary border-border text-foreground"
                  min="0"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-border text-foreground hover:bg-secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  )
}
