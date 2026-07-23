import { useCallback, useEffect, useState } from "react";
import { getSuperAppData } from "../repositories/superAppRepository";

export function useSuperAppHome() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getSuperAppData();
      setData(result);
    } catch (requestError) {
      setError(
        requestError.message || "Não foi possível carregar o Curitiba 360."
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
    reload: load,
  };
}
