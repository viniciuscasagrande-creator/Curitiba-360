import {
  useEffect,
  useMemo,
  useState,
} from 'react';

export function useAgencyPagination(
  agencies = [],
  initialPageSize = 10,
) {
  const [currentPage, setCurrentPage] =
    useState(1);

  const [pageSize, setPageSize] =
    useState(initialPageSize);

  const totalItems = agencies.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / pageSize),
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize, agencies.length]);

  const paginatedAgencies = useMemo(() => {
    const start =
      (currentPage - 1) * pageSize;

    return agencies.slice(
      start,
      start + pageSize,
    );
  }, [
    agencies,
    currentPage,
    pageSize,
  ]);

  const startItem =
    totalItems === 0
      ? 0
      : (currentPage - 1) *
          pageSize +
        1;

  const endItem = Math.min(
    currentPage * pageSize,
    totalItems,
  );

  function nextPage() {
    setCurrentPage((current) =>
      Math.min(current + 1, totalPages),
    );
  }

  function previousPage() {
    setCurrentPage((current) =>
      Math.max(current - 1, 1),
    );
  }

  function goToPage(page) {
    const safePage = Math.min(
      Math.max(Number(page), 1),
      totalPages,
    );

    setCurrentPage(safePage);
  }

  function changePageSize(value) {
    setPageSize(Number(value));
    setCurrentPage(1);
  }

  return {
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    startItem,
    endItem,

    paginatedAgencies,

    nextPage,
    previousPage,
    goToPage,
    changePageSize,
    setCurrentPage,
  };
}
