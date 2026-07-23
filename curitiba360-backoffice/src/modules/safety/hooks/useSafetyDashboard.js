import { useState, useEffect, useCallback } from "react";
import { safetyService } from "../services/safetyService";

export function useSafetyDashboard() {
  const [summary, setSummary] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [devices, setDevices] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [risks, setRisks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const res = await safetyService.getDashboard();
    if (res.success && res.data) {
      const { summary, incidents, devices, alerts, risks } = res.data;
      setSummary(summary || null);
      setIncidents(incidents || []);
      setDevices(devices || null);
      setAlerts(alerts || []);
      setRisks(risks || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveIncident = async (incident) => {
    const res = await safetyService.saveIncident(incident);
    if (res.success && res.data) {
      setIncidents(res.data.incidents);
      setSummary(res.data.summary);
    }
  };

  const saveRisk = async (risk) => {
    const res = await safetyService.saveRisk(risk);
    if (res.success && res.data) {
      setRisks(res.data.risks);
    }
  };

  return {
    summary,
    incidents,
    devices,
    alerts,
    risks,
    loading,
    saveIncident,
    saveRisk,
    reload: loadData
  };
}
