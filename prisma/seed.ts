import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Seeding database...");

  // AI Recommendations
  await prisma.aIRecommendation.createMany({
    data: [
      {
        title: "Inspect Boiler Zone B",
        description: "Methane level increasing rapidly.",
        priority: "HIGH",
      },
      {
        title: "Schedule Sensor Calibration",
        description: "Temperature sensor needs calibration.",
        priority: "MEDIUM",
      },
      {
        title: "Reduce Conveyor Speed",
        description: "Reduce vibration risk.",
        priority: "LOW",
      },
    ],
  });

  // Alerts
  await prisma.alert.createMany({
    data: [
      {
        title: "Methane Leak Detected",
        message: "Methane concentration exceeded threshold.",
        severity: "CRITICAL",
      },
      {
        title: "Pressure Rising",
        message: "Pressure increased by 18%.",
        severity: "HIGH",
      },
      {
        title: "Temperature Spike",
        message: "Temperature crossed safe limit.",
        severity: "MEDIUM",
      },
    ],
  });

  // Reports
  await prisma.report.createMany({
    data: [
      {
        title: "Plant Health Report",
        fileUrl: "/reports/plant-health.pdf",
      },
      {
        title: "Safety Audit",
        fileUrl: "/reports/safety-audit.pdf",
      },
    ],
  });

  console.log("✅ Database Seeded Successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });