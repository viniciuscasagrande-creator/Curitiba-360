export const INITIAL_OFFLINE_CHECKIN_DATA = {
  networkStatus: {
    isOnline: false,
    sqliteDbReady: true,
    lastSyncTime: '2026-07-21 08:00',
    pendingSyncCount: 14
  },

  testTickets: [
    {
      code: 'CTB-OFF-001',
      ticketId: 'TKT-OFF-101',
      comprador: 'Ana Beatriz Souza',
      cpf: '***.334.556-**',
      categoria: 'Vagão Barão do Serro Azul (VIP)',
      assento: 'Fila A - Assento 03',
      status: 'valido', // valido, ja_usado, cancelado
      dataCheckin: null
    },
    {
      code: 'CTB-OFF-002',
      ticketId: 'TKT-OFF-102',
      comprador: 'Lucas Henrique Spínola',
      cpf: '***.888.999-**',
      categoria: 'Vagão Lapa (Classe Turística)',
      assento: 'Fila B - Assento 12',
      status: 'ja_usado',
      dataCheckin: '2026-07-21 08:15'
    },
    {
      code: 'CTB-OFF-003',
      ticketId: 'TKT-OFF-103',
      comprador: 'Ingresso Cancelado Teste',
      cpf: '***.000.000-**',
      categoria: 'Classe Turística',
      assento: 'N/A',
      status: 'cancelado',
      dataCheckin: null
    }
  ],

  accessLogs: [
    { id: 'LOG-1', code: 'CTB-OFF-002', comprador: 'Lucas Henrique Spínola', statusResult: 'DUPLICADO', horario: '08:15:10', syncStatus: 'pendente' },
    { id: 'LOG-2', code: 'CTB-OFF-001', comprador: 'Ana Beatriz Souza', statusResult: 'APROVADO', horario: '08:22:45', syncStatus: 'pendente' }
  ]
};
