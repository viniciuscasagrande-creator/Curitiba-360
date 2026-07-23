import { useState, useEffect, useCallback } from "react";
import { miniAppService } from "../services/miniAppService";

export function useMiniApps() {
  const [miniApps, setMiniApps] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMiniApps = useCallback(async () => {
    setLoading(true);
    const res = await miniAppService.getMiniApps();
    if (res.success) setMiniApps(res.data);
    setLoading(false);
  }, []);

  const installMiniApp = async (id) => {
    const res = await miniAppService.installMiniApp(id);
    return res;
  };

  useEffect(() => {
    fetchMiniApps();
  }, [fetchMiniApps]);

  return { miniApps, loading, installMiniApp, reload: fetchMiniApps };
}
