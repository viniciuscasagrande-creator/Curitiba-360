import { useState, useEffect, useCallback } from "react";
import { mobilityService } from "../services/mobilityService";

export function useMobility() {
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLines = useCallback(async () => {
    setLoading(true);
    const res = await mobilityService.getLines();
    if (res.success) setLines(res.data);
    setLoading(false);
  }, []);

  const calculateRoute = async (origin, destination) => {
    return await mobilityService.calculateRoute(origin, destination);
  };

  useEffect(() => {
    fetchLines();
  }, [fetchLines]);

  return { lines, loading, calculateRoute, reload: fetchLines };
}
