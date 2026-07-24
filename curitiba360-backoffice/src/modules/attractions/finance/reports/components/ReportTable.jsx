export default function ReportTable({
  columns,
  rows,
  footer,
}) {
  return (
    <div className="mt-6 overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm print:rounded-none print:shadow-none text-left">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-[0.1em] text-slate-500"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-slate-100"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-4 py-4 text-xs font-semibold text-slate-700"
                  >
                    {column.render
                      ? column.render(row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

          {footer && (
            <tfoot className="border-t border-slate-200 bg-slate-50">
              <tr>
                {footer.map((value, index) => (
                  <td
                    key={index}
                    className="px-4 py-4 text-xs font-black text-slate-700"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
