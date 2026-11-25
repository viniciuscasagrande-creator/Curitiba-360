import React, { useState } from 'react';
import { Target, X, PlusCircle, DollarSign, Calendar } from 'lucide-react';

export default function NewOpportunityModal({ isOpen, onClose, onCreateOpportunity }) {
  const [formData, setFormData] = useState({
    clienteNome: '',
    clienteEmail: '',
    valorEstimado: 3500.00,
    eventoInteresse: 'Passeio de Trem Morretes VIP',
    probabilidade: 60,
    dataPrevisaoFechamento: '2026-08-15',
    etapa: 'lead'
  });

  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    setTimeout(() => {
      onCreateOpportunity(formData);
      setProcessing(false);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 text-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-fade-in text-slate-800">
        <div className="flex items-center justify-between border-b pb-3 border-slate-100">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-600" /> Criar Nova Oportunidade Comercial
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nome do Cliente / Empresa</label>
            <input
              type="text"
              required
              placeholder="Ex: Grupo Escolar / Empresa Tech X"
              value={formData.clienteNome}
              onChange={(e) => setFormData({ ...formData, clienteNome: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">E-mail de Contato</label>
            <input
              type="email"
              required
              placeholder="contato@empresa.com"
              value={formData.clienteEmail}
              onChange={(e) => setFormData({ ...formData, clienteEmail: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Evento de Interesse</label>
            <select
              value={formData.eventoInteresse}
              onChange={(e) => setFormData({ ...formData, eventoInteresse: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
            >
              <option value="Passeio de Trem Morretes VIP">Passeio de Trem Morretes VIP</option>
              <option value="Kit Pass Linha Turismo 4 Pessoas">Kit Pass Linha Turismo 4 Pessoas</option>
              <option value="Jantar Dançante Madalosso Batel">Jantar Dançante Madalosso Batel</option>
              <option value="Tour Cervejeiro Curitiba">Tour Cervejeiro Curitiba</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Valor Estimado (R$)</label>
              <input
                type="number"
                step="500"
                value={formData.valorEstimado}
                onChange={(e) => setFormData({ ...formData, valorEstimado: parseFloat(e.target.value) || 0 })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-emerald-700 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Previsão Fechamento</label>
              <input
                type="date"
                value={formData.dataPrevisaoFechamento}
                onChange={(e) => setFormData({ ...formData, dataPrevisaoFechamento: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={processing}
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md"
            >
              {processing ? 'Salvando...' : 'Adicionar Oportunidade'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
