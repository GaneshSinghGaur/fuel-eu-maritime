import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ShipCB {
  shipId: string;
  year: number;
  cbBefore: number;
  cbAfter?: number;
}

const PoolingPage: React.FC = () => {
  const [ships, setShips] = useState<ShipCB[]>([
    { shipId: "S001", year: 2024, cbBefore: 500 },
    { shipId: "S002", year: 2024, cbBefore: -200 },
    { shipId: "S003", year: 2024, cbBefore: 300 },
    { shipId: "S004", year: 2024, cbBefore: -100 },
  ]);

  const [pooled, setPooled] = useState(false);

  const totalCB = ships.reduce((sum, s) => sum + s.cbBefore, 0);
  const isValidPool = totalCB >= 0;

  const handleCreatePool = () => {
    if (!isValidPool) return alert("❌ Pool invalid: Total CB is negative.");
    let surplus = ships
      .filter((s) => s.cbBefore > 0)
      .sort((a, b) => b.cbBefore - a.cbBefore);
    let deficits = ships
      .filter((s) => s.cbBefore < 0)
      .sort((a, b) => a.cbBefore - b.cbBefore);

    const updatedShips = ships.map((ship) => ({ ...ship, cbAfter: ship.cbBefore }));

    for (const d of deficits) {
      let deficit = Math.abs(d.cbBefore);
      for (const s of surplus) {
        if (deficit <= 0) break;
        const available = s.cbBefore;
        const transfer = Math.min(available, deficit);
        s.cbBefore -= transfer;
        deficit -= transfer;

        updatedShips.find((sh) => sh.shipId === s.shipId)!.cbAfter = s.cbBefore;
        updatedShips.find((sh) => sh.shipId === d.shipId)!.cbAfter =
          updatedShips.find((sh) => sh.shipId === d.shipId)!.cbAfter! + transfer;
      }
    }

    setShips(updatedShips);
    setPooled(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Pooling Overview</h2>

      {/* Summary Card */}
      <div
        className={`p-4 mb-6 rounded-lg border ${
          isValidPool ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"
        }`}
      >
        <h3 className="font-semibold text-gray-800">
          Total Pool Balance:{" "}
          <span className={isValidPool ? "text-green-700" : "text-red-700"}>
            {totalCB >= 0 ? "+" : ""}
            {totalCB} gCO₂e
          </span>
        </h3>
        <p className="text-gray-600 text-sm">
          {isValidPool
            ? "✅ Pool valid — surpluses can offset deficits."
            : "❌ Invalid pool — total CB must be ≥ 0."}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Ship ID</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Year</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">CB Before</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">CB After</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {ships.map((s) => (
              <tr
                key={s.shipId}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 font-medium">{s.shipId}</td>
                <td className="py-3 px-4">{s.year}</td>
                <td
                  className={`py-3 px-4 ${
                    s.cbBefore < 0 ? "text-red-600" : "text-green-700"
                  }`}
                >
                  {s.cbBefore}
                </td>
                <td
                  className={`py-3 px-4 ${
                    s.cbAfter !== undefined && s.cbAfter < 0
                      ? "text-red-600"
                      : "text-green-700"
                  }`}
                >
                  {s.cbAfter !== undefined ? s.cbAfter : "-"}
                </td>
                <td className="py-3 px-4">
                  {s.cbAfter === undefined ? (
                    <span className="text-gray-500">Pending</span>
                  ) : s.cbAfter >= 0 ? (
                    <span className="text-green-600">✅ Compliant</span>
                  ) : (
                    <span className="text-red-600">❌ Deficit</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Pool Button */}
      <button
        onClick={handleCreatePool}
        disabled={!isValidPool || pooled}
        className={`px-5 py-2 rounded-md text-white font-semibold ${
          isValidPool && !pooled
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {pooled ? "Pool Created ✅" : "Create Pool"}
      </button>

      {/* Chart */}
      {pooled && (
        <div className="mt-10 bg-white shadow-md rounded-xl p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            CB Adjustment per Ship
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ships}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="shipId" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cbBefore" fill="#f87171" name="CB Before" />
              <Bar dataKey="cbAfter" fill="#22c55e" name="CB After" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Regulation Summary */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="font-semibold text-blue-800 mb-2">
          Pooling Policy Summary (Article 21)
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          Pooling allows operators to balance surpluses and deficits across ships.
          A pool is valid if the total adjusted Compliance Balance (CB) is non-negative.
          Surplus ships cannot exit with a negative CB, and deficit ships cannot exit
          worse than before pooling. This mechanism promotes flexibility and fairness
          in achieving Fuel EU compliance targets.
        </p>
      </div>
    </div>
  );
};

export default PoolingPage;
