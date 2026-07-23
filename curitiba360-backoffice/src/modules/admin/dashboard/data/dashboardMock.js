export const dashboardKpisMock = [
  {
    id: 'kpi-1',
    label: 'Atrações Ativas',
    value: '38',
    subtext: '98% operacionais hoje',
    change: '+2 este mês',
    type: 'positive'
  },
  {
    id: 'kpi-2',
    label: 'Ingressos Vendidos',
    value: '148.920',
    subtext: 'Média de 4.964/dia',
    change: '+18.4%',
    type: 'positive'
  },
  {
    id: 'kpi-3',
    label: 'Cortesias Emitidas',
    value: '3.410',
    subtext: '2.2% do volume total',
    change: '-0.4%',
    type: 'neutral'
  },
  {
    id: 'kpi-4',
    label: 'Receita Bruta Total',
    value: 'R$ 4.284.950,00',
    subtext: 'Acumulado do período',
    change: '+22.5%',
    type: 'positive'
  },
  {
    id: 'kpi-5',
    label: 'Valor a Repassar',
    value: 'R$ 3.856.455,00',
    subtext: 'D+1 / D+2 agendados',
    change: 'Em dia',
    type: 'positive'
  },
  {
    id: 'kpi-6',
    label: 'Contratos Vencendo',
    value: '3',
    subtext: 'Próximos 60 dias',
    change: 'Ação necessária',
    type: 'warning'
  }
];

export const attractionsMock = [
  {
    id: 'att-1',
    name: 'Jardim Botânico de Curitiba',
    location: 'Curitiba, PR • Bairro Jardim Botânico',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&auto=format&fit=crop',
    ticketsSold: 42500,
    courtesies: 840,
    revenue: 1275000,
    averageTicket: 30.0,
    payoutValue: 1147500,
    sparkline: [40, 55, 75, 80, 95, 110, 140]
  },
  {
    id: 'att-2',
    name: 'Ópera de Arame & Pedreira Paulo Leminski',
    location: 'Curitiba, PR • Bairro Abranches',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop',
    ticketsSold: 28400,
    courtesies: 420,
    revenue: 1136000,
    averageTicket: 40.0,
    payoutValue: 1022400,
    sparkline: [30, 45, 60, 70, 85, 90, 105]
  },
  {
    id: 'att-3',
    name: 'Museu Oscar Niemeyer (MON)',
    location: 'Curitiba, PR • Bairro Centro Cívico',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=600&auto=format&fit=crop',
    ticketsSold: 34100,
    courtesies: 980,
    revenue: 1023000,
    averageTicket: 30.0,
    payoutValue: 920700,
    sparkline: [25, 40, 55, 65, 70, 85, 95]
  },
  {
    id: 'att-4',
    name: 'Parque Tanguá & Mirante do Pôr do Sol',
    location: 'Curitiba, PR • Bairro Pilarzinho',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop',
    ticketsSold: 43900,
    courtesies: 1170,
    revenue: 849950,
    averageTicket: 19.35,
    payoutValue: 764955,
    sparkline: [50, 70, 85, 100, 120, 150, 170]
  },
  {
    id: 'att-5',
    name: 'Bosque Alemão & Trilha de João e Maria',
    location: 'Curitiba, PR • Bairro Vista Alegre',
    status: 'inactive',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&auto=format&fit=crop',
    ticketsSold: 0,
    courtesies: 0,
    revenue: 0,
    averageTicket: 0,
    payoutValue: 0,
    sparkline: [0, 0, 0, 0, 0, 0, 0]
  }
];
