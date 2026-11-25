import React, { useState, useMemo } from 'react';
import {
  Trees,
  Search,
  Plus,
  LayoutGrid,
  List,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Edit,
  Eye,
  DollarSign,
  Ticket,
  FileText,
  Building2,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockAttractionsDetailed = [
  {
    id: 'att-101',
    name: 'Jardim Botânico de Curitiba',
    city: 'Curitiba',
    neighborhood: 'Jardim Botânico',
    category: 'Parque Urbano',
    partner: 'Jardim Botânico Eireli',
    status: 'active', // active | inactive | implementation | suspended
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&auto=format&fit=crop',
    ticketsSold: 42500,
    courtesies: 840,
    revenue: 1275000,
    contractId: 'CTR-2025-001'
  },
  {
    id: 'att-102',
    name: 'Ópera de Arame & Vale da Música',
    city: 'Curitiba',
    neighborhood: 'Abranches',
    category: 'Cultura & Teatro',
    partner: 'Ópera de Arame S.A.',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop',
    ticketsSold: 28400,
    courtesies: 420,
    revenue: 1136000,
    contractId: 'CTR-2025-002'
  },
  {
    id: 'att-103',
    name: 'Museu Oscar Niemeyer (MON)',
    city: 'Curitiba',
    neighborhood: 'Centro Cívico',
    category: 'Museu & Exposição',
    partner: 'Associação MON',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&auto=format&fit=crop',
    ticketsSold: 34100,
    courtesies: 980,
    revenue: 1023000,
    contractId: 'CTR-2025-003'
  },
  {
    id: 'att-104',
    name: 'Parque Tanguá & Mirante',
    city: 'Curitiba',
    neighborhood: 'Pilarzinho',
    category: 'Parque Urbano',
    partner: 'Concessionária Tanguá',
    status: 'implementation',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop',
    ticketsSold: 0,
    courtesies: 0,
    revenue: 0,
    contractId: 'CTR-2024-089'
  }
];

export function AttractionsPage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filtered = useMemo(() => {
    return mockAttractionsDetailed.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.partner.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchTerm, statusFilter, categoryFilter]);

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Catálogo & Operação de Produtos
          </p>
          <h1 className="text-2xl font-black text-slate-950">
            Gestão de Atrações
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Visualização em Cards"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Visualização em Tabela"
            >
              <List size={16} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => alert('Abrir cadastro de atração')}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-sm"
          >
            <Plus size={16} />
            Nova Atração
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-4">
        <div className="relative sm:col-span-2">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por atração, parceiro ou bairro..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs font-medium text-slate-900 outline-none focus:border-emerald-500 focus:bg-white placeholder:text-slate-400"
          />
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-700 outline-none focus:border-emerald-500"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Ativa</option>
            <option value="inactive">Inativa</option>
            <option value="implementation">Em Implantação</option>
            <option value="suspended">Suspensa</option>
          </select>
        </div>

        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-700 outline-none focus:border-emerald-500"
          >
            <option value="all">Todas as Categorias</option>
            <option value="Parque Urbano">Parque Urbano</option>
            <option value="Cultura & Teatro">Cultura & Teatro</option>
            <option value="Museu & Exposição">Museu & Exposição</option>
          </select>
        </div>
      </div>

      {/* Grid or Table View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((attraction) => (
            <div
              key={attraction.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300"
            >
              <div className="relative h-44 w-full bg-slate-900">
                <img
                  src={attraction.image}
                  alt={attraction.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                <div className="absolute left-3.5 top-3.5">
                  {attraction.status === 'active' && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-black uppercase text-white">
                      <CheckCircle2 size={12} />
                      Ativa
                    </span>
                  )}
                  {attraction.status === 'implementation' && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-3 py-1 text-[10px] font-black uppercase text-white">
                      <Clock size={12} />
                      Em Implantação
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5">
                  <p className="flex items-center gap-1 text-[10px] font-bold text-emerald-300">
                    <MapPin size={11} />
                    {attraction.city} • {attraction.neighborhood}
                  </p>
                  <h3 className="truncate text-base font-bold text-white mt-0.5">
                    {attraction.name}
                  </h3>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <p className="text-xs font-semibold text-slate-600">Parceiro: <strong>{attraction.partner}</strong></p>

                <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-3 text-center border border-slate-100">
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-slate-400">Vendas</span>
                    <span className="text-xs font-black text-slate-900">{attraction.ticketsSold.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-slate-400">Cortesias</span>
                    <span className="text-xs font-black text-amber-700">{attraction.courtesies}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase text-slate-400">Receita</span>
                    <span className="text-xs font-black text-emerald-700">R$ {(attraction.revenue / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-slate-100 bg-slate-50/50 p-3 flex flex-wrap items-center justify-between gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => alert(`Visualizando vendas de ${attraction.name}`)}
                  className="flex items-center gap-1 font-bold text-slate-600 hover:text-emerald-700"
                >
                  <Ticket size={14} />
                  Vendas
                </button>

                <button
                  type="button"
                  onClick={() => alert(`Visualizando contrato ${attraction.contractId}`)}
                  className="flex items-center gap-1 font-bold text-slate-600 hover:text-indigo-700"
                >
                  <FileText size={14} />
                  Contrato
                </button>

                <button
                  type="button"
                  onClick={() => alert(`Editando ${attraction.name}`)}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1 text-xs font-bold text-white hover:bg-emerald-700 transition"
                >
                  <Edit size={12} />
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase text-slate-500">
              <tr>
                <th className="px-6 py-3.5">Atração</th>
                <th className="px-6 py-3.5">Localização</th>
                <th className="px-6 py-3.5">Parceiro</th>
                <th className="px-6 py-3.5">Vendas</th>
                <th className="px-6 py-3.5">Receita</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-bold text-slate-900">{item.name}</td>
                  <td className="px-6 py-4 text-slate-600">{item.city} • {item.neighborhood}</td>
                  <td className="px-6 py-4 font-medium text-slate-800">{item.partner}</td>
                  <td className="px-6 py-4 font-black text-slate-900">{item.ticketsSold.toLocaleString()}</td>
                  <td className="px-6 py-4 font-black text-emerald-700">R$ {item.revenue.toLocaleString('pt-BR')}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => alert(`Editar ${item.name}`)}
                      className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-700 hover:bg-slate-50"
                    >
                      <Edit size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AttractionsPage;
