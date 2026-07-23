import { useState, useEffect, useCallback } from 'react';
import { tourismService } from '../services/TourismService';

export function useAttraction(attractionId) {
  const [attraction, setAttraction] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttraction = useCallback(async () => {
    if (!attractionId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await tourismService.getAttraction(attractionId);
      setAttraction(data);

      const dates = await tourismService.getAvailableDates(attractionId);
      setAvailableDates(dates);

      if (dates.length > 0) {
        const times = await tourismService.getAvailableTimes(attractionId, dates[0]);
        setAvailableTimes(times);
      }
    } catch (err) {
      console.error('Erro ao buscar atrativo:', err);
      setError(err.message || 'Atrativo não encontrado.');
    } finally {
      setLoading(false);
    }
  }, [attractionId]);

  useEffect(() => {
    fetchAttraction();
  }, [fetchAttraction]);

  return {
    attraction,
    availableDates,
    availableTimes,
    loading,
    error,
    refetch: fetchAttraction
  };
}
