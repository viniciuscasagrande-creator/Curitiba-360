import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventService } from '../services/eventService';
import EventKpiGrid from '../components/EventKpiGrid';
import EventStatusBadge from '../components/EventStatusBadge';
import CapacityIndicator from '../components/CapacityIndicator';
import EventTable from '../components/EventTable';
import { Calendar, Plus, Search, Filter, RefreshCw, Eye, Ticket, MapPin, Sparkles, LayoutGrid, List } from 'lucide-react';

export default function EventsListPage() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid, table
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [categoriaFilter, setCategoriaFilter] = useState('todas');

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await eventService.listEvents({
        search,
        status: statusFilter,
        categoria: categoriaFilter
      });
      if (res.success) {
        setEvents(res.data);
        setMetrics(res.metrics);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search, statusFilter, categoriaFilter]);

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-slate-800 text-xs">
      {/* CABEÇALHO DA PÁGINA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold text-[11px]">
            MOD-07 • ETAPA 01 (COMPLETA)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 mt-1">
            Gestão & Ciclo de Vida de Eventos 360° 🎟️
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Cadastro, produtor, local, horários, capacidade, categorias, publicação e controle de status.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/eventos/novo')}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-purple-600/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Criar Novo Evento
          </button>
          <button
            onClick={loadData}
            title="Atualizar Eventos"
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPIS DE EVENTOS */}
      <EventKpiGrid metrics={metrics} />

      {/* BARRA DE FILTROS, BUSCA E MODOS DE VISUALIZAÇÃO */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar evento por nome, venue ou organizador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-800 text-xs"
          >
            <option value="todos">Todos os Status</option>
            <option value="publicado">Publicado</option>
            <option value="em vendas">Em Vendas</option>
            <option value="em revisão">Em Revisão</option>
            <option value="rascunho">Rascunho</option>
            <option value="esgotado">Esgotado</option>
          </select>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid' ? 'bg-white text-purple-700 shadow-2xs font-bold' : 'text-slate-500'
              }`}
              title="Visualização em Grade"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'table' ? 'bg-white text-purple-700 shadow-2xs font-bold' : 'text-slate-500'
              }`}
              title="Visualização em Tabela"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* RENDERIZAÇÃO DA LISTA: GRADE OU TABELA */}
      {loading ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200/80 text-center space-y-3">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500 font-semibold animate-pulse">Carregando catálogo de eventos...</p>
        </div>
      ) : viewMode === 'table' ? (
        <EventTable events={events} onRefresh={loadData} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((evt) => (
            <div key={evt.id} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="h-44 relative overflow-hidden bg-slate-100">
                  <img
                    src={evt.imagemUrl}
                    alt={evt.nome}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <EventStatusBadge status={evt.status} />
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-xs text-white font-mono text-[10px] font-bold rounded-lg">
                    R$ {evt.receitaAcumulada?.toLocaleString('pt-BR')}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">{evt.categoria}</span>
                    <h3 className="font-extrabold text-slate-900 text-sm leading-snug">{evt.nome}</h3>
                    <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {evt.venue}
                    </p>
                  </div>

                  <CapacityIndicator vendidos={evt.ingressosVendidos} capacidade={evt.capacidadeTotal} />
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => navigate(`/eventos/${evt.id}/lotes`)}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-bold text-[10px] hover:bg-slate-100 flex items-center gap-1"
                >
                  <Ticket className="w-3.5 h-3.5 text-purple-600" /> Lotes
                </button>
                <button
                  onClick={() => navigate(`/eventos/${evt.id}`)}
                  className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] rounded-lg shadow-sm flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> Detalhes 360°
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
