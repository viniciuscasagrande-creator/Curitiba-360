import { useState, useEffect, useCallback } from "react";
import { getReportsData } from "../repositories/reportRepository";

export function useDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getReportsData();
      setData(res);
    } catch (e) {
      setError(e.message || "Erro ao carregar relatórios.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}
export default useDashboard;
