import React from 'react';
import { Search, Filter, RotateCcw, DollarSign, Accessibility, Calendar } from 'lucide-react';
import { TOURISM_CATEGORIES } from '../data/tourismMockData';

export function AttractionFilters({ filters, updateFilter, resetFilters }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
      {/* Busca Principal */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          placeholder="Buscar por atrativo, museu, parque ou bairro em Curitiba..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-amber-500 focus:outline-none"
        />
      </div>

      {/* Grid de Filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {/* Categoria */}
        <div>
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Categoria
          </label>
          <select
            value={filters.categoryId}
            onChange={(e) => updateFilter('categoryId', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none"
          >
            <option value="todas">Todas as Categorias</option>
            {TOURISM_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Toggles Rápidos */}
        <div className="flex items-center gap-4 sm:col-span-2 pt-4">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
            <input
              type="checkbox"
              checked={filters.free}
              onChange={(e) => updateFilter('free', e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-amber-500"
            />
            <DollarSign size={14} className="text-emerald-400" />
            Entrada Gratuita
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
            <input
              type="checkbox"
              checked={filters.accessibility}
              onChange={(e) => updateFilter('accessibility', e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-amber-500"
            />
            <Accessibility size={14} className="text-sky-400" />
            Acessibilidade PCD
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
            <input
              type="checkbox"
              checked={filters.reservationRequired}
              onChange={(e) => updateFilter('reservationRequired', e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-amber-500"
            />
            <Calendar size={14} className="text-amber-400" />
            Requer Reserva
          </label>

          <button
            onClick={resetFilters}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/60 rounded-lg transition-colors"
          >
            <RotateCcw size={13} />
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
}
export default AttractionFilters;
