import React, { useState } from 'react';
import { Search, Filter, X, RefreshCw, Download, MapPin } from 'lucide-react';

export default function AgencyFilters({
  searchQuery,
  onSearchChange,
  cidadeFilter,
  onCidadeChange,
  cidadesList = [],
  onReset,
  onRefresh,
  onExport
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const hasActiveFilters = searchQuery !== '' || cidadeFilter !== 'todas';

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-4 space-y-3 shadow-2xs">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Pesquisar por Agência, CNPJ, E-mail, Cidade ou ID..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Actions Button Group */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`
              flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all
              ${showAdvanced || cidadeFilter !== 'todas'
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}
            `}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filtros {cidadeFilter !== 'todas' && '•'}</span>
          </button>

          {onRefresh && (
            <button
              onClick={onRefresh}
              title="Atualizar lista"
              className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}

          {onExport && (
            <button
              onClick={onExport}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Exportar CSV</span>
            </button>
          )}

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="text-xs font-semibold text-slate-500 hover:text-red-600 px-2 py-1 transition-colors"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Painel de Filtros Avançados */}
      {showAdvanced && (
        <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fade-in">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" /> Cidade da Agência
            </label>
            <select
              value={cidadeFilter}
              onChange={(e) => onCidadeChange(e.target.value)}
              className="w-full py-1.5 px-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="todas">Todas as Cidades</option>
              {cidadesList.map((cidade) => (
                <option key={cidade} value={cidade}>
                  {cidade}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
