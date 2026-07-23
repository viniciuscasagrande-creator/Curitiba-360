import { useState, useEffect, useCallback } from 'react';
import { EventService } from '../services/eventService';

export function useEvents(initialFilters = {}) {
  const [events, setEvents] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    cidade: 'todas',
    data: '',
    categoria: 'todas',
    precoMax: '',
    gratuito: false,
    acessivel: false,
    ordenacao: 'data',
    ...initialFilters
  });

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await EventService.listEvents(filters);
      setEvents(response.data);
      setMetrics(response.metrics);
    } catch (err) {
      console.error('Erro ao buscar eventos:', err);
      setError(err.message || 'Erro ao carregar lista de eventos.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      cidade: 'todas',
      data: '',
      categoria: 'todas',
      precoMax: '',
      gratuito: false,
      acessivel: false,
      ordenacao: 'data'
    });
  };

  return {
    events,
    metrics,
    loading,
    error,
    filters,
    updateFilter,
    resetFilters,
    refetch: fetchEvents
  };
}
