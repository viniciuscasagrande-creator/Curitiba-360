import { useState, useEffect, useCallback } from "react";
import { parkingService } from "../services/parkingService";

export function useParking() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchZones = useCallback(async () => {
    setLoading(true);
    const res = await parkingService.getParkingZones();
    if (res.success) setZones(res.data);
    setLoading(false);
  }, []);

  const activateEstaR = async (zoneId, vehiclePlate, durationMinutes) => {
    return await parkingService.activateEstaR(zoneId, vehiclePlate, durationMinutes);
  };

  useEffect(() => {
    fetchZones();
  }, [fetchZones]);

  return { zones, loading, activateEstaR, reload: fetchZones };
}
