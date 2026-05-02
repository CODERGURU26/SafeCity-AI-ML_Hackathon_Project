import { connectDB } from "@/lib/mongodb";
import FIR from "@/models/FIR";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    // Fetch the 15 most recently created or updated FIRs
    const recentFIRs = await FIR.find()
      .sort({ updatedAt: -1 })
      .limit(15);

    const activities = recentFIRs.map((fir) => {
      const isNew =
        Math.abs(
          new Date(fir.createdAt).getTime() - new Date(fir.updatedAt).getTime()
        ) < 5000;

      let type, title, description, severity;

      if (isNew) {
        type = "fir";
        title = "New FIR Filed";
        description = `Case ${fir.firId} — ${fir.type} at ${fir.location}`;
        severity = fir.priority === "high" ? "high" : fir.priority === "medium" ? "medium" : "low";
      } else if (fir.status === "closed") {
        type = "resolved";
        title = "Case Resolved";
        description = `Case ${fir.firId} closed successfully`;
        severity = "success";
      } else if (fir.status === "investigating") {
        type = "patrol";
        title = "Investigation Updated";
        description = `Case ${fir.firId} — ${fir.type} • ${fir.location}`;
        severity = "medium";
      } else {
        type = fir.priority === "high" ? "alert" : "fir";
        title = fir.priority === "high" ? "High Priority Alert" : "FIR Updated";
        description = `Case ${fir.firId} — ${fir.type} • ${fir.location}`;
        severity = fir.priority === "high" ? "high" : "low";
      }

      const now = new Date();
      const updatedAt = new Date(fir.updatedAt);
      const diffMs = now - updatedAt;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      let time;
      if (diffMins < 1) time = "just now";
      else if (diffMins < 60) time = `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
      else if (diffHours < 24) time = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
      else time = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

      return {
        id: fir._id.toString(),
        type,
        title,
        description,
        time,
        severity,
        firId: fir.firId,
        location: fir.location,
        status: fir.status,
        priority: fir.priority,
        updatedAt: fir.updatedAt,
      };
    });

    return NextResponse.json({ success: true, data: activities });
  } catch (error) {
    console.error("Activity API error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
