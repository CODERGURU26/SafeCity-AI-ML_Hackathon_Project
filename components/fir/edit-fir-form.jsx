"use client"

import React, { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useFIRData } from "@/hooks/use-fir-data"
import { toast } from "sonner"

const EditFIRForm = ({ isOpen, onOpenChange, firData, onSuccess }) => {
    const { updateFIR } = useFIRData()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        type: "",
        location: "",
        complainant: "",
        status: "open",
        priority: "medium",
        officer: "",
        description: "",
        evidence: "",
        notes: "",
    })

    useEffect(() => {
        if (firData) {
            setFormData({
                date: firData.date || "",
                time: firData.time || "",
                type: firData.type || "",
                location: firData.location || "",
                complainant: firData.complainant || "",
                status: firData.status || "open",
                priority: firData.priority || "medium",
                officer: firData.officer || "",
                description: firData.description || "",
                evidence: firData.evidence || "",
                notes: firData.notes || "",
            })
        }
    }, [firData, isOpen])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const validateForm = () => {
        if (!formData.date) {
            toast.error("Date is required")
            return false
        }
        if (!formData.time) {
            toast.error("Time is required")
            return false
        }
        if (!formData.type) {
            toast.error("FIR Type is required")
            return false
        }
        if (!formData.location) {
            toast.error("Location is required")
            return false
        }
        if (!formData.complainant) {
            toast.error("Complainant name is required")
            return false
        }
        if (!formData.officer) {
            toast.error("Officer name is required")
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)
        try {
            console.log("Submitting update for FIR:", firData.firId)
            console.log("Form data:", formData)
            await updateFIR(firData.firId, formData)
            toast.success("FIR updated successfully!")
            onOpenChange(false)
            if (onSuccess) {
                onSuccess()
            }
        } catch (error) {
            console.error("Error updating FIR:", error)
            toast.error(error.message || "Failed to update FIR")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit FIR {firData?.firId}</DialogTitle>
                    <DialogDescription>
                        Update the First Information Report details
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Date and Time Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-sm font-medium">
                                Date <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="time" className="text-sm font-medium">
                                Time <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="time"
                                name="time"
                                type="time"
                                value={formData.time}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Type and Priority Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="type" className="text-sm font-medium">
                                FIR Type <span className="text-red-500">*</span>
                            </Label>
                            <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Theft">Theft</SelectItem>
                                    <SelectItem value="Assault">Assault</SelectItem>
                                    <SelectItem value="Robbery">Robbery</SelectItem>
                                    <SelectItem value="Fraud">Fraud</SelectItem>
                                    <SelectItem value="Cyber Crime">Cyber Crime</SelectItem>
                                    <SelectItem value="Vandalism">Vandalism</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="priority" className="text-sm font-medium">
                                Priority <span className="text-red-500">*</span>
                            </Label>
                            <Select value={formData.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Location and Status Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-sm font-medium">
                                Location <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="location"
                                name="location"
                                placeholder="e.g., Andheri West"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-sm font-medium">
                                Status <span className="text-red-500">*</span>
                            </Label>
                            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="open">Open</SelectItem>
                                    <SelectItem value="investigating">Investigating</SelectItem>
                                    <SelectItem value="closed">Closed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Complainant and Officer Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="complainant" className="text-sm font-medium">
                                Complainant Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="complainant"
                                name="complainant"
                                placeholder="e.g., Rajesh Kumar"
                                value={formData.complainant}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="officer" className="text-sm font-medium">
                                Officer Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="officer"
                                name="officer"
                                placeholder="e.g., SI Patil"
                                value={formData.officer}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="Detailed description of the incident"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={3}
                        />
                    </div>

                    {/* Evidence */}
                    <div className="space-y-2">
                        <Label htmlFor="evidence" className="text-sm font-medium">
                            Evidence
                        </Label>
                        <Textarea
                            id="evidence"
                            name="evidence"
                            placeholder="List of evidence collected"
                            value={formData.evidence}
                            onChange={handleInputChange}
                            rows={2}
                        />
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="notes" className="text-sm font-medium">
                            Notes
                        </Label>
                        <Textarea
                            id="notes"
                            name="notes"
                            placeholder="Any additional notes"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows={2}
                        />
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isSubmitting ? "Updating..." : "Update FIR"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditFIRForm
