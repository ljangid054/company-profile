type Row = { label: string; value: string };

export function ProductSpecsTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/70">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className="border-b border-border/60 last:border-b-0 odd:bg-muted/20"
            >
              <th
                scope="row"
                className="w-2/5 px-4 py-3 text-left font-medium text-muted-foreground"
              >
                {row.label}
              </th>
              <td className="px-4 py-3 text-foreground">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
