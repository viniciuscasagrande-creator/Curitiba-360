import { useState, useEffect, useCallback } from "react";
import { smartCityService } from "../services/smartCityService";

export function useSmartCityDashboard() {
  const [summary, setSummary] = useState(null);
  const [sensors, setSensors] = useState([]);
  const [utilities, setUtilities] = useState(null);
  const [weather, setWeather] = useState(null);
  const [traffic, setTraffic] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const res = await smartCityService.getDashboard();
    if (res.success && res.data) {
      const { summary, sensors, utilities, weather, traffic } = res.data;
      setSummary(summary || null);
      setSensors(sensors || []);
      setUtilities(utilities || null);
      setWeather(weather || null);
      setTraffic(traffic || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateSensor = async (sensorId, status) => {
    const res = await smartCityService.updateSensor(sensorId, status);
    if (res.success && res.data) {
      setSensors(res.data.sensors);
    }
  };

  const triggerSimulation = async (type, parameters) => {
    const res = await smartCityService.runSimulation(type, parameters);
    if (res.success && res.data) {
      setSummary(res.data.summary);
    }
  };

  return {
    summary,
    sensors,
    utilities,
    weather,
    traffic,
    loading,
    updateSensor,
    triggerSimulation,
    reload: loadData
  };
}
