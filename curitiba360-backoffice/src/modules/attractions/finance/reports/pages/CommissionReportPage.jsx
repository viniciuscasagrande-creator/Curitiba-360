import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  BadgePercent,
  Banknote,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleDollarSign,
  HandCoins,
  ReceiptText,
} from 'lucide-react';

import ReportHeader from '../components/ReportHeader';
import ReportTable from '../components/ReportTable';
import CommissionReportFilters from '../components/CommissionReportFilters';
import CommissionStatusBadge from '../components/CommissionStatusBadge';

import {
  commissionChannelOptions,
  commissionPaymentOptions,
  commissionReportMock,
  commissionStatusOptions,
} from '../data/financeReportsMock';

import {
  exportCsv,
  formatCurrency,
  formatDateTime,
  sumBy,
} from '../utils/reportUtils';

const INITIAL_FILTERS = {
  startDate: '2026-01-01',
  endDate: '2026-01-31',
  allPeriod: true,
  seller: 'all',
  agency: 'all',
  channel: 'all',
  category: 'all',
  paymentType: 'all',
  status: 'all',
  search: '',
};

const PAGE_SIZE_OPTIONS = [10, 20, 50];

export default function CommissionReportPage() {
  const [filters, setFilters] = useState(
    INITIAL_FILTERS,
  );

  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] =
    useState(10);

  const sellerOptions = useMemo(
    () =>
      uniqueOptions(
        commissionReportMock,
        'seller',
      ),
    [],
  );

  const agencyOptions = useMemo(
    () =>
      uniqueOptions(
        commissionReportMock,
        'agency',
      ),
    [],
  );

  const categoryOptions = useMemo(
    () =>
      uniqueOptions(
        commissionReportMock,
        'category',
      ),
    [],
  );

  const filteredRows = useMemo(() => {
    const searchValue = filters.search
      .trim()
      .toLocaleLowerCase('pt-BR');

    return commissionReportMock.filter(
      (row) => {
        const matchesSeller =
          filters.seller === 'all' ||
          row.seller === filters.seller;

        const matchesAgency =
          filters.agency === 'all' ||
          row.agency === filters.agency;

        const matchesChannel =
          filters.channel === 'all' ||
          row.channel === filters.channel;

        const matchesCategory =
          filters.category === 'all' ||
          row.category === filters.category;

        const matchesPayment =
          filters.paymentType === 'all' ||
          row.paymentType ===
            filters.paymentType;

        const matchesStatus =
          filters.status === 'all' ||
          row.status === filters.status;

        const matchesSearch =
          !searchValue ||
          [row.seller, row.agency].some(
            (value) =>
              String(value)
                .toLocaleLowerCase('pt-BR')
                .includes(searchValue),
          );

        if (
          !matchesSeller ||
          !matchesAgency ||
          !matchesChannel ||
          !matchesCategory ||
          !matchesPayment ||
          !matchesStatus ||
          !matchesSearch
        ) {
          return false;
        }

        if (filters.allPeriod) {
          return true;
        }

        const rowDate = new Date(row.date);

        const startDate = new Date(
          `${filters.startDate}T00:00:00`,
        );

        const endDate = new Date(
          `${filters.endDate}T23:59:59`,
        );

        return (
          rowDate >= startDate &&
          rowDate <= endDate
        );
      },
    );
  }, [filters]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredRows.length / pageSize,
    ),
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const firstIndex =
    (page - 1) * pageSize;

  const visibleRows = filteredRows.slice(
    firstIndex,
    firstIndex + pageSize,
  );

  const totalQuantity = sumBy(
    filteredRows,
    'quantity',
  );

  const totalGrossValue = sumBy(
    filteredRows,
    'grossValue',
  );

  const totalCommissionValue = sumBy(
    filteredRows,
    'commissionValue',
  );

  const totalNetValue = sumBy(
    filteredRows,
    'netValue',
  );

  const averageCommissionPercent =
    calculateWeightedCommissionPercent(
      totalCommissionValue,
      totalGrossValue,
    );

  const columns = [
    {
      key: 'date',
      label: 'Data',
      render: (row) =>
        formatDateTime(row.date),
    },
    {
      key: 'seller',
      label: 'Vendedor',
    },
    {
      key: 'agency',
      label: 'Agência',
    },
    {
      key: 'channel',
      label: 'Canal',
    },
    {
      key: 'category',
      label: 'Categoria',
    },
    {
      key: 'paymentType',
      label: 'Pagamento',
    },
    {
      key: 'quantity',
      label: 'Qtd.',
    },
    {
      key: 'grossValue',
      label: 'Valor bruto',
      render: (row) =>
        formatCurrency(row.grossValue),
    },
    {
      key: 'commissionPercent',
      label: 'Percentual',
      render: (row) =>
        formatPercent(
          row.commissionPercent,
        ),
    },
    {
      key: 'commissionValue',
      label: 'Comissão',
      render: (row) => (
        <strong className="text-amber-700">
          {formatCurrency(
            row.commissionValue,
          )}
        </strong>
      ),
    },
    {
      key: 'netValue',
      label: 'Valor líquido',
      render: (row) => (
        <strong className="text-emerald-700">
          {formatCurrency(row.netValue)}
        </strong>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <CommissionStatusBadge
          status={row.status}
        />
      ),
    },
  ];

  function handleFiltersChange(
    nextFilters,
  ) {
    setFilters(nextFilters);
    setPage(1);
  }

  function handleResetFilters() {
    setFilters(INITIAL_FILTERS);
    setPage(1);
  }

  function handleExportXlsx() {
    exportCsv(
      'relatorio-comissoes-curitiba360.csv',
      [
        [
          'Data',
          'Vendedor',
          'Agência',
          'Canal',
          'Categoria',
          'Pagamento',
          'Quantidade',
          'Valor bruto',
          'Percentual',
          'Comissão',
          'Valor líquido',
          'Status',
        ],
        ...filteredRows.map((row) => [
          row.date,
          row.seller,
          row.agency,
          row.channel,
          row.category,
          row.paymentType,
          row.quantity,
          row.grossValue,
          row.commissionPercent,
          row.commissionValue,
          row.netValue,
          row.status,
        ]),
        [
          'TOTAL',
          '',
          '',
          '',
          '',
          '',
          totalQuantity,
          totalGrossValue,
          averageCommissionPercent,
          totalCommissionValue,
          totalNetValue,
          '',
        ],
      ],
    );
  }

  function openPrintPage() {
    const currentPath =
      window.location.pathname.replace(
        /\/$/,
        '',
      );

    window.open(
      `${currentPath}/impressao`,
      '_blank',
      'noopener,noreferrer',
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-[1800px] px-4 py-7 sm:px-6 lg:px-8">
        <ReportHeader
          title="Relatório de Comissões"
          description="Fechamento de comissões por vendedor, agência, canal e categoria."
          onPrint={openPrintPage}
          onExportXlsx={handleExportXlsx}
          onExportPdf={openPrintPage}
        />

        <CommissionReportFilters
          filters={filters}
          sellerOptions={sellerOptions}
          agencyOptions={agencyOptions}
          channelOptions={
            commissionChannelOptions
          }
          categoryOptions={categoryOptions}
          paymentOptions={
            commissionPaymentOptions
          }
          statusOptions={
            commissionStatusOptions
          }
          onChange={handleFiltersChange}
          onReset={handleResetFilters}
        />

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <SummaryCard
            icon={ReceiptText}
            label="Quantidade vendida"
            value={totalQuantity}
            tone="slate"
          />

          <SummaryCard
            icon={CircleDollarSign}
            label="Valor bruto"
            value={formatCurrency(
              totalGrossValue,
            )}
            tone="blue"
          />

          <SummaryCard
            icon={HandCoins}
            label="Comissões"
            value={formatCurrency(
              totalCommissionValue,
            )}
            tone="amber"
          />

          <SummaryCard
            icon={Banknote}
            label="Valor líquido"
            value={formatCurrency(
              totalNetValue,
            )}
            tone="emerald"
          />

          <SummaryCard
            icon={BadgePercent}
            label="Percentual médio"
            value={formatPercent(
              averageCommissionPercent,
            )}
            tone="violet"
          />
        </section>

        <ReportTable
          columns={columns}
          rows={visibleRows}
          footer={[
            `Registros: ${filteredRows.length}`,
            '',
            '',
            '',
            '',
            '',
            `Qtd.: ${totalQuantity}`,
            formatCurrency(
              totalGrossValue,
            ),
            formatPercent(
              averageCommissionPercent,
            ),
            formatCurrency(
              totalCommissionValue,
            ),
            formatCurrency(
              totalNetValue,
            ),
            '',
          ]}
        />

        {filteredRows.length === 0 && (
          <div className="mt-4 rounded-[24px] border border-dashed border-slate-300 bg-white p-12 text-center">
            <HandCoins
              size={32}
              className="mx-auto text-slate-300"
            />

            <strong className="mt-4 block text-sm text-slate-700">
              Nenhuma comissão encontrada
            </strong>

            <p className="mt-2 text-xs text-slate-400">
              Ajuste os filtros para consultar
              outros registros.
            </p>
          </div>
        )}

        <CommissionPagination
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          totalItems={filteredRows.length}
          onPageChange={setPage}
          onPageSizeChange={(value) => {
            setPageSize(value);
            setPage(1);
          }}
        />
      </main>
    </div>
  );
}

function uniqueOptions(rows, field) {
  return [
    ...new Set(
      rows
        .map((row) => row[field])
        .filter(Boolean),
    ),
  ].sort((a, b) =>
    a.localeCompare(b, 'pt-BR'),
  );
}

function calculateWeightedCommissionPercent(
  commissionValue,
  grossValue,
) {
  if (grossValue <= 0) {
    return 0;
  }

  return (
    (commissionValue / grossValue) * 100
  );
}

function formatPercent(value) {
  return `${new Intl.NumberFormat(
    'pt-BR',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  ).format(Number(value) || 0)}%`;
}

const TONE_CLASSES = {
  slate: 'bg-slate-100 text-slate-600',
  blue: 'bg-blue-50 text-blue-600',
  amber: 'bg-amber-50 text-amber-600',
  emerald:
    'bg-emerald-50 text-emerald-600',
  violet:
    'bg-violet-50 text-violet-600',
};

function SummaryCard({
  icon: Icon,
  label,
  value,
  tone,
}) {
  return (
    <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="text-xs font-bold text-slate-500">
            {label}
          </span>

          <strong className="mt-3 block truncate text-2xl font-black tracking-tight text-slate-950">
            {value}
          </strong>
        </div>

        <span
          className={[
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl',
            TONE_CLASSES[tone],
          ].join(' ')}
        >
          <Icon size={19} />
        </span>
      </div>
    </article>
  );
}

function CommissionPagination({
  page,
  pageSize,
  totalPages,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) {
  const firstItem =
    totalItems === 0
      ? 0
      : (page - 1) * pageSize + 1;

  const lastItem = Math.min(
    page * pageSize,
    totalItems,
  );

  return (
    <footer className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[20px] border border-slate-200 bg-white p-4 sm:flex-row print:hidden">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-slate-500">
          Registros por página
        </span>

        <select
          value={pageSize}
          onChange={(event) =>
            onPageSizeChange(
              Number(event.target.value),
            )
          }
          className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700 outline-none focus:border-emerald-500"
        >
          {PAGE_SIZE_OPTIONS.map(
            (option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ),
          )}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <PaginationButton
          label="Primeira página"
          icon={ChevronsLeft}
          disabled={page <= 1}
          onClick={() => onPageChange(1)}
        />

        <PaginationButton
          label="Página anterior"
          icon={ChevronLeft}
          disabled={page <= 1}
          onClick={() =>
            onPageChange(page - 1)
          }
        />

        <span className="min-w-32 px-2 text-center text-xs font-black text-slate-600">
          {firstItem} a {lastItem} de{' '}
          {totalItems}
        </span>

        <PaginationButton
          label="Próxima página"
          icon={ChevronRight}
          disabled={page >= totalPages}
          onClick={() =>
            onPageChange(page + 1)
          }
        />

        <PaginationButton
          label="Última página"
          icon={ChevronsRight}
          disabled={page >= totalPages}
          onClick={() =>
            onPageChange(totalPages)
          }
        />
      </div>
    </footer>
  );
}

function PaginationButton({
  label,
  icon: Icon,
  disabled,
  onClick,
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30"
    >
      <Icon size={16} />
    </button>
  );
}
