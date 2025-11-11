// backend/src/adapters/inbound/http/server.ts
import express from "express";
import cors from "cors";
import routesController from "./routesController";
import complianceController from "./complianceController";

const app = express();

// ✅ Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// ✅ Mount all APIs
app.use("/routes", routesController);          // Handles /routes, /routes/:id, /routes/comparison, etc.
app.use("/api/compliance", complianceController); // Handles /api/compliance

// ✅ Health check
app.get("/", (_req, res) => res.send("✅ Backend running successfully!"));

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
