import React, { useMemo, useState } from 'react';
import {
  Banknote,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Landmark,
  MapPin,
  QrCode,
  ReceiptText,
  Ticket,
  WalletCards
} from 'lucide-react';

const periods = [
  { id: 'all', label: 'Tudo' },
  { id: 'today', label: 'Hoje' },
  { id: '7days', label: '7 dias' },
  { id: '30days', label: '30 dias' }
];

const metrics = [
  {
    id: 'sold',
    title: 'Ingressos vendidos',
    description: 'Ingressos vendidos no período',
    icon: Ticket,
    quantity: 224,
    mainLabel: 'Unidades vendidas',
    secondary: [
      { label: 'Valor das vendas', value: 'R$ 3.900,00' },
      { label: 'Ticket médio', value: 'R$ 17,41' }
    ],
    variation: '+8%'
  },
  {
    id: 'issued',
    title: 'Ingressos emitidos',
    description: 'Ingressos emitidos no período',
    icon: ReceiptText,
    quantity: 226,
    mainLabel: 'Unidades emitidas',
    secondary: [
      { label: 'Cortesias', value: '2' },
      { label: 'Total', value: '226' }
    ],
    variation: '+8%'
  },
  {
    id: 'reserved',
    title: 'Ingressos reservados',
    description: 'Ingressos reservados no período',
    icon: CalendarDays,
    quantity: 0,
    mainLabel: 'Unidades reservadas',
    secondary: [
      { label: 'Quantidade', value: '0' },
      { label: 'Total', value: 'R$ 0,00' }
    ],
    variation: '0%'
  },
  {
    id: 'validated',
    title: 'Ingressos validados',
    description: 'Ingressos validados no período',
    icon: CheckCircle2,
    quantity: 224,
    mainLabel: 'Unidades validadas',
    secondary: [
      { label: 'Validados', value: '224' },
      { label: 'Pendentes', value: '2' }
    ],
    variation: '+8%'
  },
  {
    id: 'cash',
    title: 'Vendas em dinheiro',
    description: 'Pagamentos realizados em dinheiro',
    icon: Banknote,
    quantity: 125,
    mainLabel: 'Ingressos vendidos',
    secondary: [
      { label: 'Quantidade', value: '125' },
      { label: 'Total', value: 'R$ 2.125,00' }
    ],
    variation: '+4%'
  },
  {
    id: 'debit',
    title: 'Cartão de débito',
    description: 'Vendas realizadas no cartão de débito',
    icon: CreditCard,
    quantity: 125,
    mainLabel: 'Ingressos vendidos',
    secondary: [
      { label: 'Quantidade', value: '125' },
      { label: 'Total', value: 'R$ 2.125,00' }
    ],
    variation: '+8%'
  },
  {
    id: 'credit',
    title: 'Cartão de crédito',
    description: 'Vendas realizadas no cartão de crédito',
    icon: WalletCards,
    quantity: 125,
    mainLabel: 'Ingressos vendidos',
    secondary: [
      { label: 'Quantidade', value: '125' },
      { label: 'Total', value: 'R$ 2.125,00' }
    ],
    variation: '+8%'
  },
  {
    id: 'installments',
    title: 'Crédito parcelado',
    description: 'Vendas realizadas com parcelamento',
    icon: CreditCard,
    quantity: 125,
    mainLabel: 'Ingressos vendidos',
    secondary: [
      { label: 'Quantidade', value: '125' },
      { label: 'Total', value: 'R$ 2.125,00' }
    ],
    variation: '+6%'
  },
  {
    id: 'pix',
    title: 'Vendas no PIX',
    description: 'Pagamentos confirmados via PIX',
    icon: QrCode,
    quantity: 125,
    mainLabel: 'Ingressos vendidos',
    secondary: [
      { label: 'Quantidade', value: '125' },
      { label: 'Total', value: 'R$ 2.125,00' }
    ],
    variation: '+12%'
  },
  {
    id: 'transfer',
    title: 'Depósito, TED e transferência',
    description: 'Pagamentos por transferência bancária',
    icon: Landmark,
    quantity: 125,
    mainLabel: 'Ingressos vendidos',
    secondary: [
      { label: 'Quantidade', value: '125' },
      { label: 'Total', value: 'R$ 2.125,00' }
    ],
    variation: '+3%'
  }
];

function MetricCard({ metric }) {
  const Icon = metric.icon;

  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md text-left">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
            <Icon size={21} />
          </span>

          <div>
            <h3 className="text-sm font-black text-slate-900">
              {metric.title}
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              {metric.description}
            </p>
          </div>
        </div>

        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
          {metric.variation}
        </span>
      </div>

      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-medium text-slate-500">
          Quantidade de ingressos
        </p>

        <strong className="mt-2 block text-3xl font-black tracking-tight text-slate-950">
          {metric.quantity}
        </strong>

        <span className="mt-1 block text-xs text-slate-400 font-medium">
          {metric.mainLabel}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {metric.secondary.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 p-3"
          >
            <p className="text-[11px] text-slate-500 font-medium">
              {item.label}
            </p>

            <strong className="mt-1 block text-sm text-slate-800">
              {item.value}
            </strong>
          </div>
        ))}
      </div>
    </article>
  );
}

export function AttractionTotalsPage() {
  const [period, setPeriod] = useState('all');

  const selectedPeriod = useMemo(
    () => periods.find((item) => item.id === period),
    [period]
  );

  return (
    <div className="mx-auto max-w-[1600px] space-y-7 text-left">
      <section className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
            Gestão de atrações
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
            Parque Jaime Lerner
          </h1>

          <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500 font-medium">
            <MapPin size={16} className="text-emerald-600" />
            Pilarzinho, Curitiba
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {periods.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPeriod(item.id)}
              className={[
                'rounded-2xl px-4 py-2.5 text-xs font-bold transition',
                period === item.id
                  ? 'bg-slate-950 text-white'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
              ].join(' ')}
            >
              {item.label}
            </button>
          ))}

          <button
            type="button"
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            <CalendarDays size={16} />
            Período
          </button>
        </div>
      </section>

      <div className="rounded-3xl border border-emerald-100 bg-emerald-50/70 px-5 py-4">
        <p className="text-sm font-semibold text-emerald-900">
          Exibindo indicadores do período:
          {' '}
          <strong>{selectedPeriod?.label}</strong>
        </p>
      </div>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard key={metric.id} metric={metric} />
        ))}
      </section>
    </div>
  );
}

export default AttractionTotalsPage;
