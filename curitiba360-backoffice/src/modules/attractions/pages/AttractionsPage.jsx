import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Archive,
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Edit3,
  Eye,
  Filter,
  MapPin,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  TicketCheck,
  Trash2,
  Users,
  X
} from 'lucide-react';

const INITIAL_ATTRACTIONS = [
  {
    id: 'ATR-0001',
    name: 'Ópera de Arame',
    partnerName: 'Instituto Curitiba de Arte',
    city: 'Curitiba',
    state: 'PR',
    status: 'active',
    operationType: 'permanent',
    createdAt: '2026-06-12T10:30:00',
    ticketsSold: 12540,
    revenue: 842350,
    categoriesCount: 8,
    capacity: 2400,
    imageUrl: ''
  },
  {
    id: 'ATR-0002',
    name: 'Museu Oscar Niemeyer',
    partnerName: 'Instituto MON',
    city: 'Curitiba',
    state: 'PR',
    status: 'active',
    operationType: 'permanent',
    createdAt: '2026-05-18T14:20:00',
    ticketsSold: 9340,
    revenue: 513700,
    categoriesCount: 6,
    capacity: 3500,
    imageUrl: ''
  },
  {
    id: 'ATR-0003',
    name: 'Jardim Botânico',
    partnerName: 'Prefeitura de Curitiba',
    city: 'Curitiba',
    state: 'PR',
    status: 'inactive',
    operationType: 'permanent',
    createdAt: '2026-04-03T09:45:00',
    ticketsSold: 0,
    revenue: 0,
    categoriesCount: 2,
    capacity: 5000,
    imageUrl: ''
  },
  {
    id: 'ATR-0004',
    name: 'Natal no Parque Barigui',
    partnerName: 'Curitiba Eventos',
    city: 'Curitiba',
    state: 'PR',
    status: 'active',
    operationType: 'season',
    createdAt: '2026-07-02T16:10:00',
    ticketsSold: 18750,
    revenue: 1125000,
    categoriesCount: 12,
    capacity: 8000,
    imageUrl: ''
  },
  {
    id: 'ATR-0005',
    name: 'Festival de Inverno Curitiba',
    partnerName: 'CWB Produções',
    city: 'Curitiba',
    state: 'PR',
    status: 'draft',
    operationType: 'event',
    createdAt: '2026-07-18T11:00:00',
    ticketsSold: 0,
    revenue: 0,
    categoriesCount: 0,
    capacity: 10000,
    imageUrl: ''
  },
  {
    id: 'ATR-0006',
    name: 'Torre Panorâmica',
    partnerName: 'Curitiba Turismo',
    city: 'Curitiba',
    state: 'PR',
    status: 'active',
    operationType: 'permanent',
    createdAt: '2026-03-14T08:30:00',
    ticketsSold: 7640,
    revenue: 382000,
    categoriesCount: 4,
    capacity: 1200,
    imageUrl: ''
  },
  {
    id: 'ATR-0007',
    name: 'Parque Tanguá Experience',
    partnerName: 'Experiências Paraná',
    city: 'Curitiba',
    state: 'PR',
    status: 'inactive',
    operationType: 'season',
    createdAt: '2026-02-22T13:15:00',
    ticketsSold: 2180,
    revenue: 98100,
    categoriesCount: 3,
    capacity: 1800,
    imageUrl: ''
  }
];

const STATUS_TABS = [
  {
    value: 'active',
    label: 'Ativas'
  },
  {
    value: 'inactive',
    label: 'Inativas'
  },
  {
    value: 'draft',
    label: 'Rascunhos'
  },
  {
    value: 'all',
    label: 'Todas'
  }
];

const STATUS_LABELS = {
  active: 'Ativa',
  inactive: 'Inativa',
  draft: 'Rascunho'
};

const OPERATION_TYPE_LABELS = {
  permanent: 'Permanente',
  event: 'Evento único',
  season: 'Temporada',
  recurring: 'Sessões recorrentes'
};

export default function AttractionsPage() {
  const navigate = useNavigate();

  const [attractions, setAttractions] =
    useState(INITIAL_ATTRACTIONS);

  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState('active');
  const [operationType, setOperationType] = useState('all');
  const [partnerFilter, setPartnerFilter] = useState('all');

  const [selectedIds, setSelectedIds] = useState([]);
  const [openedMenuId, setOpenedMenuId] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [showFilters, setShowFilters] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] =
    useState(null);

  const partners = useMemo(() => {
    return Array.from(
      new Set(
        attractions.map(
          (attraction) => attraction.partnerName
        )
      )
    ).sort();
  }, [attractions]);

  const filteredAttractions = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLocaleLowerCase('pt-BR');

    return attractions.filter((attraction) => {
      const matchesStatus =
        statusTab === 'all' ||
        attraction.status === statusTab;

      const matchesOperationType =
        operationType === 'all' ||
        attraction.operationType === operationType;

      const matchesPartner =
        partnerFilter === 'all' ||
        attraction.partnerName === partnerFilter;

      const matchesSearch =
        !normalizedSearch ||
        [
          attraction.id,
          attraction.name,
          attraction.partnerName,
          attraction.city,
          attraction.state
        ].some((value) =>
          String(value)
            .toLocaleLowerCase('pt-BR')
            .includes(normalizedSearch)
        );

      return (
        matchesStatus &&
        matchesOperationType &&
        matchesPartner &&
        matchesSearch
      );
    });
  }, [
    attractions,
    operationType,
    partnerFilter,
    search,
    statusTab
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredAttractions.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedAttractions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;

    return filteredAttractions.slice(
      start,
      start + pageSize
    );
  }, [
    currentPage,
    filteredAttractions,
    pageSize
  ]);

  const selectedAttractions = useMemo(() => {
    return attractions.filter((attraction) =>
      selectedIds.includes(attraction.id)
    );
  }, [attractions, selectedIds]);

  const allCurrentPageSelected =
    paginatedAttractions.length > 0 &&
    paginatedAttractions.every((attraction) =>
      selectedIds.includes(attraction.id)
    );

  const dashboardTotals = useMemo(() => {
    return attractions.reduce(
      (totals, attraction) => {
        if (attraction.status === 'active') {
          totals.active += 1;
        }

        if (attraction.status === 'inactive') {
          totals.inactive += 1;
        }

        if (attraction.status === 'draft') {
          totals.drafts += 1;
        }

        totals.tickets += attraction.ticketsSold;
        totals.revenue += attraction.revenue;

        return totals;
      },
      {
        active: 0,
        inactive: 0,
        drafts: 0,
        tickets: 0,
        revenue: 0
      }
    );
  }, [attractions]);

  function handleStatusTabChange(nextStatus) {
    setStatusTab(nextStatus);
    setPage(1);
    setSelectedIds([]);
    setOpenedMenuId(null);
  }

  function handleSearchChange(event) {
    setSearch(event.target.value);
    setPage(1);
    setSelectedIds([]);
  }

  function handleOperationTypeChange(event) {
    setOperationType(event.target.value);
    setPage(1);
    setSelectedIds([]);
  }

  function handlePartnerChange(event) {
    setPartnerFilter(event.target.value);
    setPage(1);
    setSelectedIds([]);
  }

  function handleToggleSelection(attractionId) {
    setSelectedIds((current) => {
      if (current.includes(attractionId)) {
        return current.filter(
          (id) => id !== attractionId
        );
      }

      return [...current, attractionId];
    });
  }

  function handleToggleCurrentPage() {
    const currentPageIds = paginatedAttractions.map(
      (attraction) => attraction.id
    );

    setSelectedIds((current) => {
      if (allCurrentPageSelected) {
        return current.filter(
          (id) => !currentPageIds.includes(id)
        );
      }

      return Array.from(
        new Set([...current, ...currentPageIds])
      );
    });
  }

  function updateSelectedStatus(nextStatus) {
    if (!selectedIds.length) {
      return;
    }

    setAttractions((current) =>
      current.map((attraction) =>
        selectedIds.includes(attraction.id)
          ? {
              ...attraction,
              status: nextStatus
            }
          : attraction
      )
    );

    setSelectedIds([]);
  }

  function deleteAttraction(attractionId) {
    setAttractions((current) =>
      current.filter(
        (attraction) =>
          attraction.id !== attractionId
      )
    );

    setSelectedIds((current) =>
      current.filter((id) => id !== attractionId)
    );

    setOpenedMenuId(null);
    setDeleteConfirmation(null);
  }

  function deleteSelectedAttractions() {
    setAttractions((current) =>
      current.filter(
        (attraction) =>
          !selectedIds.includes(attraction.id)
      )
    );

    setSelectedIds([]);
    setDeleteConfirmation(null);
  }

  function clearFilters() {
    setSearch('');
    setOperationType('all');
    setPartnerFilter('all');
    setStatusTab('all');
    setPage(1);
    setSelectedIds([]);
  }

  function openAttraction(attractionId) {
    navigate(`/admin/atracoes/${attractionId}`);
  }

  function editAttraction(attractionId) {
    navigate(
      `/admin/atracoes/${attractionId}/editar`
    );
  }

  function openCategories(attractionId) {
    navigate(
      `/admin/atracoes/${attractionId}/categorias`
    );
  }

  function openTickets(attractionId) {
    navigate(
      `/admin/atracoes/${attractionId}/ingressos`
    );
  }

  const firstResult =
    filteredAttractions.length === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const lastResult = Math.min(
    currentPage * pageSize,
    filteredAttractions.length
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-[1700px] px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader
          onCreate={() =>
            navigate('/admin/atracoes/nova')
          }
        />

        <DashboardCards totals={dashboardTotals} />

        <section className="mt-6 overflow-visible rounded-[28px] border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <StatusTabs
              activeTab={statusTab}
              attractions={attractions}
              onChange={handleStatusTabChange}
            />

            <div className="mt-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="relative w-full xl:max-w-xl">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Pesquisar por atração, parceiro, ID ou cidade"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('');
                      setPage(1);
                    }}
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                    aria-label="Limpar pesquisa"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setShowFilters((current) => !current)
                  }
                  className={[
                    'inline-flex h-11 items-center gap-2 rounded-2xl border px-4 text-xs font-bold transition',
                    showFilters ||
                    operationType !== 'all' ||
                    partnerFilter !== 'all'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  ].join(' ')}
                >
                  <Filter size={16} />
                  Filtros
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPage(1);
                    setSelectedIds([]);
                  }}
                  className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                >
                  <RefreshCw size={16} />
                  Atualizar
                </button>
              </div>
            </div>

            {showFilters && (
              <FiltersPanel
                operationType={operationType}
                partnerFilter={partnerFilter}
                partners={partners}
                onOperationTypeChange={
                  handleOperationTypeChange
                }
                onPartnerChange={handlePartnerChange}
                onClear={clearFilters}
              />
            )}
          </div>

          {selectedIds.length > 0 && (
            <BulkActions
              selectedAttractions={
                selectedAttractions
              }
              onActivate={() =>
                updateSelectedStatus('active')
              }
              onDeactivate={() =>
                updateSelectedStatus('inactive')
              }
              onDelete={() =>
                setDeleteConfirmation({
                  type: 'multiple',
                  total: selectedIds.length
                })
              }
              onClear={() => setSelectedIds([])}
            />
          )}

          <AttractionsTable
            attractions={paginatedAttractions}
            selectedIds={selectedIds}
            allSelected={allCurrentPageSelected}
            openedMenuId={openedMenuId}
            onToggleAll={handleToggleCurrentPage}
            onToggleSelection={
              handleToggleSelection
            }
            onOpenMenu={setOpenedMenuId}
            onView={openAttraction}
            onEdit={editAttraction}
            onCategories={openCategories}
            onTickets={openTickets}
            onChangeStatus={(attraction) => {
              setAttractions((current) =>
                current.map((item) =>
                  item.id === attraction.id
                    ? {
                        ...item,
                        status:
                          item.status === 'active'
                            ? 'inactive'
                            : 'active'
                      }
                    : item
                )
              );

              setOpenedMenuId(null);
            }}
            onDelete={(attraction) =>
              setDeleteConfirmation({
                type: 'single',
                attraction
              })
            }
          />

          <Pagination
            page={currentPage}
            pageSize={pageSize}
            totalPages={totalPages}
            totalItems={filteredAttractions.length}
            firstResult={firstResult}
            lastResult={lastResult}
            onPageChange={setPage}
            onPageSizeChange={(nextPageSize) => {
              setPageSize(nextPageSize);
              setPage(1);
              setSelectedIds([]);
            }}
          />
        </section>
      </main>

      {deleteConfirmation && (
        <DeleteConfirmationDialog
          confirmation={deleteConfirmation}
          onCancel={() =>
            setDeleteConfirmation(null)
          }
          onConfirm={() => {
            if (
              deleteConfirmation.type === 'single'
            ) {
              deleteAttraction(
                deleteConfirmation.attraction.id
              );
              return;
            }

            deleteSelectedAttractions();
          }}
        />
      )}
    </div>
  );
}

function PageHeader({ onCreate }) {
  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
          <Building2 size={15} />
          Backoffice Curitiba 360
        </div>

        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          Gestão de atrações
        </h1>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Cadastre, publique e acompanhe as atrações,
          categorias de ingresso e resultados operacionais.
        </p>
      </div>

      <button
        type="button"
        onClick={onCreate}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
      >
        <Plus size={18} />
        Adicionar atração
      </button>
    </header>
  );
}

function DashboardCards({ totals }) {
  const cards = [
    {
      label: 'Atrações ativas',
      value: totals.active,
      helper: 'Disponíveis para venda',
      icon: Building2
    },
    {
      label: 'Ingressos vendidos',
      value: formatNumber(totals.tickets),
      helper: 'Volume acumulado',
      icon: TicketCheck
    },
    {
      label: 'Receita gerada',
      value: formatCurrency(totals.revenue),
      helper: 'Vendas das atrações',
      icon: CircleDollarSign
    },
    {
      label: 'Em configuração',
      value: totals.drafts,
      helper: `${totals.inactive} atrações inativas`,
      icon: Archive
    }
  ];

  return (
    <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.label}
            className="group rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-slate-500">
                  {card.label}
                </p>

                <strong className="mt-3 block text-2xl font-black tracking-tight text-slate-950">
                  {card.value}
                </strong>

                <p className="mt-2 text-xs text-slate-400">
                  {card.helper}
                </p>
              </div>

              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                <Icon size={20} />
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}

function StatusTabs({
  activeTab,
  attractions,
  onChange
}) {
  function getTotal(status) {
    if (status === 'all') {
      return attractions.length;
    }

    return attractions.filter(
      (attraction) =>
        attraction.status === status
    ).length;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {STATUS_TABS.map((tab) => {
        const active = tab.value === activeTab;

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={[
              'inline-flex h-10 items-center gap-2 rounded-2xl px-4 text-xs font-black transition',
              active
                ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/10'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800'
            ].join(' ')}
          >
            {tab.label}

            <span
              className={[
                'rounded-full px-2 py-0.5 text-[10px]',
                active
                  ? 'bg-white/15 text-white'
                  : 'bg-white text-slate-500'
              ].join(' ')}
            >
              {getTotal(tab.value)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function FiltersPanel({
  operationType,
  partnerFilter,
  partners,
  onOperationTypeChange,
  onPartnerChange,
  onClear
}) {
  return (
    <div className="mt-4 grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_auto]">
      <SelectField
        label="Tipo de operação"
        value={operationType}
        onChange={onOperationTypeChange}
      >
        <option value="all">
          Todos os tipos
        </option>
        <option value="permanent">
          Permanente
        </option>
        <option value="event">
          Evento único
        </option>
        <option value="season">
          Temporada
        </option>
        <option value="recurring">
          Sessões recorrentes
        </option>
      </SelectField>

      <SelectField
        label="Parceiro comercial"
        value={partnerFilter}
        onChange={onPartnerChange}
      >
        <option value="all">
          Todos os parceiros
        </option>

        {partners.map((partner) => (
          <option
            key={partner}
            value={partner}
          >
            {partner}
          </option>
        ))}
      </SelectField>

      <div className="flex items-end">
        <button
          type="button"
          onClick={onClear}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 transition hover:bg-slate-100 xl:w-auto"
        >
          <X size={16} />
          Limpar filtros
        </button>
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  children
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.1em] text-slate-500">
        {label}
      </span>

      <span className="relative block">
        <select
          value={value}
          onChange={onChange}
          className="h-11 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 pr-10 text-sm font-semibold text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
        >
          {children}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </span>
    </label>
  );
}

function BulkActions({
  selectedAttractions,
  onActivate,
  onDeactivate,
  onDelete,
  onClear
}) {
  const canActivate = selectedAttractions.some(
    (attraction) =>
      attraction.status !== 'active'
  );

  const canDeactivate = selectedAttractions.some(
    (attraction) =>
      attraction.status === 'active'
  );

  return (
    <div className="flex flex-col gap-3 border-b border-emerald-100 bg-emerald-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-emerald-600 px-3 text-xs font-black text-white">
          {selectedAttractions.length}
        </span>

        <div>
          <p className="text-xs font-black text-emerald-900">
            Atrações selecionadas
          </p>

          <p className="text-[11px] text-emerald-700">
            Escolha uma ação para aplicar em lote.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={!canActivate}
          onClick={onActivate}
          className="h-9 rounded-xl border border-emerald-200 bg-white px-3 text-[11px] font-black text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Ativar
        </button>

        <button
          type="button"
          disabled={!canDeactivate}
          onClick={onDeactivate}
          className="h-9 rounded-xl border border-amber-200 bg-white px-3 text-[11px] font-black text-amber-700 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Inativar
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="inline-flex h-9 items-center gap-2 rounded-xl border border-rose-200 bg-white px-3 text-[11px] font-black text-rose-600 transition hover:bg-rose-50"
        >
          <Trash2 size={14} />
          Excluir
        </button>

        <button
          type="button"
          onClick={onClear}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-emerald-700 transition hover:bg-emerald-100"
          aria-label="Limpar seleção"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

function AttractionsTable({
  attractions,
  selectedIds,
  allSelected,
  openedMenuId,
  onToggleAll,
  onToggleSelection,
  onOpenMenu,
  onView,
  onEdit,
  onCategories,
  onTickets,
  onChangeStatus,
  onDelete
}) {
  if (!attractions.length) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1250px]">
        <thead>
          <tr className="bg-slate-50/80">
            <th className="w-14 px-5 py-4 text-left">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleAll}
                className="h-4 w-4 rounded border-slate-300 accent-emerald-600"
              />
            </th>

            {[
              'Atração',
              'Parceiro',
              'Tipo',
              'Resultados',
              'Capacidade',
              'Criação',
              'Status'
            ].map((heading) => (
              <th
                key={heading}
                className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-slate-500"
              >
                {heading}
              </th>
            ))}

            <th className="w-16 px-4 py-4" />
          </tr>
        </thead>

        <tbody>
          {attractions.map((attraction) => {
            const selected = selectedIds.includes(
              attraction.id
            );

            return (
              <tr
                key={attraction.id}
                className={[
                  'border-t border-slate-100 transition',
                  selected
                    ? 'bg-emerald-50/50'
                    : 'hover:bg-slate-50/80'
                ].join(' ')}
              >
                <td className="px-5 py-5">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() =>
                      onToggleSelection(
                        attraction.id
                      )
                    }
                    className="h-4 w-4 rounded border-slate-300 accent-emerald-600"
                  />
                </td>

                <td className="px-4 py-5">
                  <button
                    type="button"
                    onClick={() =>
                      onView(attraction.id)
                    }
                    className="flex items-center gap-3 text-left"
                  >
                    <AttractionAvatar
                      attraction={attraction}
                    />

                    <span>
                      <strong className="block max-w-[260px] truncate text-sm font-black text-slate-900 transition hover:text-emerald-700">
                        {attraction.name}
                      </strong>

                      <span className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                        {attraction.id}

                        <span>•</span>

                        <MapPin size={11} />

                        {attraction.city}/
                        {attraction.state}
                      </span>
                    </span>
                  </button>
                </td>

                <td className="px-4 py-5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                      <Users size={15} />
                    </span>

                    <span className="max-w-[180px] truncate text-xs font-bold text-slate-700">
                      {attraction.partnerName}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-5">
                  <span className="inline-flex rounded-xl bg-violet-50 px-3 py-1.5 text-[10px] font-black text-violet-700">
                    {
                      OPERATION_TYPE_LABELS[
                        attraction.operationType
                      ]
                    }
                  </span>
                </td>

                <td className="px-4 py-5">
                  <div className="space-y-1">
                    <p className="text-xs font-black text-slate-800">
                      {formatNumber(
                        attraction.ticketsSold
                      )}{' '}
                      ingressos
                    </p>

                    <p className="text-[11px] font-semibold text-emerald-600">
                      {formatCurrency(
                        attraction.revenue
                      )}
                    </p>

                    <p className="text-[10px] text-slate-400">
                      {
                        attraction.categoriesCount
                      }{' '}
                      categorias
                    </p>
                  </div>
                </td>

                <td className="px-4 py-5">
                  <p className="text-xs font-black text-slate-700">
                    {formatNumber(
                      attraction.capacity
                    )}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    pessoas
                  </p>
                </td>

                <td className="px-4 py-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <CalendarDays
                      size={15}
                      className="text-slate-400"
                    />

                    {formatDate(
                      attraction.createdAt
                    )}
                  </div>
                </td>

                <td className="px-4 py-5">
                  <StatusBadge
                    status={attraction.status}
                  />
                </td>

                <td className="relative px-4 py-5">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenMenu(
                        openedMenuId ===
                          attraction.id
                          ? null
                          : attraction.id
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    aria-label="Abrir ações"
                  >
                    <MoreHorizontal size={19} />
                  </button>

                  {openedMenuId ===
                    attraction.id && (
                    <AttractionActionsMenu
                      attraction={attraction}
                      onView={() =>
                        onView(attraction.id)
                      }
                      onEdit={() =>
                        onEdit(attraction.id)
                      }
                      onCategories={() =>
                        onCategories(
                          attraction.id
                        )
                      }
                      onTickets={() =>
                        onTickets(attraction.id)
                      }
                      onChangeStatus={() =>
                        onChangeStatus(attraction)
                      }
                      onDelete={() =>
                        onDelete(attraction)
                      }
                    />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function AttractionAvatar({ attraction }) {
  if (attraction.imageUrl) {
    return (
      <img
        src={attraction.imageUrl}
        alt=""
        className="h-12 w-12 rounded-2xl object-cover"
      />
    );
  }

  const initials = attraction.name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-cyan-100 text-sm font-black text-emerald-800">
      {initials}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    active:
      'border-emerald-200 bg-emerald-50 text-emerald-700',
    inactive:
      'border-slate-200 bg-slate-100 text-slate-500',
    draft:
      'border-amber-200 bg-amber-50 text-amber-700'
  };

  const dotStyles = {
    active: 'bg-emerald-500',
    inactive: 'bg-slate-400',
    draft: 'bg-amber-500'
  };

  return (
    <span
      className={[
        'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black',
        styles[status]
      ].join(' ')}
    >
      <span
        className={[
          'h-1.5 w-1.5 rounded-full',
          dotStyles[status]
        ].join(' ')}
      />

      {STATUS_LABELS[status]}
    </span>
  );
}

function AttractionActionsMenu({
  attraction,
  onView,
  onEdit,
  onCategories,
  onTickets,
  onChangeStatus,
  onDelete
}) {
  return (
    <div className="absolute right-4 top-14 z-30 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
      <MenuButton
        icon={Eye}
        label="Abrir painel da atração"
        onClick={onView}
      />

      <MenuButton
        icon={Edit3}
        label="Editar atração"
        onClick={onEdit}
      />

      <MenuButton
        icon={Users}
        label="Gerenciar categorias"
        onClick={onCategories}
      />

      <MenuButton
        icon={TicketCheck}
        label="Pesquisar ingressos"
        onClick={onTickets}
      />

      <div className="my-2 border-t border-slate-100" />

      <MenuButton
        icon={Archive}
        label={
          attraction.status === 'active'
            ? 'Inativar atração'
            : 'Ativar atração'
        }
        onClick={onChangeStatus}
      />

      <MenuButton
        icon={Trash2}
        label="Excluir atração"
        danger
        onClick={onDelete}
      />
    </div>
  );
}

function MenuButton({
  icon: Icon,
  label,
  danger = false,
  onClick
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-bold transition',
        danger
          ? 'text-rose-600 hover:bg-rose-50'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      ].join(' ')}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-20 text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
        <Building2 size={30} />
      </span>

      <h3 className="mt-5 text-base font-black text-slate-900">
        Nenhuma atração encontrada
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Não existem atrações correspondentes aos filtros
        selecionados. Altere a pesquisa ou limpe os filtros.
      </p>
    </div>
  );
}

function Pagination({
  page,
  pageSize,
  totalPages,
  totalItems,
  firstResult,
  lastResult,
  onPageChange,
  onPageSizeChange
}) {
  return (
    <footer className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-500">
          Itens por página
        </span>

        <select
          value={pageSize}
          onChange={(event) =>
            onPageSizeChange(
              Number(event.target.value)
            )
          }
          className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 outline-none focus:border-emerald-500"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs text-slate-500">
          {firstResult} a {lastResult} de{' '}
          {totalItems}
        </span>

        <button
          type="button"
          disabled={page <= 1}
          onClick={() =>
            onPageChange(page - 1)
          }
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={17} />
        </button>

        <span className="min-w-20 text-center text-xs font-black text-slate-700">
          {page} de {totalPages}
        </span>

        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() =>
            onPageChange(page + 1)
          }
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </footer>
  );
}

function DeleteConfirmationDialog({
  confirmation,
  onCancel,
  onConfirm
}) {
  const multiple =
    confirmation.type === 'multiple';

  const title = multiple
    ? `Excluir ${confirmation.total} atrações?`
    : `Excluir ${confirmation.attraction.name}?`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <button
        type="button"
        onClick={onCancel}
        className="absolute inset-0"
        aria-label="Fechar confirmação"
      />

      <div className="relative z-10 w-full max-w-md rounded-[28px] border border-white/50 bg-white p-6 shadow-2xl">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
          <Trash2 size={21} />
        </span>

        <h2 className="mt-5 text-xl font-black text-slate-950">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Esta ação removerá o cadastro da listagem. Em
          produção, atrações com vendas ou ingressos emitidos
          deverão ser apenas inativadas.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="h-11 flex-1 rounded-2xl border border-slate-200 text-sm font-black text-slate-600 transition hover:bg-slate-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="h-11 flex-1 rounded-2xl bg-rose-600 text-sm font-black text-white transition hover:bg-rose-700"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}

function formatNumber(value) {
  return new Intl.NumberFormat(
    'pt-BR'
  ).format(Number(value || 0));
}

function formatDate(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date(value));
}
