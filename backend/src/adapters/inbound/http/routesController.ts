import { Router } from "express";
import { prisma } from "../../outbound/postgres/prismaClient";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const routes = await prisma.route.findMany();
    res.json(routes);
  } catch (err) {
    console.error("Error fetching routes:", err);
    res.status(500).json({ error: "Failed to fetch routes" });
  }
});

router.get("/comparison", async (_req, res) => {
  try {
    const baseline = await prisma.route.findFirst({ where: { isBaseline: true } });
    if (!baseline) return res.status(404).json({ error: "No baseline set" });

    const others = await prisma.route.findMany({
      where: { routeId: { not: baseline.routeId } },
    });

    const comparisons = others.map((r) => {
      const percentDiff = ((r.ghgIntensity / baseline.ghgIntensity - 1) * 100).toFixed(2);
      return {
        routeId: r.routeId,
        baseline: baseline.ghgIntensity,
        comparison: r.ghgIntensity,
        percentDiff: parseFloat(percentDiff),
        compliant: r.ghgIntensity <= baseline.ghgIntensity,
      };
    });

    res.json({
      baselineRoute: baseline.routeId,
      comparisons,
    });
  } catch (err) {
    console.error("Error computing comparison:", err);
    res.status(500).json({ error: "Failed to compute comparison" });
  }
});

router.post("/:routeId/baseline", async (req, res) => {
  try {
    const { routeId } = req.params;

    const existing = await prisma.route.findUnique({ where: { routeId } });
    if (!existing) return res.status(404).json({ error: "Route not found" });

    // Unset any existing baseline
    await prisma.route.updateMany({
      where: { isBaseline: true },
      data: { isBaseline: false },
    });

    // Set new baseline
    await prisma.route.update({
      where: { routeId },
      data: { isBaseline: true },
    });

    res.json({ message: `Baseline set for ${routeId}` });
  } catch (err) {
    console.error("Error setting baseline:", err);
    res.status(500).json({ error: "Failed to set baseline" });
  }
});

router.get("/:routeId", async (req, res) => {
  try {
    const { routeId } = req.params;
    const route = await prisma.route.findUnique({ where: { routeId } });
    if (!route) return res.status(404).json({ error: "Route not found" });
    res.json(route);
  } catch (err) {
    console.error("Error fetching route:", err);
    res.status(500).json({ error: "Failed to fetch route" });
  }
});

export default router;
