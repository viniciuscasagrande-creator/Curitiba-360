import { useState, useEffect, useCallback } from "react";
import { reservationService } from "../services/reservationService";

export function useReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    const res = await reservationService.getReservations();
    if (res.success) setReservations(res.data);
    setLoading(false);
  }, []);

  const createReservation = async (reservationData) => {
    const res = await reservationService.createReservation(reservationData);
    if (res.success) await fetchReservations();
    return res;
  };

  const cancelReservation = async (id) => {
    const res = await reservationService.cancelReservation(id);
    if (res.success) await fetchReservations();
    return res;
  };

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  return { reservations, loading, createReservation, cancelReservation, reload: fetchReservations };
}
