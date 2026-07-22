import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getMarketingRepository,
  MARKETING_CHANGED_EVENT,
} from "../repositories/marketingRepository";

export function useMarketingDashboard() {
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
          await getMarketingRepository()
        );
      } catch (requestError) {
        setError(
          requestError.message ||
            "Não foi possível carregar o marketing."
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
      MARKETING_CHANGED_EVENT,
      handleChange
    );

    return () =>
      window.removeEventListener(
        MARKETING_CHANGED_EVENT,
        handleChange
      );
  }, []);

  return {
    summary: data?.summary || null,
    campaigns:
      data?.campaigns || [],
    coupons:
      data?.coupons || [],
    audiences:
      data?.audiences || [],
    loading,
    error,
    reload: load,
  };
}
export default useMarketingDashboard;
