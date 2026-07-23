import { useState, useEffect, useCallback } from "react";
import { esgService } from "../services/esgService";

export function useEsgDashboard() {
  const [summary, setSummary] = useState(null);
  const [carbonEmissions, setCarbonEmissions] = useState([]);
  const [energyDetails, setEnergyDetails] = useState(null);
  const [waterDetails, setWaterDetails] = useState(null);
  const [wasteDetails, setWasteDetails] = useState(null);
  const [socialDetails, setSocialDetails] = useState(null);
  const [economicDetails, setEconomicDetails] = useState(null);
  const [projects, setProjects] = useState([]);
  const [goals, setGoals] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const res = await esgService.getDashboard();
    if (res.success && res.data) {
      const { summary, carbonEmissions, energyDetails, waterDetails, wasteDetails, socialDetails, economicDetails, projects, goals, suppliers } = res.data;
      setSummary(summary || null);
      setCarbonEmissions(carbonEmissions || []);
      setEnergyDetails(energyDetails || null);
      setWaterDetails(waterDetails || null);
      setWasteDetails(wasteDetails || null);
      setSocialDetails(socialDetails || null);
      setEconomicDetails(economicDetails || null);
      setProjects(projects || []);
      setGoals(goals || []);
      setSuppliers(suppliers || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveProject = async (project) => {
    const res = await esgService.saveProject(project);
    if (res.success && res.data) {
      setProjects(res.data.projects);
    }
  };

  const saveGoal = async (goal) => {
    const res = await esgService.saveGoal(goal);
    if (res.success && res.data) {
      setGoals(res.data.goals);
    }
  };

  const saveSupplier = async (supplier) => {
    const res = await esgService.saveSupplier(supplier);
    if (res.success && res.data) {
      setSuppliers(res.data.suppliers);
    }
  };

  return {
    summary,
    carbonEmissions,
    energyDetails,
    waterDetails,
    wasteDetails,
    socialDetails,
    economicDetails,
    projects,
    goals,
    suppliers,
    loading,
    saveProject,
    saveGoal,
    saveSupplier,
    reload: loadData
  };
}
