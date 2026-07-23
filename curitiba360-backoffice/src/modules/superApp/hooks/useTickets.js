import { useState, useEffect, useCallback } from "react";
import { ticketService } from "../services/ticketService";

export function useTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    const res = await ticketService.getTickets();
    if (res.success) setTickets(res.data);
    setLoading(false);
  }, []);

  const transferTicket = async (ticketId, recipientName) => {
    const res = await ticketService.transferTicket(ticketId, recipientName);
    if (res.success) await fetchTickets();
    return res;
  };

  const rotateQrToken = async (ticketId) => {
    const res = await ticketService.rotateQrToken(ticketId);
    if (res.success) await fetchTickets();
    return res;
  };

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return { tickets, loading, transferTicket, rotateQrToken, reload: fetchTickets };
}
