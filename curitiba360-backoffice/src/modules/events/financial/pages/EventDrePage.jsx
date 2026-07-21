import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eventFinancialService } from '../services/eventFinancialService';
import EventDreStatement from '../components/EventDreStatement';
import { ArrowLeft } from 'lucide-react';

export default function EventDrePage() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await eventFinancialService.getEventFinancialOverview(eventId);
      if (res.success) setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [eventId]);

  const handleExportCSV = async () => {
    try {
      await eventFinancialService.exportDreReportCSV();
    } catch (err) {
      alert('Erro ao exportar DRE.');
    }
  };

  if (loading || !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando DRE do evento...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
      <div>
        <button
          onClick={() => navigate(`/eventos/${eventId}/financeiro`)}
          className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Centro Financeiro
        </button>
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          DRE Gerencial do Evento 📊
        </h1>
        <p className="text-xs text-slate-500 font-medium">Demonstrativo completo de receitas, retenções tributárias e margem de lucro.</p>
      </div>

      <EventDreStatement dre={data.dreGerencial || []} onExportCSV={handleExportCSV} />
    </div>
  );
}
