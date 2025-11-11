import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { getComparison } from "../api/routesApi";

interface Comparison {
  routeId: string;
  baseline: number;
  comparison: number;
  percentDiff: number;
  compliant: boolean;
}

const TARGET_INTENSITY = 89.3368;

const ComparisonPage: React.FC = () => {
  const [data, setData] = useState<Comparison[]>([]);
  const [baseline, setBaseline] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getComparison();
        setBaseline(res.baselineRoute);
        setData(res.comparisons);
      } catch (error) {
        console.error("Failed to fetch comparison:", error);
      }
    };

    fetchData();
  }, []);

  if (!data.length) {
    return <p className="text-center text-red-600 mt-10 text-lg">No comparison data available.</p>;
  }

  return (
    <div className="p-8 text-gray-800">
      <h1 className="text-2xl font-bold mb-6">Comparison Dashboard</h1>
      <p className="text-gray-600 mb-4">
        Baseline Route: <span className="font-semibold">{baseline}</span>
      </p>

      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden mb-8">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Route ID</th>
            <th className="py-2 px-4 text-left">Baseline GHG</th>
            <th className="py-2 px-4 text-left">Comparison GHG</th>
            <th className="py-2 px-4 text-left">% Difference</th>
            <th className="py-2 px-4 text-left">Compliant</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.routeId} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{item.routeId}</td>
              <td className="py-2 px-4">{item.baseline}</td>
              <td className="py-2 px-4">{item.comparison}</td>
              <td
                className={`py-2 px-4 ${
                  item.percentDiff < 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.percentDiff}%
              </td>
              <td className="py-2 px-4">{item.compliant ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mb-3">GHG Intensity Comparison</h2>
      <div className="h-80 w-full bg-white border border-gray-200 rounded-lg shadow-sm p-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.map((d) => ({ name: d.routeId, value: d.comparison }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[85, 100]} />
            <Tooltip />
            <Legend />
            <ReferenceLine
              y={TARGET_INTENSITY}
              label="EU Target 2025"
              stroke="red"
              strokeDasharray="4 4"
            />
            <Bar dataKey="value" fill="#3b82f6" name="GHG Intensity" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ComparisonPage;
