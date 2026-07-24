import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
} from 'lucide-react';

export function AgentKpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  isLoading = false,
}) {
  const trendValue =
    Number(trend || 0);

  const TrendIcon =
    trendValue > 0
      ? ArrowUpRight
      : trendValue < 0
        ? ArrowDownRight
        : Minus;

  return (
    <article
      className={[
        'rounded-2xl border text-left',
        'border-slate-200',
        'bg-white p-5',
        'shadow-sm',
        'transition-all duration-200',
        'hover:-translate-y-0.5',
        'hover:shadow-md',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          {isLoading ? (
            <div className="mt-3 h-9 w-24 animate-pulse rounded-lg bg-slate-100" />
          ) : (
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              {value}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className={[
              'flex h-11 w-11',
              'items-center justify-center',
              'rounded-xl',
              'bg-slate-100',
              'text-slate-700',
            ].join(' ')}
          >
            <Icon size={21} />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          {subtitle}
        </p>

        {trend !== undefined &&
          trend !== null && (
            <div
              className={[
                'inline-flex items-center gap-1',
                'text-xs font-semibold',

                trendValue > 0
                  ? 'text-emerald-600'
                  : trendValue < 0
                    ? 'text-red-600'
                    : 'text-slate-500',
              ].join(' ')}
            >
              <TrendIcon size={14} />

              <span>
                {Math.abs(
                  trendValue,
                )}
                %
              </span>

              {trendLabel && (
                <span className="font-normal text-slate-400">
                  {trendLabel}
                </span>
              )}
            </div>
          )}
      </div>
    </article>
  );
}

export default AgentKpiCard;
