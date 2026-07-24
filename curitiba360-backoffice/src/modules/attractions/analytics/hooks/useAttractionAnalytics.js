import { useState, useEffect, useCallback } from 'react';
import { attractionAnalyticsService } from '../services/attractionAnalyticsService';

export function useAttractionAnalytics(attractionId, initialPeriod = '7d') {
  const [period, setPeriod] = useState(initialPeriod);
  const [customRange, setCustomRange] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await attractionAnalyticsService.fetchAnalytics(attractionId, period, customRange);
      setData(res);
    } catch (err) {
      console.error('Erro ao carregar Analytics da atração:', err);
      setError('Falha ao carregar dados analíticos.');
    } finally {
      setLoading(false);
    }
  }, [attractionId, period, customRange]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    period,
    setPeriod,
    customRange,
    setCustomRange,
    data,
    loading,
    error,
    refresh: loadData
  };
}

export default useAttractionAnalytics;
