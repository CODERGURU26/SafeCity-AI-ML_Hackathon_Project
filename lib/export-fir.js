import ExcelJS from "exceljs";

/**
 * Export FIR data to Excel format
 * @param {Array} data - Array of FIR records
 * @param {string} filename - Output filename
 */
export const exportToExcel = async (data, filename = "FIR-Records") => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("FIRs");

    // Define columns matching database structure
    worksheet.columns = [
      { header: "FIR ID", key: "firId", width: 15 },
      { header: "Date", key: "date", width: 12 },
      { header: "Time", key: "time", width: 10 },
      { header: "Type", key: "type", width: 15 },
      { header: "Location", key: "location", width: 20 },
      { header: "Complainant", key: "complainant", width: 20 },
      { header: "Status", key: "status", width: 12 },
      { header: "Priority", key: "priority", width: 12 },
      { header: "Officer", key: "officer", width: 15 },
      { header: "Description", key: "description", width: 30 },
      { header: "Evidence", key: "evidence", width: 30 },
      { header: "Notes", key: "notes", width: 30 },
    ];

    // Style header row
    worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1F2937" }, // Dark gray
    };

    // Add data rows
    data.forEach((record) => {
      worksheet.addRow({
        firId: record.firId || "",
        date: record.date || "",
        time: record.time || "",
        type: record.type || "",
        location: record.location || "",
        complainant: record.complainant || "",
        status: record.status || "",
        priority: record.priority || "",
        officer: record.officer || "",
        description: record.description || "",
        evidence: record.evidence || "",
        notes: record.notes || "",
      });
    });

    // Add alternating row colors
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        if (rowNumber % 2 === 0) {
          row.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFF3F4F6" }, // Light gray
          };
        }
      }
    });

    // Generate and download file
    const buffer = await workbook.xlsx.writeBuffer();
    downloadFile(
      buffer,
      `${filename}.xlsx`,
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    throw error;
  }
};

/**
 * Export FIR data to CSV format
 * @param {Array} data - Array of FIR records
 * @param {string} filename - Output filename
 */
export const exportToCSV = (data, filename = "FIR-Records") => {
  try {
    // Define CSV headers matching database structure
    const headers = [
      "FIR ID",
      "Date",
      "Time",
      "Type",
      "Location",
      "Complainant",
      "Status",
      "Priority",
      "Officer",
      "Description",
      "Evidence",
      "Notes",
    ];

    // Prepare CSV content
    const csvContent = [
      headers.join(","),
      ...data.map((record) =>
        [
          `"${record.firId || ""}"`,
          `"${record.date || ""}"`,
          `"${record.time || ""}"`,
          `"${record.type || ""}"`,
          `"${record.location || ""}"`,
          `"${record.complainant || ""}"`,
          `"${record.status || ""}"`,
          `"${record.priority || ""}"`,
          `"${record.officer || ""}"`,
          `"${(record.description || "").replace(/"/g, '""')}"`,
          `"${(record.evidence || "").replace(/"/g, '""')}"`,
          `"${(record.notes || "").replace(/"/g, '""')}"`,
        ].join(","),
      ),
    ].join("\n");

    // Convert to blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    downloadFile(blob, `${filename}.csv`, "text/csv;charset=utf-8;");
  } catch (error) {
    console.error("Error exporting to CSV:", error);
    throw error;
  }
};

/**
 * Helper function to trigger file download
 * @param {Blob|Buffer} content - File content
 * @param {string} filename - Output filename
 * @param {string} type - MIME type
 */
const downloadFile = (content, filename, type) => {
  const blob =
    content instanceof Blob ? content : new Blob([content], { type });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * Get timestamp for filename
 */
export const getTimestamp = () => {
  const now = new Date();
  return now.toISOString().split("T")[0];
};
