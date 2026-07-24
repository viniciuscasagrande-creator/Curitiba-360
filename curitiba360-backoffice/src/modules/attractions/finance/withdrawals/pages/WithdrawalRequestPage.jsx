import {
  useMemo,
  useState,
} from 'react';

import {
  Ban,
  Banknote,
  CalendarClock,
  CircleDollarSign,
  Eye,
  HandCoins,
  LockKeyhole,
  MoreHorizontal,
  ReceiptText,
  WalletCards,
} from 'lucide-react';

import ReportHeader from '../../reports/components/ReportHeader';
import ReportTable from '../../reports/components/ReportTable';

import WithdrawalStatusBadge from '../components/WithdrawalStatusBadge';
import WithdrawalRequestForm from '../components/WithdrawalRequestForm';
import WithdrawalBankAccount from '../components/WithdrawalBankAccount';
import WithdrawalFilters from '../components/WithdrawalFilters';

import {
  withdrawalBalanceMock,
  withdrawalBankAccountMock,
  withdrawalRequestsMock,
  withdrawalStatusOptions,
} from '../data/withdrawalRequestsMock';

import {
  exportCsv,
  formatCurrency,
  formatDate,
  formatDateTime,
  sumBy,
} from '../../reports/utils/reportUtils';

const INITIAL_FILTERS = {
  startDate: '2026-01-01',
  endDate: '2026-12-31',
  status: 'all',
  search: '',
};

export default function WithdrawalRequestPage() {
  const [requests, setRequests] = useState(
    withdrawalRequestsMock,
  );

  const [filters, setFilters] = useState(
    INITIAL_FILTERS,
  );

  const filteredRows = useMemo(() => {
    const searchValue = filters.search
      .trim()
      .toLocaleLowerCase('pt-BR');

    return requests.filter((request) => {
      const requestDate = new Date(
        request.requestDate,
      );

      const startDate = new Date(
        `${filters.startDate}T00:00:00`,
      );

      const endDate = new Date(
        `${filters.endDate}T23:59:59`,
      );

      const matchesPeriod =
        requestDate >= startDate &&
        requestDate <= endDate;

      const matchesStatus =
        filters.status === 'all' ||
        request.status === filters.status;

      const matchesSearch =
        !searchValue ||
        [
          request.reference,
          request.bank,
          request.requestedBy,
        ].some((value) =>
          value
            ?.toLocaleLowerCase('pt-BR')
            .includes(searchValue),
        );

      return (
        matchesPeriod &&
        matchesStatus &&
        matchesSearch
      );
    });
  }, [filters, requests]);

  const requestedValue = sumBy(
    requests.filter((row) =>
      ['Pendente', 'Em análise', 'Aprovado'].includes(
        row.status,
      ),
    ),
    'netAmount',
  );

  const paidValue = sumBy(
    requests.filter(
      (row) => row.status === 'Pago',
    ),
    'netAmount',
  );

  async function handleCreateRequest(data) {
    await new Promise((resolve) =>
      setTimeout(resolve, 500),
    );

    const newRequest = {
      id: `withdrawal-${Date.now()}`,
      reference: generateReference(
        requests.length + 1,
      ),
      requestDate: new Date().toISOString(),
      paymentDate: null,
      requestedBy: 'Financeiro Curitiba 360',
      amount: data.amount,
      fee: 0,
      netAmount: data.amount,
      bank: withdrawalBankAccountMock.bank,
      agency:
        withdrawalBankAccountMock.agency,
      account:
        withdrawalBankAccountMock.account,
      pixKey:
        withdrawalBankAccountMock.pixKey,
      status: 'Pendente',
      observation: data.observation,
    };

    setRequests((current) => [
      newRequest,
      ...current,
    ]);
  }

  function handleCancelRequest(requestId) {
    const confirmed = window.confirm(
      'Deseja cancelar esta solicitação de repasse?',
    );

    if (!confirmed) {
      return;
    }

    setRequests((current) =>
      current.map((request) =>
        request.id === requestId &&
        request.status === 'Pendente'
          ? {
              ...request,
              status: 'Cancelado',
              observation:
                request.observation ||
                'Solicitação cancelada pelo usuário.',
            }
          : request,
      ),
    );
  }

  function handleExport() {
    exportCsv(
      'solicitacoes-de-repasse-curitiba360.csv',
      [
        [
          'Referência',
          'Solicitado em',
          'Pago em',
          'Solicitante',
          'Banco',
          'Agência',
          'Conta',
          'Valor',
          'Taxa',
          'Valor líquido',
          'Status',
          'Observação',
        ],
        ...filteredRows.map((row) => [
          row.reference,
          row.requestDate,
          row.paymentDate ?? '',
          row.requestedBy,
          row.bank,
          row.agency,
          row.account,
          row.amount,
          row.fee,
          row.netAmount,
          row.status,
          row.observation,
        ]),
        [
          'TOTAL',
          '',
          '',
          '',
          '',
          '',
          '',
          sumBy(filteredRows, 'amount'),
          sumBy(filteredRows, 'fee'),
          sumBy(filteredRows, 'netAmount'),
          '',
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

  const columns = [
    {
      key: 'requestDate',
      label: 'Solicitado em',
      render: (row) =>
        formatDateTime(row.requestDate),
    },
    {
      key: 'reference',
      label: 'Referência',
      render: (row) => (
        <strong className="text-slate-800">
          {row.reference}
        </strong>
      ),
    },
    {
      key: 'bank',
      label: 'Conta bancária',
      render: (row) => (
        <div>
          <strong className="block text-slate-700">
            {row.bank}
          </strong>

          <span className="mt-1 block text-[10px] font-bold text-slate-400">
            Ag. {row.agency} · Conta{' '}
            {row.account}
          </span>
        </div>
      ),
    },
    {
      key: 'amount',
      label: 'Valor solicitado',
      render: (row) =>
        formatCurrency(row.amount),
    },
    {
      key: 'netAmount',
      label: 'Valor líquido',
      render: (row) => (
        <strong className="text-emerald-700">
          {formatCurrency(row.netAmount)}
        </strong>
      ),
    },
    {
      key: 'paymentDate',
      label: 'Pagamento',
      render: (row) =>
        row.paymentDate
          ? formatDateTime(row.paymentDate)
          : '—',
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <WithdrawalStatusBadge
          status={row.status}
        />
      ),
    },
    {
      key: 'actions',
      label: 'Ações',
      render: (row) => (
        <RequestActions
          request={row}
          onCancel={() =>
            handleCancelRequest(row.id)
          }
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-[1700px] px-4 py-7 sm:px-6 lg:px-8">
        <ReportHeader
          title="Solicitações de Repasse"
          description="Solicite a transferência do saldo disponível e acompanhe o processamento financeiro."
          onPrint={openPrintPage}
          onExportXlsx={handleExport}
          onExportPdf={openPrintPage}
        />

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <SummaryCard
            icon={CircleDollarSign}
            label="Saldo disponível"
            value={formatCurrency(
              withdrawalBalanceMock.availableBalance,
            )}
            tone="emerald"
          />

          <SummaryCard
            icon={LockKeyhole}
            label="Saldo bloqueado"
            value={formatCurrency(
              withdrawalBalanceMock.blockedBalance,
            )}
            tone="red"
          />

          <SummaryCard
            icon={WalletCards}
            label="Valor solicitado"
            value={formatCurrency(
              requestedValue,
            )}
            tone="amber"
          />

          <SummaryCard
            icon={Banknote}
            label="Valor pago"
            value={formatCurrency(paidValue)}
            tone="blue"
          />

          <SummaryCard
            icon={CalendarClock}
            label="Próximo repasse"
            value={formatDate(
              withdrawalBalanceMock.nextPaymentDate,
            )}
            tone="violet"
          />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(360px,0.8fr)_minmax(0,1.2fr)]">
          <WithdrawalRequestForm
            availableBalance={
              withdrawalBalanceMock.availableBalance
            }
            minimumWithdrawal={
              withdrawalBalanceMock.minimumWithdrawal
            }
            account={
              withdrawalBankAccountMock
            }
            onSubmit={handleCreateRequest}
          />

          <WithdrawalBankAccount
            account={
              withdrawalBankAccountMock
            }
          />
        </section>

        <section className="mt-6">
          <WithdrawalFilters
            filters={filters}
            statusOptions={
              withdrawalStatusOptions
            }
            onChange={setFilters}
            onReset={() =>
              setFilters(INITIAL_FILTERS)
            }
          />

          <div className="mt-4">
            <ReportTable
              columns={columns}
              rows={filteredRows}
              footer={[
                `Registros: ${filteredRows.length}`,
                '',
                '',
                formatCurrency(
                  sumBy(filteredRows, 'amount'),
                ),
                formatCurrency(
                  sumBy(
                    filteredRows,
                    'netAmount',
                  ),
                ),
                '',
                '',
                '',
              ]}
            />
          </div>
        </section>

        {filteredRows.length === 0 && (
          <EmptyState />
        )}
      </main>
    </div>
  );
}

function RequestActions({
  request,
  onCancel,
}) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        title="Visualizar solicitação"
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
      >
        <Eye size={15} />
      </button>

      {request.status === 'Pendente' && (
        <button
          type="button"
          title="Cancelar solicitação"
          onClick={onCancel}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50"
        >
          <Ban size={15} />
        </button>
      )}

      <button
        type="button"
        title="Mais opções"
        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
      >
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
}

const TONE_CLASSES = {
  emerald:
    'bg-emerald-50 text-emerald-600',
  red: 'bg-red-50 text-red-600',
  amber: 'bg-amber-50 text-amber-600',
  blue: 'bg-blue-50 text-blue-600',
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

          <strong className="mt-3 block truncate text-xl font-black tracking-tight text-slate-950">
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

function EmptyState() {
  return (
    <div className="mt-6 rounded-[24px] border border-dashed border-slate-300 bg-white p-14 text-center">
      <ReceiptText
        size={36}
        className="mx-auto text-slate-300"
      />

      <strong className="mt-4 block text-sm text-slate-700">
        Nenhuma solicitação encontrada
      </strong>

      <p className="mt-2 text-xs text-slate-400">
        Ajuste o período, o status ou a pesquisa.
      </p>
    </div>
  );
}

function generateReference(index) {
  return `REP-2026-${String(index).padStart(
    4,
    '0',
  )}`;
}
