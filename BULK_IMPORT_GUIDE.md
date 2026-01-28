# Bulk Import FIR Records - Guide

## 📥 Import Feature Overview

The Import feature allows you to bulk upload FIR records from Excel (.xlsx) or CSV (.csv) files.

## 🚀 How to Use

### Step 1: Click Import Button

- Located in the action bar next to "New FIR" button
- Opens the import dialog

### Step 2: Select File

- Click the upload area or drag & drop
- Supported formats: Excel (.xlsx, .xls), CSV (.csv)
- File is parsed automatically

### Step 3: Preview & Validate

- See summary of valid and invalid records
- Preview sample valid records
- View error details for invalid rows
- Choose to proceed or go back

### Step 4: Import

- Click "Import" to add records to database
- Progress bar shows import status
- View results when complete

---

## 📋 Required File Format

Your Excel or CSV file must contain these columns:

### Required Columns (Must have data)

- **Date** - Format: YYYY-MM-DD (e.g., 2024-01-27)
- **Time** - Format: HH:MM or HH:MM:SS (e.g., 14:32)
- **Type** - One of: Theft, Assault, Robbery, Fraud, Cyber Crime, Vandalism, Other
- **Location** - Text (e.g., Andheri West)
- **Complainant** - Text (e.g., Rajesh Kumar)
- **Officer** - Text (e.g., SI Patil)

### Optional Columns (Can be left empty)

- **Status** - open, investigating, or closed (default: open)
- **Priority** - low, medium, or high (default: medium)
- **Description** - Text describing incident
- **Evidence** - Text listing evidence
- **Notes** - Additional remarks

---

## 📊 Excel File Example

```
Date       | Time  | Type    | Location      | Complainant    | Officer    | Status       | Priority | Description           | Evidence
-----------|-------|---------|---------------|----------------|------------|--------------|----------|----------------------|----------
2024-01-27 | 14:32 | Theft   | Andheri West  | Rajesh Kumar   | SI Patil   | open         | high     | Stolen wallet         | Photo
2024-01-27 | 15:00 | Assault | Bandra        | Priya Sharma   | SI Deshmukh| investigating| high     | Physical altercation  | Video
2024-01-27 | 16:15 | Fraud   | Powai         | Amit Verma     | SI Kulkarni| open         | medium   | Online scam          | Transaction logs
```

---

## 📄 CSV File Example

```csv
Date,Time,Type,Location,Complainant,Officer,Status,Priority,Description,Evidence
2024-01-27,14:32,Theft,Andheri West,Rajesh Kumar,SI Patil,open,high,Stolen wallet,Photo
2024-01-27,15:00,Assault,Bandra,Priya Sharma,SI Deshmukh,investigating,high,Physical altercation,Video
2024-01-27,16:15,Fraud,Powai,Amit Verma,SI Kulkarni,open,medium,Online scam,Transaction logs
```

---

## ✅ Validation Rules

The system validates each record and shows:

- ✓ Valid records that will be imported
- ✗ Invalid records with specific error messages

### Common Validation Errors

| Error                   | Solution                                                           |
| ----------------------- | ------------------------------------------------------------------ |
| Date is required        | Add date in YYYY-MM-DD format                                      |
| Invalid date format     | Use YYYY-MM-DD (e.g., 2024-01-27)                                  |
| Time is required        | Add time in HH:MM format                                           |
| Invalid time format     | Use HH:MM or HH:MM:SS                                              |
| Type is required        | Use: Theft, Assault, Robbery, Fraud, Cyber Crime, Vandalism, Other |
| Location is required    | Add location name                                                  |
| Complainant is required | Add complainant name                                               |
| Officer is required     | Add officer name                                                   |
| Invalid status          | Use: open, investigating, or closed                                |
| Invalid priority        | Use: low, medium, or high                                          |

---

## 🔄 Import Process

### Three-Step Import Workflow

**Step 1: Upload**

```
┌─────────────────────────────┐
│ Drag & Drop Area            │
│ Choose File (Excel/CSV)     │
│ [Parse & Preview]           │
└─────────────────────────────┘
```

**Step 2: Preview**

```
┌─────────────────────────────┐
│ Total: 10 records           │
│ Valid: 8 ✓                  │
│ Errors: 2 ✗                 │
│                             │
│ Preview of valid records    │
│ Details of errors           │
│ [Back] [Import 8 Records]   │
└─────────────────────────────┘
```

**Step 3: Progress**

```
┌─────────────────────────────┐
│ Importing records...        │
│ ████████░░░░░░ 8 / 10      │
│                             │
│ ✓ Import completed!         │
│ [Done]                      │
└─────────────────────────────┘
```

---

## 💡 Tips & Best Practices

✅ **Use Export First** - Export current data to use as template  
✅ **Check Dates** - Use YYYY-MM-DD format for consistency  
✅ **Validate Types** - Spell FIR types correctly (case-sensitive)  
✅ **Small Batches** - Import in chunks of 50-100 records  
✅ **Review Errors** - Check error details to fix and retry  
✅ **Keep Backup** - Keep original file as backup

---

## 🛠️ Creating Import File from Scratch

### Option 1: Excel

1. Create new Excel spreadsheet
2. Add headers in row 1: Date, Time, Type, Location, Complainant, Officer
3. Add data starting from row 2
4. Save as .xlsx file
5. Upload via Import button

### Option 2: CSV

1. Create new text file
2. Add headers: Date,Time,Type,Location,Complainant,Officer
3. Add data rows with comma-separated values
4. Save as .csv file
5. Upload via Import button

### Option 3: From Export

1. Click Export → Excel or CSV
2. Open downloaded file
3. Add/modify records
4. Save file
5. Upload via Import button

---

## 📝 Field Description Reference

| Field       | Type | Format                    | Example                |
| ----------- | ---- | ------------------------- | ---------------------- |
| Date        | Date | YYYY-MM-DD                | 2024-01-27             |
| Time        | Time | HH:MM:SS                  | 14:32:00               |
| Type        | Text | Fixed list                | Theft                  |
| Location    | Text | Any text                  | Andheri West           |
| Complainant | Text | Person name               | Rajesh Kumar           |
| Officer     | Text | Officer ID/Name           | SI Patil               |
| Status      | Text | open/investigating/closed | open                   |
| Priority    | Text | low/medium/high           | high                   |
| Description | Text | Long text                 | Details about incident |
| Evidence    | Text | Long text                 | Evidence list          |
| Notes       | Text | Long text                 | Additional remarks     |

---

## ⚠️ Troubleshooting

**Q: Import button not working?**

- A: Make sure file format is supported (.xlsx or .csv)

**Q: File not parsing?**

- A: Check that file has header row with correct column names

**Q: Records not importing?**

- A: Check validation errors for required fields

**Q: Some records failed?**

- A: Valid records still imported. Fix errors and retry.

**Q: Can't find imported records?**

- A: Refresh page or wait for table to update (should auto-refresh)

---

## 🎯 Common Workflows

### Workflow 1: Migrate Data from Old System

1. Export data from old system as Excel/CSV
2. Open file and adjust column names to match (if needed)
3. Upload via Import button
4. All records instantly in database

### Workflow 2: Daily Bulk Upload

1. Receive list of cases from field officer
2. Create Excel file with incident details
3. Upload via Import button
4. Dashboard automatically updated

### Workflow 3: Correct & Retry

1. Import file, get some errors
2. Note down row numbers with errors
3. Download exported file as reference
4. Fix errors in original file
5. Re-import corrected data

---

## 🔒 Data Integrity

- ✅ All records validated before import
- ✅ Invalid records NOT imported
- ✅ See exact errors for each record
- ✅ Can preview before confirming
- ✅ Auto-generates unique FIR IDs
- ✅ All data encrypted in database

---

## 📊 Performance Notes

- Imports up to 1000 records at a time
- Progress shown in real-time
- Server handles concurrent imports
- Automatic rollback on critical errors
- Table refreshes automatically after import

---

## ❓ FAQ

**Q: Can I import duplicate FIR IDs?**

- A: Yes, system generates new IDs automatically

**Q: Will import overwrite existing records?**

- A: No, creates new records. For updates, use edit feature

**Q: Can I cancel import in progress?**

- A: Not yet, but failed records won't be retried

**Q: What if some records fail?**

- A: Valid records are imported, failed ones are listed

**Q: How long does import take?**

- A: ~100-200ms per record depending on server load

---

Last Updated: 2024-01-27
Version: 1.0 - Initial Release
