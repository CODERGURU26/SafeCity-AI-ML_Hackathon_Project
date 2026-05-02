import { connectDB } from "@/lib/mongodb";
import Officer from "@/models/Officer";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    const officer = await Officer.findByIdAndUpdate(
      params.id,
      { ...body },
      { new: true, runValidators: true }
    );
    if (!officer) {
      return NextResponse.json(
        { success: false, error: "Officer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: officer });
  } catch (error) {
    console.error("Officer PUT error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const officer = await Officer.findByIdAndDelete(params.id);
    if (!officer) {
      return NextResponse.json(
        { success: false, error: "Officer not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Officer deleted" });
  } catch (error) {
    console.error("Officer DELETE error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
