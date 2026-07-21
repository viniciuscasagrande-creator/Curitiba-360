export const INITIAL_TICKETING_DATA = {
  eventId: 'EVT-9001',
  nomeEvento: 'Passeio de Trem Morretes VIP 🚂',
  capacidadeVenue: 300,
  ingressosVendidosTotal: 275,
  vagasRestantesTotal: 25,
  viradaAutomaticaAtiva: true,

  lotesComerciais: [
    {
      id: 'LOT-101',
      nome: '1º Lote Promocional',
      precoBase: 390.00,
      cotaTotal: 100,
      qtdVendida: 100,
      dataInicio: '2026-07-01 08:00',
      dataFim: '2026-07-15 23:59',
      status: 'esgotado', // ativo, agendado, esgotado, pausado
      viradaPorData: true,
      viradaPorCota: true
    },
    {
      id: 'LOT-102',
      nome: '2º Lote Regular',
      precoBase: 450.00,
      cotaTotal: 150,
      qtdVendida: 150,
      dataInicio: '2026-07-16 00:00',
      dataFim: '2026-07-31 23:59',
      status: 'esgotado',
      viradaPorData: true,
      viradaPorCota: true
    },
    {
      id: 'LOT-103',
      nome: '3º Lote VIP Últimas Vagas',
      precoBase: 520.00,
      cotaTotal: 50,
      qtdVendida: 25,
      dataInicio: '2026-08-01 00:00',
      dataFim: '2026-08-15 23:59',
      status: 'ativo',
      viradaPorData: false,
      viradaPorCota: true
    }
  ],

  tiposIngressos: [
    {
      id: 'TKT-1',
      nome: 'Vagão Barão do Serro Azul (VIP)',
      categoria: 'VIP',
      preco: 520.00,
      taxaConveniencia: 10,
      disponiveis: 25,
      limitePorCompra: 6,
      status: 'disponivel'
    },
    {
      id: 'TKT-2',
      nome: 'Vagão Lapa (Classe Turística)',
      categoria: 'Regular',
      preco: 390.00,
      taxaConveniencia: 10,
      disponiveis: 0,
      limitePorCompra: 10,
      status: 'esgotado'
    },
    {
      id: 'TKT-3',
      nome: 'Meia-Entrada Estudante / Idoso',
      categoria: 'Meia',
      preco: 260.00,
      taxaConveniencia: 10,
      disponiveis: 0,
      limitePorCompra: 2,
      status: 'esgotado'
    }
  ],

  canaisVenda: [
    {
      canalId: 'CNL-ONLINE',
      nome: 'Portal Web Online (Direct)',
      tipo: 'online',
      cotaAlocada: 180,
      qtdVendida: 165,
      taxaCanalPct: 0,
      status: 'ativo'
    },
    {
      canalId: 'CNL-AGENCIAS',
      nome: 'Rede de Agências Parceiras',
      tipo: 'agencias',
      cotaAlocada: 70,
      qtdVendida: 65,
      taxaCanalPct: 5,
      status: 'ativo'
    },
    {
      canalId: 'CNL-AGENTES',
      nome: 'Agentes Comerciais Afiliados',
      tipo: 'agentes',
      cotaAlocada: 30,
      qtdVendida: 35,
      taxaCanalPct: 8,
      status: 'ativo'
    },
    {
      canalId: 'CNL-BILHETERIA',
      nome: 'Bilheteria Presencial (Estação)',
      tipo: 'bilheteria',
      cotaAlocada: 20,
      qtdVendida: 10,
      taxaCanalPct: 0,
      status: 'ativo'
    }
  ]
};
