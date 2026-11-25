import { useState, useEffect, useCallback } from "react";
import { workforceService } from "../services/workforceService";

export function useWorkforceDashboard() {
  const [summary, setSummary] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const res = await workforceService.getDashboard();
    if (res.success && res.data) {
      const { summary, departments, shifts, employees, candidates, alerts } = res.data;
      setSummary(summary || null);
      setDepartments(departments || []);
      setShifts(shifts || []);
      setEmployees(employees || []);
      setCandidates(candidates || []);
      setAlerts(alerts || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveEmployee = async (employee) => {
    const res = await workforceService.saveEmployee(employee);
    if (res.success && res.data) {
      setEmployees(res.data.employees);
      setSummary(res.data.summary);
    }
  };

  const saveCandidate = async (candidate) => {
    const res = await workforceService.saveCandidate(candidate);
    if (res.success && res.data) {
      setCandidates(res.data.candidates);
      setSummary(res.data.summary);
    }
  };

  return {
    summary,
    departments,
    shifts,
    employees,
    candidates,
    alerts,
    loading,
    saveEmployee,
    saveCandidate,
    reload: loadData
  };
}
