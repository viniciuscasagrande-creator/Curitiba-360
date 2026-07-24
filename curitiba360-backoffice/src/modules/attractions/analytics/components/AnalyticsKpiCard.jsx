import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
  TrendingUp,
} from 'lucide-react';

export default function AnalyticsKpiCard({
  title,
  value,
  variation = 0,
  helper,
  icon: Icon = TrendingUp,
}) {
  const numericVariation = Number(variation);
  const positive = numericVariation > 0;
  const negative = numericVariation < 0;

  const VariationIcon = positive
    ? ArrowUpRight
    : negative
      ? ArrowDownRight
      : Minus;

  return (
    <article className="group rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md text-left">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-500">
            {title}
          </p>

          <strong className="mt-3 block truncate text-2xl font-black tracking-tight text-slate-950">
            {value}
          </strong>
        </div>

        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-amber-600 transition group-hover:bg-amber-500 group-hover:text-white">
          <Icon size={20} />
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
        <p className="truncate text-[11px] text-slate-400">
          {helper}
        </p>

        <span
          className={[
            'inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-black',
            positive
              ? 'bg-emerald-50 text-emerald-700'
              : negative
                ? 'bg-rose-50 text-rose-600'
                : 'bg-slate-100 text-slate-500',
          ].join(' ')}
        >
          <VariationIcon size={12} />

          {Math.abs(numericVariation).toLocaleString(
            'pt-BR',
          )}
          %
        </span>
      </div>
    </article>
  );
}
