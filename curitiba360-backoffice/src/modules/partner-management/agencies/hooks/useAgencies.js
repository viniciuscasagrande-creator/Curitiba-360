import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { agencyService } from '../services/agencyService';

export function useAgencies() {
  const [agencies, setAgencies] = useState([]);
  const [isLoading, setIsLoading] =
    useState(true);
  const [isMutating, setIsMutating] =
    useState(false);
  const [error, setError] = useState('');

  const loadAgencies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const response =
        await agencyService.list();

      setAgencies(response);
    } catch (loadError) {
      setError(
        loadError?.message ??
          'Não foi possível carregar as agências.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAgencies();
  }, [loadAgencies]);

  async function executeMutation(action) {
    try {
      setIsMutating(true);
      setError('');

      const response = await action();

      await loadAgencies();

      return response;
    } catch (mutationError) {
      setError(
        mutationError?.message ??
          'Não foi possível atualizar as agências.',
      );

      throw mutationError;
    } finally {
      setIsMutating(false);
    }
  }

  function createAgency(payload) {
    return executeMutation(() =>
      agencyService.create(payload),
    );
  }

  function updateAgency(id, payload) {
    return executeMutation(() =>
      agencyService.update(id, payload),
    );
  }

  function approveAgency(id) {
    return executeMutation(() =>
      agencyService.approve(id),
    );
  }

  function approveMany(ids) {
    return executeMutation(() =>
      agencyService.approveMany(ids),
    );
  }

  function rejectAgency(id, reason) {
    return executeMutation(() =>
      agencyService.reject(id, reason),
    );
  }

  function rejectMany(ids, reason) {
    return executeMutation(() =>
      agencyService.rejectMany(
        ids,
        reason,
      ),
    );
  }

  function suspendAgency(id, reason) {
    return executeMutation(() =>
      agencyService.suspend(id, reason),
    );
  }

  function suspendMany(ids, reason) {
    return executeMutation(() =>
      agencyService.suspendMany(
        ids,
        reason,
      ),
    );
  }

  function inactivateAgency(id) {
    return executeMutation(() =>
      agencyService.inactivate(id),
    );
  }

  function inactivateMany(ids) {
    return executeMutation(() =>
      agencyService.inactivateMany(ids),
    );
  }

  function removeAgency(id) {
    return executeMutation(() =>
      agencyService.remove(id),
    );
  }

  function removeMany(ids) {
    return executeMutation(() =>
      agencyService.removeMany(ids),
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

    approveAgency,
    approveMany,

    rejectAgency,
    rejectMany,

    suspendAgency,
    suspendMany,

    inactivateAgency,
    inactivateMany,

    removeAgency,
    removeMany,
  };
}
