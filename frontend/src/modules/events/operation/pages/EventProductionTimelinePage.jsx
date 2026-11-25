import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eventOperationService } from '../services/eventOperationService';
import ProductionTimeline from '../components/ProductionTimeline';
import VendorListPanel from '../components/VendorListPanel';
import { ArrowLeft, Clock } from 'lucide-react';

export default function EventProductionTimelinePage() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await eventOperationService.getOperationOverview(eventId);
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

  if (loading || !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando cronograma e fornecedores...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
      <div>
        <button
          onClick={() => navigate(`/eventos/${eventId}/operacao`)}
          className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Centro de Comando
        </button>
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          Cronograma de Produção & Fornecedores 🕒
        </h1>
        <p className="text-xs text-slate-500 font-medium">Linha do tempo de montagem, passagem de som e serviços contratados.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductionTimeline timeline={data.cronogramaTimeline || []} />
        <VendorListPanel fornecedores={data.fornecedores || []} />
      </div>
    </div>
  );
}
