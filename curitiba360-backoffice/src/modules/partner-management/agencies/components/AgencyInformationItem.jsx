export default function AgencyInformationItem({
  label,
  value,
  icon: Icon,
  fullWidth = false,
}) {
  return (
    <div
      className={[
        'rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-left',
        fullWidth ? 'sm:col-span-2' : '',
      ].join(' ')}
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
            <Icon size={16} />
          </span>
        )}

        <div className="min-w-0">
          <span className="block text-[10px] font-black uppercase tracking-[0.08em] text-slate-400">
            {label}
          </span>

          <strong className="mt-1 block break-words text-sm font-black text-slate-700">
            {value || '—'}
          </strong>
        </div>
      </div>
    </div>
  );
}
