import {
  AlertTriangle,
  BarChart3,
  RefreshCw,
} from 'lucide-react';

export function AnalyticsLoading() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({
          length: 4,
        }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {Array.from({
          length: 3,
        }).map((_, index) => (
          <SkeletonChart key={index} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {Array.from({
          length: 3,
        }).map((_, index) => (
          <SkeletonChart key={index} />
        ))}
      </div>
    </div>
  );
}

export function AnalyticsError({
  message = 'Não foi possível carregar os dados do Analytics.',
  onRetry,
}) {
  return (
    <div className="rounded-[28px] border border-rose-200 bg-white px-6 py-16 text-center shadow-sm">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-50 text-rose-600">
        <AlertTriangle size={30} />
      </span>

      <h2 className="mt-5 text-lg font-black text-slate-900">
        Erro ao carregar Analytics
      </h2>

      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-slate-800"
        >
          <RefreshCw size={17} />
          Tentar novamente
        </button>
      )}
    </div>
  );
}

export function AnalyticsEmpty({
  onClearFilters,
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
        <BarChart3 size={30} />
      </span>

      <h2 className="mt-5 text-lg font-black text-slate-900">
        Nenhum dado encontrado
      </h2>

      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
        Não existem vendas ou acessos registrados para
        o período selecionado.
      </p>

      {onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-6 h-11 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-600 transition hover:bg-slate-50"
        >
          Exibir todos os dados
        </button>
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[24px] border border-slate-200 bg-white p-5 text-left">
      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <div className="h-3 w-28 rounded bg-slate-200" />
          <div className="mt-4 h-8 w-36 rounded bg-slate-200" />
        </div>

        <div className="h-11 w-11 rounded-2xl bg-slate-200" />
      </div>

      <div className="mt-5 h-px bg-slate-100" />

      <div className="mt-3 flex justify-between">
        <div className="h-3 w-32 rounded bg-slate-100" />
        <div className="h-5 w-14 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}

function SkeletonChart() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[24px] border border-slate-200 bg-white text-left">
      <div className="border-b border-slate-100 p-5">
        <div className="h-4 w-40 rounded bg-slate-200" />
        <div className="mt-2 h-3 w-52 rounded bg-slate-100" />
      </div>

      <div className="flex h-72 items-end gap-4 p-6">
        {[35, 55, 70, 90, 62].map(
          (height, index) => (
            <div
              key={index}
              style={{
                height: `${height}%`,
              }}
              className="flex-1 rounded-t-xl bg-slate-200"
            />
          ),
        )}
      </div>
    </div>
  );
}
