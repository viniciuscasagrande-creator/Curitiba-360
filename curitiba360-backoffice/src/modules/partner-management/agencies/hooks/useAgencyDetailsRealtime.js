import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  agencyService,
} from '../services/agencyService';

import {
  AGENCY_REALTIME_STATUS,
  createRealtimeState,
} from '../utils/agencyRealtimeUtils';

export function useAgencyDetailsRealtime({
  agencyId,
  enabled = true,
} = {}) {
  const [agency, setAgency] =
    useState(null);

  const [isLoading, setIsLoading] =
    useState(
      Boolean(
        enabled &&
        agencyId,
      ),
    );

  const [error, setError] =
    useState(null);

  const [realtimeState, setRealtimeState] =
    useState(
      createRealtimeState(),
    );

  const subscribe =
    useCallback(() => {
      if (
        !enabled ||
        !agencyId
      ) {
        return () => {};
      }

      setIsLoading(true);
      setError(null);

      return agencyService
        .subscribeToAgency(
          agencyId,
          {
            onStatusChange(
              nextStatus,
            ) {
              setRealtimeState(
                (current) => ({
                  ...current,
                  ...nextStatus,
                }),
              );
            },

            onData(payload) {
              setAgency(
                payload.data,
              );

              setIsLoading(false);
              setError(null);
            },

            onError(
              listenerError,
            ) {
              setError(
                listenerError,
              );

              setIsLoading(false);

              setRealtimeState(
                createRealtimeState({
                  status:
                    AGENCY_REALTIME_STATUS.ERROR,

                  isConnected:
                    false,

                  error:
                    listenerError,
                }),
              );
            },
          },
        );
    }, [
      agencyId,
      enabled,
    ]);

  useEffect(() => {
    const unsubscribe =
      subscribe();

    return () => {
      unsubscribe?.();
    };
  }, [subscribe]);

  return {
    agency,
    isLoading,
    error,

    realtimeStatus:
      realtimeState.status,

    isConnected:
      realtimeState.isConnected,

    isFromCache:
      realtimeState.isFromCache,

    hasPendingWrites:
      realtimeState.hasPendingWrites,

    lastSyncedAt:
      realtimeState.lastSyncedAt,
  };
}

export default useAgencyDetailsRealtime;
