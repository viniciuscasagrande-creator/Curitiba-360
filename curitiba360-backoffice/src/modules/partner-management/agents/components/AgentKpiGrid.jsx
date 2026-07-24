import {
  CalendarCheck2,
  CircleDollarSign,
  Clock3,
  Radio,
  Target,
  UserCheck,
  Users,
} from 'lucide-react';

import {
  AgentKpiCard,
} from './AgentKpiCard';

import {
  formatAgentCurrency,
} from '../utils';

export function AgentKpiGrid({
  kpis = {},
  isLoading = false,
}) {
  const cards = [
    {
      title: 'Total de agentes',
      value: kpis.total || 0,
      subtitle:
        'Agentes cadastrados',
      icon: Users,
    },
    {
      title: 'Agentes ativos',
      value: kpis.active || 0,
      subtitle:
        'Aptos para operação',
      icon: UserCheck,
    },
    {
      title: 'Disponíveis agora',
      value: kpis.available || 0,
      subtitle:
        'Disponíveis para escala',
      icon: Radio,
    },
    {
      title: 'Em evento',
      value: kpis.onEvent || 0,
      subtitle:
        'Atuando neste momento',
      icon: CalendarCheck2,
    },
    {
      title: 'Pendentes',
      value: kpis.pending || 0,
      subtitle:
        'Aguardando aprovação',
      icon: Clock3,
    },
    {
      title: 'Eventos atendidos',
      value:
        kpis.eventsThisMonth || 0,
      subtitle:
        'Volume acumulado',
      icon: Target,
    },
    {
      title: 'Vendas geradas',
      value:
        formatAgentCurrency(
          kpis.salesAmount || 0,
        ),
      subtitle:
        'Receita atribuída',
      icon: CircleDollarSign,
    },
  ];

  return (
    <section
      className={[
        'grid gap-4',
        'sm:grid-cols-2',
        'xl:grid-cols-4',
      ].join(' ')}
    >
      {cards.map(
        (card) => (
          <AgentKpiCard
            key={card.title}
            {...card}
            isLoading={
              isLoading
            }
          />
        ),
      )}
    </section>
  );
}

export default AgentKpiGrid;
