import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eventService } from '../services/eventService';
import EventPublicationChecklist from '../components/EventPublicationChecklist';
import EventStatusBadge from '../components/EventStatusBadge';
import { ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function EventPublicationPage() {
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

  const handlePublish = async () => {
    try {
      await eventService.updateEventStatus(eventId, 'Publicado');
      alert('🎉 Evento publicado com sucesso!');
      navigate(`/eventos/${eventId}`);
    } catch (err) {
      alert('Erro ao publicar evento.');
    }
  };

  if (loading || !eventData) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando checklist de publicação...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
      <div>
        <button
          onClick={() => navigate(`/eventos/${eventId}`)}
          className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Detalhes do Evento
        </button>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold text-slate-900">Publicação & Trava de Segurança — {eventData.nome}</h1>
          <EventStatusBadge status={eventData.status} />
        </div>
        <p className="text-xs text-slate-500 font-medium mt-1">
          Validação automatizada de regras antes da liberação de vendas ao público.
        </p>
      </div>

      <EventPublicationChecklist
        checklist={eventData.publicationChecklist || {}}
        onPublish={handlePublish}
      />
    </div>
  );
}
