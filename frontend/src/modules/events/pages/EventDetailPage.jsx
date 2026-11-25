import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eventService } from '../services/eventService';
import EventStatusBadge from '../components/EventStatusBadge';
import CapacityIndicator from '../components/CapacityIndicator';
import TicketBatchesEditor from '../components/TicketBatchesEditor';
import { ArrowLeft, Ticket, Sparkles, MapPin, CheckCircle2, DollarSign, Calendar } from 'lucide-react';

export default function EventDetailPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await eventService.getEventById(eventId);
      if (res.success) setEventData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [eventId]);

  const handleStatusChange = async (newStatus) => {
    try {
      await eventService.updateEventStatus(eventId, newStatus);
      loadData();
    } catch (err) {
      alert('Erro ao alterar status.');
    }
  };

  const handleSaveBatches = async (updatedBatches) => {
    try {
      await eventService.saveBatches(eventId, updatedBatches);
      alert('Lotes atualizados com sucesso!');
      loadData();
    } catch (err) {
      alert('Erro ao salvar lotes.');
    }
  };

  if (loading || !eventData) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando detalhes do evento 360°...</p>
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
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Lista de Eventos
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900">{eventData.nome}</h1>
            <EventStatusBadge status={eventData.status} />
          </div>
          <p className="text-xs text-slate-500 font-medium flex items-center gap-2 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {eventData.venue} • {eventData.organizador}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={eventData.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="py-2 px-3 bg-purple-50 border border-purple-200 rounded-xl font-bold text-purple-900"
          >
            <option value="rascunho">Status: Rascunho</option>
            <option value="em_analise">Status: Em Análise</option>
            <option value="publicado">Status: Publicado / Ativo</option>
            <option value="esgotado">Status: Esgotado</option>
            <option value="encerrado">Status: Encerrado</option>
          </select>
        </div>
      </div>

      {/* METRICAS DE CAPACIDADE E PREVISÃO IA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm">Controle de Capacidade & Receita</h3>
          <div className="text-2xl font-extrabold text-emerald-700">
            R$ {eventData.receitaAcumulada?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <CapacityIndicator vendidos={eventData.ingressosVendidos} capacidade={eventData.capacidadeTotal} />
        </div>

        {eventData.iaPrediction && (
          <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-xl p-5 shadow-xl space-y-2 border border-purple-800">
            <div className="flex items-center gap-2 text-purple-300 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-purple-300 animate-pulse" /> Simulador IA de Demanda Executiva
            </div>
            <div className="text-lg font-extrabold text-white">{eventData.iaPrediction.demandaNivel}</div>
            <p className="text-[11px] text-purple-200 font-medium">{eventData.iaPrediction.previsaoOcupacaoFinal}</p>
            <p className="text-[10px] text-purple-300 border-t border-purple-800 pt-2">{eventData.iaPrediction.sugestaoPreco}</p>
          </div>
        )}
      </div>

      {/* EDITOR DE LOTES */}
      <TicketBatchesEditor lotes={eventData.lotes || []} onSaveBatches={handleSaveBatches} />
    </div>
  );
}
