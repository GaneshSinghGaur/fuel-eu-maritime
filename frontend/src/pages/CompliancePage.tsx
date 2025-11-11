import React, { useEffect, useState } from "react";
import { getComplianceData, type ComplianceRecord } from "../api/complianceApi";

const CompliancePage: React.FC = () => {
  const [data, setData] = useState<ComplianceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getComplianceData();
        setData(result);
      } catch (err) {
        console.error("Failed to fetch compliance data:", err);
        setError("Failed to load compliance data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Compliance Dashboard</h1>

      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Year</th>
            <th className="py-2 px-4 text-left">Compliance Balance</th>
            <th className="py-2 px-4 text-left">Used CB</th>
            <th className="py-2 px-4 text-left">Banked CB</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{item.year}</td>
              <td className="py-2 px-4">{item.complianceBalance}</td>
              <td className="py-2 px-4">{item.usedCB}</td>
              <td className="py-2 px-4">{item.bankedCB}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompliancePage;
