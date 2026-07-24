import { useMemo, useState } from 'react';
import {
  Banknote,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  DollarSign,
  FileText,
  HandCoins,
  Landmark,
  Lock,
  Plus,
  ReceiptText,
  RotateCcw,
  Search,
  Wallet,
} from 'lucide-react';

import ReportHeader from '../reports/components/ReportHeader';
import ReportTable from '../reports/components/ReportTable';
import WithdrawalStatusBadge from '../components/WithdrawalStatusBadge';
import WithdrawalRequestForm from '../components/WithdrawalRequestForm';

import {
  bankAccountMock,
  withdrawalRequestsMock,
  withdrawalStatusOptions,
  withdrawalSummaryMock,
} from '../data/withdrawalMock';

import {
  exportCsv,
  formatCurrency,
  formatDate,
  formatDateTime,
  sumBy,
} from '../reports/utils/reportUtils';

export default function WithdrawalRequestPage() {
  const [requests, setRequests] = useState(withdrawalRequestsMock);
  const [summary, setSummary] = useState(withdrawalSummaryMock);

  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
  });

  const filteredRequests = useMemo(() => {
    const searchValue = filters.search.trim().toLocaleLowerCase('pt-BR');

    return requests.filter((row) => {
      const matchesStatus =
        filters.status === 'all' || row.status === filters.status;

      const matchesSearch =
        !searchValue ||
        [row.id, row.bank, row.account, row.pixKey, row.notes].some((val) =>
          String(val || '')
            .toLocaleLowerCase('pt-BR')
            .includes(searchValue)
        );

      return matchesStatus && matchesSearch;
    });
  }, [requests, filters]);

  function handleNewRequest({ amount, notes }) {
    const newId = `withdraw-${String(requests.length + 1).padStart(3, '0')}`;
    const newEntry = {
      id: newId,
      requestDate: new Date().toISOString(),
      approvalDate: null,
      paymentDate: null,
      amount,
      bank: bankAccountMock.bank,
      agency: bankAccountMock.agency,
      account: bankAccountMock.account,
      pixKey: bankAccountMock.pixKey,
      status: 'Pendente',
      notes,
    };

    setRequests([newEntry, ...requests]);

    setSummary((prev) => ({
      ...prev,
      availableBalance: prev.availableBalance - amount,
      requestedAmount: prev.requestedAmount + amount,
    }));
  }

  function handleExportXlsx() {
    exportCsv('solicitacoes-de-repasse.csv', [
      ['SOLICITAÇÕES DE REPASSE — CURITIBA 360'],
      ['Saldo Disponível', summary.availableBalance],
      ['Saldo Bloqueado', summary.blockedBalance],
      ['Valor Solicitado', summary.requestedAmount],
      ['Valor Pago', summary.paidAmount],
      [''],
      ['ID', 'Data da Solicitação', 'Valor', 'Banco', 'Agência', 'Conta', 'Chave PIX', 'Status', 'Observações'],
      ...filteredRequests.map((r) => [
        r.id,
        r.requestDate,
        r.amount,
        r.bank,
        r.agency,
        r.account,
        r.pixKey,
        r.status,
        r.notes || '',
      ]),
      [
        'TOTAL',
        '',
        sumBy(filteredRequests, 'amount'),
        '',
        '',
        '',
        '',
        '',
        '',
      ],
    ]);
  }

  function openPrintPage() {
    const currentPath = window.location.pathname.replace(/\/$/, '');
    window.open(`${currentPath}/impressao`, '_blank', 'noopener,noreferrer');
  }

  const columns = [
    {
      key: 'id',
      label: 'Código',
      render: (r) => (
        <span className="font-mono text-[11px] font-black text-slate-700">
          {r.id}
        </span>
      ),
    },
    {
      key: 'requestDate',
      label: 'Solicitado em',
      render: (r) => formatDateTime(r.requestDate),
    },
    {
      key: 'amount',
      label: 'Valor',
      render: (r) => (
        <strong className="text-slate-900 font-black">
          {formatCurrency(r.amount)}
        </strong>
      ),
    },
    {
      key: 'bank',
      label: 'Banco / Conta',
      render: (r) => (
        <div>
          <strong className="block text-slate-800 text-xs">{r.bank}</strong>
          <span className="text-[10px] text-slate-400 font-medium">
            Ag: {r.agency} · CC: {r.account}
          </span>
        </div>
      ),
    },
    {
      key: 'pixKey',
      label: 'Chave PIX',
      render: (r) => (
        <span className="font-mono text-[11px] font-bold text-slate-600">
          {r.pixKey}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (r) => <WithdrawalStatusBadge status={r.status} />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-[1700px] px-4 py-7 sm:px-6 lg:px-8 space-y-6">
        <ReportHeader
          title="Solicitações de Repasse"
          description="Gestão de saques e transferências dos saldos acumulados pelas vendas de ingressos."
          onPrint={openPrintPage}
          onExportXlsx={handleExportXlsx}
          onExportPdf={openPrintPage}
        />

        {/* Cards Superiores */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <SummaryCard
            icon={Wallet}
            label="Saldo Disponível"
            value={formatCurrency(summary.availableBalance)}
            tone="emerald"
            highlight
          />
          <SummaryCard
            icon={Lock}
            label="Saldo Bloqueado"
            value={formatCurrency(summary.blockedBalance)}
            tone="amber"
          />
          <SummaryCard
            icon={Clock3}
            label="Valor Solicitado"
            value={formatCurrency(summary.requestedAmount)}
            tone="blue"
          />
          <SummaryCard
            icon={CheckCircle2}
            label="Valor Pago"
            value={formatCurrency(summary.paidAmount)}
            tone="indigo"
          />
          <SummaryCard
            icon={CalendarDays}
            label="Próximo Repasse"
            value={formatDate(summary.nextPayoutDate)}
            tone="slate"
          />
        </section>

        {/* Grid: Formulário + Dados Bancários */}
        <section className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <WithdrawalRequestForm
              availableBalance={summary.availableBalance}
              minimumAmount={summary.minimumWithdrawalAmount}
              onSubmitRequest={handleNewRequest}
            />
          </div>

          <div className="lg:col-span-5">
            <BankAccountCard account={bankAccountMock} />
          </div>
        </section>

        {/* Seção do Histórico */}
        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-base font-black text-slate-900">
                Histórico de Solicitações
              </h2>
              <p className="mt-0.5 text-xs font-medium text-slate-500">
                Acompanhe o andamento das solicitações de saque da atração.
              </p>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[200px]">
                <Search
                  size={15}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="search"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                  placeholder="Pesquisar..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs font-bold text-slate-700 outline-none transition focus:border-emerald-500"
                />
              </div>

              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 outline-none focus:border-emerald-500"
              >
                <option value="all">Todos os Status</option>
                {withdrawalStatusOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <ReportTable
            columns={columns}
            rows={filteredRequests}
            footer={[
              `Registros: ${filteredRequests.length}`,
              '',
              formatCurrency(sumBy(filteredRequests, 'amount')),
              '',
              '',
              '',
            ]}
          />
        </section>
      </main>
    </div>
  );
}

function BankAccountCard({ account }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm text-left space-y-4">
      <div>
        <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
          <Landmark size={18} className="text-emerald-600" />
          Conta Bancária Homologada
        </h2>
        <p className="mt-1 text-xs font-medium text-slate-500">
          Conta cadastrada para crédito automático dos repasses.
        </p>
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
          <span className="font-bold text-slate-400 uppercase text-[10px]">Instituição</span>
          <strong className="font-black text-slate-800">{account.bank} ({account.bankCode})</strong>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
          <span className="font-bold text-slate-400 uppercase text-[10px]">Agência e Conta</span>
          <strong className="font-black text-slate-800">Ag: {account.agency} · CC: {account.account}</strong>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
          <span className="font-bold text-slate-400 uppercase text-[10px]">Titular</span>
          <strong className="font-black text-slate-800">{account.holder}</strong>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
          <span className="font-bold text-slate-400 uppercase text-[10px]">CNPJ / Documento</span>
          <strong className="font-mono font-bold text-slate-700">{account.document}</strong>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-emerald-50/60 border border-emerald-200 p-3">
          <span className="font-bold text-emerald-800 uppercase text-[10px]">Chave PIX Ativa</span>
          <strong className="font-mono font-black text-emerald-900">{account.pixKey}</strong>
        </div>
      </div>
    </div>
  );
}

const TONE_CLASSES = {
  emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  blue: 'bg-blue-50 text-blue-600',
  indigo: 'bg-indigo-50 text-indigo-600',
  slate: 'bg-slate-100 text-slate-600',
};

function SummaryCard({ icon: Icon, label, value, tone, highlight }) {
  return (
    <article
      className={`rounded-[22px] border p-5 shadow-sm transition ${
        highlight
          ? 'border-emerald-500 bg-emerald-600 text-white'
          : 'border-slate-200 bg-white text-slate-900'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <span
            className={`text-xs font-bold ${
              highlight ? 'text-emerald-100' : 'text-slate-500'
            }`}
          >
            {label}
          </span>
          <strong
            className={`mt-2 block text-xl font-black tracking-tight ${
              highlight ? 'text-white' : 'text-slate-950'
            }`}
          >
            {value}
          </strong>
        </div>

        <span
          className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
            highlight ? 'bg-emerald-500 text-white' : TONE_CLASSES[tone]
          }`}
        >
          <Icon size={18} />
        </span>
      </div>
    </article>
  );
}
