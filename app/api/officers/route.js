import { connectDB } from "@/lib/mongodb";
import Officer from "@/models/Officer";
import { NextResponse } from "next/server";

// Seed data for first run
const SEED_OFFICERS = [
  { name: "Rajesh Kumar", badge: "MUM-2401", rank: "SI", zone: "Bandra", status: "On Duty", caseCount: 8, phone: "9876543201" },
  { name: "Priya Singh", badge: "MUM-2402", rank: "Inspector", zone: "Andheri", status: "On Duty", caseCount: 12, phone: "9876543202" },
  { name: "Vikram Patel", badge: "MUM-2403", rank: "ASI", zone: "Dadar", status: "On Patrol", caseCount: 5, phone: "9876543203" },
  { name: "Neha Sharma", badge: "MUM-2404", rank: "SI", zone: "Colaba", status: "On Duty", caseCount: 9, phone: "9876543204" },
  { name: "Anil Desai", badge: "MUM-2405", rank: "Head Constable", zone: "Fort", status: "Off Duty", caseCount: 6, phone: "9876543205" },
  { name: "Sunita Joshi", badge: "MUM-2406", rank: "Constable", zone: "Kurla", status: "On Patrol", caseCount: 3, phone: "9876543206" },
  { name: "Mahesh Verma", badge: "MUM-2407", rank: "SI", zone: "Powai", status: "On Duty", caseCount: 11, phone: "9876543207" },
  { name: "Deepa Nair", badge: "MUM-2408", rank: "ASI", zone: "Borivali", status: "On Duty", caseCount: 7, phone: "9876543208" },
  { name: "Suresh Kadam", badge: "MUM-2409", rank: "Constable", zone: "Kurla", status: "On Duty", caseCount: 4, phone: "9876543209" },
  { name: "Asha Pawar", badge: "MUM-2410", rank: "SI", zone: "Thane", status: "On Leave", caseCount: 2, phone: "9876543210" },
];

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const zone = searchParams.get("zone");
    const limit = parseInt(searchParams.get("limit") || "50");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    // Seed if empty
    const count = await Officer.countDocuments();
    if (count === 0) {
      await Officer.insertMany(SEED_OFFICERS);
    }

    const filter = {};
    if (status) filter.status = status;
    if (zone) filter.zone = zone;

    const total = await Officer.countDocuments(filter);
    const officers = await Officer.find(filter)
      .sort({ caseCount: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      data: officers,
      pagination: { total, page, limit, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error("Officers GET error:", error);
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
    const officer = await Officer.create(body);
    return NextResponse.json({ success: true, data: officer }, { status: 201 });
  } catch (error) {
    console.error("Officers POST error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
