export const INITIAL_PRODUCTIVITY_DATA = {
  slaMetrics: {
    slaPctCumprido: 96.4,
    tempoMedioPrimeiraRespostaMin: 14, // minutos
    tarefasAtrasadas: 1,
    tarefasNoPrazo: 18,
    ligacoesRealizadasHoje: 12,
    reunioesConcluidasSemana: 8
  },
  agendaEvents: [
    {
      id: 'EVT-1',
      titulo: 'Reunião de Proposta Corporativa - Empresa Tech X',
      tipo: 'reuniao', // reuniao, chamada, visita, follow_up
      data: '2026-07-21',
      horaInicio: '14:30',
      horaFim: '15:30',
      cliente: 'Carlos Alberto Spínola',
      local: 'Google Meet / Online',
      status: 'agendado'
    },
    {
      id: 'EVT-2',
      titulo: 'Ligação de Follow-up com Guia Santa Catarina',
      tipo: 'chamada',
      data: '2026-07-21',
      horaInicio: '16:00',
      horaFim: '16:30',
      cliente: 'Grupo Excursão SC',
      local: 'Telefone (47) 98877-1122',
      status: 'agendado'
    },
    {
      id: 'EVT-3',
      titulo: 'Visão Geral na Agência Batel Pass',
      tipo: 'visita',
      data: '2026-07-22',
      horaInicio: '10:00',
      horaFim: '11:30',
      cliente: 'Agência Batel Pass',
      local: 'Av. Batel, 1550',
      status: 'agendado'
    }
  ],
  tasks: [
    {
      id: 'TSK-201',
      titulo: 'Enviar minuta de contrato para Empresa Tech X',
      prioridade: 'alta', // alta, media, baixa
      status: 'em_andamento', // a_fazer, em_andamento, concluido, atrasado
      prazoData: '2026-07-21 17:00',
      slaTempoRestante: '2 horas restantes',
      slaEstourado: false,
      cliente: 'Empresa Tecnologia X'
    },
    {
      id: 'TSK-202',
      titulo: 'Verificar pagamento PIX do voucher de Mariana Duarte',
      prioridade: 'alta',
      status: 'concluido',
      prazoData: '2026-07-21 12:00',
      slaTempoRestante: 'Concluído no prazo',
      slaEstourado: false,
      cliente: 'Mariana Duarte'
    },
    {
      id: 'TSK-203',
      titulo: 'Retornar chamada de cotação do Clube de Cerveja',
      prioridade: 'media',
      status: 'atrasado',
      prazoData: '2026-07-20 18:00',
      slaTempoRestante: 'Estourado há 18 horas',
      slaEstourado: true,
      cliente: 'Clube de Cerveja Curitiba'
    },
    {
      id: 'TSK-204',
      titulo: 'Confirmar horário do traslado para grupo VIP Morretes',
      prioridade: 'media',
      status: 'a_fazer',
      prazoData: '2026-07-22 11:00',
      slaTempoRestante: '21 horas restantes',
      slaEstourado: false,
      cliente: 'Carlos Alberto Spínola'
    }
  ]
};
