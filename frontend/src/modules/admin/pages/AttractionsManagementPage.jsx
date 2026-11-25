import React, { useState } from 'react';
import {
  Trees,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  Ticket,
  Gift,
  DollarSign,
  ArrowUpRight,
  SlidersHorizontal,
  Edit,
  Eye
} from 'lucide-react';

const mockAttractionsList = [
  {
    id: 'att-101',
    name: 'Jardim Botânico de Curitiba',
    category: 'Parque Público',
    capacity: '8.000 pessoas / dia',
    ticketPrice: 'Gratuito / Exposições R$ 15',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&auto=format&fit=crop',
    ticketsSold: 14250,
    courtesies: 340,
    revenue: 427500
  },
  {
    id: 'att-102',
    name: 'Ópera de Arame & Vale da Música',
    category: 'Cultura & Música',
    capacity: '2.400 lugares',
    ticketPrice: 'R$ 40,00',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop',
    ticketsSold: 9800,
    courtesies: 120,
    revenue: 392000
  },
  {
    id: 'att-103',
    name: 'Museu Oscar Niemeyer (MON)',
    category: 'Artes Visuais',
    capacity: '4.500 pessoas / dia',
    ticketPrice: 'R$ 30,00',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&auto=format&fit=crop',
    ticketsSold: 11400,
    courtesies: 280,
    revenue: 228000
  },
  {
    id: 'att-104',
    name: 'Parque Tanguá',
    category: 'Parque Urbano',
    capacity: '10.000 pessoas / dia',
    ticketPrice: 'Entrada Franca',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop',
    ticketsSold: 18900,
    courtesies: 500,
    revenue: 189000
  }
];

export function AttractionsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockAttractionsList.filter((a) =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Catálogo Operacional
          </p>
          <h1 className="text-2xl font-black text-slate-950">
            Gestão de Atrações
          </h1>
        </div>

        <button
          type="button"
          onClick={() => alert('Abrir cadastro de atração')}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition"
        >
          <Plus size={16} />
          Cadastrar Atração
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative w-full max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome da atração..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-xs font-medium text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Attractions Grid */}
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
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-black uppercase text-white">
                  <CheckCircle2 size={12} />
                  Ativa
                </span>
              </div>

              <div className="absolute bottom-3 left-3.5 right-3.5">
                <span className="text-[10px] font-bold uppercase text-emerald-300">
                  {attraction.category}
                </span>
                <h3 className="truncate text-base font-bold text-white">
                  {attraction.name}
                </h3>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-medium text-slate-600">
                <span>Capacidade: <strong>{attraction.capacity}</strong></span>
                <span>Preço: <strong>{attraction.ticketPrice}</strong></span>
              </div>

              <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-3 text-center border border-slate-100">
                <div>
                  <span className="block text-[10px] font-bold uppercase text-slate-400">Vendas</span>
                  <span className="text-xs font-black text-slate-900">{attraction.ticketsSold}</span>
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

            <div className="border-t border-slate-100 bg-slate-50/50 p-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => alert(`Visualizar ${attraction.name}`)}
                className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 transition"
              >
                <Eye size={14} />
                Visualizar
              </button>

              <button
                type="button"
                onClick={() => alert(`Editar ${attraction.name}`)}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 transition"
              >
                <Edit size={13} />
                Editar Atração
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AttractionsManagementPage;
