import { connectDB } from "@/lib/mongodb";
import FIR from "@/models/FIR";
import { NextResponse } from "next/server";

// GET all FIRs or search/filter
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");

    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};

    if (search) {
      filter.$or = [
        { firId: { $regex: search, $options: "i" } },
        { complainant: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { officer: { $regex: search, $options: "i" } },
      ];
    }

    if (type) filter.type = type;
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    // Get total count for pagination
    const total = await FIR.countDocuments(filter);

    // Get paginated results
    const firs = await FIR.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      {
        success: true,
        data: firs,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching FIRs:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// POST create a new FIR
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    // Generate FIR ID if not provided
    if (!body.firId) {
      const count = await FIR.countDocuments();
      const year = new Date().getFullYear();
      body.firId = `FIR-${year}-${count + 1}`;
    }

    const fir = await FIR.create(body);

    return NextResponse.json(
      {
        success: true,
        data: fir,
        message: "FIR created successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating FIR:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 400 },
    );
  }
}
