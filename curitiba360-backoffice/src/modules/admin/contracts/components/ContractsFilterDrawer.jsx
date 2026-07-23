import React, { useState, useEffect } from 'react';
import { X, Filter, Check, RotateCcw } from 'lucide-react';
import { partnerTypeLabels, statusLabels } from '../data/contractsMock';

const initialForm = {
  partnerType: '',
  status: '',
  expiringSoon: false,
  pendingSignatureOnly: false
};

export function ContractsFilterDrawer({
  isOpen,
  onClose,
  onApply,
  filters
}) {
  const [form, setForm] = useState(filters || initialForm);

  useEffect(() => {
    setForm(filters || initialForm);
  }, [filters, isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-xs transition-opacity"
      />

      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl text-left">
        <header className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Filter size={19} />
            </span>
            <div>
              <h2 className="font-black text-slate-900">Filtrar Contratos</h2>
              <p className="text-xs text-slate-500 font-medium">Refine a lista por parceiro, tipo e vencimento.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          <label className="block">
            <span className="mb-2 block text-xs font-bold text-slate-700">Tipo de Contratante</span>
            <select
              value={form.partnerType}
              onChange={(e) => setForm({ ...form, partnerType: e.target.value })}
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            >
              <option value="">Todos os tipos</option>
              {Object.entries(partnerTypeLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold text-slate-700">Status do Contrato</span>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            >
              <option value="">Todos os status</option>
              {Object.entries(statusLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 cursor-pointer">
              <input
                type="checkbox"
                checked={form.expiringSoon}
                onChange={(e) => setForm({ ...form, expiringSoon: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 accent-emerald-600"
              />
              <span>
                <strong className="block text-sm text-slate-800">Próximos do vencimento (30 dias)</strong>
                <span className="text-xs text-slate-500 font-medium">Exibe contratos com expiração próxima.</span>
              </span>
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 cursor-pointer">
              <input
                type="checkbox"
                checked={form.pendingSignatureOnly}
                onChange={(e) => setForm({ ...form, pendingSignatureOnly: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 accent-emerald-600"
              />
              <span>
                <strong className="block text-sm text-slate-800">Pendentes de assinatura via DocuSign</strong>
                <span className="text-xs text-slate-500 font-medium">Contratos rascunho ou aguardando envelope.</span>
              </span>
            </label>
          </div>
        </div>

        <footer className="flex gap-3 border-t border-slate-200 p-6">
          <button
            type="button"
            onClick={() => setForm(initialForm)}
            className="h-11 flex-1 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50"
          >
            Limpar
          </button>
          <button
            type="button"
            onClick={() => {
              onApply(form);
              onClose();
            }}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 text-sm font-bold text-white hover:bg-emerald-700"
          >
            <Check size={17} />
            Aplicar
          </button>
        </footer>
      </aside>
    </>
  );
}

export default ContractsFilterDrawer;
