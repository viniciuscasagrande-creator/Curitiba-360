import React, { useState, useMemo } from 'react';
import {
  Users,
  FileText,
  Trees,
  DollarSign,
  Search,
  Filter,
  TrendingUp,
  Ticket,
  Gift,
  ArrowUpRight,
  ChevronRight,
  MoreVertical,
  SlidersHorizontal,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';

const mockKPIs = [
  {
    title: 'Usuários Cadastrados',
    value: '48.290',
    change: '+14.2%',
    icon: Users,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    title: 'Contratos Vigentes',
    value: '142',
    change: '+8 este mês',
    icon: FileText,
    color: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    title: 'Atrações Ativas',
    value: '38',
    change: '98% operacional',
    icon: Trees,
    color: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    title: 'Receita Total do Mês',
    value: 'R$ 1.284.950,00',
    change: '+22.5%',
    icon: DollarSign,
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  }
];

const mockAttractions = [
  {
    id: 'att-1',
    name: 'Jardim Botânico de Curitiba',
    category: 'Parque Urbano',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&auto=format&fit=crop',
    ticketsSold: 14250,
    courtesies: 340,
    revenue: 427500,
    occupation: 92,
    sparkline: [40, 55, 75, 80, 95, 110, 140]
  },
  {
    id: 'att-2',
    name: 'Ópera de Arame & Parque das Pedreiras',
    category: 'Teatro & Cultura',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop',
    ticketsSold: 9800,
    courtesies: 120,
    revenue: 392000,
    occupation: 88,
    sparkline: [30, 45, 60, 70, 85, 90, 105]
  },
  {
    id: 'att-3',
    name: 'Museu Oscar Niemeyer (MON)',
    category: 'Museu & Arte',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&auto=format&fit=crop',
    ticketsSold: 11400,
    courtesies: 280,
    revenue: 228000,
    occupation: 85,
    sparkline: [25, 40, 55, 65, 70, 85, 95]
  },
  {
    id: 'att-4',
    name: 'Parque Tanguá & Mirante',
    category: 'Parque & Sunset',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop',
    ticketsSold: 18900,
    courtesies: 500,
    revenue: 189000,
    occupation: 96,
    sparkline: [50, 70, 85, 100, 120, 150, 170]
  },
  {
    id: 'att-5',
    name: 'Bosque Alemão & Trilha de João e Maria',
    category: 'Cultura & Infantil',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop',
    ticketsSold: 6400,
    courtesies: 90,
    revenue: 48000,
    occupation: 74,
    sparkline: [15, 25, 30, 45, 50, 60, 64]
  },
  {
    id: 'att-6',
    name: 'Passeio Público & Mini Zoo',
    category: 'Histórico',
    status: 'inactive',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop',
    ticketsSold: 0,
    courtesies: 0,
    revenue: 0,
    occupation: 0,
    sparkline: [0, 0, 0, 0, 0, 0, 0]
  }
];

export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'active' | 'inactive'
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAttractions = useMemo(() => {
    return mockAttractions.filter((item) => {
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'active' && item.status === 'active') ||
        (activeTab === 'inactive' && item.status === 'inactive');

      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchTerm]);

  return (
    <div className="space-y-6 text-left">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Console de Operações
          </p>
          <h1 className="text-2xl font-black text-slate-950">
            Dashboard Operacional
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition"
          >
            <SlidersHorizontal size={15} />
            Filtros Avançados
          </button>
        </div>
      </div>

      {/* 1. KPIs Top Bar */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockKPIs.map(({ title, value, change, icon: Icon, color }) => (
          <div
            key={title}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {title}
              </span>
              <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${color}`}>
                <Icon size={18} />
              </span>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <p className="text-2xl font-black text-slate-950">{value}</p>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                <TrendingUp size={14} />
                {change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Filter & Status Bar */}
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
            Todos ({mockAttractions.length})
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
            Ativos ({mockAttractions.filter((a) => a.status === 'active').length})
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
            Inativos ({mockAttractions.filter((a) => a.status === 'inactive').length})
          </button>
        </div>

        {/* Operational Search Bar */}
        <div className="relative min-w-[280px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filtrar atração..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs font-medium text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* 3. Attractions Operational Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredAttractions.map((attraction) => (
          <div
            key={attraction.id}
            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md"
          >
            {/* Attraction Header & Image */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-900">
              <img
                src={attraction.image}
                alt={attraction.name}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Status Badge */}
              <div className="absolute left-3.5 top-3.5">
                {attraction.status === 'active' ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md">
                    <CheckCircle2 size={12} />
                    Operacional
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-700/90 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-md">
                    <Clock size={12} />
                    Inativo / Manutenção
                  </span>
                )}
              </div>

              {/* Category */}
              <div className="absolute bottom-3 left-3.5 right-3.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  {attraction.category}
                </span>
                <h3 className="truncate text-base font-bold text-white">
                  {attraction.name}
                </h3>
              </div>
            </div>

            {/* Metrics Details */}
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-3 text-center border border-slate-100">
                <div>
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase">Vendas</span>
                  <span className="text-xs font-black text-slate-900">
                    {attraction.ticketsSold.toLocaleString()}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase">Cortesias</span>
                  <span className="text-xs font-black text-amber-700">
                    {attraction.courtesies}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase">Ocupação</span>
                  <span className="text-xs font-black text-emerald-700">
                    {attraction.occupation}%
                  </span>
                </div>
              </div>

              {/* Revenue & Chart Bar */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="block text-[10px] font-semibold uppercase text-slate-400">Receita Bruta</span>
                  <span className="text-base font-black text-slate-950">
                    R$ {attraction.revenue.toLocaleString('pt-BR')}
                  </span>
                </div>

                {/* Mini Sparkline Visualization */}
                <div className="flex items-end gap-1 h-7">
                  {attraction.sparkline.map((val, idx) => (
                    <div
                      key={idx}
                      style={{ height: `${Math.max(15, (val / 170) * 100)}%` }}
                      className="w-1.5 rounded-t bg-emerald-500/80"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-3 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500">ID: {attraction.id}</span>
              <button
                type="button"
                onClick={() => alert(`Gerenciando atração: ${attraction.name}`)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 transition"
              >
                Gerenciar
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboardPage;
