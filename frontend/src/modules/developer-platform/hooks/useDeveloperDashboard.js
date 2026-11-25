import { useState, useEffect, useCallback } from "react";
import { developerService } from "../services/developerService";

export function useDeveloperDashboard() {
  const [summary, setSummary] = useState(null);
  const [apps, setApps] = useState([]);
  const [apiKeys, setApiKeys] = useState([]);
  const [webhooks, setWebhooks] = useState([]);
  const [plans, setPlans] = useState([]);
  const [logs, setLogs] = useState([]);
  const [marketplaceItems, setMarketplaceItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [
      sumRes,
      appRes,
      keyRes,
      whRes,
      planRes,
      logRes,
      mpRes
    ] = await Promise.all([
      developerService.getSummary(),
      developerService.getApps(),
      developerService.getApiKeys(),
      developerService.getWebhooks(),
      developerService.getApiPlans(),
      developerService.getApiLogs(),
      developerService.getMarketplaceItems()
    ]);

    if (sumRes.success) setSummary(sumRes.data);
    if (appRes.success) setApps(appRes.data);
    if (keyRes.success) setApiKeys(keyRes.data);
    if (whRes.success) setWebhooks(whRes.data);
    if (planRes.success) setPlans(planRes.data);
    if (logRes.success) setLogs(logRes.data);
    if (mpRes.success) setMarketplaceItems(mpRes.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const createDevApp = async (app) => {
    const res = await developerService.createDevApp(app);
    if (res.success) {
      setApps(res.data);
      const sumRes = await developerService.getSummary();
      if (sumRes.success) setSummary(sumRes.data);
    }
  };

  const updateAppStatus = async (appId, status) => {
    const res = await developerService.updateAppStatus(appId, status);
    if (res.success) {
      setApps(res.data);
    }
  };

  const saveWebhook = async (webhook) => {
    const res = await developerService.saveWebhook(webhook);
    if (res.success) {
      setWebhooks(res.data);
    }
  };

  return {
    summary,
    apps,
    apiKeys,
    webhooks,
    plans,
    logs,
    marketplaceItems,
    loading,
    createDevApp,
    updateAppStatus,
    saveWebhook,
    reload: loadData
  };
}
