import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const alerts = await prisma.alert.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    const recommendations = await prisma.aIRecommendation.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    const notifications = await prisma.notification.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    return NextResponse.json({
      alerts,
      recommendations,
      notifications,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch dashboard data",
      },
      {
        status: 500,
      }
    );
  }
}