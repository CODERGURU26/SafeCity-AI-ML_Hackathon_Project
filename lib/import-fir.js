import * as XLSX from "xlsx";

/**
 * Parse Excel or CSV file and extract FIR data
 * @param {File} file - The uploaded file
 * @returns {Promise<Array>} - Parsed FIR records
 */
export const parseFile = async (file) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    const fileName = file.name.toLowerCase();
    let records = [];

    if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
      records = await parseExcel(file);
    } else if (fileName.endsWith(".csv")) {
      records = await parseCSV(file);
    } else {
      throw new Error(
        "Unsupported file format. Please use Excel (.xlsx) or CSV (.csv)",
      );
    }

    if (records.length === 0) {
      throw new Error("No data found in file");
    }

    return records;
  } catch (error) {
    console.error("Error parsing file:", error);
    throw error;
  }
};

/**
 * Parse Excel file
 * @param {File} file - Excel file
 * @returns {Promise<Array>} - Parsed records
 */
const parseExcel = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const records = XLSX.utils.sheet_to_json(worksheet);
        resolve(records);
      } catch (error) {
        reject(new Error("Failed to parse Excel file: " + error.message));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsArrayBuffer(file);
  });
};

/**
 * Parse CSV file
 * @param {File} file - CSV file
 * @returns {Promise<Array>} - Parsed records
 */
const parseCSV = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target.result;
        const lines = csv.split("\n");
        if (lines.length < 2) {
          reject(new Error("CSV file is empty or has no data"));
          return;
        }

        // Parse header
        const headers = parseCSVLine(lines[0]);
        const records = [];

        // Parse data rows
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim() === "") continue;

          const values = parseCSVLine(lines[i]);
          const record = {};

          headers.forEach((header, index) => {
            record[header.trim()] = values[index] ? values[index].trim() : "";
          });

          records.push(record);
        }

        resolve(records);
      } catch (error) {
        reject(new Error("Failed to parse CSV file: " + error.message));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
};

/**
 * Parse CSV line handling quoted fields
 * @param {string} line - CSV line
 * @returns {Array} - Parsed values
 */
const parseCSVLine = (line) => {
  const values = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current);
  return values;
};

/**
 * Validate FIR records
 * @param {Array} records - Records to validate
 * @returns {Object} - Validation result with valid/invalid records and errors
 */
export const validateRecords = (records) => {
  const validRecords = [];
  const errors = [];

  records.forEach((record, index) => {
    const rowNumber = index + 2; // +1 for header, +1 for 1-based indexing
    const rowErrors = [];

    // Map column names to standardized field names
    const normalizedRecord = normalizeRecord(record);

    // Validate required fields
    if (!normalizedRecord.date || normalizedRecord.date.trim() === "") {
      rowErrors.push("Date is required");
    } else if (!isValidDate(normalizedRecord.date)) {
      rowErrors.push("Invalid date format (use YYYY-MM-DD)");
    }

    if (!normalizedRecord.time || normalizedRecord.time.trim() === "") {
      rowErrors.push("Time is required");
    } else if (!isValidTime(normalizedRecord.time)) {
      rowErrors.push("Invalid time format (use HH:MM or HH:MM:SS)");
    }

    if (!normalizedRecord.type || normalizedRecord.type.trim() === "") {
      rowErrors.push("Type is required");
    } else if (!isValidType(normalizedRecord.type)) {
      rowErrors.push(
        `Invalid type. Must be one of: Theft, Assault, Robbery, Fraud, Cyber Crime, Vandalism, Other`,
      );
    }

    if (!normalizedRecord.location || normalizedRecord.location.trim() === "") {
      rowErrors.push("Location is required");
    }

    if (
      !normalizedRecord.complainant ||
      normalizedRecord.complainant.trim() === ""
    ) {
      rowErrors.push("Complainant is required");
    }

    if (!normalizedRecord.officer || normalizedRecord.officer.trim() === "") {
      rowErrors.push("Officer is required");
    }

    if (normalizedRecord.status && !isValidStatus(normalizedRecord.status)) {
      rowErrors.push(`Invalid status. Must be: open, investigating, or closed`);
    }

    if (
      normalizedRecord.priority &&
      !isValidPriority(normalizedRecord.priority)
    ) {
      rowErrors.push(`Invalid priority. Must be: low, medium, or high`);
    }

    if (rowErrors.length > 0) {
      errors.push({
        row: rowNumber,
        record: normalizedRecord,
        errors: rowErrors,
      });
    } else {
      validRecords.push(normalizedRecord);
    }
  });

  return {
    validRecords,
    errors,
    totalRecords: records.length,
    validCount: validRecords.length,
    errorCount: errors.length,
  };
};

/**
 * Normalize record field names (handle different variations)
 * @param {Object} record - Raw record from file
 * @returns {Object} - Normalized record
 */
const normalizeRecord = (record) => {
  const normalized = {};

  // Map various field name variations to standard names
  const fieldMappings = {
    date: ["date", "fir date", "incident date"],
    time: ["time", "fir time", "incident time"],
    type: ["type", "fir type", "crime type"],
    location: ["location", "place", "incident location"],
    complainant: ["complainant", "complainant name", "reporter"],
    status: ["status", "fir status"],
    priority: ["priority", "priority level"],
    officer: ["officer", "officer name", "assigned officer"],
    description: ["description", "details", "incident description"],
    evidence: ["evidence", "evidence collected"],
    notes: ["notes", "remarks", "additional notes"],
  };

  // Find and map each field
  for (const [standard, variants] of Object.entries(fieldMappings)) {
    for (const key in record) {
      if (variants.includes(key.toLowerCase().trim())) {
        normalized[standard] = record[key];
        break;
      }
    }
  }

  // Set defaults for optional fields
  normalized.status = normalized.status || "open";
  normalized.priority = normalized.priority || "medium";
  normalized.description = normalized.description || "";
  normalized.evidence = normalized.evidence || "";
  normalized.notes = normalized.notes || "";

  return normalized;
};

/**
 * Validate date format (YYYY-MM-DD or other common formats)
 * @param {string} dateStr - Date string
 * @returns {boolean}
 */
const isValidDate = (dateStr) => {
  // Try to parse various date formats
  const date = new Date(dateStr);
  return !isNaN(date.getTime()) && dateStr.trim().length >= 8;
};

/**
 * Validate time format (HH:MM or HH:MM:SS)
 * @param {string} timeStr - Time string
 * @returns {boolean}
 */
const isValidTime = (timeStr) => {
  const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  return timeRegex.test(timeStr.trim());
};

/**
 * Validate FIR type
 * @param {string} type - FIR type
 * @returns {boolean}
 */
const isValidType = (type) => {
  const validTypes = [
    "Theft",
    "Assault",
    "Robbery",
    "Fraud",
    "Cyber Crime",
    "Vandalism",
    "Other",
  ];
  return validTypes.includes(type.trim());
};

/**
 * Validate status
 * @param {string} status - Status value
 * @returns {boolean}
 */
const isValidStatus = (status) => {
  const validStatuses = ["open", "investigating", "closed"];
  return validStatuses.includes(status.trim().toLowerCase());
};

/**
 * Validate priority
 * @param {string} priority - Priority value
 * @returns {boolean}
 */
const isValidPriority = (priority) => {
  const validPriorities = ["low", "medium", "high"];
  return validPriorities.includes(priority.trim().toLowerCase());
};
