import { useMemo, useState } from 'react';
import {
  Banknote,
  Check,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  ReceiptText,
  X,
} from 'lucide-react';

const INITIAL_ROWS = [
  {
    id: 'attraction-1',
    name: 'Ópera de Arame',
    status: 'awaiting',
    releaseDate: '2026-12-02T16:44:22',
    netRevenue: 88000,
    availableTransfer: 10000,
    items: [
      {
        id: 'item-1',
        name: 'Ingressos',
        value: 100000,
        type: 'revenue',
        status: 'received',
        notes: '',
      },
      {
        id: 'item-2',
        name: 'Comissão de agentes',
        value: 1000,
        type: 'expense',
        status: 'pending',
        notes: '',
      },
      {
        id: 'item-3',
        name: 'Repasse',
        value: 9000,
        type: 'expense',
        status: 'blocked',
        notes: 'Cliente com bloqueio',
      },
      {
        id: 'item-4',
        name: 'Encargos',
        value: 900,
        type: 'expense',
        status: 'pending',
        notes: '',
      },
    ],
  },
  {
    id: 'attraction-2',
    name: 'Rua da Música',
    status: 'released',
    releaseDate: '2026-12-02T16:44:22',
    netRevenue: 42000,
    availableTransfer: 7000,
    items: [],
  },
];

export default function AttractionExpensesPage() {
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [expandedIds, setExpandedIds] = useState([
    'attraction-1',
  ]);
  const [transferModal, setTransferModal] =
    useState(null);

  const totals = useMemo(() => {
    return rows.reduce(
      (result, row) => {
        result.netRevenue += row.netRevenue;
        result.available += row.availableTransfer;

        return result;
      },
      {
        netRevenue: 0,
        available: 0,
      },
    );
  }, [rows]);

  function toggleExpanded(id) {
    setExpandedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function requestTransfer(amount) {
    setRows((current) =>
      current.map((row) =>
        row.id === transferModal.id
          ? {
              ...row,
              availableTransfer:
                row.availableTransfer - amount,
              status: 'requested',
            }
          : row,
      ),
    );

    setTransferModal(null);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-left">
      <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8">
        <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-600">
          <ReceiptText size={15} />
          Gestão financeira
        </p>

        <h1 className="mt-2 text-3xl font-black text-slate-950">
          Resumo das despesas
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Acompanhe receitas, despesas, bloqueios e
          repasses.
        </p>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <KpiCard
            title="Receita líquida"
            value={formatCurrency(totals.netRevenue)}
            icon={CircleDollarSign}
          />

          <KpiCard
            title="Disponível para repasse"
            value={formatCurrency(totals.available)}
            icon={Banknote}
          />

          <KpiCard
            title="Atrações acompanhadas"
            value={rows.length}
            icon={ReceiptText}
          />
        </section>

        <section className="mt-6 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="w-14" />

                  {[
                    'Nome',
                    'Status',
                    'Data de liberação',
                    'Receita líquida',
                    'Repasse',
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-4 py-4 text-left text-[10px] font-black uppercase tracking-[0.12em] text-slate-500"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => (
                  <ExpenseRows
                    key={row.id}
                    row={row}
                    expanded={expandedIds.includes(
                      row.id,
                    )}
                    onToggle={() =>
                      toggleExpanded(row.id)
                    }
                    onRequest={() =>
                      setTransferModal(row)
                    }
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {transferModal && (
        <TransferRequestModal
          attraction={transferModal}
          onClose={() => setTransferModal(null)}
          onSubmit={requestTransfer}
        />
      )}
    </div>
  );
}

function ExpenseRows({
  row,
  expanded,
  onToggle,
  onRequest,
}) {
  return (
    <>
      <tr className="border-t border-slate-100">
        <td className="px-4 py-4">
          <button
            type="button"
            onClick={onToggle}
            className="rounded-xl p-2 hover:bg-slate-100"
          >
            {expanded ? (
              <ChevronUp size={17} />
            ) : (
              <ChevronDown size={17} />
            )}
          </button>
        </td>

        <td className="px-4 py-4 text-sm font-black text-slate-800">
          {row.name}
        </td>

        <td className="px-4 py-4">
          <MainStatus status={row.status} />
        </td>

        <td className="px-4 py-4 text-xs text-slate-600">
          {formatDateTime(row.releaseDate)}
        </td>

        <td className="px-4 py-4 text-sm font-black text-slate-700">
          {formatCurrency(row.netRevenue)}
        </td>

        <td className="px-4 py-4">
          <button
            type="button"
            disabled={row.availableTransfer <= 0}
            onClick={onRequest}
            className="rounded-2xl bg-amber-400 px-4 py-2 text-xs font-black text-slate-950 disabled:opacity-40"
          >
            Solicitar repasse
          </button>
        </td>
      </tr>

      {expanded && (
        <tr>
          <td />

          <td colSpan={5} className="px-4 pb-5">
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    {[
                      'Nome',
                      'Valor',
                      'Tipo',
                      'Status',
                      'Observações',
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="px-4 py-3 text-left text-[10px] font-black uppercase text-slate-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {row.items.length ? (
                    row.items.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-slate-100"
                      >
                        <td className="px-4 py-4 text-xs font-black text-slate-700">
                          {item.name}
                        </td>

                        <td className="px-4 py-4 text-xs text-slate-600">
                          {formatCurrency(item.value)}
                        </td>

                        <td className="px-4 py-4">
                          <TypeBadge type={item.type} />
                        </td>

                        <td className="px-4 py-4">
                          <ItemStatus
                            status={item.status}
                          />
                        </td>

                        <td className="px-4 py-4 text-xs text-slate-500">
                          {item.notes || '-'}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-8 text-center text-sm text-slate-400"
                      >
                        Sem lançamentos financeiros.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function TransferRequestModal({
  attraction,
  onClose,
  onSubmit,
}) {
  const [amount, setAmount] = useState(
    attraction.availableTransfer,
  );

  const invalid =
    amount <= 0 ||
    amount > attraction.availableTransfer;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm text-left">
      <button
        type="button"
        className="absolute inset-0"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-950">
              Solicitar repasse
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Disponível:{' '}
              <strong>
                {formatCurrency(
                  attraction.availableTransfer,
                )}
              </strong>
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl bg-slate-100 p-3"
          >
            <X size={17} />
          </button>
        </div>

        <label className="mt-6 block">
          <span className="mb-2 block text-xs font-black text-slate-700">
            Valor solicitado
          </span>

          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(event) =>
              setAmount(Number(event.target.value))
            }
            className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm font-bold outline-none focus:border-emerald-500"
          />
        </label>

        {invalid && (
          <p className="mt-2 text-xs font-bold text-rose-600">
            Informe um valor entre R$ 0,01 e{' '}
            {formatCurrency(
              attraction.availableTransfer,
            )}
            .
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() =>
              setAmount(
                attraction.availableTransfer,
              )
            }
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-600"
          >
            Valor total
          </button>

          <button
            type="button"
            disabled={invalid}
            onClick={() => onSubmit(amount)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-black text-white disabled:opacity-40"
          >
            Solicitar
            <Check size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function KpiCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <article className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-slate-500">
            {title}
          </p>

          <strong className="mt-3 block text-2xl font-black text-slate-950">
            {value}
          </strong>
        </div>

        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <Icon size={20} />
        </span>
      </div>
    </article>
  );
}

function MainStatus({ status }) {
  const statuses = {
    awaiting: {
      label: 'Aguardando liberação',
      className: 'bg-slate-100 text-slate-600',
    },
    released: {
      label: 'Liberado',
      className: 'bg-emerald-50 text-emerald-700',
    },
    requested: {
      label: 'Repasse solicitado',
      className: 'bg-amber-50 text-amber-700',
    },
  };

  const current = statuses[status] || statuses.awaiting;

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-[10px] font-black ${current.className}`}
    >
      {current.label}
    </span>
  );
}

function TypeBadge({ type }) {
  const revenue = type === 'revenue';

  return (
    <span
      className={[
        'rounded-full px-3 py-1 text-[10px] font-black',
        revenue
          ? 'bg-emerald-50 text-emerald-700'
          : 'bg-rose-50 text-rose-600',
      ].join(' ')}
    >
      {revenue ? 'Receita' : 'Despesa'}
    </span>
  );
}

function ItemStatus({ status }) {
  const statuses = {
    received: {
      label: 'Recebido',
      className: 'bg-emerald-50 text-emerald-700',
    },
    pending: {
      label: 'Pendente',
      className: 'bg-amber-50 text-amber-700',
    },
    blocked: {
      label: 'Bloqueio financeiro',
      className: 'bg-rose-50 text-rose-600',
    },
  };

  const current = statuses[status] || statuses.pending;

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-[10px] font-black ${current.className}`}
    >
      {current.label}
    </span>
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(value || 0));
}

function formatDateTime(value) {
  if (!value) return '-';
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}
