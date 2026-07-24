export function formatDateTime(value) {
  if (!value) {
    return '—';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(date);
}

export function normalizeSearch(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim();
}

export function generateCode(
  currentItems,
  minimumLength = 3,
) {
  const highestCode = currentItems.reduce(
    (highest, item) => {
      const numericCode = Number(item.id);

      if (Number.isNaN(numericCode)) {
        return highest;
      }

      return Math.max(highest, numericCode);
    },
    0,
  );

  return String(highestCode + 1).padStart(
    minimumLength,
    '0',
  );
}

export function cloneData(value) {
  if (
    typeof structuredClone === 'function'
  ) {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value));
}

export function exportCsv(filename, rows) {
  const csvContent = rows
    .map((row) =>
      row
        .map((cell) => {
          const stringified = String(cell ?? '').replace(/"/g, '""');
          return `"${stringified}"`;
        })
        .join(','),
    )
    .join('\n');

  const blob = new Blob(['\uFEFF' + csvContent], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
