import { useCallback, useEffect, useState } from "react";
import { getGovernanceDashboard } from "../repositories/governanceRepository";
import { governanceService } from "../services/governanceService";
import { decisionIntelligenceService } from "../services/decisionIntelligenceService";

export function useGovernanceDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Legacy dashboard states
  const [summary, setSummary] = useState(null);
  const [backups, setBackups] = useState([]);
  const [raci, setRaci] = useState([]);
  const [slaPolicies, setSlaPolicies] = useState([]);
  const [changes, setChanges] = useState([]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getGovernanceDashboard();
      setData(result);
      
      // Load legacy structure
      const [sumRes, bakRes, raciRes, slaRes, chgRes] = await Promise.all([
        governanceService.getSummary(),
        governanceService.getBackups(),
        governanceService.getRaci(),
        governanceService.getSlaPolicies(),
        governanceService.getChanges()
      ]);

      if (sumRes.success) setSummary(sumRes.data);
      if (bakRes.success) setBackups(bakRes.data);
      if (raciRes.success) setRaci(raciRes.data);
      if (slaRes.success) setSlaPolicies(slaRes.data);
      if (chgRes.success) setChanges(chgRes.data);
    } catch (requestError) {
      setError(
        requestError.message ||
        "Não foi possível carregar os dados de governança."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const approveChange = async (id) => {
    const res = await governanceService.approveChange(id);
    if (res.success) {
      setChanges(res.data);
      const sumRes = await governanceService.getSummary();
      if (sumRes.success) setSummary(sumRes.data);
    }
  };

  const createBackup = async (databaseName) => {
    const res = await governanceService.createBackup(databaseName);
    if (res.success) {
      setBackups(res.data);
      const sumRes = await governanceService.getSummary();
      if (sumRes.success) setSummary(sumRes.data);
    }
  };

  const triggerDrpSimulation = async () => {
    const res = await governanceService.triggerDrpSimulation();
    if (res.success) setSummary(res.data);
  };

  const addResolution = async (resolution) => {
    const res = await decisionIntelligenceService.createResolution(resolution);
    if (res.success && res.data) {
      setData(res.data);
    }
  };

  const updateOkr = async (okrId, progress) => {
    const res = await decisionIntelligenceService.updateOkr(okrId, progress);
    if (res.success && res.data) {
      setData(res.data);
    }
  };

  return {
    data,
    loading,
    error,
    reload: load,

    // Legacy values
    summary,
    backups,
    raci,
    slaPolicies,
    changes,
    approveChange,
    createBackup,
    triggerDrpSimulation,

    // WF-048 actions
    addResolution,
    updateOkr
  };
}
