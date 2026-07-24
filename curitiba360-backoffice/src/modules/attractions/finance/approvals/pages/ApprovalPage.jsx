import {
  useMemo,
  useState,
} from 'react';

import {
  Banknote,
  CheckCircle2,
  Clock3,
  Eye,
  FileDown,
  SearchCheck,
  ShieldCheck,
  WalletCards,
} from 'lucide-react';

import ReportHeader from '../../reports/components/ReportHeader';
import ReportTable from '../../reports/components/ReportTable';

import ApprovalActionModal from '../components/ApprovalActionModal';
import ApprovalDetailsDrawer from '../components/ApprovalDetailsDrawer';
import ApprovalFilters from '../components/ApprovalFilters';
import ApprovalStatusBadge from '../components/ApprovalStatusBadge';

import { approvalStatusOptions } from '../data/approvalsMock';
import { useApprovals } from '../hooks/useApprovals';

import {
  exportCsv,
  formatCurrency,
  formatDateTime,
  sumBy,
} from '../../reports/utils/reportUtils';

const INITIAL_FILTERS = {
  startDate: '2026-01-01',
  endDate: '2026-12-31',
  status: 'all',
  producer: 'all',
  search: '',
};

export default function ApprovalPage() {
  const {
    approvals,
    isLoading,
    isMutating,
    error,
    changeStatus,
    approveMany,
  } = useApprovals();

  const [filters, setFilters] = useState(
    INITIAL_FILTERS,
  );

  const [selectedIds, setSelectedIds] =
    useState([]);

  const [drawerApproval, setDrawerApproval] =
    useState(null);

  const [modalAction, setModalAction] =
    useState(null);

  const producers = useMemo(
    () =>
      [
        ...new Set(
          approvals.map(
            (item) => item.producerName,
          ),
        ),
      ].sort(),
    [approvals],
  );

  const filteredRows = useMemo(() => {
    const searchValue = filters.search
      .trim()
      .toLocaleLowerCase('pt-BR');

    const initialDate = new Date(
      `${filters.startDate}T00:00:00`,
    );

    const finalDate = new Date(
      `${filters.endDate}T23:59:59`,
    );

    return approvals.filter((approval) => {
      const requestDate = new Date(
        approval.requestDate,
      );

      const matchesDate =
        requestDate >= initialDate &&
        requestDate <= finalDate;

      const matchesStatus =
        filters.status === 'all' ||
        approval.status === filters.status;

      const matchesProducer =
        filters.producer === 'all' ||
        approval.producerName ===
          filters.producer;

      const matchesSearch =
        !searchValue ||
        [
          approval.reference,
          approval.eventName,
          approval.bank,
          approval.producerName,
        ].some((value) =>
          value
            .toLocaleLowerCase('pt-BR')
            .includes(searchValue),
        );

      return (
        matchesDate &&
        matchesStatus &&
        matchesProducer &&
        matchesSearch
      );
    });
  }, [approvals, filters]);

  const summary = useMemo(
    () => ({
      pending: approvals.filter(
        (item) => item.status === 'Pendente',
      ).length,
      analysis: approvals.filter(
        (item) =>
          item.status === 'Em análise',
      ).length,
      approved: approvals.filter(
        (item) => item.status === 'Aprovado',
      ).length,
      paid: approvals.filter(
        (item) => item.status === 'Pago',
      ).length,
      waitingValue: sumBy(
        approvals.filter((item) =>
          [
            'Pendente',
            'Em análise',
            'Aprovado',
          ].includes(item.status),
        ),
        'netAmount',
      ),
    }),
    [approvals],
  );

  function toggleSelection(id) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter(
            (selectedId) =>
              selectedId !== id,
          )
        : [...current, id],
    );
  }

  async function handleModalConfirm(payload) {
    const updated = await changeStatus(
      drawerApproval.id,
      payload,
    );

    setDrawerApproval(updated);
    setModalAction(null);
  }

  async function handleBulkApproval() {
    if (!selectedIds.length) {
      return;
    }

    await approveMany(selectedIds);
    setSelectedIds([]);
  }

  function handleExport() {
    exportCsv(
      'aprovacao-de-repasses.csv',
      [
        [
          'Referência',
          'Data',
          'Produtor',
          'Evento',
          'Banco',
          'Valor',
          'Taxa',
          'Valor líquido',
          'Status',
          'Solicitado por',
        ],
        ...filteredRows.map((row) => [
          row.reference,
          row.requestDate,
          row.producerName,
          row.eventName,
          row.bank,
          row.amount,
          row.fee,
          row.netAmount,
          row.status,
          row.requestedBy,
        ]),
      ],
    );
  }

  const columns = [
    {
      key: 'selection',
      label: '',
      render: (row) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(
            row.id,
          )}
          onChange={() =>
            toggleSelection(row.id)
          }
          className="h-4 w-4 rounded border-slate-300 accent-emerald-600"
        />
      ),
    },
    {
      key: 'requestDate',
      label: 'Data',
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
      key: 'producerName',
      label: 'Produtor',
    },
    {
      key: 'eventName',
      label: 'Evento',
    },
    {
      key: 'bank',
      label: 'Banco',
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
      key: 'status',
      label: 'Status',
      render: (row) => (
        <ApprovalStatusBadge
          status={row.status}
        />
      ),
    },
    {
      key: 'actions',
      label: 'Ações',
      render: (row) => (
        <button
          type="button"
          onClick={() =>
            setDrawerApproval(row)
          }
          className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 px-3 text-[10px] font-black text-slate-600 hover:bg-slate-50"
        >
          <Eye size={14} />
          Analisar
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-[1800px] px-4 py-7 sm:px-6 lg:px-8">
        <ReportHeader
          title="Aprovação de Repasses"
          description="Analise, aprove e registre o pagamento das solicitações financeiras."
          onExportXlsx={handleExport}
          onExportPdf={() =>
            window.open(
              `${window.location.pathname}/impressao`,
              '_blank',
            )
          }
          onPrint={() =>
            window.open(
              `${window.location.pathname}/impressao`,
              '_blank',
            )
          }
        />

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <SummaryCard
            icon={Clock3}
            label="Pendentes"
            value={summary.pending}
            tone="amber"
          />

          <SummaryCard
            icon={SearchCheck}
            label="Em análise"
            value={summary.analysis}
            tone="blue"
          />

          <SummaryCard
            icon={ShieldCheck}
            label="Aprovados"
            value={summary.approved}
            tone="violet"
          />

          <SummaryCard
            icon={CheckCircle2}
            label="Pagos"
            value={summary.paid}
            tone="emerald"
          />

          <SummaryCard
            icon={WalletCards}
            label="Aguardando pagamento"
            value={formatCurrency(
              summary.waitingValue,
            )}
            tone="red"
          />
        </section>

        <section className="mt-6">
          <ApprovalFilters
            filters={filters}
            statusOptions={
              approvalStatusOptions
            }
            producers={producers}
            onChange={setFilters}
            onReset={() =>
              setFilters(INITIAL_FILTERS)
            }
          />
        </section>

        {selectedIds.length > 0 && (
          <section className="mt-4 flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <strong className="text-sm font-black text-emerald-800">
              {selectedIds.length}{' '}
              solicitações selecionadas
            </strong>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={isMutating}
                onClick={handleBulkApproval}
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-emerald-600 px-4 text-xs font-black text-white hover:bg-emerald-700 font-sans"
              >
                <ShieldCheck size={15} />
                Aprovar selecionados
              </button>

              <button
                type="button"
                onClick={handleExport}
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 text-xs font-black text-emerald-700 font-sans"
              >
                <FileDown size={15} />
                Exportar
              </button>
            </div>
          </section>
        )}

        {error && (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">
            {error}
          </div>
        )}

        <section className="mt-4">
          {isLoading ? (
            <div className="rounded-[24px] border border-slate-200 bg-white p-16 text-center text-sm font-black text-slate-400">
              Carregando solicitações...
            </div>
          ) : (
            <ReportTable
              columns={columns}
              rows={filteredRows}
              footer={[
                '',
                `Registros: ${filteredRows.length}`,
                '',
                '',
                '',
                '',
                formatCurrency(
                  sumBy(
                    filteredRows,
                    'netAmount',
                  ),
                ),
                '',
                '',
              ]}
            />
          )}
        </section>
      </main>

      <ApprovalDetailsDrawer
        approval={drawerApproval}
        onClose={() =>
          setDrawerApproval(null)
        }
        onAction={setModalAction}
      />

      <ApprovalActionModal
        approval={drawerApproval}
        action={modalAction}
        isLoading={isMutating}
        onClose={() =>
          setModalAction(null)
        }
        onConfirm={handleModalConfirm}
      />
    </div>
  );
}

const TONES = {
  amber: 'bg-amber-50 text-amber-600',
  blue: 'bg-blue-50 text-blue-600',
  violet:
    'bg-violet-50 text-violet-600',
  emerald:
    'bg-emerald-50 text-emerald-600',
  red: 'bg-red-50 text-red-600',
};

function SummaryCard({
  icon: Icon,
  label,
  value,
  tone,
}) {
  return (
    <article className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="text-xs font-bold text-slate-500">
            {label}
          </span>

          <strong className="mt-3 block truncate text-xl font-black text-slate-950">
            {value}
          </strong>
        </div>

        <span
          className={[
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl',
            TONES[tone],
          ].join(' ')}
        >
          <Icon size={19} />
        </span>
      </div>
    </article>
  );
}
