import { useState, useEffect, useCallback } from "react";
import { digitalTwinService } from "../services/digitalTwinService";

export function useDigitalTwin() {
  const [summary, setSummary] = useState(null);
  const [entities, setEntities] = useState([]);
  const [iotDevices, setIotDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const res = await digitalTwinService.getDashboard();
    if (res.success && res.data) {
      setSummary(res.data.summary);
      setEntities(res.data.entities || []);
      setIotDevices(res.data.iotDevices || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateDevice = async (deviceId, status) => {
    const res = await digitalTwinService.updateIoTDevice(deviceId, status);
    if (res.success && res.data) {
      setIotDevices(res.data.iotDevices || []);
    }
  };

  const runSimulation = async (type, params) => {
    const res = await digitalTwinService.triggerSimulation(type, params);
    if (res.success && res.data) {
      setSummary(res.data.summary);
    }
  };

  return {
    summary,
    entities,
    iotDevices,
    loading,
    updateDevice,
    runSimulation,
    reload: loadData
  };
}
