import { connectDB } from "@/lib/mongodb";
import Allocation from "@/models/Allocation";
import { NextResponse } from "next/server";

function computeStatus(available, required) {
  if (!required || required === 0) return "optimal";
  const ratio = available / required;
  if (ratio >= 0.7) return "optimal";
  if (ratio >= 0.4) return "warning";
  return "critical";
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();

    // Compute status from updated values
    const status = computeStatus(
      body.availableOfficers,
      body.requiredOfficers
    );

    const allocation = await Allocation.findByIdAndUpdate(
      params.id,
      { ...body, status },
      { new: true, runValidators: true }
    );

    if (!allocation) {
      return NextResponse.json(
        { success: false, error: "Allocation not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: allocation });
  } catch (error) {
    console.error("Allocation PUT error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const allocation = await Allocation.findByIdAndDelete(params.id);
    if (!allocation) {
      return NextResponse.json(
        { success: false, error: "Allocation not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Allocation deleted" });
  } catch (error) {
    console.error("Allocation DELETE error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
