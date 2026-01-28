# Quick Start - Export & New FIR Features

## ⚡ Quick Commands

### Export Data

1. **Export All Records to Excel:**
   - Click `Export` → `Export to Excel`
   - Downloads: `FIR-Records-YYYY-MM-DD.xlsx`

2. **Export All Records to CSV:**
   - Click `Export` → `Export to CSV`
   - Downloads: `FIR-Records-YYYY-MM-DD.csv`

3. **Export Selected Records:**
   - ☑️ Check specific FIRs using checkboxes
   - Click `Export` → Choose format
   - Only selected records exported

### Create New FIR

1. Click `+ New FIR` button
2. Fill required fields (marked with \*)
3. Click `Create FIR`
4. Done! New FIR appears in table

---

## 📝 Form Fields Reference

| Field       | Type        | Required | Example      |
| ----------- | ----------- | -------- | ------------ |
| Date        | Date Picker | ✅       | 2024-01-27   |
| Time        | Time Picker | ✅       | 14:32        |
| Type        | Dropdown    | ✅       | Theft        |
| Priority    | Dropdown    | ✅       | High         |
| Location    | Text        | ✅       | Andheri West |
| Status      | Dropdown    | ✅       | Open         |
| Complainant | Text        | ✅       | Rajesh Kumar |
| Officer     | Text        | ✅       | SI Patil     |
| Description | Textarea    | ❌       | [Optional]   |
| Evidence    | Textarea    | ❌       | [Optional]   |
| Notes       | Textarea    | ❌       | [Optional]   |

---

## 🎯 Common Workflows

### Workflow 1: Daily Report

```
1. Go to FIR Data page
2. Click Export → Export to Excel
3. Email the file to supervisor
4. Done!
```

### Workflow 2: New Incident

```
1. Go to FIR Data page
2. Click + New FIR
3. Enter incident details
4. Click Create FIR
5. FIR appears in table
6. Can search/filter immediately
```

### Workflow 3: Selective Export

```
1. Go to FIR Data page
2. Search for specific type (e.g., "Theft")
3. Select relevant records ☑️
4. Click Export → Choose format
5. Send selected records only
```

---

## 🔧 Technical Stack

- **Excel Export:** ExcelJS library
- **CSV Export:** Native JavaScript
- **Form:** React with shadcn/ui components
- **API:** REST endpoints at `/api/fir`
- **Database:** MongoDB (all data persisted)

---

## 📦 Files Modified/Created

### New Files

- ✨ `lib/export-fir.js` - Export utilities
- ✨ `components/fir/new-fir-form.jsx` - Form component

### Modified Files

- 📝 `components/fir/fir-table.jsx` - Added buttons & handlers

---

## 🚨 Troubleshooting

**Q: Export button not working?**

- A: Make sure you have records to export. Select some if needed.

**Q: Form won't submit?**

- A: Check that all required fields (marked \*) are filled.

**Q: New FIR not appearing?**

- A: Wait a moment - table auto-refreshes. Check FIR list page.

**Q: Export file is empty?**

- A: Select records first using checkboxes, or export all.

---

## 💡 Pro Tips

✅ **Export for Backup:** Regularly export all FIRs as backup  
✅ **Weekly Reports:** Export selected cases for supervisor  
✅ **Data Analysis:** Use CSV for Excel pivot tables  
✅ **Sharing:** Use Excel for better formatting  
✅ **Bulk Create:** Add multiple FIRs one by one with form

---

## 📞 Support

For issues or questions:

1. Check the detailed guide: `EXPORT_AND_FORM_FEATURES.md`
2. Check the visual guide: `EXPORT_FORM_VISUAL_GUIDE.md`
3. Review form field types in `new-fir-form.jsx`
4. Check export options in `lib/export-fir.js`

---

## ✅ Feature Checklist

- ✅ Export to Excel (.xlsx)
- ✅ Export to CSV (.csv)
- ✅ Export selected or all records
- ✅ Professional formatting in Excel
- ✅ Auto-dated filenames
- ✅ Create new FIR with form
- ✅ All database fields in form
- ✅ Form validation
- ✅ Real-time table updates
- ✅ Toast notifications
- ✅ Loading indicators

---

Last Updated: 2024-01-27
Version: 1.0 - Initial Release
