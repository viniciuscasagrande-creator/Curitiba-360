export function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value || 0));
}

export function formatDate(value) {
  if (!value) {
    return '-';
  }

  const [year, month, day] = value.split('-');

  return `${day}/${month}/${year}`;
}

export function sumBy(rows, property) {
  return rows.reduce(
    (total, row) =>
      total + Number(row[property] || 0),
    0,
  );
}

export function exportCsv(filename, rows) {
  const content = rows
    .map((row) =>
      row
        .map((value) => {
          const normalized = String(
            value ?? '',
          ).replaceAll('"', '""');

          return `"${normalized}"`;
        })
        .join(';'),
    )
    .join('\n');

  const blob = new Blob(
    ['\uFEFF', content],
    {
      type: 'text/csv;charset=utf-8;',
    },
  );

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(url);
}
