import { useState, useEffect, useCallback } from "react";
import { qualityService } from "../services/qualityService";

export function useQualityDashboard() {
  const [summary, setSummary] = useState(null);
  const [releases, setReleases] = useState([]);
  const [testPlans, setTestPlans] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [performance, setPerformance] = useState(null);
  const [accessibility, setAccessibility] = useState(null);
  const [security, setSecurity] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [
      sumRes,
      relRes,
      tpRes,
      tcRes,
      bugsRes,
      perfRes,
      accRes,
      secRes
    ] = await Promise.all([
      qualityService.getSummary(),
      qualityService.getReleases(),
      qualityService.getTestPlans(),
      qualityService.getTestCases(),
      qualityService.getBugs(),
      qualityService.getPerformanceMetrics(),
      qualityService.getAccessibilityScan(),
      qualityService.getSecurityScan()
    ]);

    if (sumRes.success) setSummary(sumRes.data);
    if (relRes.success) setReleases(relRes.data);
    if (tpRes.success) setTestPlans(tpRes.data);
    if (tcRes.success) setTestCases(tcRes.data);
    if (bugsRes.success) setBugs(bugsRes.data);
    if (perfRes.success) setPerformance(perfRes.data);
    if (accRes.success) setAccessibility(accRes.data);
    if (secRes.success) setSecurity(secRes.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const approveRelease = async (releaseId) => {
    const res = await qualityService.approveRelease(releaseId);
    if (res.success) {
      setReleases(res.data);
      const sumRes = await qualityService.getSummary();
      if (sumRes.success) setSummary(sumRes.data);
    }
  };

  const createBug = async (bug) => {
    const res = await qualityService.createBug(bug);
    if (res.success) {
      setBugs(res.data);
      const sumRes = await qualityService.getSummary();
      if (sumRes.success) setSummary(sumRes.data);
    }
  };

  const updateBugStatus = async (bugId, status) => {
    const res = await qualityService.updateBugStatus(bugId, status);
    if (res.success) {
      setBugs(res.data);
    }
  };

  return {
    summary,
    releases,
    testPlans,
    testCases,
    bugs,
    performance,
    accessibility,
    security,
    loading,
    approveRelease,
    createBug,
    updateBugStatus,
    reload: loadData
  };
}
