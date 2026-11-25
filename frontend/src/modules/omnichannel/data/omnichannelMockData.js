export const INITIAL_OMNICHANNEL_DATA = {
  participantProfile: {
    nome: 'Ana Beatriz Souza',
    cpf: '***.334.556-**',
    email: 'ana.beatriz@email.com',
    nivelFidelidade: 'Platinum',
    pontosAcumulados: 14500,
    saldoCashback: 85.50,
    ingressosAtivos: 2,
    beneficiosDisponiveis: 6
  },

  carteiraIngressos: [
    {
      id: 'TKT-8801-01',
      evento: 'Trem do Pôr do Sol — Passeio Noturno Especial',
      categoria: 'Vagão Barão do Serro Azul (VIP)',
      assento: 'Fila A - Assento 03',
      data: '25/07/2026 17:30',
      local: 'Estação Ferroviária de Curitiba',
      qrCodeOfflineData: 'https://api.curitiba360.com.br/v1/tickets/CTB-OFF-001/qr',
      cashbackGanho: 26.00
    }
  ],

  canaisComunicacao: [
    { canal: 'WhatsApp Business', status: 'ativo', msgsEntregues: 14200, taxaAbertura: '98.2%' },
    { canal: 'Push Notification (Expo)', status: 'ativo', msgsEntregues: 45000, taxaAbertura: '64.5%' },
    { canal: 'E-mail Transacional', status: 'ativo', msgsEntregues: 89000, taxaAbertura: '42.1%' },
    { canal: 'SMS de Emergência', status: 'ativo', msgsEntregues: 3200, taxaAbertura: '99.0%' }
  ]
};
