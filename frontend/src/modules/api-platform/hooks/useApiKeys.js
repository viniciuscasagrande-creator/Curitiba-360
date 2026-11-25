import { useCallback, useEffect, useState } from "react";
import { getApiRepository, createApiKeyRepository, API_CHANGED_EVENT } from "../repositories/apiRepository";

export function useApiKeys() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setData(await getApiRepository());
    } catch (e) {
      setError(e.message || "Erro ao obter repositório de API.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    function handleChanged(e) {
      setData(e.detail);
    }
    window.addEventListener(API_CHANGED_EVENT, handleChanged);
    return () => window.removeEventListener(API_CHANGED_EVENT, handleChanged);
  }, []);

  const createKey = async (name, permissions) => {
    await createApiKeyRepository({ name, permissions });
    await load();
  };

  return {
    metrics: data?.metrics || null,
    apiKeys: data?.apiKeys || [],
    webhooks: data?.webhooks || [],
    marketplaceApps: data?.marketplaceApps || [],
    loading,
    error,
    createKey,
    reload: load
  };
}
export default useApiKeys;
