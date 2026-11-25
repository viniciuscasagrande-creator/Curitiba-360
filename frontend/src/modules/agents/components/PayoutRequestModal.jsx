import React, { useState } from 'react';
import { Send, X, AlertCircle, DollarSign } from 'lucide-react';

export default function PayoutRequestModal({ isOpen, onClose, saldoDisponivel = 0, chavePix = '', onRequestPayout }) {
  const [valor, setValor] = useState(saldoDisponivel);
  const [errorMsg, setErrorMsg] = useState(null);
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg(null);

    const val = Number(valor);
    if (!val || val <= 0) {
      setErrorMsg('Informe um valor de resgate válido.');
      return;
    }
    if (val > saldoDisponivel) {
      setErrorMsg('Valor solicitado excede o saldo disponível.');
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      onRequestPayout(val);
      setProcessing(false);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 text-xs">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-slate-200 space-y-4 animate-fade-in text-slate-800">
        <div className="flex items-center justify-between border-b pb-3 border-slate-100">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Send className="w-4 h-4 text-emerald-600" /> Resgate PIX de Comissão
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/60 space-y-1">
            <span className="text-[10px] font-bold text-emerald-800 uppercase">Comissão Disponível para Resgate</span>
            <div className="text-xl font-extrabold text-emerald-700">
              R$ {saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-[10px] text-emerald-600">Transferência PIX direta na chave cadastrada.</p>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Valor do Resgate (R$)</label>
            <input
              type="number"
              step="100"
              max={saldoDisponivel}
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-emerald-700 text-sm"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Chave PIX Cadastrada</label>
            <input
              type="text"
              readOnly
              value={chavePix}
              className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg font-mono text-slate-600 font-semibold cursor-not-allowed"
            />
          </div>

          {errorMsg && (
            <div className="p-2.5 bg-red-50 text-red-700 border border-red-200 rounded-lg font-semibold text-[11px]">
              {errorMsg}
            </div>
          )}

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
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{processing ? 'Transferindo...' : 'Confirmar Resgate PIX'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
