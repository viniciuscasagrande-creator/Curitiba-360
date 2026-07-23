import React, { useState, useEffect } from 'react';
import { X, Filter, Check } from 'lucide-react';
import { conditionTypeLabels } from '../data/commercialMock';

const initialForm = {
  type: '',
  status: '',
  paymentTermDays: ''
};

export function CommercialFilterDrawer({ isOpen, onClose, onApply, filters }) {
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
              <h2 className="font-black text-slate-900">Filtrar Condições</h2>
              <p className="text-xs text-slate-500 font-medium">Refine taxas e termos comerciais.</p>
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
            <span className="mb-2 block text-xs font-bold text-slate-700">Tipo de Condição</span>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            >
              <option value="">Todos os tipos</option>
              {Object.entries(conditionTypeLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold text-slate-700">Status</span>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            >
              <option value="">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold text-slate-700">Prazo Máximo de Repasse</span>
            <select
              value={form.paymentTermDays}
              onChange={(e) => setForm({ ...form, paymentTermDays: e.target.value })}
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            >
              <option value="">Qualquer prazo</option>
              <option value="7">Até 7 dias</option>
              <option value="15">Até 15 dias</option>
              <option value="30">Até 30 dias</option>
            </select>
          </label>
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

export default CommercialFilterDrawer;
