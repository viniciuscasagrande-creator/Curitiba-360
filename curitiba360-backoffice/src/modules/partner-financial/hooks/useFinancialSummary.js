import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  FINANCIAL_CHANGED_EVENT,
  getFinancialRepository,
} from "../repositories/partnerFinancialRepository";

export function useFinancialSummary() {
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
          await getFinancialRepository()
        );
      } catch (requestError) {
        setError(
          requestError.message ||
            "Não foi possível carregar o financeiro."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    function handleChange(
      event
    ) {
      setData(event.detail);
    }

    window.addEventListener(
      FINANCIAL_CHANGED_EVENT,
      handleChange
    );

    return () =>
      window.removeEventListener(
        FINANCIAL_CHANGED_EVENT,
        handleChange
      );
  }, []);

  return {
    data,
    account: data?.account || null,
    transactions:
      data?.transactions || [],
    receivables:
      data?.receivables || [],
    payouts:
      data?.payouts || [],
    loading,
    error,
    reload: load,
  };
}
export default useFinancialSummary;
