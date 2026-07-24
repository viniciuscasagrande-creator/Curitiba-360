import {
  SearchX,
  UserPlus,
} from 'lucide-react';

export function AgentEmptyState({
  hasFilters = false,
  onCreate,
  onClearFilters,
}) {
  return (
    <div
      className={[
        'flex min-h-[320px]',
        'flex-col items-center',
        'justify-center',
        'rounded-2xl border',
        'border-dashed',
        'border-slate-300',
        'bg-white p-8',
        'text-center',
      ].join(' ')}
    >
      <div
        className={[
          'flex h-14 w-14',
          'items-center justify-center',
          'rounded-2xl',
          'bg-slate-100',
          'text-slate-600',
        ].join(' ')}
      >
        {hasFilters ? (
          <SearchX size={26} />
        ) : (
          <UserPlus size={26} />
        )}
      </div>

      <h2 className="mt-5 text-lg font-bold text-slate-900">
        {hasFilters
          ? 'Nenhum agente encontrado'
          : 'Nenhum agente cadastrado'}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {hasFilters
          ? 'Não encontramos agentes que correspondam aos filtros selecionados.'
          : 'Cadastre o primeiro agente para iniciar a gestão da equipe operacional.'}
      </p>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {hasFilters &&
          onClearFilters && (
            <button
              type="button"
              onClick={
                onClearFilters
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Limpar filtros
            </button>
          )}

        {onCreate && (
          <button
            type="button"
            onClick={onCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <UserPlus size={17} />
            Cadastrar agente
          </button>
        )}
      </div>
    </div>
  );
}

export default AgentEmptyState;
