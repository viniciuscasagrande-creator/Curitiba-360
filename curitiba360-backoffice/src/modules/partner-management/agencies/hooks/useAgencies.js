import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  agencyService,
} from '../services/agencyService';

export function useAgencies() {
  const [agencies, setAgencies] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isMutating, setIsMutating] =
    useState(false);

  const [error, setError] =
    useState(null);

  const loadAgencies =
    useCallback(async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result =
          await agencyService.list({
            pageSize: 100,
          });

        setAgencies(result);
      } catch (loadError) {
        setError(loadError);
      } finally {
        setIsLoading(false);
      }
    }, []);

  useEffect(() => {
    loadAgencies();
  }, [loadAgencies]);

  async function executeMutation(
    operation,
  ) {
    try {
      setIsMutating(true);
      setError(null);

      const result =
        await operation();

      return result;
    } catch (mutationError) {
      setError(mutationError);
      throw mutationError;
    } finally {
      setIsMutating(false);
    }
  }

  async function createAgency(
    payload,
  ) {
    return executeMutation(
      async () => {
        const created =
          await agencyService.create(
            payload,
          );

        setAgencies((current) => [
          created,
          ...current,
        ]);

        return created;
      },
    );
  }

  async function updateAgency(
    id,
    payload,
  ) {
    return executeMutation(
      async () => {
        const updated =
          await agencyService.update(
            id,
            payload,
          );

        setAgencies((current) =>
          current.map((agency) =>
            agency.id === id
              ? updated
              : agency,
          ),
        );

        return updated;
      },
    );
  }

  async function patchAgency(
    id,
    changes,
  ) {
    return executeMutation(
      async () => {
        const updated =
          await agencyService.patch(
            id,
            changes,
          );

        setAgencies((current) =>
          current.map((agency) =>
            agency.id === id
              ? updated
              : agency,
          ),
        );

        return updated;
      },
    );
  }

  async function executeStatusAction(
    id,
    action,
  ) {
    return executeMutation(
      async () => {
        const updated =
          await action();

        setAgencies((current) =>
          current.map((agency) =>
            agency.id === id
              ? updated
              : agency,
          ),
        );

        return updated;
      },
    );
  }

  async function approveAgency(id) {
    return executeStatusAction(
      id,
      () =>
        agencyService.approve(id),
    );
  }

  async function rejectAgency(
    id,
    reason,
  ) {
    return executeStatusAction(
      id,
      () =>
        agencyService.reject(
          id,
          reason,
        ),
    );
  }

  async function suspendAgency(
    id,
    reason,
  ) {
    return executeStatusAction(
      id,
      () =>
        agencyService.suspend(
          id,
          reason,
        ),
    );
  }

  async function inactivateAgency(
    id,
  ) {
    return executeStatusAction(
      id,
      () =>
        agencyService.inactivate(id),
    );
  }

  async function reactivateAgency(
    id,
  ) {
    return executeStatusAction(
      id,
      () =>
        agencyService.reactivate(id),
    );
  }

  async function removeAgency(id) {
    return executeMutation(
      async () => {
        const removed =
          await agencyService.remove(
            id,
          );

        if (removed) {
          setAgencies((current) =>
            current.filter(
              (agency) =>
                agency.id !== id,
            ),
          );
        }

        return removed;
      },
    );
  }

  return {
    agencies,
    isLoading,
    isMutating,
    error,

    reload: loadAgencies,

    createAgency,
    updateAgency,
    patchAgency,

    approveAgency,
    rejectAgency,
    suspendAgency,
    inactivateAgency,
    reactivateAgency,

    removeAgency,
  };
}

export default useAgencies;
