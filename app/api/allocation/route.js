import { connectDB } from "@/lib/mongodb";
import Allocation from "@/models/Allocation";
import { NextResponse } from "next/server";

// Helper: compute status from numbers
function computeStatus(available, required) {
  if (!required || required === 0) return "optimal";
  const ratio = available / required;
  if (ratio >= 0.7) return "optimal";
  if (ratio >= 0.4) return "warning";
  return "critical";
}

// Seed data for first run
const SEED_ALLOCATIONS = [
  { location: "Andheri West", allocatedOfficers: 15, availableOfficers: 8, requiredOfficers: 12 },
  { location: "Bandra", allocatedOfficers: 12, availableOfficers: 3, requiredOfficers: 18 },
  { location: "Powai", allocatedOfficers: 18, availableOfficers: 10, requiredOfficers: 15 },
  { location: "Kurla", allocatedOfficers: 14, availableOfficers: 5, requiredOfficers: 16 },
  { location: "Dadar", allocatedOfficers: 16, availableOfficers: 12, requiredOfficers: 14 },
  { location: "Borivali", allocatedOfficers: 10, availableOfficers: 7, requiredOfficers: 10 },
  { location: "Thane", allocatedOfficers: 20, availableOfficers: 9, requiredOfficers: 18 },
  { location: "Navi Mumbai", allocatedOfficers: 22, availableOfficers: 15, requiredOfficers: 20 },
];

export async function GET() {
  try {
    await connectDB();

    // Seed if empty
    const count = await Allocation.countDocuments();
    if (count === 0) {
      const seeded = SEED_ALLOCATIONS.map((item) => ({
        ...item,
        status: computeStatus(item.availableOfficers, item.requiredOfficers),
      }));
      await Allocation.insertMany(seeded);
    }

    const allocations = await Allocation.find().sort({ location: 1 });

    return NextResponse.json({ success: true, data: allocations });
  } catch (error) {
    console.error("Allocation GET error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    body.status = computeStatus(body.availableOfficers, body.requiredOfficers);
    const allocation = await Allocation.create(body);
    return NextResponse.json({ success: true, data: allocation }, { status: 201 });
  } catch (error) {
    console.error("Allocation POST error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
