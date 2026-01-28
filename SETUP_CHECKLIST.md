# 🎯 SafeCity MongoDB Backend Setup Checklist

## ✅ Phase 1: Backend Setup (Already Done ✓)

- [x] Installed mongoose package
- [x] Created MongoDB connection utility (`lib/mongodb.js`)
- [x] Created FIR data model (`models/FIR.js`)
- [x] Created API routes for list/create (`app/api/fir/route.js`)
- [x] Created API routes for get/update/delete (`app/api/fir/[id]/route.js`)
- [x] Created React data hook (`hooks/use-fir-data.ts`)
- [x] Updated FIR table component to use backend
- [x] Created seed script (`scripts/seed.js`)
- [x] Created `.env.local` template
- [x] Development server running at http://localhost:3000

## 📋 Phase 2: MongoDB Atlas Configuration (You Do This)

### Step 1: Create MongoDB Atlas Account

- [ ] Visit https://www.mongodb.com/cloud/atlas
- [ ] Click "Sign Up"
- [ ] Complete registration with your email
- [ ] Verify email address
- [ ] Create organization and project

### Step 2: Create Database Cluster

- [ ] On Atlas Dashboard, click "Create a Deployment"
- [ ] Select "Free" tier (M0)
- [ ] Choose region closest to your location
- [ ] Create cluster (wait 2-3 minutes for deployment)
- [ ] Note your cluster name

### Step 3: Create Database User

- [ ] Go to "Database Access" in left sidebar
- [ ] Click "Add New Database User"
- [ ] Choose "Password" authentication
- [ ] Create username (e.g., `safecity_admin`)
- [ ] Create strong password (save this!)
- [ ] Set "Admin" role or custom privileges
- [ ] Add user

### Step 4: Get Connection String

- [ ] Click "Connect" on your cluster
- [ ] Select "Drivers" (not Atlas CLI)
- [ ] Choose Node.js version 5.x
- [ ] Copy the connection string
- [ ] Save it temporarily

### Step 5: Configure Environment

- [ ] Open `.env.local` in your project
- [ ] Find the line: `MONGODB_URI=mongodb+srv://...`
- [ ] Replace `<username>` with your database user
- [ ] Replace `<password>` with your database password
- [ ] Replace `<cluster-name>` with your cluster name
- [ ] Save `.env.local`

Example:

```env
MONGODB_URI=mongodb+srv://safecity_admin:MySecurePass123@safecity-prod.mongodb.net/safecity?retryWrites=true&w=majority
```

### Step 6: Whitelist IP Address

- [ ] In MongoDB Atlas, go to "Network Access"
- [ ] Click "Add IP Address"
- [ ] Select "Add Current IP Address" (auto-detects your IP)
- [ ] Or manually enter `0.0.0.0/0` (less secure, for dev only)
- [ ] Click "Confirm"

### Step 7: Verify Connection

- [ ] In your terminal, run:

```bash
node scripts/seed.js
```

- [ ] Should see: "✅ Seeding complete!" or connection error
- [ ] If error, check MongoDB URI in `.env.local`
- [ ] If still error, check IP whitelist in MongoDB Atlas

## 🧪 Phase 3: Testing (Verify Everything Works)

### Browser Testing

- [ ] Visit http://localhost:3000/fir-data
- [ ] Should see FIR table loading
- [ ] No error message = good sign!
- [ ] Table shows sample data initially = normal (fallback)
- [ ] After seed.js runs, real data should appear

### API Testing (Terminal)

- [ ] List all FIRs:

```bash
curl http://localhost:3000/api/fir
```

- [ ] Should return JSON with FIR array
- [ ] Response code should be 200 (success) or 500 (DB error)

- [ ] Search FIRs:

```bash
curl "http://localhost:3000/api/fir?search=theft"
```

- [ ] Should filter by search term

- [ ] Create new FIR:

```bash
curl -X POST http://localhost:3000/api/fir \
  -H "Content-Type: application/json" \
  -d '{"date":"2024-01-27","time":"15:30","type":"Theft","location":"Bandra","complainant":"Test","status":"open","priority":"high","officer":"SI Test"}'
```

- [ ] Should return 201 with created FIR
- [ ] New FIR should appear in list after refresh

### DevTools Testing (Browser)

- [ ] Open browser → Press F12 (DevTools)
- [ ] Go to Network tab
- [ ] Visit http://localhost:3000/fir-data
- [ ] Look for requests to `/api/fir`
- [ ] Click the request
- [ ] Check "Response" tab
- [ ] Should see FIR JSON data

## 🚀 Phase 4: Data Population (Optional but Recommended)

### Add Sample Data

```bash
cd /path/to/project
node scripts/seed.js
```

Expected output:

```
🔄 Connecting to MongoDB...
✅ Connected to MongoDB
🗑️ Clearing existing FIRs...
✅ Cleared existing FIRs
📝 Seeding sample FIRs...
✅ Created 5 FIRs

📊 Sample FIRs created:
  • FIR-2024-1847 - Theft at Andheri West (open)
  • FIR-2024-1846 - Assault at Bandra (investigating)
  • FIR-2024-1845 - Fraud at Powai (open)
  • FIR-2024-1844 - Robbery at Kurla (closed)
  • FIR-2024-1843 - Vandalism at Dadar (investigating)

✨ Seeding complete!
```

- [ ] No errors during seeding
- [ ] 5 FIRs created successfully
- [ ] Refresh http://localhost:3000/fir-data
- [ ] Real data should now be visible

## 📊 Phase 5: Verification Checklist

- [ ] `.env.local` has valid MONGODB_URI
- [ ] MongoDB cluster is running
- [ ] Your IP is whitelisted in MongoDB Atlas
- [ ] Node.js can connect to MongoDB (no timeout errors)
- [ ] API endpoints respond with 200 status codes
- [ ] FIR data is stored in MongoDB
- [ ] Frontend displays data from database (not just sample data)
- [ ] Create/Read/Update/Delete operations work
- [ ] Search and filtering work
- [ ] Pagination works

## 🎉 Phase 6: You're Done!

Once all checkboxes above are complete:

- [x] Development server running
- [x] MongoDB configured
- [x] API endpoints working
- [x] Sample data loaded
- [x] Frontend connected to backend

**Congratulations! Your SafeCity FIR backend is fully operational.** 🎊

## 🚀 What's Next?

- [ ] Build FIR create/edit forms
- [ ] Add file upload for evidence
- [ ] Implement search UI
- [ ] Add more filters
- [ ] Create analytics dashboard
- [ ] Set up user authentication
- [ ] Deploy to Vercel
- [ ] Set up CI/CD pipeline

## 📞 Troubleshooting Quick Links

- **MongoDB Connection Error** → See BACKEND_SETUP.md
- **IP Whitelist Issue** → MongoDB Atlas → Network Access
- **API Returns 500** → Check server logs in terminal
- **Still Seeing Sample Data** → MongoDB URI not configured correctly
- **seed.js fails** → Verify MongoDB connection first

---

**Total Setup Time:** ~15-20 minutes

**Status:** Follow the phases in order!

Print this checklist or keep it open while setting up. ✓
