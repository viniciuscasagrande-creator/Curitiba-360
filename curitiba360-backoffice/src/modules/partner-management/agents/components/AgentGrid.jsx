import {
  Building2,
  Eye,
  Mail,
  MapPin,
  MoreHorizontal,
  Pencil,
  Phone,
  Trash2,
  TrendingUp,
} from 'lucide-react';

import AgentAvatar from './AgentAvatar';
import AgentAvailabilityBadge from './AgentAvailabilityBadge';
import AgentStatusBadge from './AgentStatusBadge';

function getAgentLocation(agent) {
  return [
    agent.city ??
      agent.address?.city ??
      agent.location?.city,
    agent.state ??
      agent.address?.state ??
      agent.location?.state,
  ]
    .filter(Boolean)
    .join(' - ');
}

function getAgentPerformance(agent) {
  return (
    agent.performance ??
    agent.performanceScore ??
    agent.score ??
    agent.metrics?.performance ??
    0
  );
}

export function AgentGrid({
  agents = [],
  loading = false,
  onView,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from(
          { length: 6 },
          (_, index) => (
            <div
              key={index}
              className={[
                'h-72 animate-pulse',
                'rounded-2xl',
                'border border-slate-200',
                'bg-slate-100',
              ].join(' ')}
            />
          ),
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 xl:grid-cols-3">
      {agents.map((agent) => {
        const location =
          getAgentLocation(agent);

        const performance =
          getAgentPerformance(agent);

        return (
          <article
            key={agent.id}
            className={[
              'group relative text-left',
              'overflow-hidden',
              'rounded-2xl',
              'border border-slate-200',
              'bg-white',
              'p-5',
              'shadow-sm',
              'transition-all',
              'hover:-translate-y-0.5',
              'hover:border-slate-300',
              'hover:shadow-lg',
            ].join(' ')}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <AgentAvatar
                  agent={agent}
                  size="lg"
                />

                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-slate-900">
                    {agent.name ??
                      agent.fullName ??
                      'Agente sem nome'}
                  </h3>

                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {agent.code ??
                      agent.registration ??
                      'Sem identificação'}
                  </p>
                </div>
              </div>

              <div className="relative">
                <button
                  type="button"
                  aria-label="Mais ações"
                  className={[
                    'flex h-9 w-9',
                    'items-center',
                    'justify-center',
                    'rounded-xl',
                    'text-slate-400',
                    'transition-colors',
                    'hover:bg-slate-100',
                    'hover:text-slate-800',
                  ].join(' ')}
                >
                  <MoreHorizontal
                    size={18}
                  />
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <AgentStatusBadge
                status={agent.status}
              />

              <AgentAvailabilityBadge
                availability={
                  agent.availability ??
                  agent.availabilityStatus
                }
              />
            </div>

            <div className="mt-5 space-y-3">
              {agent.email && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Mail
                    size={15}
                    className="shrink-0 text-slate-400"
                  />

                  <span className="truncate">
                    {agent.email}
                  </span>
                </div>
              )}

              {agent.phone && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Phone
                    size={15}
                    className="shrink-0 text-slate-400"
                  />

                  <span className="truncate">
                    {agent.phone}
                  </span>
                </div>
              )}

              {(agent.agencyName ||
                agent.agency?.name) && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Building2
                    size={15}
                    className="shrink-0 text-slate-400"
                  />

                  <span className="truncate">
                    {agent.agencyName ??
                      agent.agency?.name}
                  </span>
                </div>
              )}

              {location && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin
                    size={15}
                    className="shrink-0 text-slate-400"
                  />

                  <span className="truncate">
                    {location}
                  </span>
                </div>
              )}
            </div>

            <div
              className={[
                'mt-5 flex',
                'items-center',
                'justify-between',
                'rounded-xl',
                'bg-slate-50',
                'px-3 py-2.5',
              ].join(' ')}
            >
              <div className="flex items-center gap-2">
                <TrendingUp
                  size={16}
                  className="text-slate-500"
                />

                <span className="text-xs font-semibold text-slate-500">
                  Performance
                </span>
              </div>

              <strong className="text-sm text-slate-900">
                {performance}
              </strong>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() =>
                  onView?.(agent)
                }
                className={[
                  'inline-flex h-10',
                  'items-center',
                  'justify-center',
                  'gap-1.5',
                  'rounded-xl',
                  'border border-slate-200',
                  'bg-white',
                  'text-xs font-semibold',
                  'text-slate-600',
                  'transition-colors',
                  'hover:bg-slate-50',
                  'hover:text-slate-900',
                ].join(' ')}
              >
                <Eye size={14} />
                Ver
              </button>

              <button
                type="button"
                onClick={() =>
                  onEdit?.(agent)
                }
                className={[
                  'inline-flex h-10',
                  'items-center',
                  'justify-center',
                  'gap-1.5',
                  'rounded-xl',
                  'border border-slate-200',
                  'bg-white',
                  'text-xs font-semibold',
                  'text-slate-600',
                  'transition-colors',
                  'hover:bg-slate-50',
                  'hover:text-slate-900',
                ].join(' ')}
              >
                <Pencil size={14} />
                Editar
              </button>

              <button
                type="button"
                onClick={() =>
                  onDelete?.(agent)
                }
                className={[
                  'inline-flex h-10',
                  'items-center',
                  'justify-center',
                  'gap-1.5',
                  'rounded-xl',
                  'border border-red-100',
                  'bg-red-50',
                  'text-xs font-semibold',
                  'text-red-600',
                  'transition-colors',
                  'hover:bg-red-100',
                ].join(' ')}
              >
                <Trash2 size={14} />
                Excluir
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default AgentGrid;
