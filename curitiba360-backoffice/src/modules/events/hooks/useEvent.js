import { useState, useEffect, useCallback } from 'react';
import { EventService } from '../services/EventService';

export function useEvent(eventId) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchEvent = useCallback(async () => {
    if (!eventId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await EventService.getEventById(eventId);
      setEvent(response.data);
      const favResponse = await EventService.getFavorites();
      setIsFavorite(favResponse.favorites.includes(eventId));
    } catch (err) {
      console.error('Erro ao buscar detalhes do evento:', err);
      setError(err.message || 'Evento não encontrado.');
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const toggleFavorite = async () => {
    if (!eventId) return;
    try {
      const res = await EventService.toggleFavorite(eventId);
      setIsFavorite(res.isFavorite);
    } catch (err) {
      console.error('Erro ao alternar favorito:', err);
    }
  };

  return {
    event,
    loading,
    error,
    isFavorite,
    toggleFavorite,
    refetch: fetchEvent
  };
}
