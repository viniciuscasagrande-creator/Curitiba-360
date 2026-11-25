import { useState, useEffect, useCallback } from 'react';
import { TicketService } from '../services/TicketService';

export function useDigitalTicket(ticketId) {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationResult, setValidationResult] = useState(null);

  const fetchTicket = useCallback(async () => {
    if (!ticketId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await TicketService.getTicketById(ticketId);
      setTicket(res.ticket);
    } catch (err) {
      console.error('Erro ao carregar ingresso:', err);
      setError(err.message || 'Ingresso não encontrado.');
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  const validateTicket = async () => {
    if (!ticketId) return;
    try {
      const res = await TicketService.validateTicket(ticketId);
      setValidationResult(res);
      if (res.valid && res.ticket) {
        setTicket(res.ticket);
      }
    } catch (err) {
      setValidationResult({ valid: false, message: 'Erro ao validar ingresso.' });
    }
  };

  return {
    ticket,
    loading,
    error,
    validationResult,
    validateTicket,
    refetch: fetchTicket
  };
}
