import React from 'react';
import { X, Filter, RotateCcw, Check } from 'lucide-react';

export function FilterDrawer({
  isOpen,
  onClose,
  onApply,
  onReset,
  title = 'Filtros Avançados',
  children
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <aside className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl border-l border-slate-200 text-left animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Filter size={18} />
            </span>
            <h3 className="text-base font-bold text-slate-950">{title}</h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {children}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-200 p-4 bg-slate-50/80">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition shadow-xs"
          >
            <RotateCcw size={14} />
            Limpar Filtros
          </button>

          <button
            type="button"
            onClick={() => {
              if (onApply) onApply();
              onClose();
            }}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-xs"
          >
            <Check size={15} />
            Aplicar Filtros
          </button>
        </div>
      </aside>
    </>
  );
}

export default FilterDrawer;
