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
