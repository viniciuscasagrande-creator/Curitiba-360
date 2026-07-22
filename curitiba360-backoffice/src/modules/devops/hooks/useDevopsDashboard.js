import { useState, useEffect, useCallback } from "react";
import {
  getPipelinesRepository,
  getFeatureFlagsRepository,
  getBackupsRepository,
  triggerPipelineRepository,
  toggleFeatureFlagRepository,
  createBackupRepository,
  DEVOPS_CHANGED_EVENT
} from "../repositories/devopsRepository";

export function useDevopsDashboard() {
  const [pipelines, setPipelines] = useState([]);
  const [flags, setFlags] = useState([]);
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const pipeList = await getPipelinesRepository();
      const flagList = await getFeatureFlagsRepository();
      const backList = await getBackupsRepository();
      setPipelines(pipeList);
      setFlags(flagList);
      setBackups(backList);
    } catch (e) {
      setError("Erro ao carregar dados do painel DevOps.");
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
    window.addEventListener(DEVOPS_CHANGED_EVENT, handleChange);
    return () => window.removeEventListener(DEVOPS_CHANGED_EVENT, handleChange);
  }, [load]);

  const triggerPipeline = async (name, branch) => {
    const pipe = await triggerPipelineRepository(name, branch);
    await load();
    return pipe;
  };

  const toggleFlag = async (flagId) => {
    await toggleFeatureFlagRepository(flagId);
    await load();
  };

  const createBackup = async (name) => {
    const backup = await createBackupRepository(name);
    await load();
    return backup;
  };

  return {
    pipelines,
    flags,
    backups,
    loading,
    error,
    triggerPipeline,
    toggleFlag,
    createBackup,
    reload: load
  };
}
export default useDevopsDashboard;
