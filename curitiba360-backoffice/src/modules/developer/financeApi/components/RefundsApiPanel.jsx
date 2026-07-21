import React, { useState } from 'react';
import { RefreshCw, Plus, CheckCircle2 } from 'lucide-react';

export default function RefundsApiPanel({ refunds = [], onRequestRefund }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ comprador: 'Lucas Henrique Spínola', valorEstorno: 240.00, motivo: 'Desistência no prazo legal de 7 dias' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onRequestRefund) onRequestRefund(form);
    setShowModal(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-2xs space-y-3 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <h3 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5 text-purple-600" /> API de Reembolsos & Estornos (`/v1/refunds`)
        </h3>
        <button
          onClick={() => setShowModal(true)}
          className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded text-[10px] shadow-xs flex items-center gap-1"
        >
          <Plus className="w-3 h-3" /> Solicitar Reembolso POST
        </button>
      </div>

      <div className="space-y-2">
        {refunds.map((ref) => (
          <div key={ref.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
            <div className="flex items-center justify-between font-extrabold text-slate-900 text-xs">
              <span className="font-mono text-purple-900">{ref.id} • {ref.comprador}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px] uppercase">
                {ref.status}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">Motivo: {ref.motivo}</div>
            <div className="text-[10px] font-mono text-purple-700 font-bold">Valor Estornado: R$ {ref.valorEstorno.toFixed(2)}</div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 text-slate-800">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-purple-600" /> Solicitar Reembolso no Gateway
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Comprador</label>
                <input
                  type="text"
                  required
                  value={form.comprador}
                  onChange={(e) => setForm({ ...form, comprador: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Valor do Estorno (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={form.valorEstorno}
                  onChange={(e) => setForm({ ...form, valorEstorno: parseFloat(e.target.value) })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs font-bold text-purple-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Motivo do Cancelamento</label>
                <input
                  type="text"
                  required
                  value={form.motivo}
                  onChange={(e) => setForm({ ...form, motivo: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1.5 bg-slate-100 rounded text-slate-700">Cancelar</button>
                <button type="submit" className="px-4 py-1.5 bg-purple-600 text-white font-bold rounded shadow-sm">
                  Processar Estorno
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
