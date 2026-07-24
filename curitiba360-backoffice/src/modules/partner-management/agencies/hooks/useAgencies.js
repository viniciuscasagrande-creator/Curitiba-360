import { useCallback, useEffect, useState } from 'react';
import { agencyService } from '../services/agencyService';
import { agencyRepository } from '../repositories/agencyRepository';

export function useAgencies() {
  const [agencies, setAgencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  function showToast(message, type = 'success') {
    setToast({ message, type });
  }

  function clearToast() {
    setToast(null);
  }

  const reload = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await agencyService.list();
      setAgencies(data);
    } catch (err) {
      setError(err.message || 'Erro ao carregar agências.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();

    const unsubscribe = agencyRepository.subscribeRealtime((updatedList) => {
      setAgencies(updatedList);
      setIsLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [reload]);

  async function handleMutation(actionCallback, successMessage) {
    try {
      setIsMutating(true);
      setError(null);
      const result = await actionCallback();
      if (successMessage) showToast(successMessage, 'success');
      return result;
    } catch (err) {
      const msg = err.message || 'Ocorreu um erro ao processar a operação.';
      setError(msg);
      showToast(msg, 'error');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  const createAgency = (payload) =>
    handleMutation(() => agencyService.create(payload), 'Agência criada com sucesso!');

  const updateAgency = (id, payload) =>
    handleMutation(() => agencyService.update(id, payload), 'Agência atualizada com sucesso!');

  const approveAgency = (id) =>
    handleMutation(() => agencyService.approve(id), 'Aprovação realizada com sucesso!');

  const approveMany = (ids) =>
    handleMutation(() => agencyService.approveMany(ids), `${ids.length} agência(s) aprovada(s)!`);

  const rejectAgency = (id, reason) =>
    handleMutation(() => agencyService.reject(id, reason), 'Agência rejeitada com sucesso.');

  const rejectMany = (ids, reason) =>
    handleMutation(() => agencyService.rejectMany(ids, reason), `${ids.length} agência(s) rejeitada(s).`);

  const suspendAgency = (id, reason) =>
    handleMutation(() => agencyService.suspend(id, reason), 'Agência suspensa.');

  const suspendMany = (ids, reason) =>
    handleMutation(() => agencyService.suspendMany(ids, reason), `${ids.length} agência(s) suspensa(s).`);

  const inactivateAgency = (id) =>
    handleMutation(() => agencyService.inactivate(id), 'Agência inativada.');

  const inactivateMany = (ids) =>
    handleMutation(() => agencyService.inactivateMany(ids), `${ids.length} agência(s) inativada(s).`);

  const reactivateAgency = (id) =>
    handleMutation(() => agencyService.reactivate(id), 'Agência reativada com sucesso!');

  const removeAgency = (id) =>
    handleMutation(() => agencyService.remove(id), 'Exclusão concluída com sucesso.');

  const removeMany = (ids) =>
    handleMutation(() => agencyService.removeMany(ids), `${ids.length} agência(s) excluída(s).`);

  return {
    agencies,
    isLoading,
    isMutating,
    error,
    toast,
    clearToast,
    reload,
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
    reactivateAgency,
    removeAgency,
    removeMany,
  };
}
