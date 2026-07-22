import { useState, useEffect, useCallback } from "react";
import { securityService } from "../services/securityService";

export function useSecurityDashboard() {
  const [summary, setSummary] = useState(null);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [fraudAlerts, setFraudAlerts] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [consents, setConsents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [sumRes, vulnRes, fraudRes, sessRes, consRes] = await Promise.all([
      securityService.getSummary(),
      securityService.getVulnerabilities(),
      securityService.getFraudAlerts(),
      securityService.getSessions(),
      securityService.getConsents()
    ]);

    if (sumRes.success) setSummary(sumRes.data);
    if (vulnRes.success) setVulnerabilities(vulnRes.data);
    if (fraudRes.success) setFraudAlerts(fraudRes.data);
    if (sessRes.success) setSessions(sessRes.data);
    if (consRes.success) setConsents(consRes.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const terminateSession = async (id) => {
    const res = await securityService.terminateSession(id);
    if (res.success) {
      setSessions(res.data);
      // Reload summary to reflect updated session counts
      const sumRes = await securityService.getSummary();
      if (sumRes.success) setSummary(sumRes.data);
    }
  };

  const approveFraudAlert = async (id) => {
    const res = await securityService.approveFraudAlert(id);
    if (res.success) setFraudAlerts(res.data);
  };

  const blockFraudAlert = async (id) => {
    const res = await securityService.blockFraudAlert(id);
    if (res.success) setFraudAlerts(res.data);
  };

  const fixVulnerability = async (id) => {
    const res = await securityService.fixVulnerability(id);
    if (res.success) {
      setVulnerabilities(res.data);
      const sumRes = await securityService.getSummary();
      if (sumRes.success) setSummary(sumRes.data);
    }
  };

  return {
    summary,
    vulnerabilities,
    fraudAlerts,
    sessions,
    consents,
    loading,
    terminateSession,
    approveFraudAlert,
    blockFraudAlert,
    fixVulnerability,
    reload: loadData
  };
}
