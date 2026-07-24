import {
  useMemo,
  useState,
} from 'react';

import {
  BadgeDollarSign,
  Banknote,
  CircleDollarSign,
  CreditCard,
  ReceiptText,
  WalletCards,
} from 'lucide-react';

import ReportHeader from '../components/ReportHeader';
import ReportTable from '../components/ReportTable';
import SalesByPaymentReportFilters from '../components/SalesByPaymentReportFilters';
import PaymentDistributionChart from '../components/PaymentDistributionChart';
import PaymentParticipation from '../components/PaymentParticipation';

import {
  salesByPaymentReportMock,
  salesByPaymentTypeOptions,
} from '../data/financeReportsMock';

import {
  exportCsv,
  formatCurrency,
  sumBy,
} from '../utils/reportUtils';

const INITIAL_FILTERS = {
  startDate: '2026-01-01',
  endDate: '2026-01-31',
  allPeriod: true,
  paymentType: 'all',
  search: '',
};

export default function SalesByPaymentReportPage() {
  const [filters, setFilters] = useState(
    INITIAL_FILTERS,
  );

  const filteredRows = useMemo(() => {
    const searchValue = filters.search
      .trim()
      .toLocaleLowerCase('pt-BR');

    return salesByPaymentReportMock.filter(
      (row) => {
        const matchesPaymentType =
          filters.paymentType === 'all' ||
          row.paymentType ===
            filters.paymentType;

        const matchesSearch =
          !searchValue ||
          row.paymentType
            .toLocaleLowerCase('pt-BR')
            .includes(searchValue);

        if (
          !matchesPaymentType ||
          !matchesSearch
        ) {
          return false;
        }

        if (filters.allPeriod) {
          return true;
        }

        const rowDate = new Date(
          `${row.period}-01T12:00:00`,
        );

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

  const rowsWithParticipation =
    useMemo(() => {
      const totalGrossValue = sumBy(
        filteredRows,
        'grossValue',
      );

      return filteredRows.map((row) => ({
        ...row,
        participation:
          totalGrossValue > 0
            ? (row.grossValue /
                totalGrossValue) *
              100
            : 0,
      }));
    }, [filteredRows]);

  const totalSales = sumBy(
    rowsWithParticipation,
    'salesQuantity',
  );

  const totalTickets = sumBy(
    rowsWithParticipation,
    'ticketsQuantity',
  );

  const totalGrossValue = sumBy(
    rowsWithParticipation,
    'grossValue',
  );

  const totalFees = sumBy(
    rowsWithParticipation,
    'fees',
  );

  const totalNetValue = sumBy(
    rowsWithParticipation,
    'netValue',
  );

  const effectiveFeePercent =
    totalGrossValue > 0
      ? (totalFees / totalGrossValue) *
        100
      : 0;

  const columns = [
    {
      key: 'paymentType',
      label: 'Forma de pagamento',
      render: (row) => (
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <CreditCard size={16} />
          </span>

          <strong className="whitespace-nowrap text-slate-800">
            {row.paymentType}
          </strong>
        </div>
      ),
    },
    {
      key: 'salesQuantity',
      label: 'Vendas',
    },
    {
      key: 'ticketsQuantity',
      label: 'Ingressos',
    },
    {
      key: 'grossValue',
      label: 'Valor bruto',
      render: (row) =>
        formatCurrency(row.grossValue),
    },
    {
      key: 'fees',
      label: 'Taxas',
      render: (row) => (
        <strong
          className={
            row.fees > 0
              ? 'text-amber-700'
              : 'text-slate-400'
          }
        >
          {formatCurrency(row.fees)}
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
      key: 'participation',
      label: 'Participação',
      render: (row) => (
        <PaymentParticipation
          value={row.participation}
        />
      ),
    },
  ];

  function handleFiltersChange(
    nextFilters,
  ) {
    setFilters(nextFilters);
  }

  function handleResetFilters() {
    setFilters(INITIAL_FILTERS);
  }

  function handleExportXlsx() {
    exportCsv(
      'vendas-por-forma-de-pagamento-curitiba360.csv',
      [
        [
          'Forma de pagamento',
          'Quantidade de vendas',
          'Quantidade de ingressos',
          'Valor bruto',
          'Taxas',
          'Valor líquido',
          'Participação',
        ],
        ...rowsWithParticipation.map(
          (row) => [
            row.paymentType,
            row.salesQuantity,
            row.ticketsQuantity,
            row.grossValue,
            row.fees,
            row.netValue,
            formatPercent(
              row.participation,
            ),
          ],
        ),
        [
          'TOTAL',
          totalSales,
          totalTickets,
          totalGrossValue,
          totalFees,
          totalNetValue,
          '100,00%',
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
          title="Vendas por Forma de Pagamento"
          description="Consolidação das vendas, taxas e valores líquidos por meio de pagamento."
          onPrint={openPrintPage}
          onExportXlsx={
            handleExportXlsx
          }
          onExportPdf={openPrintPage}
        />

        <SalesByPaymentReportFilters
          filters={filters}
          paymentTypeOptions={
            salesByPaymentTypeOptions
          }
          onChange={handleFiltersChange}
          onReset={handleResetFilters}
        />

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <SummaryCard
            icon={ReceiptText}
            label="Vendas"
            value={totalSales}
            tone="slate"
          />

          <SummaryCard
            icon={WalletCards}
            label="Ingressos"
            value={totalTickets}
            tone="violet"
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
            icon={BadgeDollarSign}
            label="Taxas"
            value={formatCurrency(
              totalFees,
            )}
            detail={`${formatPercent(
              effectiveFeePercent,
            )} do valor bruto`}
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
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
          <PaymentDistributionChart
            data={rowsWithParticipation}
          />

          <div className="min-w-0">
            <ReportTable
              columns={columns}
              rows={rowsWithParticipation}
              footer={[
                'TOTAL',
                totalSales,
                totalTickets,
                formatCurrency(
                  totalGrossValue,
                ),
                formatCurrency(
                  totalFees,
                ),
                formatCurrency(
                  totalNetValue,
                ),
                '100,00%',
              ]}
            />
          </div>
        </section>

        {rowsWithParticipation.length ===
          0 && (
          <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-white p-12 text-center">
            <CreditCard
              size={34}
              className="mx-auto text-slate-300"
            />

            <strong className="mt-4 block text-sm text-slate-700">
              Nenhuma venda encontrada
            </strong>

            <p className="mt-2 text-xs text-slate-400">
              Ajuste os filtros para consultar outras formas de pagamento.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

const TONE_CLASSES = {
  slate: 'bg-slate-100 text-slate-600',
  violet:
    'bg-violet-50 text-violet-600',
  blue: 'bg-blue-50 text-blue-600',
  amber: 'bg-amber-50 text-amber-600',
  emerald:
    'bg-emerald-50 text-emerald-600',
};

function SummaryCard({
  icon: Icon,
  label,
  value,
  detail,
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

          {detail && (
            <span className="mt-2 block text-[10px] font-bold text-slate-400">
              {detail}
            </span>
          )}
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

function formatPercent(value) {
  return `${new Intl.NumberFormat(
    'pt-BR',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  ).format(Number(value) || 0)}%`;
}
