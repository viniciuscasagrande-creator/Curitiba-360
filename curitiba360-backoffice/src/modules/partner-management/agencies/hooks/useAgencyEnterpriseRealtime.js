import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  useAgencyRealtime,
} from './useAgencyRealtime';

import {
  agencyBroadcastService,
} from '../services/agencyBroadcastService';

import {
  createRealtimeBackoff,
} from '../utils/realtimeBackoff';

import {
  applyAgencyConflictResolution,
} from '../utils/agencyConflictResolver';

export function useAgencyEnterpriseRealtime({
  enabled = true,
  filters = {},
  sorting = {
    field: 'createdAt',
    direction: 'desc',
  },
  pageSize = 100,
  onInvalidate,
} = {}) {
  const [agencies, setAgencies] =
    useState([]);

  const [
    crossTabConnected,
    setCrossTabConnected,
  ] = useState(false);

  const [
    reconnectAttempt,
    setReconnectAttempt,
  ] = useState(0);

  const [
    reconnectScheduled,
    setReconnectScheduled,
  ] = useState(false);

  const backoffRef =
    useRef(null);

  if (!backoffRef.current) {
    backoffRef.current =
      createRealtimeBackoff({
        initialDelay: 1000,
        maximumDelay: 30000,
        multiplier: 2,
        jitter: 0.2,
        maximumAttempts: 8,
      });
  }

  const stableFilters =
    useMemo(
      () => filters,
      [JSON.stringify(filters)],
    );

  const stableSorting =
    useMemo(
      () => sorting,
      [JSON.stringify(sorting)],
    );

  const realtime =
    useAgencyRealtime({
      enabled,

      filters:
        stableFilters,

      sorting:
        stableSorting,

      pageSize,

      onAdded(change) {
        setAgencies(
          (current) =>
            applyAgencyConflictResolution(
              current,
              change.agency,
            ),
        );
      },

      onModified(change) {
        setAgencies(
          (current) =>
            applyAgencyConflictResolution(
              current,
              change.agency,
            ),
        );
      },

      onRemoved(change) {
        setAgencies(
          (current) =>
            current.filter(
              (agency) =>
                agency.id !==
                change.agency.id,
            ),
        );
      },

      onChanges(
        changes,
        payload,
      ) {
        if (
          payload?.data
        ) {
          setAgencies(
            payload.data,
          );
        }
      },
    });

  const scheduleReconnect =
    useCallback(() => {
      const result =
        backoffRef.current.schedule(
          () => {
            setReconnectScheduled(
              false,
            );

            realtime.restart();
          },
        );

      setReconnectAttempt(
        result.attempt,
      );

      setReconnectScheduled(
        result.scheduled,
      );

      return result;
    }, [realtime.restart]);

  const reconnectNow =
    useCallback(() => {
      backoffRef.current.reset();

      setReconnectAttempt(0);
      setReconnectScheduled(false);

      realtime.restart();
    }, [realtime.restart]);

  useEffect(() => {
    if (
      realtime.isConnected
    ) {
      backoffRef.current.reset();

      setReconnectAttempt(0);
      setReconnectScheduled(false);

      agencyBroadcastService.publish(
        agencyBroadcastService
          .MESSAGE_TYPES
          .REALTIME_CONNECTED,
        {
          connectedAt:
            new Date().toISOString(),
        },
      );
    }
  }, [
    realtime.isConnected,
  ]);

  useEffect(() => {
    if (
      realtime.realtimeStatus ===
        'error' &&
      enabled
    ) {
      scheduleReconnect();
    }
  }, [
    enabled,
    realtime.realtimeStatus,
    scheduleReconnect,
  ]);

  useEffect(() => {
    function handleOnline() {
      reconnectNow();
    }

    function handleOffline() {
      backoffRef.current.cancel();

      setReconnectScheduled(
        false,
      );
    }

    window.addEventListener(
      'online',
      handleOnline,
    );

    window.addEventListener(
      'offline',
      handleOffline,
    );

    return () => {
      window.removeEventListener(
        'online',
        handleOnline,
      );

      window.removeEventListener(
        'offline',
        handleOffline,
      );
    };
  }, [reconnectNow]);

  useEffect(() => {
    if (
      !agencyBroadcastService
        .isSupported()
    ) {
      setCrossTabConnected(false);
      return undefined;
    }

    setCrossTabConnected(true);

    const unsubscribe =
      agencyBroadcastService.subscribe(
        (message) => {
          const {
            type,
            payload,
          } = message;

          if (
            type ===
              agencyBroadcastService
                .MESSAGE_TYPES
                .CREATED ||
            type ===
              agencyBroadcastService
                .MESSAGE_TYPES
                .UPDATED
          ) {
            if (payload?.agency) {
              setAgencies(
                (current) =>
                  applyAgencyConflictResolution(
                    current,
                    payload.agency,
                  ),
              );
            }
          }

          if (
            type ===
            agencyBroadcastService
              .MESSAGE_TYPES
              .REMOVED
          ) {
            setAgencies(
              (current) =>
                current.filter(
                  (agency) =>
                    agency.id !==
                    payload.agencyId,
                ),
            );
          }

          if (
            type ===
            agencyBroadcastService
              .MESSAGE_TYPES
              .STATUS_CHANGED
          ) {
            setAgencies(
              (current) =>
                current.map(
                  (agency) =>
                    agency.id ===
                    payload.agencyId
                      ? {
                          ...agency,
                          status:
                            payload.status,
                        }
                      : agency,
                ),
            );
          }

          if (
            type ===
            agencyBroadcastService
              .MESSAGE_TYPES
              .INVALIDATE
          ) {
            onInvalidate?.(
              payload,
            );

            realtime.restart();
          }
        },
      );

    return unsubscribe;
  }, [
    onInvalidate,
    realtime.restart,
  ]);

  useEffect(
    () => () => {
      backoffRef.current.cancel();
    },
    [],
  );

  return {
    ...realtime,

    agencies,

    crossTabConnected,

    reconnectAttempt,
    reconnectScheduled,

    reconnectNow,
    scheduleReconnect,
  };
}

export default useAgencyEnterpriseRealtime;
