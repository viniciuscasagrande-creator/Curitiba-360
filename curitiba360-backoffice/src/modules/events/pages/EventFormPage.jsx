import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../services/eventService';
import { Calendar, ArrowLeft, CheckCircle2, Plus } from 'lucide-react';

export default function EventFormPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    categoria: 'Passeios & Tours',
    organizador: '',
    venue: '',
    capacidadeTotal: 200,
    precoBase: 120.00,
    dataInicio: '2026-08-10',
    descricao: '',
    imagemUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop'
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await eventService.createEvent(form);
      if (res.success) {
        navigate(`/eventos/${res.data.id}`);
      }
    } catch (err) {
      alert('Erro ao cadastrar evento.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
      <div>
        <button
          onClick={() => navigate('/eventos')}
          className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Lista de Eventos
        </button>
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          Cadastro Inteligente de Evento 🎟️
        </h1>
        <p className="text-xs text-slate-500 font-medium">Preencha os dados do evento para habilitar a gestão de lotes e bilheteria.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Nome do Evento / Atração</label>
          <input
            type="text"
            required
            placeholder="Ex: Festival de Jazz no Batel"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Categoria</label>
            <select
              value={form.categoria}
              onChange={(e) => setForm({ ...form, categoria: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
            >
              <option value="Passeios & Tours">Passeios & Tours</option>
              <option value="Gastronomia & Eventos">Gastronomia & Eventos</option>
              <option value="Festivais">Festivais</option>
              <option value="Teatro & Shows">Teatro & Shows</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Organizador / Produtora</label>
            <input
              type="text"
              required
              placeholder="Ex: Curitiba Cultural Ltda"
              value={form.organizador}
              onChange={(e) => setForm({ ...form, organizador: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Localização / Venue</label>
          <input
            type="text"
            required
            placeholder="Ex: Ópera de Arame ou Pedreira Paulo Leminski"
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Capacidade Total</label>
            <input
              type="number"
              required
              value={form.capacidadeTotal}
              onChange={(e) => setForm({ ...form, capacidadeTotal: parseInt(e.target.value, 10) || 0 })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Preço Inicial (R$)</label>
            <input
              type="number"
              required
              value={form.precoBase}
              onChange={(e) => setForm({ ...form, precoBase: parseFloat(e.target.value) || 0 })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono text-emerald-700"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Data Prevista</label>
            <input
              type="date"
              required
              value={form.dataInicio}
              onChange={(e) => setForm({ ...form, dataInicio: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">URL da Imagem de Capa</label>
          <input
            type="text"
            value={form.imagemUrl}
            onChange={(e) => setForm({ ...form, imagemUrl: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-600"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Descrição Comercial do Evento</label>
          <textarea
            rows={3}
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            placeholder="Descreva as atrações e diferenciais do evento..."
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/eventos')}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> Save & Criar Evento
          </button>
        </div>
      </form>
    </div>
  );
}
