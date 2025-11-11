import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const BankingPage = () => {
  const [bankingData, setBankingData] = useState<any[]>([]);

  // Fetch from backend (no /api prefix)
  useEffect(() => {
    fetch("http://localhost:4000/compliance")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => setBankingData(data))
      .catch((err) => {
        console.error("Failed to fetch compliance data:", err);
        // Fallback to static data if backend fails
        setBankingData([
          { year: 2024, cbGenerated: 1200, cbUsed: 950, cbBanked: 250 },
          { year: 2025, cbGenerated: 1300, cbUsed: 1100, cbBanked: 200 },
          { year: 2026, cbGenerated: 1400, cbUsed: 1200, cbBanked: 200 },
        ]);
      });
  }, []);

  const getProgress = (used: number, total: number) =>
    ((used / total) * 100).toFixed(1);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Banking Overview</h2>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Year</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                Compliance Balance (CB)
              </th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Used CB</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">Banked CB</th>
              <th className="py-3 px-4 text-left text-gray-700 font-semibold">
                Utilization (%)
              </th>
            </tr>
          </thead>
          <tbody>
            {bankingData.map((item) => (
              <tr key={item.year} className="border-b hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-800">{item.year}</td>
                <td className="py-3 px-4 text-gray-700">{item.cbGenerated}</td>
                <td className="py-3 px-4 text-gray-700">{item.cbUsed}</td>
                <td className="py-3 px-4 text-gray-700">{item.cbBanked}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-40 bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{
                          width: `${getProgress(item.cbUsed, item.cbGenerated)}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-gray-700 text-sm">
                      {getProgress(item.cbUsed, item.cbGenerated)}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Line Chart */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          CB Trend Over Years
        </h3>
        <div className="bg-white shadow-md rounded-xl p-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={bankingData}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="cbGenerated"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="CB Generated"
              />
              <Line
                type="monotone"
                dataKey="cbUsed"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="CB Used"
              />
              <Line
                type="monotone"
                dataKey="cbBanked"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="CB Banked"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Policy Summary */}
      <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-4">
        <h3 className="font-semibold text-green-800 mb-2">
          Banking Policy Summary (Article 20)
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          Operators can carry forward up to 25% of their unused Compliance Balance
          (CB) to the following year. The remaining CB, if not banked, will expire.
          Banked CBs can be used for compliance in the next two reporting periods,
          ensuring flexibility and incentivizing over-compliance.
        </p>
      </div>
    </div>
  );
};

export default BankingPage;
