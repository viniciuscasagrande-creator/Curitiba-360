import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { commercialExecutiveService } from '../../services/commercialExecutiveService';
import ExecutiveKpiGrid from '../../components/executive/ExecutiveKpiGrid';
import ForecastCard from '../../components/executive/ForecastCard';
import ExecutiveCharts from '../../components/executive/ExecutiveCharts';
import TopRankingsBoard from '../../components/executive/TopRankingsBoard';
import ExecutiveInsights from '../../components/executive/ExecutiveInsights';
import { BarChart2, ArrowLeft, Download, RefreshCw, CheckCircle2, Sparkles, Filter } from 'lucide-react';

export default function CommercialExecutivePage() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [periodFilter, setPeriodFilter] = useState('mes'); // dia, semana, mes, ano
  const [toastMessage, setToastMessage] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await commercialExecutiveService.getCommercialExecutiveOverview();
      if (res.success) setData(res.data);
    } catch (err) {
      showToast('Erro ao carregar Painel Executivo Comercial', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [periodFilter]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleExportCSV = async () => {
    try {
      await commercialExecutiveService.exportExecutiveReportCSV();
      showToast('📊 Relatório Executivo Comercial 360 em CSV exportado com sucesso!');
    } catch (err) {
      showToast('Erro ao exportar relatório CSV', 'error');
    }
  };

  if (loading && !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando Painel Executivo Comercial 360...</p>
      </div>
    );
  }

  const kpis = data?.kpis || {};
  const evolucaoData = data?.evolucaoReceitaMeses || [];
  const funilData = data?.funilExecutivo || [];
  const topAgencias = data?.topAgencias || [];
  const topRegioes = data?.topRegioes || [];
  const insights = data?.executiveInsights || [];

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl border flex items-center gap-3 font-semibold animate-bounce ${
          toastMessage.type === 'error' ? 'bg-red-900 text-white border-red-700' : 'bg-slate-900 text-white border-slate-700'
        }`}>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* CABEÇALHO DA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <button
            onClick={() => navigate('/agentes/dashboard')}
            className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Dashboard do Agente
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px]">
              MOD-06 • ETAPA 08 (CONCLUSÃO DO MÓDULO)
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Painel Executivo Comercial 360° 🏛️
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Consolidação geral de Vendas, CRM, Pipeline, Forecast IA, Gamificação, Omnichannel e Benchmarking.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={periodFilter}
            onChange={(e) => setPeriodFilter(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
          >
            <option value="mes">Visão Mensal (Julho)</option>
            <option value="semana">Esta Semana</option>
            <option value="ano">Exercício 2026</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Exportar Relatório CSV
          </button>

          <button
            onClick={loadData}
            title="Atualizar Dados Executivos"
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPIS EXECUTIVOS BOARDROOM */}
      <ExecutiveKpiGrid kpis={kpis} />

      {/* CARD DE FORECAST IA */}
      <ForecastCard kpis={kpis} />

      {/* COPILOTO IA EXECUTIVO */}
      <ExecutiveInsights insights={insights} />

      {/* GRÁFICOS TEMPORAIS DE RECEITA E FUNIL GLOBAL */}
      <ExecutiveCharts evolucaoData={evolucaoData} funilData={funilData} />

      {/* TOP AGÊNCIAS E REGIONAL BENCHMARKING */}
      <TopRankingsBoard topAgencias={topAgencias} topRegioes={topRegioes} />
    </div>
  );
}
