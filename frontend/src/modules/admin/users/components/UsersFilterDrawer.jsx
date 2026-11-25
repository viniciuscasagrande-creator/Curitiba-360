import React, { useEffect, useState } from 'react';
import { Check, SlidersHorizontal, X } from 'lucide-react';

import {
  roleLabels,
  statusLabels
} from '../data/usersMock';

const initialFilters = {
  role: '',
  company: '',
  status: '',
  twoFactor: ''
};

export function UsersFilterDrawer({
  open,
  filters,
  companies,
  onApply,
  onClose
}) {
  const [form, setForm] = useState(filters || initialFilters);

  useEffect(() => {
    setForm(filters || initialFilters);
  }, [filters, open]);

  if (!open) {
    return null;
  }

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function clearFilters() {
    setForm(initialFilters);
  }

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Fechar filtros"
      />

      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl text-left">
        <header className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <SlidersHorizontal size={19} />
            </span>

            <div>
              <h2 className="font-black text-slate-900">
                Filtrar usuários
              </h2>

              <p className="text-xs text-slate-500">
                Refine os resultados da tabela.
              </p>
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
            <span className="mb-2 block text-xs font-bold text-slate-700">
              Perfil
            </span>

            <select
              value={form.role}
              onChange={(event) =>
                updateField('role', event.target.value)
              }
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-medium"
            >
              <option value="">Todos os perfis</option>

              {Object.entries(roleLabels).map(
                ([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                )
              )}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold text-slate-700">
              Empresa ou parceiro
            </span>

            <select
              value={form.company}
              onChange={(event) =>
                updateField('company', event.target.value)
              }
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-medium"
            >
              <option value="">Todas as empresas</option>

              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold text-slate-700">
              Status
            </span>

            <select
              value={form.status}
              onChange={(event) =>
                updateField('status', event.target.value)
              }
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-medium"
            >
              <option value="">Todos os status</option>

              {Object.entries(statusLabels).map(
                ([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                )
              )}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-bold text-slate-700">
              Autenticação em dois fatores
            </span>

            <select
              value={form.twoFactor}
              onChange={(event) =>
                updateField('twoFactor', event.target.value)
              }
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-medium"
            >
              <option value="">Todos</option>
              <option value="enabled">2FA ativado</option>
              <option value="disabled">2FA desativado</option>
            </select>
          </label>
        </div>

        <footer className="flex gap-3 border-t border-slate-200 p-6">
          <button
            type="button"
            onClick={clearFilters}
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

export default UsersFilterDrawer;
