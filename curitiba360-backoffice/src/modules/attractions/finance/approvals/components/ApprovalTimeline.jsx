import {
  CheckCircle2,
  Clock3,
} from 'lucide-react';

function formatDateTime(value) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default function ApprovalTimeline({
  items = [],
}) {
  if (!items.length) {
    return (
      <p className="text-sm font-semibold text-slate-400">
        Nenhum histórico disponível.
      </p>
    );
  }

  return (
    <div className="space-y-0 text-left">
      {items.map((item, index) => {
        const isLast =
          index === items.length - 1;

        return (
          <div
            key={item.id}
            className="relative flex gap-4 pb-6"
          >
            {!isLast && (
              <span className="absolute left-[15px] top-8 h-[calc(100%-20px)] w-px bg-slate-200" />
            )}

            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              {isLast ? (
                <Clock3 size={14} />
              ) : (
                <CheckCircle2 size={14} />
              )}
            </span>

            <div>
              <strong className="block text-sm font-black text-slate-800">
                {item.status}
              </strong>

              <span className="mt-1 block text-[10px] font-bold text-slate-400">
                {formatDateTime(item.date)} ·{' '}
                {item.user}
              </span>

              <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
