export default function PaymentParticipation({
  value,
}) {
  const normalizedValue = Math.min(
    Math.max(Number(value) || 0, 0),
    100,
  );

  return (
    <div className="min-w-[130px] text-left">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-black text-slate-700">
          {formatPercent(normalizedValue)}
        </span>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{
            width: `${normalizedValue}%`,
          }}
        />
      </div>
    </div>
  );
}

function formatPercent(value) {
  return `${new Intl.NumberFormat(
    'pt-BR',
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  ).format(value)}%`;
}
