import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  agencyService,
} from '../services/agencyService';

import {
  useAgencyRealtime,
} from './useAgencyRealtime';

import {
  applyRealtimeChanges,
} from '../utils/agencyRealtimeMerge';

export function useAgencies({
  filters = {},
  sorting = { field: 'createdAt', direction: 'desc' },
  pageSize = 100,
  initialRealtime = true,
} = {}) {
  const [agencies, setAgencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState(null);

  const [realtimeEnabled, setRealtimeEnabled] = useState(initialRealtime);
  const [lastRealtimeChange, setLastRealtimeChange] = useState(null);

  const realtime = useAgencyRealtime({
    enabled: realtimeEnabled,
    filters,
    sorting,
    pageSize,
    onChanges(changes) {
      setAgencies((current) =>
        applyRealtimeChanges(current, changes),
      );
      setLastRealtimeChange(new Date());
    },
  });

  const loadAgencies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await agencyService.list({
        pageSize,
      });

      setAgencies(result);
    } catch (loadError) {
      setError(loadError);
    } finally {
      setIsLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    if (!realtimeEnabled) {
      loadAgencies();
    }
  }, [loadAgencies, realtimeEnabled]);

  async function executeMutation(operation) {
    try {
      setIsMutating(true);
      setError(null);

      const result = await operation();

      if (!realtimeEnabled) {
        await loadAgencies();
      }

      return result;
    } catch (mutationError) {
      setError(mutationError);
      throw mutationError;
    } finally {
      setIsMutating(false);
    }
  }

  async function createAgency(payload) {
    return executeMutation(async () => {
      const created = await agencyService.create(payload);
      if (!realtimeEnabled) {
        setAgencies((current) => [created, ...current]);
      }
      return created;
    });
  }

  async function updateAgency(id, payload) {
    return executeMutation(async () => {
      const updated = await agencyService.update(id, payload);
      if (!realtimeEnabled) {
        setAgencies((current) =>
          current.map((agency) => (agency.id === id ? updated : agency)),
        );
      }
      return updated;
    });
  }

  async function patchAgency(id, changes) {
    return executeMutation(async () => {
      const updated = await agencyService.patch(id, changes);
      if (!realtimeEnabled) {
        setAgencies((current) =>
          current.map((agency) => (agency.id === id ? updated : agency)),
        );
      }
      return updated;
    });
  }

  async function executeStatusAction(id, action) {
    return executeMutation(async () => {
      const updated = await action();
      if (!realtimeEnabled) {
        setAgencies((current) =>
          current.map((agency) => (agency.id === id ? updated : agency)),
        );
      }
      return updated;
    });
  }

  async function approveAgency(id) {
    return executeStatusAction(id, () => agencyService.approve(id));
  }

  async function rejectAgency(id, reason) {
    return executeStatusAction(id, () => agencyService.reject(id, reason));
  }

  async function suspendAgency(id, reason) {
    return executeStatusAction(id, () => agencyService.suspend(id, reason));
  }

  async function inactivateAgency(id) {
    return executeStatusAction(id, () => agencyService.inactivate(id));
  }

  async function reactivateAgency(id) {
    return executeStatusAction(id, () => agencyService.reactivate(id));
  }

  async function removeAgency(id) {
    return executeMutation(async () => {
      const removed = await agencyService.remove(id);
      if (removed && !realtimeEnabled) {
        setAgencies((current) => current.filter((agency) => agency.id !== id));
      }
      return removed;
    });
  }

  return {
    agencies,
    isLoading: realtimeEnabled ? realtime.isInitialLoading : isLoading,
    isMutating,
    error: realtimeEnabled ? realtime.error : error,

    realtime,
    realtimeEnabled,
    lastRealtimeChange,

    enableRealtime() {
      setRealtimeEnabled(true);
    },

    disableRealtime() {
      setRealtimeEnabled(false);
    },

    toggleRealtime() {
      setRealtimeEnabled((val) => !val);
    },

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
