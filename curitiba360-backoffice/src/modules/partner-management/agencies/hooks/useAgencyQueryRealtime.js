import {
  useEffect,
  useMemo,
} from 'react';

import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {
  agencyService,
} from '../services/agencyService';

import {
  applyRealtimeChanges,
} from '../utils/agencyRealtimeMerge';

export const agencyQueryKeys = {
  all: ['agencies'],

  lists() {
    return [
      ...this.all,
      'list',
    ];
  },

  list(parameters) {
    return [
      ...this.lists(),
      parameters,
    ];
  },

  details() {
    return [
      ...this.all,
      'detail',
    ];
  },

  detail(id) {
    return [
      ...this.details(),
      id,
    ];
  },
};

export function useAgencyQueryRealtime({
  filters = {},
  sorting = {
    field: 'createdAt',
    direction: 'desc',
  },
  pageSize = 100,
  realtimeEnabled = true,
} = {}) {
  const queryClient =
    useQueryClient();

  const parameters =
    useMemo(
      () => ({
        filters,
        sorting,
        pageSize,
      }),
      [
        JSON.stringify(filters),
        JSON.stringify(sorting),
        pageSize,
      ],
    );

  const queryKey =
    agencyQueryKeys.list(
      parameters,
    );

  const queryResult =
    useQuery({
      queryKey,

      queryFn: async () => {
        const result =
          await agencyService.paginate({
            filters,
            sorting,
            pageSize,
          });

        return result.data;
      },
    });

  useEffect(() => {
    if (!realtimeEnabled) {
      return undefined;
    }

    const unsubscribe =
      agencyService.subscribeToList({
        filters,
        sorting,
        pageSize,

        onData(payload) {
          queryClient.setQueryData(
            queryKey,
            (current = []) => {
              if (
                !payload.changes?.length
              ) {
                return payload.data;
              }

              return applyRealtimeChanges(
                current,
                payload.changes,
              );
            },
          );

          payload.changes.forEach(
            (change) => {
              if (
                !change.agency?.id
              ) {
                return;
              }

              queryClient.setQueryData(
                agencyQueryKeys.detail(
                  change.agency.id,
                ),
                change.type ===
                  'removed'
                  ? undefined
                  : change.agency,
              );
            },
          );
        },

        onError(error) {
          console.error(
            'Erro no listener TanStack:',
            error,
          );
        },
      });

    return unsubscribe;
  }, [
    queryClient,
    queryKey,
    realtimeEnabled,
    JSON.stringify(filters),
    JSON.stringify(sorting),
    pageSize,
  ]);

  return queryResult;
}

export default useAgencyQueryRealtime;
