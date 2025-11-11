import { useState, useEffect } from "react";

const mockRoutes = [
  { routeId: "R001", vesselType: "Container", fuelType: "HFO", year: 2024, ghgIntensity: 91.0, fuelConsumption: 5000, distance: 12000, totalEmissions: 4500 },
  { routeId: "R002", vesselType: "BulkCarrier", fuelType: "LNG", year: 2024, ghgIntensity: 88.0, fuelConsumption: 4800, distance: 11500, totalEmissions: 4200 },
  { routeId: "R003", vesselType: "Tanker", fuelType: "MGO", year: 2024, ghgIntensity: 93.5, fuelConsumption: 5100, distance: 12500, totalEmissions: 4700 },
  { routeId: "R004", vesselType: "RoRo", fuelType: "HFO", year: 2025, ghgIntensity: 89.2, fuelConsumption: 4900, distance: 11800, totalEmissions: 4300 },
  { routeId: "R005", vesselType: "Container", fuelType: "LNG", year: 2025, ghgIntensity: 90.5, fuelConsumption: 4950, distance: 11900, totalEmissions: 4400 },
];

export default function RoutesPage() {
  const [routes, setRoutes] = useState<typeof mockRoutes>([]);
  const [filters, setFilters] = useState({
    vesselType: "All",
    fuelType: "All",
    year: "All",
  });
  const [baseline, setBaseline] = useState<string | null>(null);

  useEffect(() => {
    setTimeout(() => setRoutes(mockRoutes), 400);
  }, []);

  const vesselTypes = ["All", ...new Set(mockRoutes.map(r => r.vesselType))];
  const fuelTypes = ["All", ...new Set(mockRoutes.map(r => r.fuelType))];
  const years = ["All", ...new Set(mockRoutes.map(r => r.year.toString()))];

  const filteredRoutes = routes.filter(r =>
    (filters.vesselType === "All" || r.vesselType === filters.vesselType) &&
    (filters.fuelType === "All" || r.fuelType === filters.fuelType) &&
    (filters.year === "All" || r.year.toString() === filters.year)
  );

  const handleReset = () => {
    setFilters({ vesselType: "All", fuelType: "All", year: "All" });
  };

  const handleSetBaseline = (routeId: string) => {
    setBaseline(routeId);
    alert(`Route ${routeId} set as baseline for comparison.`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Routes</h2>

      {/* Filters Section */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div>
          <label className="mr-2 font-medium">Vessel Type</label>
          <select
            className="border p-1 rounded"
            value={filters.vesselType}
            onChange={e => setFilters({ ...filters, vesselType: e.target.value })}
          >
            {vesselTypes.map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-2 font-medium">Fuel Type</label>
          <select
            className="border p-1 rounded"
            value={filters.fuelType}
            onChange={e => setFilters({ ...filters, fuelType: e.target.value })}
          >
            {fuelTypes.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-2 font-medium">Year</label>
          <select
            className="border p-1 rounded"
            value={filters.year}
            onChange={e => setFilters({ ...filters, year: e.target.value })}
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleReset}
          className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
        >
          Reset
        </button>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">routeId</th>
              <th className="p-2 border">vesselType</th>
              <th className="p-2 border">fuelType</th>
              <th className="p-2 border">year</th>
              <th className="p-2 border">ghgIntensity (gCO₂e/MJ)</th>
              <th className="p-2 border">fuelConsumption (t)</th>
              <th className="p-2 border">distance (km)</th>
              <th className="p-2 border">totalEmissions (t)</th>
              <th className="p-2 border">actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoutes.map((r) => (
              <tr key={r.routeId} className="text-center hover:bg-gray-50">
                <td className="p-2 border">{r.routeId}</td>
                <td className="p-2 border">{r.vesselType}</td>
                <td className="p-2 border">{r.fuelType}</td>
                <td className="p-2 border">{r.year}</td>
                <td className="p-2 border">{r.ghgIntensity}</td>
                <td className="p-2 border">{r.fuelConsumption}</td>
                <td className="p-2 border">{r.distance}</td>
                <td className="p-2 border">{r.totalEmissions}</td>
                <td className="p-2 border">
                  <button
                    className={`px-3 py-1 rounded ${
                      baseline === r.routeId
                        ? "bg-green-600 text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                    onClick={() => handleSetBaseline(r.routeId)}
                  >
                    {baseline === r.routeId ? "Baseline Set" : "Set Baseline"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRoutes.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No routes found.</p>
        )}
      </div>
    </div>
  );
}
