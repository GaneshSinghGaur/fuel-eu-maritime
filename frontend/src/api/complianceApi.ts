import axios from "axios";

export type ComplianceRecord = {
  year: number;
  complianceBalance: number;
  usedCB: number;
  bankedCB: number;
};

// API base (your backend)
const BASE_URL = "http://localhost:4000/api/compliance";

export const getComplianceData = async (): Promise<ComplianceRecord[]> => {
  const res = await axios.get(BASE_URL);
  return res.data;
};
