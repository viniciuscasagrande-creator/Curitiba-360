import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  AGENT_DEFAULT_FILTERS,
  AGENT_DEFAULT_PAGINATION,
  AGENT_DEFAULT_SORTING,
} from '../constants';

import {
  agentService,
} from '../services';

export function useAgents({
  initialFilters = {},
  initialSorting = {},
  initialPagination = {},
  autoLoad = true,
} = {}) {
  const [agents, setAgents] =
    useState([]);

  const [filters, setFilters] =
    useState({
      ...AGENT_DEFAULT_FILTERS,
      ...initialFilters,
    });

  const [sorting, setSorting] =
    useState({
      ...AGENT_DEFAULT_SORTING,
      ...initialSorting,
    });

  const [pagination, setPagination] =
    useState({
      ...AGENT_DEFAULT_PAGINATION,
      ...initialPagination,

      total: 0,
      totalPages: 1,
    });

  const [isLoading, setIsLoading] =
    useState(false);

  const [isMutating, setIsMutating] =
    useState(false);

  const [error, setError] =
    useState(null);

  const loadAgents =
    useCallback(async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result =
          await agentService.paginate({
            filters,
            sorting,

            page:
              pagination.page,

            pageSize:
              pagination.pageSize,
          });

        setAgents(
          result.data,
        );

        setPagination(
          (current) => ({
            ...current,
            ...result.pagination,
          }),
        );

        return result;
      } catch (loadError) {
        setError(loadError);
        throw loadError;
      } finally {
        setIsLoading(false);
      }
    }, [
      filters,
      sorting,
      pagination.page,
      pagination.pageSize,
    ]);

  useEffect(() => {
    if (!autoLoad) {
      return;
    }

    loadAgents().catch(() => {
      // O erro já foi salvo no estado.
    });
  }, [
    autoLoad,
    loadAgents,
  ]);

  const updateFilters =
    useCallback(
      (nextFilters) => {
        setFilters(
          (current) => ({
            ...current,

            ...(typeof nextFilters ===
            'function'
              ? nextFilters(current)
              : nextFilters),
          }),
        );

        setPagination(
          (current) => ({
            ...current,
            page: 1,
          }),
        );
      },
      [],
    );

  const resetFilters =
    useCallback(() => {
      setFilters({
        ...AGENT_DEFAULT_FILTERS,
      });

      setPagination(
        (current) => ({
          ...current,
          page: 1,
        }),
      );
    }, []);

  const updateSorting =
    useCallback(
      (
        field,
        direction,
      ) => {
        setSorting({
          field,

          direction:
            direction ||
            (
              sorting.field === field &&
              sorting.direction === 'asc'
                ? 'desc'
                : 'asc'
            ),
        });

        setPagination(
          (current) => ({
            ...current,
            page: 1,
          }),
        );
      },
      [
        sorting.field,
        sorting.direction,
      ],
    );

  const goToPage =
    useCallback((page) => {
      setPagination(
        (current) => ({
          ...current,

          page: Math.min(
            Math.max(
              Number(page) || 1,
              1,
            ),
            current.totalPages || 1,
          ),
        }),
      );
    }, []);

  const changePageSize =
    useCallback(
      (pageSize) => {
        setPagination(
          (current) => ({
            ...current,

            page: 1,

            pageSize:
              Number(pageSize) ||
              current.pageSize,
          }),
        );
      },
      [],
    );

  const executeMutation =
    useCallback(
      async (
        operation,
        {
          reload = true,
        } = {},
      ) => {
        setIsMutating(true);
        setError(null);

        try {
          const result =
            await operation();

          if (reload) {
            await loadAgents();
          }

          return result;
        } catch (mutationError) {
          setError(
            mutationError,
          );

          throw mutationError;
        } finally {
          setIsMutating(false);
        }
      },
      [loadAgents],
    );

  const createAgent =
    useCallback(
      (payload) =>
        executeMutation(
          () =>
            agentService.create(
              payload,
            ),
        ),
      [executeMutation],
    );

  const updateAgent =
    useCallback(
      (
        agentId,
        payload,
      ) =>
        executeMutation(
          () =>
            agentService.update(
              agentId,
              payload,
            ),
        ),
      [executeMutation],
    );

  const removeAgent =
    useCallback(
      (agentId) =>
        executeMutation(
          () =>
            agentService.remove(
              agentId,
            ),
        ),
      [executeMutation],
    );

  const approveAgent =
    useCallback(
      (
        agentId,
        metadata,
      ) =>
        executeMutation(
          () =>
            agentService.approve(
              agentId,
              metadata,
            ),
        ),
      [executeMutation],
    );

  const suspendAgent =
    useCallback(
      (
        agentId,
        options,
      ) =>
        executeMutation(
          () =>
            agentService.suspend(
              agentId,
              options,
            ),
        ),
      [executeMutation],
    );

  const reactivateAgent =
    useCallback(
      (
        agentId,
        metadata,
      ) =>
        executeMutation(
          () =>
            agentService.reactivate(
              agentId,
              metadata,
            ),
        ),
      [executeMutation],
    );

  const inactivateAgent =
    useCallback(
      (
        agentId,
        metadata,
      ) =>
        executeMutation(
          () =>
            agentService.inactivate(
              agentId,
              metadata,
            ),
        ),
      [executeMutation],
    );

  const hasActiveFilters =
    useMemo(
      () =>
        Object.values(
          filters,
        ).some(
          (value) =>
            Array.isArray(value)
              ? value.length > 0
              : Boolean(value),
        ),
      [filters],
    );

  return {
    agents,

    filters,
    sorting,
    pagination,

    isLoading,
    isMutating,
    error,

    hasActiveFilters,

    setFilters:
      updateFilters,

    resetFilters,

    setSorting:
      updateSorting,

    goToPage,
    changePageSize,

    reload:
      loadAgents,

    createAgent,
    updateAgent,
    removeAgent,

    approveAgent,
    suspendAgent,
    reactivateAgent,
    inactivateAgent,

    clearError() {
      setError(null);
    },
  };
}

export default useAgents;
