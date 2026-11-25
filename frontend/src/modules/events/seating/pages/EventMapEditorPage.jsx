import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { seatingService } from '../services/seatingService';
import { ArrowLeft, Plus, CheckCircle2, Layers } from 'lucide-react';

export default function EventMapEditorPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sectorForm, setSectorForm] = useState({ nome: '', categoria: 'VIP', cor: '#9333ea', capacidade: 50, precoPadrao: 500.00 });

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

  const handleAddSector = async (e) => {
    e.preventDefault();
    try {
      await seatingService.addSector(eventId, sectorForm);
      alert('Setor adicionado com sucesso ao mapa!');
      setSectorForm({ nome: '', categoria: 'VIP', cor: '#9333ea', capacidade: 50, precoPadrao: 500.00 });
      loadData();
    } catch (err) {
      alert('Erro ao adicionar setor.');
    }
  };

  if (loading || !data) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando editor de setores...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
      <div>
        <button
          onClick={() => navigate(`/eventos/${eventId}/mapa`)}
          className="inline-flex items-center gap-1.5 font-semibold text-slate-500 hover:text-slate-800 mb-2 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Dashboard do Mapa
        </button>
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          Editor de Setores & Preços Padrão 🎨
        </h1>
        <p className="text-xs text-slate-500 font-medium">Configuração de áreas, cores de mapa e capacidades por setor.</p>
      </div>

      <form onSubmit={handleAddSector} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b pb-2 border-slate-100">
          <Plus className="w-4 h-4 text-purple-600" /> Adicionar Novo Setor ao Mapa
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nome do Setor</label>
            <input
              type="text"
              required
              placeholder="Ex: Camarote Front Stage"
              value={sectorForm.nome}
              onChange={(e) => setSectorForm({ ...sectorForm, nome: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Categoria do Setor</label>
            <select
              value={sectorForm.categoria}
              onChange={(e) => setSectorForm({ ...sectorForm, categoria: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800"
            >
              <option value="VIP">VIP / Premium</option>
              <option value="Regular">Regular / Pista</option>
              <option value="PCD">Área PCD</option>
              <option value="Mesa">Mesa / Lounge</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Capacidade (Lugares)</label>
            <input
              type="number"
              required
              value={sectorForm.capacidade}
              onChange={(e) => setSectorForm({ ...sectorForm, capacidade: parseInt(e.target.value, 10) || 0 })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Preço Padrão (R$)</label>
            <input
              type="number"
              required
              value={sectorForm.precoPadrao}
              onChange={(e) => setSectorForm({ ...sectorForm, precoPadrao: parseFloat(e.target.value) || 0 })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold font-mono text-emerald-700"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Cor do Setor</label>
            <input
              type="color"
              value={sectorForm.cor}
              onChange={(e) => setSectorForm({ ...sectorForm, cor: e.target.value })}
              className="w-full h-10 p-1 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> Salvar Setor no Mapa
          </button>
        </div>
      </form>

      {/* LISTA DE SETORES EXISTENTES */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b pb-2 border-slate-100">
          <Layers className="w-4 h-4 text-purple-600" /> Setores Cadastrados no Evento
        </h3>

        <div className="space-y-3">
          {(data.setores || []).map((sec) => (
            <div key={sec.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border border-slate-300" style={{ backgroundColor: sec.cor }} />
                <div>
                  <div className="font-extrabold text-slate-900 text-xs">{sec.nome}</div>
                  <div className="text-[10px] text-slate-500">Capacidade: {sec.capacidade} assentos</div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-extrabold text-emerald-700 text-xs">R$ {sec.precoPadrao?.toFixed(2)}</div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">{sec.categoria}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
