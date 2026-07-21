import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { eventService } from '../services/eventService';
import { ArrowLeft, CheckCircle2, FileText, Settings, ShieldCheck, DollarSign } from 'lucide-react';

export default function EventEditPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await eventService.getEventById(eventId);
      if (res.success) setForm(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await eventService.updateEventStatus(eventId, form.status);
      alert('Configurações salvas com sucesso!');
      navigate(`/eventos/${eventId}`);
    } catch (err) {
      alert('Erro ao atualizar configurações.');
    }
  };

  if (loading || !form) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando configurações do evento...</p>
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
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          Configurações Gerais — {form.nome} ⚙️
        </h1>
        <p className="text-xs text-slate-500 font-medium">Edição avançada de informações básicas, localização, equipe e políticas comercial.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-5">
        <div className="space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm border-b pb-2 border-slate-100 flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-600" /> 1. Informações Básicas & Código Interno
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nome do Evento</label>
              <input
                type="text"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Código Interno de Auditoria</label>
              <input
                type="text"
                value={form.codigoInterno || ''}
                onChange={(e) => setForm({ ...form, codigoInterno: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm border-b pb-2 border-slate-100 flex items-center gap-2">
            <Settings className="w-4 h-4 text-purple-600" /> 2. Produtor & Equipe Vinculada
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Organizador / Produtor</label>
              <input
                type="text"
                value={form.organizador}
                onChange={(e) => setForm({ ...form, organizador: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Gestor do Evento (Agente)</label>
              <input
                type="text"
                value={form.gestorEvento || ''}
                onChange={(e) => setForm({ ...form, gestorEvento: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm border-b pb-2 border-slate-100 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-purple-600" /> 3. Configurações Comerciais & Taxas
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Moeda</label>
              <input
                type="text"
                disabled
                value={form.moeda || 'BRL'}
                className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl font-bold font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Taxa de Serviço (%)</label>
              <input
                type="number"
                value={form.taxaServicoPct || 10}
                onChange={(e) => setForm({ ...form, taxaServicoPct: parseFloat(e.target.value) || 0 })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Limite por Comprador</label>
              <input
                type="number"
                value={form.limitePorComprador || 6}
                onChange={(e) => setForm({ ...form, limitePorComprador: parseInt(e.target.value, 10) || 1 })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(`/eventos/${eventId}`)}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> Salvar Configurações
          </button>
        </div>
      </form>
    </div>
  );
}
