import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getObservabilityRepository,
  createIncidentRepository,
  OBSERVABILITY_CHANGED_EVENT,
} from "../repositories/observabilityRepository";

export function useObservabilityDashboard() {
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
        const result =
          await getObservabilityRepository();

        setData(result);
      } catch (requestError) {
        setError(
          requestError.message ||
            "Não foi possível carregar a observabilidade."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    function handleChange(event) {
      setData(event.detail);
    }

    window.addEventListener(
      OBSERVABILITY_CHANGED_EVENT,
      handleChange
    );

    return () =>
      window.removeEventListener(
        OBSERVABILITY_CHANGED_EVENT,
        handleChange
      );
  }, []);

  const createIncident = async (title, description, severity) => {
    await createIncidentRepository({ title, description, severity, status: "detected" });
    await load();
  };

  return {
    summary: data?.summary || null,
    services: data?.services || [],
    incidents: data?.incidents || [],
    alerts: data?.alerts || [],
    loading,
    error,
    createIncident,
    reload: load,
  };
}
export default useObservabilityDashboard;
