import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Gift,
  ReceiptText,
  Ticket,
  WalletCards,
} from 'lucide-react';

import ReportHeader from '../components/ReportHeader';
import ReportTable from '../components/ReportTable';
import CourtesyReportFilters from '../components/CourtesyReportFilters';

import {
  agentOptions,
  categoryOptions,
  courtesyReasonOptions,
  courtesyReportMock,
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
  category: 'all',
  agency: 'all',
  seller: 'all',
  reason: 'all',
  customer: '',
};

const PAGE_SIZE_OPTIONS = [10, 20, 50];

export default function CourtesyReportPage() {
  const [filters, setFilters] = useState(
    INITIAL_FILTERS,
  );

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] =
    useState(10);

  const sellerOptions = useMemo(() => {
    return [
      ...new Set(
        courtesyReportMock.map(
          (item) => item.seller,
        ),
      ),
    ];
  }, []);

  const filteredRows = useMemo(() => {
    const customerSearch =
      filters.customer
        .trim()
        .toLocaleLowerCase('pt-BR');

    return courtesyReportMock
      .filter((row) => {
        const matchesCategory =
          filters.category === 'all' ||
          row.category === filters.category;

        const matchesAgency =
          filters.agency === 'all' ||
          row.agency === filters.agency;

        const matchesSeller =
          filters.seller === 'all' ||
          row.seller === filters.seller;

        const matchesReason =
          filters.reason === 'all' ||
          row.reason === filters.reason;

        const matchesCustomer =
          !customerSearch ||
          row.customer
            .toLocaleLowerCase('pt-BR')
            .includes(customerSearch);

        if (
          !matchesCategory ||
          !matchesAgency ||
          !matchesSeller ||
          !matchesReason ||
          !matchesCustomer
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
      })
      .map((row) => ({
        ...row,
        total:
          Number(row.quantity || 0) *
          Number(row.unitValue || 0),
      }));
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

  const firstIndex = (page - 1) * pageSize;

  const visibleRows = filteredRows.slice(
    firstIndex,
    firstIndex + pageSize,
  );

  const totalQuantity = sumBy(
    filteredRows,
    'quantity',
  );

  const totalCourtesyValue = sumBy(
    filteredRows,
    'total',
  );

  const averageCourtesyValue =
    totalQuantity > 0
      ? totalCourtesyValue / totalQuantity
      : 0;

  const columns = [
    {
      key: 'date',
      label: 'Data',
      render: (row) =>
        formatDateTime(row.date),
    },
    {
      key: 'category',
      label: 'Categoria',
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
      key: 'customer',
      label: 'Recebedor',
    },
    {
      key: 'reason',
      label: 'Motivo',
    },
    {
      key: 'quantity',
      label: 'Qtd.',
    },
    {
      key: 'unitValue',
      label: 'Valor unitário',
      render: (row) =>
        formatCurrency(row.unitValue),
    },
    {
      key: 'total',
      label: 'Valor total',
      render: (row) =>
        formatCurrency(row.total),
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
      'relatorio-cortesias-curitiba360.csv',
      [
        [
          'Data',
          'Categoria',
          'Vendedor',
          'Agência',
          'Recebedor',
          'Motivo',
          'Quantidade',
          'Valor unitário',
          'Valor total',
        ],
        ...filteredRows.map((row) => [
          row.date,
          row.category,
          row.seller,
          row.agency,
          row.customer,
          row.reason,
          row.quantity,
          row.unitValue,
          row.total,
        ]),
        [
          'TOTAL',
          '',
          '',
          '',
          '',
          '',
          totalQuantity,
          '',
          totalCourtesyValue,
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
      <main className="mx-auto max-w-[1600px] px-4 py-7 sm:px-6 lg:px-8">
        <ReportHeader
          title="Relatório de Cortesias"
          description="Consulta das cortesias emitidas, seus recebedores, motivos, quantidades e valores."
          onPrint={openPrintPage}
          onExportXlsx={handleExportXlsx}
          onExportPdf={openPrintPage}
        />

        <CourtesyReportFilters
          filters={filters}
          categoryOptions={categoryOptions}
          agentOptions={agentOptions}
          sellerOptions={sellerOptions}
          reasonOptions={
            courtesyReasonOptions
          }
          onChange={handleFiltersChange}
          onReset={handleResetFilters}
        />

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            icon={ReceiptText}
            label="Registros"
            value={filteredRows.length}
          />

          <SummaryCard
            icon={Ticket}
            label="Cortesias emitidas"
            value={totalQuantity}
          />

          <SummaryCard
            icon={WalletCards}
            label="Valor médio"
            value={formatCurrency(
              averageCourtesyValue,
            )}
          />

          <SummaryCard
            icon={Gift}
            label="Valor total"
            value={formatCurrency(
              totalCourtesyValue,
            )}
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
            '',
            formatCurrency(
              totalCourtesyValue,
            ),
          ]}
        />

        {filteredRows.length === 0 && (
          <div className="mt-4 rounded-[24px] border border-dashed border-slate-300 bg-white p-12 text-center">
            <Gift
              size={30}
              className="mx-auto text-slate-300"
            />

            <strong className="mt-4 block text-sm text-slate-700">
              Nenhuma cortesia encontrada
            </strong>

            <p className="mt-2 text-xs text-slate-400">
              Ajuste os filtros para consultar
              outros registros.
            </p>
          </div>
        )}

        <CourtesyPagination
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

function SummaryCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-500">
            {label}
          </span>

          <strong className="mt-3 block text-2xl font-black tracking-tight text-slate-950">
            {value}
          </strong>
        </div>

        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Icon size={19} />
        </span>
      </div>
    </article>
  );
}

function CourtesyPagination({
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
