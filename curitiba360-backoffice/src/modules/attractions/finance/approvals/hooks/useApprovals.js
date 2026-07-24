import { useCallback, useEffect, useState } from 'react';

import { approvalService } from '../services/approvalService';

export function useApprovals() {
  const [approvals, setApprovals] = useState([]);
  const [isLoading, setIsLoading] =
    useState(true);
  const [isMutating, setIsMutating] =
    useState(false);
  const [error, setError] = useState('');

  const loadApprovals = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const response =
        await approvalService.list();

      setApprovals(response);
    } catch (loadError) {
      setError(
        loadError?.message ??
          'Não foi possível carregar os repasses.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApprovals();
  }, [loadApprovals]);

  async function changeStatus(id, payload) {
    try {
      setIsMutating(true);
      setError('');

      const updated =
        await approvalService.changeStatus(
          id,
          payload,
        );

      setApprovals((current) =>
        current.map((item) =>
          item.id === updated.id
            ? updated
            : item,
        ),
      );

      return updated;
    } catch (mutationError) {
      setError(
        mutationError?.message ??
          'Não foi possível atualizar o repasse.',
      );

      throw mutationError;
    } finally {
      setIsMutating(false);
    }
  }

  async function approveMany(ids) {
    try {
      setIsMutating(true);
      setError('');

      const updatedItems =
        await approvalService.approveMany(ids);

      const updatedMap = new Map(
        updatedItems.map((item) => [
          item.id,
          item,
        ]),
      );

      setApprovals((current) =>
        current.map(
          (item) =>
            updatedMap.get(item.id) ?? item,
        ),
      );
    } catch (mutationError) {
      setError(
        mutationError?.message ??
          'Não foi possível aprovar os repasses.',
      );

      throw mutationError;
    } finally {
      setIsMutating(false);
    }
  }

  return {
    approvals,
    isLoading,
    isMutating,
    error,
    reload: loadApprovals,
    changeStatus,
    approveMany,
  };
}
