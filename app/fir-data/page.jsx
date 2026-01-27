"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/app-shell"
import { FIRTable } from "@/components/fir/fir-table"
import { FIRFilters } from "@/components/fir/fir-filters"
import { FIRStats } from "@/components/fir/fir-stats"

const ITEMS_PER_PAGE = 8

export default function FIRDataPage() {
  const [activeFilters, setActiveFilters] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handlePageClick = (page) => {
    setCurrentPage(page)
  }

  // Reset to page 1 when filters or search changes
  const handleFiltersChange = (filters) => {
    setCurrentPage(1)
    setActiveFilters(filters)
  }

  const handleSearchChange = (query) => {
    setCurrentPage(1)
    setSearchQuery(query)
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">FIR Data Management</h1>
          <p className="text-muted-foreground">View, manage, and analyze First Information Reports</p>
        </div>

        {/* Stats */}
        <FIRStats />

        {/* Filters */}
        <FIRFilters 
          activeFilters={activeFilters}
          setActiveFilters={handleFiltersChange}
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
        />

        {/* Table */}
        <FIRTable 
          activeFilters={activeFilters}
          searchQuery={searchQuery}
          currentPage={currentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          onTotalItemsChange={setTotalItems}
        />

        {/* Pagination */}
        {totalItems > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, totalItems)}-{Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems} records
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {/* Page numbers */}
              {totalPages <= 5 ? (
                // Show all pages if 5 or fewer
                Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                      currentPage === page
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {page}
                  </button>
                ))
              ) : (
                // Show ellipsis for many pages
                <>
                  <button
                    onClick={() => handlePageClick(1)}
                    className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                      currentPage === 1
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    1
                  </button>
                  
                  {currentPage > 3 && <span className="text-muted-foreground">...</span>}
                  
                  {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
                    .filter((page) => page > 1 && page < totalPages)
                    .map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className="rounded-lg border border-primary bg-primary/10 px-3 py-1.5 text-sm text-primary"
                      >
                        {page}
                      </button>
                    ))}
                  
                  {currentPage < totalPages - 2 && <span className="text-muted-foreground">...</span>}
                  
                  <button
                    onClick={() => handlePageClick(totalPages)}
                    className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                      currentPage === totalPages
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
              
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}
