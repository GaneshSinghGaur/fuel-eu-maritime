import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /api/compliance
router.get("/", async (_req, res) => {
  try {
    const routes = await prisma.route.findMany({
      select: {
        routeId: true,
        vesselType: true,
        fuelType: true,
        year: true,
        ghgIntensity: true,
        fuelConsumption: true,
        distance: true,
        totalEmissions: true,
        isBaseline: true,
      },
    });

    res.json(routes);
  } catch (error) {
    console.error("Error fetching compliance data:", error);
    res.status(500).json({ error: "Failed to fetch compliance data" });
  }
});

export default router;
