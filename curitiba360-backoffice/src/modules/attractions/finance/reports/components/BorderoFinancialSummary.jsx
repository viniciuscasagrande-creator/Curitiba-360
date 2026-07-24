import {
  ArrowDown,
  ArrowUp,
  Equal,
} from 'lucide-react';

import { formatCurrency } from '../utils/reportUtils';

export default function BorderoFinancialSummary({
  bordero,
}) {
  const entries = [
    {
      id: 'grossRevenue',
      label: 'Receita bruta',
      value: bordero.grossRevenue,
      type: 'income',
    },
    {
      id: 'platformFee',
      label: 'Taxa da plataforma',
      value: bordero.platformFee,
      type: 'expense',
    },
    {
      id: 'gatewayFee',
      label: 'Taxa do gateway',
      value: bordero.gatewayFee,
      type: 'expense',
    },
    {
      id: 'anticipationFee',
      label: 'Taxa de antecipação',
      value: bordero.anticipationFee,
      type: 'expense',
    },
    {
      id: 'commissions',
      label: 'Comissões',
      value: bordero.commissions,
      type: 'expense',
    },
    {
      id: 'taxes',
      label: 'Impostos',
      value: bordero.taxes,
      type: 'expense',
    },
    {
      id: 'discounts',
      label: 'Descontos',
      value: bordero.discounts,
      type: 'expense',
    },
    {
      id: 'refunds',
      label: 'Estornos',
      value: bordero.refunds,
      type: 'expense',
    },
    {
      id: 'courtesyValue',
      label: 'Cortesias',
      value: bordero.courtesyValue,
      type: 'expense',
    },
  ];

  return (
    <article className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm text-left">
      <div>
        <h2 className="text-base font-black text-slate-900">
          Composição financeira
        </h2>

        <p className="mt-1 text-xs font-medium text-slate-500">
          Memória de cálculo utilizada no fechamento.
        </p>
      </div>

      <div className="mt-6 divide-y divide-slate-100">
        {entries.map((entry) => (
          <SummaryLine
            key={entry.id}
            {...entry}
          />
        ))}
      </div>

      <div className="mt-4 space-y-3 border-t-2 border-slate-200 pt-5">
        <TotalLine
          label="Receita líquida"
          value={bordero.netRevenue}
          icon={Equal}
          className="bg-slate-100 text-slate-900"
        />

        <TotalLine
          label="Valor do repasse"
          value={bordero.transferValue}
          icon={ArrowUp}
          className="bg-emerald-50 text-emerald-800"
        />
      </div>
    </article>
  );
}

function SummaryLine({
  label,
  value,
  type,
}) {
  const isIncome = type === 'income';

  const Icon = isIncome
    ? ArrowUp
    : ArrowDown;

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="flex items-center gap-3">
        <span
          className={[
            'flex h-8 w-8 items-center justify-center rounded-xl',
            isIncome
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-red-50 text-red-500',
          ].join(' ')}
        >
          <Icon size={14} />
        </span>

        <span className="text-sm font-bold text-slate-600">
          {isIncome ? '' : '(-) '}
          {label}
        </span>
      </div>

      <strong
        className={[
          'text-sm font-black',
          isIncome
            ? 'text-emerald-700'
            : 'text-red-600',
        ].join(' ')}
      >
        {isIncome ? '' : '- '}
        {formatCurrency(value)}
      </strong>
    </div>
  );
}

function TotalLine({
  label,
  value,
  icon: Icon,
  className,
}) {
  return (
    <div
      className={[
        'flex items-center justify-between gap-4 rounded-2xl p-4',
        className,
      ].join(' ')}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} />

        <span className="text-sm font-black">
          {label}
        </span>
      </div>

      <strong className="text-lg font-black">
        {formatCurrency(value)}
      </strong>
    </div>
  );
}
