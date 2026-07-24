import {
  Download,
  Plus,
  RefreshCw,
} from 'lucide-react';

export function AgentModuleHeader({
  title = 'Gestão de Agentes',
  description =
    'Gerencie agentes, escalas, performance e disponibilidade.',
  onCreate,
  onRefresh,
  onExport,
  isRefreshing = false,
}) {
  return (
    <header
      className={[
        'flex flex-col gap-4 text-left',
        'lg:flex-row',
        'lg:items-center',
        'lg:justify-between',
      ].join(' ')}
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
          Parceiros e operação
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
          {title}
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={
              isRefreshing
            }
            className={[
              'inline-flex items-center gap-2',
              'rounded-xl border',
              'border-slate-200',
              'bg-white px-4 py-2.5',
              'text-sm font-semibold',
              'text-slate-700',
              'shadow-sm',
              'hover:bg-slate-50',
              'disabled:cursor-not-allowed',
              'disabled:opacity-60',
            ].join(' ')}
          >
            <RefreshCw
              size={17}
              className={
                isRefreshing
                  ? 'animate-spin'
                  : ''
              }
            />

            Atualizar
          </button>
        )}

        {onExport && (
          <button
            type="button"
            onClick={onExport}
            className={[
              'inline-flex items-center gap-2',
              'rounded-xl border',
              'border-slate-200',
              'bg-white px-4 py-2.5',
              'text-sm font-semibold',
              'text-slate-700',
              'shadow-sm',
              'hover:bg-slate-50',
            ].join(' ')}
          >
            <Download size={17} />
            Exportar
          </button>
        )}

        {onCreate && (
          <button
            type="button"
            onClick={onCreate}
            className={[
              'inline-flex items-center gap-2',
              'rounded-xl',
              'bg-slate-950',
              'px-4 py-2.5',
              'text-sm font-semibold',
              'text-white',
              'shadow-sm',
              'hover:bg-slate-800',
            ].join(' ')}
          >
            <Plus size={17} />
            Novo agente
          </button>
        )}
      </div>
    </header>
  );
}

export default AgentModuleHeader;
