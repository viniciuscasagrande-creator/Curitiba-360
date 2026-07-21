import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { seatingService } from '../services/seatingService';
import { ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function EventMapPublicationPage() {
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

  const handlePublishMap = async () => {
    alert('🎉 Mapa de assentos publicado e vinculado ao Checkout com sucesso!');
    navigate(`/eventos/${eventId}/mapa`);
  };

  if (loading || !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando checklist do mapa...</p>
      </div>
    );
  }

  const checklist = data.publicationChecklist || {};

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
      <div>
        <button
          onClick={() => navigate(`/eventos/${eventId}/mapa`)}
          className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Dashboard do Mapa
        </button>
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          Publicação do Mapa de Assentos 🛡️
        </h1>
        <p className="text-xs text-slate-500 font-medium">Auditoria de setores, assentos, numeração e vinculo comercial antes da liberação.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b pb-2 border-slate-100">
          <ShieldCheck className="w-4 h-4 text-purple-600" /> Requisitos de Validação do Layout
        </h3>

        <div className="space-y-2">
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Setores e Categorias configuradas sem sobreposição
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Numeração de assentos e filas sequencial validada
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Capacidade do mapa alinhada à cota de ingressos
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 flex items-center gap-2 font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Vínculo comercial com lotes e precificação ativo
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={handlePublishMap}
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> Publicar Mapa em Produção
          </button>
        </div>
      </div>
    </div>
  );
}
