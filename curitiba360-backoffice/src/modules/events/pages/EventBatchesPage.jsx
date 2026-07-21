import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eventService } from '../services/eventService';
import TicketBatchesEditor from '../components/TicketBatchesEditor';
import { ArrowLeft, Ticket, CheckCircle2 } from 'lucide-react';

export default function EventBatchesPage() {
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

  const handleSaveBatches = async (updatedBatches) => {
    try {
      await eventService.saveBatches(eventId, updatedBatches);
      alert('Lotes salvos com sucesso!');
      loadData();
    } catch (err) {
      alert('Erro ao salvar lotes.');
    }
  };

  if (loading || !eventData) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando lotes do evento...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
      <div>
        <button
          onClick={() => navigate(`/eventos/${eventId}`)}
          className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Detalhes do Evento
        </button>
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          Gestão de Lotes — {eventData.nome} 🎟️
        </h1>
        <p className="text-xs text-slate-500 font-medium">Controle de cotas de ingressos, preços e fases de venda.</p>
      </div>

      <TicketBatchesEditor lotes={eventData.lotes || []} onSaveBatches={handleSaveBatches} />
    </div>
  );
}
