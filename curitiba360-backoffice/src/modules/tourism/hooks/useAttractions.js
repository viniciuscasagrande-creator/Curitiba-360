import { useState, useEffect, useCallback } from 'react';
import { tourismService } from '../services/TourismService';

export function useAttractions(initialFilters = {}) {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    categoryId: 'todas',
    free: false,
    openNow: false,
    accessibility: false,
    reservationRequired: false,
    ...initialFilters
  });

  const fetchAttractions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tourismService.getAttractions(filters);
      setAttractions(data);
    } catch (err) {
      console.error('Erro ao buscar atrativos:', err);
      setError(err.message || 'Erro ao carregar atrativos turísticos.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAttractions();
  }, [fetchAttractions]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      categoryId: 'todas',
      free: false,
      openNow: false,
      accessibility: false,
      reservationRequired: false
    });
  };

  return {
    attractions,
    loading,
    error,
    filters,
    updateFilter,
    resetFilters,
    refetch: fetchAttractions
  };
}
