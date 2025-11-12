import { Router, Request, Response } from "express";

const router = Router();

// Temporary mock data
const complianceData = [
  { year: 2024, complianceBalance: 1200, usedCB: 950, bankedCB: 250 },
  { year: 2025, complianceBalance: 1300, usedCB: 1100, bankedCB: 200 },
  { year: 2026, complianceBalance: 1400, usedCB: 1200, bankedCB: 200 },
];

router.get("/", (_req: Request, res: Response) => {
  res.json(complianceData);
});

export default router;
