import { useState, useEffect, useCallback } from 'react';
import { reservationService } from '../services/ReservationService';

export function useReservation() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await reservationService.getUserReservations();
      setReservations(data);
    } catch (err) {
      console.error('Erro ao carregar reservas:', err);
      setError(err.message || 'Erro ao obter lista de reservas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const makeReservation = async (input) => {
    setLoading(true);
    try {
      const res = await reservationService.createReservation(input);
      setReservations((prev) => [res, ...prev]);
      return res;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelReservation = async (reservationId) => {
    try {
      await reservationService.cancelReservation(reservationId);
      setReservations((prev) =>
        prev.map((r) => (r.id === reservationId ? { ...r, status: 'cancelled' } : r))
      );
    } catch (err) {
      console.error('Erro ao cancelar reserva:', err);
    }
  };

  return {
    reservations,
    loading,
    error,
    makeReservation,
    cancelReservation,
    refetch: fetchReservations
  };
}
