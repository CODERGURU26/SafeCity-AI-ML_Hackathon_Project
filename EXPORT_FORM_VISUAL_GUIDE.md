# FIR Export & Create Features - Visual Guide

## 📋 Feature Overview

### 1. Export Button (Top Right)

Located in the action bar at the top of the FIR table.

```
┌─────────────────────────────────────────────┐
│  [+ New FIR]  [📥 Export ▼]     5 selected  │  ← Action Bar
├─────────────────────────────────────────────┤
│  FIR ID │ Date & Time │ Type │ Location ... │
├─────────────────────────────────────────────┤
│         FIR Data Rows...                    │
└─────────────────────────────────────────────┘
```

**Export Dropdown Options:**

- Export to Excel (generates .xlsx file)
- Export to CSV (generates .csv file)

**Smart Export Features:**

- Export ALL records in table
- Export SELECTED records (if checkboxes are checked)
- Auto-generated filename with date: `FIR-Records-2024-01-27.xlsx`

---

### 2. New FIR Button (Top Left)

Click to open the form modal for creating new FIR records.

**Form Structure:**

```
┌──────────────────────────────────────────┐
│ Create New FIR                           │
├──────────────────────────────────────────┤
│                                          │
│  📅 Date *          🕐 Time *           │
│  [2024-01-27]       [14:32]             │
│                                          │
│  🔴 FIR Type *      ⚡ Priority *       │
│  [Dropdown ▼]       [Medium ▼]          │
│                                          │
│  📍 Location *      ✓ Status *          │
│  [e.g., Andheri]    [Open ▼]            │
│                                          │
│  👤 Complainant *   👮 Officer *        │
│  [Name]             [Officer Name]      │
│                                          │
│  📝 Description                         │
│  [Optional textarea...]                 │
│                                          │
│  🔎 Evidence                            │
│  [Optional textarea...]                 │
│                                          │
│  📌 Notes                               │
│  [Optional textarea...]                 │
│                                          │
│  [Cancel]  [Create FIR ✓]               │
│                                          │
└──────────────────────────────────────────┘
```

**Form Features:**

- ✅ All fields from database schema
- ✅ Date/Time auto-filled with current values
- ✅ Required fields marked with \*
- ✅ Dropdown options for Type, Priority, Status
- ✅ Optional textarea fields for details
- ✅ Real-time validation
- ✅ Loading spinner during submission

---

## 📊 Export File Examples

### Excel Export (.xlsx)

```
┌──────┬────────┬──────┬──────────┬──────────┬────────────┬────────┬──────────┬─────────┬─────────────┬──────────┬────────┐
│ FIR  │ Date   │ Time │ Type     │ Location │ Complainant│ Status │ Priority │ Officer │ Description│ Evidence │ Notes  │
├──────┼────────┼──────┼──────────┼──────────┼────────────┼────────┼──────────┼─────────┼─────────────┼──────────┼────────┤
│1847  │27/01   │14:32 │ Theft    │ Andheri  │ Rajesh... │ Open   │ High     │ SI Patil│ ...        │ ...      │ ...    │
│1846  │27/01   │12:15 │ Assault  │ Bandra   │ Priya...  │ Inves.│ High     │ SI Des..│ ...        │ ...      │ ...    │
│1845  │27/01   │10:45 │ Fraud    │ Powai    │ Amit...   │ Open   │ Medium   │ SI Kul..│ ...        │ ...      │ ...    │
└──────┴────────┴──────┴──────────┴──────────┴────────────┴────────┴──────────┴─────────┴─────────────┴──────────┴────────┘
```

✨ **Features:**

- Bold, colored headers
- Alternating row colors
- Auto-sized columns
- Professional formatting

### CSV Export (.csv)

```
"FIR ID","Date","Time","Type","Location",...
"FIR-2024-1847","2024-01-27","14:32","Theft","Andheri West",...
"FIR-2024-1846","2024-01-27","12:15","Assault","Bandra",...
```

✨ **Features:**

- Proper CSV format with quotes
- Special characters escaped
- Excel/Google Sheets compatible
- Easy to share via email

---

## 🎯 Use Cases

### Export Scenario

**Task:** "I need to send FIR data to my supervisor"

1. Open FIR Data page
2. (Optional) Check specific FIRs to export
3. Click "Export" → "Export to Excel"
4. Send the downloaded file via email
5. Supervisor opens in Excel and analyzes

### Create New FIR Scenario

**Task:** "A new complaint just came in"

1. Open FIR Data page
2. Click "+ New FIR" button
3. Fill in the incident details:
   - Date/Time of incident
   - Type of crime
   - Location and complainant
   - Assigned officer
   - Any notes/evidence
4. Click "Create FIR"
5. New FIR instantly appears in table
6. Can now be filtered, searched, exported

### Bulk Export Scenario

**Task:** "Export weekly report of all theft cases"

1. Search or filter for theft cases
2. Select all visible records (checkbox)
3. Click "Export" → "Export to CSV"
4. Open in Excel/Google Sheets
5. Create report/charts from data

---

## 🔧 Technical Details

### File Locations

- Export logic: `lib/export-fir.js`
- Form component: `components/fir/new-fir-form.jsx`
- Table integration: `components/fir/fir-table.jsx`

### Export Formats

| Format | Extension | Tool    | Use Case                     |
| ------ | --------- | ------- | ---------------------------- |
| Excel  | .xlsx     | ExcelJS | Professional reports, charts |
| CSV    | .csv      | Native  | Data analysis, sharing       |

### Database Columns Included

1. FIR ID (Auto-generated)
2. Date (YYYY-MM-DD)
3. Time (HH:MM)
4. Type (Enumerated)
5. Location (Text)
6. Complainant (Text)
7. Status (open/investigating/closed)
8. Priority (low/medium/high)
9. Officer (Text)
10. Description (Optional)
11. Evidence (Optional)
12. Notes (Optional)

---

## 💾 File Naming Convention

**Export filenames** automatically include the current date:

- `FIR-Records-2024-01-27.xlsx`
- `FIR-Records-2024-01-27.csv`

This prevents overwriting and helps track export dates.

---

## ✨ User Experience Features

✅ **Toast Notifications** - "Exported 5 FIR records to Excel"  
✅ **Loading States** - Spinner shows during export/creation  
✅ **Selection Feedback** - Shows "5 selected" when records checked  
✅ **Form Validation** - Clear error messages for required fields  
✅ **Auto-refresh** - Table updates immediately after creating FIR  
✅ **Responsive Design** - Works on desktop and tablet

---

## 🚀 Next Steps

Want to add more features? Consider:

- ✏️ Edit FIR functionality
- 🗑️ Bulk delete with confirmation
- 🔍 Advanced search filters
- 📤 Email export directly
- 📁 Attachment uploads for evidence
- 📊 Analytics dashboard
- 🔐 Role-based access control
