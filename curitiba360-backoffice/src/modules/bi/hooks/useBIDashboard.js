import { useCallback, useEffect, useState } from "react";
import { biService } from "../services/biService";

export function useBIDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await biService.getBiOverview();
      if (result.success) {
        setData(result.data);
      } else {
        setError("Não foi possível carregar os indicadores.");
      }
    } catch (requestError) {
      setError(
        requestError.message || "Não foi possível carregar os indicadores."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    data,
    loading,
    error,
    reload: load
  };
}
