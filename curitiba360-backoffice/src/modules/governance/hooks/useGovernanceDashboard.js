import { useState, useEffect, useCallback } from "react";
import { governanceService } from "../services/governanceService";

export function useGovernanceDashboard() {
  const [summary, setSummary] = useState(null);
  const [backups, setBackups] = useState([]);
  const [raci, setRaci] = useState([]);
  const [slaPolicies, setSlaPolicies] = useState([]);
  const [changes, setChanges] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
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
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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

  return {
    summary,
    backups,
    raci,
    slaPolicies,
    changes,
    loading,
    approveChange,
    createBackup,
    triggerDrpSimulation,
    reload: loadData
  };
}
