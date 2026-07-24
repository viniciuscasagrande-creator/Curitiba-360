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

  async function createAgency(formData) {
    try {
      setIsMutating(true);
      setError('');
      const created = await agencyService.create(formData);
      setAgencies((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      setError(err?.message ?? 'Falha ao criar agência.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function approveAgency(id) {
    try {
      setIsMutating(true);
      const updated = await agencyService.approve(id);
      setAgencies((prev) => prev.map((a) => (a.id === id ? updated : a)));
      return updated;
    } catch (err) {
      setError(err?.message ?? 'Erro ao aprovar agência.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function rejectAgency(id, reason) {
    try {
      setIsMutating(true);
      const updated = await agencyService.reject(id, reason);
      setAgencies((prev) => prev.map((a) => (a.id === id ? updated : a)));
      return updated;
    } catch (err) {
      setError(err?.message ?? 'Erro ao rejeitar agência.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function suspendAgency(id, reason) {
    try {
      setIsMutating(true);
      const updated = await agencyService.suspend(id, reason);
      setAgencies((prev) => prev.map((a) => (a.id === id ? updated : a)));
      return updated;
    } catch (err) {
      setError(err?.message ?? 'Erro ao suspender agência.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function approveManyAgencies(ids) {
    try {
      setIsMutating(true);
      const updatedList = await agencyService.approveMany(ids);
      setAgencies(updatedList);
    } catch (err) {
      setError(err?.message ?? 'Erro ao aprovar agências em lote.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function rejectManyAgencies(ids) {
    try {
      setIsMutating(true);
      const updatedList = await agencyService.rejectMany(ids);
      setAgencies(updatedList);
    } catch (err) {
      setError(err?.message ?? 'Erro ao rejeitar agências em lote.');
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
    approveAgency,
    rejectAgency,
    suspendAgency,
    approveManyAgencies,
    rejectManyAgencies,
  };
}
