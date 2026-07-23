import React from 'react';
import { Search, Filter, RotateCcw, Accessibility, DollarSign } from 'lucide-react';

export function EventFilters({ filters, updateFilter, resetFilters }) {
  const CATEGORIES = [
    'todas',
    'Passeios & Tours',
    'Gastronomia & Eventos',
    'Festivais',
    'Shows & Música',
    'Teatro & Cultura',
    'Esportes'
  ];

  const CITIES = ['todas', 'Curitiba', 'Morretes', 'São José dos Pinhais', 'Pinhais', 'Cascavel'];

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl backdrop-blur-md">
      {/* Busca Principal */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          placeholder="Buscar por nome do evento, artista, local..."
          className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      {/* Grid de Filtros Rápidos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {/* Cidade */}
        <div>
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Cidade
          </label>
          <select
            value={filters.cidade}
            onChange={(e) => updateFilter('cidade', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c === 'todas' ? 'Todas as Cidades' : c}
              </option>
            ))}
          </select>
        </div>

        {/* Categoria */}
        <div>
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Categoria
          </label>
          <select
            value={filters.categoria}
            onChange={(e) => updateFilter('categoria', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'todas' ? 'Todas as Categorias' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Data */}
        <div>
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Data
          </label>
          <input
            type="date"
            value={filters.data}
            onChange={(e) => updateFilter('data', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Ordenação */}
        <div>
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Ordenar Por
          </label>
          <select
            value={filters.ordenacao}
            onChange={(e) => updateFilter('ordenacao', e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="data">Data do evento</option>
            <option value="preco_asc">Menor preço</option>
            <option value="preco_desc">Maior preço</option>
          </select>
        </div>
      </div>

      {/* Toggles Adicionais */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
            <input
              type="checkbox"
              checked={filters.gratuito}
              onChange={(e) => updateFilter('gratuito', e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-amber-500"
            />
            <DollarSign size={14} className="text-emerald-400" />
            Gratuito
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
            <input
              type="checkbox"
              checked={filters.acessivel}
              onChange={(e) => updateFilter('acessivel', e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-amber-500 focus:ring-amber-500"
            />
            <span className="text-sky-400">♿</span>
            Acessibilidade PCD
          </label>
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <RotateCcw size={13} />
          Limpar Filtros
        </button>
      </div>
    </div>
  );
}
export default EventFilters;
