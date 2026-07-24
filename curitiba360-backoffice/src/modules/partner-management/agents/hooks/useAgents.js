import { useCallback, useEffect, useState } from 'react';
import { agentService } from '../services/agentService';

export function useAgents() {
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMutating, setIsMutating] = useState(false);
  const [error, setError] = useState('');

  const loadAgents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');
      const data = await agentService.list();
      setAgents(data);
    } catch (err) {
      setError(err?.message ?? 'Falha ao carregar agentes.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAgents();
  }, [loadAgents]);

  async function createAgent(data) {
    try {
      setIsMutating(true);
      const created = await agentService.create(data);
      setAgents((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      setError(err?.message ?? 'Erro ao criar agente.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function approveAgent(id) {
    try {
      setIsMutating(true);
      const updated = await agentService.approve(id);
      setAgents((prev) => prev.map((a) => (a.id === id ? updated : a)));
      return updated;
    } catch (err) {
      setError(err?.message ?? 'Erro ao aprovar agente.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function rejectAgent(id) {
    try {
      setIsMutating(true);
      const updated = await agentService.reject(id);
      setAgents((prev) => prev.map((a) => (a.id === id ? updated : a)));
      return updated;
    } catch (err) {
      setError(err?.message ?? 'Erro ao rejeitar agente.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function transferAgentAgency(id, newAgencyId, newAgencyName, reason) {
    try {
      setIsMutating(true);
      const updated = await agentService.transferAgency(id, newAgencyId, newAgencyName, reason);
      setAgents((prev) => prev.map((a) => (a.id === id ? updated : a)));
      return updated;
    } catch (err) {
      setError(err?.message ?? 'Erro ao transferir agente de agência.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  async function deleteAgent(id) {
    try {
      setIsMutating(true);
      await agentService.delete(id);
      setAgents((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(err?.message ?? 'Erro ao excluir agente.');
      throw err;
    } finally {
      setIsMutating(false);
    }
  }

  return {
    agents,
    isLoading,
    isMutating,
    error,
    reload: loadAgents,
    createAgent,
    approveAgent,
    rejectAgent,
    transferAgentAgency,
    deleteAgent,
  };
}
