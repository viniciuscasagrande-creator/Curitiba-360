import { useCallback, useEffect, useState } from 'react';
import { agencyService } from '../services/agencyService';

export function useAgencies() {
  const [agencies, setAgencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState('');

  const loadAgencies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await agencyService.list();
      setAgencies(data);
    } catch (err) {
      setError(err?.message ?? 'Falha ao carregar agências.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAgencies();
  }, [loadAgencies]);

  async function createAgency(payload) {
    try {
      setIsMutating(true);
      setError('');
      const created = await agencyService.create(payload);
      setAgencies((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      setError(err?.message ?? 'Falha ao criar agência.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function updateAgency(id, payload) {
    try {
      setIsMutating(true);
      setError('');
      const updated = await agencyService.update(id, payload);
      setAgencies((prev) => prev.map((a) => (a.id === id ? updated : a)));
      return updated;
    } catch (err) {
      setError(err?.message ?? 'Falha ao atualizar agência.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function approveAgency(id) {
    try {
      setIsMutating(true);
      setError('');
      const updated = await agencyService.approve(id);
      setAgencies((prev) => prev.map((a) => (a.id === id ? updated : a)));
      return updated;
    } catch (err) {
      setError(err?.message ?? 'Falha ao aprovar agência.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function approveManyAgencies(ids) {
    try {
      setIsMutating(true);
      setError('');
      const updatedItems = await agencyService.approveMany(ids);
      const map = new Map(updatedItems.map((a) => [a.id, a]));
      setAgencies((prev) => prev.map((a) => map.get(a.id) ?? a));
    } catch (err) {
      setError(err?.message ?? 'Falha ao aprovar agências em lote.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function rejectAgency(id, reason) {
    try {
      setIsMutating(true);
      setError('');
      const updated = await agencyService.reject(id, reason);
      setAgencies((prev) => prev.map((a) => (a.id === id ? updated : a)));
      return updated;
    } catch (err) {
      setError(err?.message ?? 'Falha ao rejeitar agência.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function rejectManyAgencies(ids, reason) {
    try {
      setIsMutating(true);
      setError('');
      const updatedItems = await agencyService.rejectMany(ids, reason);
      const map = new Map(updatedItems.map((a) => [a.id, a]));
      setAgencies((prev) => prev.map((a) => map.get(a.id) ?? a));
    } catch (err) {
      setError(err?.message ?? 'Falha ao rejeitar agências em lote.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function suspendAgency(id, reason) {
    try {
      setIsMutating(true);
      setError('');
      const updated = await agencyService.suspend(id, reason);
      setAgencies((prev) => prev.map((a) => (a.id === id ? updated : a)));
      return updated;
    } catch (err) {
      setError(err?.message ?? 'Falha ao suspender agência.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function inactivateAgency(id) {
    try {
      setIsMutating(true);
      setError('');
      const updated = await agencyService.inactivate(id);
      setAgencies((prev) => prev.map((a) => (a.id === id ? updated : a)));
      return updated;
    } catch (err) {
      setError(err?.message ?? 'Falha ao inativar agência.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function reactivateAgency(id) {
    try {
      setIsMutating(true);
      setError('');
      const updated = await agencyService.reactivate(id);
      setAgencies((prev) => prev.map((a) => (a.id === id ? updated : a)));
      return updated;
    } catch (err) {
      setError(err?.message ?? 'Falha ao reativar agência.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function removeAgency(id) {
    try {
      setIsMutating(true);
      setError('');
      await agencyService.remove(id);
      setAgencies((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(err?.message ?? 'Falha ao remover agência.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function removeManyAgencies(ids) {
    try {
      setIsMutating(true);
      setError('');
      await agencyService.removeMany(ids);
      setAgencies((prev) => prev.filter((a) => !ids.includes(a.id)));
    } catch (err) {
      setError(err?.message ?? 'Falha ao remover agências em lote.');
      throw err;
    } finally {
      setIsMutating(false);
    }
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
    approveManyAgencies,
    rejectAgency,
    rejectManyAgencies,
    suspendAgency,
    inactivateAgency,
    reactivateAgency,
    removeAgency,
    removeManyAgencies,
  };
}
