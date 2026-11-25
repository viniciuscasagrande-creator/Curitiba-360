import { useState, useEffect, useCallback } from "react";
import { roadmapService } from "../services/roadmapService";

export function useRoadmap() {
  const [summary, setSummary] = useState(null);
  const [objectives, setObjectives] = useState([]);
  const [initiatives, setInitiatives] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [innovationPipeline, setInnovationPipeline] = useState([]);
  const [expansionCities, setExpansionCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [
      sumRes,
      objRes,
      initRes,
      alertRes,
      scenRes,
      innRes,
      expRes
    ] = await Promise.all([
      roadmapService.getSummary(),
      roadmapService.getObjectives(),
      roadmapService.getInitiatives(),
      roadmapService.getAlerts(),
      roadmapService.getScenarios(),
      roadmapService.getInnovationPipeline(),
      roadmapService.getExpansionCities()
    ]);

    if (sumRes.success) setSummary(sumRes.data);
    if (objRes.success) setObjectives(objRes.data);
    if (initRes.success) setInitiatives(initRes.data);
    if (alertRes.success) setAlerts(alertRes.data);
    if (scenRes.success) setScenarios(scenRes.data);
    if (innRes.success) setInnovationPipeline(innRes.data);
    if (expRes.success) setExpansionCities(expRes.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const createInitiative = async (initiative) => {
    const res = await roadmapService.createInitiative(initiative);
    if (res.success) {
      setInitiatives(res.data);
      const sumRes = await roadmapService.getSummary();
      if (sumRes.success) setSummary(sumRes.data);
    }
  };

  const updateInitiativeStatus = async (id, status) => {
    const res = await roadmapService.updateInitiativeStatus(id, status);
    if (res.success) {
      setInitiatives(res.data);
    }
  };

  return {
    summary,
    objectives,
    initiatives,
    alerts,
    scenarios,
    innovationPipeline,
    expansionCities,
    loading,
    createInitiative,
    updateInitiativeStatus,
    reload: loadData
  };
}
