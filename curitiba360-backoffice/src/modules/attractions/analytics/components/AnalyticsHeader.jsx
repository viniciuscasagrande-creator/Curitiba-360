import {
  BarChart3,
  CalendarClock,
  MapPin,
} from 'lucide-react';

export default function AnalyticsHeader({
  attraction = {
    name: 'Parque Jaime Lerner',
    city: 'Curitiba',
    state: 'PR',
  },
  lastUpdatedAt,
}) {
  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between text-left">
      <div>
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-amber-600">
          <BarChart3 size={15} />
          Analytics da atração
        </div>

        <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
          {attraction.name}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
          <span className="inline-flex items-center gap-2">
            <MapPin size={15} />

            {attraction.city}/{attraction.state}
          </span>

          {lastUpdatedAt && (
            <span className="inline-flex items-center gap-2">
              <CalendarClock size={15} />

              Atualizado em{' '}
              {formatDateTime(lastUpdatedAt)}
            </span>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
        <p className="text-[10px] font-black uppercase tracking-[0.1em] text-amber-700">
          Período comparativo
        </p>

        <p className="mt-1 text-xs font-semibold text-amber-900">
          Os percentuais comparam o período atual
          com o período anterior.
        </p>
      </div>
    </header>
  );
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}
