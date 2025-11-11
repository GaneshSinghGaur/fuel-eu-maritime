// src/api/routesApi.ts
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:4000",
});

export type ComparisonResponse = {
  baselineRoute: string;
  comparisons: {
    routeId: string;
    baseline: number;
    comparison: number;
    percentDiff: number;
    compliant: boolean;
  }[];
};

export const getComparison = async (): Promise<ComparisonResponse> => {
  const res = await client.get("/routes/comparison");
  return res.data;
};
