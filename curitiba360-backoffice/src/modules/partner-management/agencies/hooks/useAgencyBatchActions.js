import {
  useCallback,
  useState,
} from 'react';

import {
  agencyService,
} from '../services/agencyService';

export function useAgencyBatchActions({
  onSuccess,
  onError,
  reload,
  clearSelection,
  realtimeEnabled = false,
} = {}) {
  const [isProcessing, setIsProcessing] =
    useState(false);

  const [processingAction, setProcessingAction] =
    useState(null);

  const [error, setError] =
    useState(null);

  const [lastResult, setLastResult] =
    useState(null);

  const executeBatchAction =
    useCallback(
      async ({
        actionName,
        operation,
      }) => {
        try {
          setIsProcessing(true);
          setProcessingAction(actionName);
          setError(null);

          const result =
            await operation();

          setLastResult(result);

          if (!realtimeEnabled && typeof reload === 'function') {
            await reload();
          }

          if (
            typeof clearSelection ===
            'function'
          ) {
            clearSelection();
          }

          if (
            typeof onSuccess ===
            'function'
          ) {
            onSuccess({
              action: actionName,
              result,
            });
          }

          return result;
        } catch (operationError) {
          setError(operationError);

          if (
            typeof onError ===
            'function'
          ) {
            onError({
              action: actionName,
              error: operationError,
            });
          }

          throw operationError;
        } finally {
          setIsProcessing(false);
          setProcessingAction(null);
        }
      },
      [
        clearSelection,
        onError,
        onSuccess,
        realtimeEnabled,
        reload,
      ],
    );

  const updateMany =
    useCallback(
      (ids, changes, metadata) =>
        executeBatchAction({
          actionName: 'update',

          operation: () =>
            agencyService.updateMany(
              ids,
              changes,
              metadata,
            ),
        }),
      [executeBatchAction],
    );

  const approveMany =
    useCallback(
      (ids, metadata) =>
        executeBatchAction({
          actionName: 'approve',

          operation: () =>
            agencyService.approveMany(
              ids,
              metadata,
            ),
        }),
      [executeBatchAction],
    );

  const rejectMany =
    useCallback(
      (ids, reason, metadata) =>
        executeBatchAction({
          actionName: 'reject',

          operation: () =>
            agencyService.rejectMany(
              ids,
              reason,
              metadata,
            ),
        }),
      [executeBatchAction],
    );

  const suspendMany =
    useCallback(
      (ids, reason, metadata) =>
        executeBatchAction({
          actionName: 'suspend',

          operation: () =>
            agencyService.suspendMany(
              ids,
              reason,
              metadata,
            ),
        }),
      [executeBatchAction],
    );

  const inactivateMany =
    useCallback(
      (ids, metadata) =>
        executeBatchAction({
          actionName: 'inactivate',

          operation: () =>
            agencyService.inactivateMany(
              ids,
              metadata,
            ),
        }),
      [executeBatchAction],
    );

  const reactivateMany =
    useCallback(
      (ids, metadata) =>
        executeBatchAction({
          actionName: 'reactivate',

          operation: () =>
            agencyService.reactivateMany(
              ids,
              metadata,
            ),
        }),
      [executeBatchAction],
    );

  const removeMany =
    useCallback(
      (ids, metadata) =>
        executeBatchAction({
          actionName: 'remove',

          operation: () =>
            agencyService.removeMany(
              ids,
              metadata,
            ),
        }),
      [executeBatchAction],
    );

  function clearBatchError() {
    setError(null);
  }

  return {
    isProcessing,
    processingAction,
    error,
    lastResult,

    updateMany,
    approveMany,
    rejectMany,
    suspendMany,
    inactivateMany,
    reactivateMany,
    removeMany,

    clearBatchError,
  };
}

export default useAgencyBatchActions;
