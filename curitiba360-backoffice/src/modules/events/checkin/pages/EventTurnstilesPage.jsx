import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { checkinService } from '../services/checkinService';
import AccessTurnstileGrid from '../components/AccessTurnstileGrid';
import { ArrowLeft, Activity } from 'lucide-react';

export default function EventTurnstilesPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await checkinService.getCheckinOverview(eventId);
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
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando painel de catracas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
      <div>
        <button
          onClick={() => navigate(`/eventos/${eventId}/checkin`)}
          className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Central de Check-in
        </button>
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          Painel de Catracas & Portões de Acesso ⛩️
        </h1>
        <p className="text-xs text-slate-500 font-medium">Monitoramento de fluxo de entrada em tempo real por portão.</p>
      </div>

      <AccessTurnstileGrid catracas={data.catracasPortoes || []} />
    </div>
  );
}
