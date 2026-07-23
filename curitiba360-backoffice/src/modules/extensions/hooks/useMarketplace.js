import { useState, useEffect, useCallback } from "react";
import { marketplaceService } from "../services/marketplaceService";

export function useMarketplace() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await marketplaceService.getDashboard();
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.error);
      }
    } catch (requestError) {
      setError(
        requestError.message || "Não foi possível carregar o marketplace."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const installExtension = async (id) => {
    setLoading(true);
    const res = await marketplaceService.installExtension(id);
    if (res.success) {
      setData(res.data);
    }
    setLoading(false);
  };

  const uninstallExtension = async (id) => {
    setLoading(true);
    const res = await marketplaceService.uninstallExtension(id);
    if (res.success) {
      setData(res.data);
    }
    setLoading(false);
  };

  const updateConfig = async (id, config) => {
    setLoading(true);
    const res = await marketplaceService.updateConfig(id, config);
    if (res.success) {
      const fresh = await marketplaceService.getDashboard();
      if (fresh.success) setData(fresh.data);
    }
    setLoading(false);
  };

  const publishExtension = async (ext) => {
    setLoading(true);
    const res = await marketplaceService.publishExtension(ext);
    if (res.success) {
      setData(res.data);
    }
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    reload: load,
    installExtension,
    uninstallExtension,
    updateConfig,
    publishExtension
  };
}
export default useMarketplace;
