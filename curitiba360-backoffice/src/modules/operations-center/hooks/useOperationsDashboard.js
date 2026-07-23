import { useState, useEffect, useCallback } from "react";
import { operationsService } from "../services/operationsService";

export function useOperationsDashboard() {
  const [summary, setSummary] = useState(null);
  const [events, setEvents] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [queues, setQueues] = useState([]);
  const [devices, setDevices] = useState([]);
  const [teams, setTeams] = useState([]);
  const [contingencyPlans, setContingencyPlans] = useState([]);
  const [services, setServices] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const res = await operationsService.getDashboard();
    if (res.success && res.data) {
      const { summary, events, incidents, alerts, locations, queues, devices, teams, contingencyPlans, services, reports } = res.data;
      setSummary(summary || null);
      setEvents(events || []);
      setIncidents(incidents || []);
      setAlerts(alerts || []);
      setLocations(locations || []);
      setQueues(queues || []);
      setDevices(devices || []);
      setTeams(teams || []);
      setContingencyPlans(contingencyPlans || []);
      setServices(services || []);
      setReports(reports || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveIncident = async (incident) => {
    const res = await operationsService.saveIncident(incident);
    if (res.success && res.data) {
      setIncidents(res.data.incidents);
      setSummary(res.data.summary);
    }
  };

  const saveContingencyPlan = async (plan) => {
    const res = await operationsService.saveContingencyPlan(plan);
    if (res.success && res.data) {
      setContingencyPlans(res.data.contingencyPlans);
    }
  };

  const saveDevice = async (device) => {
    const res = await operationsService.saveDevice(device);
    if (res.success && res.data) {
      setDevices(res.data.devices);
      setSummary(res.data.summary);
    }
  };

  return {
    summary,
    events,
    incidents,
    alerts,
    locations,
    queues,
    devices,
    teams,
    contingencyPlans,
    services,
    reports,
    loading,
    saveIncident,
    saveContingencyPlan,
    saveDevice,
    reload: loadData
  };
}
