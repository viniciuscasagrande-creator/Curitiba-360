import {
  useMemo,
  useState,
} from 'react';

import {
  BadgeDollarSign,
  Banknote,
  CalendarCheck2,
  CircleDollarSign,
  HandCoins,
  Landmark,
  ReceiptText,
  Tickets,
  WalletCards,
} from 'lucide-react';

import ReportHeader from '../components/ReportHeader';
import ReportTable from '../components/ReportTable';
import BorderoStatusBadge from '../components/BorderoStatusBadge';
import BorderoReportFilters from '../components/BorderoReportFilters';
import BorderoFinancialSummary from '../components/BorderoFinancialSummary';
import BorderoBankAccount from '../components/BorderoBankAccount';

import {
  borderoReportMock,
  borderoStatusOptions,
  borderoTransferHistoryMock,
} from '../data/financeReportsMock';

import {
  exportCsv,
  formatCurrency,
  formatDate,
  formatDateTime,
  sumBy,
} from '../utils/reportUtils';

const INITIAL_FILTERS = {
  startDate: '2026-01-01',
  endDate: '2026-01-31',
  status: 'all',
  reference: '',
};

export default function BorderoReportPage() {
  const [filters, setFilters] = useState(
    INITIAL_FILTERS,
  );

  const borderoVisible = useMemo(() => {
    const referenceValue =
      filters.reference
        .trim()
        .toLocaleLowerCase('pt-BR');

    const matchesStatus =
      filters.status === 'all' ||
      borderoReportMock.status ===
        filters.status;

    const matchesReference =
      !referenceValue ||
      borderoReportMock.reference
        .toLocaleLowerCase('pt-BR')
        .includes(referenceValue);

    const borderoStart = new Date(
      `${borderoReportMock.startDate}T00:00:00`,
    );

    const borderoEnd = new Date(
      `${borderoReportMock.endDate}T23:59:59`,
    );

    const filterStart = new Date(
      `${filters.startDate}T00:00:00`,
    );

    const filterEnd = new Date(
      `${filters.endDate}T23:59:59`,
    );

    const matchesPeriod =
      borderoStart <= filterEnd &&
      borderoEnd >= filterStart;

    return (
      matchesStatus &&
      matchesReference &&
      matchesPeriod
    );
  }, [filters]);

  const bordero = borderoVisible
    ? borderoReportMock
    : null;

  const transferRows = borderoVisible
    ? borderoTransferHistoryMock
    : [];

  const paidTransfers = sumBy(
    transferRows.filter(
      (row) => row.status === 'Pago',
    ),
    'value',
  );

  const pendingTransfers = sumBy(
    transferRows.filter(
      (row) => row.status === 'Pendente',
    ),
    'value',
  );

  const transferColumns = [
    {
      key: 'requestDate',
      label: 'Solicitado em',
      render: (row) =>
        formatDateTime(row.requestDate),
    },
    {
      key: 'paymentDate',
      label: 'Pago em',
      render: (row) =>
        row.paymentDate
          ? formatDateTime(row.paymentDate)
          : '—',
    },
    {
      key: 'reference',
      label: 'Referência',
    },
    {
      key: 'bank',
      label: 'Banco',
    },
    {
      key: 'value',
      label: 'Valor',
      render: (row) => (
        <strong className="text-slate-800">
          {formatCurrency(row.value)}
        </strong>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <BorderoStatusBadge
          status={row.status}
        />
      ),
    },
  ];

  function handleExportXlsx() {
    if (!bordero) {
      return;
    }

    exportCsv(
      'bordero-financeiro-curitiba360.csv',
      [
        ['BORDERÔ FINANCEIRO'],
        ['Referência', bordero.reference],
        [
          'Período',
          `${formatDate(
            bordero.startDate,
          )} até ${formatDate(
            bordero.endDate,
          )}`,
        ],
        ['Status', bordero.status],
        [],
        ['RESUMO FINANCEIRO'],
        [
          'Receita bruta',
          bordero.grossRevenue,
        ],
        [
          'Taxa da plataforma',
          -bordero.platformFee,
        ],
        [
          'Taxa do gateway',
          -bordero.gatewayFee,
        ],
        [
          'Taxa de antecipação',
          -bordero.anticipationFee,
        ],
        [
          'Comissões',
          -bordero.commissions,
        ],
        ['Impostos', -bordero.taxes],
        ['Descontos', -bordero.discounts],
        ['Estornos', -bordero.refunds],
        [
          'Cortesias',
          -bordero.courtesyValue,
        ],
        [
          'Receita líquida',
          bordero.netRevenue,
        ],
        [
          'Valor do repasse',
          bordero.transferValue,
        ],
        [],
        ['HISTÓRICO DE REPASSES'],
        [
          'Data da solicitação',
          'Data do pagamento',
          'Referência',
          'Banco',
          'Valor',
          'Status',
        ],
        ...transferRows.map((row) => [
          row.requestDate,
          row.paymentDate ?? '',
          row.reference,
          row.bank,
          row.value,
          row.status,
        ]),
        [
          'TOTAL',
          '',
          '',
          '',
          sumBy(transferRows, 'value'),
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
      <main className="mx-auto max-w-[1700px] px-4 py-7 sm:px-6 lg:px-8">
        <ReportHeader
          title="Borderô Financeiro"
          description="Fechamento consolidado de receitas, taxas, deduções e repasses da atração."
          onPrint={openPrintPage}
          onExportXlsx={handleExportXlsx}
          onExportPdf={openPrintPage}
        />

        <BorderoReportFilters
          filters={filters}
          statusOptions={
            borderoStatusOptions
          }
          onChange={setFilters}
          onReset={() =>
            setFilters(INITIAL_FILTERS)
          }
        />

        {!bordero ? (
          <EmptyState />
        ) : (
          <>
            <section className="mt-6 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-black tracking-tight text-slate-950">
                      {bordero.reference}
                    </h2>

                    <BorderoStatusBadge
                      status={bordero.status}
                    />
                  </div>

                  <p className="mt-2 text-sm font-bold text-slate-500">
                    Período de{' '}
                    {formatDate(
                      bordero.startDate,
                    )}{' '}
                    até{' '}
                    {formatDate(
                      bordero.endDate,
                    )}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 px-5 py-4">
                  <span className="block text-[10px] font-black uppercase tracking-[0.08em] text-slate-400">
                    Fechamento
                  </span>

                  <strong className="mt-1 block text-sm font-black text-slate-700">
                    {formatDateTime(
                      bordero.closingDate,
                    )}
                  </strong>
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              <SummaryCard
                icon={ReceiptText}
                label="Pedidos"
                value={bordero.orders}
                tone="slate"
              />

              <SummaryCard
                icon={Tickets}
                label="Ingressos vendidos"
                value={bordero.ticketsSold}
                tone="violet"
              />

              <SummaryCard
                icon={CircleDollarSign}
                label="Receita bruta"
                value={formatCurrency(
                  bordero.grossRevenue,
                )}
                tone="blue"
              />

              <SummaryCard
                icon={BadgeDollarSign}
                label="Deduções"
                value={formatCurrency(
                  calculateDeductions(
                    bordero,
                  ),
                )}
                tone="red"
              />

              <SummaryCard
                icon={Banknote}
                label="Receita líquida"
                value={formatCurrency(
                  bordero.netRevenue,
                )}
                tone="emerald"
              />
            </section>

            <section className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <CompactCard
                icon={WalletCards}
                label="Valor do repasse"
                value={formatCurrency(
                  bordero.transferValue,
                )}
                tone="emerald"
              />

              <CompactCard
                icon={Landmark}
                label="Repasses pagos"
                value={formatCurrency(
                  paidTransfers,
                )}
                tone="blue"
              />

              <CompactCard
                icon={CalendarCheck2}
                label="Repasse pendente"
                value={formatCurrency(
                  pendingTransfers,
                )}
                tone="amber"
              />

              <CompactCard
                icon={HandCoins}
                label="Comissões"
                value={formatCurrency(
                  bordero.commissions,
                )}
                tone="violet"
              />
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]">
              <BorderoFinancialSummary
                bordero={bordero}
              />

              <BorderoBankAccount
                account={
                  bordero.bankAccount
                }
              />
            </section>

            <section className="mt-6">
              <div className="mb-4">
                <h2 className="text-base font-black text-slate-900">
                  Histórico de repasses
                </h2>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Solicitações e pagamentos vinculados ao borderô.
                </p>
              </div>

              <ReportTable
                columns={transferColumns}
                rows={transferRows}
                footer={[
                  `Registros: ${transferRows.length}`,
                  '',
                  '',
                  '',
                  formatCurrency(
                    sumBy(
                      transferRows,
                      'value',
                    ),
                  ),
                  '',
                ]}
              />
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function calculateDeductions(bordero) {
  return (
    bordero.platformFee +
    bordero.gatewayFee +
    bordero.anticipationFee +
    bordero.commissions +
    bordero.discounts +
    bordero.refunds +
    bordero.courtesyValue +
    bordero.taxes
  );
}

const TONE_CLASSES = {
  slate: 'bg-slate-100 text-slate-600',
  violet:
    'bg-violet-50 text-violet-600',
  blue: 'bg-blue-50 text-blue-600',
  red: 'bg-red-50 text-red-600',
  amber: 'bg-amber-50 text-amber-600',
  emerald:
    'bg-emerald-50 text-emerald-600',
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

function CompactCard({
  icon: Icon,
  label,
  value,
  tone,
}) {
  return (
    <article className="flex items-center gap-4 rounded-[20px] border border-slate-200 bg-white p-4 shadow-sm">
      <span
        className={[
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
          TONE_CLASSES[tone],
        ].join(' ')}
      >
        <Icon size={17} />
      </span>

      <div className="min-w-0">
        <span className="block text-[10px] font-black uppercase tracking-[0.06em] text-slate-400">
          {label}
        </span>

        <strong className="mt-1 block truncate text-base font-black text-slate-800">
          {value}
        </strong>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-white p-14 text-center">
      <ReceiptText
        size={36}
        className="mx-auto text-slate-300"
      />

      <strong className="mt-4 block text-sm text-slate-700">
        Nenhum borderô encontrado
      </strong>

      <p className="mt-2 text-xs text-slate-400">
        Ajuste o período, o status ou a referência informada.
      </p>
    </div>
  );
}
