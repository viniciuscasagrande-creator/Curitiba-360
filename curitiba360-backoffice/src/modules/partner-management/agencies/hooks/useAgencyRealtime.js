import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  agencyService,
} from '../services/agencyService';

import {
  agencyRealtimeListenerManager,
} from '../repositories/agencyRealtimeListenerManager';

import {
  AGENCY_REALTIME_STATUS,
  createRealtimeState,
} from '../utils/agencyRealtimeUtils';

function createListenerKey({
  filters,
  sorting,
  pageSize,
}) {
  return [
    'agencies',
    JSON.stringify(filters || {}),
    JSON.stringify(sorting || {}),
    String(pageSize || 100),
  ].join(':');
}

export function useAgencyRealtime({
  enabled = true,

  filters = {},

  sorting = {
    field: 'createdAt',
    direction: 'desc',
  },

  pageSize = 100,

  includeMetadataChanges = true,

  onAdded,
  onModified,
  onRemoved,
  onChanges,
} = {}) {
  const [agencies, setAgencies] =
    useState([]);

  const [changes, setChanges] =
    useState([]);

  const [changesSummary, setChangesSummary] =
    useState({
      added: 0,
      modified: 0,
      removed: 0,
    });

  const [isInitialLoading, setIsInitialLoading] =
    useState(enabled);

  const [realtimeState, setRealtimeState] =
    useState(
      createRealtimeState({
        status: enabled
          ? AGENCY_REALTIME_STATUS.CONNECTING
          : AGENCY_REALTIME_STATUS.IDLE,
      }),
    );

  const [error, setError] =
    useState(null);

  const mountedRef =
    useRef(false);

  const receivedFirstSnapshotRef =
    useRef(false);

  const listenerKey =
    useMemo(
      () =>
        createListenerKey({
          filters,
          sorting,
          pageSize,
        }),
      [
        filters,
        sorting,
        pageSize,
      ],
    );

  const stop =
    useCallback(() => {
      agencyRealtimeListenerManager.stop(
        listenerKey,
      );

      if (mountedRef.current) {
        setRealtimeState(
          createRealtimeState({
            status:
              AGENCY_REALTIME_STATUS.STOPPED,

            isConnected: false,
          }),
        );
      }
    }, [listenerKey]);

  const start =
    useCallback(() => {
      if (!enabled) {
        return () => {};
      }

      setError(null);
      setIsInitialLoading(
        !receivedFirstSnapshotRef.current,
      );

      setRealtimeState(
        createRealtimeState({
          status:
            AGENCY_REALTIME_STATUS.CONNECTING,

          isConnected: false,
        }),
      );

      const unsubscribe =
        agencyService.subscribeToList({
          filters,
          sorting,
          pageSize,
          includeMetadataChanges,

          onStatusChange(nextStatus) {
            if (!mountedRef.current) {
              return;
            }

            setRealtimeState(
              (current) => ({
                ...current,
                ...nextStatus,

                error:
                  nextStatus.error ||
                  null,
              }),
            );
          },

          onData(payload) {
            if (!mountedRef.current) {
              return;
            }

            setAgencies(
              payload.data,
            );

            setChanges(
              payload.changes,
            );

            setChangesSummary(
              payload.changesSummary,
            );

            setError(null);

            if (
              !receivedFirstSnapshotRef.current
            ) {
              receivedFirstSnapshotRef.current =
                true;

              setIsInitialLoading(false);
            }

            payload.changes.forEach(
              (change) => {
                if (
                  change.type === 'added'
                ) {
                  onAdded?.(change);
                }

                if (
                  change.type ===
                  'modified'
                ) {
                  onModified?.(change);
                }

                if (
                  change.type ===
                  'removed'
                ) {
                  onRemoved?.(change);
                }
              },
            );

            onChanges?.(
              payload.changes,
              payload,
            );
          },

          onError(listenerError) {
            if (!mountedRef.current) {
              return;
            }

            setError(
              listenerError,
            );

            setIsInitialLoading(false);

            setRealtimeState(
              createRealtimeState({
                status:
                  AGENCY_REALTIME_STATUS.ERROR,

                isConnected: false,

                error:
                  listenerError,
              }),
            );
          },
        });

      agencyRealtimeListenerManager.register(
        listenerKey,
        unsubscribe,
      );

      return unsubscribe;
    }, [
      enabled,
      filters,
      includeMetadataChanges,
      listenerKey,
      onAdded,
      onChanges,
      onModified,
      onRemoved,
      pageSize,
      sorting,
    ]);

  const restart =
    useCallback(() => {
      stop();

      receivedFirstSnapshotRef.current =
        false;

      return start();
    }, [start, stop]);

  useEffect(() => {
    mountedRef.current = true;

    if (!enabled) {
      setIsInitialLoading(false);

      setRealtimeState(
        createRealtimeState({
          status:
            AGENCY_REALTIME_STATUS.IDLE,
        }),
      );

      return () => {
        mountedRef.current = false;
      };
    }

    start();

    return () => {
      mountedRef.current = false;

      agencyRealtimeListenerManager.stop(
        listenerKey,
      );
    };
  }, [
    enabled,
    listenerKey,
    start,
  ]);

  return {
    agencies,

    changes,
    changesSummary,

    isInitialLoading,

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

    start,
    stop,
    restart,
  };
}

export default useAgencyRealtime;
