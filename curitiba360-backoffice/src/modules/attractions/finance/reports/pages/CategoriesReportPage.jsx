import { useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import ReportHeader from '../components/ReportHeader';
import ReportTable from '../components/ReportTable';
import CategoriesReportFilters from '../components/CategoriesReportFilters';

import {
  categoriesReportMock,
  paymentTypeOptions,
  ticketTypeOptions,
} from '../data/financeReportsMock';

import {
  exportCsv,
  formatCurrency,
  formatDateTime,
  sumBy,
} from '../utils/reportUtils';

const PAGE_SIZE_OPTIONS = [10, 20, 50];

export default function CategoriesReportPage() {
  const [filters, setFilters] = useState({
    startDate: '2026-01-01',
    endDate: '2026-01-31',
    allPeriod: true,
    ticketType: 'all',
    paymentType: 'all',
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredRows = useMemo(() => {
    return categoriesReportMock.filter((row) => {
      const matchesTicketType =
        filters.ticketType === 'all' ||
        row.ticketType === filters.ticketType;

      const matchesPaymentType =
        filters.paymentType === 'all' ||
        row.paymentType === filters.paymentType;

      if (!matchesTicketType || !matchesPaymentType) {
        return false;
      }

      if (filters.allPeriod) {
        return true;
      }

      const rowDate = new Date(row.date);

      const startDate = new Date(`${filters.startDate}T00:00:00`);

      const endDate = new Date(`${filters.endDate}T23:59:59`);

      return rowDate >= startDate && rowDate <= endDate;
    });
  }, [filters]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRows.length / pageSize),
  );

  const normalizedPage = Math.min(page, totalPages);

  const firstIndex = (normalizedPage - 1) * pageSize;

  const visibleRows = filteredRows.slice(
    firstIndex,
    firstIndex + pageSize,
  );

  const totalPrice = sumBy(filteredRows, 'price');

  const totalFee = sumBy(filteredRows, 'fee');

  const totalValue = totalPrice + totalFee;

  const columns = [
    {
      key: 'category',
      label: 'Categoria',
    },
    {
      key: 'date',
      label: 'Data',
      render: (row) => formatDateTime(row.date),
    },
    {
      key: 'seller',
      label: 'Vendedor',
    },
    {
      key: 'paymentType',
      label: 'Tipo de pagamento',
    },
    {
      key: 'price',
      label: 'Preço',
      render: (row) => formatCurrency(row.price),
    },
    {
      key: 'fee',
      label: 'Taxa',
      render: (row) => formatCurrency(row.fee),
    },
  ];

  function handleFiltersChange(nextFilters) {
    setFilters(nextFilters);
    setPage(1);
  }

  function handleExportXlsx() {
    exportCsv('relatorio-categorias-curitiba360.csv', [
      [
        'Categoria',
        'Data',
        'Vendedor',
        'Tipo de pagamento',
        'Tipo de ingresso',
        'Preço',
        'Taxa',
        'Total',
      ],
      ...filteredRows.map((row) => [
        row.category,
        row.date,
        row.seller,
        row.paymentType,
        row.ticketType,
        row.price,
        row.fee,
        Number(row.price) + Number(row.fee),
      ]),
      ['TOTAL', '', '', '', '', totalPrice, totalFee, totalValue],
    ]);
  }

  function openPrintPage() {
    const currentPath = window.location.pathname.replace(/\/$/, '');

    window.open(
      `${currentPath}/impressao`,
      '_blank',
      'noopener,noreferrer',
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8">
        <ReportHeader
          title="Relatório de Categorias"
          description="Vendas detalhadas por categoria, vendedor e forma de pagamento."
          onPrint={openPrintPage}
          onExportXlsx={handleExportXlsx}
          onExportPdf={openPrintPage}
        />

        <CategoriesReportFilters
          filters={filters}
          ticketTypeOptions={ticketTypeOptions}
          paymentTypeOptions={paymentTypeOptions}
          onChange={handleFiltersChange}
        />

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Registros" value={filteredRows.length} />

          <SummaryCard
            label="Preço"
            value={formatCurrency(totalPrice)}
          />

          <SummaryCard
            label="Taxas"
            value={formatCurrency(totalFee)}
          />

          <SummaryCard
            label="Total"
            value={formatCurrency(totalValue)}
          />
        </section>

        <ReportTable
          columns={columns}
          rows={visibleRows}
          footer={[
            `Quantidade: ${filteredRows.length}`,
            '',
            '',
            '',
            `Preço: ${formatCurrency(totalPrice)}`,
            `Taxas: ${formatCurrency(totalFee)}`,
          ]}
        />

        <CategoriesPagination
          page={normalizedPage}
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

function SummaryCard({ label, value }) {
  return (
    <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
      <span className="text-xs font-bold text-slate-500">{label}</span>

      <strong className="mt-3 block text-2xl font-black tracking-tight text-slate-950">
        {value}
      </strong>
    </article>
  );
}

function CategoriesPagination({
  page,
  pageSize,
  totalPages,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) {
  const firstItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;

  const lastItem = Math.min(page * pageSize, totalItems);

  return (
    <footer className="mt-6 flex flex-col items-center justify-between gap-4 rounded-[20px] border border-slate-200 bg-white p-4 sm:flex-row">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-slate-500">
          Registros por página
        </span>

        <select
          value={pageSize}
          onChange={(event) =>
            onPageSizeChange(Number(event.target.value))
          }
          className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black text-slate-700"
        >
          {PAGE_SIZE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <PaginationButton
          label="Primeira página"
          disabled={page <= 1}
          onClick={() => onPageChange(1)}
          icon={ChevronsLeft}
        />

        <PaginationButton
          label="Página anterior"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          icon={ChevronLeft}
        />

        <span className="min-w-32 px-2 text-center text-xs font-black text-slate-600">
          {firstItem} a {lastItem} de {totalItems}
        </span>

        <PaginationButton
          label="Próxima página"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          icon={ChevronRight}
        />

        <PaginationButton
          label="Última página"
          disabled={page >= totalPages}
          onClick={() => onPageChange(totalPages)}
          icon={ChevronsRight}
        />
      </div>
    </footer>
  );
}

function PaginationButton({ icon: Icon, label, disabled, onClick }) {
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
