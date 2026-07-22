import { useState, useEffect, useCallback } from "react";
import { getCRMRepository, CRM_CHANGED_EVENT } from "../repositories/crmRepository";

export function useCustomers() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setData(await getCRMRepository());
    } catch (e) {
      setError(e.message || "Erro ao carregar dados do CRM.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    function handleChange(e) {
      setData(e.detail);
    }
    window.addEventListener(CRM_CHANGED_EVENT, handleChange);
    return () => window.removeEventListener(CRM_CHANGED_EVENT, handleChange);
  }, []);

  return {
    kpis: data?.kpis || null,
    customers: data?.customers || [],
    tickets: data?.tickets || [],
    loading,
    error,
    reload: load
  };
}
export default useCustomers;
