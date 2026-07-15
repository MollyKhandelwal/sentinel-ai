import { NextResponse } from "next/server";

const reports = [
  {
    id: "1",
    name: "Plant Health Report",
    type: "Daily",
    generated: "2 mins ago",
    status: "Completed",
  },
  {
    id: "2",
    name: "Safety Audit",
    type: "Weekly",
    generated: "20 mins ago",
    status: "Completed",
  },
  {
    id: "3",
    name: "Incident Summary",
    type: "Emergency",
    generated: "Processing",
    status: "Processing",
  },
  {
    id: "4",
    name: "Sensor Performance",
    type: "Monthly",
    generated: "Tomorrow 09:00",
    status: "Scheduled",
  },
  {
    id: "5",
    name: "Energy Consumption",
    type: "Daily",
    generated: "1 hour ago",
    status: "Completed",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    reports,
  });
}