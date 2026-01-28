# 🚀 SafeCity FIR Backend - Quick Start Guide

## ✅ What's Been Set Up

Your SafeCity application now has a complete backend infrastructure for the FIR (First Information Report) section:

### 📦 **Installed Packages**

- `mongoose` - MongoDB Object Data Modeling

### 📁 **Files Created**

#### Backend Infrastructure

- `lib/mongodb.js` - MongoDB connection utility with connection pooling
- `models/FIR.js` - MongoDB schema for FIR documents
- `app/api/fir/route.js` - API endpoints for listing and creating FIRs
- `app/api/fir/[id]/route.js` - API endpoints for viewing, updating, and deleting FIRs

#### Frontend Integration

- `hooks/use-fir-data.ts` - React hook for API calls with loading/error states
- `components/fir/fir-table.jsx` - Updated to fetch from MongoDB backend

#### Configuration & Scripts

- `.env.local` - Environment variables (needs MongoDB URI)
- `scripts/seed.js` - Script to populate database with sample data

#### Documentation

- `BACKEND_SETUP.md` - Complete setup guide with API documentation

---

## 🎯 Next Steps - 3 Simple Steps to Get Started

### **Step 1: Create MongoDB Atlas Account**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up (free tier available)
3. Create a new project
4. Create a free tier cluster (M0)
5. Click "Connect" and copy your connection string

### **Step 2: Configure Environment Variables**

Edit `.env.local` in your project root:

```env
MONGODB_URI=mongodb+srv://yourUsername:yourPassword@yourCluster.mongodb.net/safecity?retryWrites=true&w=majority
DB_NAME=safecity
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

**⚠️ Important:**

- Replace `yourUsername`, `yourPassword`, and `yourCluster` with your actual MongoDB credentials
- Keep `.env.local` private - never commit to Git

### **Step 3: Whitelist Your IP in MongoDB Atlas**

1. Go to MongoDB Atlas Dashboard
2. Click "Network Access" → "Add IP Address"
3. Select "Add Current IP Address"
4. Click "Confirm"

---

## 🌐 API Endpoints Reference

All endpoints are automatically created at `/api/fir`:

```
GET    /api/fir?page=1&limit=8              → Get all FIRs with pagination
GET    /api/fir?search=keyword               → Search FIRs
GET    /api/fir?status=open&type=Theft       → Filter FIRs
GET    /api/fir/FIR-2024-1847                → Get single FIR
POST   /api/fir                              → Create new FIR
PUT    /api/fir/FIR-2024-1847                → Update FIR
DELETE /api/fir/FIR-2024-1847                → Delete FIR
```

---

## 🎣 Using the Data Hook in Components

The `useFIRData` hook is ready to use:

```jsx
"use client";

import { useFIRData } from "@/hooks/use-fir-data";
import { useEffect } from "react";

export default function MyComponent() {
  const { firs, loading, error, fetchFIRs, createFIR } = useFIRData();

  useEffect(() => {
    // Fetch on mount
    fetchFIRs(1, "", { status: "open" });
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {firs.map((fir) => (
        <div key={fir.firId}>
          {fir.firId} - {fir.type}
        </div>
      ))}
    </div>
  );
}
```

---

## 📊 Sample Data

To populate your database with sample FIR data, run:

```bash
node scripts/seed.js
```

This will create 5 sample FIRs in your MongoDB database.

---

## 📋 FIR Document Structure

Each FIR record has the following fields:

```json
{
  "firId": "FIR-2024-1847",
  "date": "2024-01-27",
  "time": "14:32",
  "type": "Theft", // enum: Theft, Assault, Fraud, Robbery, Vandalism, Cyber Crime, Other
  "location": "Andheri West",
  "complainant": "Rajesh Kumar",
  "status": "open", // enum: open, investigating, closed
  "priority": "high", // enum: low, medium, high
  "officer": "SI Patil",
  "description": "Wallet stolen", // optional
  "evidence": "CCTV footage", // optional
  "notes": "Details here", // optional
  "createdAt": "2024-01-27T...",
  "updatedAt": "2024-01-27T..."
}
```

---

## 🧪 Test Your Setup

1. Start the dev server (already running):

   ```bash
   pnpm dev
   ```

2. Open `http://localhost:3000/fir-data` in your browser

3. You should see:
   - ✅ Sample data loading (fallback data shown while MongoDB connects)
   - ✅ Once MongoDB is configured, real data from the database

4. Test the API directly:

   ```bash
   # List all FIRs
   curl http://localhost:3000/api/fir

   # Search FIRs
   curl "http://localhost:3000/api/fir?search=theft"

   # Create a new FIR
   curl -X POST http://localhost:3000/api/fir \
     -H "Content-Type: application/json" \
     -d '{
       "date": "2024-01-27",
       "time": "15:30",
       "type": "Theft",
       "location": "Bandra",
       "complainant": "John Doe",
       "status": "open",
       "priority": "high",
       "officer": "SI Patil"
     }'
   ```

---

## 🔍 Check MongoDB Connection Status

Open browser DevTools (F12) → Network tab, then visit `/fir-data`. You should see:

- ✅ **API calls to `/api/fir`** → Backend is working
- ✅ **Data loading** → Database connection is active
- ⚠️ **Warning banner** → MongoDB not yet configured (using sample data)

---

## 🛠️ Troubleshooting

| Issue                                   | Solution                                            |
| --------------------------------------- | --------------------------------------------------- |
| "Cannot find module 'mongoose'"         | Run `pnpm install`                                  |
| "MONGODB_URI not found"                 | Add `MONGODB_URI` to `.env.local`                   |
| "No results found"                      | Check MongoDB cluster is running, IP is whitelisted |
| "Connection timeout"                    | Verify internet connection, check MongoDB URI       |
| Sample data showing instead of database | MongoDB not configured yet - see Quick Start Step 2 |

---

## 📚 Full Documentation

For detailed API documentation, see `BACKEND_SETUP.md`

---

## 🎉 You're All Set!

The backend is ready. Now you can:

1. ✅ Create FIRs
2. ✅ Read FIRs with search/filter
3. ✅ Update FIR status and details
4. ✅ Delete FIRs
5. ✅ Paginate through results

Start by configuring `.env.local` with your MongoDB URI, then visit http://localhost:3000/fir-data to see it in action!
