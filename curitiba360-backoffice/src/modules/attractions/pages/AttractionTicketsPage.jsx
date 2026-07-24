import { useMemo, useState } from 'react';
import {
  Ban,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Edit3,
  Eye,
  Filter,
  Mail,
  MessageSquareText,
  MoreHorizontal,
  Package,
  Plus,
  RefreshCw,
  Search,
  Send,
  Ticket,
  TicketCheck,
  Trash2,
  UserRound,
  Users,
  X,
} from 'lucide-react';

const INITIAL_TICKETS = [
  {
    id: '2798',
    category: 'Estudante',
    status: 'active',
    price: 10,
    quantity: 50,
    sold: 34,
    reserved: 4,
    batch: '001',
    customMessage: 'Campanha promocional',
    expirationHours: 4,
  },
  {
    id: '2799',
    category: 'Adulto',
    status: 'active',
    price: 25,
    quantity: 150,
    sold: 96,
    reserved: 8,
    batch: '001',
    customMessage: 'Ingresso adulto',
    expirationHours: 4,
  },
  {
    id: '2800',
    category: 'Meia',
    status: 'active',
    price: 12.5,
    quantity: 100,
    sold: 61,
    reserved: 5,
    batch: '001',
    customMessage: 'Apresente o comprovante',
    expirationHours: 2,
  },
  {
    id: '2801',
    category: 'Cortesia',
    status: 'inactive',
    price: 0,
    quantity: 30,
    sold: 12,
    reserved: 0,
    batch: '002',
    customMessage: 'Uso exclusivo de parceiros',
    expirationHours: 1,
  },
  {
    id: '2802',
    category: 'Morador de Curitiba',
    status: 'active',
    price: 10,
    quantity: 200,
    sold: 148,
    reserved: 11,
    batch: '003',
    customMessage: 'Comprove residência em Curitiba',
    expirationHours: 4,
  },
  {
    id: '2803',
    category: 'Infantil',
    status: 'inactive',
    price: 8,
    quantity: 80,
    sold: 22,
    reserved: 2,
    batch: '002',
    customMessage: 'Válido para crianças até 12 anos',
    expirationHours: 3,
  },
];

const TICKET_DETAILS = {
  ticketCode: '1234567890',

  order: {
    code: '1234567890',
    status: 'Finalizado',
    paymentMethod: 'Cartão de crédito',
    seller: 'Parque Jaime Lerner',
    createdAt: '2025-10-01T10:00:00',
    notes: 'Pedido de morador de Curitiba',
  },

  customer: {
    name: 'João da Silva',
    email: 'joao@gmail.com',
    document: '123.412.341-12',
    phone: '(41) 3030-3030',
    mobile: '(41) 99999-9999',
  },

  ticket: {
    code: '1234567890',
    attraction: 'Ópera de Arame',
    category: 'Morador de Curitiba Adulto',
    location: 'Entrada',
    pointOfSale: 'Site',
    status: 'Vendido',
    createdAt: '2025-10-01T10:00:00',
    printedAt: '2025-10-01T10:00:00',
    price: 10,
    administrativeFee: 0.5,
    total: 10.5,
  },
};

const EMPTY_FORM = {
  category: '',
  price: '',
  quantity: '',
  batch: '',
  customMessage: '',
  expirationHours: 4,
  status: 'active',
};

const STATUS_TABS = [
  { value: 'active', label: 'Ativos' },
  { value: 'inactive', label: 'Inativos' },
  { value: 'all', label: 'Todos' },
];

export default function AttractionTicketsPage() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);

  const [search, setSearch] = useState('');
  const [statusTab, setStatusTab] = useState('active');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [batchFilter, setBatchFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const [selectedIds, setSelectedIds] = useState([]);
  const [openedMenuId, setOpenedMenuId] = useState(null);

  const [formModal, setFormModal] = useState(null);
  const [detailsModal, setDetailsModal] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const categories = useMemo(
    () => [...new Set(tickets.map((ticket) => ticket.category))].sort(),
    [tickets],
  );

  const batches = useMemo(
    () => [...new Set(tickets.map((ticket) => ticket.batch))].sort(),
    [tickets],
  );

  const filteredTickets = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('pt-BR');

    return tickets.filter((ticket) => {
      const matchesStatus =
        statusTab === 'all' || ticket.status === statusTab;

      const matchesCategory =
        categoryFilter === 'all' || ticket.category === categoryFilter;

      const matchesBatch =
        batchFilter === 'all' || ticket.batch === batchFilter;

      const matchesSearch =
        !normalizedSearch ||
        [
          ticket.id,
          ticket.category,
          ticket.batch,
          ticket.customMessage,
        ].some((value) =>
          String(value)
            .toLocaleLowerCase('pt-BR')
            .includes(normalizedSearch),
        );

      return (
        matchesStatus &&
        matchesCategory &&
        matchesBatch &&
        matchesSearch
      );
    });
  }, [batchFilter, categoryFilter, search, statusTab, tickets]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTickets.length / pageSize),
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedTickets = useMemo(() => {
    const start = (currentPage - 1) * pageSize;

    return filteredTickets.slice(start, start + pageSize);
  }, [currentPage, filteredTickets, pageSize]);

  const selectedTickets = useMemo(
    () => tickets.filter((ticket) => selectedIds.includes(ticket.id)),
    [selectedIds, tickets],
  );

  const allCurrentPageSelected =
    paginatedTickets.length > 0 &&
    paginatedTickets.every((ticket) => selectedIds.includes(ticket.id));

  const totals = useMemo(() => {
    return tickets.reduce(
      (result, ticket) => {
        result.total += ticket.quantity;
        result.sold += ticket.sold;
        result.reserved += ticket.reserved;
        result.available += Math.max(
          ticket.quantity - ticket.sold - ticket.reserved,
          0,
        );

        return result;
      },
      {
        total: 0,
        sold: 0,
        reserved: 0,
        available: 0,
      },
    );
  }, [tickets]);

  function openCreateModal() {
    setFormModal({
      mode: 'create',
      ticket: EMPTY_FORM,
    });
  }

  function openEditModal(ticket) {
    setOpenedMenuId(null);

    setFormModal({
      mode: 'edit',
      ticket: {
        ...ticket,
        price: String(ticket.price),
        quantity: String(ticket.quantity),
        expirationHours: String(ticket.expirationHours),
      },
    });
  }

  function saveTicket(formData) {
    if (formModal.mode === 'edit') {
      setTickets((current) =>
        current.map((ticket) =>
          ticket.id === formModal.ticket.id
            ? {
                ...ticket,
                ...formData,
                price: Number(formData.price),
                quantity: Number(formData.quantity),
                expirationHours: Number(formData.expirationHours),
              }
            : ticket,
        ),
      );
    } else {
      const nextId = String(
        Math.max(...tickets.map((ticket) => Number(ticket.id)), 0) + 1,
      );

      setTickets((current) => [
        {
          id: nextId,
          category: formData.category,
          price: Number(formData.price),
          quantity: Number(formData.quantity),
          batch: formData.batch,
          customMessage: formData.customMessage,
          expirationHours: Number(formData.expirationHours),
          status: formData.status,
          sold: 0,
          reserved: 0,
        },
        ...current,
      ]);
    }

    setFormModal(null);
    setStatusTab('all');
    setPage(1);
  }

  function toggleTicketStatus(ticketId) {
    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              status: ticket.status === 'active' ? 'inactive' : 'active',
            }
          : ticket,
      ),
    );

    setOpenedMenuId(null);
  }

  function changeSelectedStatus(status) {
    setTickets((current) =>
      current.map((ticket) =>
        selectedIds.includes(ticket.id)
          ? {
              ...ticket,
              status,
            }
          : ticket,
      ),
    );

    setSelectedIds([]);
  }

  function deleteTicket(ticketId) {
    setTickets((current) =>
      current.filter((ticket) => ticket.id !== ticketId),
    );

    setSelectedIds((current) =>
      current.filter((id) => id !== ticketId),
    );

    setDeleteConfirmation(null);
    setOpenedMenuId(null);
  }

  function deleteSelectedTickets() {
    setTickets((current) =>
      current.filter((ticket) => !selectedIds.includes(ticket.id)),
    );

    setSelectedIds([]);
    setDeleteConfirmation(null);
  }

  function toggleSelection(ticketId) {
    setSelectedIds((current) =>
      current.includes(ticketId)
        ? current.filter((id) => id !== ticketId)
        : [...current, ticketId],
    );
  }

  function toggleCurrentPage() {
    const currentPageIds = paginatedTickets.map((ticket) => ticket.id);

    setSelectedIds((current) => {
      if (allCurrentPageSelected) {
        return current.filter((id) => !currentPageIds.includes(id));
      }

      return [...new Set([...current, ...currentPageIds])];
    });
  }

  function clearFilters() {
    setSearch('');
    setStatusTab('all');
    setCategoryFilter('all');
    setBatchFilter('all');
    setSelectedIds([]);
    setPage(1);
  }

  const firstResult =
    filteredTickets.length === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const lastResult = Math.min(
    currentPage * pageSize,
    filteredTickets.length,
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto w-full max-w-[1700px] px-4 py-6 sm:px-6 lg:px-8">
        <PageHeader onCreate={openCreateModal} />

        <TicketKpis totals={totals} />

        <section className="mt-6 overflow-visible rounded-[28px] border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <StatusTabs
              activeTab={statusTab}
              tickets={tickets}
              onChange={(value) => {
                setStatusTab(value);
                setSelectedIds([]);
                setPage(1);
              }}
            />

            <div className="mt-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <SearchInput
                value={search}
                onChange={(value) => {
                  setSearch(value);
                  setSelectedIds([]);
                  setPage(1);
                }}
              />

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setShowFilters((current) => !current)}
                  className={[
                    'inline-flex h-11 items-center gap-2 rounded-2xl border px-4 text-xs font-black transition',
                    showFilters ||
                    categoryFilter !== 'all' ||
                    batchFilter !== 'all'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
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
                  className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-600 transition hover:bg-slate-50"
                >
                  <RefreshCw size={16} />
                  Atualizar
                </button>
              </div>
            </div>

            {showFilters && (
              <FiltersPanel
                categoryFilter={categoryFilter}
                batchFilter={batchFilter}
                categories={categories}
                batches={batches}
                onCategoryChange={(value) => {
                  setCategoryFilter(value);
                  setPage(1);
                }}
                onBatchChange={(value) => {
                  setBatchFilter(value);
                  setPage(1);
                }}
                onClear={clearFilters}
              />
            )}
          </div>

          {selectedIds.length > 0 && (
            <BulkActions
              selectedTickets={selectedTickets}
              onActivate={() => changeSelectedStatus('active')}
              onDeactivate={() => changeSelectedStatus('inactive')}
              onDelete={() =>
                setDeleteConfirmation({
                  type: 'multiple',
                  total: selectedIds.length,
                })
              }
              onClear={() => setSelectedIds([])}
            />
          )}

          <TicketsTable
            tickets={paginatedTickets}
            selectedIds={selectedIds}
            allSelected={allCurrentPageSelected}
            openedMenuId={openedMenuId}
            onToggleAll={toggleCurrentPage}
            onToggleSelection={toggleSelection}
            onOpenMenu={setOpenedMenuId}
            onView={(ticket) => {
              setOpenedMenuId(null);
              setDetailsModal({
                ...TICKET_DETAILS,
                ticket: {
                  ...TICKET_DETAILS.ticket,
                  category: ticket.category,
                  price: ticket.price,
                  total: ticket.price + 0.5,
                },
              });
            }}
            onEdit={openEditModal}
            onToggleStatus={(ticket) => toggleTicketStatus(ticket.id)}
            onDelete={(ticket) => {
              setOpenedMenuId(null);
              setDeleteConfirmation({
                type: 'single',
                ticket,
              });
            }}
          />

          <Pagination
            page={currentPage}
            pageSize={pageSize}
            totalPages={totalPages}
            totalItems={filteredTickets.length}
            firstResult={firstResult}
            lastResult={lastResult}
            onPageChange={setPage}
            onPageSizeChange={(value) => {
              setPageSize(value);
              setPage(1);
              setSelectedIds([]);
            }}
          />
        </section>
      </main>

      {formModal && (
        <TicketFormModal
          mode={formModal.mode}
          initialData={formModal.ticket}
          onClose={() => setFormModal(null)}
          onSave={saveTicket}
        />
      )}

      {detailsModal && (
        <TicketDetailsModal
          details={detailsModal}
          onClose={() => setDetailsModal(null)}
        />
      )}

      {deleteConfirmation && (
        <DeleteConfirmationModal
          confirmation={deleteConfirmation}
          onClose={() => setDeleteConfirmation(null)}
          onConfirm={() => {
            if (deleteConfirmation.type === 'single') {
              deleteTicket(deleteConfirmation.ticket.id);
              return;
            }

            deleteSelectedTickets();
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
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
          <Ticket size={15} />
          Parque Jaime Lerner
        </div>

        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          Gestão de ingressos
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Configure categorias, lotes, quantidades, preços e condições
          de reserva dos ingressos.
        </p>
      </div>

      <button
        type="button"
        onClick={onCreate}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
      >
        <Plus size={18} />
        Adicionar ingresso
      </button>
    </header>
  );
}

function TicketKpis({ totals }) {
  const cards = [
    {
      label: 'Ingressos cadastrados',
      value: formatNumber(totals.total),
      helper: 'Capacidade total dos lotes',
      icon: Package,
    },
    {
      label: 'Ingressos vendidos',
      value: formatNumber(totals.sold),
      helper: 'Vendas confirmadas',
      icon: TicketCheck,
    },
    {
      label: 'Disponíveis',
      value: formatNumber(totals.available),
      helper: 'Liberados para novas vendas',
      icon: Check,
    },
    {
      label: 'Reservados',
      value: formatNumber(totals.reserved),
      helper: 'Aguardando pagamento',
      icon: Clock3,
    },
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

              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
                <Icon size={20} />
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}

function StatusTabs({ activeTab, tickets, onChange }) {
  function getTotal(status) {
    if (status === 'all') {
      return tickets.length;
    }

    return tickets.filter((ticket) => ticket.status === status).length;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {STATUS_TABS.map((tab) => {
        const active = activeTab === tab.value;

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={[
              'inline-flex h-10 items-center gap-2 rounded-2xl px-4 text-xs font-black transition',
              active
                ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/10'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800',
            ].join(' ')}
          >
            {tab.label}

            <span
              className={[
                'rounded-full px-2 py-0.5 text-[10px]',
                active
                  ? 'bg-white/15 text-white'
                  : 'bg-white text-slate-500',
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

function SearchInput({ value, onChange }) {
  return (
    <div className="relative w-full xl:max-w-xl">
      <Search
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Pesquisar por categoria, ID, lote ou mensagem"
        className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

function FiltersPanel({
  categoryFilter,
  batchFilter,
  categories,
  batches,
  onCategoryChange,
  onBatchChange,
  onClear,
}) {
  return (
    <div className="mt-4 grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_auto]">
      <SelectField
        label="Categoria"
        value={categoryFilter}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="all">Todas as categorias</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </SelectField>

      <SelectField
        label="Lote"
        value={batchFilter}
        onChange={(event) => onBatchChange(event.target.value)}
      >
        <option value="all">Todos os lotes</option>

        {batches.map((batch) => (
          <option key={batch} value={batch}>
            Lote {batch}
          </option>
        ))}
      </SelectField>

      <div className="flex items-end">
        <button
          type="button"
          onClick={onClear}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-600 transition hover:bg-slate-100 xl:w-auto"
        >
          <X size={16} />
          Limpar filtros
        </button>
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, children }) {
  return (
    <label>
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
  selectedTickets,
  onActivate,
  onDeactivate,
  onDelete,
  onClear,
}) {
  const canActivate = selectedTickets.some(
    (ticket) => ticket.status !== 'active',
  );

  const canDeactivate = selectedTickets.some(
    (ticket) => ticket.status === 'active',
  );

  return (
    <div className="flex flex-col gap-3 border-b border-emerald-100 bg-emerald-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-emerald-600 px-3 text-xs font-black text-white">
          {selectedTickets.length}
        </span>

        <div>
          <p className="text-xs font-black text-emerald-900">
            Ingressos selecionados
          </p>

          <p className="text-[11px] text-emerald-700">
            Aplique uma ação para todos os registros selecionados.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
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
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

function TicketsTable({
  tickets,
  selectedIds,
  allSelected,
  openedMenuId,
  onToggleAll,
  onToggleSelection,
  onOpenMenu,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}) {
  if (!tickets.length) {
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
              'ID',
              'Categoria',
              'Status',
              'Valor',
              'Quantidade',
              'Vendidos',
              'Lote',
              'Mensagem customizada',
              'Expiração',
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
          {tickets.map((ticket) => {
            const selected = selectedIds.includes(ticket.id);

            return (
              <tr
                key={ticket.id}
                className={[
                  'border-t border-slate-100 transition',
                  selected
                    ? 'bg-emerald-50/50'
                    : 'hover:bg-slate-50/80',
                ].join(' ')}
              >
                <td className="px-5 py-5">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onToggleSelection(ticket.id)}
                    className="h-4 w-4 rounded border-slate-300 accent-emerald-600"
                  />
                </td>

                <td className="px-4 py-5 text-xs font-black text-slate-600">
                  {ticket.id}
                </td>

                <td className="px-4 py-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                      <Ticket size={16} />
                    </span>

                    <span className="text-xs font-black text-slate-800">
                      {ticket.category}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-5">
                  <StatusBadge status={ticket.status} />
                </td>

                <td className="px-4 py-5 text-xs font-black text-slate-700">
                  {formatCurrency(ticket.price)}
                </td>

                <td className="px-4 py-5">
                  <p className="text-xs font-black text-slate-700">
                    {formatNumber(ticket.quantity)}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    {formatNumber(
                      Math.max(
                        ticket.quantity -
                          ticket.sold -
                          ticket.reserved,
                        0,
                      ),
                    )}{' '}
                    disponíveis
                  </p>
                </td>

                <td className="px-4 py-5">
                  <p className="text-xs font-black text-emerald-700">
                    {formatNumber(ticket.sold)}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-400">
                    {formatNumber(ticket.reserved)} reservados
                  </p>
                </td>

                <td className="px-4 py-5">
                  <span className="rounded-xl bg-slate-100 px-3 py-1.5 text-[10px] font-black text-slate-600">
                    {ticket.batch}
                  </span>
                </td>

                <td className="max-w-[230px] px-4 py-5">
                  <p className="truncate text-xs font-semibold text-slate-600">
                    {ticket.customMessage || 'Sem mensagem'}
                  </p>
                </td>

                <td className="px-4 py-5">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-600">
                    <Clock3 size={14} className="text-slate-400" />
                    {ticket.expirationHours}h
                  </div>
                </td>

                <td className="relative px-4 py-5">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenMenu(
                        openedMenuId === ticket.id ? null : ticket.id,
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    <MoreHorizontal size={19} />
                  </button>

                  {openedMenuId === ticket.id && (
                    <TicketActionsMenu
                      ticket={ticket}
                      onView={() => onView(ticket)}
                      onEdit={() => onEdit(ticket)}
                      onToggleStatus={() => onToggleStatus(ticket)}
                      onDelete={() => onDelete(ticket)}
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

function TicketActionsMenu({
  ticket,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}) {
  return (
    <div className="absolute right-4 top-14 z-30 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
      <MenuButton icon={Eye} label="Ver detalhes" onClick={onView} />

      <MenuButton icon={Edit3} label="Editar ingresso" onClick={onEdit} />

      <MenuButton
        icon={ticket.status === 'active' ? Ban : Check}
        label={
          ticket.status === 'active'
            ? 'Inativar ingresso'
            : 'Ativar ingresso'
        }
        onClick={onToggleStatus}
      />

      <div className="my-2 border-t border-slate-100" />

      <MenuButton
        icon={Trash2}
        label="Excluir ingresso"
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
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-bold transition',
        danger
          ? 'text-rose-600 hover:bg-rose-50'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
      ].join(' ')}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

function StatusBadge({ status }) {
  const active = status === 'active';

  return (
    <span
      className={[
        'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black',
        active
          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
          : 'border-slate-200 bg-slate-100 text-slate-500',
      ].join(' ')}
    >
      <span
        className={[
          'h-1.5 w-1.5 rounded-full',
          active ? 'bg-emerald-500' : 'bg-slate-400',
        ].join(' ')}
      />

      {active ? 'Ativo' : 'Inativo'}
    </span>
  );
}

function TicketFormModal({ mode, initialData, onClose, onSave }) {
  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: '',
    }));
  }

  function validate() {
    const nextErrors = {};

    if (!form.category.trim()) {
      nextErrors.category = 'Informe a categoria.';
    }

    if (form.price === '' || Number(form.price) < 0) {
      nextErrors.price = 'Informe um valor válido.';
    }

    if (!form.quantity || Number(form.quantity) <= 0) {
      nextErrors.quantity = 'Informe uma quantidade maior que zero.';
    }

    if (!form.batch.trim()) {
      nextErrors.batch = 'Informe o número do lote.';
    }

    if (
      !form.expirationHours ||
      Number(form.expirationHours) <= 0
    ) {
      nextErrors.expirationHours =
        'Informe um tempo de expiração válido.';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSave(form);
  }

  return (
    <ModalShell onClose={onClose} maxWidth="max-w-3xl">
      <form onSubmit={handleSubmit}>
        <ModalHeader
          title={mode === 'create' ? 'Novo ingresso' : 'Editar ingresso'}
          description="Preencha os campos obrigatórios para configurar o ingresso."
          onClose={onClose}
        />

        <div className="max-h-[70vh] space-y-5 overflow-y-auto p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Categoria"
              required
              error={errors.category}
            >
              <input
                value={form.category}
                onChange={(event) =>
                  updateField('category', event.target.value)
                }
                placeholder="Ex.: Adulto"
                className={inputClass(errors.category)}
              />
            </FormField>

            <FormField label="Valor" required error={errors.price}>
              <div className="relative">
                <CircleDollarSign
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(event) =>
                    updateField('price', event.target.value)
                  }
                  placeholder="0,00"
                  className={`${inputClass(errors.price)} pl-11`}
                />
              </div>
            </FormField>

            <FormField label="Lote" required error={errors.batch}>
              <div className="relative">
                <Package
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={form.batch}
                  onChange={(event) =>
                    updateField('batch', event.target.value)
                  }
                  placeholder="001"
                  className={`${inputClass(errors.batch)} pl-11`}
                />
              </div>
            </FormField>

            <FormField
              label="Quantidade"
              required
              error={errors.quantity}
            >
              <div className="relative">
                <Users
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="number"
                  min="1"
                  value={form.quantity}
                  onChange={(event) =>
                    updateField('quantity', event.target.value)
                  }
                  placeholder="50"
                  className={`${inputClass(errors.quantity)} pl-11`}
                />
              </div>
            </FormField>

            <FormField
              label="Expiração do pedido"
              required
              error={errors.expirationHours}
            >
              <div className="relative">
                <Clock3
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="number"
                  min="1"
                  value={form.expirationHours}
                  onChange={(event) =>
                    updateField('expirationHours', event.target.value)
                  }
                  placeholder="4"
                  className={`${inputClass(
                    errors.expirationHours,
                  )} pl-11 pr-12`}
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">
                  horas
                </span>
              </div>
            </FormField>

            <FormField label="Status">
              <select
                value={form.status}
                onChange={(event) =>
                  updateField('status', event.target.value)
                }
                className={inputClass()}
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </FormField>
          </div>

          <FormField label="Mensagem customizada">
            <div className="relative">
              <MessageSquareText
                size={17}
                className="absolute left-4 top-4 text-slate-400"
              />

              <textarea
                rows={4}
                value={form.customMessage}
                onChange={(event) =>
                  updateField('customMessage', event.target.value)
                }
                placeholder="Mensagem que será exibida no ingresso"
                className={`${inputClass()} h-auto resize-none py-3 pl-11`}
              />
            </div>
          </FormField>
        </div>

        <ModalFooter
          onCancel={onClose}
          submitLabel={mode === 'create' ? 'Salvar ingresso' : 'Salvar alterações'}
        />
      </form>
    </ModalShell>
  );
}

function TicketDetailsModal({ details, onClose }) {
  return (
    <ModalShell onClose={onClose} maxWidth="max-w-6xl">
      <ModalHeader
        title={`Detalhes do ingresso ${details.ticketCode}`}
        description="Consulte as informações do pedido, cliente e ingresso emitido."
        onClose={onClose}
      />

      <div className="max-h-[76vh] space-y-7 overflow-y-auto p-6">
        <DetailsSection
          title="Pedido"
          icon={Package}
          items={[
            ['Código', details.order.code],
            ['Status', details.order.status],
            ['Forma de pagamento', details.order.paymentMethod],
            ['Vendedor', details.order.seller],
            ['Data e hora', formatDateTime(details.order.createdAt)],
            ['Observações', details.order.notes],
          ]}
        />

        <DetailsSection
          title="Dados do cliente"
          icon={UserRound}
          items={[
            ['Nome', details.customer.name],
            ['E-mail', details.customer.email],
            ['CPF/CNPJ', details.customer.document],
            ['Telefone', details.customer.phone],
            ['Celular', details.customer.mobile],
          ]}
        />

        <DetailsSection
          title="Dados do ingresso"
          icon={Ticket}
          items={[
            ['Código', details.ticket.code],
            ['Atração', details.ticket.attraction],
            ['Categoria', details.ticket.category],
            ['Localização', details.ticket.location],
            ['PDV', details.ticket.pointOfSale],
            ['Status', details.ticket.status],
            ['Data de criação', formatDateTime(details.ticket.createdAt)],
            ['Data de impressão', formatDateTime(details.ticket.printedAt)],
            ['Valor', formatCurrency(details.ticket.price)],
            [
              'Taxa administrativa',
              formatCurrency(details.ticket.administrativeFee),
            ],
            ['Valor total', formatCurrency(details.ticket.total)],
          ]}
        />

        <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-5">
          <ActionButton icon={Mail} label="Reenviar por e-mail" />
          <ActionButton icon={Send} label="Enviar ingresso" />
          <ActionButton icon={Ban} label="Bloquear ingresso" danger />
        </div>
      </div>

      <div className="flex justify-end border-t border-slate-200 p-5">
        <button
          type="button"
          onClick={onClose}
          className="h-11 rounded-2xl bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-slate-800"
        >
          Fechar
        </button>
      </div>
    </ModalShell>
  );
}

function DetailsSection({ title, icon: Icon, items }) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <Icon size={18} />
        </span>

        <h3 className="text-lg font-black text-slate-900">{title}</h3>
      </div>

      <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([label, value]) => (
          <div
            key={label}
            className="min-h-24 border-b border-r border-slate-200 p-4"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">
              {label}
            </p>

            <p className="mt-2 break-words text-sm font-bold leading-6 text-slate-700">
              {value || '-'}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ActionButton({ icon: Icon, label, danger = false }) {
  return (
    <button
      type="button"
      className={[
        'inline-flex h-10 items-center gap-2 rounded-2xl border px-4 text-xs font-black transition',
        danger
          ? 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100'
          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
      ].join(' ')}
    >
      <Icon size={15} />
      {label}
    </button>
  );
}

function DeleteConfirmationModal({
  confirmation,
  onClose,
  onConfirm,
}) {
  const title =
    confirmation.type === 'multiple'
      ? `Excluir ${confirmation.total} ingressos?`
      : `Excluir o ingresso ${confirmation.ticket.category}?`;

  return (
    <ModalShell onClose={onClose} maxWidth="max-w-md">
      <div className="p-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
          <Trash2 size={21} />
        </span>

        <h2 className="mt-5 text-xl font-black text-slate-950">
          {title}
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Registros que já possuem vendas devem ser apenas inativados.
          A exclusão não poderá ser desfeita.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
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
    </ModalShell>
  );
}

function ModalShell({ children, onClose, maxWidth }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0"
        aria-label="Fechar modal"
      />

      <div
        className={`relative z-10 w-full ${maxWidth} overflow-hidden rounded-[28px] border border-white/50 bg-white shadow-2xl`}
      >
        {children}
      </div>
    </div>
  );
}

function ModalHeader({ title, description, onClose }) {
  return (
    <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
      <div>
        <h2 className="text-xl font-black text-slate-950">{title}</h2>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
      >
        <X size={18} />
      </button>
    </header>
  );
}

function ModalFooter({ onCancel, submitLabel }) {
  return (
    <footer className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
      <button
        type="button"
        onClick={onCancel}
        className="h-11 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-600 transition hover:bg-slate-100"
      >
        Descartar
      </button>

      <button
        type="submit"
        className="inline-flex h-11 items-center gap-2 rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white transition hover:bg-emerald-700"
      >
        <Check size={17} />
        {submitLabel}
      </button>
    </footer>
  );
}

function FormField({ label, required = false, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black text-slate-700">
        {label}
        {required && <span className="ml-1 text-rose-500">*</span>}
      </span>

      {children}

      {error && (
        <span className="mt-1.5 block text-[11px] font-bold text-rose-600">
          {error}
        </span>
      )}
    </label>
  );
}

function inputClass(error = '') {
  return [
    'h-12 w-full rounded-2xl border bg-white px-4 text-sm font-semibold text-slate-800 outline-none transition placeholder:text-slate-400',
    error
      ? 'border-rose-400 ring-4 ring-rose-500/10'
      : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10',
  ].join(' ');
}

function Pagination({
  page,
  pageSize,
  totalPages,
  totalItems,
  firstResult,
  lastResult,
  onPageChange,
  onPageSizeChange,
}) {
  return (
    <footer className="flex flex-col gap-4 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-500">Itens por página</span>

        <select
          value={pageSize}
          onChange={(event) =>
            onPageSizeChange(Number(event.target.value))
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
          {firstResult} a {lastResult} de {totalItems}
        </span>

        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
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
          onClick={() => onPageChange(page + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </footer>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-20 text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
        <Ticket size={30} />
      </span>

      <h3 className="mt-5 text-base font-black text-slate-900">
        Nenhum ingresso encontrado
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Altere os filtros ou cadastre uma nova categoria de ingresso.
      </p>
    </div>
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value || 0));
}

function formatNumber(value) {
  return new Intl.NumberFormat('pt-BR').format(Number(value || 0));
}

function formatDateTime(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}
