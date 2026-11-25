export default function Table({ columns, data, loading, emptyMessage = 'Nenhum registro encontrado.' }) {
  if (loading) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-gray-200 bg-white p-8">
        <p className="text-sm text-gray-500 font-medium animate-pulse">Carregando dados...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <p className="text-sm text-gray-500 font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="border-b border-gray-200 bg-gray-50/80 text-xs uppercase font-semibold text-gray-700">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="px-6 py-4">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row, rowIndex) => (
              <tr key={row.id || rowIndex} className="hover:bg-slate-50/80 transition-colors">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    {col.cell ? col.cell(row) : row[col.accessorKey]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
