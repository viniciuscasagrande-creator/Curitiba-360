import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  ADMIN_CHANGED_EVENT,
  getAdminRepository,
} from "../repositories/adminRepository";

export function useAdminDashboard() {
  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const load =
    useCallback(async () => {
      setLoading(true);
      setError("");

      try {
        setData(
          await getAdminRepository()
        );
      } catch (requestError) {
        setError(
          requestError.message ||
            "Não foi possível carregar o painel administrativo."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    function handleChanged(event) {
      setData(event.detail);
    }

    window.addEventListener(
      ADMIN_CHANGED_EVENT,
      handleChanged
    );

    return () =>
      window.removeEventListener(
        ADMIN_CHANGED_EVENT,
        handleChanged
      );
  }, []);

  return {
    summary: data?.summary || null,
    pendingPartners:
      data?.pendingPartners || [],
    pendingPayouts:
      data?.pendingPayouts || [],
    incidents:
      data?.incidents || [],
    loading,
    error,
    reload: load,
  };
}
export default useAdminDashboard;
