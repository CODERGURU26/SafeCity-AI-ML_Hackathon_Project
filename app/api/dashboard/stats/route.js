import { connectDB } from "@/lib/mongodb";
import FIR from "@/models/FIR";
import { NextResponse } from "next/server";

// Default seed data for Officers (used only if collection is empty)
const DEFAULT_OFFICERS = [
  { name: "Rajesh Kumar", badge: "2401", rank: "SI", zone: "Bandra", status: "On Duty", caseCount: 8, phone: "9876543201" },
  { name: "Priya Singh", badge: "2402", rank: "Inspector", zone: "Andheri", status: "On Duty", caseCount: 12, phone: "9876543202" },
  { name: "Vikram Patel", badge: "2403", rank: "ASI", zone: "Dadar", status: "On Patrol", caseCount: 5, phone: "9876543203" },
  { name: "Neha Sharma", badge: "2404", rank: "SI", zone: "Colaba", status: "On Duty", caseCount: 9, phone: "9876543204" },
  { name: "Anil Desai", badge: "2405", rank: "Head Constable", zone: "Fort", status: "Off Duty", caseCount: 6, phone: "9876543205" },
  { name: "Sunita Joshi", badge: "2406", rank: "Constable", zone: "Kurla", status: "On Patrol", caseCount: 3, phone: "9876543206" },
  { name: "Mahesh Verma", badge: "2407", rank: "SI", zone: "Powai", status: "On Duty", caseCount: 11, phone: "9876543207" },
  { name: "Deepa Nair", badge: "2408", rank: "ASI", zone: "Borivali", status: "On Duty", caseCount: 7, phone: "9876543208" },
];

export async function GET() {
  try {
    await connectDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Total FIRs today
    const totalToday = await FIR.countDocuments({
      createdAt: { $gte: today },
    });

    // All time stats
    const totalAll = await FIR.countDocuments();
    const openCases = await FIR.countDocuments({ status: "open" });
    const investigating = await FIR.countDocuments({ status: "investigating" });
    const closedCases = await FIR.countDocuments({ status: "closed" });
    const highPriority = await FIR.countDocuments({ priority: "high" });

    // Yesterday's total for change comparison
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const totalYesterday = await FIR.countDocuments({
      createdAt: { $gte: yesterday, $lt: today },
    });

    const todayChange =
      totalYesterday > 0
        ? `${((totalToday - totalYesterday) / totalYesterday) * 100 >= 0 ? "+" : ""}${(
            ((totalToday - totalYesterday) / totalYesterday) *
            100
          ).toFixed(1)}%`
        : totalToday > 0
        ? "+100%"
        : "0%";

    return NextResponse.json({
      success: true,
      data: {
        totalFIRsToday: totalToday,
        totalFIRsAll: totalAll,
        openCases,
        investigating,
        closedCases,
        highPriority,
        activeAlerts: highPriority,
        resolutionRate:
          totalAll > 0 ? ((closedCases / totalAll) * 100).toFixed(1) : "0",
        todayChange,
        avgResponseTime: "4.2m", // Would need response-time tracking to compute dynamically
      },
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
