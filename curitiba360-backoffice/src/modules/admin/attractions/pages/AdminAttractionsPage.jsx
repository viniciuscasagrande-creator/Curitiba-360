import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Plus, Search, Sparkles } from 'lucide-react';

import AttractionStatusTabs from '../components/AttractionStatusTabs';
import AttractionsBulkActions from '../components/AttractionsBulkActions';
import AttractionsTable from '../components/AttractionsTable';
import { attractionsMock } from '../data/attractionsMock';

export function AdminAttractionsPage() {
  const navigate = useNavigate();

  const [attractions, setAttractions] = useState(attractionsMock);
  const [statusTab, setStatusTab] = useState('active');
  const [query, setQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const counts = useMemo(
    () => ({
      active: attractions.filter((item) => item.status === 'active').length,
      inactive: attractions.filter((item) => item.status === 'inactive').length,
      all: attractions.length
    }),
    [attractions]
  );

  const filteredData = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return attractions.filter((item) => {
      if (statusTab !== 'all' && item.status !== statusTab) {
        return false;
      }

      if (!normalized) {
        return true;
      }

      const searchable = [
        item.id,
        item.name,
        item.partnerName,
        item.location?.city,
        item.location?.venueName
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchable.includes(normalized);
    });
  }, [attractions, query, statusTab]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page, pageSize]);

  function toggleItem(id) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    );
  }

  function toggleAll() {
    const visibleIds = paginatedData.map((item) => item.id);
    const allSelected = visibleIds.every((id) => selectedIds.includes(id));

    if (allSelected) {
      setSelectedIds((current) =>
        current.filter((id) => !visibleIds.includes(id))
      );
      return;
    }

    setSelectedIds((current) => [...new Set([...current, ...visibleIds])]);
  }

  function updateSelectedStatus(status) {
    setAttractions((current) =>
      current.map((item) =>
        selectedIds.includes(item.id)
          ? { ...item, status, updatedAt: new Date().toISOString() }
          : item
      )
    );
    setSelectedIds([]);
  }

  function deleteSelected() {
    if (!window.confirm(`Excluir ${selectedIds.length} atração(ões)?`)) {
      return;
    }

    setAttractions((current) =>
      current.filter((item) => !selectedIds.includes(item.id))
    );
    setSelectedIds([]);
  }

  function editSelected() {
    if (selectedIds.length === 1) {
      navigate(`/admin/atracoes/${selectedIds[0]}/editar`);
    }
  }

  return (
    <div className="mx-auto max-w-[1700px] space-y-6 text-left">
      <header className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
            Módulo de Administração
          </p>

          <h1 className="mt-2 flex items-center gap-3 text-3xl font-black tracking-tight text-slate-950">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Sparkles size={22} />
            </span>
            Gestão de Atrações
          </h1>

          <p className="mt-2 text-sm text-slate-500 font-medium">
            Gerencie atrações turísticas, locais de eventos, categorias de ingressos e operação.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative sm:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Pesquisar atrações..."
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 font-medium"
            />
          </div>

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 hover:bg-slate-50"
          >
            <Filter size={18} />
            Filtros
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/atracoes/nova')}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-bold text-white transition hover:bg-emerald-700 shadow-sm"
          >
            <Plus size={18} />
            Adicionar atração
          </button>
        </div>
      </header>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm p-4 sm:p-5 flex flex-col gap-4 lg:flex-row lg:items-center">
        <AttractionStatusTabs
          value={statusTab}
          counts={counts}
          onChange={(tab) => {
            setStatusTab(tab);
            setSelectedIds([]);
            setPage(1);
          }}
        />

        <div className="lg:ml-auto">
          <AttractionsBulkActions
            selectedCount={selectedIds.length}
            statusTab={statusTab}
            onEdit={editSelected}
            onActivate={() => updateSelectedStatus('active')}
            onDeactivate={() => updateSelectedStatus('inactive')}
            onDelete={deleteSelected}
            onClear={() => setSelectedIds([])}
          />
        </div>
      </section>

      <AttractionsTable
        attractions={paginatedData}
        selectedIds={selectedIds}
        page={page}
        pageSize={pageSize}
        totalItems={filteredData.length}
        onToggle={toggleItem}
        onToggleAll={toggleAll}
        onEdit={(attraction) => navigate(`/admin/atracoes/${attraction.id}/editar`)}
        onDelete={deleteSelected}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
    </div>
  );
}

export default AdminAttractionsPage;
