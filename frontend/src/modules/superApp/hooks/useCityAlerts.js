import { useState, useEffect } from "react";
import { getSuperAppData } from "../repositories/superAppRepository";

export function useCityAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSuperAppData().then(data => {
      setAlerts(data.alerts || []);
      setLoading(false);
    });
  }, []);

  return { alerts, loading };
}
