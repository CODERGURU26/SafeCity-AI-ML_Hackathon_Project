# SafeCity - FIR Backend & MongoDB Setup Guide

## 🚀 Setup Instructions

### Step 1: Create MongoDB Atlas Account & Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new project
4. Create a new cluster (choose free tier for testing)
5. Wait for cluster to be deployed (2-3 minutes)

### Step 2: Get Connection String

1. Click "Connect" on your cluster
2. Choose "Drivers" option
3. Select Node.js and version 5.x
4. Copy the connection string
5. Format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/safecity?retryWrites=true&w=majority`

### Step 3: Update .env.local

Open `.env.local` and replace:

```env
MONGODB_URI=mongodb+srv://yourUsername:yourPassword@yourCluster.mongodb.net/safecity?retryWrites=true&w=majority
DB_NAME=safecity
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

**Important:**

- Replace `yourUsername` with your MongoDB Atlas username
- Replace `yourPassword` with your MongoDB Atlas password
- Replace `yourCluster` with your actual cluster name
- Keep this file secure, never commit to Git

### Step 4: Start the Development Server

```bash
pnpm dev
```

The application will:

- Connect to MongoDB on startup
- Create necessary collections automatically
- Run on http://localhost:3000

## 📡 API Endpoints

### Get All FIRs

```
GET /api/fir?page=1&limit=8&search=&type=&status=&priority=
```

**Query Parameters:**

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 8)
- `search` - Search by FIR ID, complainant, location, or officer
- `type` - Filter by crime type (Theft, Assault, Fraud, etc.)
- `status` - Filter by status (open, investigating, closed)
- `priority` - Filter by priority (low, medium, high)

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "firId": "FIR-2024-1847",
      "date": "2024-01-27",
      "time": "14:32",
      "type": "Theft",
      "location": "Andheri West",
      "complainant": "Rajesh Kumar",
      "status": "open",
      "priority": "high",
      "officer": "SI Patil",
      "description": "...",
      "evidence": "...",
      "notes": "...",
      "createdAt": "2024-01-27T...",
      "updatedAt": "2024-01-27T..."
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 8,
    "pages": 7
  }
}
```

### Get Single FIR

```
GET /api/fir/:id
```

### Create FIR

```
POST /api/fir
```

**Request Body:**

```json
{
  "date": "2024-01-27",
  "time": "14:32",
  "type": "Theft",
  "location": "Andheri West",
  "complainant": "Rajesh Kumar",
  "status": "open",
  "priority": "high",
  "officer": "SI Patil",
  "description": "Wallet stolen from shop",
  "evidence": "CCTV footage available",
  "notes": "Suspect identified as John Doe"
}
```

### Update FIR

```
PUT /api/fir/:id
```

### Delete FIR

```
DELETE /api/fir/:id
```

## 🎣 Using the useFIRData Hook in Components

The hook has been created for you at `hooks/use-fir-data.ts`. Usage example:

```jsx
"use client";

import { useFIRData } from "@/hooks/use-fir-data";
import { useEffect } from "react";

export default function MyComponent() {
  const {
    firs,
    loading,
    error,
    pagination,
    fetchFIRs,
    createFIR,
    updateFIR,
    deleteFIR,
  } = useFIRData();

  useEffect(() => {
    // Fetch FIRs on component mount
    fetchFIRs(1, "", { status: "open" });
  }, []);

  // Create a new FIR
  const handleCreateFIR = async () => {
    try {
      const newFIR = await createFIR({
        date: "2024-01-27",
        time: "15:30",
        type: "Theft",
        location: "Bandra",
        complainant: "John Doe",
        status: "open",
        priority: "high",
        officer: "SI Patil",
      });
      console.log("FIR created:", newFIR);
      // Refresh the list
      fetchFIRs(1, "", { status: "open" });
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Update a FIR
  const handleUpdateFIR = async (firId) => {
    try {
      const updatedFIR = await updateFIR(firId, {
        status: "closed",
      });
      console.log("FIR updated:", updatedFIR);
      fetchFIRs(1);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  // Delete a FIR
  const handleDeleteFIR = async (firId) => {
    try {
      await deleteFIR(firId);
      console.log("FIR deleted");
      fetchFIRs(1);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {firs.map((fir) => (
        <div key={fir.firId}>
          {fir.firId} - {fir.type}
        </div>
      ))}
    </div>
  );
}
```

## 📝 Files Created

- `lib/mongodb.js` - MongoDB connection utility
- `models/FIR.js` - FIR MongoDB schema
- `app/api/fir/route.js` - GET (list/search) and POST (create) endpoints
- `app/api/fir/[id]/route.js` - GET (single), PUT (update), DELETE endpoints
- `hooks/use-fir-data.ts` - React hook for API calls
- `.env.local` - Environment variables (contains sensitive info)

## 🔧 MongoDB Atlas Network Access

Make sure to whitelist your IP address in MongoDB Atlas:

1. Go to MongoDB Atlas Dashboard
2. Click "Network Access" in the left sidebar
3. Click "Add IP Address"
4. Select "Add Current IP Address" or add `0.0.0.0/0` for local development
5. Confirm

## 🐛 Troubleshooting

### Connection Error

- Check MongoDB URI in `.env.local`
- Verify IP is whitelisted in MongoDB Atlas
- Ensure MongoDB Atlas cluster is running

### FIR not loading

- Check browser console for errors
- Verify API endpoints in Network tab
- Check server logs for MongoDB errors

### Build Errors

- Delete `.next` folder and rebuild: `rm -r .next && pnpm build`
- Reinstall dependencies: `pnpm install`

## 📚 Next Steps

1. Update `components/fir/fir-table.jsx` to use the `useFIRData` hook
2. Add create/edit form component
3. Add delete confirmation dialog
4. Add search and filter functionality
5. Add error handling UI
6. Add loading skeletons
7. Deploy to Vercel

## 🔐 Security Notes

- Never commit `.env.local` to Git
- Add `.env.local` to `.gitignore`
- Use environment-specific configs for production
- Implement authentication before deploying
- Validate all inputs on backend
- Use HTTPS in production
