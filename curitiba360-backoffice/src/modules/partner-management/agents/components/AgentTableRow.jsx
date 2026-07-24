import {
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Star,
} from 'lucide-react';

import {
  AgentAvatar,
} from './AgentAvatar';

import {
  AgentStatusCell,
} from './AgentStatusCell';

import {
  formatAgentCurrency,
  formatAgentPhone,
  formatAgentType,
} from '../utils';

function PerformanceScore({
  score = 0,
}) {
  const normalizedScore =
    Math.min(
      Math.max(
        Number(score) || 0,
        0,
      ),
      100,
    );

  let textClassName =
    'text-slate-500';

  let progressClassName =
    'bg-slate-400';

  if (normalizedScore >= 90) {
    textClassName =
      'text-emerald-700';

    progressClassName =
      'bg-emerald-500';
  } else if (
    normalizedScore >= 70
  ) {
    textClassName =
      'text-blue-700';

    progressClassName =
      'bg-blue-500';
  } else if (
    normalizedScore >= 50
  ) {
    textClassName =
      'text-amber-700';

    progressClassName =
      'bg-amber-500';
  } else if (
    normalizedScore > 0
  ) {
    textClassName =
      'text-red-700';

    progressClassName =
      'bg-red-500';
  }

  return (
    <div className="ml-auto w-[100px]">
      <div className="flex items-center justify-end gap-1.5">
        <Star
          size={14}
          className={
            textClassName
          }
        />

        <span
          className={[
            'text-sm font-bold',
            textClassName,
          ].join(' ')}
        >
          {normalizedScore}
        </span>
      </div>

      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={[
            'h-full rounded-full',
            'transition-all',
            progressClassName,
          ].join(' ')}
          style={{
            width: `${normalizedScore}%`,
          }}
        />
      </div>
    </div>
  );
}

function AgentActionsButton({
  agent,
  onOpenActions,
}) {
  return (
    <button
      type="button"
      aria-label={`Abrir ações de ${agent.name}`}
      onClick={(event) => {
        event.stopPropagation();

        onOpenActions?.(
          agent,
          event.currentTarget,
        );
      }}
      className={[
        'inline-flex h-9 w-9',
        'items-center justify-center',
        'rounded-xl',
        'text-slate-500',
        'transition-colors',
        'hover:bg-slate-100',
        'hover:text-slate-900',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-slate-300',
      ].join(' ')}
    >
      <MoreHorizontal
        size={19}
      />
    </button>
  );
}

export function AgentTableRow({
  agent,
  onClick,
  onOpenActions,
}) {
  const city =
    agent.address?.city;

  const state =
    agent.address?.state;

  const location = [
    city,
    state,
  ]
    .filter(Boolean)
    .join(' / ');

  const completedEvents =
    Number(
      agent.performance
        ?.completedEventsCount ||
        agent.performance
          ?.eventsCount ||
        0,
    );

  const salesAmount =
    Number(
      agent.performance
        ?.salesAmount || 0,
    );

  const performanceScore =
    Number(
      agent.performance
        ?.score || 0,
    );

  return (
    <>
      <tr
        tabIndex={0}
        role="button"
        onClick={() =>
          onClick?.(agent)
        }
        onKeyDown={(event) => {
          if (
            event.key ===
              'Enter' ||
            event.key === ' '
          ) {
            event.preventDefault();
            onClick?.(agent);
          }
        }}
        className={[
          'group hidden text-left',
          'cursor-pointer',
          'border-b',
          'border-slate-100',
          'transition-colors',
          'hover:bg-slate-50/80',
          'focus:bg-slate-50',
          'focus:outline-none',
          'lg:table-row',
        ].join(' ')}
      >
        <td className="px-5 py-4">
          <div className="flex items-center gap-3">
            <AgentAvatar
              name={agent.name}
              avatarUrl={
                agent.avatarUrl
              }
            />

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">
                {agent.name ||
                  'Agente sem nome'}
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                {agent.registrationNumber && (
                  <span className="text-xs font-medium text-slate-500">
                    {
                      agent.registrationNumber
                    }
                  </span>
                )}

                <span className="text-xs text-slate-400">
                  {formatAgentType(
                    agent.type,
                  )}
                </span>
              </div>

              {agent.contact
                ?.email && (
                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                  <Mail
                    size={12}
                  />

                  <span className="max-w-[190px] truncate">
                    {
                      agent
                        .contact
                        .email
                    }
                  </span>
                </div>
              )}
            </div>
          </div>
        </td>

        <td className="px-4 py-4">
          <div className="min-w-0">
            <p className="max-w-[180px] truncate text-sm font-semibold text-slate-700">
              {agent.agencyName ||
                'Sem agência'}
            </p>

            {agent.agencyId && (
              <p className="mt-1 max-w-[180px] truncate text-xs text-slate-400">
                {agent.agencyId}
              </p>
            )}
          </div>
        </td>

        <td className="px-4 py-4">
          <div className="flex items-start gap-2 text-sm text-slate-600">
            <MapPin
              size={15}
              className="mt-0.5 shrink-0 text-slate-400"
            />

            <div>
              <p className="font-medium">
                {location ||
                  'Não informado'}
              </p>

              {agent.regions
                ?.length > 0 && (
                <p className="mt-1 max-w-[150px] truncate text-xs text-slate-400">
                  {
                    agent
                      .regions[0]
                  }

                  {agent.regions
                    .length >
                    1 &&
                    ` +${
                      agent
                        .regions
                        .length -
                      1
                    }`}
                </p>
              )}
            </div>
          </div>
        </td>

        <td className="px-4 py-4">
          <AgentStatusCell
            status={
              agent.status
            }
            availability={
              agent.availability
            }
          />
        </td>

        <td className="px-4 py-4 text-right">
          <p className="text-sm font-bold text-slate-800">
            {completedEvents}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            concluídos
          </p>
        </td>

        <td className="px-4 py-4 text-right">
          <p className="text-sm font-bold text-slate-800">
            {formatAgentCurrency(
              salesAmount,
            )}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            receita
          </p>
        </td>

        <td className="px-4 py-4 text-right">
          <PerformanceScore
            score={
              performanceScore
            }
          />
        </td>

        <td className="px-4 py-4 text-right">
          <AgentActionsButton
            agent={agent}
            onOpenActions={
              onOpenActions
            }
          />
        </td>
      </tr>

      <tr className="border-b border-slate-100 lg:hidden">
        <td className="p-3">
          <article
            role="button"
            tabIndex={0}
            onClick={() =>
              onClick?.(agent)
            }
            onKeyDown={(event) => {
              if (
                event.key ===
                  'Enter' ||
                event.key ===
                  ' '
              ) {
                event.preventDefault();
                onClick?.(agent);
              }
            }}
            className={[
              'rounded-2xl text-left',
              'border border-slate-200',
              'bg-white p-4',
              'shadow-sm',
              'transition-all',
              'hover:border-slate-300',
              'hover:shadow-md',
              'focus:outline-none',
              'focus:ring-2',
              'focus:ring-slate-300',
            ].join(' ')}
          >
            <div className="flex items-start gap-3">
              <AgentAvatar
                name={agent.name}
                avatarUrl={
                  agent.avatarUrl
                }
                size="large"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-slate-900">
                      {agent.name ||
                        'Agente sem nome'}
                    </h3>

                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {agent.agencyName ||
                        'Sem agência vinculada'}
                    </p>
                  </div>

                  <AgentActionsButton
                    agent={agent}
                    onOpenActions={
                      onOpenActions
                    }
                  />
                </div>

                <div className="mt-3">
                  <AgentStatusCell
                    status={
                      agent.status
                    }
                    availability={
                      agent.availability
                    }
                    compact
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <CalendarDays
                    size={13}
                  />
                  Eventos
                </div>

                <p className="mt-1 text-base font-bold text-slate-900">
                  {completedEvents}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Star
                    size={13}
                  />
                  Performance
                </div>

                <p className="mt-1 text-base font-bold text-slate-900">
                  {
                    performanceScore
                  }
                  /100
                </p>
              </div>
            </div>

            <div className="mt-3 space-y-2 border-t border-slate-100 pt-3">
              {location && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin
                    size={13}
                  />
                  <span>
                    {location}
                  </span>
                </div>
              )}

              {agent.contact
                ?.mobilePhone && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Phone
                    size={13}
                  />

                  <span>
                    {formatAgentPhone(
                      agent
                        .contact
                        .mobilePhone,
                    )}
                  </span>
                </div>
              )}

              {agent.contact
                ?.email && (
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Mail
                    size={13}
                  />

                  <span className="truncate">
                    {
                      agent
                        .contact
                        .email
                    }
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <CircleDollarSign
                  size={14}
                />

                <span>
                  {formatAgentCurrency(
                    salesAmount,
                  )}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-slate-700">
                Ver detalhes
                <ChevronRight
                  size={14}
                />
              </div>
            </div>
          </article>
        </td>
      </tr>
    </>
  );
}

export default AgentTableRow;
