import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { seatingService } from '../services/seatingService';
import SeatingKpiGrid from '../components/SeatingKpiGrid';
import SeatMapCanvas from '../components/SeatMapCanvas';
import IaLayoutAssistant from '../components/IaLayoutAssistant';
import { ArrowLeft, Edit3, ShieldCheck, RefreshCw } from 'lucide-react';

export default function EventMapDashboardPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await seatingService.getSeatingOverview(eventId);
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

  const handleSeatClick = async (seatId) => {
    const seat = data.assentos.find((s) => s.id === seatId);
    if (!seat) return;

    const nextStatus = seat.status === 'disponivel' ? 'bloqueado' : seat.status === 'bloqueado' ? 'reservado' : 'disponivel';
    try {
      await seatingService.updateSeatStatus(seatId, nextStatus);
      loadData();
    } catch (err) {
      alert('Erro ao alterar assento.');
    }
  };

  if (loading || !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando mapa de assentos e setores...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
      {/* CABEÇALHO DA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <button
            onClick={() => navigate(`/eventos/${eventId}`)}
            className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Detalhes do Evento
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px]">
              MOD-07 • ETAPA 03
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Mapa de Setores & Seat Management 🪑
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Gestão visual de assentos marcados, camarotes, mesas e áreas PCD.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/eventos/${eventId}/mapa/editor`)}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4" /> Editor Visual do Mapa
          </button>
          <button
            onClick={() => navigate(`/eventos/${eventId}/mapa/publicacao`)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" /> Publicar Mapa
          </button>
          <button
            onClick={loadData}
            title="Atualizar Mapa"
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPIS DE SEATING */}
      <SeatingKpiGrid data={data} />

      {/* IA LAYOUT ASSISTANT */}
      <IaLayoutAssistant suggestions={data.iaSuggestions || []} />

      {/* CANVAS DE ASSENTOS */}
      <SeatMapCanvas assentos={data.assentos || []} onSeatClick={handleSeatClick} />
    </div>
  );
}
