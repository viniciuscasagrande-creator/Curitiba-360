import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import {
  useAgencyEnterpriseRealtime,
} from '../hooks/useAgencyEnterpriseRealtime';

const AgencyRealtimeContext =
  createContext(null);

export function AgencyRealtimeProvider({
  children,
}) {
  const [enabled, setEnabled] =
    useState(true);

  const realtime =
    useAgencyEnterpriseRealtime({
      enabled,
      pageSize: 100,
    });

  const value =
    useMemo(
      () => ({
        ...realtime,

        enabled,

        enable() {
          setEnabled(true);
        },

        disable() {
          setEnabled(false);
        },

        toggle() {
          setEnabled(
            (current) =>
              !current,
          );
        },
      }),
      [
        realtime,
        enabled,
      ],
    );

  return (
    <AgencyRealtimeContext.Provider
      value={value}
    >
      {children}
    </AgencyRealtimeContext.Provider>
  );
}

export function useAgencyRealtimeContext() {
  const context =
    useContext(
      AgencyRealtimeContext,
    );

  if (!context) {
    throw new Error(
      'useAgencyRealtimeContext deve ser usado dentro de AgencyRealtimeProvider.',
    );
  }

  return context;
}

export default AgencyRealtimeProvider;
