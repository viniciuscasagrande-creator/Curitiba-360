import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventsPerformanceService } from '../services/eventsPerformanceService';
import EventsPerformanceKpiGrid from '../components/EventsPerformanceKpiGrid';
import TopEventsRankingTable from '../components/TopEventsRankingTable';
import EventsExecutiveInsights from '../components/EventsExecutiveInsights';
import { Award, RefreshCw, Calendar, ArrowLeft } from 'lucide-react';

export default function EventsPerformance360Page() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await eventsPerformanceService.getPerformance360Overview();
      if (res.success) setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading || !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando Centro de Performance 360 de Eventos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
      {/* CABEÇALHO DA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <button
            onClick={() => navigate('/eventos')}
            className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Catálogo de Eventos
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px]">
              MOD-07 • ETAPA 08
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Centro de Performance 360 - Eventos 🏆
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Painel executivo consolidador da operação, faturamento global e otimização por Inteligência Artificial.
          </p>
        </div>

        <button
          onClick={loadData}
          title="Atualizar Performance"
          className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* KPIS DE PERFORMANCE GLOBAL */}
      <EventsPerformanceKpiGrid kpis={data.kpis || {}} />

      {/* EXECUTIVE COPILOT INSIGHTS */}
      <EventsExecutiveInsights insights={data.executiveInsights || []} />

      {/* RANKING DOS EVENTOS */}
      <TopEventsRankingTable ranking={data.rankingEventos || []} />
    </div>
  );
}
