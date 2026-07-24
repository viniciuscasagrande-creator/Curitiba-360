import {
  Building2,
  Clock3,
  FileClock,
  PauseCircle,
  Users,
} from 'lucide-react';

const iconStyles = {
  green:
    'bg-emerald-50 text-emerald-600',
  amber:
    'bg-amber-50 text-amber-600',
  blue:
    'bg-blue-50 text-blue-600',
  orange:
    'bg-orange-50 text-orange-600',
  violet:
    'bg-violet-50 text-violet-600',
};

export default function AgencySummaryCards({
  agencies,
}) {
  const summary = {
    active: agencies.filter(
      (agency) =>
        agency.status === 'Ativa',
    ).length,

    waitingContract: agencies.filter(
      (agency) =>
        agency.status ===
        'Aguardando Contrato',
    ).length,

    pendingApproval: agencies.filter(
      (agency) =>
        agency.status ===
        'Pendente de Aprovação',
    ).length,

    suspended: agencies.filter(
      (agency) =>
        agency.status === 'Suspensa',
    ).length,

    agents: agencies.reduce(
      (total, agency) =>
        total +
        Number(agency.agentsCount ?? 0),
      0,
    ),
  };

  const cards = [
    {
      id: 'active-agencies',
      label: 'Agências ativas',
      value: summary.active,
      icon: Building2,
      tone: 'green',
    },
    {
      id: 'waiting-contract',
      label: 'Aguardando contrato',
      value: summary.waitingContract,
      icon: FileClock,
      tone: 'amber',
    },
    {
      id: 'pending-approval',
      label: 'Pendentes de aprovação',
      value: summary.pendingApproval,
      icon: Clock3,
      tone: 'blue',
    },
    {
      id: 'suspended-agencies',
      label: 'Agências suspensas',
      value: summary.suspended,
      icon: PauseCircle,
      tone: 'orange',
    },
    {
      id: 'linked-agents',
      label: 'Agentes vinculados',
      value: summary.agents,
      icon: Users,
      tone: 'violet',
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5 text-left">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <article
            key={card.id}
            className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-500">
                  {card.label}
                </span>

                <strong className="mt-3 block text-2xl font-black text-slate-950">
                  {card.value}
                </strong>
              </div>

              <span
                className={[
                  'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl',
                  iconStyles[card.tone],
                ].join(' ')}
              >
                <Icon size={19} />
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
}
