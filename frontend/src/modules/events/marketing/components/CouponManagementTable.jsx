import React, { useState } from 'react';
import { Tag, Plus, CheckCircle2, Lock } from 'lucide-react';

export default function CouponManagementTable({ cupons = [], onAddCoupon, onToggleStatus }) {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ codigo: '', tipo: 'porcentagem', valor: 10, limiteUso: 100, validade: '2026-12-31' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onAddCoupon) onAddCoupon(form);
    setShowModal(false);
    setForm({ codigo: '', tipo: 'porcentagem', valor: 10, limiteUso: 100, validade: '2026-12-31' });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
            <Tag className="w-4 h-4 text-purple-600" /> Cupons de Desconto do Evento
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">Gestão de códigos promocionais, limites de uso e validade.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-[10px] transition-all flex items-center gap-1 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" /> Criar Novo Cupom
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
              <th className="p-3">Código do Cupom</th>
              <th className="p-3">Desconto</th>
              <th className="p-3 text-right">Usos / Limite</th>
              <th className="p-3">Validade</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {cupons.map((cup) => (
              <tr key={cup.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 font-mono font-extrabold text-purple-900 bg-purple-50/50 rounded">{cup.codigo}</td>
                <td className="p-3 font-bold text-emerald-700">
                  {cup.tipo === 'porcentagem' ? `${cup.valor}% OFF` : `R$ ${cup.valor?.toFixed(2)} OFF`}
                </td>
                <td className="p-3 text-right font-mono font-bold">
                  {cup.usosRealizados} / {cup.limiteUso}
                </td>
                <td className="p-3 font-mono text-[10px] text-slate-500">{cup.validade}</td>
                <td className="p-3 text-center">
                  <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                    cup.status === 'ativo' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {cup.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Criar Novo Cupom Promocional</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Código do Cupom</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: PROMO360"
                  value={form.codigo}
                  onChange={(e) => setForm({ ...form, codigo: e.target.value.toUpperCase() })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tipo</label>
                  <select
                    value={form.tipo}
                    onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold"
                  >
                    <option value="porcentagem">Porcentagem (%)</option>
                    <option value="fixo">Valor Fixo (R$)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Valor do Desconto</label>
                  <input
                    type="number"
                    required
                    value={form.valor}
                    onChange={(e) => setForm({ ...form, valor: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Limite Máximo de Usos</label>
                <input
                  type="number"
                  required
                  value={form.limiteUso}
                  onChange={(e) => setForm({ ...form, limiteUso: parseInt(e.target.value, 10) || 0 })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1.5 bg-slate-100 rounded text-slate-700">Cancelar</button>
                <button type="submit" className="px-4 py-1.5 bg-purple-600 text-white font-bold rounded shadow-sm">Salvar Cupom</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
