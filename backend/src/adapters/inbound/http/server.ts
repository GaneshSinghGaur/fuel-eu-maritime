import express from "express";
import cors from "cors";
import routesController from "./routesController";
import complianceController from "./complianceController";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/routes", routesController);         
app.use("/api/compliance", complianceController); 

app.get("/", (_req, res) => res.send("✅ Backend running successfully!"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
