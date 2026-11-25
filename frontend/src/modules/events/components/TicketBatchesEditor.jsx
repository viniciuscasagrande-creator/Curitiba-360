import React, { useState } from 'react';
import { Ticket, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export default function TicketBatchesEditor({ lotes = [], onSaveBatches }) {
  const [batchList, setBatchList] = useState(lotes);

  const handleAddBatch = () => {
    const newBatch = {
      id: `LOT-${Date.now()}`,
      nome: `Lote ${batchList.length + 1}`,
      preco: 100.00,
      qtdTotal: 100,
      qtdVendida: 0,
      status: 'ativo'
    };
    setBatchList([...batchList, newBatch]);
  };

  const handleRemoveBatch = (id) => {
    setBatchList(batchList.filter((b) => b.id !== id));
  };

  const handleChange = (id, field, value) => {
    setBatchList(
      batchList.map((b) => (b.id === id ? { ...b, [field]: value } : b))
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Ticket className="w-4 h-4 text-purple-600" /> Gestão de Lotes de Ingressos
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Configuração de preços, cotas e status de vendas por lote.</p>
        </div>

        <button
          onClick={handleAddBatch}
          className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-[10px] transition-all flex items-center gap-1 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Adicionar Lote
        </button>
      </div>

      <div className="space-y-3">
        {batchList.map((b, idx) => (
          <div key={b.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Nome do Lote</label>
              <input
                type="text"
                value={b.nome}
                onChange={(e) => handleChange(b.id, 'nome', e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Preço (R$)</label>
              <input
                type="number"
                value={b.preco}
                onChange={(e) => handleChange(b.id, 'preco', parseFloat(e.target.value) || 0)}
                className="w-full p-2 bg-white border border-slate-200 rounded font-mono font-bold text-emerald-700"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Cota Total</label>
              <input
                type="number"
                value={b.qtdTotal}
                onChange={(e) => handleChange(b.id, 'qtdTotal', parseInt(e.target.value, 10) || 0)}
                className="w-full p-2 bg-white border border-slate-200 rounded font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Status do Lote</label>
              <select
                value={b.status}
                onChange={(e) => handleChange(b.id, 'status', e.target.value)}
                className="w-full p-2 bg-white border border-slate-200 rounded font-bold text-slate-800"
              >
                <option value="ativo">Ativo / À Venda</option>
                <option value="pausado">Pausado</option>
                <option value="esgotado">Esgotado</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 sm:pt-0">
              <button
                onClick={() => handleRemoveBatch(b.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                title="Excluir Lote"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 flex items-center justify-end">
        <button
          onClick={() => onSaveBatches && onSaveBatches(batchList)}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Salvar Alterações nos Lotes
        </button>
      </div>
    </div>
  );
}
