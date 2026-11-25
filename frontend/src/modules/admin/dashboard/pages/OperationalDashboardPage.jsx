import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RefreshCw, Filter } from 'lucide-react';

import { dashboardKpisMock, attractionsMock } from '../data/dashboardMock';
import OperationalKpis from '../components/OperationalKpis';
import AttractionOverviewCard from '../components/AttractionOverviewCard';

export function OperationalDashboardPage() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'active' | 'inactive'
  const [searchTerm, setSearchTerm] = useState('');
  const [period, setPeriod] = useState('30d');
  const [partnerFilter, setPartnerFilter] = useState('all');

  const filteredAttractions = useMemo(() => {
    return attractionsMock.filter((item) => {
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'active' && item.status === 'active') ||
        (activeTab === 'inactive' && item.status === 'inactive');

      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase().trim());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchTerm]);

  return (
    <div className="space-y-6 text-left">
      {/* 1. Header & Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Curitiba 360 Backoffice
          </p>
          <h1 className="text-2xl font-black text-slate-950">
            Dashboard Operacional
          </h1>
        </div>

        {/* Global Controls: Period, Partner, Refresh */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 outline-none focus:border-emerald-500 shadow-sm"
          >
            <option value="today">Hoje</option>
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="month">Este Mês</option>
          </select>

          <select
            value={partnerFilter}
            onChange={(e) => setPartnerFilter(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 outline-none focus:border-emerald-500 shadow-sm"
          >
            <option value="all">Todos os Parceiros</option>
            <option value="public">Concessão Pública</option>
            <option value="private">Iniciativa Privada</option>
          </select>

          <button
            type="button"
            onClick={() => window.location.reload()}
            title="Atualizar dados"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm transition"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* 2. Top KPIs */}
      <OperationalKpis kpis={dashboardKpisMock} />

      {/* 3. Search & Tabs */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
              activeTab === 'all'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Todos ({attractionsMock.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('active')}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
              activeTab === 'active'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Ativos ({attractionsMock.filter((a) => a.status === 'active').length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inactive')}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
              activeTab === 'inactive'
                ? 'bg-white text-rose-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Inativos ({attractionsMock.filter((a) => a.status === 'inactive').length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar atração por nome ou bairro..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs font-medium text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* 4. Attractions Overview Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredAttractions.map((attraction) => (
          <AttractionOverviewCard key={attraction.id} attraction={attraction} />
        ))}
      </div>
    </div>
  );
}

export default OperationalDashboardPage;
