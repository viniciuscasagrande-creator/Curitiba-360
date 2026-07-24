import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  agencyService,
} from '../services/agencyService';

import {
  agencyQueryKeys,
} from './useAgencyQueryRealtime';

export function useAgencyMutations() {
  const queryClient =
    useQueryClient();

  const invalidateLists =
    async () => {
      await queryClient
        .invalidateQueries({
          queryKey:
            agencyQueryKeys
              .lists(),
        });
    };

  const createMutation =
    useMutation({
      mutationFn:
        agencyService.create,

      onSuccess:
        async (agency) => {
          queryClient.setQueryData(
            agencyQueryKeys.detail(
              agency.id,
            ),
            agency,
          );

          await invalidateLists();
        },
    });

  const updateMutation =
    useMutation({
      mutationFn: ({
        id,
        payload,
      }) =>
        agencyService.update(
          id,
          payload,
        ),

      onSuccess:
        async (agency) => {
          queryClient.setQueryData(
            agencyQueryKeys.detail(
              agency.id,
            ),
            agency,
          );

          queryClient.setQueriesData(
            {
              queryKey:
                agencyQueryKeys
                  .lists(),
            },
            (current = []) =>
              current.map(
                (item) =>
                  item.id ===
                  agency.id
                    ? agency
                    : item,
              ),
          );
        },
    });

  const removeMutation =
    useMutation({
      mutationFn:
        agencyService.remove,

      onSuccess:
        async (
          _result,
          agencyId,
        ) => {
          queryClient.removeQueries({
            queryKey:
              agencyQueryKeys
                .detail(
                  agencyId,
                ),
          });

          queryClient.setQueriesData(
            {
              queryKey:
                agencyQueryKeys
                  .lists(),
            },
            (current = []) =>
              current.filter(
                (agency) =>
                  agency.id !==
                  agencyId,
              ),
          );
        },
    });

  return {
    createAgency:
      createMutation.mutateAsync,

    updateAgency:
      updateMutation.mutateAsync,

    removeAgency:
      removeMutation.mutateAsync,

    isCreating:
      createMutation.isPending,

    isUpdating:
      updateMutation.isPending,

    isRemoving:
      removeMutation.isPending,

    error:
      createMutation.error ||
      updateMutation.error ||
      removeMutation.error,
  };
}

export default useAgencyMutations;
