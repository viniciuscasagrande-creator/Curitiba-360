import {
  Building2,
  Download,
  PlusCircle,
  RefreshCcw,
} from 'lucide-react';

export default function AgencyHeader({
  onAdd,
  onExport,
  onRefresh,
  isRefreshing = false,
}) {
  return (
    <header className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between text-left">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/10">
          <Building2 size={21} />
        </span>

        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">
            Gestão de Agências
          </h1>

          <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
            Gerencie agências de turismo,
            responsáveis, contratos, agentes
            vinculados e dados financeiros.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={isRefreshing}
          onClick={onRefresh}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCcw
            size={15}
            className={
              isRefreshing
                ? 'animate-spin'
                : ''
            }
          />

          Atualizar
        </button>

        <button
          type="button"
          onClick={onExport}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          <Download size={15} />
          Exportar
        </button>

        <button
          type="button"
          onClick={onAdd}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 text-xs font-black text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
        >
          <PlusCircle size={16} />
          Adicionar Agência
        </button>
      </div>
    </header>
  );
}
