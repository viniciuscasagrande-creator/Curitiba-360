import { useCallback, useEffect, useState } from "react";
import { getPartnerDashboard } from "../repositories/partnerRepository";
import { portfolioService } from "../services/portfolioService";

export function usePartnerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getPartnerDashboard();
      setData(result);
    } catch (requestError) {
      setError(
        requestError.message ||
          "Não foi possível carregar o ecossistema de parceiros."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addIdea = async (idea) => {
    const res = await portfolioService.createIdea(idea);
    if (res.success && res.data) {
      setData(res.data);
    }
  };

  const addBusinessCase = async (bc) => {
    const res = await portfolioService.createBusinessCase(bc);
    if (res.success && res.data) {
      setData(res.data);
    }
  };

  const updateProject = async (projectId, progress) => {
    const res = await portfolioService.updateProject(projectId, progress);
    if (res.success && res.data) {
      setData(res.data);
    }
  };

  return {
    data,
    loading,
    error,
    addIdea,
    addBusinessCase,
    updateProject,
    reload: load
  };
}
