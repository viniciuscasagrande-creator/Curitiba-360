import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Ban,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock3,
  ScanLine,
  XCircle,
} from 'lucide-react';

import ReportHeader from '../components/ReportHeader';
import ReportTable from '../components/ReportTable';
import ValidationReportFilters from '../components/ValidationReportFilters';
import ValidationStatusBadge from '../components/ValidationStatusBadge';

import {
  validationReportMock,
  validationStatusOptions,
} from '../data/financeReportsMock';

import {
  exportCsv,
  formatDateTime,
  sumBy,
} from '../utils/reportUtils';

const INITIAL_FILTERS = {
  startDate: '2026-01-01',
  endDate: '2026-01-31',
  allPeriod: true,
  status: 'all',
  category: 'all',
  gate: 'all',
  validator: 'all',
  operator: 'all',
  search: '',
};

const PAGE_SIZE_OPTIONS = [10, 20, 50];

export default function ValidationReportPage() {
  const [filters, setFilters] = useState(
    INITIAL_FILTERS,
  );

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] =
    useState(10);

  const categoryOptions = useMemo(
    () =>
      uniqueOptions(
        validationReportMock,
        'category',
      ),
    [],
  );

  const gateOptions = useMemo(
    () =>
      uniqueOptions(
        validationReportMock,
        'gate',
      ),
    [],
  );

  const validatorOptions = useMemo(
    () =>
      uniqueOptions(
        validationReportMock,
        'validator',
      ),
    [],
  );

  const operatorOptions = useMemo(
    () =>
      uniqueOptions(
        validationReportMock,
        'operator',
      ),
    [],
  );

  const filteredRows = useMemo(() => {
    const searchValue = filters.search
      .trim()
      .toLocaleLowerCase('pt-BR');

    return validationReportMock.filter(
      (row) => {
        const matchesStatus =
          filters.status === 'all' ||
          row.status === filters.status;

        const matchesCategory =
          filters.category === 'all' ||
          row.category === filters.category;

        const matchesGate =
          filters.gate === 'all' ||
          row.gate === filters.gate;

        const matchesValidator =
          filters.validator === 'all' ||
          row.validator === filters.validator;

        const matchesOperator =
          filters.operator === 'all' ||
          row.operator === filters.operator;

        const matchesSearch =
          !searchValue ||
          [
            row.ticketCode,
            row.orderNumber,
            row.customer,
          ].some((value) =>
            String(value)
              .toLocaleLowerCase('pt-BR')
              .includes(searchValue),
          );

        if (
          !matchesStatus ||
          !matchesCategory ||
          !matchesGate ||
          !matchesValidator ||
          !matchesOperator ||
          !matchesSearch
        ) {
          return false;
        }

        if (filters.allPeriod) {
          return true;
        }

        const validationDate = new Date(
          row.validationDate,
        );

        const startDate = new Date(
          `${filters.startDate}T00:00:00`,
        );

        const endDate = new Date(
          `${filters.endDate}T23:59:59`,
        );

        return (
          validationDate >= startDate &&
          validationDate <= endDate
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

  const firstIndex = (page - 1) * pageSize;

  const visibleRows = filteredRows.slice(
    firstIndex,
    firstIndex + pageSize,
  );

  const validatedCount = countByStatus(
    filteredRows,
    'Validado',
  );

  const rejectedCount = countByStatus(
    filteredRows,
    'Rejeitado',
  );

  const canceledCount = countByStatus(
    filteredRows,
    'Cancelado',
  );

  const expiredCount = countByStatus(
    filteredRows,
    'Expirado',
  );

  const totalAttempts = sumBy(
    filteredRows,
    'attempts',
  );

  const columns = [
    {
      key: 'validationDate',
      label: 'Data e hora',
      render: (row) =>
        formatDateTime(
          row.validationDate,
        ),
    },
    {
      key: 'ticketCode',
      label: 'Ingresso',
      render: (row) => (
        <span className="font-mono text-[11px] font-black text-slate-700">
          {row.ticketCode}
        </span>
      ),
    },
    {
      key: 'orderNumber',
      label: 'Pedido',
    },
    {
      key: 'customer',
      label: 'Cliente',
    },
    {
      key: 'category',
      label: 'Categoria',
    },
    {
      key: 'gate',
      label: 'Portaria',
    },
    {
      key: 'validator',
      label: 'Validador',
    },
    {
      key: 'operator',
      label: 'Operador',
    },
    {
      key: 'attempts',
      label: 'Tentativas',
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <ValidationStatusBadge
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
      'relatorio-validacoes-curitiba360.csv',
      [
        [
          'Data e hora',
          'Ingresso',
          'Pedido',
          'Cliente',
          'Categoria',
          'Portaria',
          'Validador',
          'Operador',
          'Tentativas',
          'Status',
        ],
        ...filteredRows.map((row) => [
          row.validationDate,
          row.ticketCode,
          row.orderNumber,
          row.customer,
          row.category,
          row.gate,
          row.validator,
          row.operator,
          row.attempts,
          row.status,
        ]),
        [
          'TOTAL',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          totalAttempts,
          filteredRows.length,
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
      <main className="mx-auto max-w-[1700px] px-4 py-7 sm:px-6 lg:px-8">
        <ReportHeader
          title="Relatório de Validações"
          description="Consulta das leituras, tentativas, operadores, portarias e status dos ingressos."
          onPrint={openPrintPage}
          onExportXlsx={handleExportXlsx}
          onExportPdf={openPrintPage}
        />

        <ValidationReportFilters
          filters={filters}
          statusOptions={
            validationStatusOptions
          }
          categoryOptions={categoryOptions}
          gateOptions={gateOptions}
          validatorOptions={
            validatorOptions
          }
          operatorOptions={
            operatorOptions
          }
          onChange={handleFiltersChange}
          onReset={handleResetFilters}
        />

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <SummaryCard
            icon={ScanLine}
            label="Leituras"
            value={filteredRows.length}
            tone="slate"
          />

          <SummaryCard
            icon={CheckCircle2}
            label="Validados"
            value={validatedCount}
            tone="emerald"
          />

          <SummaryCard
            icon={XCircle}
            label="Rejeitados"
            value={rejectedCount}
            tone="red"
          />

          <SummaryCard
            icon={Ban}
            label="Cancelados"
            value={canceledCount}
            tone="amber"
          />

          <SummaryCard
            icon={Clock3}
            label="Expirados"
            value={expiredCount}
            tone="slate"
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
            '',
            '',
            `Tentativas: ${totalAttempts}`,
            '',
          ]}
        />

        {filteredRows.length === 0 && (
          <div className="mt-4 rounded-[24px] border border-dashed border-slate-300 bg-white p-12 text-center">
            <ScanLine
              size={32}
              className="mx-auto text-slate-300"
            />

            <strong className="mt-4 block text-sm text-slate-700">
              Nenhuma validação encontrada
            </strong>

            <p className="mt-2 text-xs text-slate-400">
              Ajuste os filtros para consultar outras leituras.
            </p>
          </div>
        )}

        <ValidationPagination
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

function countByStatus(rows, status) {
  return rows.filter(
    (row) => row.status === status,
  ).length;
}

const TONE_CLASSES = {
  slate: 'bg-slate-100 text-slate-600',
  emerald:
    'bg-emerald-50 text-emerald-600',
  red: 'bg-red-50 text-red-600',
  amber: 'bg-amber-50 text-amber-600',
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
        <div>
          <span className="text-xs font-bold text-slate-500">
            {label}
          </span>

          <strong className="mt-3 block text-2xl font-black tracking-tight text-slate-950">
            {value}
          </strong>
        </div>

        <span
          className={[
            'flex h-11 w-11 items-center justify-center rounded-2xl',
            TONE_CLASSES[tone],
          ].join(' ')}
        >
          <Icon size={19} />
        </span>
      </div>
    </article>
  );
}

function ValidationPagination({
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
