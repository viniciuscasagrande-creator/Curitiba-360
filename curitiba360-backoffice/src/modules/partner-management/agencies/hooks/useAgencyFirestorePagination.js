import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  agencyService,
} from '../services/agencyService';

const DEFAULT_SORTING = {
  field: 'createdAt',
  direction: 'desc',
};

export function useAgencyFirestorePagination({
  initialFilters = {},
  initialSorting =
    DEFAULT_SORTING,
  initialPageSize = 20,
} = {}) {
  const [agencies, setAgencies] =
    useState([]);

  const [filters, setFilters] =
    useState(initialFilters);

  const [sorting, setSorting] =
    useState(initialSorting);

  const [pageSize, setPageSize] =
    useState(initialPageSize);

  const [page, setPage] =
    useState(1);

  const [hasNextPage, setHasNextPage] =
    useState(false);

  const [nextCursor, setNextCursor] =
    useState(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const cursorStackRef =
    useRef([null]);

  const loadPage =
    useCallback(
      async ({
        targetPage = 1,
        cursor = null,
        currentFilters = filters,
        currentSorting = sorting,
        currentPageSize = pageSize,
      } = {}) => {
        try {
          setIsLoading(true);
          setError(null);

          const result =
            await agencyService.paginate({
              filters:
                currentFilters,

              sorting:
                currentSorting,

              pageSize:
                currentPageSize,

              cursor,
            });

          setAgencies(
            result.data,
          );

          setHasNextPage(
            result.pagination
              .hasNextPage,
          );

          setNextCursor(
            result.pagination
              .nextCursor,
          );

          setPage(targetPage);

          return result;
        } catch (loadError) {
          setError(loadError);
          throw loadError;
        } finally {
          setIsLoading(false);
        }
      },
      [
        filters,
        sorting,
        pageSize,
      ],
    );

  const resetPagination =
    useCallback(() => {
      cursorStackRef.current = [
        null,
      ];

      setPage(1);
    }, []);

  const reload =
    useCallback(async () => {
      const cursor =
        cursorStackRef.current[
          page - 1
        ] || null;

      return loadPage({
        targetPage: page,
        cursor,
      });
    }, [
      loadPage,
      page,
    ]);

  const goToNextPage =
    useCallback(async () => {
      if (
        !hasNextPage ||
        !nextCursor ||
        isLoading
      ) {
        return;
      }

      cursorStackRef.current[
        page
      ] = nextCursor;

      await loadPage({
        targetPage:
          page + 1,

        cursor:
          nextCursor,
      });
    }, [
      hasNextPage,
      isLoading,
      loadPage,
      nextCursor,
      page,
    ]);

  const goToPreviousPage =
    useCallback(async () => {
      if (
        page <= 1 ||
        isLoading
      ) {
        return;
      }

      const previousPage =
        page - 1;

      const previousCursor =
        cursorStackRef.current[
          previousPage - 1
        ] || null;

      await loadPage({
        targetPage:
          previousPage,

        cursor:
          previousCursor,
      });
    }, [
      isLoading,
      loadPage,
      page,
    ]);

  const applyFilters =
    useCallback(
      async (nextFilters) => {
        resetPagination();

        setFilters(
          nextFilters,
        );

        return loadPage({
          targetPage: 1,
          cursor: null,
          currentFilters:
            nextFilters,
        });
      },
      [
        loadPage,
        resetPagination,
      ],
    );

  const applySorting =
    useCallback(
      async (nextSorting) => {
        resetPagination();

        setSorting(
          nextSorting,
        );

        return loadPage({
          targetPage: 1,
          cursor: null,
          currentSorting:
            nextSorting,
        });
      },
      [
        loadPage,
        resetPagination,
      ],
    );

  const changePageSize =
    useCallback(
      async (nextPageSize) => {
        const normalizedPageSize =
          Number(
            nextPageSize,
          );

        resetPagination();

        setPageSize(
          normalizedPageSize,
        );

        return loadPage({
          targetPage: 1,
          cursor: null,
          currentPageSize:
            normalizedPageSize,
        });
      },
      [
        loadPage,
        resetPagination,
      ],
    );

  useEffect(() => {
    loadPage({
      targetPage: 1,
      cursor: null,
    });
  }, []);

  return {
    agencies,
    filters,
    sorting,

    page,
    pageSize,
    hasNextPage,
    nextCursor,

    isLoading,
    error,

    applyFilters,
    applySorting,
    changePageSize,

    goToNextPage,
    goToPreviousPage,

    reload,
  };
}

export default useAgencyFirestorePagination;
