import { useState, useEffect, useCallback } from "react";
import { mobilityService } from "../services/mobilityService";

export function useMobilityDashboard() {
  const [summary, setSummary] = useState(null);
  const [trips, setTrips] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [stops, setStops] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [fleet, setFleet] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [parking, setParking] = useState([]);
  const [logisticsOrders, setLogisticsOrders] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const res = await mobilityService.getDashboard();
    if (res.success && res.data) {
      const { summary, trips, alerts, routes, stops, reservations, fleet, drivers, parking, logisticsOrders, incidents } = res.data;
      setSummary(summary || null);
      setTrips(trips || []);
      setAlerts(alerts || []);
      setRoutes(routes || []);
      setStops(stops || []);
      setReservations(reservations || []);
      setFleet(fleet || []);
      setDrivers(drivers || []);
      setParking(parking || []);
      setLogisticsOrders(logisticsOrders || []);
      setIncidents(incidents || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveRoute = async (route) => {
    const res = await mobilityService.saveRoute(route);
    if (res.success && res.data) {
      setRoutes(res.data.routes);
    }
  };

  const saveTrip = async (trip) => {
    const res = await mobilityService.saveTrip(trip);
    if (res.success && res.data) {
      setTrips(res.data.trips);
      setSummary(res.data.summary);
    }
  };

  const saveDriver = async (driver) => {
    const res = await mobilityService.saveDriver(driver);
    if (res.success && res.data) {
      setDrivers(res.data.drivers);
    }
  };

  return {
    summary,
    trips,
    alerts,
    routes,
    stops,
    reservations,
    fleet,
    drivers,
    parking,
    logisticsOrders,
    incidents,
    loading,
    saveRoute,
    saveTrip,
    saveDriver,
    reload: loadData
  };
}
