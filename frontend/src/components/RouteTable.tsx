// src/components/RouteTable.tsx
import React from "react";
import { createColumnHelper, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import type { RouteDto } from "../api/routesApi";

const columnHelper = createColumnHelper<RouteDto>();

export default function RouteTable({ routes, onSetBaseline }:{ routes: RouteDto[]; onSetBaseline:(routeId:string)=>Promise<void> }) {
  const columns = [
    columnHelper.accessor("routeId", { header: "routeId" }),
    columnHelper.accessor("vesselType", { header: "vesselType" }),
    columnHelper.accessor("fuelType", { header: "fuelType" }),
    columnHelper.accessor("year", { header: "year" }),
    columnHelper.accessor("ghgIntensity", { header: "ghgIntensity (gCO₂e/MJ)", cell: info => info.getValue().toFixed(3) }),
    columnHelper.accessor("fuelConsumption", { header: "fuelConsumption (t)" }),
    columnHelper.accessor("distance", { header: "distance (km)" }),
    columnHelper.accessor("totalEmissions", { header: "totalEmissions (t)" }),
    {
      id: "actions",
      header: "actions",
      cell: ({ row }: any) => (
        <button className="px-2 py-1 bg-sky-600 text-white rounded" onClick={()=>onSetBaseline(row.original.routeId)}>Set Baseline</button>
      )
    }
  ];
  const table = useReactTable({ data: routes, columns, getCoreRowModel: getCoreRowModel() });
  return (
    <div className="overflow-auto bg-white rounded p-4 shadow">
      <table className="w-full text-sm">
        <thead className="bg-slate-100">
          {table.getHeaderGroups().map(hg=> <tr key={hg.id}>{hg.headers.map(h=> <th key={h.id} className="text-left px-3 py-2">{flexRender(h.column.columnDef.header,h.getContext())}</th>)}</tr>)}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row=> (
            <tr key={row.id} className="border-t hover:bg-slate-50">
              {row.getVisibleCells().map(cell=> <td key={cell.id} className="px-3 py-2">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
