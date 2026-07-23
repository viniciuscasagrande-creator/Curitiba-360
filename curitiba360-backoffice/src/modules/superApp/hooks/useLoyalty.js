import { useState, useEffect, useCallback } from "react";
import { loyaltyService } from "../services/loyaltyService";

export function useLoyalty() {
  const [loyalty, setLoyalty] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLoyalty = useCallback(async () => {
    setLoading(true);
    const res = await loyaltyService.getLoyaltySummary();
    if (res.success) setLoyalty(res.data);
    setLoading(false);
  }, []);

  const addPoints = async (points) => {
    const res = await loyaltyService.addPoints(points);
    if (res.success) await fetchLoyalty();
    return res;
  };

  useEffect(() => {
    fetchLoyalty();
  }, [fetchLoyalty]);

  return { loyalty, loading, addPoints, reload: fetchLoyalty };
}
