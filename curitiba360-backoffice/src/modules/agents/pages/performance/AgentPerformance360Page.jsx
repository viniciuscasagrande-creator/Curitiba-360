import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { agentPerformance360Service } from '../../services/agentPerformance360Service';
import PerformanceKpiGrid from '../../components/performance/PerformanceKpiGrid';
import PerformanceTrendsChart from '../../components/performance/PerformanceTrendsChart';
import BenchmarkingCard from '../../components/performance/BenchmarkingCard';
import PerformanceAlerts from '../../components/performance/PerformanceAlerts';
import { BarChart2, ArrowLeft, Download, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';

export default function AgentPerformance360Page() {
  const navigate = useNavigate();
  const { agentId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await agentPerformance360Service.getPerformance360Overview(agentId || 'AGT-2001');
      if (res.success) setData(res.data);
    } catch (err) {
      showToast('Erro ao carregar Centro de Performance 360', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [agentId]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleExportCSV = async () => {
    try {
      await agentPerformance360Service.exportPerformanceReportCSV();
      showToast('📊 Relatório Executivo em CSV baixado com sucesso!');
    } catch (err) {
      showToast('Erro ao exportar relatório CSV', 'error');
    }
  };

  if (loading && !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando Centro de Performance 360...</p>
      </div>
    );
  }

  const kpis = data?.kpis || {};
  const trendsData = data?.evolucao6Meses || [];
  const benchmarking = data?.benchmarking || {};
  const alerts = data?.alertasPerformance || [];

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
              MOD-06 • ETAPA 08 (CONCLUSÃO)
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Centro de Performance 360° do Agente 📊
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Painel executivo consolidado com vendas, CRM, metas, ranking, IA comercial e benchmarking de mercado.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Exportar CSV
          </button>
          <button
            onClick={loadData}
            title="Atualizar Dados 360"
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPIS CONSOLIDADOS */}
      <PerformanceKpiGrid kpis={kpis} />

      {/* ALERTAS EXECUTIVOS DE PERFORMANCE */}
      <PerformanceAlerts alerts={alerts} />

      {/* EVOLUÇÃO 6 MESES E BENCHMARKING */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceTrendsChart trendsData={trendsData} />
        <BenchmarkingCard benchmarking={benchmarking} />
      </div>
    </div>
  );
}
