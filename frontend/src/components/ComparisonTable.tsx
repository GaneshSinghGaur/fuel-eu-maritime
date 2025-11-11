export default function ComparisonTable({ rows }: { rows: any[] }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th>route</th>
            <th>baseline</th>
            <th>comparison</th>
            <th>% diff</th>
            <th>compliant</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b">
              <td>{r.routeId}</td>
              <td>{r.baseline.toFixed(2)}</td>
              <td>{r.comparison.toFixed(2)}</td>
              <td>{r.percentDiff.toFixed(2)}%</td>
              <td>{r.compliant ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
