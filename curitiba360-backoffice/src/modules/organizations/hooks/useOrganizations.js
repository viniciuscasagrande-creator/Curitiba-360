import { useState, useEffect, useCallback } from "react";
import {
  getOrganizationsRepository,
  getActiveOrgIdRepository,
  setActiveOrgIdRepository,
  createOrganizationRepository,
  updateBrandingRepository,
  addDomainRepository,
  updatePlanRepository,
  ORGANIZATIONS_CHANGED_EVENT
} from "../repositories/organizationRepository";

export function useOrganizations() {
  const [organizations, setOrganizations] = useState([]);
  const [activeOrgId, setActiveOrgId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await getOrganizationsRepository();
      const currentActiveId = await getActiveOrgIdRepository();
      setOrganizations(list);
      setActiveOrgId(currentActiveId);
    } catch (e) {
      setError("Não foi possível carregar as organizações.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    function handleChange() {
      load();
    }
    window.addEventListener(ORGANIZATIONS_CHANGED_EVENT, handleChange);
    return () => window.removeEventListener(ORGANIZATIONS_CHANGED_EVENT, handleChange);
  }, [load]);

  const switchOrganization = async (id) => {
    await setActiveOrgIdRepository(id);
    setActiveOrgId(id);
  };

  const createOrganization = async (org) => {
    const newOrg = await createOrganizationRepository(org);
    await load();
    return newOrg;
  };

  const updateBranding = async (orgId, branding) => {
    await updateBrandingRepository(orgId, branding);
    await load();
  };

  const addDomain = async (orgId, hostname) => {
    await addDomainRepository(orgId, hostname);
    await load();
  };

  const upgradePlan = async (orgId, plan) => {
    await updatePlanRepository(orgId, plan);
    await load();
  };

  const activeOrg = organizations.find(o => o.id === activeOrgId) || null;

  return {
    organizations,
    activeOrg,
    activeOrgId,
    loading,
    error,
    switchOrganization,
    createOrganization,
    updateBranding,
    addDomain,
    upgradePlan,
    reload: load
  };
}
export default useOrganizations;
