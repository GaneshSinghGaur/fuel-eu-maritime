// src/components/RouteFilters.tsx
import React from "react";

export default function RouteFilters({
  vesselTypes,
  fuelTypes,
  years,
  values,
  onChange,
  onReset,
}: {
  vesselTypes: string[];
  fuelTypes: string[];
  years: number[];
  values: { vesselType?: string; fuelType?: string; year?: number };
  onChange: (k: string, v: any) => void;
  onReset: () => void;
}) {
  return (
    <div className="flex gap-3 mb-4 items-end">
      <div>
        <label className="block text-sm">Vessel Type</label>
        <select className="border rounded p-1" value={values.vesselType || ""} onChange={(e)=>onChange("vesselType", e.target.value || undefined)}>
          <option value="">All</option>
          {vesselTypes.map(v=> <option key={v} value={v}>{v}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm">Fuel Type</label>
        <select className="border rounded p-1" value={values.fuelType || ""} onChange={(e)=>onChange("fuelType", e.target.value || undefined)}>
          <option value="">All</option>
          {fuelTypes.map(f=> <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm">Year</label>
        <select className="border rounded p-1" value={values.year ?? ""} onChange={(e)=>onChange("year", e.target.value ? Number(e.target.value) : undefined)}>
          <option value="">All</option>
          {years.map(y=> <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
      <button className="px-3 py-1 bg-slate-200 rounded" onClick={onReset}>Reset</button>
    </div>
  );
}
