import {
  useMemo,
  useState,
} from 'react';

function normalizeSortValue(value) {
  if (value === null || value === undefined) {
    return '';
  }

  if (
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return value;
  }

  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');
}

export function useAgencySorting(
  agencies = [],
) {
  const [sorting, setSorting] = useState({
    field: 'createdAt',
    direction: 'desc',
  });

  const sortedAgencies = useMemo(() => {
    const items = [...agencies];

    items.sort((first, second) => {
      let firstValue =
        first[sorting.field];

      let secondValue =
        second[sorting.field];

      if (
        sorting.field === 'createdAt' ||
        sorting.field === 'updatedAt'
      ) {
        firstValue = firstValue
          ? new Date(firstValue).getTime()
          : 0;

        secondValue = secondValue
          ? new Date(secondValue).getTime()
          : 0;
      }

      firstValue =
        normalizeSortValue(firstValue);

      secondValue =
        normalizeSortValue(secondValue);

      if (firstValue < secondValue) {
        return sorting.direction === 'asc'
          ? -1
          : 1;
      }

      if (firstValue > secondValue) {
        return sorting.direction === 'asc'
          ? 1
          : -1;
      }

      return 0;
    });

    return items;
  }, [agencies, sorting]);

  function toggleSorting(field) {
    setSorting((current) => {
      if (current.field !== field) {
        return {
          field,
          direction: 'asc',
        };
      }

      return {
        field,
        direction:
          current.direction === 'asc'
            ? 'desc'
            : 'asc',
      };
    });
  }

  return {
    sorting,
    sortedAgencies,
    toggleSorting,
    setSorting,
  };
}
