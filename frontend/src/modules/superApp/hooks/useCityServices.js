import { useState, useEffect, useCallback } from "react";
import { cityService } from "../services/cityService";

export function useCityServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    const res = await cityService.getServices();
    if (res.success) setServices(res.data);
    setLoading(false);
  }, []);

  const searchServices = async (query) => {
    setLoading(true);
    const res = await cityService.searchServices(query);
    if (res.success) setServices(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { services, loading, searchServices, reload: fetchServices };
}
