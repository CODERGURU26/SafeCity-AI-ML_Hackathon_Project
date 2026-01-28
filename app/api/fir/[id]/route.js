import { connectDB } from "@/lib/mongodb";
import FIR from "@/models/FIR";
import { NextResponse } from "next/server";

// GET a single FIR by ID
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const fir = await FIR.findOne({ firId: id });

    if (!fir) {
      return NextResponse.json(
        {
          success: false,
          error: "FIR not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: fir,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching FIR:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}

// PUT update a FIR
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const fir = await FIR.findOneAndUpdate(
      { firId: id },
      { $set: body },
      { new: true, runValidators: true },
    );

    if (!fir) {
      return NextResponse.json(
        {
          success: false,
          error: "FIR not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: fir,
        message: "FIR updated successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating FIR:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 400 },
    );
  }
}

// DELETE a FIR
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const fir = await FIR.findOneAndDelete({ firId: id });

    if (!fir) {
      return NextResponse.json(
        {
          success: false,
          error: "FIR not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: fir,
        message: "FIR deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting FIR:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}
