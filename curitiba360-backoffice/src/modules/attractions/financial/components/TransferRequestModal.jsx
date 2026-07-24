import React, { useState } from 'react';
import { X, DollarSign, Check, AlertCircle, ShieldAlert, ArrowRight, Building } from 'lucide-react';

export function TransferRequestModal({ availableAmount = 10000.0, attractionName = 'Parque Jaime Lerner', onClose, onRequestSuccess }) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const numericAmount = Number(amount || 0);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!amount || numericAmount <= 0) {
      setError('Informe um valor válido maior que R$ 0,00.');
      return;
    }

    if (numericAmount > availableAmount) {
      setError(`O valor solicitado não pode ultrapassar o saldo disponível de R$ ${availableAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}.`);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        onRequestSuccess?.(numericAmount);
        onClose();
      }, 1500);
    }, 800);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-xs text-left animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-white/50 bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-black text-slate-950">Solicitar Repasse de Saldo</h2>
            <p className="text-xs text-slate-500 mt-0.5">{attractionName}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition"
          >
            <X size={18} />
          </button>
        </header>

        {success ? (
          <div className="p-8 text-center space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <Check size={28} />
            </div>
            <h3 className="text-base font-black text-slate-900">Solicitação Enviada!</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Sua solicitação de repasse no valor de <strong>R$ {numericAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> foi registrada e enviada para análise financeira.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Box Saldo Disponível */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 block">Saldo Liberado para Repasse</span>
                <strong className="text-2xl font-black text-emerald-950">
                  R$ {availableAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </strong>
              </div>
              <DollarSign size={28} className="text-emerald-600 opacity-60" />
            </div>

            {/* Input Valor */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">Valor do Repasse (R$) *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400">R$</span>
                <input
                  type="number"
                  step="0.01"
                  max={availableAmount}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0,00"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-sm font-extrabold text-slate-900 outline-none focus:border-emerald-500"
                />
              </div>
              {error && <span className="mt-1 text-[11px] font-bold text-rose-500 block">{error}</span>}
            </div>

            {/* Regras e Requisitos */}
            <div className="space-y-2 text-[11px] text-slate-500 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                <ShieldAlert size={14} className="text-amber-500" />
                Validação automática de requisitos:
              </div>
              <ul className="list-disc pl-5 space-y-1 font-medium">
                <li>Dados bancários ativos e cadastrados</li>
                <li>Contrato vigente e sem bloqueios judiciais</li>
                <li>Cumprimento do prazo mínimo de carência</li>
              </ul>
            </div>

            {/* Botões */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-11 rounded-2xl border border-slate-200 text-xs font-black text-slate-600 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-2xl bg-emerald-600 text-xs font-black text-white hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20 disabled:opacity-50"
              >
                {isSubmitting ? 'Processando...' : 'Solicitar Repasse'}
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default TransferRequestModal;
