import { useState, useEffect, useCallback } from "react";
import { supportService } from "../services/supportService";

export function useSupportDashboard() {
  const [summary, setSummary] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [slas, setSlas] = useState([]);
  const [healthScores, setHealthScores] = useState([]);
  const [articles, setArticles] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const [
      sumRes,
      tickRes,
      slaRes,
      healthRes,
      artRes,
      incRes
    ] = await Promise.all([
      supportService.getSummary(),
      supportService.getTickets(),
      supportService.getSlas(),
      supportService.getHealthScores(),
      supportService.getArticles(),
      supportService.getIncidents()
    ]);

    if (sumRes.success) setSummary(sumRes.data);
    if (tickRes.success) setTickets(tickRes.data);
    if (slaRes.success) setSlas(slaRes.data);
    if (healthRes.success) setHealthScores(healthRes.data);
    if (artRes.success) setArticles(artRes.data);
    if (incRes.success) setIncidents(incRes.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const createTicket = async (ticket) => {
    const res = await supportService.createTicket(ticket);
    if (res.success) {
      setTickets(res.data);
      const sumRes = await supportService.getSummary();
      if (sumRes.success) setSummary(sumRes.data);
    }
  };

  const updateTicketStatus = async (id, status) => {
    const res = await supportService.updateTicketStatus(id, status);
    if (res.success) {
      setTickets(res.data);
    }
  };

  const saveArticle = async (article) => {
    const res = await supportService.saveArticle(article);
    if (res.success) {
      setArticles(res.data);
    }
  };

  const saveIncident = async (incident) => {
    const res = await supportService.saveIncident(incident);
    if (res.success) {
      setIncidents(res.data);
      const sumRes = await supportService.getSummary();
      if (sumRes.success) setSummary(sumRes.data);
    }
  };

  return {
    summary,
    tickets,
    slas,
    healthScores,
    articles,
    incidents,
    loading,
    createTicket,
    updateTicketStatus,
    saveArticle,
    saveIncident,
    reload: loadData
  };
}
