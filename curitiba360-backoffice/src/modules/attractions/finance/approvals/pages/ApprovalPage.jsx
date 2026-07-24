import { useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  DollarSign,
  Download,
  Eye,
  FileCheck2,
  FileSpreadsheet,
  Filter,
  HandCoins,
  Landmark,
  Layers,
  Printer,
  ReceiptText,
  SearchCheck,
  ShieldAlert,
  ShieldCheck,
  Wallet,
  XCircle,
} from 'lucide-react';

import ReportHeader from '../../reports/components/ReportHeader';
import ReportTable from '../../reports/components/ReportTable';
import ApprovalStatusBadge from '../components/ApprovalStatusBadge';
import ApprovalFilters from '../components/ApprovalFilters';
import ApprovalDrawer from '../components/ApprovalDrawer';
import ApprovalModal from '../components/ApprovalModal';
import ApprovalRejectModal from '../components/ApprovalRejectModal';

import {
  approvalDashboardMock,
  approvalListMock,
  approvalStatusOptions,
  bankOptions,
} from '../data/approvalMock';

import {
  exportCsv,
  formatCurrency,
  formatDate,
  formatDateTime,
  sumBy,
} from '../../reports/utils/reportUtils';

export default function ApprovalPage() {
  const [approvals, setApprovals] = useState(approvalListMock);
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeDrawer, setActiveDrawer] = useState(null);
  const [approveModalItem, setApproveModalItem] = useState(null);
  const [rejectModalItem, setRejectModalItem] = useState(null);

  const [filters, setFilters] = useState({
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    status: 'all',
    bank: 'all',
    search: '',
  });

  const filteredApprovals = useMemo(() => {
    const searchValue = filters.search.trim().toLocaleLowerCase('pt-BR');

    return approvals.filter((item) => {
      const itemDate = new Date(item.requestDate);
      const startDate = new Date(`${filters.startDate}T00:00:00`);
      const endDate = new Date(`${filters.endDate}T23:59:59`);

      const matchesPeriod = itemDate >= startDate && itemDate <= endDate;
      const matchesStatus = filters.status === 'all' || item.status === filters.status;
      const matchesBank = filters.bank === 'all' || item.bank === filters.bank;

      const matchesSearch =
        !searchValue ||
        [item.id, item.producer, item.event, item.pixKey, item.requestedBy].some(
          (val) => String(val || '').toLocaleLowerCase('pt-BR').includes(searchValue)
        );

      return matchesPeriod && matchesStatus && matchesBank && matchesSearch;
    });
  }, [approvals, filters]);

  // Dashboard Stats
  const pendingCount = approvals.filter((a) => a.status === 'Pendente').length;
  const inAnalysisCount = approvals.filter((a) => a.status === 'Em análise').length;
  const approvedCount = approvals.filter((a) => a.status === 'Aprovado').length;
  const paidCount = approvals.filter((a) => a.status === 'Pago').length;

  const awaitingPaymentValue = sumBy(
    approvals.filter((a) => ['Pendente', 'Em análise', 'Aprovado'].includes(a.status)),
    'netAmount'
  );
  const paidTotalValue = sumBy(
    approvals.filter((a) => a.status === 'Pago'),
    'netAmount'
  );

  // Handlers para Ações
  function handleConfirmApprove({ id, observation }) {
    setApprovals((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'Aprovado',
              approvalDate: new Date().toISOString(),
              observation: observation || item.observation,
              timeline: item.timeline.map((t) =>
                t.step === 'Aprovado'
                  ? { ...t, completed: true, date: new Date().toISOString(), user: 'Financeiro Admin' }
                  : t
              ),
              auditLogs: [
                {
                  id: `log-${Date.now()}`,
                  date: new Date().toISOString(),
                  user: 'Financeiro Admin',
                  ip: '201.54.12.89',
                  action: 'Solicitação Aprovada',
                  observation: observation || 'Aprovação manual efetuada.',
                },
                ...item.auditLogs,
              ],
            }
          : item
      )
    );
    setApproveModalItem(null);
    if (activeDrawer?.id === id) setActiveDrawer(null);
  }

  function handleConfirmReject({ id, reason, observation }) {
    setApprovals((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: 'Rejeitado',
              observation: `[REJEITADO] ${reason}. ${observation}`,
              timeline: item.timeline.map((t) =>
                t.step === 'Rejeitado'
                  ? { ...t, completed: true, date: new Date().toISOString(), user: 'Financeiro Admin' }
                  : t
              ),
              auditLogs: [
                {
                  id: `log-${Date.now()}`,
                  date: new Date().toISOString(),
                  user: 'Financeiro Admin',
                  ip: '201.54.12.89',
                  action: 'Solicitação Rejeitada',
                  observation: `Motivo: ${reason}. Obs: ${observation}`,
                },
                ...item.auditLogs,
              ],
            }
          : item
      )
    );
    setRejectModalItem(null);
    if (activeDrawer?.id === id) setActiveDrawer(null);
  }

  function handleMarkPaid(item) {
    const confirmed = window.confirm(`Marcar o repasse ${item.id} (${formatCurrency(item.netAmount)}) como PAGO?`);
    if (!confirmed) return;

    setApprovals((current) =>
      current.map((a) =>
        a.id === item.id
          ? {
              ...a,
              status: 'Pago',
              paymentDate: new Date().toISOString(),
              timeline: a.timeline.map((t) =>
                ['Pagamento realizado', 'Comprovante enviado'].includes(t.step)
                  ? { ...t, completed: true, date: new Date().toISOString(), user: 'Sistema Financeiro' }
                  : t
              ),
              auditLogs: [
                {
                  id: `log-${Date.now()}`,
                  date: new Date().toISOString(),
                  user: 'Sistema Financeiro',
                  ip: '10.0.0.1',
                  action: 'Pagamento Concluído',
                  observation: 'Pagamento marcado manualmente como efetuado.',
                },
                ...a.auditLogs,
              ],
            }
          : a
      )
    );
    if (activeDrawer?.id === item.id) setActiveDrawer(null);
  }

  // Aprovação em lote
  function handleBatchApprove() {
    if (selectedIds.length === 0) return;
    const confirmed = window.confirm(`Deseja aprovar em lote as ${selectedIds.length} solicitações selecionadas?`);
    if (!confirmed) return;

    setApprovals((current) =>
      current.map((item) =>
        selectedIds.includes(item.id) && ['Pendente', 'Em análise'].includes(item.status)
          ? {
              ...item,
              status: 'Aprovado',
              approvalDate: new Date().toISOString(),
            }
          : item
      )
    );
    setSelectedIds([]);
  }

  function toggleSelectAll() {
    if (selectedIds.length === filteredApprovals.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredApprovals.map((item) => item.id));
    }
  }

  function toggleSelectItem(id) {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  }

  function handleExportXlsx() {
    exportCsv('aprovacao-de-repasses.csv', [
      ['PAINEL DE APROVAÇÃO DE REPASSES — CURITIBA 360'],
      [''],
      ['ID', 'Data Solicitação', 'Produtor', 'CNPJ', 'Evento', 'Banco', 'Chave PIX', 'Valor Bruto', 'Valor Líquido', 'Status', 'Solicitado Por'],
      ...filteredApprovals.map((item) => [
        item.id,
        item.requestDate,
        item.producer,
        item.producerDocument,
        item.event,
        item.bank,
        item.pixKey,
        item.grossAmount,
        item.netAmount,
        item.status,
        item.requestedBy,
      ]),
      [
        'TOTAL',
        '',
        '',
        '',
        '',
        '',
        '',
        sumBy(filteredApprovals, 'grossAmount'),
        sumBy(filteredApprovals, 'netAmount'),
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
      key: 'select',
      label: (
        <input
          type="checkbox"
          checked={selectedIds.length > 0 && selectedIds.length === filteredApprovals.length}
          onChange={toggleSelectAll}
          className="h-4 w-4 rounded border-slate-300 text-emerald-600"
        />
      ),
      render: (row) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.id)}
          onChange={() => toggleSelectItem(row.id)}
          className="h-4 w-4 rounded border-slate-300 text-emerald-600"
        />
      ),
    },
    {
      key: 'id',
      label: 'Código',
      render: (row) => (
        <strong className="font-mono text-xs text-slate-900 font-black">
          {row.id}
        </strong>
      ),
    },
    {
      key: 'requestDate',
      label: 'Data',
      render: (row) => formatDateTime(row.requestDate),
    },
    {
      key: 'producer',
      label: 'Produtor / Evento',
      render: (row) => (
        <div>
          <strong className="block text-slate-800 text-xs font-black truncate max-w-[180px]">
            {row.producer}
          </strong>
          <span className="text-[10px] text-slate-400 font-semibold truncate block max-w-[180px]">
            {row.event}
          </span>
        </div>
      ),
    },
    {
      key: 'bank',
      label: 'Banco / PIX',
      render: (row) => (
        <div>
          <strong className="block text-slate-700 text-xs font-bold">{row.bank}</strong>
          <span className="text-[10px] text-slate-400 font-mono font-medium truncate block max-w-[140px]">
            {row.pixKey}
          </span>
        </div>
      ),
    },
    {
      key: 'netAmount',
      label: 'Valor Líquido',
      render: (row) => (
        <strong className="text-emerald-700 font-black text-sm">
          {formatCurrency(row.netAmount)}
        </strong>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <ApprovalStatusBadge status={row.status} />,
    },
    {
      key: 'actions',
      label: 'Ações',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            title="Ver Detalhes (Drawer)"
            onClick={() => setActiveDrawer(row)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition"
          >
            <Eye size={15} />
          </button>

          {['Pendente', 'Em análise'].includes(row.status) && (
            <>
              <button
                type="button"
                title="Aprovar Repasse"
                onClick={() => setApproveModalItem(row)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition border border-emerald-200"
              >
                <ShieldCheck size={15} />
              </button>

              <button
                type="button"
                title="Rejeitar Repasse"
                onClick={() => setRejectModalItem(row)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition border border-rose-200"
              >
                <XCircle size={15} />
              </button>
            </>
          )}

          {row.status === 'Aprovado' && (
            <button
              type="button"
              title="Marcar como Pago"
              onClick={() => handleMarkPaid(row)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition"
            >
              <CheckCircle2 size={15} />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-[1700px] px-4 py-7 sm:px-6 lg:px-8 space-y-6">
        <ReportHeader
          title="Aprovação de Repasses (Módulo Operacional)"
          description="Painel administrativo para conciliação, análise documental e liberação dos saques dos produtores."
          onPrint={openPrintPage}
          onExportXlsx={handleExportXlsx}
          onExportPdf={openPrintPage}
        />

        {/* Dashboard Cards Superiores */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          <SummaryCard icon={Clock} label="Pendentes" value={pendingCount} tone="amber" />
          <SummaryCard icon={SearchCheck} label="Em Análise" value={inAnalysisCount} tone="blue" />
          <SummaryCard icon={ShieldCheck} label="Aprovados" value={approvedCount} tone="indigo" />
          <SummaryCard icon={CheckCircle2} label="Pagos" value={paidCount} tone="emerald" />
          <SummaryCard icon={Wallet} label="Aguardando Pgto" value={formatCurrency(awaitingPaymentValue)} tone="amber" highlight />
          <SummaryCard icon={DollarSign} label="Total Pago" value={formatCurrency(paidTotalValue)} tone="emerald" />
        </section>

        {/* Barra de Ações em Lote */}
        {selectedIds.length > 0 && (
          <section className="flex items-center justify-between rounded-2xl bg-slate-900 px-5 py-3.5 text-white shadow-lg animate-in fade-in">
            <span className="text-xs font-black">
              {selectedIds.length} solicitações selecionadas
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBatchApprove}
                className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-emerald-600 px-4 text-xs font-black text-white hover:bg-emerald-500 transition"
              >
                <ShieldCheck size={15} />
                Aprovar em Lote
              </button>
              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="inline-flex h-9 items-center px-3 text-xs font-bold text-slate-400 hover:text-white"
              >
                Cancelar Seleção
              </button>
            </div>
          </section>
        )}

        {/* Filtros */}
        <ApprovalFilters
          filters={filters}
          statusOptions={approvalStatusOptions}
          bankOptions={bankOptions}
          onChange={setFilters}
          onReset={() =>
            setFilters({
              startDate: '2026-01-01',
              endDate: '2026-12-31',
              status: 'all',
              bank: 'all',
              search: '',
            })
          }
        />

        {/* Tabela Principal */}
        <section className="space-y-4">
          <ReportTable
            columns={columns}
            rows={filteredApprovals}
            footer={[
              '',
              `Registros: ${filteredApprovals.length}`,
              '',
              '',
              '',
              formatCurrency(sumBy(filteredApprovals, 'netAmount')),
              '',
              '',
            ]}
          />
        </section>
      </main>

      {/* Drawer Lateral de Detalhes */}
      <ApprovalDrawer
        approval={activeDrawer}
        onClose={() => setActiveDrawer(null)}
        onApprove={(item) => {
          setActiveDrawer(null);
          setApproveModalItem(item);
        }}
        onReject={(item) => {
          setActiveDrawer(null);
          setRejectModalItem(item);
        }}
        onMarkPaid={(item) => {
          handleMarkPaid(item);
        }}
      />

      {/* Modal de Aprovação */}
      <ApprovalModal
        approval={approveModalItem}
        onClose={() => setApproveModalItem(null)}
        onConfirm={handleConfirmApprove}
      />

      {/* Modal de Rejeição */}
      <ApprovalRejectModal
        approval={rejectModalItem}
        onClose={() => setRejectModalItem(null)}
        onConfirm={handleConfirmReject}
      />
    </div>
  );
}

const TONE_CLASSES = {
  amber: 'bg-amber-50 text-amber-600',
  blue: 'bg-blue-50 text-blue-600',
  indigo: 'bg-indigo-50 text-indigo-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  slate: 'bg-slate-100 text-slate-600',
};

function SummaryCard({ icon: Icon, label, value, tone, highlight }) {
  return (
    <article
      className={`rounded-[22px] border p-4 shadow-sm transition ${
        highlight
          ? 'border-emerald-500 bg-emerald-600 text-white'
          : 'border-slate-200 bg-white text-slate-900'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span
            className={`text-xs font-bold ${
              highlight ? 'text-emerald-100' : 'text-slate-500'
            }`}
          >
            {label}
          </span>
          <strong
            className={`mt-2 block text-lg font-black tracking-tight ${
              highlight ? 'text-white' : 'text-slate-950'
            }`}
          >
            {value}
          </strong>
        </div>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
            highlight ? 'bg-emerald-500 text-white' : TONE_CLASSES[tone]
          }`}
        >
          <Icon size={17} />
        </span>
      </div>
    </article>
  );
}
