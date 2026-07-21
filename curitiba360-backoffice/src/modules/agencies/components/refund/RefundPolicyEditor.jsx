import React, { useState } from 'react';
import { Sparkles, Sliders, CheckCircle2, Save } from 'lucide-react';

export default function RefundPolicyEditor({ policies = {}, onSavePolicies }) {
  const [formData, setFormData] = useState({
    limiteValorAutoAprovacao: policies.limiteValorAutoAprovacao || 100.00,
    maxDiasCompra: policies.maxDiasCompra || 7,
    exigirEventoNaoRealizado: policies.exigirEventoNaoRealizado ?? true,
    exigirSemUso: policies.exigirSemUso ?? true,
    autoAprovacaoAtiva: policies.autoAprovacaoAtiva ?? true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSavePolicies(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Motor de Regras IA & Aprovação Automática</h3>
            <p className="text-[11px] text-slate-500 font-medium">Configuração de parâmetros para liberação instantânea de reembolsos sem intervenção manual.</p>
          </div>
        </div>

        <label className="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.autoAprovacaoAtiva}
            onChange={(e) => setFormData({ ...formData, autoAprovacaoAtiva: e.target.checked })}
            className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
          />
          <span>Motor Ativo</span>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Limite Máximo para Auto-Aprovação (R$)</label>
          <input
            type="number"
            step="10"
            value={formData.limiteValorAutoAprovacao}
            onChange={(e) => setFormData({ ...formData, limiteValorAutoAprovacao: parseFloat(e.target.value) || 0 })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-purple-700"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Prazo Máximo de Compra (Dias CDC)</label>
          <input
            type="number"
            value={formData.maxDiasCompra}
            onChange={(e) => setFormData({ ...formData, maxDiasCompra: parseInt(e.target.value) || 0 })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-900"
          />
        </div>

        <div className="flex items-center pt-5">
          <label className="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.exigirEventoNaoRealizado}
              onChange={(e) => setFormData({ ...formData, exigirEventoNaoRealizado: e.target.checked })}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Exigir Evento Não Realizado</span>
          </label>
        </div>

        <div className="flex items-center pt-5">
          <label className="flex items-center gap-2 font-bold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.exigirSemUso}
              onChange={(e) => setFormData({ ...formData, exigirSemUso: e.target.checked })}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Exigir Bilhete Sem Uso no Scanner</span>
          </label>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
        <button
          type="submit"
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
        >
          <Save className="w-4 h-4" /> Salvar Configuração do Motor IA
        </button>
      </div>
    </form>
  );
}
