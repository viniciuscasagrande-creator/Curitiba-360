import { useState, useEffect } from "react";
import { governmentService } from "../services/governmentService";

export function useGovernmentDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await governmentService.fetchDashboardData();
      setData(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createProgram = async (program) => {
    await governmentService.addProgram(program);
    await loadData();
  };

  const createProject = async (project) => {
    await governmentService.addProject(project);
    await loadData();
  };

  const createOuvidoria = async (ticket) => {
    await governmentService.addOuvidoria(ticket);
    await loadData();
  };

  return {
    data,
    loading,
    createProgram,
    createProject,
    createOuvidoria,
    refresh: loadData
  };
}
