#!/usr/bin/env node

/**
 * Seed Script - Populates MongoDB with sample FIR data
 * Run: node scripts/seed.js
 */

const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ Error: MONGODB_URI not found in .env.local");
  process.exit(1);
}

const firSchema = new mongoose.Schema(
  {
    firId: {
      type: String,
      required: true,
      unique: true,
    },
    date: String,
    time: String,
    type: String,
    location: String,
    complainant: String,
    status: String,
    priority: String,
    officer: String,
    description: String,
    evidence: String,
    notes: String,
  },
  {
    timestamps: true,
  },
);

const FIR = mongoose.model("FIR", firSchema);

const sampleData = [
  {
    firId: "FIR-2024-1847",
    date: "2024-01-27",
    time: "14:32",
    type: "Theft",
    location: "Andheri West",
    complainant: "Rajesh Kumar",
    status: "open",
    priority: "high",
    officer: "SI Patil",
    description: "Wallet stolen from shop",
    evidence: "CCTV footage available",
    notes: "Suspect identified",
  },
  {
    firId: "FIR-2024-1846",
    date: "2024-01-27",
    time: "12:15",
    type: "Assault",
    location: "Bandra",
    complainant: "Priya Sharma",
    status: "investigating",
    priority: "high",
    officer: "SI Deshmukh",
    description: "Street fight incident",
    evidence: "Eyewitness accounts",
    notes: "Medical report filed",
  },
  {
    firId: "FIR-2024-1845",
    date: "2024-01-27",
    time: "10:45",
    type: "Fraud",
    location: "Powai",
    complainant: "Amit Verma",
    status: "open",
    priority: "medium",
    officer: "SI Kulkarni",
    description: "Online transaction fraud",
    evidence: "Bank statements, screenshots",
    notes: "Cyber crime unit notified",
  },
  {
    firId: "FIR-2024-1844",
    date: "2024-01-26",
    time: "22:30",
    type: "Robbery",
    location: "Kurla",
    complainant: "Sunita Patel",
    status: "closed",
    priority: "high",
    officer: "SI Jadhav",
    description: "Home robbery",
    evidence: "Items recovered",
    notes: "Case closed - arrested",
  },
  {
    firId: "FIR-2024-1843",
    date: "2024-01-26",
    time: "18:20",
    type: "Vandalism",
    location: "Dadar",
    complainant: "Mohammed Ali",
    status: "investigating",
    priority: "low",
    officer: "SI Patil",
    description: "Property damage",
    evidence: "Photos taken",
    notes: "Local youth identified",
  },
];

async function seed() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    console.log("🗑️  Clearing existing FIRs...");
    await FIR.deleteMany({});
    console.log("✅ Cleared existing FIRs");

    console.log("📝 Seeding sample FIRs...");
    const createdFIRs = await FIR.insertMany(sampleData);
    console.log(`✅ Created ${createdFIRs.length} FIRs`);

    console.log("\n📊 Sample FIRs created:");
    createdFIRs.forEach((fir) => {
      console.log(
        `  • ${fir.firId} - ${fir.type} at ${fir.location} (${fir.status})`,
      );
    });

    console.log("\n✨ Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

seed();
