import { useState, useEffect, useCallback } from "react";
import { legalService } from "../services/legalService";

export function useLegalDashboard() {
  const [summary, setSummary] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [signers, setSigners] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [consents, setConsents] = useState([]);
  const [risks, setRisks] = useState([]);
  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const res = await legalService.getDashboard();
    if (res.success && res.data) {
      const { summary, contracts, templates, signers, policies, consents, risks, processes } = res.data;
      setSummary(summary || null);
      setContracts(contracts || []);
      setTemplates(templates || []);
      setSigners(signers || []);
      setPolicies(policies || []);
      setConsents(consents || []);
      setRisks(risks || []);
      setProcesses(processes || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveContract = async (contract) => {
    const res = await legalService.saveContract(contract);
    if (res.success && res.data) {
      setContracts(res.data.contracts);
      setSummary(res.data.summary);
    }
  };

  const savePolicy = async (policy) => {
    const res = await legalService.savePolicy(policy);
    if (res.success && res.data) {
      setPolicies(res.data.policies);
    }
  };

  const saveConsent = async (consent) => {
    const res = await legalService.saveConsent(consent);
    if (res.success && res.data) {
      setConsents(res.data.consents);
    }
  };

  return {
    summary,
    contracts,
    templates,
    signers,
    policies,
    consents,
    risks,
    processes,
    loading,
    saveContract,
    savePolicy,
    saveConsent,
    reload: loadData
  };
}
