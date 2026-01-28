"use client"

import React, { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Alert,
    AlertDescription,
} from "@/components/ui/alert"
import { Loader2, Upload, AlertCircle, CheckCircle2, FileUp } from "lucide-react"
import { toast } from "sonner"
import { parseFile, validateRecords } from "@/lib/import-fir"

const ImportFIRForm = ({ isOpen, onOpenChange, onSuccess, useFIRData }) => {
    const { createFIR } = useFIRData()
    const [step, setStep] = useState(1) // 1: Upload, 2: Preview, 3: Importing
    const [file, setFile] = useState(null)
    const [validationResult, setValidationResult] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [importProgress, setImportProgress] = useState({ completed: 0, total: 0 })
    const [importErrors, setImportErrors] = useState([])

    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setFile(selectedFile)
        }
    }

    const handleParse = async () => {
        if (!file) {
            toast.error("Please select a file")
            return
        }

        setIsProcessing(true)
        try {
            const records = await parseFile(file)
            const validation = validateRecords(records)
            setValidationResult(validation)
            setStep(2)
        } catch (error) {
            console.error("Error parsing file:", error)
            toast.error(error.message || "Failed to parse file")
        } finally {
            setIsProcessing(false)
        }
    }

    const handleImport = async () => {
        if (!validationResult || validationResult.validRecords.length === 0) {
            toast.error("No valid records to import")
            return
        }

        setStep(3)
        setIsProcessing(true)
        setImportProgress({ completed: 0, total: validationResult.validRecords.length })
        setImportErrors([])

        const errors = []

        for (let i = 0; i < validationResult.validRecords.length; i++) {
            try {
                const record = validationResult.validRecords[i]
                await createFIR({
                    date: record.date,
                    time: record.time,
                    type: record.type.trim(),
                    location: record.location.trim(),
                    complainant: record.complainant.trim(),
                    officer: record.officer.trim(),
                    status: (record.status || "open").trim().toLowerCase(),
                    priority: (record.priority || "medium").trim().toLowerCase(),
                    description: record.description || "",
                    evidence: record.evidence || "",
                    notes: record.notes || "",
                })
                setImportProgress((prev) => ({ ...prev, completed: i + 1 }))
            } catch (error) {
                errors.push({
                    row: i + 2,
                    record: validationResult.validRecords[i],
                    error: error.message,
                })
                setImportProgress((prev) => ({ ...prev, completed: i + 1 }))
            }
        }

        setIsProcessing(false)

        if (errors.length > 0) {
            setImportErrors(errors)
            toast.warning(`Imported ${validationResult.validRecords.length - errors.length} FIRs, ${errors.length} failed`)
        } else {
            toast.success(`Successfully imported ${validationResult.validRecords.length} FIRs!`)
            setTimeout(() => {
                handleClose()
                if (onSuccess) {
                    onSuccess()
                }
            }, 1000)
        }
    }

    const handleClose = () => {
        setStep(1)
        setFile(null)
        setValidationResult(null)
        setImportProgress({ completed: 0, total: 0 })
        setImportErrors([])
        onOpenChange(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Import FIR Records</DialogTitle>
                    <DialogDescription>
                        Upload an Excel or CSV file to bulk import FIR records
                    </DialogDescription>
                </DialogHeader>

                {/* Step 1: File Upload */}
                {step === 1 && (
                    <div className="space-y-4 py-4">
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                            onClick={() => document.getElementById("file-input")?.click()}
                        >
                            <FileUp className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                            <p className="text-sm font-medium mb-2">Click to select or drag and drop</p>
                            <p className="text-xs text-muted-foreground">Excel (.xlsx, .xls) or CSV (.csv)</p>
                            <input
                                id="file-input"
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>

                        {file && (
                            <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded">
                                <CheckCircle2 className="h-4 w-4 text-success" />
                                <span className="text-sm text-success">{file.name}</span>
                            </div>
                        )}

                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription className="text-xs">
                                Your file must have columns: Date, Time, Type, Location, Complainant, Officer. Optional: Status, Priority, Description, Evidence, Notes
                            </AlertDescription>
                        </Alert>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleParse}
                                disabled={!file || isProcessing}
                            >
                                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Parse & Preview
                            </Button>
                        </DialogFooter>
                    </div>
                )}

                {/* Step 2: Preview & Validation */}
                {step === 2 && validationResult && (
                    <div className="space-y-4 py-4">
                        {/* Summary Stats */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="p-3 bg-muted rounded-lg text-center">
                                <div className="text-2xl font-bold text-foreground">
                                    {validationResult.totalRecords}
                                </div>
                                <div className="text-xs text-muted-foreground">Total Records</div>
                            </div>
                            <div className="p-3 bg-success/10 border border-success/20 rounded-lg text-center">
                                <div className="text-2xl font-bold text-success">
                                    {validationResult.validCount}
                                </div>
                                <div className="text-xs text-success">Valid</div>
                            </div>
                            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-center">
                                <div className="text-2xl font-bold text-destructive">
                                    {validationResult.errorCount}
                                </div>
                                <div className="text-xs text-destructive">Errors</div>
                            </div>
                        </div>

                        {/* Valid Records Preview */}
                        {validationResult.validCount > 0 && (
                            <div>
                                <p className="text-sm font-medium mb-2">✓ Valid Records ({validationResult.validCount})</p>
                                <div className="max-h-48 overflow-y-auto space-y-2 p-2 bg-muted/30 rounded border border-muted">
                                    {validationResult.validRecords.slice(0, 5).map((record, idx) => (
                                        <div key={idx} className="text-xs p-2 bg-background rounded border border-success/20">
                                            <div className="font-medium text-success">
                                                {record.complainant} - {record.type}
                                            </div>
                                            <div className="text-muted-foreground">
                                                {record.date} | {record.location}
                                            </div>
                                        </div>
                                    ))}
                                    {validationResult.validCount > 5 && (
                                        <div className="text-xs text-muted-foreground p-2 text-center">
                                            ... and {validationResult.validCount - 5} more
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Error Records */}
                        {validationResult.errorCount > 0 && (
                            <div>
                                <p className="text-sm font-medium mb-2">✗ Errors ({validationResult.errorCount})</p>
                                <div className="max-h-48 overflow-y-auto space-y-2 p-2 bg-destructive/5 rounded border border-destructive/20">
                                    {validationResult.errors.slice(0, 5).map((error, idx) => (
                                        <div key={idx} className="text-xs p-2 bg-background rounded border border-destructive/20">
                                            <div className="font-medium text-destructive">
                                                Row {error.row}: {error.record.complainant || "No complainant"}
                                            </div>
                                            <ul className="text-muted-foreground list-disc list-inside mt-1">
                                                {error.errors.map((err, errIdx) => (
                                                    <li key={errIdx}>{err}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                    {validationResult.errorCount > 5 && (
                                        <div className="text-xs text-muted-foreground p-2 text-center">
                                            ... and {validationResult.errorCount - 5} more errors
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setStep(1)}
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleImport}
                                disabled={validationResult.validCount === 0}
                            >
                                Import {validationResult.validCount} Records
                            </Button>
                        </DialogFooter>
                    </div>
                )}

                {/* Step 3: Importing Progress */}
                {step === 3 && (
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="font-medium">Importing records...</span>
                                <span className="text-muted-foreground">
                                    {importProgress.completed} / {importProgress.total}
                                </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-primary h-full transition-all duration-300"
                                    style={{
                                        width: `${(importProgress.completed / importProgress.total) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>

                        {importErrors.length > 0 && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    {importErrors.length} records failed to import. Check the details below.
                                </AlertDescription>
                            </Alert>
                        )}

                        {importProgress.completed === importProgress.total && !isProcessing && (
                            <Alert className="bg-success/10 border-success/20">
                                <CheckCircle2 className="h-4 w-4 text-success" />
                                <AlertDescription className="text-success">
                                    Import completed!
                                </AlertDescription>
                            </Alert>
                        )}

                        {isProcessing && (
                            <div className="text-center py-4">
                                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground">Processing...</p>
                            </div>
                        )}

                        <DialogFooter>
                            <Button
                                onClick={handleClose}
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Importing..." : "Done"}
                            </Button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default ImportFIRForm
