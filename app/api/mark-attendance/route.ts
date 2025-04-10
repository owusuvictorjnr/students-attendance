import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Attendance from "@/lib/models/attendance";

export async function POST(req: Request) {
  try {
    await connectToDatabase(); // Ensure DB connection
    const { fingerprintId, temperature } = await req.json();
  
    if (!fingerprintId || !temperature) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const newAttendance = new Attendance({ fingerprintId, temperature });
    await newAttendance.save();

    return NextResponse.json({ message: "Attendance recorded!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
